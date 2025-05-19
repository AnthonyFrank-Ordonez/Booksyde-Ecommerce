import { ScrollFadeSection } from '@/components/ScrollFadeSection';
import { createFileRoute } from '@tanstack/react-router';
import { motion } from 'motion/react';

export const Route = createFileRoute('/about')({
	component: About,
});

function About() {
	return (
		<div className='col-span-1 md:col-span-8'>
			<section>
				<ScrollFadeSection className='flex w-full flex-col md:min-h-screen md:flex-row'>
					<div className='flex w-full flex-col items-center p-20 2xl:p-30'>
						<h2 className='text-center text-5xl font-bold md:text-6xl 2xl:text-8xl'>
							About Booksyde
						</h2>

						<p className='mt-5 w-full text-center text-lg font-normal text-gray-500 md:max-w-3xl 2xl:text-xl'>
							Booksyde is your go-to ecommerce platform for all things books and
							manga. Whether you're a casual reader or a hardcore collector, we
							have something for everyone. Our mission is to provide a seamless
							and enjoyable shopping experience for book lovers everywhere.
						</p>

						<div className='mt-20 h-[400px] w-full md:min-h-[400px] md:max-w-5xl 2xl:max-w-7xl'>
							<div className='h-full rounded-lg bg-black'></div>
						</div>
					</div>
				</ScrollFadeSection>
			</section>

			<section className='bg-gray-100 py-10 md:py-1 2xl:py-1'>
				<ScrollFadeSection className='flex w-full flex-col md:min-h-screen md:flex-row'>
					<div className='flex w-full flex-col justify-center p-10 text-center md:w-1/2 md:text-left 2xl:p-30'>
						<h2 className='text-5xl font-bold md:text-7xl 2xl:text-9xl'>
							How we started
						</h2>

						<p className='mt-2 text-lg font-normal 2xl:text-xl'>
							Booksyde was founded in 2025 by a group of passionate book lovers
							who wanted to create a platform that caters to the needs of
							readers. Our team is dedicated to curating a diverse selection of
							books and manga, ensuring that you can find your next favorite
							read.
						</p>
					</div>

					<div className='flex w-full flex-col justify-center gap-5 px-20 md:w-1/2 md:py-25 2xl:w-3/4 2xl:p-40'>
						<motion.div
							whileHover={{ scale: 1.03 }}
							className='h-full w-full items-center justify-center rounded-2xl bg-black p-15 shadow-lg shadow-gray-500 md:w-full md:p-5 2xl:w-2xl'
						>
							<h2 className='text-white'>Image here</h2>
						</motion.div>
					</div>
				</ScrollFadeSection>
			</section>

			<section>
				<ScrollFadeSection className='flex h-screen w-full flex-col md:flex-row'>
					<div className='flex w-full flex-col items-center p-20 2xl:p-30'>
						<h2 className='text-center text-5xl font-bold md:text-6xl 2xl:text-8xl'>
							People behind Booksyde
						</h2>

						<p className='mt-5 w-full text-center text-lg font-normal md:max-w-5xl 2xl:text-xl'>
							Our team is made up of book enthusiasts, tech experts, and
							designers who are committed to providing the best possible
							experience for our users. We believe that everyone should have
							access to the stories that inspire and entertain
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
		</div>
	);
}
