import {
	HeadContent,
	Outlet,
	Scripts,
	createRootRouteWithContext,
	useLocation,
} from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ToastContainer } from 'react-toastify';

import Header from '../components/Header';
import appCss from '../styles.css?url';
import type { QueryClient } from '@tanstack/react-query';
import { seo } from '@/utils/seo';
import { NotFound } from '@/components/NotFound';
import Footer from '@/components/Footer';
import {
	getUserID,
	getUserSession,
	useGetUserID,
	useGetUserSession,
} from '@/utils/servers/auth-server';
import { getOrCreateCartQueryOptions } from '@/utils/servers/cart';

export const Route = createRootRouteWithContext<{
	queryClient: QueryClient;
}>()({
	beforeLoad: async ({ context }) => {
		const [userID, session] = await Promise.all([
			context.queryClient.ensureQueryData(useGetUserID()),
			context.queryClient.ensureQueryData(useGetUserSession()),
		]);

		const userCart = userID
			? await context.queryClient.ensureQueryData(
					getOrCreateCartQueryOptions(userID)
				)
			: null;

		return {
			userID,
			session,
			userCart,
		};
	},
	head: () => ({
		meta: [
			{
				charSet: 'utf-8',
			},
			{
				name: 'viewport',
				content: 'width=device-width, initial-scale=1',
			},
			...seo({
				title: 'Booksyde',
				description: 'A home for your favorite books and mangas',
			}),
		],
		links: [
			{
				rel: 'stylesheet',
				href: appCss,
			},
		],
	}),

	component: () => (
		<RootDocument>
			<Outlet />
			<TanStackRouterDevtools position='bottom-right' />
			<ReactQueryDevtools buttonPosition='bottom-left' />
			<ToastContainer newestOnTop />
		</RootDocument>
	),
	notFoundComponent: () => <NotFound />,
});

function RootDocument({ children }: { children: React.ReactNode }) {
	const { session, userCart } = Route.useRouteContext();
	const location = useLocation();
	const hideFooterPaths = ['/cart', 'checkout', '/payment'];
	const shouldHideFooter = hideFooterPaths.includes(location.pathname);
	const totalCart =
		userCart?.items
			.map((item) => item.quantity)
			.reduce((prev, sum) => sum + prev, 0) ?? 0;

	return (
		<html lang='en'>
			<head>
				<HeadContent />
			</head>
			<body>
				<Header session={session} totalCart={totalCart} />
				<main className='grid grid-cols-1 md:grid-cols-12'>{children}</main>
				{!shouldHideFooter && <Footer />}
				<Scripts />
			</body>
		</html>
	);
}
