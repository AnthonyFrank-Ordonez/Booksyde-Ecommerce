import { IoIosArrowForward } from 'react-icons/io';
import { useCartStore } from '@/store/cartStore';

export default function Stepper() {
	const { cartPage } = useCartStore();

	return (
		<div className='mx-auto mb-8 flex max-w-sm items-center justify-center gap-3 xl:mb-10 2xl:max-w-xl'>
			<h2
				className={`text-xl xl:text-xl 2xl:text-2xl ${cartPage === 'cart' ? 'font-bold' : ''}`}
			>
				Cart
			</h2>
			<IoIosArrowForward className='xl:h-4 xl:w-4 2xl:h-4 2xl:w-4' />
			<h2
				className={`text-xl xl:text-xl 2xl:text-2xl ${cartPage === 'checkout' ? 'font-bold' : ''}`}
			>
				Checkout
			</h2>
			<IoIosArrowForward className='xl:h-4 xl:w-4 2xl:h-4 2xl:w-4' />
			<h2
				className={`text-xl xl:text-xl 2xl:text-2xl ${cartPage === 'payment' ? 'font-bold' : ''}`}
			>
				Payment
			</h2>
		</div>
	);
}
