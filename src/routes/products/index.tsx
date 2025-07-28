import {
	Link,
	createFileRoute,
	useNavigate,
	useRouter,
} from '@tanstack/react-router';
import { FaHeart, FaRegHeart, FaRegStar, FaStar } from 'react-icons/fa';
import { useSuspenseQuery } from '@tanstack/react-query';
import { useState } from 'react';

import type { BookType, WishlistItemObjectType } from '@/types';
import type { ItemType } from '@/generated/prisma';
import Carousel from '@/components/Carousel';
import { ScrollFadeSection } from '@/components/ScrollFadeSection';
import HoverContainer from '@/components/HoverContainer';
import { bookQueryOptions } from '@/utils/servers/books';
import {
	useAddToWishlist,
	useRemoveFromWishlist,
} from '@/utils/servers/wishlist';
import { errorMsg, isAuthError } from '@/utils/utilities';
import ConfirmationModal from '@/components/ConfirmationModal';

export const Route = createFileRoute('/products/')({
	component: ProductsIndex,
	beforeLoad: async ({ context }) => {
		const userId = context.userID;
		const userWishlist = context.userWishlist ?? null;
		await context.queryClient.ensureQueryData(bookQueryOptions());

		return {
			userId,
			userWishlist,
		};
	},
});

function ProductsIndex() {
	// Hooks
	const router = useRouter();
	const navigate = useNavigate();
	const { userId, userWishlist } = Route.useRouteContext();
	const images = [
		'https://res.cloudinary.com/dcurf3qko/image/upload/w_1800,h_500,c_fill,q_auto,f_auto/product-banner-2_cy7xoq.jpg',
		'https://res.cloudinary.com/dcurf3qko/image/upload/w_1800,h_500,c_fill,q_auto,f_auto/product-banner-4_vpmzid.jpg',
		'https://res.cloudinary.com/dcurf3qko/image/upload/w_1800,h_500,c_fill,q_auto,f_auto/product-banner-3_bgxjvn.jpg',
		'https://res.cloudinary.com/dcurf3qko/image/upload/w_1800,h_500,c_fill,q_auto,f_auto/product-banner-1_y7wl8e.jpg',
	];
	const { data: booksData } = useSuspenseQuery(bookQueryOptions());
	const { mutateAsync: addToWishlist } = useAddToWishlist();
	const { mutateAsync: removeFromWishlist } = useRemoveFromWishlist();
	const [showModal, setShowModal] = useState(false);
	const [selectedBookId, setSelectedBookId] = useState<string>('');

	// Variables
	const itemType: ItemType = 'BOOK';
	const wishlistItemIds =
		userWishlist?.wishlists.flatMap((wishlist) => wishlist.itemId) ?? [];

	// Functions
	const handleAddToWishlist = async (itemId: string) => {
		const wishlistItemObj = {
			wishlistId: userWishlist?.id,
			userId,
			itemId,
			itemType,
		} satisfies WishlistItemObjectType;

		try {
			await addToWishlist({ data: wishlistItemObj });

			router.invalidate();
		} catch (error) {
			if (error instanceof Error) {
				console.error('Error: ', error.message);
			} else if (isAuthError(error)) {
				errorMsg('You must login first.');
				navigate({ to: '/signin' });
			}
		}
	};

	const handleRemoveToWishlist = async () => {
		const wishlistItemObj = {
			wishlistId: userWishlist?.id,
			itemId: selectedBookId,
			userId,
			itemType,
		} satisfies WishlistItemObjectType;

		try {
			await removeFromWishlist({ data: wishlistItemObj });

			router.invalidate();
			setShowModal(false);
			setSelectedBookId('');
		} catch (error: unknown) {
			if (error instanceof Error) {
				console.error('Error: ', error.message);
			}
		}
	};

	const handleShowModal = (bookId: string) => {
		setShowModal(true);
		setSelectedBookId(bookId);
	};

	const handleCancelFn = () => {
		setShowModal(false);
		setSelectedBookId('');
	};

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
						<Link to='/products/books'>
							<HoverContainer className='relative flex w-full flex-1 overflow-hidden rounded-lg shadow-lg shadow-gray-500'>
								<div className='absolute inset-0 bg-gradient-to-b from-black/90 via-transparent to-black/90'></div>

								<img
									src='https://res.cloudinary.com/dcurf3qko/image/upload/w_1200,h_700,c_fill,q_auto,f_auto/books-banner_sztqxg.jpg'
									alt='Books'
									className='object-fit h-full w-full'
									crossOrigin='anonymous'
									loading='lazy'
								/>

								<div className='absolute right-0 bottom-0 left-0'>
									<div className='bg-gradient-to-t from-black/80 to-transparent p-4 pt-8 text-white'>
										<h2 className='text-xl font-bold 2xl:text-3xl'>Books</h2>
										<p className='text-sm font-light 2xl:text-lg'>
											Start at $10
										</p>
									</div>
								</div>
							</HoverContainer>
						</Link>

						<Link to='/products/manga'>
							<HoverContainer className='relative flex w-full flex-1 overflow-hidden rounded-lg shadow-lg shadow-gray-500'>
								<div className='absolute inset-0 bg-gradient-to-b from-black/90 via-transparent to-black/90'></div>

								<img
									src='https://res.cloudinary.com/dcurf3qko/image/upload/w_1200,h_700,c_fill,q_auto,f_auto/manga-banner_je4xtd.jpg'
									alt='Manga'
									className='object-fit h-full w-full'
									crossOrigin='anonymous'
									loading='lazy'
								/>

								<div className='absolute right-0 bottom-0 left-0'>
									<div className='bg-gradient-to-t from-black/80 to-transparent p-4 pt-8 text-white'>
										<h2 className='text-xl font-bold 2xl:text-3xl'>Manga</h2>
										<p className='text-sm font-light 2xl:text-lg'>
											Start at $30
										</p>
									</div>
								</div>
							</HoverContainer>
						</Link>

						<Link to='/'>
							<HoverContainer className='relative flex w-full flex-1 overflow-hidden rounded-lg shadow-lg shadow-gray-500'>
								<div className='absolute inset-0 bg-gradient-to-b from-black/90 via-transparent to-black/90'></div>
								<img
									src='https://res.cloudinary.com/dcurf3qko/image/upload/w_1200,h_700,c_fill,q_auto,f_auto/novel-banner_qahvbj.jpg'
									alt='Novel'
									className='object-fit h-full w-full'
									crossOrigin='anonymous'
									loading='lazy'
								/>

								<div className='absolute right-0 bottom-0 left-0'>
									<div className='bg-gradient-to-t from-black/80 to-transparent p-4 pt-8 text-white'>
										<h2 className='text-xl font-bold 2xl:text-3xl'>Novels</h2>
										<p className='text-sm font-light 2xl:text-lg'>
											Start at $50
										</p>
									</div>
								</div>
							</HoverContainer>
						</Link>
					</div>
				</ScrollFadeSection>

				{/* Best Deal */}
				<ScrollFadeSection className='px-7 md:px-0'>
					<div className='flex flex-col gap-3'>
						<h2 className='mt-3 text-center text-4xl font-bold md:text-left md:text-3xl 2xl:text-5xl'>
							Today's Best Deals
						</h2>

						<div className='mt-5 grid grid-cols-2 gap-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4 xl:gap-8 2xl:grid-cols-5'>
							{booksData.map((book: BookType, idx) => {
								return (
									<div
										key={book.id}
										className={`${idx === 4 && 'hidden 2xl:block'} h-full w-auto rounded-lg bg-white shadow-md md:w-auto md:max-w-68 xl:w-auto xl:max-w-74 2xl:max-w-90`}
									>
										<div className='relative overflow-hidden'>
											<img
												src={book.coverImg}
												alt='book cover'
												className='object-fit h-auto max-h-85 min-h-84 w-full md:h-auto md:max-h-94 md:min-h-94 lg:h-auto lg:max-h-96 lg:min-h-96 2xl:h-auto 2xl:max-h-[30rem] 2xl:min-h-[30rem]'
											/>
											<div className='absolute top-2 right-2 rounded-full bg-white/80 p-1 shadow-md transition-colors duration-300 hover:bg-white/60 md:hidden'>
												<FaRegHeart size={14} />
											</div>
										</div>

										<div className='p-3'>
											<h3 className='truncate text-lg font-bold lg:text-xl 2xl:text-2xl'>
												{book.title}
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
												<p className='text-sm text-gray-500 2xl:text-lg'>
													Price
												</p>
												<p className='text-sm font-normal 2xl:text-lg'>
													${book.price}
												</p>
											</div>

											<div className='flex flex-row items-center justify-between py-1'>
												<p className='text-sm text-gray-500 2xl:text-lg'>
													Stocks
												</p>
												<p className='text-sm font-normal 2xl:text-lg'>35+</p>
											</div>

											<div className='flex flex-row items-center justify-between gap-20 py-1'>
												<p className='text-sm text-gray-500 2xl:text-lg'>
													Author
												</p>
												<p className='truncate text-sm font-normal 2xl:text-lg'>
													{book.author}
												</p>
											</div>

											<div className='mt-3 flex flex-row items-center gap-2'>
												<Link
													to='/products/books/$slug'
													params={{ slug: book.slug }}
													className='h-11 w-full flex-1 cursor-pointer rounded-md border bg-black px-4 py-2 text-center text-sm text-white transition-colors duration-300 hover:bg-black/80 md:w-52 md:py-3 md:text-[11px] lg:w-55 lg:py-3 lg:text-[11.5px] xl:w-68 xl:py-2.5 xl:text-[15px] 2xl:h-12 2xl:w-80 2xl:py-3 2xl:text-[1rem]'
												>
													View Product
												</Link>

												{wishlistItemIds.includes(book.id) ? (
													<div
														onClick={() => handleShowModal(book.id)}
														className='hidden h-10 w-11 cursor-pointer items-center justify-center rounded-md border text-center transition-colors duration-300 hover:bg-gray-400/10 md:flex 2xl:h-12 2xl:w-12'
													>
														<FaHeart size={24} className='text-red-500' />
													</div>
												) : (
													<div
														onClick={() => handleAddToWishlist(book.id)}
														className='hidden h-10 w-11 cursor-pointer items-center justify-center rounded-md border text-center transition-colors duration-300 hover:bg-gray-400/10 md:flex 2xl:h-12 2xl:w-12'
													>
														<FaRegHeart size={24} />
													</div>
												)}
											</div>
										</div>
									</div>
								);
							})}
						</div>
					</div>
				</ScrollFadeSection>

				{/* Choose by Genres */}
				<ScrollFadeSection className='px-5 py-10 md:px-0'>
					<div className='relative h-[56rem] w-full overflow-hidden rounded-lg shadow-lg shadow-gray-500 md:h-96 md:w-full lg:h-[24rem] xl:h-[25rem] 2xl:h-[30rem]'>
						<img
							src='https://res.cloudinary.com/dcurf3qko/image/upload/w_1200,h_800,c_fill,q_auto,f_auto/geometry-bg_t4yejh.png'
							alt='dog'
							className='object-fit h-full w-full bg-gray-300/80'
							crossOrigin='anonymous'
							loading='lazy'
						/>

						<div className='absolute inset-0 bg-gradient-to-b from-black/90 via-black to-black/90'></div>

						<div className='absolute top-10 right-0 left-0 md:left-10'>
							<div className='p-4 pt-8 font-bold text-white md:pt-1'>
								<h2 className='text-center text-4xl md:text-left md:text-4xl 2xl:text-5xl'>
									Choose by Genres
								</h2>

								<div className='mt-10 grid grid-cols-2 gap-5 px-3 md:mt-7 md:grid-cols-5 md:pr-12 lg:grid-cols-6 xl:grid-cols-7 2xl:grid-cols-7'>
									<HoverContainer className='relative h-full max-h-54 w-auto overflow-hidden rounded-xl md:max-h-60 md:min-h-54 md:max-w-42 md:min-w-28 lg:max-h-54 lg:min-h-54 lg:max-w-42 lg:min-w-28 xl:max-h-60 xl:min-h-58 xl:max-w-42 xl:min-w-28 2xl:max-h-72 2xl:min-h-60 2xl:max-w-52 2xl:min-w-42'>
										<img
											src='https://res.cloudinary.com/dcurf3qko/image/upload/w_800,h_1200,c_fill,q_auto,f_auto/Genres-Banner_p8zjlz.png'
											alt='Action Genre'
											className='object-fit h-full w-full'
											crossOrigin='anonymous'
											loading='lazy'
										/>

										<div className='absolute inset-0 bg-gradient-to-b from-black/70 via-transparent to-black/70'></div>

										<div className='absolute top-0 right-0 left-0'>
											<div className='p-4 pt-8 text-white'>
												<h2 className='text-center text-xl font-bold 2xl:text-3xl'>
													Action
												</h2>
											</div>
										</div>
									</HoverContainer>

									<HoverContainer className='relative h-full max-h-54 w-auto overflow-hidden rounded-xl md:max-h-60 md:min-h-54 md:max-w-42 md:min-w-28 lg:max-h-54 lg:min-h-54 lg:max-w-42 lg:min-w-28 xl:max-h-60 xl:min-h-58 xl:max-w-42 xl:min-w-28 2xl:max-h-72 2xl:min-h-60 2xl:max-w-52 2xl:min-w-42'>
										<img
											src='https://res.cloudinary.com/dcurf3qko/image/upload/w_800,h_1200,c_fill,q_auto,f_auto/Genres-Banner-2_rrsbff.png'
											alt='dog'
											className='object-fit h-full w-full'
											crossOrigin='anonymous'
											loading='lazy'
										/>

										<div className='absolute inset-0 bg-gradient-to-b from-black/70 via-transparent to-black/70'></div>

										<div className='absolute top-0 right-0 left-0'>
											<div className='p-4 pt-8 text-white'>
												<h2 className='text-center text-xl font-bold 2xl:text-3xl'>
													Fantasy
												</h2>
											</div>
										</div>
									</HoverContainer>

									<HoverContainer className='relative h-full max-h-54 w-auto overflow-hidden rounded-xl md:max-h-60 md:min-h-54 md:max-w-42 md:min-w-28 lg:max-h-54 lg:min-h-54 lg:max-w-42 lg:min-w-28 xl:max-h-60 xl:min-h-58 xl:max-w-42 xl:min-w-28 2xl:max-h-72 2xl:min-h-60 2xl:max-w-52 2xl:min-w-42'>
										<img
											src='https://res.cloudinary.com/dcurf3qko/image/upload/w_800,h_1200,c_fill,q_auto,f_auto/Genres-Banner_p8zjlz.png'
											alt='Romance Genre'
											className='object-fit h-full w-full'
											crossOrigin='anonymous'
											loading='lazy'
										/>

										<div className='absolute inset-0 bg-gradient-to-b from-black/70 via-transparent to-black/70'></div>

										<div className='absolute top-0 right-0 left-0'>
											<div className='p-4 pt-8 text-white'>
												<h2 className='text-center text-xl font-bold 2xl:text-3xl'>
													Romance
												</h2>
											</div>
										</div>
									</HoverContainer>

									<HoverContainer className='relative h-full max-h-54 w-auto overflow-hidden rounded-xl md:max-h-60 md:min-h-54 md:max-w-42 md:min-w-28 lg:max-h-54 lg:min-h-54 lg:max-w-42 lg:min-w-28 xl:max-h-60 xl:min-h-58 xl:max-w-42 xl:min-w-28 2xl:max-h-72 2xl:min-h-60 2xl:max-w-52 2xl:min-w-42'>
										<img
											src='https://res.cloudinary.com/dcurf3qko/image/upload/w_800,h_1200,c_fill,q_auto,f_auto/Genres-Banner-2_rrsbff.png'
											alt='Drama Genre'
											className='object-fit h-full w-full'
											crossOrigin='anonymous'
											loading='lazy'
										/>

										<div className='absolute inset-0 bg-gradient-to-b from-black/70 via-transparent to-black/70'></div>

										<div className='absolute top-0 right-0 left-0'>
											<div className='p-4 pt-8 text-white'>
												<h2 className='text-center text-xl font-bold 2xl:text-3xl'>
													Drama
												</h2>
											</div>
										</div>
									</HoverContainer>

									<HoverContainer className='relative hidden h-full max-h-54 w-auto overflow-hidden rounded-xl md:flex md:max-h-60 md:min-h-54 md:max-w-42 md:min-w-28 lg:max-h-54 lg:min-h-54 lg:max-w-42 lg:min-w-28 xl:max-h-60 xl:min-h-58 xl:max-w-42 xl:min-w-28 2xl:max-h-72 2xl:min-h-60 2xl:max-w-52 2xl:min-w-42'>
										<img
											src='https://res.cloudinary.com/dcurf3qko/image/upload/w_800,h_1200,c_fill,q_auto,f_auto/Genres-Banner_p8zjlz.png'
											alt='Action Genre'
											className='object-fit h-full w-full'
											crossOrigin='anonymous'
											loading='lazy'
										/>

										<div className='absolute inset-0 bg-gradient-to-b from-black/70 via-transparent to-black/70'></div>

										<div className='absolute top-0 right-0 left-0'>
											<div className='p-4 pt-8 text-white'>
												<h2 className='text-center text-xl font-bold 2xl:text-3xl'>
													Action
												</h2>
											</div>
										</div>
									</HoverContainer>

									<HoverContainer className='relative h-full max-h-54 w-auto overflow-hidden rounded-xl md:hidden md:max-h-60 md:min-h-54 md:max-w-42 md:min-w-28 lg:flex lg:max-h-54 lg:min-h-54 lg:max-w-42 lg:min-w-28 xl:max-h-60 xl:min-h-58 xl:max-w-42 xl:min-w-28 2xl:max-h-72 2xl:min-h-60 2xl:max-w-52 2xl:min-w-42'>
										<img
											src='https://res.cloudinary.com/dcurf3qko/image/upload/w_800,h_1200,c_fill,q_auto,f_auto/Genres-Banner-2_rrsbff.png'
											alt='Historical Genre'
											className='object-fit h-full w-full'
											crossOrigin='anonymous'
											loading='lazy'
										/>

										<div className='absolute inset-0 bg-gradient-to-b from-black/70 via-transparent to-black/70'></div>

										<div className='absolute top-0 right-0 left-0'>
											<div className='p-4 pt-8 text-white'>
												<h2 className='text-center text-xl font-bold 2xl:text-3xl'>
													Historical
												</h2>
											</div>
										</div>
									</HoverContainer>

									<HoverContainer className='relative h-full max-h-54 w-auto overflow-hidden rounded-xl md:hidden md:max-h-60 md:min-h-54 md:max-w-42 md:min-w-28 lg:hidden lg:max-h-54 lg:min-h-54 lg:max-w-42 lg:min-w-28 xl:flex xl:max-h-60 xl:min-h-58 xl:max-w-42 xl:min-w-28 2xl:flex 2xl:max-h-72 2xl:min-h-60 2xl:max-w-52 2xl:min-w-42'>
										<img
											src='https://res.cloudinary.com/dcurf3qko/image/upload/w_800,h_1200,c_fill,q_auto,f_auto/Genres-Banner_p8zjlz.png'
											alt='Sci-fi genre'
											className='object-fit h-full w-full'
											crossOrigin='anonymous'
											loading='lazy'
										/>

										<div className='absolute inset-0 bg-gradient-to-b from-black/70 via-transparent to-black/70'></div>

										<div className='absolute top-0 right-0 left-0'>
											<div className='p-4 pt-8 text-white'>
												<h2 className='text-center text-xl font-bold 2xl:text-3xl'>
													Sci-fi
												</h2>
											</div>
										</div>
									</HoverContainer>
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
								View More Product
							</Link>
						</div>

						<div className='mt-5 grid grid-cols-2 gap-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4 xl:gap-8 2xl:grid-cols-5'>
							{booksData.map((book: BookType, idx) => {
								return (
									<div
										key={book.id}
										className={`${idx === 4 && 'hidden 2xl:block'} h-full w-auto rounded-lg bg-white shadow-md md:w-auto md:max-w-68 xl:w-auto xl:max-w-74 2xl:max-w-90`}
									>
										<div className='relative overflow-hidden'>
											<img
												src={book.coverImg}
												alt='book cover'
												className='object-fit h-auto max-h-85 min-h-84 w-full md:h-auto md:max-h-94 md:min-h-94 lg:h-auto lg:max-h-96 lg:min-h-96 2xl:h-auto 2xl:max-h-[30rem] 2xl:min-h-[30rem]'
											/>
											<div className='absolute top-2 right-2 rounded-full bg-white/80 p-1 shadow-md transition-colors duration-300 hover:bg-white/60 md:hidden'>
												<FaRegHeart size={14} />
											</div>
										</div>

										<div className='p-3'>
											<h3 className='truncate text-lg font-bold lg:text-xl 2xl:text-2xl'>
												{book.title}
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
												<p className='text-sm text-gray-500 2xl:text-lg'>
													Price
												</p>
												<p className='text-sm font-normal 2xl:text-lg'>
													${book.price}
												</p>
											</div>

											<div className='flex flex-row items-center justify-between py-1'>
												<p className='text-sm text-gray-500 2xl:text-lg'>
													Stocks
												</p>
												<p className='text-sm font-normal 2xl:text-lg'>35+</p>
											</div>

											<div className='flex flex-row items-center justify-between gap-20 py-1'>
												<p className='text-sm text-gray-500 2xl:text-lg'>
													Author
												</p>
												<p className='truncate text-sm font-normal 2xl:text-lg'>
													{book.author}
												</p>
											</div>

											<div className='mt-3 flex flex-row items-center gap-2'>
												<button className='lg:text-md h-11 w-full flex-1 cursor-pointer rounded-md border bg-black px-4 py-2 text-sm text-white transition-colors duration-300 hover:bg-black/80 md:w-52 md:text-xs lg:w-55 xl:w-68 2xl:h-12 2xl:w-80 2xl:text-[1rem]'>
													View Product
												</button>

												<div className='hidden h-10 w-11 cursor-pointer items-center justify-center rounded-md border text-center transition-colors duration-300 hover:bg-gray-400/10 md:flex 2xl:h-12 2xl:w-12'>
													<FaRegHeart size={24} />
												</div>
											</div>
										</div>
									</div>
								);
							})}
						</div>

						<div className='mt-5 items-center justify-center text-center'>
							<Link
								to='/products'
								className='w-54 rounded-xl border border-gray-400 px-10 py-1 font-normal md:hidden'
							>
								View More Product
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
								View More Product
							</Link>
						</div>

						<div className='mt-5 grid grid-cols-2 gap-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4 xl:gap-8 2xl:grid-cols-5'>
							{booksData.map((book: BookType) => {
								return (
									<div
										key={book.id}
										className='h-full w-auto rounded-lg bg-white shadow-md md:w-auto md:max-w-68 xl:w-auto xl:max-w-74 2xl:max-w-90'
									>
										<div className='relative overflow-hidden'>
											<img
												src={book.coverImg}
												alt='book cover'
												className='object-fit h-auto max-h-85 min-h-84 w-full md:h-auto md:max-h-94 md:min-h-94 lg:h-auto lg:max-h-96 lg:min-h-96 2xl:h-auto 2xl:max-h-[30rem] 2xl:min-h-[30rem]'
											/>
											<div className='absolute top-2 right-2 rounded-full bg-white/80 p-1 shadow-md transition-colors duration-300 hover:bg-white/60 md:hidden'>
												<FaRegHeart size={14} />
											</div>
										</div>

										<div className='p-3'>
											<h3 className='truncate text-lg font-bold lg:text-xl 2xl:text-2xl'>
												{book.title}
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
												<p className='text-sm text-gray-500 2xl:text-lg'>
													Price
												</p>
												<p className='text-sm font-normal 2xl:text-lg'>
													${book.price}
												</p>
											</div>

											<div className='flex flex-row items-center justify-between py-1'>
												<p className='text-sm text-gray-500 2xl:text-lg'>
													Stocks
												</p>
												<p className='text-sm font-normal 2xl:text-lg'>35+</p>
											</div>

											<div className='flex flex-row items-center justify-between gap-20 py-1'>
												<p className='text-sm text-gray-500 2xl:text-lg'>
													Author
												</p>
												<p className='truncate text-sm font-normal 2xl:text-lg'>
													{book.author}
												</p>
											</div>

											<div className='mt-3 flex flex-row items-center gap-2'>
												<button className='lg:text-md h-11 w-full flex-1 cursor-pointer rounded-md border bg-black px-4 py-2 text-sm text-white transition-colors duration-300 hover:bg-black/80 md:w-52 md:text-xs lg:w-55 xl:w-68 2xl:h-12 2xl:w-80 2xl:text-[1rem]'>
													View Product
												</button>

												<div className='hidden h-10 w-11 cursor-pointer items-center justify-center rounded-md border text-center transition-colors duration-300 hover:bg-gray-400/10 md:flex 2xl:h-12 2xl:w-12'>
													<FaRegHeart size={24} />
												</div>
											</div>
										</div>
									</div>
								);
							})}
						</div>

						<div className='mt-5 items-center justify-center text-center'>
							<Link
								to='/products'
								className='w-54 rounded-xl border border-gray-400 px-10 py-1 font-normal md:hidden'
							>
								View More Product
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

						<div className='mt-5 grid w-full grid-cols-1 gap-3 md:grid-cols-3'>
							<HoverContainer className='w-full overflow-hidden rounded-b-lg shadow-md'>
								<div className='relative'>
									<img
										src='https://res.cloudinary.com/dcurf3qko/image/upload/w_1200,h_600,c_fill,q_auto,f_auto/faqs-banner_hgds6w.png'
										alt='FaQs'
										className='object-fit h-full w-full'
										crossOrigin='anonymous'
										loading='lazy'
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
							</HoverContainer>

							<HoverContainer className='w-full overflow-hidden rounded-b-lg shadow-md'>
								<div className='relative'>
									<img
										src='https://res.cloudinary.com/dcurf3qko/image/upload/w_1200,h_600,c_fill,q_auto,f_auto/customer-supp-banner_fxj52a.jpg'
										alt='Customer Support'
										className='object-fit h-full w-full'
										crossOrigin='anonymous'
										loading='lazy'
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
							</HoverContainer>

							<HoverContainer className='w-full overflow-hidden rounded-b-lg shadow-md'>
								<div className='relative'>
									<img
										src='https://res.cloudinary.com/dcurf3qko/image/upload/w_1200,h_600,c_fill,q_auto,f_auto/report-banner_tdtdjg.jpg'
										alt='Payment and Shipping Report'
										className='object-fit h-full w-full'
										crossOrigin='anonymous'
										loading='lazy'
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
							</HoverContainer>
						</div>
					</div>
				</ScrollFadeSection>

				{showModal && (
					<ConfirmationModal
						message='Do you want to remove this from your wishlist?'
						confirmFn={handleRemoveToWishlist}
						cancelFn={handleCancelFn}
					/>
				)}
			</section>
		</div>
	);
}
