import { createServerFn } from '@tanstack/react-start';
import { auth } from '../auth';

interface Credentials {
	email: string;
	password: string;
}

export const signInServer = createServerFn({ method: 'POST' })
	.validator((credentials: unknown): Credentials => {
		console.log('🚀 ~ .validator ~ credentials:', credentials);
		if (typeof credentials !== 'object' || credentials === null)
			throw new Error('Credentials must be an object');

		if ('email' in credentials && typeof credentials.email !== 'string')
			throw new Error('Credentials must be string');

		if ('password' in credentials && typeof credentials.password !== 'string')
			throw new Error('Credentials must be string');

		return credentials as Credentials;
	})
	.handler(async ({ data }) => {
		const response = await auth.api.signInEmail({
			body: {
				email: data.email,
				password: data.password,
			},
			asResponse: true,
		});

		if (!response.ok) {
			throw new Error('Sign in failed, please check your credentials');
		}

		return { success: true };
	});
