import { ScrollFadeSection } from '@/components/ScrollFadeSection';
import { createFileRoute, Link } from '@tanstack/react-router';
import { motion } from 'motion/react';

export const Route = createFileRoute('/')({
	component: Home,
});

function Home() {
	return (
		<div className='col-span-1 md:col-span-8'>
			{/* Intro */}
			<section className='bg-gray-100'>
				<ScrollFadeSection className='flex h-full w-full flex-col gap-x-10 md:h-screen md:flex-row'>
					<div className='flex w-full flex-col justify-center p-10 text-center md:w-1/2 md:text-left 2xl:p-30'>
						<h2 className='text-5xl font-bold md:text-7xl 2xl:text-9xl'>
							Booksyde:
						</h2>
						<h2 className='mb-5 text-5xl font-bold md:text-6xl 2xl:mb-8 2xl:text-7xl'>
							Ecommerce for Books and Manga
						</h2>
						<p className='text-lg font-normal 2xl:text-xl'>
							Booksyde is your go-to ecommerce platform for all things books and
							manga. Whether you're a casual reader or a hardcore collector, we
							have something for everyone.
						</p>
						<Link
							to='/'
							aria-label='get-started-btn'
							className='mt-5 w-full cursor-pointer rounded-full border border-black bg-transparent py-3 text-center font-medium hover:bg-gray-200 md:w-1/3 2xl:w-1/2 2xl:py-4'
						>
							Get Started
						</Link>
					</div>

					{/* <div className='flex h-[500px] items-center justify-center gap-5'>
						<div className='flex h-full flex-col justify-between'>
							<img
								src='https://picsum.photos/id/237/200/300'
								alt='dog'
								className='h-3/7 w-auto rounded-xl object-cover'
							/>
							<img
								src='https://picsum.photos/id/237/200/300'
								alt='dog'
								className='h-1/2 w-auto rounded-xl object-cover'
							/>
						</div>

						<div className='h-full'>
							<img
								src='https://picsum.photos/id/237/200/300'
								alt='dog'
								className='h-full w-auto rounded-xl object-cover'
							/>
						</div>
					</div> */}

					<div className='flex w-full flex-row justify-center gap-5 px-10 py-15 md:w-1/2 md:p-20 2xl:w-3/4 2xl:p-40'>
						<div className='flex flex-col items-end justify-end space-y-5 rounded-lg'>
							<div className='h-full w-full items-center justify-center overflow-hidden rounded-lg bg-black shadow-lg shadow-gray-500'>
								<img
									src='https://picsum.photos/id/237/200/300'
									alt='dog'
									className='h-full w-full object-cover'
								/>
							</div>
							<div className='h-full w-full items-center justify-center overflow-hidden rounded-lg bg-black shadow-lg shadow-gray-500'>
								<img
									src='https://picsum.photos/id/237/200/300'
									alt='dog'
									className='h-full w-full object-cover'
								/>
							</div>
						</div>

						<div className='flex flex-col items-center justify-center space-y-5 rounded-lg bg-gray-500'>
							<div className='h-full w-full items-center justify-center overflow-hidden rounded-lg bg-black shadow-lg shadow-gray-500'>
								<img
									src='https://picsum.photos/id/237/200/300'
									alt='dog'
									className='h-full w-full object-cover'
								/>
							</div>
						</div>
					</div>
				</ScrollFadeSection>
			</section>

			{/* Offers */}
			<section>
				<ScrollFadeSection className='flex w-full flex-col md:min-h-screen md:flex-row'>
					<div className='flex w-full flex-col items-center p-20 2xl:p-30'>
						<h2 className='text-center text-5xl font-bold md:text-6xl 2xl:text-8xl'>
							What we offer:
						</h2>

						<p className='mt-5 w-full text-center text-lg font-normal md:max-w-5xl 2xl:text-xl'>
							Booksyde offers a wide range of features to enhance your shopping
							experience. From personalized recommendations to exclusive deals,
							we've got you covered.
						</p>

						<div className='mt-15 flex h-full w-full flex-col items-center justify-center gap-5 md:flex-row'>
							<motion.div
								whileHover={{ scale: 1.03 }}
								className='h-full w-full max-w-md items-center justify-center rounded-lg bg-black px-10 shadow-lg shadow-gray-500 md:w-1/4'
							>
								<h2 className='py-10 text-center text-2xl font-bold text-white 2xl:text-5xl'>
									Books
								</h2>
								<p className='mb-10 px-10 font-medium text-white 2xl:py-20'></p>
							</motion.div>

							<motion.div
								whileHover={{ scale: 1.03 }}
								className='h-full w-full max-w-md items-center justify-center rounded-lg bg-black shadow-lg shadow-gray-500 md:w-1/4'
							>
								<h2 className='py-10 text-center text-2xl font-bold text-white 2xl:text-5xl'>
									Manga
								</h2>
								<p className='mb-10 px-10 font-medium text-white 2xl:py-20'></p>
							</motion.div>

							<motion.div
								whileHover={{ scale: 1.03 }}
								className='h-full w-full max-w-md items-center justify-center rounded-lg bg-black shadow-lg shadow-gray-500 md:w-1/4'
							>
								<h2 className='py-10 text-center text-2xl font-bold text-white 2xl:text-5xl'>
									Novels
								</h2>
								<p className='mb-10 px-10 font-medium text-white 2xl:py-20'></p>
							</motion.div>
						</div>
					</div>
				</ScrollFadeSection>
			</section>

			{/* Best Sellers */}
			<section className='bg-gray-100'>
				<ScrollFadeSection className='flex w-full flex-col md:min-h-screen md:flex-row'>
					<div className='flex w-full flex-col justify-center p-10 text-center md:w-1/2 md:text-left 2xl:p-30'>
						<h2 className='text-5xl font-bold md:text-7xl 2xl:text-9xl'>
							Booksyde:
						</h2>
						<h2 className='mb-5 text-5xl font-bold md:text-7xl 2xl:mt-5 2xl:mb-8 2xl:text-8xl'>
							Best Sellers
						</h2>
						<p className='text-lg font-normal 2xl:text-xl'>
							Discover our best-selling books and mangas that have captured the
							hearts of readers worldwide. From timeless classics to the latest
							hits, our collection has something for everyone.
						</p>
					</div>

					<div className='mx-auto flex w-full max-w-md flex-col justify-center gap-5 md:w-1/2 md:max-w-xl md:py-12 2xl:w-3/4 2xl:max-w-2xl'>
						<motion.div
							whileHover={{ scale: 1.03 }}
							className='h-full w-full items-center justify-center rounded-lg bg-black p-15 shadow-lg shadow-gray-500 md:w-full md:p-5 2xl:w-2xl'
						>
							<h2 className='text-white'>Image here</h2>
						</motion.div>

						<motion.div
							whileHover={{ scale: 1.03 }}
							className='h-full w-full items-center justify-center rounded-lg bg-black p-15 shadow-lg shadow-gray-500 md:w-full md:p-5 2xl:w-2xl'
						>
							<h2 className='text-white'>Image here</h2>
						</motion.div>

						<motion.div
							whileHover={{ scale: 1.03 }}
							className='h-full w-full items-center justify-center rounded-lg bg-black p-15 shadow-lg shadow-gray-500 md:w-full md:p-5 2xl:w-2xl'
						>
							<h2 className='text-white'>Image here</h2>
						</motion.div>
					</div>
				</ScrollFadeSection>
			</section>

			{/* Why shop with us */}
			<section>
				<ScrollFadeSection className='flex w-full flex-col md:min-h-screen md:flex-row'>
					<div className='flex w-full flex-col items-center p-20 2xl:p-30'>
						<h2 className='text-center text-5xl font-bold md:text-6xl 2xl:text-8xl'>
							Why Shop with Booksyde:
						</h2>

						<p className='mt-5 w-full text-center text-lg font-normal md:max-w-5xl 2xl:mt-10 2xl:max-w-7xl 2xl:text-xl'>
							Why shop with us? Booksyde is committed to providing the best
							shopping experience for our customers. With a user-friendly
							interface, secure payment options, and fast shipping, we make it
							easy for you to find and purchase your favorite books and manga.
						</p>

						<div className='mt-15 flex h-full w-full flex-col items-center justify-center gap-5 md:flex-row 2xl:mt-25 2xl:h-7/12'>
							<motion.div
								whileHover={{ scale: 1.03 }}
								className='h-full w-full max-w-md items-center justify-center rounded-2xl border-2 border-black/30 bg-transparent md:w-1/4'
							>
								<h2 className='py-10 text-center text-2xl font-bold text-black 2xl:mt-5 2xl:text-4xl'>
									Authenticity
								</h2>
								<p className='mb-10 px-10 text-center text-black 2xl:py-20 2xl:text-2xl'>
									We guarantee that all products sold on Booksyde are 100%
									authenticated and genuine. No fakes, no counterfeits.
								</p>
							</motion.div>

							<motion.div
								whileHover={{ scale: 1.03 }}
								className='h-full w-full max-w-md items-center justify-center rounded-2xl border-2 border-black/30 bg-transparent md:w-1/4'
							>
								<h2 className='py-10 text-center text-2xl font-bold text-black 2xl:mt-5 2xl:text-4xl'>
									Delivery
								</h2>
								<p className='mb-10 px-10 text-center text-black 2xl:py-20 2xl:text-2xl'>
									We offer fast and reliable delivery options to ensure that
									your books and manga arrive at your doorstep in perfect
									condition.
								</p>
							</motion.div>

							<motion.div
								whileHover={{ scale: 1.03 }}
								className='h-full w-full max-w-md items-center justify-center rounded-2xl border-2 border-black/30 bg-transparent md:w-1/4'
							>
								<h2 className='py-10 text-center text-2xl font-bold text-black 2xl:mt-5 2xl:text-4xl'>
									Payments
								</h2>
								<p className='mb-10 px-10 text-center text-black 2xl:py-20 2xl:text-2xl'>
									We offer a variety of secure payment options to make your
									shopping experience as smooth as possible. Choose the one that
									works best for you.
								</p>
							</motion.div>

							<motion.div
								whileHover={{ scale: 1.03 }}
								className='h-full w-full max-w-md items-center justify-center rounded-2xl border-2 border-black/30 bg-transparent md:w-1/4'
							>
								<h2 className='py-10 text-center text-2xl font-bold text-black 2xl:mt-5 2xl:text-4xl'>
									Easy Returns
								</h2>
								<p className='mb-10 px-10 text-center text-black 2xl:py-20 2xl:text-2xl'>
									If you're not satisfied with your purchase, we offer easy
									returns and exchanges. Your satisfaction is our priority.
								</p>
							</motion.div>
						</div>
					</div>
				</ScrollFadeSection>
			</section>
		</div>
	);
}
