import { IoIosArrowForward } from 'react-icons/io';
import { useLocation } from '@tanstack/react-router';

export default function Stepper() {
	const location = useLocation();

	return (
		<div className='mx-auto mb-8 flex max-w-sm items-center justify-center gap-3 xl:mb-10 2xl:max-w-xl'>
			<h2
				className={`text-xl xl:text-xl 2xl:text-2xl ${location.pathname === '/cart' ? 'font-bold' : ''}`}
			>
				Cart
			</h2>
			<IoIosArrowForward className='xl:h-4 xl:w-4 2xl:h-4 2xl:w-4' />
			<h2
				className={`text-xl xl:text-xl 2xl:text-2xl ${location.pathname === '/checkout' ? 'font-bold' : ''}`}
			>
				Checkout
			</h2>
			<IoIosArrowForward className='xl:h-4 xl:w-4 2xl:h-4 2xl:w-4' />
			<h2
				className={`text-xl xl:text-xl 2xl:text-2xl ${location.pathname === '/payment-success' ? 'font-bold' : ''}`}
			>
				Payment
			</h2>
		</div>
	);
}
