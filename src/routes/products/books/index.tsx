import NewArrival from '@/components/NewArrival';
import { ScrollFadeSection } from '@/components/ScrollFadeSection';
import { createFileRoute } from '@tanstack/react-router';
import { FaRegHeart, FaRegStar, FaStar } from 'react-icons/fa';
import { CiSearch } from 'react-icons/ci';

export const Route = createFileRoute('/products/books/')({
	component: BooksIndex,
});

function BooksIndex() {
	return (
		<div className='col-span-1 md:col-span-12 lg:col-span-12 xl:col-span-12'>
			{/* New Arrivals */}
			<NewArrival />

			{/* Sortby and Products List*/}
			<section>
				<div className='mt-12 grid grid-cols-1 py-12 md:grid-cols-12 lg:grid-cols-12'>
					<ScrollFadeSection className='col-span-1 border-gray-200 md:col-span-10 lg:col-span-10'>
						<div className='grid grid-cols-2 gap-11 border-r-2 border-gray-200 px-12 md:grid-cols-4 lg:grid-cols-4'>
							<div className='h-full w-62 rounded-lg bg-white shadow-md'>
								<img
									src='https://picsum.photos/id/1015/400/600'
									alt='book cover'
									className='h-64 w-full object-cover'
								/>

								<div className='p-5'>
									<h3 className='text-xl font-bold'>Book Title 1</h3>

									<div className='flex items-center gap-1'>
										<div className='flex items-center gap-1 text-yellow-400'>
											<FaStar />
											<FaStar />
											<FaStar />
											<FaStar />
											<FaRegStar />
										</div>
										(1,000+)
									</div>

									<div className='mt-2 flex items-center justify-between py-1'>
										<p className='text-gray-500'>Price</p>
										<p className='font-normal'>$19.99</p>
									</div>

									<div className='flex items-center justify-between py-1'>
										<p className='text-gray-500'>Stocks</p>
										<p className='font-normal'>35+</p>
									</div>

									<div className='flex items-center justify-between py-1'>
										<p className='text-gray-500'>Author</p>
										<p className='font-normal'>Author Name</p>
									</div>

									<div className='mt-3 flex flex-row items-center gap-2'>
										<button className='w-full flex-1 cursor-pointer rounded-md border bg-black px-4 py-2 text-white transition-colors duration-300 hover:bg-black/80'>
											Add to Cart
										</button>

										<div className='flex h-10 w-11 cursor-pointer items-center justify-center rounded-md border text-center transition-colors duration-300 hover:bg-gray-400/10'>
											<FaRegHeart size={24} />
										</div>
									</div>
								</div>
							</div>
						</div>
					</ScrollFadeSection>

					{/* Filter Section */}
					<ScrollFadeSection>
						<aside className='hidden h-screen w-48 px-5 lg:col-span-2 lg:block'>
							{/* Search */}
							<h2 className='text-md w-34 text-left font-bold text-black'>
								Search By Title:
							</h2>
							<div className='relative mt-1 flex flex-col gap-2 overflow-hidden'>
								<input
									type='text'
									placeholder='Enter Book Title'
									className='rounded-sm border border-gray-400 px-2 py-1 font-light text-gray-700 focus:border-gray-500 focus:outline-none'
								/>
								<CiSearch className='absolute top-2 right-2 text-gray-400' />
							</div>

							<h2 className='text-md mt-7 w-34 text-left font-bold text-black'>
								Filter Books By:
							</h2>

							{/* Dropdown area */}
							<div className='mt-5 flex flex-col gap-5'>
								<div className='flex flex-col gap-1'>
									<p className='text-md text-gray-500'>Date:</p>
									<select className='text-md w-full border-b border-gray-400 pb-1 font-light text-gray-700 focus:outline-none'>
										<option value='latest'>Latest</option>
										<option value='last-week'>Last Week</option>
										<option value='month'>A Month Ago</option>
										<option value='year'>A Year Ago</option>
									</select>
								</div>

								<div className='flex flex-col gap-2'>
									<p className='text-md text-gray-500'>Price:</p>
									<select className='text-md w-full border-b border-gray-400 pb-1 font-light text-gray-700 focus:outline-none'>
										<option value='price-asc'>High to Low</option>
										<option value='price-desc'>Low to High</option>
										<option value='free'>Free</option>
									</select>
								</div>

								<div className='flex flex-col gap-2'>
									<p className='text-md text-gray-500'>Ratings:</p>
									<select className='text-md w-full border-b border-gray-400 pb-1 font-light text-gray-700 focus:outline-none'>
										<option value='latest'>Highest to Lowest</option>
										<option value='last-week'>Lowest to Highest</option>
									</select>
								</div>

								<div className='flex flex-col gap-2'>
									<p className='text-md text-gray-500'>Author:</p>
									<select className='text-md w-full border-b border-gray-400 pb-1 font-light text-gray-700 focus:outline-none'>
										<option value='author-name'>Author Name</option>
										<option value='author-name'>Author Name</option>
									</select>
								</div>

								<div className='flex flex-col gap-2'>
									<p className='text-md text-gray-500'>Genre:</p>
									<select className='text-md w-full border-b border-gray-400 pb-1 font-light text-gray-700 focus:outline-none'>
										<option value='genre'>Genre</option>
										<option value='genre'>Genre</option>
									</select>
								</div>
							</div>
						</aside>
					</ScrollFadeSection>
				</div>
			</section>
		</div>
	);
}
