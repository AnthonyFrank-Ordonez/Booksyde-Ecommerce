import { useSuspenseQuery } from '@tanstack/react-query';
import {
	Link,
	createFileRoute,
	redirect,
	useNavigate,
} from '@tanstack/react-router';
import { FaRegStar, FaStar, FaUserCircle } from 'react-icons/fa';
import { MdArrowBackIos, MdArrowRight } from 'react-icons/md';
import { RiCoupon3Line } from 'react-icons/ri';

import { useState } from 'react';
import type { ItemType } from '@/generated/prisma';
import type { WishlistItemObjectType } from '@/types';
import { bookslugQueryOptions } from '@/utils/servers/books';
import {
	getOrCreateCartQueryOptions,
	useAddToCart,
} from '@/utils/servers/cart';
import ConfirmationModal from '@/components/ConfirmationModal';
import {
	useAddToWishlist,
	useGetOrCreateWishlist,
} from '@/utils/servers/wishlist';

// import { useForm } from '@tanstack/react-form';
// import { ReviewSchema } from '@/utils/zod';
// import type { UserReviewType } from '@/types';
// import { useAddReview } from '@/utils/servers/review';
// import { successMsg } from '@/utils/utilities';

export const Route = createFileRoute('/products/books/$slug')({
	component: BookSlugComponent,
	beforeLoad: ({ context }) => {
		if (!context.userID) {
			throw redirect({ to: '/signin' });
		}
	},
	loader: async ({ context, params }) => {
		const slug = params.slug;
		const userId = context.userID!;
		await context.queryClient.ensureQueryData(bookslugQueryOptions(slug));

		await Promise.all([
			await context.queryClient.ensureQueryData(
				getOrCreateCartQueryOptions(userId)
			),
			await context.queryClient.ensureQueryData(useGetOrCreateWishlist(userId)),
		]);

		return { userId };
	},
});

