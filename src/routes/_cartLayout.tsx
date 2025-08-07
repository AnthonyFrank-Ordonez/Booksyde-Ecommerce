import { Outlet, createFileRoute, useLocation } from '@tanstack/react-router';
import Stepper from '@/components/Stepper';

export const Route = createFileRoute('/_cartLayout')({
	component: CartLayout,
});

function CartLayout() {
	const location = useLocation();
	const isPayment = location.pathname === '/payment-success';

	return (
		<div className='col-span-1 px-5 py-7 md:col-span-12 xl:py-10 2xl:py-12'>
			<div className='mx-auto sm:max-w-2xl md:max-w-3xl lg:max-w-5xl xl:max-w-6xl 2xl:max-w-[90rem]'>
				<h2 className='mb-7 text-2xl font-bold lg:text-3xl xl:text-4xl'>
					{!isPayment ? 'Shopping Cart' : ''}
				</h2>

				<Stepper />

				<Outlet />
			</div>
		</div>
	);
}
