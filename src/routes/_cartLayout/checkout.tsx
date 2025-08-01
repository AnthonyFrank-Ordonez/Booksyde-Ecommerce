import { Link, createFileRoute, redirect } from '@tanstack/react-router';
import { useSuspenseQuery } from '@tanstack/react-query';
import { getOrCreateCartQueryOptions } from '@/utils/servers/cart';
import { useCartStore } from '@/store/cartStore';
import { getUserDefaultAddQueryOptions } from '@/utils/servers/address';

export const Route = createFileRoute('/_cartLayout/checkout')({
	component: RouteComponent,
	beforeLoad: async ({ context }) => {
		const userId = context.userID;
		const session = context.session!;
		const { checkedItemIds } = useCartStore.getState();

		if (!userId) throw redirect({ to: '/signin' });

		if (!checkedItemIds.size) throw redirect({ to: '/cart' });

		await context.queryClient.ensureQueryData(
			getOrCreateCartQueryOptions(userId)
		);
		await context.queryClient.ensureQueryData(
			getUserDefaultAddQueryOptions(session.id)
		);

		return { userId, session };
	},
});

function RouteComponent() {
	const { userId, session } = Route.useRouteContext();
	const { checkedItemIds } = useCartStore();
	const { data: userCart } = useSuspenseQuery(
		getOrCreateCartQueryOptions(userId)
	);
	const { data: userDefaultAddress } = useSuspenseQuery(
		getUserDefaultAddQueryOptions(session.id)
	);

	const cartItems = userCart.items
		.map((item) => {
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
		})
		.filter((item) => !!item);

	const checkoutItems = cartItems.filter((item) =>
		checkedItemIds.has(item.cartItemId)
	);

	const checkOutTotal = checkoutItems
		.map((item) => item.price * item.quantity)
		.reduce((sum, total) => sum + total, 0);

	return (
		<>
			{/* Small Screens */}
			<div className='pb-50 lg:hidden'>
				<div className='grid grid-cols-1 gap-5'>
					<div className='grid grid-cols-1 gap-3 rounded-lg border border-gray-300 px-3 py-3 sm:px-4 sm:py-4 md:px-6 md:py-6'>
						{checkoutItems.map((item) => (
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
										<p className='text-sm text-gray-300 line-through'>$10.38</p>
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
								<p className='font-bold text-gray-500'>
									{session.firstName}, {session.lastName}
								</p>
								<p className='text-gray-500'>{session.email}</p>
								<p className='text-gray-500'>+{session.phone}</p>
							</div>
						</div>

						<div className='mb-5 flex flex-col gap-3'>
							<p className='text-sm font-bold sm:text-[14px] md:text-[15px]'>
								Shipping Address:
							</p>

							<div className='flex items-center justify-between rounded-lg border border-gray-300 p-3 text-sm'>
								<p className='text-gray-500/90'>
									{userDefaultAddress?.houseNo} {userDefaultAddress?.street},{' '}
									{userDefaultAddress?.city}, {userDefaultAddress?.province},{' '}
									{userDefaultAddress?.country}, {userDefaultAddress?.postal}
								</p>
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
							<span className='text-lg font-bold text-gray-900'>
								${checkOutTotal.toFixed(2)}
							</span>
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

			{/* Big Screens */}
			<div className='hidden grid-cols-[2fr_1fr] gap-5 lg:grid xl:gap-8 2xl:grid-cols-[3fr_1.2fr]'>
				<div className='rounded-lg border border-gray-300 px-5 py-6'>
					<div className='mb-5 flex flex-col'>
						<p className='mb-2 font-bold'>Personal Information:</p>

						<div className='flex flex-col gap-1 rounded-lg border border-gray-300 p-3'>
							<p className='font-bold text-gray-500'>
								{session.firstName}, {session.lastName}
							</p>
							<p className='text-gray-500'>{session.email}</p>
							<p className='text-gray-500'>+{session.phone}</p>
						</div>
					</div>

					<div className='mb-5 flex flex-col'>
						<p className='mb-2 font-bold'>Shipping Address:</p>

						<div className='flex items-center justify-between rounded-lg border border-gray-300 p-3 text-sm'>
							<p className='text-gray-500/90'>
								{userDefaultAddress?.houseNo} {userDefaultAddress?.street},{' '}
								{userDefaultAddress?.city}, {userDefaultAddress?.province},{' '}
								{userDefaultAddress?.country}, {userDefaultAddress?.postal}
							</p>
						</div>
					</div>

					<div className='mb-10 flex max-w-xl flex-col gap-3'>
						<p className='font-bold'>Payment Information:</p>

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

					<div className='flex max-w-md gap-3'>
						<Link
							to='/cart'
							className='w-full rounded-md border border-black bg-white py-3 text-center font-medium text-black transition-colors duration-300 hover:bg-black/10'
						>
							Back to Cart
						</Link>

						<Link
							to='/cart'
							className='w-full rounded-md bg-black px-5 py-3 text-center font-medium text-white transition-colors duration-300 hover:bg-black/80'
						>
							Confirm Payment $0.00
						</Link>
					</div>
				</div>

				{/* Order Summary */}
				<div className='self-start rounded-lg bg-gray-300 px-5 py-5'>
					<h2 className='mb-3 text-xl font-medium'>Order Summary</h2>

					<div className='mb-3 flex flex-col gap-1 font-mono text-sm text-gray-500'>
						{checkoutItems.map((item) => (
							<div key={item.id} className='flex justify-between'>
								<p className='maw-w-sm'>
									x{item.quantity}{' '}
									{item.title && item.title.length > 25
										? `${item.title.substring(0, 25)}...`
										: item.title}
								</p>
								<p className='font-semibold'>${item.price}</p>
							</div>
						))}
					</div>

					<div className='flex flex-col text-sm'>
						<div className='mb-1 flex items-center justify-between font-mono text-gray-500'>
							<p className=''>Subtotal</p>
							<p className='font-semibold'>${checkOutTotal.toFixed(2)}</p>
						</div>

						<div className='mb-1 flex items-center justify-between font-mono text-gray-500'>
							<p className=''>Delivery</p>
							<p className='font-semibold'>$14.00</p>
						</div>

						<div className='mb-3 flex items-center justify-between font-mono text-red-500/80'>
							<p className=''>Discount</p>
							<p className='font-semibold'>$14.00</p>
						</div>

						<div className='mb-2.5 border border-gray-400/30'></div>

						<div className='mb-2.5 flex justify-between text-[17px] font-bold'>
							<p>Order Total</p>
							<p>${checkOutTotal}</p>
						</div>

						<div className='mb-5 border border-gray-400/30'></div>

						<div className='mb-1'>
							<div className='flex flex-row gap-3'>
								<input
									aria-label='promo code input'
									type='text'
									className='w-full rounded-md border border-gray-500/50 px-2 py-2 focus:ring-1 focus:ring-black focus:ring-offset-0 focus:outline-none'
									placeholder='Enter you promo code'
									readOnly
								/>
								<button className='cursor-pointer rounded-md border bg-black px-5 py-2 text-sm text-white transition-colors duration-300 hover:bg-black/80'>
									Apply
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
