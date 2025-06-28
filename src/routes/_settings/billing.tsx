import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_settings/billing')({
	component: RouteComponent,
});

function RouteComponent() {
	return <div>Hello "/_settings/billing"!</div>;
}
