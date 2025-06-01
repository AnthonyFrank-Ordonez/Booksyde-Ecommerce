import NewArrival from '@/components/NewArrival';
import { ScrollFadeSection } from '@/components/ScrollFadeSection';
import { createFileRoute, redirect } from '@tanstack/react-router';
import { FaArrowLeft, FaRegHeart, FaRegStar, FaStar } from 'react-icons/fa';
import { useState } from 'react';
import { FaX } from 'react-icons/fa6';
import { getUserID } from '@/utils/auth-server';

export const Route = createFileRoute('/products/books/')({
	component: BooksIndex,
	beforeLoad: async () => {
		const userID = await getUserID();

		return {
			userID,
		};
	},

	loader: async ({ context }) => {
		if (!context.userID) throw redirect({ to: '/signin' });
	},
});

function BooksIndex() {
	const [sidebarOpen, setSidebarOpen] = useState(false);

	const toggleSidebar = () => {
		setSidebarOpen(!sidebarOpen);
	};

	return (
		<div className='col-span-1 md:col-span-12 lg:col-span-12 xl:col-span-12'>
			{/* New Arrivals */}
			<NewArrival />

			{/* Sortby and Products List*/}
			<section>
				<div className='relative mt-12 grid grid-cols-1 py-12 md:grid-cols-12 lg:grid-cols-12 xl:grid-cols-12'>
					{/* Products List */}
					<ScrollFadeSection className='col-span-1 border-gray-200 md:col-span-10 lg:col-span-10 xl:col-span-10'>
						<div className='grid grid-cols-2 gap-3 border-r-2 border-gray-200 px-7 md:grid-cols-3 md:gap-4 md:px-3 lg:grid-cols-4 xl:grid-cols-4 2xl:gap-5 2xl:px-7'>
							<div className='h-full w-auto rounded-lg bg-white shadow-md md:w-auto md:max-w-68 2xl:max-w-90'>
								<div className='relative overflow-hidden'>
									<img
										src='https://picsum.photos/id/1015/400/600'
										alt='book cover'
										className='h-auto w-full object-cover md:h-auto md:max-h-84 md:min-h-68 lg:h-auto lg:max-h-88 lg:min-h-68 2xl:h-auto 2xl:max-h-[30rem] 2xl:min-h-78'
									/>
									<div className='absolute top-2 right-2 rounded-full bg-white/80 p-1 shadow-md transition-colors duration-300 hover:bg-white/60 md:hidden'>
										<FaRegHeart size={14} />
									</div>
								</div>

								<div className='p-3'>
									<h3 className='text-lg font-bold lg:text-xl 2xl:text-2xl'>
										Book Title 1
									</h3>

									<div className='flex flex-row items-center gap-1'>
										<div className='flex items-center gap-1 text-yellow-400'>
											<FaStar className='h-3 w-3 2xl:h-3.5 2xl:w-3.5' />
											<FaStar className='h-3 w-3 2xl:h-3.5 2xl:w-3.5' />
											<FaStar className='h-3 w-3 2xl:h-3.5 2xl:w-3.5' />
											<FaStar className='h-3 w-3 2xl:h-3.5 2xl:w-3.5' />
											<FaRegStar className='h-3 w-3 2xl:h-3.5 2xl:w-3.5' />
										</div>
										<p className='2xl:text-md text-xs'>(1,000+)</p>
									</div>

									<div className='mt-2 flex flex-row items-center justify-between py-1'>
										<p className='text-sm text-gray-500 2xl:text-lg'>Price</p>
										<p className='text-sm font-normal 2xl:text-lg'>$19.99</p>
									</div>

									<div className='flex flex-row items-center justify-between py-1'>
										<p className='text-sm text-gray-500 2xl:text-lg'>Stocks</p>
										<p className='text-sm font-normal 2xl:text-lg'>35+</p>
									</div>

									<div className='flex flex-row items-center justify-between py-1'>
										<p className='text-sm text-gray-500 2xl:text-lg'>Author</p>
										<p className='text-sm font-normal 2xl:text-lg'>Author</p>
									</div>

									<div className='mt-3 flex flex-row items-center gap-2'>
										<button className='md:text-md h-11 w-full flex-1 cursor-pointer rounded-md border bg-black px-4 py-2 text-sm text-white transition-colors duration-300 hover:bg-black/80 md:w-52 lg:w-55 xl:w-68 2xl:h-12 2xl:w-80'>
											Add to Cart
										</button>

										<div className='hidden h-10 w-11 cursor-pointer items-center justify-center rounded-md border text-center transition-colors duration-300 hover:bg-gray-400/10 md:flex 2xl:h-12 2xl:w-12'>
											<FaRegHeart size={24} />
										</div>
									</div>
								</div>
							</div>

							<div className='h-full w-auto rounded-lg bg-white shadow-md md:w-auto md:max-w-68 2xl:max-w-90'>
								<div className='relative overflow-hidden'>
									<img
										src='https://picsum.photos/id/1015/400/600'
										alt='book cover'
										className='h-auto w-full object-cover md:h-auto md:max-h-84 md:min-h-68 lg:h-auto lg:max-h-88 lg:min-h-68 2xl:h-auto 2xl:max-h-[30rem] 2xl:min-h-78'
									/>
									<div className='absolute top-2 right-2 rounded-full bg-white/80 p-1 shadow-md transition-colors duration-300 hover:bg-white/60 md:hidden'>
										<FaRegHeart size={14} />
									</div>
								</div>

								<div className='p-3'>
									<h3 className='text-lg font-bold lg:text-xl 2xl:text-2xl'>
										Book Title 1
									</h3>

									<div className='flex flex-row items-center gap-1'>
										<div className='flex items-center gap-1 text-yellow-400'>
											<FaStar className='h-3 w-3 2xl:h-3.5 2xl:w-3.5' />
											<FaStar className='h-3 w-3 2xl:h-3.5 2xl:w-3.5' />
											<FaStar className='h-3 w-3 2xl:h-3.5 2xl:w-3.5' />
											<FaStar className='h-3 w-3 2xl:h-3.5 2xl:w-3.5' />
											<FaRegStar className='h-3 w-3 2xl:h-3.5 2xl:w-3.5' />
										</div>
										<p className='2xl:text-md text-xs'>(1,000+)</p>
									</div>

									<div className='mt-2 flex flex-row items-center justify-between py-1'>
										<p className='text-sm text-gray-500 2xl:text-lg'>Price</p>
										<p className='text-sm font-normal 2xl:text-lg'>$19.99</p>
									</div>

									<div className='flex flex-row items-center justify-between py-1'>
										<p className='text-sm text-gray-500 2xl:text-lg'>Stocks</p>
										<p className='text-sm font-normal 2xl:text-lg'>35+</p>
									</div>

									<div className='flex flex-row items-center justify-between py-1'>
										<p className='text-sm text-gray-500 2xl:text-lg'>Author</p>
										<p className='text-sm font-normal 2xl:text-lg'>Author</p>
									</div>

									<div className='mt-3 flex flex-row items-center gap-2'>
										<button className='md:text-md h-11 w-full flex-1 cursor-pointer rounded-md border bg-black px-4 py-2 text-sm text-white transition-colors duration-300 hover:bg-black/80 md:w-52 lg:w-55 xl:w-68 2xl:h-12 2xl:w-80'>
											Add to Cart
										</button>

										<div className='hidden h-10 w-11 cursor-pointer items-center justify-center rounded-md border text-center transition-colors duration-300 hover:bg-gray-400/10 md:flex 2xl:h-12 2xl:w-12'>
											<FaRegHeart size={24} />
										</div>
									</div>
								</div>
							</div>

							<div className='h-full w-auto rounded-lg bg-white shadow-md md:w-auto md:max-w-68 2xl:max-w-90'>
								<div className='relative overflow-hidden'>
									<img
										src='https://picsum.photos/id/1015/400/600'
										alt='book cover'
										className='h-auto w-full object-cover md:h-auto md:max-h-84 md:min-h-68 lg:h-auto lg:max-h-88 lg:min-h-68 2xl:h-auto 2xl:max-h-[30rem] 2xl:min-h-78'
									/>
									<div className='absolute top-2 right-2 rounded-full bg-white/80 p-1 shadow-md transition-colors duration-300 hover:bg-white/60 md:hidden'>
										<FaRegHeart size={14} />
									</div>
								</div>

								<div className='p-3'>
									<h3 className='text-lg font-bold lg:text-xl 2xl:text-2xl'>
										Book Title 1
									</h3>

									<div className='flex flex-row items-center gap-1'>
										<div className='flex items-center gap-1 text-yellow-400'>
											<FaStar className='h-3 w-3 2xl:h-3.5 2xl:w-3.5' />
											<FaStar className='h-3 w-3 2xl:h-3.5 2xl:w-3.5' />
											<FaStar className='h-3 w-3 2xl:h-3.5 2xl:w-3.5' />
											<FaStar className='h-3 w-3 2xl:h-3.5 2xl:w-3.5' />
											<FaRegStar className='h-3 w-3 2xl:h-3.5 2xl:w-3.5' />
										</div>
										<p className='2xl:text-md text-xs'>(1,000+)</p>
									</div>

									<div className='mt-2 flex flex-row items-center justify-between py-1'>
										<p className='text-sm text-gray-500 2xl:text-lg'>Price</p>
										<p className='text-sm font-normal 2xl:text-lg'>$19.99</p>
									</div>

									<div className='flex flex-row items-center justify-between py-1'>
										<p className='text-sm text-gray-500 2xl:text-lg'>Stocks</p>
										<p className='text-sm font-normal 2xl:text-lg'>35+</p>
									</div>

									<div className='flex flex-row items-center justify-between py-1'>
										<p className='text-sm text-gray-500 2xl:text-lg'>Author</p>
										<p className='text-sm font-normal 2xl:text-lg'>Author</p>
									</div>

									<div className='mt-3 flex flex-row items-center gap-2'>
										<button className='md:text-md h-11 w-full flex-1 cursor-pointer rounded-md border bg-black px-4 py-2 text-sm text-white transition-colors duration-300 hover:bg-black/80 md:w-52 lg:w-55 xl:w-68 2xl:h-12 2xl:w-80'>
											Add to Cart
										</button>

										<div className='hidden h-10 w-11 cursor-pointer items-center justify-center rounded-md border text-center transition-colors duration-300 hover:bg-gray-400/10 md:flex 2xl:h-12 2xl:w-12'>
											<FaRegHeart size={24} />
										</div>
									</div>
								</div>
							</div>

							<div className='h-full w-auto rounded-lg bg-white shadow-md md:w-auto md:max-w-68 2xl:max-w-90'>
								<div className='relative overflow-hidden'>
									<img
										src='https://picsum.photos/id/1015/400/600'
										alt='book cover'
										className='h-auto w-full object-cover md:h-auto md:max-h-84 md:min-h-68 lg:h-auto lg:max-h-88 lg:min-h-68 2xl:h-auto 2xl:max-h-[30rem] 2xl:min-h-78'
									/>
									<div className='absolute top-2 right-2 rounded-full bg-white/80 p-1 shadow-md transition-colors duration-300 hover:bg-white/60 md:hidden'>
										<FaRegHeart size={14} />
									</div>
								</div>

								<div className='p-3'>
									<h3 className='text-lg font-bold lg:text-xl 2xl:text-2xl'>
										Book Title 1
									</h3>

									<div className='flex flex-row items-center gap-1'>
										<div className='flex items-center gap-1 text-yellow-400'>
											<FaStar className='h-3 w-3 2xl:h-3.5 2xl:w-3.5' />
											<FaStar className='h-3 w-3 2xl:h-3.5 2xl:w-3.5' />
											<FaStar className='h-3 w-3 2xl:h-3.5 2xl:w-3.5' />
											<FaStar className='h-3 w-3 2xl:h-3.5 2xl:w-3.5' />
											<FaRegStar className='h-3 w-3 2xl:h-3.5 2xl:w-3.5' />
										</div>
										<p className='2xl:text-md text-xs'>(1,000+)</p>
									</div>

									<div className='mt-2 flex flex-row items-center justify-between py-1'>
										<p className='text-sm text-gray-500 2xl:text-lg'>Price</p>
										<p className='text-sm font-normal 2xl:text-lg'>$19.99</p>
									</div>

									<div className='flex flex-row items-center justify-between py-1'>
										<p className='text-sm text-gray-500 2xl:text-lg'>Stocks</p>
										<p className='text-sm font-normal 2xl:text-lg'>35+</p>
									</div>

									<div className='flex flex-row items-center justify-between py-1'>
										<p className='text-sm text-gray-500 2xl:text-lg'>Author</p>
										<p className='text-sm font-normal 2xl:text-lg'>Author</p>
									</div>

									<div className='mt-3 flex flex-row items-center gap-2'>
										<button className='md:text-md h-11 w-full flex-1 cursor-pointer rounded-md border bg-black px-4 py-2 text-sm text-white transition-colors duration-300 hover:bg-black/80 md:w-52 lg:w-55 xl:w-68 2xl:h-12 2xl:w-80'>
											Add to Cart
										</button>

										<div className='hidden h-10 w-11 cursor-pointer items-center justify-center rounded-md border text-center transition-colors duration-300 hover:bg-gray-400/10 md:flex 2xl:h-12 2xl:w-12'>
											<FaRegHeart size={24} />
										</div>
									</div>
								</div>
							</div>
						</div>
					</ScrollFadeSection>

					{/* Sidebar Toggle Button */}
					<div
						className={`fixed right-4 bottom-4 z-50 md:hidden ${sidebarOpen ? 'hidden' : ''}`}
					>
						<button
							onClick={toggleSidebar}
							className='rounded-md bg-black p-2 text-white shadow-lg'
						>
							<FaArrowLeft size={14} />
						</button>
					</div>

					{/* Filter Section */}
					<ScrollFadeSection className='col-span-1 md:col-span-2 lg:col-span-2 xl:col-span-2'>
						{/* X icon */}
						<div
							className={`fixed top-0 right-60 z-50 flex justify-start py-4 md:hidden ${sidebarOpen ? '' : 'hidden'} transform transition-transform duration-300 ease-in-out`}
						>
							<button
								onClick={toggleSidebar}
								className='rounded-full bg-black p-2 text-white shadow-lg'
								title='Close Sidebar'
								aria-label='Close Sidebar'
							>
								<FaX size={10} />
							</button>{' '}
						</div>

						<aside
							className={`fixed inset-y-0 right-0 h-screen w-58 transform bg-white px-5 py-5 shadow-lg md:static md:w-full lg:w-full xl:w-full 2xl:w-full ${sidebarOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 ease-in-out md:translate-x-0 md:bg-transparent md:px-3 md:py-1 md:shadow-none lg:px-4 xl:px-5 2xl:px-10`}
						>
							{/* Search */}
							<h2 className='w-full text-left text-sm font-bold text-black xl:text-lg 2xl:text-xl'>
								Search By Title:
							</h2>

							<div className='relative mt-1 flex flex-col gap-2 overflow-hidden'>
								<input
									type='text'
									placeholder='Enter Book Title'
									aria-label='Search Books'
									className='rounded-sm border border-gray-400 px-2 py-1 font-light text-gray-700 placeholder:text-gray-400 focus:border-gray-500 focus:outline-none md:px-2 md:placeholder:text-sm'
								/>
							</div>

							<h2 className='mt-7 w-full text-left text-sm font-bold text-black xl:text-lg 2xl:text-xl'>
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
