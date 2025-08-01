import {
	queryOptions,
	useMutation,
	useQueryClient,
} from '@tanstack/react-query';
import { createServerFn } from '@tanstack/react-start';
import {
	AddToCartSchema,
	DeleteCartitemSchema,
	GetUserIdSchema,
	UpdateItemQuantitySchema,
} from '../zod';
import prisma from '../prisma';
import { loggingMiddleware } from '../middlewares/logging-middleware';
import type { CartItemDataType } from '@/types';

const getOrCreateCartFn = createServerFn({ method: 'POST' })
	.middleware([loggingMiddleware])
	.validator((data: unknown) => GetUserIdSchema.parse(data))
	.handler(async ({ data }) => {
		const currentUserId = data.userId;
		let cart = await prisma.cart.findUnique({
			where: { userId: currentUserId },
			include: {
				items: {
					include: {
						book: true,
					},
					orderBy: {
						createdAt: 'asc',
					},
				},
			},
		});

		if (!cart) {
			cart = await prisma.cart.create({
				data: { userId: currentUserId },
				include: {
					items: {
						include: {
							book: true,
						},
						orderBy: {
							createdAt: 'asc',
						},
					},
				},
			});
		}

		return {
			...cart,
			items: cart.items.map((items) => ({
				...items,
				book: items.book && {
					...items.book,
					price: items.book.price.toJSON(),
					rating: items.book.rating.toJSON(),
				},
			})),
		};
	});

export const getOrCreateCartQueryOptions = (userId: string) =>
	queryOptions({
		queryKey: ['cart', userId],
		enabled: !!userId,
		staleTime: Infinity,
		retry: 1,
		refetchOnWindowFocus: false,
		queryFn: () => getOrCreateCartFn({ data: { userId } }),
	});

const addToCartFn = createServerFn({ method: 'POST' })
	.middleware([loggingMiddleware])
	.validator((data: unknown) => AddToCartSchema.parse(data))
	.handler(async ({ data }) => {
		const existingItem = await prisma.cartItem.findFirst({
			where: {
				cartId: data.cartId,
				itemType: data.itemType,
				itemId: data.itemId,
			},
		});

		if (existingItem) {
			await prisma.cartItem.update({
				where: { id: existingItem.id },
				data: {
					quantity: existingItem.quantity + data.quantity,
					updatedAt: new Date(),
				},
			});
		} else {
			const cartItemData: CartItemDataType = {
				cartId: data.cartId,
				itemType: data.itemType,
				itemId: data.itemId,
				quantity: data.quantity,
			};

			switch (data.itemType) {
				case 'BOOK':
					cartItemData.bookId = data.itemId;
					break;
				case 'MANGA':
					cartItemData.mangaId = data.itemId;
					break;
				case 'NOVEL':
					cartItemData.novelId = data.itemId;
					break;
			}

			await prisma.cartItem.create({
				data: cartItemData,
			});
		}

		return { userId: data.userId };
	});

export const useAddToCart = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: addToCartFn,
		onSuccess: (data) => {
			queryClient.invalidateQueries({ queryKey: ['cart', data.userId] });
		},
	});
};

const deleteCartItemFn = createServerFn({ method: 'POST' })
	.middleware([loggingMiddleware])
	.validator((data: unknown) => DeleteCartitemSchema.parse(data))
	.handler(async ({ data }) => {
		try {
			await prisma.$transaction(async (tx) => {
				// Get Current Item
				const cartItem = await tx.cartItem.findUnique({
					where: { id: data.itemId, cartId: data.cartId },
				});

				if (cartItem && cartItem.quantity <= 1) {
					await tx.cartItem.delete({
						where: {
							id: data.itemId,
							cartId: data.cartId,
						},
					});
				} else if (cartItem && cartItem.quantity >= 2) {
					await tx.cartItem.update({
						where: {
							id: data.itemId,
							cartId: data.cartId,
						},
						data: {
							quantity: { decrement: 1 },
						},
					});
				} else {
					throw new Error('Cartitem not found');
				}
			});

			return { userId: data.userId };
		} catch (error: unknown) {
			if (error instanceof Error) {
				console.log('Error: ', error);
			} else {
				console.log('Error: ', error);
			}
		}
	});

export const useDeleteCartItem = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: deleteCartItemFn,
		onSuccess: (data) => {
			queryClient.invalidateQueries({ queryKey: ['cart', data?.userId] });
		},
	});
};

const updateItemQuantityFn = createServerFn({ method: 'POST' })
	.middleware([loggingMiddleware])
	.validator((data: unknown) => UpdateItemQuantitySchema.parse(data))
	.handler(async ({ data }) => {
		await prisma.$transaction(async (tx) => {
			// Get the cartItem based on itemId passed
			const cartItem = await tx.cartItem.findUnique({
				where: { id: data.itemId, cartId: data.cartId },
			});

			if (cartItem) {
				if (data.type === 'Increase') {
					await tx.cartItem.update({
						where: { id: data.itemId, cartId: data.cartId },
						data: {
							quantity: { increment: 1 },
						},
					});
				} else {
					await tx.cartItem.update({
						where: { id: data.itemId, cartId: data.cartId },
						data: {
							quantity: { decrement: 1 },
						},
					});
				}
			} else {
				throw new Error(`Cart Item Not Found, with the id: '${data.itemId}' `);
			}
		});

		return { userId: data.userId };
	});

export const useUpdateQuantity = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: updateItemQuantityFn,
		onSuccess: (data) => {
			queryClient.invalidateQueries({ queryKey: ['cart', data.userId] });
		},
		onError: (error) => {
			throw error;
		},
	});
};
