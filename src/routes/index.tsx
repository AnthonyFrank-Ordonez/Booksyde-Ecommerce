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
			<section className='relative'>
				<img
					src='/public/img/geometry-bg.png'
					alt='geometry-lines'
					crossOrigin='anonymous'
					className='absolute inset-0 -z-10 h-full w-full bg-gray-100 object-cover opacity-50'
				/>

				<ScrollFadeSection className='grid h-full grid-cols-1 px-5 py-12 lg:grid-cols-2 lg:px-10 xl:px-12'>
					<div className='flex flex-col items-center justify-center gap-2 md:mt-10 lg:items-start xl:mx-10 2xl:mx-25'>
						<h2 className='text-5xl font-bold sm:text-6xl md:text-7xl lg:text-[5.5rem] xl:text-[5.3rem] 2xl:text-[5.8rem]'>
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
							className='mt-2 w-full max-w-56 rounded-lg border bg-black p-2 text-center text-white hover:bg-black/85 sm:mt-3 sm:max-w-96 sm:p-3 md:mt-5 md:max-w-[25rem] md:text-lg lg:max-w-[25rem]'
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
				<ScrollFadeSection className='mt-5 h-full w-full px-5 py-12 md:mt-10'>
					<div className='flex flex-col items-center justify-center'>
						<p className='font-medium sm:text-lg'>Booksyde</p>
						<h2 className='text-4xl font-bold sm:text-5xl md:text-6xl 2xl:text-7xl'>
							What We Offer
						</h2>
						<p className='mt-3 max-w-sm text-center font-light text-gray-500 sm:mt-5 sm:max-w-lg md:max-w-xl md:text-lg lg:max-w-2xl 2xl:max-w-3xl 2xl:text-xl'>
							Booksyde offers a wide range of features to enhance your shopping
							experience. From personalized recommendations to exclusive deals,
							we've got you covered.
						</p>
					</div>

					<ScrollFadeSection className='mt-8 grid min-h-[26rem] grid-cols-1 items-center justify-center gap-6 sm:my-15 sm:grid-cols-3 sm:gap-3 sm:px-3 md:my-25 md:mt-10 md:min-h-[33rem] md:px-7 lg:min-h-[35rem] lg:gap-3 lg:px-10 xl:mx-auto xl:my-30 xl:mt-15 xl:min-h-[30rem] xl:max-w-6xl xl:gap-15 xl:px-[5rem] 2xl:mx-auto 2xl:mt-18 2xl:min-h-[40rem] 2xl:max-w-[78rem] 2xl:gap-20'>
						<HoverContainer className='relative mx-auto h-full w-full max-w-72 overflow-hidden rounded-sm sm:mt-15 lg:max-w-90 lg:min-w-75 xl:max-w-[20rem] xl:min-w-80 2xl:min-w-85'>
							<img
								src='/public/img/Books.jpg'
								alt='Books'
								className='object-fit h-full w-full'
							/>

							<div className='absolute inset-0 bg-gradient-to-b from-black/90 via-transparent to-black/90'></div>

							<div className='absolute right-0 bottom-0 left-0'>
								<div className='p-4 text-white'>
									<h2 className='text-lg font-bold lg:text-xl'>Manga</h2>
									<p className='text-sm font-light lg:text-[1rem]'>
										Discover a wide range of books from various genres,
										including fiction, non-fiction, and more.
									</p>
								</div>
							</div>
						</HoverContainer>

						<HoverContainer className='relative mx-auto h-full w-full max-w-72 overflow-hidden rounded-sm sm:mt-35 lg:max-w-90 lg:min-w-75 xl:max-w-[20rem] xl:min-w-80 2xl:min-w-85'>
							<img
								src='/public/img/Manga.jpg'
								alt='Manga'
								className='object-fit h-full w-full'
							/>

							<div className='absolute inset-0 bg-gradient-to-b from-black/90 via-transparent to-black/90'></div>

							<div className='absolute right-0 bottom-0 left-0'>
								<div className='p-4 text-white'>
									<h2 className='text-lg font-bold lg:text-xl'>Manga</h2>
									<p className='text-sm font-light lg:text-[1rem]'>
										Discover a wide range of books from various genres,
										including fiction, non-fiction, and more.
									</p>
								</div>
							</div>
						</HoverContainer>

						<HoverContainer className='relative mx-auto h-full w-full max-w-72 overflow-hidden rounded-sm sm:mb-10 lg:max-w-90 lg:min-w-75 xl:max-w-[20rem] xl:min-w-80 2xl:min-w-85'>
							<img
								src='/public/img/Novels.jpg'
								alt='Novels'
								className='object-fit h-full w-full'
							/>

							<div className='absolute inset-0 bg-gradient-to-b from-black/90 via-transparent to-black/90'></div>

							<div className='absolute right-0 bottom-0 left-0'>
								<div className='p-4 text-white'>
									<h2 className='text-lg font-bold lg:text-xl'>Manga</h2>
									<p className='text-sm font-light lg:text-[1rem]'>
										Discover a wide range of books from various genres,
										including fiction, non-fiction, and more.
									</p>
								</div>
							</div>
						</HoverContainer>
					</ScrollFadeSection>
				</ScrollFadeSection>
			</section>

			{/* Best Sellers */}
			<section className='relative'>
				<img
					src='/public/img/geometry-bg.png'
					alt='geometry-lines'
					crossOrigin='anonymous'
					className='absolute inset-0 -z-10 h-full w-full bg-gray-100 object-cover opacity-50'
				/>
				<div className='grid grid-cols-1 px-12 py-12 md:py-24 lg:grid-cols-2 lg:py-35 xl:py-40 2xl:py-35'>
					<ScrollFadeSection className='flex flex-col items-center justify-center lg:items-start xl:mx-10 2xl:mx-20 2xl:max-w-2xl'>
						<p className='font-bold sm:text-lg lg:ml-1'>Booksyde</p>
						<h2 className='text-4xl font-bold sm:text-5xl md:text-6xl lg:text-[3.5rem] xl:text-[4rem] 2xl:text-[5rem]'>
							Best Sellers
						</h2>
						<p className='lg:text-md mt-3 max-w-sm text-center font-light text-gray-500 sm:max-w-md md:mt-5 md:max-w-lg md:text-lg lg:mt-2 lg:max-w-md lg:text-left xl:max-w-md 2xl:max-w-[33.5rem] 2xl:text-xl'>
							Discover our best-selling books and mangas that have captured the
							hearts of readers worldwide. From timeless classics to the latest
							hits, our collection has something for everyone.
						</p>
						<Link
							to='/products'
							className='mt-3 w-full max-w-56 rounded-lg border bg-black p-2 text-center text-white hover:bg-black/85 sm:mt-3 sm:max-w-96 sm:p-3 md:mt-5 md:max-w-[25rem] md:text-lg lg:max-w-[25rem]'
							aria-label='Get Started'
						>
							Show More
						</Link>
					</ScrollFadeSection>

					<ScrollFadeSection className='mt-10 grid h-full max-h-[75rem] grid-cols-1 gap-5 sm:mt-10 sm:max-h-[95rem] md:grid-cols-3 lg:mt-2 lg:max-h-[100rem] lg:min-h-[25rem] lg:max-w-xl xl:mx-[-2.5rem] xl:min-h-[28rem] xl:max-w-2xl xl:gap-20 xl:pr-20 2xl:mr-20 2xl:min-h-[38rem] 2xl:max-w-3xl 2xl:gap-40'>
						<HoverContainer className='relative mx-auto h-full w-full max-w-72 overflow-hidden rounded-sm sm:max-w-90 lg:max-w-[15rem] lg:min-w-[10rem] xl:max-w-[18rem] xl:min-w-[13.5rem] 2xl:max-w-[20rem] 2xl:min-w-[16rem]'>
							<img
								src='/public/img/moby-dick.jpg'
								alt='Moby-Dick'
								className='object-fit h-full w-full'
							/>

							<div className='absolute inset-0 bg-gradient-to-b from-black/90 via-transparent to-black/90'></div>

							<div className='absolute right-0 bottom-0 left-0'>
								<div className='p-4 text-white'>
									<h2 className='text-lg font-bold lg:text-xl'>For Book</h2>
									<p className='font-ligh text-sm lg:text-sm'>
										Moby Dick by Herman Melville, with a total sales of 3000+
										copies sold!
									</p>
								</div>
							</div>
						</HoverContainer>

						<HoverContainer className='relative mx-auto h-full w-full max-w-72 overflow-hidden rounded-sm sm:max-w-90 lg:max-w-[15rem] lg:min-w-[10rem] xl:max-w-[18rem] xl:min-w-[13.5rem] 2xl:max-w-[20rem] 2xl:min-w-[16rem]'>
							<img
								src='/public/img/one-piece-img.jpg'
								alt='One Piece'
								className='object-fit h-full w-full'
							/>

							<div className='absolute inset-0 bg-gradient-to-b from-black/90 via-transparent to-black/90'></div>

							<div className='absolute right-0 bottom-0 left-0'>
								<div className='p-4 text-white'>
									<h2 className='text-lg font-bold lg:text-xl'>For Manga</h2>
									<p className='text-sm font-light lg:text-sm'>
										One Piece by Eiichiro Oda, with a total sales of 5000+
										copies sold!
									</p>
								</div>
							</div>
						</HoverContainer>

						<HoverContainer className='relative mx-auto h-full w-full max-w-72 overflow-hidden rounded-sm sm:max-w-90 lg:max-w-[15rem] lg:min-w-[10rem] xl:max-w-[18rem] xl:min-w-[13.5rem] 2xl:max-w-[20rem] 2xl:min-w-[16rem]'>
							<img
								src='/public/img/gatsby-img.jpg'
								alt='The Great Gastby'
								className='object-fit h-full w-full'
							/>

							<div className='absolute inset-0 bg-gradient-to-b from-black/90 via-transparent to-black/90'></div>

							<div className='absolute right-0 bottom-0 left-0'>
								<div className='p-4 text-white'>
									<h2 className='text-lg font-bold lg:text-xl'>For Novel</h2>
									<p className='text-sm font-light lg:text-sm'>
										The Great Gastby by F. Scott Fitzgerald, total sales of
										3000+ copies sold!
									</p>
								</div>
							</div>
						</HoverContainer>
					</ScrollFadeSection>
				</div>
			</section>

			{/* Why shop with us */}
			<section>
				<ScrollFadeSection className='flex h-full w-full flex-col items-center px-12 py-12 sm:py-20 md:min-h-screen md:py-25 lg:py-30 xl:py-35'>
					<div className='max-w-m flex w-full flex-col items-center md:max-w-5xl 2xl:max-w-7xl'>
						<h2 className='text-center text-4xl font-bold md:text-5xl lg:text-6xl 2xl:text-7xl'>
							Why Shop with Booksyde
						</h2>

						<p className='text-md mt-5 w-full max-w-md text-center font-light text-gray-500 md:max-w-xl lg:max-w-2xl 2xl:mt-10 2xl:max-w-5xl 2xl:text-xl'>
							Why shop with us? Booksyde is committed to providing the best
							shopping experience for our customers. With a user-friendly
							interface, secure payment options, and fast shipping, we make it
							easy for you to find and purchase your favorite books and manga.
						</p>
					</div>

					<div className='mt-15 flex flex-wrap justify-center gap-4 px-4 sm:max-w-lg md:max-w-2xl md:flex-row md:px-8 lg:max-w-3xl xl:max-w-7xl 2xl:mt-30 2xl:max-w-[100rem]'>
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
