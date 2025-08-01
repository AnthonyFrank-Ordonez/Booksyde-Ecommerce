import { Link, rootRouteId, useMatch, useRouter } from '@tanstack/react-router';
import type { ErrorComponentProps } from '@tanstack/react-router';

export function DefaultCatchBoundary({ error }: ErrorComponentProps) {
	const router = useRouter();
	const isRoot = useMatch({
		strict: false,
		select: (state) => state.id === rootRouteId,
	});

	console.error('DefaultCatchBoundary Error:', error);

	return (
		<div className='flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-4 dark:from-gray-900 dark:to-gray-800'>
			<div className='w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-xl dark:bg-gray-800'>
				<div className='mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/20'>
					<svg
						className='h-8 w-8 text-red-600 dark:text-red-400'
						fill='none'
						stroke='currentColor'
						viewBox='0 0 24 24'
						xmlns='http://www.w3.org/2000/svg'
					>
						<path
							strokeLinecap='round'
							strokeLinejoin='round'
							strokeWidth={2}
							d='M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z'
						/>
					</svg>
				</div>

				<h1 className='mb-2 text-2xl font-bold text-gray-900 dark:text-white'>
					Oops! Something went wrong
				</h1>

				<p className='mb-8 leading-relaxed text-gray-600 dark:text-gray-300'>
					We encountered an unexpected error. Don't worry, this is usually
					temporary and can be resolved by trying again.
				</p>

				<details className='mb-6'>
					<summary className='cursor-pointer text-sm text-gray-500 transition-colors hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'>
						Show error details
					</summary>
					<div className='mt-3 rounded-lg bg-gray-50 p-3 text-left dark:bg-gray-700'>
						<pre className='overflow-x-auto text-xs text-gray-600 dark:text-gray-300'>
							{error instanceof Error ? error.message : String(error)}
						</pre>
					</div>
				</details>

				{/* Action Buttons */}
				<div className='flex flex-col justify-center gap-3 sm:flex-row'>
					<button
						onClick={() => {
							router.invalidate();
						}}
						className='flex flex-1 items-center justify-center gap-2 rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition-colors duration-200 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600'
					>
						<svg
							className='h-4 w-4'
							fill='none'
							stroke='currentColor'
							viewBox='0 0 24 24'
						>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								strokeWidth={2}
								d='M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15'
							/>
						</svg>
						Try Again
					</button>

					{isRoot ? (
						<Link
							to='/'
							className='flex flex-1 items-center justify-center gap-2 rounded-lg bg-gray-600 px-6 py-3 font-semibold text-white transition-colors duration-200 hover:bg-gray-700 dark:bg-gray-500 dark:hover:bg-gray-600'
						>
							<svg
								className='h-4 w-4'
								fill='none'
								stroke='currentColor'
								viewBox='0 0 24 24'
							>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									strokeWidth={2}
									d='M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6'
								/>
							</svg>
							Go Home
						</Link>
					) : (
						<button
							onClick={() => window.history.back()}
							className='flex flex-1 items-center justify-center gap-2 rounded-lg bg-gray-600 px-6 py-3 font-semibold text-white transition-colors duration-200 hover:bg-gray-700 dark:bg-gray-500 dark:hover:bg-gray-600'
						>
							<svg
								className='h-4 w-4'
								fill='none'
								stroke='currentColor'
								viewBox='0 0 24 24'
							>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									strokeWidth={2}
									d='M10 19l-7-7m0 0l7-7m-7 7h18'
								/>
							</svg>
							Go Back
						</button>
					)}
				</div>

				{/* Additional Help */}
				<div className='mt-6 border-t border-gray-200 pt-6 dark:border-gray-700'>
					<p className='text-xs text-gray-500 dark:text-gray-400'>
						If this problem persists, please contact our support team.
					</p>
				</div>
			</div>
		</div>
	);
}
