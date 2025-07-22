import { createServerFn } from '@tanstack/react-start';
import { authMiddleware } from '../middlewares/auth-middleware';

export const getUserID = createServerFn({ method: 'GET' })
	.middleware([authMiddleware])
	.handler(({ context }) => {
		if (!context.user?.id) {
			return null;
		}

		return context.user.id;
	});

export const getAvatar = createServerFn({ method: 'GET' })
	.middleware([authMiddleware])
	.handler(({ context }) => {
		return context.user?.image;
	});

export const getUserSession = createServerFn({ method: 'GET' })
	.middleware([authMiddleware])
	.handler(({ context }) => {
		if (!context.user) {
			return null;
		}

		return context.user;
	});
