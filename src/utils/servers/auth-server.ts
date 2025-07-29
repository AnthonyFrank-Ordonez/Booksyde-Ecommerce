import { createServerFn } from '@tanstack/react-start';
import { queryOptions } from '@tanstack/react-query';
import { authMiddleware } from '../middlewares/auth-middleware';

export const getUserID = createServerFn({ method: 'GET' })
	.middleware([authMiddleware])
	.handler(({ context }) => {
		if (!context.user?.id) {
			return null;
		}

		return context.user.id;
	});

export const useGetUserID = () =>
	queryOptions({
		queryKey: ['userID'],
		queryFn: getUserID,
		staleTime: Infinity,
		refetchOnWindowFocus: false,
		retry: 1,
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

export const useGetUserSession = () =>
	queryOptions({
		queryKey: ['userSession'],
		queryFn: getUserSession,
		staleTime: Infinity,
		refetchOnWindowFocus: false,
		retry: 1,
	});
