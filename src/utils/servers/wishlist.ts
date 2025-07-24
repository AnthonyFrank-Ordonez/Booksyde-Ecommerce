import { createServerFn } from '@tanstack/react-start';
import { queryOptions } from '@tanstack/react-query';
import { GetUserIdSchema } from '../zod';
import prisma from '../prisma';
import { loggingMiddleware } from '../middlewares/logging-middleware';

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
		queryKey: ['wishlist', userId],
		enabled: !!userId,
		queryFn: () => getOrCreateWishlistFn({ data: { userId } }),
		staleTime: Infinity,
		retry: 1,
		refetchOnWindowFocus: false,
	});
