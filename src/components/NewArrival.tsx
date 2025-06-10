import { Link } from '@tanstack/react-router';
import { ScrollFadeSection } from './ScrollFadeSection';
import { useState } from 'react';

interface NewArrivalProps {
	title?: string;
	price?: number;
	description?: string;
	coverImg?: string;
	imageAlt?: string;
	stock?: number;
}

export default function NewArrival({
	title = 'Book Name',
	price = 50,
	description = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem minus amet officia. Eveniet optio ipsam dolore, corrupti voluptate, vitae quisquam nemo sint magni veniam, aperiam repellat eum explicabo eius ea? ',
	coverImg = 'https://picsum.photos/id/1015/400/600',
	imageAlt = 'book',
	stock = 100,
}: NewArrivalProps) {
	const [isExpanded, setIsExpanded] = useState(false);

	return (
		<section className='bg-gray-100'>
			<ScrollFadeSection className='flex flex-col gap-10 px-12 py-12 md:flex-row md:gap-5 md:px-[5rem] lg:flex-row lg:gap-5 lg:px-[6rem] xl:flex-row xl:gap-5 2xl:gap-10 2xl:px-[8rem]'>
				<div className='flex flex-1 flex-col'>
					<h2 className='text-7xl font-extrabold md:max-w-sm md:text-7xl lg:max-w-md lg:text-8xl xl:max-w-sm xl:text-9xl 2xl:text-[13rem]'>
						New Arrival
					</h2>
					<p className='mt-3 text-2xl font-bold md:mt-3 md:text-3xl lg:mt-4 lg:text-3xl xl:mt-5 xl:text-4xl 2xl:text-5xl'>
						{title}
					</p>
					<p className='text-xl font-normal md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl'>
						${price}
					</p>
					<div className='mt-5 md:mt-3 lg:mt-4 xl:mt-5'>
						<p
							className={`text-sm font-normal text-gray-500 md:max-w-sm md:text-sm lg:max-w-md lg:text-lg xl:max-w-lg 2xl:max-w-xl 2xl:text-xl ${!isExpanded ? 'line-clamp-4' : ''}`}
						>
							{description}
						</p>
						{description && description.length > 150 && (
							<button
								onClick={() => setIsExpanded(!isExpanded)}
								className='mt-2 cursor-pointer text-sm font-medium text-black hover:text-black/70 focus:outline-none'
							>
								{isExpanded ? 'See Less' : 'See More'}
							</button>
						)}
					</div>
					<Link
						to='/'
						className='mt-7 items-center rounded-2xl border bg-black py-4 text-center font-bold text-white transition-colors duration-300 hover:bg-black/80 md:mt-5 md:w-52 md:px-2 md:py-3 lg:w-55 lg:px-3 lg:py-4 xl:w-68 xl:px-3 xl:py-4 2xl:w-80'
					>
						Add to Cart
					</Link>
					<div className='mt-2 w-full md:w-52 lg:w-54 xl:w-66 2xl:w-80'>
						<p className='text-center text-sm font-light xl:text-lg'>
							Only {stock} stocks are available!
						</p>
					</div>
				</div>

				<div className='flex flex-1 items-center justify-center md:justify-end lg:justify-end xl:justify-end 2xl:justify-end'>
					<div className='relative flex h-auto w-auto items-center justify-center overflow-hidden rounded-md bg-gray-200/50 md:h-[27rem] md:w-[22rem] lg:h-[33em] lg:w-[26rem] xl:h-[40rem] xl:w-[34rem] 2xl:h-[50rem] 2xl:w-[40rem]'>
						<img
							src={coverImg}
							alt={imageAlt}
							className='object-fit mx-auto h-auto w-auto md:h-[22rem] md:w-62 lg:h-[26rem] lg:w-70 xl:h-[30rem] xl:w-90 2xl:h-[40rem] 2xl:w-[28rem]'
						/>
					</div>
				</div>
			</ScrollFadeSection>
		</section>
	);
}
