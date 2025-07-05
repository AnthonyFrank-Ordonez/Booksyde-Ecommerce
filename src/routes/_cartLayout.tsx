import { createFileRoute, Outlet } from '@tanstack/react-router';

export const Route = createFileRoute('/_cartLayout')({
	component: CartLayout,
});

function CartLayout() {
	return (
		<div className='col-span-1 px-5 py-5 md:col-span-12'>
			<h2 className='text-2xl font-bold'>Shopping Cart</h2>

			<Outlet />
		</div>
	);
}
