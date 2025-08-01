import { useSuspenseQuery } from '@tanstack/react-query';
import {
	createFileRoute,
	Link,
	redirect,
	useRouter,
} from '@tanstack/react-router';
import { useState } from 'react';
import { FaRegTrashAlt } from 'react-icons/fa';
import type {
	CartItems,
	DeleteItemObjType,
	QuantityAction,
	UpdateItemObjType,
	UserCartType,
} from '@/types';
import {
	getOrCreateCartQueryOptions,
	useDeleteCartItem,
	useUpdateQuantity,
} from '@/utils/servers/cart';
import ConfirmationModal from '@/components/ConfirmationModal';

export const Route = createFileRoute('/_cartLayout/cart')({
	component: Cart,
	beforeLoad: async ({ context }) => {
		const userId = context.userID;

		if (!userId) throw redirect({ to: '/signin' });

		await context.queryClient.ensureQueryData(
			getOrCreateCartQueryOptions(userId)
		);

		return { userId };
	},
});

function Cart() {
	const router = useRouter();
	const { userId } = Route.useRouteContext();
	const { data: userCart } = useSuspenseQuery(
		getOrCreateCartQueryOptions(userId)
	);
	const { mutateAsync: deleteItem } = useDeleteCartItem();
	const { mutateAsync: updateQuantity } = useUpdateQuantity();
	const [selectedItem, setSelectedItem] = useState<CartItems | undefined>(
		undefined
	);
	const [showModal, setShowModal] = useState(false);
	const [checkedItems, setCheckedItems] = useState(new Set());
	const cartItems = userCart.items.map((item) => {
		switch (item.itemType) {
			case 'BOOK':
				return {
					...item.book,
					cartItemId: item.id,
					price: Number(item.book?.price) || 0,
					quantity: item.quantity || 0,
					isChecked: checkedItems.has(item.id),
				};
			case 'MANGA':
				// In development
				break;
			case 'NOVEL':
				//  in development
				break;
		}
	});

	const disabledButton = !cartItems.some((item) => item?.isChecked);
	if (typeof window !== 'undefined') {
		window.userCart = userCart as UserCartType;
		window.cartItems = cartItems;
	}

	const cartTotal = cartItems
		.filter((item) => item && checkedItems.has(item.cartItemId))
		.map((item) => (item?.price ?? 0) * (item?.quantity ?? 0))
		.reduce((sum, itemTotal) => sum + itemTotal, 0)
		.toFixed(2);

	const toggleItemCheck = (cartItemId: string | undefined) => {
		setCheckedItems((prev) => {
			const newSet = new Set(prev);
			if (newSet.has(cartItemId)) {
				newSet.delete(cartItemId);
			} else {
				newSet.add(cartItemId);
			}
			return newSet;
		});
	};

	const handleShowModal = (item: CartItems | undefined) => {
		setSelectedItem(item);
		setShowModal(true);
	};

	const handleConfirmDelete = async () => {
		if (selectedItem) {
			const deleteItemObj = {
				cartId: userCart.id,
				itemId: selectedItem.cartItemId,
				userId: userId,
			} satisfies DeleteItemObjType;

			await deleteItem({ data: deleteItemObj });

			setCheckedItems((prev) => {
				const newSet = new Set(prev);
				newSet.delete(selectedItem.cartItemId);
				return newSet;
			});

			router.invalidate();
			setSelectedItem(undefined);
			setShowModal(false);
		}
	};

	const handleCancelDelete = () => {
		setSelectedItem(undefined);
		setShowModal(false);
	};

	const handleUpdateItemQuantity = async (
		type: QuantityAction,
		itemId: string
	) => {
		const updateItemObj = {
			type: type,
			cartId: userCart.id,
			itemId: itemId,
			userId: userId,
		} satisfies UpdateItemObjType;

		try {
			await updateQuantity({ data: updateItemObj });

			router.invalidate();
		} catch (error) {
			if (error instanceof Error) {
				console.error(error);
			}
		}
	};

	return (
		<>
			{/* For Small Devices */}
			<div className='pb-50 lg:hidden'>
				<div className='grid grid-cols-1 gap-3'>
					<div className='flex flex-row justify-between px-2 text-sm text-gray-400/80 md:text-[15px]'>
						<p>Total items in cart:</p>
						<p>2</p>
					</div>
					{cartItems.length ? (
						cartItems
							.filter((item) => item !== undefined)
							.map((item) => (
								<div
									key={item.id}
									className='grid grid-cols-[3px_100px_2fr_50px] gap-5 rounded-lg border border-gray-300 px-3 py-4 sm:gap-6 sm:px-6 sm:py-6 md:gap-7 md:px-7 md:py-5'
								>
									<div>
										<input
											type='checkbox'
											className='h-4 w-4 cursor-pointer accent-black'
											checked={item.isChecked}
											onChange={() => toggleItemCheck(item.cartItemId)}
										/>
									</div>

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
												<button
													disabled={item.quantity < 2}
													onClick={() =>
														handleUpdateItemQuantity(
															'Decrease',
															item.cartItemId
														)
													}
													className={`flex h-6 w-6 items-center justify-center rounded border border-gray-300 transition-colors hover:bg-gray-100 sm:h-7 sm:w-7 ${item.quantity < 2 ? 'cursor-not-allowed opacity-50' : 'cursor-pointer hover:bg-gray-100'}`}
												>
													<span className='text-sm font-bold'>-</span>
												</button>

												<input
													type='input'
													value={item.quantity || 1}
													className='h-6 w-7 rounded text-center focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none sm:h-7 sm:w-9'
													min='1'
													readOnly
												/>

												<button
													onClick={() =>
														handleUpdateItemQuantity(
															'Increase',
															item.cartItemId
														)
													}
													className='flex h-6 w-6 items-center justify-center rounded border border-gray-300 transition-colors hover:bg-gray-100 sm:h-7 sm:w-7'
												>
													<span className='cursor-pointer text-sm font-bold'>
														+
													</span>
												</button>
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

										<div
											onClick={() => handleShowModal(item)}
											className='flex h-6 w-6 items-center justify-center rounded-full border border-black p-1 text-black transition-colors duration-300 hover:bg-black/10 sm:h-7 sm:w-7'
										>
											<FaRegTrashAlt className='h-3 w-3 sm:h-4 sm:w-4' />
										</div>
									</div>
								</div>
							))
					) : (
						<p className='rounded-lg border border-gray-500/50 px-2 py-4 text-center text-[0.8rem] font-bold text-gray-400'>
							Your cart is currently empty. Start shopping to add items!
						</p>
					)}
				</div>
			</div>

			{/* Checkout */}
			<div className='fixed right-0 bottom-0 left-0 z-50 border-t border-gray-200 bg-white shadow-lg lg:hidden'>
				<div className='px-6 py-7'>
					<div className='mb-8'>
						<div className='flex items-center justify-between'>
							<span className='text-lg font-medium text-gray-900'>
								Subtotal
							</span>
							<span className='text-lg font-bold text-gray-900'>{`$${cartTotal}`}</span>
						</div>

						<p className='text-sm font-light text-gray-400'>
							Price includes all applicable taxes
						</p>
					</div>

					<Link
						to='/checkout'
						disabled={disabledButton}
						className={`flex w-full items-center justify-center rounded-full py-4 text-center font-medium text-white transition-colors duration-300 ${disabledButton ? 'cursor-not-allowed bg-black/50' : 'cursor-pointer bg-black hover:bg-black/80'}`}
					>
						Continue to Checkout
					</Link>
				</div>
			</div>

			{/* For Large Devices */}
			<div className='hidden grid-cols-[2fr_1fr] gap-5 lg:grid xl:gap-8 2xl:grid-cols-[3fr_1.2fr]'>
				<div className='rounded-lg border border-gray-300 px-5 py-6'>
					{cartItems.length ? (
						cartItems
							.filter((item) => item !== undefined)
							.map((item) => (
								<div
									key={item.id}
									className='mb-5 grid grid-cols-[10px_130px_290px_2fr] gap-5 rounded-lg border border-gray-300 px-4 py-3'
								>
									<div>
										<input
											type='checkbox'
											className='h-4 w-4 cursor-pointer accent-black'
											checked={item.isChecked}
											onChange={() => toggleItemCheck(item.cartItemId)}
										/>
									</div>

									<div className='h-auto w-auto overflow-hidden bg-gray-200 p-2'>
										<img src={item.coverImg} className='h-full w-full' />
									</div>

									<div className='flex flex-col justify-between'>
										<div className='flex flex-col'>
											<h2 className='text-[22px] font-bold'>{item.title}</h2>
											<p className='text-[15px] font-light text-gray-400/80'>
												{item.author}
											</p>
											<p className='text-[15px] font-light text-gray-400/80'>
												{item.language}
											</p>
										</div>

										<div>
											<p className='text-[15px] text-gray-300 line-through'>
												$10.38
											</p>
											<p className='text-2xl font-bold'>${item.price}</p>
										</div>
									</div>

									<div className='flex flex-col items-end justify-between'>
										<div
											onClick={() => handleShowModal(item)}
											className='flex h-7 w-7 items-center justify-center rounded-full border border-black p-1 text-black transition-colors duration-300 hover:bg-black/10'
										>
											<FaRegTrashAlt className='h-4 w-4 cursor-pointer' />
										</div>

										<div className='mt-2 flex items-center'>
											<button
												disabled={item.quantity < 2}
												onClick={() =>
													handleUpdateItemQuantity('Decrease', item.cartItemId)
												}
												className={`flex h-6 w-6 items-center justify-center rounded border border-gray-300 transition-colors ${item.quantity < 2 ? 'cursor-not-allowed opacity-50' : 'cursor-pointer hover:bg-gray-100'}`}
											>
												<span className='text-sm font-bold'>-</span>
											</button>

											<input
												type='text'
												value={item.quantity}
												className='h-6 w-7 rounded border-0 px-0 text-center focus:border-transparent focus:ring-2 focus:ring-black focus:outline-none'
												min='1'
												readOnly
											/>

											<button
												onClick={() =>
													handleUpdateItemQuantity('Increase', item.cartItemId)
												}
												className='flex h-6 w-6 cursor-pointer items-center justify-center rounded border border-gray-300 transition-colors hover:bg-gray-100'
											>
												<span className='text-sm font-bold'>+</span>
											</button>
										</div>
									</div>
								</div>
							))
					) : (
						<p className='rounded-lg border border-gray-500/50 px-2 py-2 text-center text-[1rem] font-bold text-gray-400'>
							Your cart is currently empty. Start shopping to add items!
						</p>
					)}
				</div>

				{/* Order Summary */}
				<div className='h-auto max-h-90 rounded-lg bg-gray-300 px-5 py-5'>
					<h2 className='mb-5 text-2xl font-medium'>Order Summary</h2>

					<div className='flex flex-col'>
						<div className='mb-1 flex items-center justify-between font-mono text-gray-500'>
							<p className=''>Subtotal</p>
							<p className='font-semibold'>{`$${cartTotal}`}</p>
						</div>

						<div className='mb-1 flex items-center justify-between font-mono text-gray-500'>
							<p className=''>Delivery</p>
							<p className='font-semibold'>$14.00</p>
						</div>

						<div className='mb-3 flex items-center justify-between font-mono text-red-500/80'>
							<p className=''>Discount</p>
							<p className='font-semibold'>$14.00</p>
						</div>

						<div className='mb-1.5 border border-gray-400/50'></div>

						<div className='mb-1.5 flex justify-between text-lg font-bold'>
							<p>Total</p>
							<p>{`$${cartTotal}`}</p>
						</div>

						<div className='mb-3 border border-gray-400/50'></div>

						<Link
							to='/checkout'
							disabled={disabledButton}
							className={`mb-3.5 rounded-xl border py-3 text-center text-white transition-colors duration-300 ${disabledButton ? 'cursor-not-allowed bg-black/50' : 'cursor-pointer bg-black hover:bg-black/80'}`}
						>
							Continue to Checkout
						</Link>

						<div className='mb-5'>
							<p className='mb-1 text-[15px] font-semibold'>Promo Code</p>

							<div className='flex flex-row gap-1'>
								<input
									aria-label='promo code input'
									type='text'
									value=''
									className='w-full rounded-lg border border-gray-500/50 px-2 py-1 focus:ring-1 focus:ring-black focus:ring-offset-0 focus:outline-none'
									placeholder='Enter you promo code'
									readOnly
								/>
								<button className='cursor-pointer rounded-lg border bg-black px-5 py-1 text-sm text-white transition-colors duration-300 hover:bg-black/80'>
									Apply
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>

			{showModal && (
				<ConfirmationModal
					message='Do you really want to delete this item?'
					confirmFn={handleConfirmDelete}
					cancelFn={handleCancelDelete}
				/>
			)}
		</>
	);
}
