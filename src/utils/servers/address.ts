import { createServerFn } from '@tanstack/react-start';
import { GetUserAddressSchema, UserAddressSchema } from '../zod';
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
			const userAddress = await prisma.address.create({
				data: newUserAddress,
			});

			console.log('🟢 User Addresss Created!');
			return userAddress;
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

export const getUserAddresss = createServerFn({ method: 'GET' })
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
		queryFn: () => getUserAddresss({ data: { userId: userId } }),
		enabled: !!userId,
	});
