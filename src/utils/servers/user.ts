import { createServerFn } from '@tanstack/react-start';
import { redirect, useNavigate } from '@tanstack/react-router';
import { getWebRequest } from '@tanstack/react-start/server';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { auth } from '../auth';

import {
	GetUserIdSchema,
	UpdateUserInformationSchema,
	UserCredentialsSchema,
} from '../zod';
import prisma from '../prisma';
import type { ErrorSignInType, SignUpType } from '@/types';
import { PrismaClientKnownRequestError } from '@/generated/prisma/internal/prismaNamespace';

export const signInServer = createServerFn({ method: 'POST' })
	.validator((cred: unknown) => UserCredentialsSchema.parse(cred))
	.handler(async ({ data }) => {
		console.log('🟢 Credentials: ', data);

		const response = await auth.api.signInEmail({
			body: {
				email: data.email,
				password: data.password,
			},
			asResponse: true,
		});

		if (response.ok) {
			return { success: true };
		} else {
			const errorData: ErrorSignInType = await response.json();

			if (response.status === 401) {
				throw new Error(errorData.message);
			} else if (response.status === 403) {
				throw new Error(errorData.message);
			}
		}
	});

export const useSignInUser = () => {
	const navigate = useNavigate();
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: signInServer,
		onSuccess: () => {
			queryClient.resetQueries({ queryKey: ['user-id'] });
			queryClient.resetQueries({ queryKey: ['user-session'] });
			navigate({ to: '/products' });
		},
	});
};

export const signUpServer = createServerFn({ method: 'POST' })
	.validator((input: unknown): SignUpType => {
		if (typeof input !== 'object' || input === null) {
			throw new Error('Invalid User Input');
		}

		if ('email' in input && typeof input.email !== 'string') {
			throw new Error('Email must be string');
		}

		if ('name' in input && typeof input.name !== 'string') {
			throw new Error('Name must be string');
		}

		if ('password' in input && typeof input.password !== 'string') {
			throw new Error(
				'Password must be valid string and passed the validation'
			);
		}

		return input as SignUpType;
	})
	.handler(async ({ data }) => {
		const response = await auth.api.signUpEmail({
			body: {
				email: data.email,
				password: data.password,
				name: data.name,
			},
			asResponse: true,
		});

		if (response.ok) {
			throw redirect({ to: '/signin' });
		} else {
			throw new Error(
				'Error signing up on the server. Please double check your input'
			);
		}
	});

export const signOutUserFn = createServerFn({ method: 'POST' }).handler(
	async () => {
		const request = getWebRequest()!;

		await auth.api.signOut({
			headers: request.headers,
		});

		return { success: true };
	}
);

export const useSignOutUser = () => {
	const navigate = useNavigate();
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: () => signOutUserFn(),
		onSuccess: () => {
			queryClient.resetQueries({ queryKey: ['user-id'] });
			queryClient.resetQueries({ queryKey: ['user-session'] });
			navigate({ to: '/' });
		},
	});
};

export const findUserBySession = createServerFn({ method: 'GET' })
	.validator((data: unknown) => GetUserIdSchema.parse(data))
	.handler(async ({ data }) => {
		try {
			const userData = await prisma.user.findUnique({
				where: {
					id: data.userId,
				},
			});

			return userData;
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

export const updateUserInformationFn = createServerFn({ method: 'GET' })
	.validator((data: unknown) => UpdateUserInformationSchema.parse(data))
	.handler(async ({ data }) => {
		try {
			await prisma.user.update({
				where: {
					id: data.userId,
				},
				data: {
					firstName: data.firstName,
					lastName: data.lastName,
					phone: data.phone,
				},
			});

			// return data;
		} catch (error: unknown) {
			if (error instanceof PrismaClientKnownRequestError) {
				console.error('Error updating data', error);
			} else if (error instanceof Error) {
				console.error('Error updating user address', error);
			} else {
				console.error('Unkown Error', error);
			}
		}
	});

export const useUpdateUserInformation = () => {
	// const queryClient = useQueryClient();

	return useMutation({
		mutationFn: updateUserInformationFn,
		// onSuccess: (data) => {
		// queryClient.invalidateQueries({queryKey: []})
		// }
	});
};
