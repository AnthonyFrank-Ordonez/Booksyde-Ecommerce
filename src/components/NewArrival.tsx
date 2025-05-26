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
			<ScrollFadeSection className='flex flex-col px-12 py-12 md:flex-row'>
				<div className='flex flex-1 flex-col'>
					<h2 className='max-w-sm text-9xl font-extrabold'>New Arrival</h2>
					<p className='mt-7 text-4xl font-bold'>{name}</p>
					<p className='text-3xl font-normal'>${price}</p>
					<p className='mt-5 max-w-sm font-normal text-gray-500'>
						{description}
					</p>
					<div></div>
					<Link
						to='/'
						className='mt-7 w-58 items-center rounded-2xl border bg-black px-3 py-4 text-center font-bold text-white transition-colors duration-300 hover:bg-gray-800/70'
					>
						Add to Cart
					</Link>
					<div className='w-58'>
						<p className='text-md text-center font-light'>
							Only {stock} stocks are available!
						</p>
					</div>
				</div>

				<div className='flex flex-1 items-center justify-end'>
					<div className='relative flex h-[38rem] w-[35rem] items-center justify-center overflow-hidden rounded-md bg-gray-200'>
						<img
							src={imageUrl}
							alt={imageAlt}
							className='mx-auto h-[30rem] w-84 object-cover'
						/>
					</div>
				</div>
			</ScrollFadeSection>
		</section>
	);
}
