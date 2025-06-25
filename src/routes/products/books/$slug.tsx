import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/products/books/$slug')({
	component: RouteComponent,
});

function RouteComponent() {
	const { slug } = Route.useParams();

	return <div>Hello "{slug}"!</div>;
}
