import { Link } from '@tanstack/react-router';
import {
	FaFacebookSquare,
	FaInstagramSquare,
	FaRedditSquare,
	FaTwitterSquare,
	FaWhatsappSquare,
} from 'react-icons/fa';
import { MdCall, MdEmail, MdPhoneAndroid } from 'react-icons/md';
import { motion } from 'motion/react';

export default function Footer() {
	return (
		<motion.footer
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 0.6, ease: 'easeInOut' }}
			className='grid h-full w-full grid-cols-1 bg-gray-200 px-20 py-10 md:grid-cols-8'
		>
			<div className='col-span-1 md:col-span-3'>
				<div className='flex flex-col items-start justify-center'>
					<h2 className='text-start text-4xl font-bold text-black 2xl:text-6xl'>
						BookSyde
					</h2>
					<p className='mt-3 w-full max-w-xs font-normal text-black 2xl:mt-4 2xl:text-lg'>
						Booksyde is your one-stop shop for all your book and manga
					</p>

					<div className='mt-3 flex flex-row space-x-2'>
						<FaFacebookSquare size={22} />
						<FaInstagramSquare size={22} />
						<FaTwitterSquare size={22} />
						<FaWhatsappSquare size={22} />
						<FaRedditSquare size={22} />
					</div>
				</div>
			</div>

			<div className='col-span-1 mt-10 md:col-span-2 md:mt-0'>
				<div className='flex flex-col items-start justify-center gap-3 md:ml-50 md:gap-1 2xl:ml-80 2xl:gap-3'>
					<p className='text-md font-bold md:font-medium 2xl:text-xl'>
						Quick Links
					</p>
					<Link
						to='/'
						aria-label='home'
						activeProps={{ className: 'font-normal text-sm' }}
					>
						Home
					</Link>

					<Link
						to='/'
						aria-label='home'
						activeProps={{ className: 'font-normal text-sm' }}
					>
						About
					</Link>

					<Link
						to='/'
						aria-label='home'
						activeProps={{ className: 'font-normal text-sm' }}
					>
						Products
					</Link>

					<Link
						to='/'
						aria-label='home'
						activeProps={{ className: 'font-normal text-sm' }}
					>
						Contact
					</Link>
				</div>
			</div>

			<div className='col-span-1 mt-10 md:col-span-1 md:mt-0'>
				<div className='flex flex-col items-start justify-center gap-3 md:ml-15 md:gap-1 2xl:ml-30 2xl:gap-3'>
					<p className='text-md font-bold md:font-medium 2xl:text-xl'>
						Services
					</p>
					<p className='text-sm font-normal'>Books</p>
					<p className='text-sm font-normal'>Manga's</p>
					<p className='text-sm font-normal'>Others</p>
				</div>
			</div>

			<div className='col-span-1 mt-10 md:col-span-2 md:mt-0'>
				<div className='flex flex-col items-start justify-center gap-3 md:ml-10 md:gap-1 2xl:ml-30 2xl:gap-3'>
					<p className='text-md font-bold md:font-medium 2xl:text-xl'>
						Contacts
					</p>
					<div className='flex flex-row items-center justify-center space-x-2'>
						<MdCall />
						<p className='text-sm font-normal'>+123 456-7890-901</p>
					</div>

					<div className='flex flex-row items-center justify-center space-x-2'>
						<MdPhoneAndroid />
						<p className='text-sm font-normal'>+123 456-7890-901</p>
					</div>

					<div className='flex flex-row items-center justify-center space-x-2'>
						<MdEmail />
						<p className='text-sm font-normal'>sampleemail@sample.com</p>
					</div>

					{/* <div className='flex flex-shrink-0 flex-row items-center justify-center space-x-2'>
						<MdEmail />
						<p className='text-sm font-normal'>sampleemail@sample.com</p>
					</div> */}
				</div>
			</div>
		</motion.footer>
	);
}
