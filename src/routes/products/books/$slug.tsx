import { bookslugQueryOptions } from '@/utils/servers/books';
import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/products/books/$slug')({
	component: RouteComponent,
	loader: async ({ context, params }) => {
		const slug = params.slug;
		await context.queryClient.ensureQueryData(bookslugQueryOptions(slug));
	},
});

function RouteComponent() {
	const { slug } = Route.useParams();
	const booksQueryData = useSuspenseQuery(bookslugQueryOptions(slug));
	console.log('🚀 ~ RouteComponent ~ booksQueryData:', booksQueryData);

	return <div>Hello "{slug}"!</div>;
}
