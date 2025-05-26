import NewArrival from '@/components/NewArrival';
import { ScrollFadeSection } from '@/components/ScrollFadeSection';
import { createFileRoute } from '@tanstack/react-router';
import { CiSearch } from 'react-icons/ci';

export const Route = createFileRoute('/products/books/')({
	component: BooksIndex,
});

function BooksIndex() {
	return (
		<div className='col-span-1 md:col-span-12'>
			{/* New Arrivals */}
			<NewArrival />

			{/* Sortby and Products List*/}
			<section>
				<ScrollFadeSection className='mt-12 mb-3 flex items-center justify-between px-12'>
					<div className='relative flex flex-row items-center gap-3'>
						<input
							type='input'
							placeholder='Enter Book Title'
							className='rounded-xl border border-gray-400 px-4 py-1 font-light text-gray-700 focus:border-gray-500 focus:outline-none'
						/>

						<CiSearch className='absolute right-3' />
					</div>

					<div className='flex flex-row items-center gap-3'>
						<p className='text-md font-light'>Sort By:</p>
						<select className='border-b border-gray-400 px-2 font-light text-gray-700 focus:border-gray-500 focus:outline-none'>
							<option value='newest'>Newest</option>
							<option value='oldest'>Oldest</option>
							<option value='price-asc'>Price: Low to High</option>
							<option value='price-desc'>Price: High to Low</option>
							<option value='popularity'>Popularity</option>
							<option value='rating'>Rating</option>
						</select>
					</div>
				</ScrollFadeSection>

				<ScrollFadeSection className='grid grid-cols-2 gap-3 px-12 md:grid-cols-4'>
					<div className='rounded-lg bg-white shadow-md'>
						<img
							src='https://picsum.photos/id/1015/400/600'
							alt='book cover'
							className='h-88 w-full object-cover'
						/>

						<div className='p-5'>
							<h3 className='text-xl font-bold'>Book Title 1</h3>
							<p className='text-gray-600'>Author Name</p>
							<p className='mt-2 text-lg font-semibold'>$19.99</p>
							<button className='mt-2 w-full cursor-pointer rounded-full border bg-black px-4 py-2 text-white transition-colors duration-300 hover:bg-black/80'>
								Add to Cart
							</button>
						</div>
					</div>

					<div className='rounded-lg bg-white shadow-md'>
						<img
							src='https://picsum.photos/id/1015/400/600'
							alt='book cover'
							className='h-88 w-full object-cover'
						/>

						<div className='p-5'>
							<h3 className='text-xl font-bold'>Book Title 1</h3>
							<p className='text-gray-600'>Author Name</p>
							<p className='mt-2 text-lg font-semibold'>$19.99</p>
							<button className='mt-2 w-full cursor-pointer rounded-full border bg-black px-4 py-2 text-white transition-colors duration-300 hover:bg-black/80'>
								Add to Cart
							</button>
						</div>
					</div>

					<div className='rounded-lg bg-white shadow-md'>
						<img
							src='https://picsum.photos/id/1015/400/600'
							alt='book cover'
							className='h-88 w-full object-cover'
						/>

						<div className='p-5'>
							<h3 className='text-xl font-bold'>Book Title 1</h3>
							<p className='text-gray-600'>Author Name</p>
							<p className='mt-2 text-lg font-semibold'>$19.99</p>
							<button className='mt-2 w-full cursor-pointer rounded-full border bg-black px-4 py-2 text-white transition-colors duration-300 hover:bg-black/80'>
								Add to Cart
							</button>
						</div>
					</div>

					<div className='rounded-lg bg-white shadow-md'>
						<img
							src='https://picsum.photos/id/1015/400/600'
							alt='book cover'
							className='h-88 w-full object-cover'
						/>

						<div className='p-5'>
							<h3 className='text-xl font-bold'>Book Title 1</h3>
							<p className='text-gray-600'>Author Name</p>
							<p className='mt-2 text-lg font-semibold'>$19.99</p>
							<button className='mt-2 w-full cursor-pointer rounded-full border bg-black px-4 py-2 text-white transition-colors duration-300 hover:bg-black/80'>
								Add to Cart
							</button>
						</div>
					</div>

					<div className='rounded-lg bg-white shadow-md'>
						<img
							src='https://picsum.photos/id/1015/400/600'
							alt='book cover'
							className='h-88 w-full object-cover'
						/>

						<div className='p-5'>
							<h3 className='text-xl font-bold'>Book Title 1</h3>
							<p className='text-gray-600'>Author Name</p>
							<p className='mt-2 text-lg font-semibold'>$19.99</p>
							<button className='mt-2 w-full cursor-pointer rounded-full border bg-black px-4 py-2 text-white transition-colors duration-300 hover:bg-black/80'>
								Add to Cart
							</button>
						</div>
					</div>

					<div className='rounded-lg bg-white shadow-md'>
						<img
							src='https://picsum.photos/id/1015/400/600'
							alt='book cover'
							className='h-88 w-full object-cover'
						/>

						<div className='p-5'>
							<h3 className='text-xl font-bold'>Book Title 1</h3>
							<p className='text-gray-600'>Author Name</p>
							<p className='mt-2 text-lg font-semibold'>$19.99</p>
							<button className='mt-2 w-full cursor-pointer rounded-full border bg-black px-4 py-2 text-white transition-colors duration-300 hover:bg-black/80'>
								Add to Cart
							</button>
						</div>
					</div>

					<div className='rounded-lg bg-white shadow-md'>
						<img
							src='https://picsum.photos/id/1015/400/600'
							alt='book cover'
							className='h-88 w-full object-cover'
						/>

						<div className='p-5'>
							<h3 className='text-xl font-bold'>Book Title 1</h3>
							<p className='text-gray-600'>Author Name</p>
							<p className='mt-2 text-lg font-semibold'>$19.99</p>
							<button className='mt-2 w-full cursor-pointer rounded-full border bg-black px-4 py-2 text-white transition-colors duration-300 hover:bg-black/80'>
								Add to Cart
							</button>
						</div>
					</div>

					<div className='rounded-lg bg-white shadow-md'>
						<img
							src='https://picsum.photos/id/1015/400/600'
							alt='book cover'
							className='h-88 w-full object-cover'
						/>

						<div className='p-5'>
							<h3 className='text-xl font-bold'>Book Title 1</h3>
							<p className='text-gray-600'>Author Name</p>
							<p className='mt-2 text-lg font-semibold'>$19.99</p>
							<button className='mt-2 w-full cursor-pointer rounded-full border bg-black px-4 py-2 text-white transition-colors duration-300 hover:bg-black/80'>
								Add to Cart
							</button>
						</div>
					</div>

					<div className='rounded-lg bg-white shadow-md'>
						<img
							src='https://picsum.photos/id/1015/400/600'
							alt='book cover'
							className='h-88 w-full object-cover'
						/>

						<div className='p-5'>
							<h3 className='text-xl font-bold'>Book Title 1</h3>
							<p className='text-gray-600'>Author Name</p>
							<p className='mt-2 text-lg font-semibold'>$19.99</p>
							<button className='mt-2 w-full cursor-pointer rounded-full border bg-black px-4 py-2 text-white transition-colors duration-300 hover:bg-black/80'>
								Add to Cart
							</button>
						</div>
					</div>

					<div className='rounded-lg bg-white shadow-md'>
						<img
							src='https://picsum.photos/id/1015/400/600'
							alt='book cover'
							className='h-88 w-full object-cover'
						/>

						<div className='p-5'>
							<h3 className='text-xl font-bold'>Book Title 1</h3>
							<p className='text-gray-600'>Author Name</p>
							<p className='mt-2 text-lg font-semibold'>$19.99</p>
							<button className='mt-2 w-full cursor-pointer rounded-full border bg-black px-4 py-2 text-white transition-colors duration-300 hover:bg-black/80'>
								Add to Cart
							</button>
						</div>
					</div>

					<div className='rounded-lg bg-white shadow-md'>
						<img
							src='https://picsum.photos/id/1015/400/600'
							alt='book cover'
							className='h-88 w-full object-cover'
						/>

						<div className='p-5'>
							<h3 className='text-xl font-bold'>Book Title 1</h3>
							<p className='text-gray-600'>Author Name</p>
							<p className='mt-2 text-lg font-semibold'>$19.99</p>
							<button className='mt-2 w-full cursor-pointer rounded-full border bg-black px-4 py-2 text-white transition-colors duration-300 hover:bg-black/80'>
								Add to Cart
							</button>
						</div>
					</div>

					<div className='rounded-lg bg-white shadow-md'>
						<img
							src='https://picsum.photos/id/1015/400/600'
							alt='book cover'
							className='h-88 w-full object-cover'
						/>

						<div className='p-5'>
							<h3 className='text-xl font-bold'>Book Title 1</h3>
							<p className='text-gray-600'>Author Name</p>
							<p className='mt-2 text-lg font-semibold'>$19.99</p>
							<button className='mt-2 w-full cursor-pointer rounded-full border bg-black px-4 py-2 text-white transition-colors duration-300 hover:bg-black/80'>
								Add to Cart
							</button>
						</div>
					</div>
				</ScrollFadeSection>
			</section>
		</div>
	);
}
