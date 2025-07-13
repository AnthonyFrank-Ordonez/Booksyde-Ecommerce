import { AnimatePresence, motion } from 'motion/react';

interface ConfirmationModalProps {
	message: string;
	confirmFn: () => Promise<void>;
	cancelFn: () => void;
}

export default function ConfirmationModal({
	message,
	confirmFn,
	cancelFn,
}: ConfirmationModalProps) {
	return (
		<AnimatePresence>
			<motion.div
				className='fixed inset-0 z-50 flex items-center justify-center bg-black/50'
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				exit={{ opacity: 0 }}
			>
				<motion.div
					className='w-85 rounded-xl bg-white p-6 shadow-lg'
					initial={{ scale: 0.8, opacity: 0 }}
					animate={{ scale: 1, opacity: 1 }}
					exit={{ scale: 0.8, opacity: 0 }}
				>
					<h2 className='mb-2 text-xl font-bold'>Confirm Action</h2>
					<p className='mb-3'>{message}</p>
					<div className='flex justify-end space-x-2'>
						<button
							onClick={confirmFn}
							className='cursor-pointer rounded-lg bg-black px-4 py-2 text-white transition-colors duration-300 hover:bg-black/80'
						>
							Yes
						</button>
						<button
							onClick={cancelFn}
							className='cursor-pointer rounded-lg border border-black bg-white px-4 py-2 text-black transition-colors duration-300 hover:bg-gray-500/10'
						>
							No
						</button>
					</div>
				</motion.div>
			</motion.div>
		</AnimatePresence>
	);
}
