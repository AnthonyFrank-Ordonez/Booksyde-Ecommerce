import { createMiddleware, json } from '@tanstack/react-start';
import { getWebRequest } from '@tanstack/react-start/server';
import { auth } from '../auth';

export const authMiddleware = createMiddleware({ type: 'function' }).server(
	async ({ next }) => {
		const request = getWebRequest();

		const session = await auth.api.getSession({
			query: {
				disableCookieCache: true,
			},
			headers: request.headers,
		});

		const result = await next({
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

		return result;
		// 	context: {
		// 		user: session?.user
		// 			? {
		// 					id: session.user.id,
		// 					name: session.user.name,
		// 					image: session.user.image,
		// 					email: session.user.email,
		// 					firstName: session.user.firstName,
		// 					lastName: session.user.lastName,
		// 					phone: session.user.phone,
		// 				}
		// 			: null,
		// 	},
		// });
	}
);

export const isAuthenticated = createMiddleware({
	type: 'function',
})
	.middleware([authMiddleware])
	.server(async ({ next, context }) => {
		if (!context.user) {
			throw json(
				{ message: 'You must login first', status: 401 },
				{ status: 401 }
			);
		}

		return next();
	});
