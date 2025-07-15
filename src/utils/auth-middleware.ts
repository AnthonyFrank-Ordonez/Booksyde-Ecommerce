import { createMiddleware } from '@tanstack/react-start';
import { getWebRequest } from '@tanstack/react-start/server';
import { auth } from './auth';

export const authMiddleware = createMiddleware().server(async ({ next }) => {
	const request = getWebRequest()!;

	const session = await auth.api.getSession({
		query: {
			disableCookieCache: true,
		},
		headers: request.headers,
	});

	return await next({
		context: {
			user: session?.user
				? {
						id: session.user.id,
						name: session.user.name,
						image: session.user.image,
						email: session.user.email,
						firstName: session.user.firstName,
						lastName: session.user.lastName,
						phone: session.user.phone,
					}
				: null,
		},
	});
});
