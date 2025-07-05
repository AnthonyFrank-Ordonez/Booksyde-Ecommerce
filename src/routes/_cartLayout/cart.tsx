import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_cartLayout/cart')({
	component: Cart,
});

function Cart() {
	return <div>Hello "/_cartLayout/cart"!</div>;
}
