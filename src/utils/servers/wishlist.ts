import { createServerFn } from '@tanstack/react-start';
import {
	queryOptions,
	useMutation,
	useQueryClient,
} from '@tanstack/react-query';
import {
	AddToWishlistSchema,
	GetUserIdSchema,
	RemoveToWishlistSchema,
} from '../zod';
import prisma from '../prisma';
import { loggingMiddleware } from '../middlewares/logging-middleware';
import { isAuthenticated } from '../middlewares/auth-middleware';
import type { WishlistItemDataType } from '@/types';
import { PrismaClientKnownRequestError } from '@/generated/prisma/internal/prismaNamespace';

const getOrCreateWishlistFn = createServerFn({ method: 'POST' })
	.middleware([loggingMiddleware])
	.validator((data) => GetUserIdSchema.parse(data))
	.handler(async ({ data }) => {
		const currentUserId = data.userId;

		const wishlist = await prisma.$transaction(async (tx) => {
			// try to find the existing wishlist
			let userWishlist = await tx.wishlist.findUnique({
				where: { userId: currentUserId },
				include: {
					wishlists: {
						include: {
							book: true,
						},
					},
				},
			});

			if (!userWishlist) {
				userWishlist = await tx.wishlist.create({
					data: { userId: currentUserId },
					include: {
						wishlists: {
							include: {
								book: true,
							},
						},
					},
				});
			}

			return userWishlist;
		});

		return {
			...wishlist,
			wishlists: wishlist.wishlists.map((item) => ({
				...item,
				book: item.book && {
					...item.book,
					price: item.book.price.toJSON(),
					rating: item.book.price.toJSON(),
				},
			})),
		};
	});

export const useGetOrCreateWishlist = (userId: string | null) =>
	queryOptions({
		enabled: !!userId,
		queryKey: ['wishlist', userId ?? 'unauthenticated'],
		queryFn: () => getOrCreateWishlistFn({ data: { userId } }),
		staleTime: Infinity,
		retry: 1,
		refetchOnWindowFocus: false,
	});

const addToWishlistFn = createServerFn({ method: 'POST' })
	.middleware([loggingMiddleware, isAuthenticated])
	.validator((data: unknown) => AddToWishlistSchema.parse(data))
	.handler(async ({ data }) => {
		const userId = data.userId;

		try {
			await prisma.$transaction(async (tx) => {
				const wishlistItemData = {
					wishlistId: data.wishlistId,
					itemId: data.itemId,
					itemType: data.itemType,

					bookId: '',
					mangaId: '',
					novelId: '',
				} satisfies WishlistItemDataType;

				switch (data.itemType) {
					case 'BOOK':
						wishlistItemData.bookId = data.itemId;
						break;
					case 'MANGA':
						wishlistItemData.mangaId = data.itemId;
						break;
					case 'NOVEL':
						wishlistItemData.novelId = data.itemId;
						break;
				}

				await tx.wishlistItems.create({
					data: wishlistItemData,
				});
			});

			return { userId: userId };
		} catch (error: unknown) {
			if (error instanceof PrismaClientKnownRequestError) {
				if (error.code === 'P2002') {
					throw new Error('Item already exists in wishlist');
				} else {
					throw new Error('Database error: ' + error.message);
				}
			} else if (error instanceof Error) {
				throw new Error('Error: ', error);
			}
		}
	});

export const useAddToWishlist = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: addToWishlistFn,
		onSuccess: (data) => {
			queryClient.invalidateQueries({
				queryKey: ['wishlist', data?.userId],
				exact: true,
			});
		},
	});
};

export const removeFromWishlistFn = createServerFn({ method: 'POST' })
	.middleware([loggingMiddleware])
	.validator((data: unknown) => RemoveToWishlistSchema.parse(data))
	.handler(async ({ data }) => {
		try {
			await prisma.wishlistItems.delete({
				where: {
					wishlistId_itemType_itemId: {
						wishlistId: data.wishlistId,
						itemType: data.itemType,
						itemId: data.itemId,
					},
				},
			});

			return { userId: data.userId };
		} catch (error) {
			if (error instanceof PrismaClientKnownRequestError) {
				if (error.code === 'P2025') {
					throw new Error('Item not found in wishlist');
				} else {
					throw new Error('Database error: ' + error.message);
				}
			} else if (error instanceof Error) {
				throw new Error('Error: ', error);
			} else {
				console.error('Unkown Error', error);
			}
		}
	});

export const useRemoveFromWishlist = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: removeFromWishlistFn,
		onSuccess: (data) => {
			queryClient.invalidateQueries({
				queryKey: ['wishlist', data?.userId],
				exact: true,
			});
		},
	});
};
