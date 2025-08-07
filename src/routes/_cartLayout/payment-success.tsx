import { Link, createFileRoute, redirect } from '@tanstack/react-router';
import { MakePaymentSchema } from '@/utils/zod';
import { useCartStore } from '@/store/cartStore';

export const Route = createFileRoute('/_cartLayout/payment-success')({
	component: RouteComponent,
	validateSearch: MakePaymentSchema,
	beforeLoad: ({ search }) => {
		if (!search.amount || search.amount <= 0) {
			throw redirect({ to: '/cart' });
		}
	},
});

function RouteComponent() {
	const { amount } = Route.useSearch();
	const { setCartPage } = useCartStore();

	const handleResetCartpage = () => {
		setCartPage('cart');
	};

	return (
		<div className='flex min-h-[70vh] items-center justify-center px-4 py-12'>
			<div className='flex w-full max-w-md flex-col items-center rounded-xl bg-white p-8 shadow-lg'>
				<div className='mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-100'>
					<svg
						className='h-12 w-12 text-green-500'
						fill='none'
						viewBox='0 0 24 24'
						stroke='currentColor'
						strokeWidth={2}
					>
						<circle
							cx='12'
							cy='12'
							r='10'
							stroke='currentColor'
							strokeWidth='2'
							fill='none'
						/>
						<path
							strokeLinecap='round'
							strokeLinejoin='round'
							strokeWidth='2'
							d='M8 12l3 3 5-5'
						/>
					</svg>
				</div>
				<h2 className='mb-2 text-2xl font-bold text-gray-800'>
					Payment Successful!
				</h2>
				<p className='mb-4 text-center text-gray-600'>
					Thank you for your purchase. Your payment has been processed
					successfully.
				</p>
				<div className='mb-6 flex items-center gap-2 text-lg font-semibold text-gray-700'>
					<span>Amount Paid:</span>
					<span className='text-green-600'>
						${amount ? Number(amount).toFixed(2) : '0.00'}
					</span>
				</div>

				<div className='flex items-center gap-3'>
					<Link
						to='/cart'
						onClick={handleResetCartpage}
						className='inline-block rounded-lg bg-black px-6 py-3 font-semibold text-white shadow transition hover:bg-black/80'
					>
						View Your Cart
					</Link>

					<Link
						to='/products'
						onClick={handleResetCartpage}
						className='inline-block rounded-lg border border-black bg-white px-6 py-3 font-semibold text-black shadow transition hover:bg-black/10'
					>
						Go to Products
					</Link>
				</div>
			</div>
		</div>
	);
}