function BookSlugComponent() {
	// Hooks
	const { userId } = Route.useLoaderData();
	const { slug } = Route.useParams();
	const navigate = useNavigate();
	// const { mutateAsync: addReview } = useAddReview();
	const { mutateAsync: addToWishlist } = useAddToWishlist();
	const [descExpanded, setDescExpanded] = useState(false);
	const [showModal, setShowModal] = useState(false);
	const book = useSuspenseQuery(bookslugQueryOptions(slug)).data;
	const { data: userCart } = useSuspenseQuery(
		getOrCreateCartQueryOptions(userId)
	);
	const { data: userWishlist } = useSuspenseQuery(
		useGetOrCreateWishlist(userId)
	);
	const { mutateAsync: addToCart } = useAddToCart();

	const handleAddToCart = async (
		itemId: string,
		itemType: ItemType,
		quantity: number = 1
	) => {
		const cartItemObj = {
			cartId: userCart.id,
			userId,
			itemId,
			itemType,
			quantity,
		};

		await addToCart({ data: cartItemObj });
		setShowModal(true);
	};

	const handleAddToWishlist = async (itemId: string, itemType: ItemType) => {
		const wishlistItemObj = {
			wishlistId: userWishlist.id,
			userId,
			itemId,
			itemType,
		} satisfies WishlistItemObjectType;

		try {
			await addToWishlist({ data: wishlistItemObj });
		} catch (error) {
			console.log(error);
		}
	};

	const handleConfirm = () => {
		navigate({ to: '/cart' });
	};

	const handleCancel = () => {
		setShowModal(false);
		navigate({ to: '/products/books' });
	};

	// const form = useForm({
	// 	defaultValues: {
	// 		reviewContent: '',
	// 	},
	// 	validators: {
	// 		onChange: ReviewSchema,
	// 	},
	// 	onSubmit: async ({ value }) => {
	// 		const userReviewObj: UserReviewType = {
	// 			userId: userId,
	// 			bookId: book.id,
	// 			reviewContent: value.reviewContent,
	// 			rating: 5,
	// 		};

	// 		await addReview({ data: userReviewObj });

	// 		form.reset();
	// 	},
	// });

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
						<button
							onClick={() => handleAddToCart(book.id, 'BOOK')}
							className='w-full cursor-pointer rounded-lg bg-black py-3 font-bold text-white transition-colors duration-300 hover:bg-black/80'
						>
							Add to Cart
						</button>

						<button
							onClick={() => handleAddToWishlist(book.id, 'BOOK')}
							className='w-full cursor-pointer rounded-lg border border-black bg-white py-3 font-bold text-black transition-colors duration-300 hover:bg-gray-400/20'
						>
							Add to Wishlist
						</button>
					</div>
				</div>
			</div>

			{/* Comments */}
			<div className='px-8 py-5 sm:mx-auto sm:max-w-2xl md:max-w-4xl lg:max-w-5xl xl:max-w-[78rem] 2xl:max-w-[90rem]'>
				<h2 className='mb-2 text-xl font-bold'>Comments and Reviews</h2>
				<div className='mb-7 border border-gray-500/20'></div>

				<div className='grid grid-cols-1'>
					{/* User and Rating */}
					<div className='mb-3 flex gap-3'>
						<FaUserCircle className='h-18 w-18 text-gray-500' />
						<div className='flex flex-col'>
							<h2 className='mb-1 text-[1.1rem] font-normal'>
								First Name, Last Name
							</h2>

							<div className='mb-2 flex gap-1 text-yellow-500'>
								<FaStar className='h-4 w-4' />
								<FaStar className='h-4 w-4' />
								<FaStar className='h-4 w-4' />
								<FaStar className='h-4 w-4' />
								<FaStar className='h-4 w-4' />
							</div>

							<p className='text-md text-gray-500'>Posted on: July 03, 2025</p>
						</div>
					</div>

					{/* Content */}
					<div className='md:pl-20'>
						<p className='rounded-lg bg-gray-200 p-5 md:max-w-4xl xl:max-w-7xl 2xl:max-w-[95rem]'>
							Lorem ipsum dolor sit, amet consectetur adipisicing elit. Cum ad
							quidem explicabo quae facilis cumque consequatur harum similique
							deleniti mollitia qui velit at, odio ipsa iste. At a nisi
							officiis. Lorem ipsum dolor sit, amet consectetur adipisicing
							elit. Quam accusamus laboriosam nostrum incidunt repellendus culpa
							dignissimos! Ex porro at unde necessitatibus similique? Facilis
							aperiam dolores eligendi sint. Sunt, at nemo.
						</p>
					</div>

					{/* Images */}
					<div></div>
				</div>
			</div>

			{showModal && (
				<ConfirmationModal
					modalTitle='Added to Cart'
					message={`"${book.title}" has been added to cart`}
					confirmFn={handleConfirm}
					cancelFn={handleCancel}
					confirmBtn='Proceed to Cart'
					cancelBtn='Browse More'
				/>
			)}

			{/* <form
				onSubmit={(e) => {
					e.preventDefault();
					e.stopPropagation();
					form.handleSubmit();
				}}
			>
				<form.Field
					name='reviewContent'
					children={(field) => (
						<>
							<label aria-label={field.name} htmlFor={field.name}>
								TESTTING COMMENT
							</label>
							<input
								aria-label={`${field.name} input`}
								type='text'
								value={field.state.value}
								id={field.name}
								onChange={(e) => field.handleChange(e.target.value)}
								required
								className='w-full max-w-7xl border'
							/>
						</>
					)}
				/>

				<form.Subscribe
					selector={(state) => [state.canSubmit, state.isSubmitting]}
					children={([canSubmit, isSubmitting]) => (
						<div>
							<button
								type='submit'
								aria-label='comment btn'
								disabled={!canSubmit || isSubmitting}
								className='w-full cursor-pointer rounded-lg bg-black px-4 py-2 font-medium text-white hover:bg-black/85 focus:ring-1 focus:ring-gray-700 focus:ring-offset-2 focus:outline-none'
							>
								{isSubmitting ? (
									<svg
										xmlns='http://www.w3.org/2000/svg'
										viewBox='0 0 200 200'
										className='mx-auto h-7 w-7'
									>
										<rect
											fill='#FFFFFF'
											stroke='#FFFFFF'
											strokeWidth='15'
											width='30'
											height='30'
											x='25'
											y='85'
										>
											<animate
												attributeName='opacity'
												calcMode='spline'
												dur='2'
												values='1;0;1;'
												keySplines='.5 0 .5 1;.5 0 .5 1'
												repeatCount='indefinite'
												begin='-.4'
											></animate>
										</rect>
										<rect
											fill='#FFFFFF'
											stroke='#FFFFFF'
											strokeWidth='15'
											width='30'
											height='30'
											x='85'
											y='85'
										>
											<animate
												attributeName='opacity'
												calcMode='spline'
												dur='2'
												values='1;0;1;'
												keySplines='.5 0 .5 1;.5 0 .5 1'
												repeatCount='indefinite'
												begin='-.2'
											></animate>
										</rect>
										<rect
											fill='#FFFFFF'
											stroke='#FFFFFF'
											strokeWidth='15'
											width='30'
											height='30'
											x='145'
											y='85'
										>
											<animate
												attributeName='opacity'
												calcMode='spline'
												dur='2'
												values='1;0;1;'
												keySplines='.5 0 .5 1;.5 0 .5 1'
												repeatCount='indefinite'
												begin='0'
											></animate>
										</rect>
									</svg>
								) : (
									'Add Comment'
								)}
							</button>
						</div>
					)}
				/>
			</form> */}
		</div>
	);
}
