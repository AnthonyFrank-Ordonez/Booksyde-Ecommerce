import { createFileRoute, Link } from '@tanstack/react-router';
import { motion } from 'motion/react';

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

				<ScrollFadeSection className='px-7 py-10 md:px-0'>
					<div className='flex flex-col'>
						<div className='border-2 border-t border-gray-400/50'></div>

						<h2 className='mt-10 text-center text-3xl font-bold md:text-left md:text-4xl 2xl:text-5xl'>
							Today's Best Deals
						</h2>

						<div></div>
					</div>
				</ScrollFadeSection>

				<ScrollFadeSection className='px-5 py-7 md:px-0'>
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
			</section>
		</div>
	);
}
