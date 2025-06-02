import { createServerFn } from '@tanstack/react-start';

import { authMiddleware } from './auth-middleware';
import { auth } from './auth';

export const signUpUser = createServerFn({ method: 'POST' })
	.validator((data: { email: string; username: string; password: string }) => {
		if (!data.email) throw new Error('Email question is required');
		if (!data.username) throw new Error('username question is required');
		if (!data.password) throw new Error('password question is required');

		return data;
	})
	.handler(async ({ data }) => {
		const response = await auth.api.signUpEmail({
			body: {
				email: data?.email,
				name: data?.username,
				password: data?.password,
			},
			asResponse: true,
		});

		if (!response.ok) throw new Error('Invalid Data');

		return { success: true };
	});

export const getUserID = createServerFn({ method: 'GET' })
	.middleware([authMiddleware])
	.handler(async ({ context }) => {
		return context?.user?.id;
	});

export const getAvatar = createServerFn({ method: 'GET' })
	.middleware([authMiddleware])
	.handler(async ({ context }) => {
		return context?.user?.image;
	});
