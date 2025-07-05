import Stepper from '@/components/Stepper';
import { createFileRoute, Outlet, useRouter } from '@tanstack/react-router';

export const Route = createFileRoute('/_cartLayout')({
	component: CartLayout,
});

function CartLayout() {
	const router = useRouter();
	const location = router.state.location;

	return (
		<div className='col-span-1 px-5 py-5 md:col-span-12'>
			<h2 className='mb-7 text-2xl font-bold'>Shopping Cart</h2>

			<Stepper path={location.pathname} />

			<Outlet />
		</div>
	);
}
