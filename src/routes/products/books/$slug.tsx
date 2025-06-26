import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute, Link } from '@tanstack/react-router';
import { FaRegStar, FaStar } from 'react-icons/fa';
import { MdArrowBackIos, MdArrowRight } from 'react-icons/md';
import { RiCoupon3Line } from 'react-icons/ri';

import { bookslugQueryOptions } from '@/utils/servers/books';
import { useState } from 'react';

export const Route = createFileRoute('/products/books/$slug')({
	component: RouteComponent,
	loader: async ({ context, params }) => {
		const slug = params.slug;
		await context.queryClient.ensureQueryData(bookslugQueryOptions(slug));
	},
});

function RouteComponent() {
	const [descExpanded, setDescExpanded] = useState(false);
	const { slug } = Route.useParams();
	const booksQueryData = useSuspenseQuery(bookslugQueryOptions(slug));
	const book = booksQueryData.data;

	return (
		<div className='col-span-1 md:col-span-12'>
			<div className='px-6 pt-5 sm:mx-auto sm:max-w-2xl md:max-w-4xl lg:max-w-5xl xl:max-w-[78rem] 2xl:max-w-[90rem]'>
				<Link to='/products/books' className='mb-5 flex items-center'>
					<MdArrowBackIos />
					<h2 className='text-lg'>Go Back</h2>
				</Link>

				<div className='flex items-center text-[11px] sm:text-[15px]'>
					<Link to='/products' className='hover:underline'>
						Products
					</Link>
					<MdArrowRight />
					<Link to='/products/books' className='hover:underline'>
						Books
					</Link>
					<MdArrowRight />
					<p>{book.title}</p>
				</div>
			</div>

			<div className='grid grid-cols-1 px-6 py-3 sm:mx-auto sm:max-w-2xl md:max-w-4xl md:grid-cols-2 md:gap-10 lg:max-w-5xl lg:grid-cols-[380px_3fr] xl:max-w-[78rem] 2xl:max-w-[90rem]'>
				<div className='relative mb-3 flex h-auto w-auto overflow-hidden rounded-sm bg-gray-200/90 px-5 py-5 sm:px-8 sm:py-8 md:max-h-[35rem] md:min-h-[35rem]'>
					<img
						src={book.coverImg}
						alt={`${book.title} image`}
						className='object-fit mx-auto h-auto'
					/>
				</div>

				{/* Book Info */}
				<div className='px-2'>
					<h2 className='mb-1 text-2xl font-bold sm:mb-1.5 sm:text-3xl xl:text-4xl 2xl:text-5xl'>
						{book.title}
					</h2>
					<p className='mb-1 text-sm text-gray-500 sm:mb-1.5 xl:text-lg 2xl:text-xl'>
						{book.author}
					</p>

					<div className='mb-2 flex items-center gap-1 sm:mb-3'>
						<FaStar className='h-4 w-4 text-yellow-400 sm:h-5 sm:w-5 md:h-4 md:w-4 xl:h-5 xl:w-5' />
						<FaStar className='h-4 w-4 text-yellow-400 sm:h-5 sm:w-5 md:h-4 md:w-4 xl:w-5' />
						<FaStar className='h-4 w-4 text-yellow-400 sm:h-5 sm:w-5 md:h-4 md:w-4 xl:w-5' />
						<FaStar className='h-4 w-4 text-yellow-400 sm:h-5 sm:w-5 md:h-4 md:w-4 xl:w-5' />
						<FaRegStar className='h-4 w-4 text-yellow-400 sm:h-5 sm:w-5 md:h-4 md:w-4 xl:w-5' />
						<p className='text-sm sm:text-lg md:text-sm xl:text-lg'>
							({book.rating})
						</p>
					</div>

					<div className='mb-5 flex items-center gap-2 xl:mb-8'>
						<p className='text-2xl font-bold sm:text-3xl xl:text-4xl 2xl:text-5xl'>
							${book.price}
						</p>
						<p className='text-2xl font-light text-gray-300 line-through sm:text-3xl xl:text-4xl 2xl:text-5xl'>
							$10.38
						</p>
						<RiCoupon3Line className='mt-1 h-6 w-6 xl:h-7 xl:w-7' />
					</div>

					{/* Description */}
					<div className='mb-8 md:mb-10'>
						<p className='mb-0.5 font-light text-gray-500 sm:text-lg xl:mb-1 xl:text-xl'>
							Description
						</p>
						<div className='mb-1 border-b border-b-gray-300'></div>
						<div>
							<p
								className={`text-sm font-light text-gray-500 sm:text-[16px] md:text-[15px] ${!descExpanded ? 'line-clamp-4 md:line-clamp-7 xl:line-clamp-0' : ''}`}
							>
								{book.description}
							</p>
							{book.description && book.description.length > 350 && (
								<button
									onClick={() => setDescExpanded(!descExpanded)}
									className='mt-1 cursor-pointer text-xs font-medium text-black hover:text-black/70 focus:outline-none sm:text-sm xl:hidden'
								>
									{descExpanded ? 'See Less' : 'See More'}
								</button>
							)}
						</div>
					</div>

					{/* Add to Cart/Wishlist Buttons */}
					<div className='flex flex-col gap-3'>
						<button className='w-full cursor-pointer rounded-lg bg-black py-3 font-bold text-white transition-colors duration-300 hover:bg-black/80'>
							Add to Cart
						</button>

						<button className='w-full cursor-pointer rounded-lg border border-black bg-white py-3 font-bold text-black transition-colors duration-300 hover:bg-gray-400/20'>
							Add to Wishlist
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
