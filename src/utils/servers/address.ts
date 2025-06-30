import { createServerFn } from '@tanstack/react-start';
import {
	GetUserAddressSchema,
	GetUserDefaultAddressSchema,
	UpdateAddressSchema,
	UserAddressSchema,
} from '../zod';
import {
	queryOptions,
	useMutation,
	useQueryClient,
} from '@tanstack/react-query';
import prisma from '../prisma';
import { PrismaClientKnownRequestError } from '@/generated/prisma/internal/prismaNamespace';
import type { AddressType } from '@/types';

export const addAddressFn = createServerFn({ method: 'POST' })
	.validator((data: unknown) => UserAddressSchema.parse(data))
	.handler(async ({ data }) => {
		const newUserAddress: AddressType = {
			houseNo: data.houseNo,
			street: data.street,
			city: data.city,
			province: data.province,
			country: data.country,
			postal: data.postal,
			defaultAddress: data.defaultAddress,
			userId: data.userId,
		};

		try {
			if (newUserAddress.defaultAddress) {
				await prisma.address.updateMany({
					where: {
						userId: newUserAddress.userId,
						defaultAddress: true,
					},
					data: {
						defaultAddress: false,
					},
				});

				const userAddress = await prisma.address.create({
					data: newUserAddress,
				});

				console.log('🟢 User Addresss Created!');
				return userAddress;
			} else {
				const userAddress = await prisma.address.create({
					data: newUserAddress,
				});

				console.log('🟢 User Addresss Created!');
				return userAddress;
			}
		} catch (error: unknown) {
			if (error instanceof PrismaClientKnownRequestError) {
				console.error('Error creating data', error);
			} else if (error instanceof Error) {
				console.error('Error creating user address', error);
			} else {
				console.error('Unkown Error', error);
			}
		}
	});

export const useAddAddress = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: addAddressFn,
		onSuccess: (data) => {
			queryClient.invalidateQueries({
				queryKey: ['user-address', data?.userId],
			});
		},
	});
};

export const getUserAddresssesFn = createServerFn({ method: 'GET' })
	.validator((data: unknown) => GetUserAddressSchema.parse(data))
	.handler(async ({ data }) => {
		try {
			const userAdresses = await prisma.address.findMany({
				where: {
					userId: data.userId,
				},
			});

			return userAdresses;
		} catch (error: unknown) {
			if (error instanceof PrismaClientKnownRequestError) {
				console.error('Error fetching data', error);
			} else if (error instanceof Error) {
				console.error('Error fetching user address', error);
			} else {
				console.error('Unkown Error', error);
			}
		}
	});

export const getUserAddQueryOptions = (userId: string) =>
	queryOptions({
		queryKey: ['user-address', userId],
		retry: 1,
		refetchOnWindowFocus: false,
		staleTime: Infinity,
		queryFn: () => getUserAddresssesFn({ data: { userId: userId } }),
		enabled: !!userId,
	});

export const getUserDefaultAddressFn = createServerFn({ method: 'GET' })
	.validator((data: unknown) => GetUserDefaultAddressSchema.parse(data))
	.handler(async ({ data }) => {
		const sessionId = data.sessionId;
		console.log('🟢 Received session id ==>', sessionId);

		try {
			const defaultAddress = await prisma.address.findFirst({
				where: {
					userId: sessionId,
					defaultAddress: true,
				},
			});

			return defaultAddress;
		} catch (error: unknown) {
			if (error instanceof PrismaClientKnownRequestError) {
				console.error('Error fetching data', error);
			} else if (error instanceof Error) {
				console.error('Error fetching user address', error);
			} else {
				console.error('Unkown Error', error);
			}
		}
	});

export const getUserDefaultAddQueryOptions = (sessionId: string | undefined) =>
	queryOptions({
		queryKey: ['user-default-address', sessionId],
		retry: 1,
		refetchOnWindowFocus: false,
		staleTime: Infinity,
		enabled: !!sessionId,
		queryFn: () => getUserDefaultAddressFn({ data: { sessionId: sessionId } }),
	});

export const updateDefaultAddressFn = createServerFn({ method: 'POST' })
	.validator((data: unknown) => UpdateAddressSchema.parse(data))
	.handler(async ({ data }) => {
		try {
			// Update the exisint default addresss to false
			await prisma.address.updateMany({
				where: {
					userId: data.userId,
					defaultAddress: true,
				},
				data: {
					defaultAddress: false,
				},
			});

			// Set the new address to default address
			await prisma.address.update({
				where: {
					id: data.addressId,
					userId: data.userId,
				},
				data: {
					defaultAddress: true,
				},
			});

			return data;
		} catch (error: unknown) {
			if (error instanceof PrismaClientKnownRequestError) {
				console.error('Error creating data', error);
			} else if (error instanceof Error) {
				console.error('Error creating user address', error);
			} else {
				console.error('Unkown Error', error);
			}
		}
	});

export const useUpdateDefaultAddress = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: updateDefaultAddressFn,
		onSuccess: (data) => {
			queryClient.invalidateQueries({
				queryKey: ['user-address', data?.userId],
			});
			queryClient.invalidateQueries({
				queryKey: ['user-default-address', data?.userId],
			});
		},
	});
};
