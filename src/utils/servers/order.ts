import { createServerFn } from '@tanstack/react-start';
import {
	queryOptions,
	useMutation,
	useQueryClient,
	useSuspenseQuery,
} from '@tanstack/react-query';
import { loggingMiddleware } from '../middlewares/logging-middleware';
import { CreateOrderSchema, GetUserIdSchema } from '../zod';
import prisma from '../prisma';
import { PrismaClientKnownRequestError } from '@/generated/prisma/internal/prismaNamespace';

const getUserOrdersFn = createServerFn({ method: 'POST' })
	.middleware([loggingMiddleware])
	.validator((data: unknown) => GetUserIdSchema.parse(data))
	.handler(async ({ data }) => {
		const orders = await prisma.order.findMany({
			where: {
				userId: data.userId,
			},
			include: {
				orderItems: {
					include: {
						book: true,
					},
				},
				shippingAddress: {
					select: {
						houseNo: true,
						street: true,
						city: true,
						province: true,
						country: true,
						postal: true,
					},
				},
			},
		});

		return orders.map((order) => ({
			...order,
			totalAmount: order.totalAmount.toJSON(),
			orderItems: order.orderItems.map((item) => ({
				...item,
				price: item.price.toJSON(),
				book: item.book && {
					...item.book,
					price: item.book.price.toJSON(),
					rating: item.book.rating.toJSON(),
				},
			})),
		}));
	});

export const getUserOrdersQueryOptions = (userId: string) =>
	queryOptions({
		queryKey: ['orders', userId],
		enabled: !!userId,
		staleTime: Infinity,
		retry: 1,
		refetchOnWindowFocus: false,
		queryFn: () => getUserOrdersFn({ data: { userId } }),
	});

export const useGetUserOrders = (userId: string) => {
	return useSuspenseQuery(getUserOrdersQueryOptions(userId));
};

const createOrderFn = createServerFn({ method: 'POST' })
	.validator((data: unknown) => CreateOrderSchema.parse(data))
	.handler(async ({ data }) => {
		console.log('🚀 ~ data:', data);
		try {
			const orderResult = await prisma.$transaction(async (tx) => {
				// Create Order
				const order = await tx.order.create({
					data: {
						userId: data.userId,
						totalAmount: data.totalAmount,
						status: 'PENDING',
						paymentIntentId: data.paymentIntentId,
						shippingAddressId: data.shippingAddressId,

						orderItems: {
							create: data.cartItems.map((item) => ({
								itemType: item.itemType,
								itemId: item.id!,
								quantity: item.quantity,
								price: item.price,

								bookId: item.itemType === 'BOOK' ? item.id : null,
								mangaId: item.itemType === 'MANGA' ? item.id : null,
								novelId: item.itemType === 'NOVEL' ? item.id : null,
							})),
						},
					},
				});

				// Delete after successfull order
				const userCart = await tx.cart.findUnique({
					where: { userId: data.userId },
					include: { items: true },
				});

				if (userCart) {
					for (const cartItem of data.cartItems) {
						await tx.cartItem.deleteMany({
							where: {
								cartId: userCart.id,
								itemType: cartItem.itemType,
								itemId: cartItem.id!,
							},
						});
					}
				}

				return order;
			});

			return { orderId: orderResult.id, userId: data.userId };
		} catch (error: unknown) {
			console.log('🚀 ~ error:', error);
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

export const useCreateOrder = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: createOrderFn,
		onSuccess: (data) => {
			queryClient.invalidateQueries({ queryKey: ['cart', data?.userId] });
		},
	});
};
