import { createServerFn } from '@tanstack/react-start';
import { GetUserAddressSchema, UserAddressSchema } from '../zod';
import { queryOptions, useMutation } from '@tanstack/react-query';
import prisma from '../prisma';
import { PrismaClientKnownRequestError } from '@/generated/prisma/internal/prismaNamespace';
import type { AddressType } from '@/types';

export const addAddressFn = createServerFn({ method: 'POST' })
	.validator((data: unknown) => UserAddressSchema.parse(data))
	.handler(async ({ data }) => {
		const userAddress: AddressType = {
			houseNo: data.houseNo,
			city: data.city,
			province: data.province,
			country: data.country,
			postal: data.postal,
			defaultAddress: data.defaultAddress,
			userId: data.userId,
		};

		try {
			await prisma.address.create({
				data: userAddress,
			});

			console.log('🟢 User Addresss Created!');
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

export const useAddAddress = () =>
	useMutation({
		mutationFn: addAddressFn,
	});

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
