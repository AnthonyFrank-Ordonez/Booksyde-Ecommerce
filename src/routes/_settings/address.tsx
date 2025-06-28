import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_settings/address')({
	component: RouteComponent,
});

function RouteComponent() {
	return <div>Hello "/_settings/address"!</div>;
}
