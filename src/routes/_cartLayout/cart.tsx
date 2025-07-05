import { createFileRoute } from '@tanstack/react-router';
import { FaRegTrashAlt } from 'react-icons/fa';

export const Route = createFileRoute('/_cartLayout/cart')({
	component: Cart,
});

function Cart() {
	const carts = [
		{
			id: 1,
			imgUrl:
				'https://res.cloudinary.com/dcurf3qko/image/upload/v1749132295/harry-potter-phoenix_k4bxto.jpg',
			bookTitle: 'Harry Potter and the Order of the Phoenix',
			author: 'Author Name',
			price: '$7.38',
			quantity: 1,
		},
		{
			id: 2,
			imgUrl:
				'https://res.cloudinary.com/dcurf3qko/image/upload/v1749132295/harry-potter-phoenix_k4bxto.jpg',
			bookTitle: 'Harry Potter and the Order of the Phoenix',
			author: 'Author Name',
			price: '$7.38',
			quantity: 1,
		},
	];

	return (
		<>
			<div className='pb-28'>
				<div className='grid grid-cols-1 gap-3'>
					<div className='flex flex-row justify-between px-2 text-sm text-gray-400/80'>
						<p>Total items in cart:</p>
						<p>2</p>
					</div>
					{carts.map((item) => (
						<div
							key={item.id}
							className='grid grid-cols-[3px_100px_2fr_50px] gap-5 rounded-lg border border-gray-300 px-3 py-4'
						>
							<div className=''>
								<input type='checkbox' className='h-4 w-4 accent-black' />
							</div>

							<div className='h-auto w-auto overflow-hidden bg-gray-200 p-2'>
								<img src={item.imgUrl} className='h-full w-full' />
							</div>

							<div className='flex flex-col justify-between'>
								<div className='flex flex-col gap-1'>
									<h2 className='line-clamp-2 text-[14px] font-medium'>
										{item.bookTitle}
									</h2>
									<p className='text-[14px] font-light text-gray-500'>
										{item.author}
									</p>
								</div>

								<div>
									<div className='mt-2 flex items-center'>
										<button className='flex h-6 w-6 items-center justify-center rounded border border-gray-300 transition-colors hover:bg-gray-100'>
											<span className='text-sm font-bold'>-</span>
										</button>

										<input
											type='number'
											value={item.quantity || 1}
											className='h-6 w-7 rounded text-center focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none'
											min='1'
											readOnly
										/>

										<button className='flex h-6 w-6 items-center justify-center rounded border border-gray-300 transition-colors hover:bg-gray-100'>
											<span className='text-sm font-bold'>+</span>
										</button>
									</div>
								</div>
							</div>

							<div className='flex flex-col items-center justify-between'>
								<p className='text-[15px] font-extrabold'>{item.price}</p>

								<div className='flex h-6 w-6 items-center justify-center rounded-full border p-1 text-gray-400/80'>
									<FaRegTrashAlt className='h-3 w-3' />
								</div>
							</div>
						</div>
					))}
				</div>
			</div>

			{/* Checkout */}
			<div className='fixed right-0 bottom-0 left-0 z-50 border-t border-gray-200 bg-white shadow-lg'>
				<div className='px-6 py-7'>
					<div className='mb-8'>
						<div className='flex items-center justify-between'>
							<span className='text-lg font-medium text-gray-900'>
								Subtotal
							</span>
							<span className='text-lg font-bold text-gray-900'>$12.00</span>
						</div>

						<p className='text-sm font-light text-gray-400'>
							Price includes all applicable taxes
						</p>
					</div>

					<button className='w-full rounded-full bg-gray-900 py-4 font-medium text-white transition-colors hover:bg-gray-800'>
						Continue to Checkout
					</button>
				</div>
			</div>
		</>
	);
}
