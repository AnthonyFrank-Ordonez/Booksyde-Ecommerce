import { ScrollFadeSection } from '@/components/ScrollFadeSection';
import { createFileRoute } from '@tanstack/react-router';
import { motion } from 'motion/react';

export const Route = createFileRoute('/about')({
	component: About,
});

function About() {
	return (
		<div className='col-span-1 md:col-span-12'>
			{/* About Booksyde */}
			<section>
				<ScrollFadeSection className='flex flex-col items-center justify-center py-12 md:min-h-screen'>
					<div>
						<h2 className='text-center text-4xl font-bold md:text-6xl 2xl:text-7xl'>
							About Booksyde
						</h2>
						<p className='text-md mt-5 p-5 text-center font-normal text-gray-500 md:max-w-3xl 2xl:max-w-5xl 2xl:text-xl'>
							Booksyde is your go-to ecommerce platform for all things books and
							manga. Whether you're a casual reader or a hardcore collector, we
							have something for everyone. Our mission is to provide a seamless
							and enjoyable shopping experience for book lovers everywhere.
						</p>
					</div>

					<div className='h-full w-full max-w-5xl px-7 md:mt-10 2xl:max-w-7xl'>
						<div className='h-64 max-h-64 w-full overflow-hidden rounded-lg shadow-lg shadow-gray-400 md:h-96 md:max-h-96 2xl:h-[500px] 2xl:max-h-[500px]'>
							<img
								src='https://picsum.photos/id/437/200/300'
								alt='dog'
								className='object-fit h-full w-full'
							/>
						</div>
					</div>
				</ScrollFadeSection>
			</section>

			{/* Started */}
			<section className='bg-gray-100'>
				<ScrollFadeSection className='flex flex-wrap items-center justify-center py-12 md:min-h-screen 2xl:gap-12'>
					<div className='flex w-full flex-col justify-center px-10 text-center md:w-1/2 md:text-left 2xl:w-1/3 2xl:p-12'>
						<h2 className='text-4xl font-bold md:text-7xl 2xl:text-7xl'>
							How we started
						</h2>

						<p className='text-md mt-5 font-normal text-gray-500 2xl:mt-7 2xl:max-w-2xl 2xl:text-xl'>
							Booksyde was founded in 2025 by a group of passionate book lovers
							who wanted to create a platform that caters to the needs of
							readers. Our team is dedicated to curating a diverse selection of
							books and manga, ensuring that you can find your next favorite
							read.
						</p>
					</div>

					<div className='mt-10 h-full w-full px-12 md:mt-0 md:w-1/2 2xl:w-1/2 2xl:max-w-4xl'>
						<div className='h-96 max-h-96 items-center justify-center overflow-hidden rounded-lg shadow-lg shadow-gray-500 2xl:h-[600px] 2xl:max-h-[600px]'>
							<img
								src='https://picsum.photos/id/437/200/300'
								alt='dog'
								className='object-fit h-full w-full'
							/>
						</div>
					</div>
				</ScrollFadeSection>
			</section>

			{/* Teams */}
			<section>
				<ScrollFadeSection className='flex flex-col items-center p-12 md:min-h-screen'>
					<h2 className='text-center text-4xl font-bold md:text-6xl 2xl:text-8xl'>
						People behind Booksyde
					</h2>

					<p className='text-md mt-5 w-full text-center font-normal text-gray-500 md:max-w-5xl 2xl:text-xl'>
						Our team is made up of book enthusiasts, tech experts, and designers
						who are committed to providing the best possible experience for our
						users. We believe that everyone should have access to the stories
						that inspire and entertain
					</p>

					<div className='mt-10 flex flex-col flex-wrap items-center justify-center gap-5 md:mt-15 md:flex-row'>
						<motion.div
							whileHover={{ scale: 1.03 }}
							className='relative h-full w-70 max-w-80 overflow-hidden rounded-lg md:h-[500px] md:max-h-[500px] md:w-70 md:max-w-96 2xl:h-[600px] 2xl:max-h-[650px] 2xl:w-[300px] 2xl:max-w-[350px]'
						>
							<img
								src='https://picsum.photos/id/237/200/300'
								alt='dog'
								className='object-fit h-full w-full'
							/>

							<div className='absolute right-0 bottom-0 left-0'>
								<div className='bg-gradient-to-t from-black/80 to-transparent p-4 pt-8 text-white'>
									<h2 className='text-xl font-bold 2xl:text-3xl'>Name</h2>
									<p className='text-sm font-light 2xl:text-lg'>Position</p>
								</div>
							</div>
						</motion.div>

						<motion.div
							whileHover={{ scale: 1.03 }}
							className='relative h-full w-70 max-w-80 overflow-hidden rounded-lg md:h-[500px] md:max-h-[500px] md:w-70 md:max-w-96 2xl:h-[600px] 2xl:max-h-[650px] 2xl:w-[300px] 2xl:max-w-[350px]'
						>
							<img
								src='https://picsum.photos/id/237/200/300'
								alt='dog'
								className='object-fit h-full w-full'
							/>

							<div className='absolute right-0 bottom-0 left-0'>
								<div className='bg-gradient-to-t from-black/80 to-transparent p-4 pt-8 text-white'>
									<h2 className='text-xl font-bold 2xl:text-3xl'>Name</h2>
									<p className='text-sm font-light 2xl:text-lg'>Position</p>
								</div>
							</div>
						</motion.div>
						<motion.div
							whileHover={{ scale: 1.03 }}
							className='relative h-full w-70 max-w-80 overflow-hidden rounded-lg md:h-[500px] md:max-h-[500px] md:w-70 md:max-w-96 2xl:h-[600px] 2xl:max-h-[650px] 2xl:w-[300px] 2xl:max-w-[350px]'
						>
							<img
								src='https://picsum.photos/id/237/200/300'
								alt='dog'
								className='object-fit h-full w-full'
							/>

							<div className='absolute right-0 bottom-0 left-0'>
								<div className='bg-gradient-to-t from-black/80 to-transparent p-4 pt-8 text-white'>
									<h2 className='text-xl font-bold 2xl:text-3xl'>Name</h2>
									<p className='text-sm font-light 2xl:text-lg'>Position</p>
								</div>
							</div>
						</motion.div>
					</div>
				</ScrollFadeSection>
			</section>

			{/* 

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
			</section> */}
		</div>
	);
}
