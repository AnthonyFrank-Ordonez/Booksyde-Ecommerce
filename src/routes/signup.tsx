import { ScrollFadeSection } from '@/components/ScrollFadeSection';
import { getUserID } from '@/utils/auth-server';
import { createFileRoute, Link, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/signup')({
	component: SignUp,
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

function SignUp() {
	return (
		<ScrollFadeSection className='col-span-1 md:col-span-8'>
			<div className='flex min-h-screen items-center justify-center p-10'>
				<div className='w-full max-w-md'>
					<div className='rounded-3xl border border-black bg-white p-8'>
						<h2 className='mb-2 text-center text-3xl font-extrabold'>
							Booksyde
						</h2>
						<h3 className='mb-10 text-center text-xl font-medium'>
							Create your account
						</h3>

						<div>
							<div className='mb-2'>
								<label
									aria-label='email'
									htmlFor='email'
									className='text-md mb-1 block font-medium'
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

							<div className='mb-2'>
								<label
									aria-label='username'
									htmlFor='username'
									className='text-md mb-1 block font-medium'
								>
									Username:
								</label>
								<input
									aria-label='username'
									type='text'
									required
									id='username'
									className='focux:border-transparent w-full rounded-md border border-gray-700 px-3 py-1 focus:ring-1 focus:outline-none'
								/>
							</div>

							<div className='mb-2'>
								<label
									aria-label='password'
									htmlFor='password'
									className='text-md mb-1 block font-medium'
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

							<div className='mb-5'>
								<label
									aria-label='confirmPass'
									htmlFor='confirmPass'
									className='text-md mb-1 block font-medium'
								>
									Confirm Password:
								</label>
								<input
									aria-label='confirmPass'
									type='password'
									required
									id='confirmPass'
									className='focux:border-transparent w-full rounded-md border border-gray-700 px-3 py-1 focus:ring-1 focus:outline-none'
								/>
							</div>

							<div>
								<button
									aria-label='signIn'
									className='w-full cursor-pointer rounded-lg bg-black px-4 py-2 font-medium text-white hover:bg-black/85 focus:ring-1 focus:ring-gray-700 focus:ring-offset-2 focus:outline-none'
								>
									Sign Up
								</button>
							</div>

							<div className='mt-6 text-center'>
								<p className='text-sm text-gray-600'>
									Already have an account?{' '}
									<Link
										to='/signin'
										aria-label='signIn'
										className='text-sm font-medium text-black hover:underline focus:ring-1 focus:ring-gray-700 focus:ring-offset-2 focus:outline-none'
									>
										Sign In
									</Link>
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</ScrollFadeSection>
	);
}
