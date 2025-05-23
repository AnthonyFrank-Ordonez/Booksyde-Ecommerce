import { createFileRoute, Link } from '@tanstack/react-router';
import { motion } from 'motion/react';
import { FaRegHeart, FaRegStar, FaStar } from 'react-icons/fa';

import Carousel from '@/components/Carousel';
import { ScrollFadeSection } from '@/components/ScrollFadeSection';

export const Route = createFileRoute('/products/')({
	component: ProductsIndex,
});

function ProductsIndex() {
	const images = [
		'https://picsum.photos/id/10/800/400',
		'https://picsum.photos/id/11/800/400',
		'https://picsum.photos/id/12/800/400',
		'https://picsum.photos/id/13/800/400',
	];

	return (
		<div className='col-span-1 md:col-span-12 md:px-12 md:py-2'>
			<section>
				<Carousel
					images={images}
					className='relative mx-auto w-full md:max-w-[150rem]'
				/>

				{/* Wide Ranges */}
				<ScrollFadeSection className='flex flex-col flex-wrap gap-3 py-12'>
					<h2 className='text-center text-2xl font-bold md:text-left md:text-3xl 2xl:text-5xl'>
						Explore Our Wide Range of Products Today
					</h2>

					<div className='mt-5 flex flex-col gap-3 px-5 md:flex-row md:px-0'>
						<Link to='/'>
							<motion.div
								whileHover={{ scale: 1.03 }}
								className='relative flex w-full flex-1 overflow-hidden rounded-lg shadow-lg shadow-gray-500'
							>
								<img
									src='https://picsum.photos/id/10/800/400'
									alt='dog'
									className='object-fit h-full w-full'
								/>

								<div className='absolute right-0 bottom-0 left-0'>
									<div className='bg-gradient-to-t from-black/80 to-transparent p-4 pt-8 text-white'>
										<h2 className='text-xl font-bold 2xl:text-3xl'>Books</h2>
										<p className='text-sm font-light 2xl:text-lg'>
											Start at $10
										</p>
									</div>
								</div>
							</motion.div>
						</Link>

						<Link to='/'>
							<motion.div
								whileHover={{ scale: 1.03 }}
								className='relative flex w-full flex-1 overflow-hidden rounded-lg shadow-lg shadow-gray-500'
							>
								<img
									src='https://picsum.photos/id/10/800/400'
									alt='dog'
									className='object-fit h-full w-full'
								/>

								<div className='absolute right-0 bottom-0 left-0'>
									<div className='bg-gradient-to-t from-black/80 to-transparent p-4 pt-8 text-white'>
										<h2 className='text-xl font-bold 2xl:text-3xl'>Mangas'</h2>
										<p className='text-sm font-light 2xl:text-lg'>
											Start at $30
										</p>
									</div>
								</div>
							</motion.div>
						</Link>

						<Link to='/'>
							<motion.div
								whileHover={{ scale: 1.03 }}
								className='relative flex w-full flex-1 overflow-hidden rounded-lg shadow-lg shadow-gray-500'
							>
								<img
									src='https://picsum.photos/id/10/800/400'
									alt='dog'
									className='object-fit h-full w-full'
								/>

								<div className='absolute right-0 bottom-0 left-0'>
									<div className='bg-gradient-to-t from-black/80 to-transparent p-4 pt-8 text-white'>
										<h2 className='text-xl font-bold 2xl:text-3xl'>Novels</h2>
										<p className='text-sm font-light 2xl:text-lg'>
											Start at $50
										</p>
									</div>
								</div>
							</motion.div>
						</Link>
					</div>
				</ScrollFadeSection>

				{/* Best Deal */}
				<ScrollFadeSection className='px-7 md:px-0'>
					<div className='flex flex-col gap-3'>
						<h2 className='mt-3 text-center text-4xl font-bold md:text-left md:text-3xl 2xl:text-5xl'>
							Today's Best Deals
						</h2>

						<div className='mt-5 flex w-full flex-col flex-wrap items-center justify-center gap-6 md:flex-row md:gap-3'>
							<div className='w-74 flex-1 overflow-hidden rounded-b-lg p-3 shadow-sm'>
								<div className='relative'>
									<img
										src='https://picsum.photos/id/237/200/300'
										alt='dog'
										className='object-fit h-full w-full'
									/>

									<button className='absolute top-3 right-3 cursor-pointer rounded-full bg-white p-1'>
										<FaRegHeart className='h-4 w-4' />
									</button>
								</div>
								<div className='mt-3 px-1'>
									<div className='flex items-center justify-between'>
										<h2 className='text-lg font-bold'>Product Name</h2>
										<p className='text-lg font-bold'>$120</p>
									</div>
									<p className='text-md font-light text-gray-600'>
										12 Stocks Remaining
									</p>
									<div className='mt-1 flex items-center gap-1'>
										<div className='flex items-center gap-1 text-yellow-400'>
											<FaStar />
											<FaStar />
											<FaStar />
											<FaStar />
											<FaRegStar />
										</div>
										(1,000+)
									</div>

									<button className='mt-3 cursor-pointer rounded-2xl border-1 px-8 py-2 font-semibold hover:bg-gray-500/10'>
										Add to Cart
									</button>
								</div>
							</div>

							<div className='w-74 flex-1 overflow-hidden rounded-b-lg p-3 shadow-sm'>
								<div className='relative'>
									<img
										src='https://picsum.photos/id/237/200/300'
										alt='dog'
										className='object-fit h-full w-full'
									/>

									<button className='absolute top-3 right-3 cursor-pointer rounded-full bg-white p-1'>
										<FaRegHeart className='h-4 w-4' />
									</button>
								</div>
								<div className='mt-3 px-1'>
									<div className='flex items-center justify-between'>
										<h2 className='text-lg font-bold'>Product Name</h2>
										<p className='text-lg font-bold'>$120</p>
									</div>
									<p className='text-md font-light text-gray-600'>
										12 Stocks Remaining
									</p>
									<div className='mt-1 flex items-center gap-1'>
										<div className='flex items-center gap-1 text-yellow-400'>
											<FaStar />
											<FaStar />
											<FaStar />
											<FaStar />
											<FaRegStar />
										</div>
										(1,000+)
									</div>

									<button className='mt-3 cursor-pointer rounded-2xl border-1 px-8 py-2 font-semibold hover:bg-gray-500/10'>
										Add to Cart
									</button>
								</div>
							</div>

							<div className='w-74 flex-1 overflow-hidden rounded-b-lg p-3 shadow-sm'>
								<div className='relative'>
									<img
										src='https://picsum.photos/id/237/200/300'
										alt='dog'
										className='object-fit h-full w-full'
									/>

									<button className='absolute top-3 right-3 cursor-pointer rounded-full bg-white p-1'>
										<FaRegHeart className='h-4 w-4' />
									</button>
								</div>
								<div className='mt-3 px-1'>
									<div className='flex items-center justify-between'>
										<h2 className='text-lg font-bold'>Product Name</h2>
										<p className='text-lg font-bold'>$120</p>
									</div>
									<p className='text-md font-light text-gray-600'>
										12 Stocks Remaining
									</p>
									<div className='mt-1 flex items-center gap-1'>
										<div className='flex items-center gap-1 text-yellow-400'>
											<FaStar />
											<FaStar />
											<FaStar />
											<FaStar />
											<FaRegStar />
										</div>
										(1,000+)
									</div>

									<button className='mt-3 cursor-pointer rounded-2xl border-1 px-8 py-2 font-semibold hover:bg-gray-500/10'>
										Add to Cart
									</button>
								</div>
							</div>

							<div className='w-74 flex-1 overflow-hidden rounded-b-lg p-3 shadow-sm'>
								<div className='relative'>
									<img
										src='https://picsum.photos/id/237/200/300'
										alt='dog'
										className='object-fit h-full w-full'
									/>

									<button className='absolute top-3 right-3 cursor-pointer rounded-full bg-white p-1'>
										<FaRegHeart className='h-4 w-4' />
									</button>
								</div>
								<div className='mt-3 px-1'>
									<div className='flex items-center justify-between'>
										<h2 className='text-lg font-bold'>Product Name</h2>
										<p className='text-lg font-bold'>$120</p>
									</div>
									<p className='text-md font-light text-gray-600'>
										12 Stocks Remaining
									</p>
									<div className='mt-1 flex items-center gap-1'>
										<div className='flex items-center gap-1 text-yellow-400'>
											<FaStar />
											<FaStar />
											<FaStar />
											<FaStar />
											<FaRegStar />
										</div>
										(1,000+)
									</div>

									<button className='mt-3 cursor-pointer rounded-2xl border-1 px-8 py-2 font-semibold hover:bg-gray-500/10'>
										Add to Cart
									</button>
								</div>
							</div>

							<div className='w-74 flex-1 overflow-hidden rounded-b-lg p-3 shadow-sm'>
								<div className='relative'>
									<img
										src='https://picsum.photos/id/237/200/300'
										alt='dog'
										className='object-fit h-full w-full'
									/>

									<button className='absolute top-3 right-3 cursor-pointer rounded-full bg-white p-1'>
										<FaRegHeart className='h-4 w-4' />
									</button>
								</div>
								<div className='mt-3 px-1'>
									<div className='flex items-center justify-between'>
										<h2 className='text-lg font-bold'>Product Name</h2>
										<p className='text-lg font-bold'>$120</p>
									</div>
									<p className='text-md font-light text-gray-600'>
										12 Stocks Remaining
									</p>
									<div className='mt-1 flex items-center gap-1'>
										<div className='flex items-center gap-1 text-yellow-400'>
											<FaStar />
											<FaStar />
											<FaStar />
											<FaStar />
											<FaRegStar />
										</div>
										(1,000+)
									</div>

									<button className='mt-3 cursor-pointer rounded-2xl border-1 px-8 py-2 font-semibold hover:bg-gray-500/10'>
										Add to Cart
									</button>
								</div>
							</div>
						</div>
					</div>
				</ScrollFadeSection>

				{/* Choose by Genres */}
				<ScrollFadeSection className='px-5 py-10 md:px-0'>
					<div className='relative h-[70rem] w-full overflow-hidden rounded-lg shadow-lg shadow-gray-500 md:h-96 md:w-full 2xl:h-[35rem]'>
						<img
							src='https://picsum.photos/id/11/800/400'
							alt='dog'
							className='object-fit h-full w-full'
						/>

						<div className='absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black/80'></div>

						<div className='absolute top-10 right-0 left-0 md:left-10'>
							<div className='p-4 pt-8 font-bold text-white'>
								<h2 className='text-center text-4xl md:text-left md:text-4xl 2xl:text-5xl'>
									Choose by Genres
								</h2>

								<div className='mt-10 flex flex-col items-center justify-center gap-5 md:mt-1 md:flex-row md:py-5 md:pr-8 2xl:items-start 2xl:justify-start'>
									<motion.div
										whileHover={{ scale: 1.03 }}
										className='relative h-28 w-3/4 overflow-hidden rounded-xl md:h-54 md:w-36 2xl:h-82 2xl:w-55'
									>
										<img
											src='https://picsum.photos/id/237/200/300'
											alt='dog'
											className='object-fit h-full w-full'
										/>

										<div className='absolute inset-0 bg-gradient-to-b from-black/70 via-transparent to-black/70'></div>

										<div className='absolute top-0 right-0 left-0'>
											<div className='p-4 pt-8 text-white'>
												<h2 className='text-center text-xl font-bold 2xl:text-3xl'>
													Name
												</h2>
											</div>
										</div>
									</motion.div>

									<motion.div
										whileHover={{ scale: 1.03 }}
										className='relative h-28 w-3/4 overflow-hidden rounded-xl md:h-54 md:w-36 2xl:h-82 2xl:w-55'
									>
										<img
											src='https://picsum.photos/id/237/200/300'
											alt='dog'
											className='object-fit h-full w-full'
										/>

										<div className='absolute inset-0 bg-gradient-to-b from-black/70 via-transparent to-black/70'></div>

										<div className='absolute top-0 right-0 left-0'>
											<div className='p-4 pt-8 text-white'>
												<h2 className='text-center text-xl font-bold 2xl:text-3xl'>
													Name
												</h2>
											</div>
										</div>
									</motion.div>

									<motion.div
										whileHover={{ scale: 1.03 }}
										className='relative h-28 w-3/4 overflow-hidden rounded-xl md:h-54 md:w-36 2xl:h-82 2xl:w-55'
									>
										<img
											src='https://picsum.photos/id/237/200/300'
											alt='dog'
											className='object-fit h-full w-full'
										/>

										<div className='absolute inset-0 bg-gradient-to-b from-black/70 via-transparent to-black/70'></div>

										<div className='absolute top-0 right-0 left-0'>
											<div className='p-4 pt-8 text-white'>
												<h2 className='text-center text-xl font-bold 2xl:text-3xl'>
													Name
												</h2>
											</div>
										</div>
									</motion.div>

									<motion.div
										whileHover={{ scale: 1.03 }}
										className='relative h-28 w-3/4 overflow-hidden rounded-xl md:h-54 md:w-36 2xl:h-82 2xl:w-55'
									>
										<img
											src='https://picsum.photos/id/237/200/300'
											alt='dog'
											className='object-fit h-full w-full'
										/>

										<div className='absolute inset-0 bg-gradient-to-b from-black/70 via-transparent to-black/70'></div>

										<div className='absolute top-0 right-0 left-0'>
											<div className='p-4 pt-8 text-white'>
												<h2 className='text-center text-xl font-bold 2xl:text-3xl'>
													Name
												</h2>
											</div>
										</div>
									</motion.div>

									<motion.div
										whileHover={{ scale: 1.03 }}
										className='relative h-28 w-3/4 overflow-hidden rounded-xl md:h-54 md:w-36 2xl:h-82 2xl:w-55'
									>
										<img
											src='https://picsum.photos/id/237/200/300'
											alt='dog'
											className='object-fit h-full w-full'
										/>

										<div className='absolute inset-0 bg-gradient-to-b from-black/70 via-transparent to-black/70'></div>

										<div className='absolute top-0 right-0 left-0'>
											<div className='p-4 pt-8 text-white'>
												<h2 className='text-center text-xl font-bold 2xl:text-3xl'>
													Name
												</h2>
											</div>
										</div>
									</motion.div>

									<motion.div
										whileHover={{ scale: 1.03 }}
										className='relative h-28 w-3/4 overflow-hidden rounded-xl md:h-54 md:w-36 2xl:h-82 2xl:w-55'
									>
										<img
											src='https://picsum.photos/id/237/200/300'
											alt='dog'
											className='object-fit h-full w-full'
										/>

										<div className='absolute inset-0 bg-gradient-to-b from-black/70 via-transparent to-black/70'></div>

										<div className='absolute top-0 right-0 left-0'>
											<div className='p-4 pt-8 text-white'>
												<h2 className='text-center text-xl font-bold 2xl:text-3xl'>
													Name
												</h2>
											</div>
										</div>
									</motion.div>

									<motion.div
										whileHover={{ scale: 1.03 }}
										className='relative h-28 w-3/4 overflow-hidden rounded-xl md:h-54 md:w-36 2xl:h-82 2xl:w-55'
									>
										<img
											src='https://picsum.photos/id/237/200/300'
											alt='dog'
											className='object-fit h-full w-full'
										/>

										<div className='absolute inset-0 bg-gradient-to-b from-black/70 via-transparent to-black/70'></div>

										<div className='absolute top-0 right-0 left-0'>
											<div className='p-4 pt-8 text-white'>
												<h2 className='text-center text-xl font-bold 2xl:text-3xl'>
													Name
												</h2>
											</div>
										</div>
									</motion.div>
								</div>
							</div>
						</div>
					</div>
				</ScrollFadeSection>

				{/* Trending Products */}
				<ScrollFadeSection className='px-7 md:px-0'>
					<div className='flex flex-col gap-3'>
						<div className='flex items-center justify-between'>
							<h2 className='mt-3 text-center text-4xl font-bold md:text-left md:text-3xl 2xl:text-5xl'>
								Trending Products
							</h2>

							<Link
								to='/products'
								className='mt-5 mr-5 hidden font-semibold text-gray-700 hover:underline md:inline-block 2xl:mt-7 2xl:text-xl'
							>
								View more
							</Link>
						</div>

						<div className='mt-5 flex w-full flex-col flex-wrap items-center justify-center gap-6 md:flex-row md:gap-3'>
							<div className='w-74 flex-1 overflow-hidden rounded-b-lg p-3 shadow-sm'>
								<div className='relative'>
									<img
										src='https://picsum.photos/id/237/200/300'
										alt='dog'
										className='object-fit h-full w-full'
									/>

									<button className='absolute top-3 right-3 cursor-pointer rounded-full bg-white p-1'>
										<FaRegHeart className='h-4 w-4' />
									</button>
								</div>
								<div className='mt-3 px-1'>
									<div className='flex items-center justify-between'>
										<h2 className='text-lg font-bold'>Product Name</h2>
										<p className='text-lg font-bold'>$120</p>
									</div>
									<p className='text-md font-light text-gray-600'>
										12 Stocks Remaining
									</p>
									<div className='mt-1 flex items-center gap-1'>
										<div className='flex items-center gap-1 text-yellow-400'>
											<FaStar />
											<FaStar />
											<FaStar />
											<FaStar />
											<FaRegStar />
										</div>
										(1,000+)
									</div>

									<button className='mt-3 cursor-pointer rounded-2xl border-1 px-8 py-2 font-semibold hover:bg-gray-500/10'>
										Add to Cart
									</button>
								</div>
							</div>

							<div className='w-74 flex-1 overflow-hidden rounded-b-lg p-3 shadow-sm'>
								<div className='relative'>
									<img
										src='https://picsum.photos/id/237/200/300'
										alt='dog'
										className='object-fit h-full w-full'
									/>

									<button className='absolute top-3 right-3 cursor-pointer rounded-full bg-white p-1'>
										<FaRegHeart className='h-4 w-4' />
									</button>
								</div>
								<div className='mt-3 px-1'>
									<div className='flex items-center justify-between'>
										<h2 className='text-lg font-bold'>Product Name</h2>
										<p className='text-lg font-bold'>$120</p>
									</div>
									<p className='text-md font-light text-gray-600'>
										12 Stocks Remaining
									</p>
									<div className='mt-1 flex items-center gap-1'>
										<div className='flex items-center gap-1 text-yellow-400'>
											<FaStar />
											<FaStar />
											<FaStar />
											<FaStar />
											<FaRegStar />
										</div>
										(1,000+)
									</div>

									<button className='mt-3 cursor-pointer rounded-2xl border-1 px-8 py-2 font-semibold hover:bg-gray-500/10'>
										Add to Cart
									</button>
								</div>
							</div>

							<div className='w-74 flex-1 overflow-hidden rounded-b-lg p-3 shadow-sm'>
								<div className='relative'>
									<img
										src='https://picsum.photos/id/237/200/300'
										alt='dog'
										className='object-fit h-full w-full'
									/>

									<button className='absolute top-3 right-3 cursor-pointer rounded-full bg-white p-1'>
										<FaRegHeart className='h-4 w-4' />
									</button>
								</div>
								<div className='mt-3 px-1'>
									<div className='flex items-center justify-between'>
										<h2 className='text-lg font-bold'>Product Name</h2>
										<p className='text-lg font-bold'>$120</p>
									</div>
									<p className='text-md font-light text-gray-600'>
										12 Stocks Remaining
									</p>
									<div className='mt-1 flex items-center gap-1'>
										<div className='flex items-center gap-1 text-yellow-400'>
											<FaStar />
											<FaStar />
											<FaStar />
											<FaStar />
											<FaRegStar />
										</div>
										(1,000+)
									</div>

									<button className='mt-3 cursor-pointer rounded-2xl border-1 px-8 py-2 font-semibold hover:bg-gray-500/10'>
										Add to Cart
									</button>
								</div>
							</div>

							<div className='w-74 flex-1 overflow-hidden rounded-b-lg p-3 shadow-sm'>
								<div className='relative'>
									<img
										src='https://picsum.photos/id/237/200/300'
										alt='dog'
										className='object-fit h-full w-full'
									/>

									<button className='absolute top-3 right-3 cursor-pointer rounded-full bg-white p-1'>
										<FaRegHeart className='h-4 w-4' />
									</button>
								</div>
								<div className='mt-3 px-1'>
									<div className='flex items-center justify-between'>
										<h2 className='text-lg font-bold'>Product Name</h2>
										<p className='text-lg font-bold'>$120</p>
									</div>
									<p className='text-md font-light text-gray-600'>
										12 Stocks Remaining
									</p>
									<div className='mt-1 flex items-center gap-1'>
										<div className='flex items-center gap-1 text-yellow-400'>
											<FaStar />
											<FaStar />
											<FaStar />
											<FaStar />
											<FaRegStar />
										</div>
										(1,000+)
									</div>

									<button className='mt-3 cursor-pointer rounded-2xl border-1 px-8 py-2 font-semibold hover:bg-gray-500/10'>
										Add to Cart
									</button>
								</div>
							</div>

							<div className='w-74 flex-1 overflow-hidden rounded-b-lg p-3 shadow-sm'>
								<div className='relative'>
									<img
										src='https://picsum.photos/id/237/200/300'
										alt='dog'
										className='object-fit h-full w-full'
									/>

									<button className='absolute top-3 right-3 cursor-pointer rounded-full bg-white p-1'>
										<FaRegHeart className='h-4 w-4' />
									</button>
								</div>
								<div className='mt-3 px-1'>
									<div className='flex items-center justify-between'>
										<h2 className='text-lg font-bold'>Product Name</h2>
										<p className='text-lg font-bold'>$120</p>
									</div>
									<p className='text-md font-light text-gray-600'>
										12 Stocks Remaining
									</p>
									<div className='mt-1 flex items-center gap-1'>
										<div className='flex items-center gap-1 text-yellow-400'>
											<FaStar />
											<FaStar />
											<FaStar />
											<FaStar />
											<FaRegStar />
										</div>
										(1,000+)
									</div>

									<button className='mt-3 cursor-pointer rounded-2xl border-1 px-8 py-2 font-semibold hover:bg-gray-500/10'>
										Add to Cart
									</button>
								</div>
							</div>
						</div>

						<div className='mt-5 items-center justify-center text-center'>
							<Link
								to='/products'
								className='w-54 rounded-xl border border-gray-400 px-10 py-1 font-normal md:hidden'
							>
								View More
							</Link>
						</div>
					</div>
				</ScrollFadeSection>

				{/* New Products*/}
				<ScrollFadeSection className='px-5 py-10 md:px-0'>
					<div className='relative h-[30rem] w-full overflow-hidden rounded-lg shadow-lg shadow-gray-500 md:h-96 md:w-full 2xl:h-[35rem]'>
						<img
							src='https://picsum.photos/id/11/800/400'
							alt='dog'
							className='object-fit h-full w-full'
						/>

						<div className='absolute inset-0 bg-gradient-to-b from-black/100 via-black to-black/100'></div>

						<div className='absolute top-15 right-0 left-0 text-center md:left-10 md:text-left'>
							<div className='p-4 pt-8 font-bold text-white 2xl:py-12'>
								<h2 className='text-4xl md:text-4xl 2xl:text-5xl'>
									New Product Release
								</h2>
								<p className='mt-10 text-2xl font-semibold md:mt-3 2xl:mt-6 2xl:text-4xl'>
									Book Title, Limited Stocks
								</p>
								<p className='font-light 2xl:mt-1 2xl:text-2xl'>
									Don't miss this oppportunity!
								</p>

								<div className='mt-14 md:mt-20 2xl:mt-38'>
									<Link
										to='/'
										className='cursor-pointer rounded-xl border px-12 py-3 2xl:mt-38 2xl:h-15 2xl:w-64 2xl:text-lg'
									>
										Shop Now
									</Link>
								</div>
							</div>
						</div>
					</div>
				</ScrollFadeSection>

				{/* Most Selling Products */}
				<ScrollFadeSection className='px-7 md:px-0'>
					<div className='flex flex-col gap-3'>
						<div className='flex items-center justify-between'>
							<h2 className='mt-3 text-center text-4xl font-bold md:text-left md:text-3xl 2xl:text-5xl'>
								Most Selling Products
							</h2>

							<Link
								to='/products'
								className='mt-5 mr-5 hidden font-semibold text-gray-700 hover:underline md:inline-block 2xl:mt-7 2xl:text-xl'
							>
								View more
							</Link>
						</div>

						<div className='mt-5 flex w-full flex-col flex-wrap items-center justify-center gap-6 md:flex-row md:gap-3'>
							<div className='w-74 flex-1 overflow-hidden rounded-b-lg p-3 shadow-sm'>
								<div className='relative'>
									<img
										src='https://picsum.photos/id/237/200/300'
										alt='dog'
										className='object-fit h-full w-full'
									/>

									<button className='absolute top-3 right-3 cursor-pointer rounded-full bg-white p-1'>
										<FaRegHeart className='h-4 w-4' />
									</button>
								</div>
								<div className='mt-3 px-1'>
									<div className='flex items-center justify-between'>
										<h2 className='text-lg font-bold'>Product Name</h2>
										<p className='text-lg font-bold'>$120</p>
									</div>
									<p className='text-md font-light text-gray-600'>
										12 Stocks Remaining
									</p>
									<div className='mt-1 flex items-center gap-1'>
										<div className='flex items-center gap-1 text-yellow-400'>
											<FaStar />
											<FaStar />
											<FaStar />
											<FaStar />
											<FaRegStar />
										</div>
										(1,000+)
									</div>

									<button className='mt-3 cursor-pointer rounded-2xl border-1 px-8 py-2 font-semibold hover:bg-gray-500/10'>
										Add to Cart
									</button>
								</div>
							</div>

							<div className='w-74 flex-1 overflow-hidden rounded-b-lg p-3 shadow-sm'>
								<div className='relative'>
									<img
										src='https://picsum.photos/id/237/200/300'
										alt='dog'
										className='object-fit h-full w-full'
									/>

									<button className='absolute top-3 right-3 cursor-pointer rounded-full bg-white p-1'>
										<FaRegHeart className='h-4 w-4' />
									</button>
								</div>
								<div className='mt-3 px-1'>
									<div className='flex items-center justify-between'>
										<h2 className='text-lg font-bold'>Product Name</h2>
										<p className='text-lg font-bold'>$120</p>
									</div>
									<p className='text-md font-light text-gray-600'>
										12 Stocks Remaining
									</p>
									<div className='mt-1 flex items-center gap-1'>
										<div className='flex items-center gap-1 text-yellow-400'>
											<FaStar />
											<FaStar />
											<FaStar />
											<FaStar />
											<FaRegStar />
										</div>
										(1,000+)
									</div>

									<button className='mt-3 cursor-pointer rounded-2xl border-1 px-8 py-2 font-semibold hover:bg-gray-500/10'>
										Add to Cart
									</button>
								</div>
							</div>

							<div className='w-74 flex-1 overflow-hidden rounded-b-lg p-3 shadow-sm'>
								<div className='relative'>
									<img
										src='https://picsum.photos/id/237/200/300'
										alt='dog'
										className='object-fit h-full w-full'
									/>

									<button className='absolute top-3 right-3 cursor-pointer rounded-full bg-white p-1'>
										<FaRegHeart className='h-4 w-4' />
									</button>
								</div>
								<div className='mt-3 px-1'>
									<div className='flex items-center justify-between'>
										<h2 className='text-lg font-bold'>Product Name</h2>
										<p className='text-lg font-bold'>$120</p>
									</div>
									<p className='text-md font-light text-gray-600'>
										12 Stocks Remaining
									</p>
									<div className='mt-1 flex items-center gap-1'>
										<div className='flex items-center gap-1 text-yellow-400'>
											<FaStar />
											<FaStar />
											<FaStar />
											<FaStar />
											<FaRegStar />
										</div>
										(1,000+)
									</div>

									<button className='mt-3 cursor-pointer rounded-2xl border-1 px-8 py-2 font-semibold hover:bg-gray-500/10'>
										Add to Cart
									</button>
								</div>
							</div>

							<div className='w-74 flex-1 overflow-hidden rounded-b-lg p-3 shadow-sm'>
								<div className='relative'>
									<img
										src='https://picsum.photos/id/237/200/300'
										alt='dog'
										className='object-fit h-full w-full'
									/>

									<button className='absolute top-3 right-3 cursor-pointer rounded-full bg-white p-1'>
										<FaRegHeart className='h-4 w-4' />
									</button>
								</div>
								<div className='mt-3 px-1'>
									<div className='flex items-center justify-between'>
										<h2 className='text-lg font-bold'>Product Name</h2>
										<p className='text-lg font-bold'>$120</p>
									</div>
									<p className='text-md font-light text-gray-600'>
										12 Stocks Remaining
									</p>
									<div className='mt-1 flex items-center gap-1'>
										<div className='flex items-center gap-1 text-yellow-400'>
											<FaStar />
											<FaStar />
											<FaStar />
											<FaStar />
											<FaRegStar />
										</div>
										(1,000+)
									</div>

									<button className='mt-3 cursor-pointer rounded-2xl border-1 px-8 py-2 font-semibold hover:bg-gray-500/10'>
										Add to Cart
									</button>
								</div>
							</div>

							<div className='w-74 flex-1 overflow-hidden rounded-b-lg p-3 shadow-sm'>
								<div className='relative'>
									<img
										src='https://picsum.photos/id/237/200/300'
										alt='dog'
										className='object-fit h-full w-full'
									/>

									<button className='absolute top-3 right-3 cursor-pointer rounded-full bg-white p-1'>
										<FaRegHeart className='h-4 w-4' />
									</button>
								</div>
								<div className='mt-3 px-1'>
									<div className='flex items-center justify-between'>
										<h2 className='text-lg font-bold'>Product Name</h2>
										<p className='text-lg font-bold'>$120</p>
									</div>
									<p className='text-md font-light text-gray-600'>
										12 Stocks Remaining
									</p>
									<div className='mt-1 flex items-center gap-1'>
										<div className='flex items-center gap-1 text-yellow-400'>
											<FaStar />
											<FaStar />
											<FaStar />
											<FaStar />
											<FaRegStar />
										</div>
										(1,000+)
									</div>

									<button className='mt-3 cursor-pointer rounded-2xl border-1 px-8 py-2 font-semibold hover:bg-gray-500/10'>
										Add to Cart
									</button>
								</div>
							</div>
						</div>

						<div className='mt-5 flex w-full flex-col flex-wrap items-center justify-center gap-6 md:flex-row md:gap-3'>
							<div className='w-74 flex-1 overflow-hidden rounded-b-lg p-3 shadow-sm'>
								<div className='relative'>
									<img
										src='https://picsum.photos/id/237/200/300'
										alt='dog'
										className='object-fit h-full w-full'
									/>

									<button className='absolute top-3 right-3 cursor-pointer rounded-full bg-white p-1'>
										<FaRegHeart className='h-4 w-4' />
									</button>
								</div>
								<div className='mt-3 px-1'>
									<div className='flex items-center justify-between'>
										<h2 className='text-lg font-bold'>Product Name</h2>
										<p className='text-lg font-bold'>$120</p>
									</div>
									<p className='text-md font-light text-gray-600'>
										12 Stocks Remaining
									</p>
									<div className='mt-1 flex items-center gap-1'>
										<div className='flex items-center gap-1 text-yellow-400'>
											<FaStar />
											<FaStar />
											<FaStar />
											<FaStar />
											<FaRegStar />
										</div>
										(1,000+)
									</div>

									<button className='mt-3 cursor-pointer rounded-2xl border-1 px-8 py-2 font-semibold hover:bg-gray-500/10'>
										Add to Cart
									</button>
								</div>
							</div>

							<div className='w-74 flex-1 overflow-hidden rounded-b-lg p-3 shadow-sm'>
								<div className='relative'>
									<img
										src='https://picsum.photos/id/237/200/300'
										alt='dog'
										className='object-fit h-full w-full'
									/>

									<button className='absolute top-3 right-3 cursor-pointer rounded-full bg-white p-1'>
										<FaRegHeart className='h-4 w-4' />
									</button>
								</div>
								<div className='mt-3 px-1'>
									<div className='flex items-center justify-between'>
										<h2 className='text-lg font-bold'>Product Name</h2>
										<p className='text-lg font-bold'>$120</p>
									</div>
									<p className='text-md font-light text-gray-600'>
										12 Stocks Remaining
									</p>
									<div className='mt-1 flex items-center gap-1'>
										<div className='flex items-center gap-1 text-yellow-400'>
											<FaStar />
											<FaStar />
											<FaStar />
											<FaStar />
											<FaRegStar />
										</div>
										(1,000+)
									</div>

									<button className='mt-3 cursor-pointer rounded-2xl border-1 px-8 py-2 font-semibold hover:bg-gray-500/10'>
										Add to Cart
									</button>
								</div>
							</div>

							<div className='w-74 flex-1 overflow-hidden rounded-b-lg p-3 shadow-sm'>
								<div className='relative'>
									<img
										src='https://picsum.photos/id/237/200/300'
										alt='dog'
										className='object-fit h-full w-full'
									/>

									<button className='absolute top-3 right-3 cursor-pointer rounded-full bg-white p-1'>
										<FaRegHeart className='h-4 w-4' />
									</button>
								</div>
								<div className='mt-3 px-1'>
									<div className='flex items-center justify-between'>
										<h2 className='text-lg font-bold'>Product Name</h2>
										<p className='text-lg font-bold'>$120</p>
									</div>
									<p className='text-md font-light text-gray-600'>
										12 Stocks Remaining
									</p>
									<div className='mt-1 flex items-center gap-1'>
										<div className='flex items-center gap-1 text-yellow-400'>
											<FaStar />
											<FaStar />
											<FaStar />
											<FaStar />
											<FaRegStar />
										</div>
										(1,000+)
									</div>

									<button className='mt-3 cursor-pointer rounded-2xl border-1 px-8 py-2 font-semibold hover:bg-gray-500/10'>
										Add to Cart
									</button>
								</div>
							</div>

							<div className='w-74 flex-1 overflow-hidden rounded-b-lg p-3 shadow-sm'>
								<div className='relative'>
									<img
										src='https://picsum.photos/id/237/200/300'
										alt='dog'
										className='object-fit h-full w-full'
									/>

									<button className='absolute top-3 right-3 cursor-pointer rounded-full bg-white p-1'>
										<FaRegHeart className='h-4 w-4' />
									</button>
								</div>
								<div className='mt-3 px-1'>
									<div className='flex items-center justify-between'>
										<h2 className='text-lg font-bold'>Product Name</h2>
										<p className='text-lg font-bold'>$120</p>
									</div>
									<p className='text-md font-light text-gray-600'>
										12 Stocks Remaining
									</p>
									<div className='mt-1 flex items-center gap-1'>
										<div className='flex items-center gap-1 text-yellow-400'>
											<FaStar />
											<FaStar />
											<FaStar />
											<FaStar />
											<FaRegStar />
										</div>
										(1,000+)
									</div>

									<button className='mt-3 cursor-pointer rounded-2xl border-1 px-8 py-2 font-semibold hover:bg-gray-500/10'>
										Add to Cart
									</button>
								</div>
							</div>

							<div className='w-74 flex-1 overflow-hidden rounded-b-lg p-3 shadow-sm'>
								<div className='relative'>
									<img
										src='https://picsum.photos/id/237/200/300'
										alt='dog'
										className='object-fit h-full w-full'
									/>

									<button className='absolute top-3 right-3 cursor-pointer rounded-full bg-white p-1'>
										<FaRegHeart className='h-4 w-4' />
									</button>
								</div>
								<div className='mt-3 px-1'>
									<div className='flex items-center justify-between'>
										<h2 className='text-lg font-bold'>Product Name</h2>
										<p className='text-lg font-bold'>$120</p>
									</div>
									<p className='text-md font-light text-gray-600'>
										12 Stocks Remaining
									</p>
									<div className='mt-1 flex items-center gap-1'>
										<div className='flex items-center gap-1 text-yellow-400'>
											<FaStar />
											<FaStar />
											<FaStar />
											<FaStar />
											<FaRegStar />
										</div>
										(1,000+)
									</div>

									<button className='mt-3 cursor-pointer rounded-2xl border-1 px-8 py-2 font-semibold hover:bg-gray-500/10'>
										Add to Cart
									</button>
								</div>
							</div>
						</div>

						<div className='mt-5 items-center justify-center text-center'>
							<Link
								to='/products'
								className='w-54 rounded-xl border border-gray-400 px-10 py-1 font-normal md:hidden'
							>
								View More
							</Link>
						</div>
					</div>
				</ScrollFadeSection>

				{/* Services */}
				<ScrollFadeSection className='px-7 py-10 md:px-0 md:py-3 md:pb-12'>
					<div className='flex flex-col gap-3'>
						<h2 className='mt-3 text-center text-4xl font-bold md:text-left md:text-3xl 2xl:text-5xl'>
							Services to Help You
						</h2>

						<div className='mt-5 flex w-full flex-col flex-wrap items-center justify-center gap-6 md:flex-row md:gap-3 2xl:gap-5'>
							<motion.div
								whileHover={{ scale: 1.03 }}
								className='w-74 flex-1 overflow-hidden rounded-b-lg shadow-md'
							>
								<div className='relative'>
									<img
										src='https://picsum.photos/id/12/800/400'
										alt='dog'
										className='object-fit h-full w-full'
									/>
								</div>
								<div className='px-5 py-3'>
									<h2 className='max-w-[20rem] text-xl font-bold'>
										Frequently Asked Questions{' '}
									</h2>
									<p className='mt-2 max-w-[18rem] text-sm font-light text-gray-600'>
										We have a list of frequently asked questions to help you.
									</p>
								</div>
							</motion.div>

							<motion.div
								whileHover={{ scale: 1.03 }}
								className='w-74 flex-1 overflow-hidden rounded-b-lg shadow-md'
							>
								<div className='relative'>
									<img
										src='https://picsum.photos/id/12/800/400'
										alt='dog'
										className='object-fit h-full w-full'
									/>
								</div>
								<div className='px-5 py-3'>
									<h2 className='max-w-[15rem] text-xl font-bold'>
										Customer Support
									</h2>
									<p className='mt-2 max-w-[18rem] text-sm font-light text-gray-600'>
										Customer support is available 24/7 to assist you with any
										issues.
									</p>
								</div>
							</motion.div>

							<motion.div
								whileHover={{ scale: 1.03 }}
								className='w-74 flex-1 overflow-hidden rounded-b-lg shadow-md'
							>
								<div className='relative'>
									<img
										src='https://picsum.photos/id/12/800/400'
										alt='dog'
										className='object-fit h-full w-full'
									/>
								</div>
								<div className='px-5 py-3'>
									<h2 className='max-w-[20rem] text-xl font-bold'>
										Payment and Shipping Report
									</h2>
									<p className='mt-2 max-w-[18rem] text-sm font-light text-gray-600'>
										We provide a detailed report of your payment and shipping
										status.
									</p>
								</div>
							</motion.div>
						</div>
					</div>
				</ScrollFadeSection>
			</section>
		</div>
	);
}
