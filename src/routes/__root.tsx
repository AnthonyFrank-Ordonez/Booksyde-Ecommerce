import {
	Outlet,
	HeadContent,
	Scripts,
	createRootRouteWithContext,
} from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import { QueryClient } from '@tanstack/react-query';

import Header from '../components/Header';
import appCss from '../styles.css?url';
import { seo } from '@/utils/seo';
import { NotFound } from '@/components/NotFound';
import Footer from '@/components/Footer';
import { getUserID } from '@/utils/servers/auth-server';

export const Route = createRootRouteWithContext<{
	queryClient: QueryClient;
}>()({
	beforeLoad: async () => {
		const userID = await getUserID();

		return {
			userID,
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
			<TanStackRouterDevtools />
		</RootDocument>
	),
	notFoundComponent: () => <NotFound />,
});

function RootDocument({ children }: { children: React.ReactNode }) {
	return (
		<html lang='en'>
			<head>
				<HeadContent />
			</head>
			<body>
				<Header />
				<main className='grid grid-cols-1 md:grid-cols-12'>{children}</main>
				<Footer />
				<Scripts />
			</body>
		</html>
	);
}
