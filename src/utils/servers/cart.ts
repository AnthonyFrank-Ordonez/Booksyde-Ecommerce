import {
	queryOptions,
	useMutation,
	useQueryClient,
} from '@tanstack/react-query';
import { createServerFn } from '@tanstack/react-start';
import { AddToCartSchema, DeleteCartitemSchema, GetUserIdSchema } from '../zod';
import prisma from '../prisma';
import type { CartItemDataType } from '@/types';

export const getOrCreateCartFn = createServerFn({ method: 'POST' })
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

export const addToCartFn = createServerFn({ method: 'POST' })
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
			console.log(`✅ Updated the cartitem: ${existingItem.id} successfully`);
			await prisma.cartItem.update({
				where: { id: existingItem.id },
				data: {
					quantity: existingItem.quantity + data.quantity,
					updatedAt: new Date(),
				},
			});
		} else {
			console.log('✅ Added to cart successfully');
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
	.validator((data: unknown) => DeleteCartitemSchema.parse(data))
	.handler(async ({ data }) => {
		try {
			await prisma.$transaction(async (tx) => {
				// Get Current Item
				const cartItem = await tx.cartItem.findUnique({
					where: { id: data.itemId },
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
