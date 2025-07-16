import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/products/novels/')({
	component: RouteComponent,
});

function RouteComponent() {
	return <div>Hello "/products/novels/"!</div>;
}
