import { createServerFn } from '@tanstack/react-start';
import { redirect } from '@tanstack/react-router';
import { auth } from '../auth';
import { getWebRequest } from '@tanstack/react-start/server';

import type { SignInType, SignUpType } from '@/types';

export const signInServer = createServerFn({ method: 'POST' })
	.validator((cred: unknown): SignInType => {
		if (typeof cred !== 'object' || cred === null) {
			throw new Error('Credentials required');
		}

		if ('email' in cred && typeof cred.email !== 'string') {
			throw new Error('Email must be string');
		}

		if ('password' in cred && typeof cred.password !== 'string') {
			throw new Error('Password must be string');
		}

		return cred as SignInType;
	})
	.handler(async ({ data }) => {
		const response = await auth.api.signInEmail({
			body: {
				email: data.email,
				password: data.password,
			},
			asResponse: true,
		});

		if (response.ok) {
			throw redirect({ to: '/products' });
		} else {
			if (response.status === 401) {
				throw new Error(
					`${response.status} ${response.statusText}: Invalid email or password`
				);
			} else if (response.status === 403) {
				throw new Error(`${response.status} ${response.statusText}`);
			}
		}
	});

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

		throw redirect({ to: '/' });
	}
);
