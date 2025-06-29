import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_settings/orders')({
	component: RouteComponent,
});

function RouteComponent() {
	return <div>Hello "/_settings/orders"!</div>;
}
