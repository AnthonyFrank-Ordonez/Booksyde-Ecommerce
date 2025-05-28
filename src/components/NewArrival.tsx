import { Link } from '@tanstack/react-router';
import { ScrollFadeSection } from './ScrollFadeSection';

interface NewArrivalProps {
	name?: string;
	price?: number;
	description?: string;
	imageUrl?: string;
	imageAlt?: string;
	stock?: number;
}

export default function NewArrival({
	name = 'Book Name',
	price = 50,
	description = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem minus amet officia. Eveniet optio ipsam dolore, corrupti voluptate, vitae quisquam nemo sint magni veniam, aperiam repellat eum explicabo eius ea?',
	imageUrl = 'https://picsum.photos/id/1015/400/600',
	imageAlt = 'book',
	stock = 100,
}: NewArrivalProps) {
	return (
		<section className='bg-gray-100'>
			<ScrollFadeSection className='flex flex-col gap-10 px-12 py-12 md:flex-row md:gap-5 lg:flex-row lg:gap-5 xl:flex-row xl:gap-5'>
				<div className='flex flex-1 flex-col'>
					<h2 className='text-7xl font-extrabold md:max-w-sm md:text-7xl lg:max-w-sm lg:text-8xl xl:max-w-sm xl:text-9xl'>
						New Arrival
					</h2>
					<p className='mt-3 text-2xl font-bold md:mt-3 md:text-3xl lg:mt-4 lg:text-3xl xl:mt-5 xl:text-4xl'>
						{name}
					</p>
					<p className='text-xl font-normal md:text-xl lg:text-2xl xl:text-3xl'>
						${price}
					</p>
					<p className='mt-5 text-sm font-normal text-gray-500 md:mt-3 md:max-w-sm md:text-sm lg:mt-4 lg:max-w-md lg:text-lg xl:mt-5 xl:max-w-lg'>
						{description}
					</p>
					<div></div>
					<Link
						to='/'
						className='mt-7 items-center rounded-2xl border bg-black py-4 text-center font-bold text-white transition-colors duration-300 hover:bg-gray-800/70 md:mt-5 md:w-52 md:px-2 md:py-3 lg:w-55 lg:px-3 lg:py-4 xl:w-68 xl:px-3 xl:py-4'
					>
						Add to Cart
					</Link>
					<div className='mt-2 w-full md:w-52 lg:w-54 xl:w-66'>
						<p className='text-center text-sm font-light xl:text-lg'>
							Only {stock} stocks are available!
						</p>
					</div>
				</div>

				<div className='flex flex-1 items-center justify-center md:justify-end lg:justify-end xl:justify-end'>
					<div className='relative flex h-[28rem] w-[30rem] items-center justify-center overflow-hidden rounded-md bg-gray-200/50 md:h-[27rem] md:w-[22rem] lg:h-[33em] lg:w-[26rem] xl:h-[38rem] xl:w-[32rem]'>
						<img
							src={imageUrl}
							alt={imageAlt}
							className='mx-auto h-[23rem] w-54 object-cover md:h-[22rem] md:w-62 lg:h-[26rem] lg:w-70 xl:h-[30rem] xl:w-84'
						/>
					</div>
				</div>
			</ScrollFadeSection>
		</section>
	);
}
