import { createServerFn } from '@tanstack/react-start';

import { authMiddleware } from '../auth-middleware';

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
