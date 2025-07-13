import Stepper from '@/components/Stepper';
import { createFileRoute, Outlet, useRouter } from '@tanstack/react-router';

export const Route = createFileRoute('/_cartLayout')({
	component: CartLayout,
});

function CartLayout() {
	const router = useRouter();
	const location = router.state.location;

	return (
		<div className='col-span-1 px-5 py-7 md:col-span-12 xl:py-10 2xl:py-12'>
			<div className='mx-auto sm:max-w-2xl md:max-w-3xl lg:max-w-5xl xl:max-w-6xl 2xl:max-w-[90rem]'>
				<h2 className='mb-7 text-2xl font-bold lg:text-3xl xl:text-4xl'>
					Shopping Cart
				</h2>

				<Stepper path={location.pathname} />

				<Outlet />
			</div>
		</div>
	);
}
