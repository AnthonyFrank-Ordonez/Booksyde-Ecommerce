import { queryOptions } from '@tanstack/react-query';
import { createServerFn } from '@tanstack/react-start';
import { GetUserIdSchema } from '../zod';
import prisma from '../prisma';
import type { UserCartType } from '@/types';

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

		return cart satisfies UserCartType;
	});

export const getOrCreateCartQueryOptions = (userId: string) =>
	queryOptions({
		queryKey: ['cart', userId],
		enabled: !!userId,
		staleTime: Infinity,
		retry: 1,
		refetchOnWindowFocus: false,
		queryFn: () => getOrCreateCartFn({ data: { userId: userId } }),
	});
