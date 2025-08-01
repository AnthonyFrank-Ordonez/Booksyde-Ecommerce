import { Link, createFileRoute, redirect } from '@tanstack/react-router';
import { useSuspenseQuery } from '@tanstack/react-query';
import { MdOutlineLocationOn } from 'react-icons/md';
import { getOrCreateCartQueryOptions } from '@/utils/servers/cart';

export const Route = createFileRoute('/_cartLayout/checkout')({
	component: RouteComponent,
	beforeLoad: async ({ context }) => {
		const userId = context.userID;

		if (!userId) throw redirect({ to: '/signin' });

		await context.queryClient.ensureQueryData(
			getOrCreateCartQueryOptions(userId)
		);

		return { userId };
	},
});

function RouteComponent() {
	const { userId } = Route.useRouteContext();
	const { data: userCart } = useSuspenseQuery(
		getOrCreateCartQueryOptions(userId)
	);

	const cartItems = userCart.items.map((item) => {
		switch (item.itemType) {
			case 'BOOK':
				return {
					...item.book,
					cartItemId: item.id,
					price: Number(item.book?.price) || 0,
					quantity: item.quantity || 0,
					isChecked: false,
				};
			case 'MANGA':
				// In development
				break;
			case 'NOVEL':
				//  in development
				break;
		}
	});

	return (
		<>
			{/* Small Screens */}
			<div className='pb-50 lg:hidden'>
				<div className='grid grid-cols-1 gap-5'>
					<div className='grid grid-cols-1 gap-3 rounded-lg border border-gray-300 px-3 py-3 sm:px-4 sm:py-4 md:px-6 md:py-6'>
						{cartItems
							.filter((item) => item !== undefined)
							.map((item) => (
								<div
									key={item.id}
									className='grid grid-cols-[100px_2fr_50px] gap-5 rounded-lg border border-gray-300 px-3 py-4 sm:gap-6 sm:px-6 sm:py-6 md:gap-7 md:px-7 md:py-5'
								>
									<div className='h-auto w-auto overflow-hidden bg-gray-200 p-2'>
										<img src={item.coverImg} className='h-full w-full' />
									</div>

									<div className='flex flex-col justify-between'>
										<div className='flex flex-col'>
											<h2 className='line-clamp-2 text-[14px] font-medium sm:text-[17px] md:text-[19px]'>
												{item.title}
											</h2>
											<p className='text-[14px] font-light text-gray-500 sm:text-[16px] md:text-[15px]'>
												{item.author}
											</p>
											<p className='text-[14px] font-light text-gray-500 sm:text-[16px] md:text-[15px]'>
												{item.language}
											</p>
										</div>

										<div>
											<div className='mt-2 flex items-center'>
												<p className='text-[14px] font-light text-gray-500 sm:text-[16px] md:text-[15px]'>
													Quantity:
												</p>
												<input
													type='input'
													value={item.quantity || 1}
													className='h-6 w-4 rounded text-center text-[14px] text-gray-500 focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none sm:h-7 sm:w-7 sm:text-[16px] md:text-[15px]'
													min='1'
													readOnly
												/>
											</div>
										</div>
									</div>

									<div className='flex flex-col items-end justify-between'>
										<div className='flex flex-col items-end'>
											<p className='text-[15px] font-extrabold sm:text-[17px] md:text-[19px]'>
												${item.price}
											</p>
											<p className='text-sm text-gray-300 line-through'>
												$10.38
											</p>
										</div>
									</div>
								</div>
							))}
					</div>

					<div className='grid grid-cols-1 rounded-lg border border-gray-300 px-3 py-4 sm:px-4 sm:py-4 md:px-6 md:py-6'>
						<div className='mb-5 flex flex-col gap-3'>
							<p className='text-sm font-bold sm:text-[14px] md:text-[15px]'>
								Personal Information:
							</p>

							<div className='flex flex-col gap-1 rounded-lg border border-gray-300 p-3 text-sm'>
								<p className='font-bold text-gray-500'>First Name, Last Name</p>
								<p className='text-gray-500'>example@example.com</p>
								<p className='text-gray-500'>+123-456-7890</p>
							</div>
						</div>

						<div className='mb-5 flex flex-col gap-3'>
							<p className='text-sm font-bold sm:text-[14px] md:text-[15px]'>
								Shipping Address:
							</p>

							<div className='flex items-center justify-between rounded-lg border border-gray-300 p-3 text-sm'>
								<p className='font-bold text-gray-500'>user default address</p>
								<MdOutlineLocationOn className='h-5 w-5 text-gray-500 opacity-90' />
							</div>
						</div>

						<div className='mb-5 flex flex-col gap-3'>
							<p className='text-sm font-bold sm:text-[14px] md:text-[15px]'>
								Payment Information:
							</p>

							<div className='mb-2 flex items-center gap-3'>
								<div className='rounde-lg rounded-lg border border-gray-400'>
									<img
										src='/img/mastercard.png'
										alt='mastercard'
										className='h-12 w-full'
									/>
								</div>

								<div className='rounde-lg rounded-lg border border-gray-400'>
									<img
										src='/img/paypal.png'
										alt='mastercard'
										className='h-12 w-full'
									/>
								</div>

								<div className='rounde-lg rounded-lg border border-gray-400'>
									<img
										src='/img/gcash-2.png'
										alt='mastercard'
										className='h-12 w-17'
									/>
								</div>
							</div>

							<div className='flex flex-col gap-2'>
								<p className='text-sm font-bold text-gray-500 sm:text-[14px] md:text-[15px]'>
									Name on Card:
								</p>
								<input
									type='text'
									className='w-full rounded-md border border-gray-300 px-3 py-1 focus:border-transparent focus:ring-1 focus:outline-none'
								/>
							</div>

							<div className='flex gap-3'>
								<div className='flex flex-1 flex-col gap-2'>
									<p className='text-sm font-bold text-gray-500 sm:text-[14px] md:text-[15px]'>
										Expiration:
									</p>
									<input
										type='text'
										placeholder='MM/DD'
										className='w-full rounded-md border border-gray-300 px-3 py-1 focus:border-transparent focus:ring-1 focus:outline-none'
									/>
								</div>

								<div className='flex flex-1 flex-col gap-2'>
									<p className='text-sm font-bold text-gray-500 sm:text-[14px] md:text-[15px]'>
										CVV:
									</p>
									<input
										type='text'
										className='w-full rounded-md border border-gray-300 px-3 py-1 focus:border-transparent focus:ring-1 focus:outline-none'
									/>
								</div>
							</div>
						</div>

						<Link
							to='/cart'
							className='w-full rounded-md bg-black py-3 text-center font-medium text-white transition-colors duration-300 hover:bg-black/80'
						>
							Back to Cart
						</Link>
					</div>
				</div>
			</div>

			<div className='fixed right-0 bottom-0 left-0 z-50 border-t border-gray-200 bg-white shadow-lg lg:hidden'>
				<div className='px-6 py-7'>
					<div className='mb-8'>
						<div className='flex items-center justify-between'>
							<span className='text-lg font-medium text-gray-900'>
								Subtotal
							</span>
							<span className='text-lg font-bold text-gray-900'>{`$0.00`}</span>
						</div>

						<p className='text-sm font-light text-gray-400'>
							Price includes all applicable taxes
						</p>
					</div>

					<Link
						to='/checkout'
						className={`flex w-full items-center justify-center rounded-full bg-black py-4 text-center font-medium text-white transition-colors duration-300`}
					>
						Continue to Checkout
					</Link>
				</div>
			</div>
		</>
	);
}
