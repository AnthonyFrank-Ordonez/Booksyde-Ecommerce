import { createAuthClient } from 'better-auth/react';

export const { useSession, signIn, signOut, signUp, getSession } =
	createAuthClient({
		baseURL: 'http://localhost:3000',
		redirectTo: '/',
		fetchOptions: {
			onError: async (context) => {
				const { response, error } = context;
				if (response.status === 429) {
					const retryAfter = response.headers.get('X-Retry-After');
					console.log(`Retry limit excedd. Retry after ${retryAfter} seconds`);
				} else if (response.status === 401) {
					console.error(
						`STATUS: ${response.status} ${response.statusText}. MESSAGE: ${error.message}`
					);
				}
			},
		},
	});
