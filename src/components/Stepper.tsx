import { IoIosArrowForward } from 'react-icons/io';

interface StepperProps {
	path: String;
}

export default function Stepper({ path }: StepperProps) {
	return (
		<div className='mx-auto mb-8 flex max-w-sm items-center justify-center gap-3 xl:mb-10 2xl:max-w-xl'>
			<h2 className={`text-xl font-bold xl:text-xl 2xl:text-2xl`}>Cart</h2>
			<IoIosArrowForward className='xl:h-4 xl:w-4 2xl:h-4 2xl:w-4' />
			<h2 className={`text-xl font-bold xl:text-xl 2xl:text-2xl`}>Checkout</h2>
			<IoIosArrowForward className='xl:h-4 xl:w-4 2xl:h-4 2xl:w-4' />
			<h2 className={`text-xl font-bold xl:text-xl 2xl:text-2xl`}>Payment</h2>
		</div>
	);
}
