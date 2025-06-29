import { createFileRoute } from '@tanstack/react-router';
import { FaPlus } from 'react-icons/fa';

export const Route = createFileRoute('/_settings/address')({
	component: Address,
});

function Address() {
	return (
		<div className='px-4 py-3 md:py-5'>
			<button className='flex w-full cursor-pointer items-center justify-center gap-1 rounded-lg border border-gray-400 py-2 transition-colors duration-300 hover:bg-black/3'>
				<FaPlus className='h-3 w-3' />
				<span className='font-light'>Add New Address</span>
			</button>
		</div>
	);
}
