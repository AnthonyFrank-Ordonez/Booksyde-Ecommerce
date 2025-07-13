import { createServerFn } from '@tanstack/react-start';

import { authMiddleware } from '../auth-middleware';

export const getUserID = createServerFn({ method: 'GET' })
	.middleware([authMiddleware])
	.handler(async ({ context }) => {
		if (!context.user.id) {
			return null;
		}

		return context?.user?.id;
	});

export const getAvatar = createServerFn({ method: 'GET' })
	.middleware([authMiddleware])
	.handler(async ({ context }) => {
		return context?.user?.image;
	});

export const getUserSession = createServerFn({ method: 'GET' })
	.middleware([authMiddleware])
	.handler(async ({ context }) => {
		if (!context.user) {
			return null;
		}

		return context.user;
	});
