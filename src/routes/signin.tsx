import {
	createFileRoute,
	Link,
	redirect,
	useRouter,
} from '@tanstack/react-router';
import { FaFacebook, FaGithub, FaGoogle } from 'react-icons/fa';
import { signIn } from '@/utils/auth-client';
import { ScrollFadeSection } from '@/components/ScrollFadeSection';
import { useForm } from '@tanstack/react-form';

import { signInServer } from '@/utils/servers/user';
import { useServerFn } from '@tanstack/react-start';

export const Route = createFileRoute('/signin')({
	component: Login,
	beforeLoad: async ({ context }) => {
		if (context.userID) throw redirect({ to: '/' });
	},
});

function Login() {
	const router = useRouter();
	const userSignIn = useServerFn(signInServer);

	const form = useForm({
		defaultValues: {
			email: '',
			password: '',
		},
		onSubmit: async ({ value }) => {
			try {
				await userSignIn({
					data: { email: value.email, password: value.password },
				});
				router.invalidate();
			} catch (error: unknown) {
				if (error instanceof Error) {
					console.error('Error:', error.message);
				}
			}

			// CLIENT-SIDE
			// await signIn.email(
			// 	{
			// 		email: value.email,
			// 		password: value.password,
			// 	},
			// 	{
			// 		onSuccess: () => {
			// 			router.navigate({ to: '/products' });
			// 			router.invalidate();
			// 		},
			// 	}
			// );
		},
	});

	return (
		<ScrollFadeSection className='col-span-1 md:col-span-12'>
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
							<form
								onSubmit={(e) => {
									e.preventDefault();
									e.stopPropagation();
									form.handleSubmit();
								}}
							>
								<form.Field
									name='email'
									children={(field) => (
										<div className='mb-3'>
											<label
												aria-label={field.name}
												htmlFor={field.name}
												className='text-md mb-2 block font-medium'
											>
												Email:
											</label>
											<input
												aria-label={`${field.name} input`}
												type='email'
												id={field.name}
												name={field.name}
												value={field.state.value}
												onChange={(e) => field.handleChange(e.target.value)}
												required
												className='focux:border-transparent w-full rounded-md border border-gray-700 px-3 py-1 focus:ring-1 focus:outline-none'
											/>
										</div>
									)}
								/>

								<form.Field
									name='password'
									children={(field) => (
										<div className='mb-5'>
											<label
												aria-label={field.name}
												htmlFor={field.name}
												className='text-md mb-2 block font-medium'
											>
												Password:
											</label>
											<input
												aria-label={`${field.name} input`}
												type='password'
												id={field.name}
												name={field.name}
												value={field.state.value}
												onChange={(e) => field.handleChange(e.target.value)}
												required
												className='focux:border-transparent w-full rounded-md border border-gray-700 px-3 py-1 focus:ring-1 focus:outline-none'
											/>
										</div>
									)}
								/>

								<form.Subscribe
									selector={(state) => [state.canSubmit, state.isSubmitting]}
									children={([canSubmit, isSubmitting]) => (
										<div>
											<button
												type='submit'
												aria-label='signUp btn'
												disabled={!canSubmit || isSubmitting}
												className='w-full cursor-pointer rounded-lg bg-black px-4 py-2 font-medium text-white hover:bg-black/85 focus:ring-1 focus:ring-gray-700 focus:ring-offset-2 focus:outline-none'
											>
												{isSubmitting ? (
													<svg
														xmlns='http://www.w3.org/2000/svg'
														viewBox='0 0 200 200'
														className='mx-auto h-7 w-7'
													>
														<rect
															fill='#FFFFFF'
															stroke='#FFFFFF'
															strokeWidth='15'
															width='30'
															height='30'
															x='25'
															y='85'
														>
															<animate
																attributeName='opacity'
																calcMode='spline'
																dur='2'
																values='1;0;1;'
																keySplines='.5 0 .5 1;.5 0 .5 1'
																repeatCount='indefinite'
																begin='-.4'
															></animate>
														</rect>
														<rect
															fill='#FFFFFF'
															stroke='#FFFFFF'
															strokeWidth='15'
															width='30'
															height='30'
															x='85'
															y='85'
														>
															<animate
																attributeName='opacity'
																calcMode='spline'
																dur='2'
																values='1;0;1;'
																keySplines='.5 0 .5 1;.5 0 .5 1'
																repeatCount='indefinite'
																begin='-.2'
															></animate>
														</rect>
														<rect
															fill='#FFFFFF'
															stroke='#FFFFFF'
															strokeWidth='15'
															width='30'
															height='30'
															x='145'
															y='85'
														>
															<animate
																attributeName='opacity'
																calcMode='spline'
																dur='2'
																values='1;0;1;'
																keySplines='.5 0 .5 1;.5 0 .5 1'
																repeatCount='indefinite'
																begin='0'
															></animate>
														</rect>
													</svg>
												) : (
													'Sign In'
												)}
											</button>
										</div>
									)}
								/>
							</form>
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
								onClick={() => signIn.social({ provider: 'google' })}
								className='mt-5 flex w-full cursor-pointer items-center justify-center gap-x-2 rounded-lg border py-2 font-medium hover:bg-gray-300/20 focus:ring-1 focus:ring-gray-700 focus:ring-offset-2 focus:outline-none'
							>
								<FaGoogle />
								Sign in using Google
							</button>

							<button
								aria-label='google'
								onClick={() => signIn.social({ provider: 'facebook' })}
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
