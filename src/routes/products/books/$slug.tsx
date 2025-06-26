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
		<div className='grid grid-cols-1'>
			<div className='grid grid-cols-1 px-6 py-5 sm:mx-auto sm:max-w-2xl'>
				<Link to='/products/books' className='mb-5 flex items-center'>
					<MdArrowBackIos />
					<h2 className='text-lg'>Go Back</h2>
				</Link>

				<div className='mb-3 flex items-center text-[11px] sm:text-[15px]'>
					<p>Products</p>
					<MdArrowRight />
					<p>Books</p>
					<MdArrowRight />
					<p>{book.title}</p>
				</div>

				<div className='relative mb-3 flex h-auto w-auto overflow-hidden rounded-sm bg-gray-200/90 px-5 py-5 sm:px-8 sm:py-8'>
					<img
						src={book.coverImg}
						alt={`${book.title} image`}
						className='object-fit mx-auto h-auto'
					/>
				</div>

				{/* Book Info */}
				<div className='px-2'>
					<h2 className='mb-1 text-2xl font-bold sm:mb-1.5 sm:text-3xl'>
						{book.title}
					</h2>
					<p className='mb-1 text-sm text-gray-500 sm:mb-1.5'>{book.author}</p>

					<div className='mb-2 flex items-center gap-1 sm:mb-3'>
						<FaStar className='h-4 w-4 text-yellow-400 sm:h-5 sm:w-5' />
						<FaStar className='h-4 w-4 text-yellow-400 sm:h-5 sm:w-5' />
						<FaStar className='h-4 w-4 text-yellow-400 sm:h-5 sm:w-5' />
						<FaStar className='h-4 w-4 text-yellow-400 sm:h-5 sm:w-5' />
						<FaRegStar className='h-4 w-4 text-yellow-400 sm:h-5 sm:w-5' />
						<p className='text-sm sm:text-lg'>({book.rating})</p>
					</div>

					<div className='mb-5 flex items-center gap-2'>
						<p className='text-2xl font-bold sm:text-3xl'>${book.price}</p>
						<p className='text-2xl font-light text-gray-400 line-through sm:text-3xl'>
							$10.38
						</p>
						<RiCoupon3Line className='mt-1 h-6 w-6' />
					</div>

					{/* Description */}
					<p className='mb-0.5 font-light text-gray-500 sm:text-lg'>
						Description
					</p>
					<div className='mb-1 border-b border-b-gray-300'></div>
					<div className='mb-8'>
						<p
							className={`text-sm font-light text-gray-500 sm:text-[17px] ${!descExpanded ? 'line-clamp-4' : ''}`}
						>
							{book.description}
						</p>
						{book.description && book.description.length > 150 && (
							<button
								onClick={() => setDescExpanded(!descExpanded)}
								className='mt-1 cursor-pointer text-xs font-medium text-black hover:text-black/70 focus:outline-none sm:text-sm'
							>
								{descExpanded ? 'See Less' : 'See More'}
							</button>
						)}
					</div>

					{/* Add to Cart/Wishlist Buttons */}
					<div className='flex flex-col gap-3'>
						<button className='w-full rounded-lg bg-black py-3 font-bold text-white'>
							Add to Cart
						</button>

						<button className='w-full rounded-lg border border-black bg-white py-3 font-bold text-black'>
							Add to Wishlist
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
