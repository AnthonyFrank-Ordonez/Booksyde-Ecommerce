import { IoIosArrowForward } from 'react-icons/io';

interface StepperProps {
	path: String;
}

export default function Stepper({ path }: StepperProps) {
	return (
		<div className='mx-auto mb-5 flex max-w-sm items-center justify-center gap-3'>
			<h2 className={`text-xl font-bold`}>Cart</h2>
			<IoIosArrowForward />
			<h2 className={`text-xl font-bold`}>Checkout</h2>
			<IoIosArrowForward />
			<h2 className={`text-xl font-bold`}>Payment</h2>
		</div>
	);
}
