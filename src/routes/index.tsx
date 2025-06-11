import HoverContainer from '@/components/HoverContainer';
import { ScrollFadeSection } from '@/components/ScrollFadeSection';
import { createFileRoute, Link } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
	component: Home,
});

function Home() {
	return (
		<div className='col-span-1 md:col-span-12'>
			{/* Intro */}
			<section className='bg-gray-100'>
				<ScrollFadeSection className='grid h-full grid-cols-1 px-5 py-12 lg:grid-cols-2 lg:px-10 xl:px-12'>
					<div className='flex flex-col items-center justify-center gap-2 md:mt-10 lg:items-start xl:mx-10 2xl:mx-25'>
						<h2 className='ld:text-7xl text-5xl font-bold sm:text-6xl md:text-7xl lg:text-[5.5rem] xl:text-[5.3rem] 2xl:text-[5.8rem]'>
							Booksyde
						</h2>
						<h2 className='text-xl font-bold sm:text-2xl md:text-3xl 2xl:text-[2.2rem]'>
							Ecommerce for Books and Manga
						</h2>
						<p className='max-w-md text-center font-light text-gray-500 sm:max-w-lg sm:text-lg md:max-w-xl md:text-xl lg:max-w-lg lg:text-left xl:text-lg 2xl:max-w-xl 2xl:text-xl'>
							Booksyde is your go-to ecommerce platform for all things books and
							manga. Whether you're a casual reader or a hardcore collector, we
							have something for everyone
						</p>
						<Link
							to='/products'
							className='mt-2 w-full max-w-56 rounded-lg border bg-black p-2 text-center text-white sm:mt-3 sm:max-w-96 sm:p-3 md:mt-5 md:max-w-[25rem] md:text-lg lg:max-w-[25rem]'
							aria-label='Get Started'
						>
							Get Started
						</Link>
					</div>
					<div className='mx-auto mt-24 h-auto w-full max-w-96 sm:max-w-[35rem] md:max-w-[40rem] lg:mt-0 lg:max-w-[35rem] xl:mx-2 xl:max-w-[40rem] 2xl:mx-1 2xl:max-w-[45rem]'>
						<img
							src='/public/img/homepage-banner-1.png'
							alt='homepage banner 1'
						/>
					</div>
				</ScrollFadeSection>
			</section>

			{/* Offers */}
			<section>
				<ScrollFadeSection className='mx-auto flex flex-col items-center p-12 md:min-h-screen'>
					<h2 className='text-center text-5xl font-bold md:text-6xl 2xl:text-8xl'>
						What we offer
					</h2>

					<p className='mt-5 w-full text-center text-lg font-normal text-gray-500 md:max-w-4xl 2xl:max-w-6xl 2xl:text-xl'>
						Booksyde offers a wide range of features to enhance your shopping
						experience. From personalized recommendations to exclusive deals,
						we've got you covered.
					</p>

					<div className='mt-15 flex w-full max-w-5xl flex-col items-center justify-center gap-5 md:flex-row 2xl:max-w-7xl'>
						<HoverContainer className='relative max-h-[600px] w-full max-w-md overflow-hidden rounded-lg bg-black shadow-lg shadow-gray-500'>
							<img
								src='https://picsum.photos/id/237/200/300'
								alt='dog'
								className='object-fit h-full w-full'
							/>

							<div className='absolute right-0 bottom-0 left-0'>
								<div className='bg-gradient-to-t from-black/80 to-transparent p-4 pt-8 text-white'>
									<h2 className='text-xl font-bold 2xl:text-3xl'>Books</h2>
									<p className='text-sm font-light 2xl:text-lg'>
										Discover a wide range of books from various genres,
										including fiction, non-fiction, and more.
									</p>
								</div>
							</div>
						</HoverContainer>

						<HoverContainer className='relative max-h-[600px] w-full max-w-md overflow-hidden rounded-lg bg-black shadow-lg shadow-gray-500'>
							<img
								src='https://picsum.photos/id/237/200/300'
								alt='dog'
								className='object-fit h-full w-full'
							/>

							<div className='absolute right-0 bottom-0 left-0'>
								<div className='bg-gradient-to-t from-black/80 to-transparent p-4 pt-8 text-white'>
									<h2 className='text-xl font-bold 2xl:text-3xl'>Manga</h2>
									<p className='text-sm font-light 2xl:text-lg'>
										Explore our extensive collection of manga, from classics to
										the latest releases.
									</p>
								</div>
							</div>
						</HoverContainer>

						<HoverContainer className='relative max-h-[600px] w-full max-w-md overflow-hidden rounded-lg bg-black shadow-lg shadow-gray-500'>
							<img
								src='https://picsum.photos/id/237/200/300'
								alt='dog'
								className='object-fit h-full w-full'
							/>

							<div className='absolute right-0 bottom-0 left-0'>
								<div className='bg-gradient-to-t from-black/80 to-transparent p-4 pt-8 text-white'>
									<h2 className='text-xl font-bold 2xl:text-3xl'>Novels</h2>
									<p className='text-sm font-light 2xl:text-lg'>
										Find captivating novels that will take you on a journey
										through different worlds and stories.
									</p>
								</div>
							</div>
						</HoverContainer>
					</div>
				</ScrollFadeSection>
			</section>

			{/* Best Sellers */}
			<section className='bg-gray-100'>
				<ScrollFadeSection className='flex w-full flex-col md:min-h-screen md:flex-row'>
					<div className='mx-auto flex w-full max-w-xl flex-col justify-center px-12 py-12 text-center md:w-1/2 md:px-5 md:text-left 2xl:w-1/2 2xl:max-w-5xl 2xl:px-12'>
						<h2 className='text-5xl font-bold md:text-7xl 2xl:text-9xl'>
							Booksyde:
						</h2>
						<h2 className='mb-5 text-5xl font-bold md:text-7xl 2xl:mt-5 2xl:mb-8 2xl:text-8xl'>
							Best Sellers
						</h2>
						<p className='text-lg font-normal text-gray-500 md:max-w-lg 2xl:max-w-3xl 2xl:text-xl'>
							Discover our best-selling books and mangas that have captured the
							hearts of readers worldwide. From timeless classics to the latest
							hits, our collection has something for everyone.
						</p>
					</div>

					<div className='mx-auto flex w-full max-w-lg flex-col gap-5 px-12 py-12 md:w-3/4 md:max-w-2xl md:flex-row md:px-2 md:py-12 2xl:mt-10 2xl:mr-20 2xl:max-h-[70rem] 2xl:w-1/2 2xl:max-w-4xl 2xl:py-10'>
						<HoverContainer className='relative h-full w-full max-w-xl items-center justify-center overflow-hidden rounded-lg bg-black shadow-lg shadow-gray-500 md:mt-10 md:max-h-[85%] 2xl:max-h-[80%]'>
							<img
								src='https://picsum.photos/id/237/200/300'
								alt='dog'
								className='object-fit h-full w-full'
							/>

							<div className='absolute right-0 bottom-0 left-0'>
								<div className='bg-gradient-to-t from-black/80 to-transparent p-4 pt-8 text-white'>
									<h2 className='text-xl font-bold 2xl:text-3xl'>Novels</h2>
									<p className='text-sm font-light 2xl:text-lg'>
										Find captivating novels that will take you on a journey
										through different worlds and stories.
									</p>
								</div>
							</div>
						</HoverContainer>

						<HoverContainer className='relative h-full w-full items-center justify-center overflow-hidden rounded-lg bg-black shadow-lg shadow-gray-500 md:mt-10 md:max-h-[85%] 2xl:max-h-[80%]'>
							<img
								src='https://picsum.photos/id/237/200/300'
								alt='dog'
								className='object-fit h-full w-full'
							/>

							<div className='absolute right-0 bottom-0 left-0'>
								<div className='bg-gradient-to-t from-black/80 to-transparent p-4 pt-8 text-white'>
									<h2 className='text-xl font-bold 2xl:text-3xl'>Novels</h2>
									<p className='text-sm font-light 2xl:text-lg'>
										Find captivating novels that will take you on a journey
										through different worlds and stories.
									</p>
								</div>
							</div>
						</HoverContainer>

						<HoverContainer className='relative h-full w-full items-center justify-center overflow-hidden rounded-lg bg-black shadow-lg shadow-gray-500 md:mt-10 md:max-h-[85%] 2xl:max-h-[80%]'>
							<img
								src='https://picsum.photos/id/237/200/300'
								alt='dog'
								className='object-fit h-full w-full'
							/>

							<div className='absolute right-0 bottom-0 left-0'>
								<div className='bg-gradient-to-t from-black/80 to-transparent p-4 pt-8 text-white'>
									<h2 className='text-xl font-bold 2xl:text-3xl'>Novels</h2>
									<p className='text-sm font-light 2xl:text-lg'>
										Find captivating novels that will take you on a journey
										through different worlds and stories.
									</p>
								</div>
							</div>
						</HoverContainer>
					</div>
				</ScrollFadeSection>
			</section>

			{/* Why shop with us */}
			<section>
				<ScrollFadeSection className='flex h-full w-full flex-col items-center p-12 md:min-h-screen'>
					<div className='max-w-m w-full md:max-w-5xl 2xl:max-w-7xl'>
						<h2 className='text-center text-5xl font-bold md:text-6xl 2xl:text-8xl'>
							Why Shop with Booksyde
						</h2>

						<p className='mt-5 w-full text-center text-lg font-normal text-gray-500 md:max-w-5xl 2xl:mt-10 2xl:max-w-7xl 2xl:text-xl'>
							Why shop with us? Booksyde is committed to providing the best
							shopping experience for our customers. With a user-friendly
							interface, secure payment options, and fast shipping, we make it
							easy for you to find and purchase your favorite books and manga.
						</p>
					</div>

					<div className='mt-15 flex flex-wrap justify-center gap-4 px-4 md:flex-row md:px-8 2xl:mt-30'>
						<HoverContainer className='flex flex-col items-center justify-center rounded-2xl border border-gray-300 bg-white p-6 shadow-sm md:h-64 md:w-64 2xl:h-88 2xl:max-h-[80%] 2xl:w-74'>
							<h2 className='mb-4 text-center text-xl font-bold 2xl:text-2xl'>
								Authenticity
							</h2>
							<p className='2xl:text-md text-center text-sm'>
								We guarantee that all products sold on Booksyde are 100%
								authenticated and genuine. No fakes, no counterfeits.
							</p>
						</HoverContainer>

						<HoverContainer className='flex flex-col items-center justify-center rounded-2xl border border-gray-300 bg-white p-6 shadow-sm md:h-64 md:w-64 2xl:h-88 2xl:w-74'>
							<h2 className='mb-4 text-center text-xl font-bold 2xl:text-2xl'>
								Delivery
							</h2>
							<p className='2xl:text-md text-center text-sm'>
								We offer fast and reliable delivery options to ensure that your
								books and manga arrive at your doorstep in perfect condition.
							</p>
						</HoverContainer>

						<HoverContainer className='flex flex-col items-center justify-center rounded-2xl border border-gray-300 bg-white p-6 shadow-sm md:h-64 md:w-64 2xl:h-88 2xl:w-74'>
							<h2 className='mb-4 text-center text-xl font-bold 2xl:text-2xl'>
								Payments
							</h2>
							<p className='2xl:text-md text-center text-sm'>
								We offer a variety of secure payment options to make your
								shopping experience as smooth as possible. Choose the one that
								works best for you.
							</p>
						</HoverContainer>

						<HoverContainer className='flex flex-col items-center justify-center rounded-2xl border border-gray-300 bg-white p-6 shadow-sm md:h-64 md:w-64 2xl:h-88 2xl:w-74'>
							<h2 className='mb-4 text-center text-xl font-bold 2xl:text-2xl'>
								Easy Returns
							</h2>
							<p className='2xl:text-md text-center text-sm'>
								If you're not satisfied with your purchase, we offer easy
								returns and exchanges. Your satisfaction is our priority.
							</p>
						</HoverContainer>
					</div>
				</ScrollFadeSection>
			</section>
		</div>
	);
}
