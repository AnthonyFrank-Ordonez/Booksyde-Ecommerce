import { createMiddleware } from '@tanstack/react-start';
import {
	getHeaders,
	// getWebRequest,
} from '@tanstack/react-start/server';
import { getSession } from './auth-client';
// import { auth } from './auth';

export const authMiddleware = createMiddleware().server(async ({ next }) => {
	const { data: session } = await getSession({
		fetchOptions: {
			headers: getHeaders() as HeadersInit,
		},
	});

	// const request = getWebRequest()!;

	// const session = await auth.api.getSession({
	// 	query: {
	// 		disableCookieCache: true,
	// 	},
	// 	headers: request.headers,
	// });

	return await next({
		context: {
			user: {
				id: session?.user.id,
				name: session?.user.name,
				image: session?.user.image,
			},
		},
	});
});
