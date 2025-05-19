import { createFileRoute, Link, redirect } from '@tanstack/react-router';
import { FaFacebook, FaGithub, FaGoogle } from 'react-icons/fa';

import { signIn } from '@/utils/auth-client';
import { getUserID } from '@/utils/auth-server';
import { ScrollFadeSection } from '@/components/ScrollFadeSection';

export const Route = createFileRoute('/signin')({
	component: Login,
	beforeLoad: async () => {
		const userID = await getUserID();

		return {
			userID,
		};
	},
	loader: async ({ context }) => {
		if (context.userID) {
			throw redirect({ to: '/' });
		}
	},
});

function Login() {
	return (
		<ScrollFadeSection className='col-span-1 md:col-span-8'>
			<div className='flex min-h-screen items-center justify-center p-10'>
				<div className='w-full max-w-md'>
					<div className='rounded-3xl border border-black bg-white p-8'>
						<h2 className='mb-2 text-center text-3xl font-extrabold'>
							Booksyde
						</h2>
						<h3 className='mb-10 text-center text-xl font-medium'>
							Login with your account
						</h3>

						<div>
							<div className='mb-3'>
								<label
									aria-label='email'
									htmlFor='email'
									className='text-md mb-2 block font-medium'
								>
									Email:
								</label>
								<input
									aria-label='email'
									type='email'
									required
									id='email'
									className='focux:border-transparent w-full rounded-md border border-gray-700 px-3 py-1 focus:ring-1 focus:outline-none'
								/>
							</div>

							<div className='mb-5'>
								<label
									aria-label='password'
									htmlFor='password'
									className='text-md mb-2 block font-medium'
								>
									Password:
								</label>
								<input
									aria-label='password'
									type='password'
									required
									id='password'
									className='focux:border-transparent w-full rounded-md border border-gray-700 px-3 py-1 focus:ring-1 focus:outline-none'
								/>
							</div>

							<div>
								<button
									aria-label='signIn'
									className='w-full cursor-pointer rounded-lg bg-black px-4 py-2 font-medium text-white hover:bg-black/85 focus:ring-1 focus:ring-gray-700 focus:ring-offset-2 focus:outline-none'
								>
									Sign In
								</button>
							</div>
						</div>

						<div className='relative mt-5'>
							<div className='absolute inset-0 flex items-center'>
								<div className='w-full border-t border-gray-300'></div>
							</div>
							<div className='relative flex justify-center text-sm'>
								<p className='bg-white px-2 text-gray-500'>or sign in using</p>
							</div>
						</div>

						<div className='flex flex-col gap-3'>
							<button
								aria-label='google'
								className='mt-5 flex w-full cursor-pointer items-center justify-center gap-x-2 rounded-lg border py-2 font-medium hover:bg-gray-300/20 focus:ring-1 focus:ring-gray-700 focus:ring-offset-2 focus:outline-none'
							>
								<FaGoogle />
								Sign in using Google
							</button>

							<button
								aria-label='google'
								className='flex w-full cursor-pointer items-center justify-center gap-x-2 rounded-lg border py-2 font-medium hover:bg-gray-300/20 focus:ring-1 focus:ring-gray-700 focus:ring-offset-2 focus:outline-none'
							>
								<FaFacebook />
								Sign in using Facebook
							</button>

							<button
								aria-label='google'
								onClick={() => signIn.social({ provider: 'github' })}
								className='flex w-full cursor-pointer items-center justify-center gap-x-2 rounded-lg border py-2 font-medium hover:bg-gray-300/20 focus:ring-1 focus:ring-gray-700 focus:ring-offset-2 focus:outline-none'
							>
								<FaGithub />
								Sign in using Github
							</button>
						</div>

						<div className='mt-6 text-center'>
							<p className='text-sm text-gray-600'>
								Don't have an account?{' '}
								<Link
									to='/signup'
									aria-label='signUp'
									className='text-sm font-medium text-black hover:underline focus:ring-1 focus:ring-gray-700 focus:ring-offset-2 focus:outline-none'
								>
									Sign up
								</Link>
							</p>
						</div>
					</div>
				</div>
			</div>
		</ScrollFadeSection>
	);
}
