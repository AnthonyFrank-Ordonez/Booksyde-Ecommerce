import { ScrollFadeSection } from '@/components/ScrollFadeSection';
import { createFileRoute, Link, redirect } from '@tanstack/react-router';
import { useForm } from '@tanstack/react-form';
import { signUpSchema } from '@/utils/zod';
import FieldInfo from '@/components/FieldInfo';

export const Route = createFileRoute('/signup')({
	component: SignUp,
	beforeLoad: async ({ context }) => {
		if (context.userID) throw redirect({ to: '/' });
	},
});

function SignUp() {
	const form = useForm({
		defaultValues: {
			email: '',
			username: '',
			password: '',
			confirmPassword: '',
		},
		validators: {
			onChange: signUpSchema,
		},
		onSubmit: async ({ value }) => {
			console.log('🚀 ~ onSubmit: ~ value:', value);
			//
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
							Create your account
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
										<div className='mb-2'>
											<label
												aria-label={field.name}
												htmlFor={field.name}
												className='text-md mb-1 block font-medium'
											>
												Email: <FieldInfo field={field} />
											</label>
											<input
												aria-label='email'
												type='email'
												name={field.name}
												id={field.name}
												value={field.state.value}
												onChange={(e) => field.handleChange(e.target.value)}
												required
												className='focux:border-transparent w-full rounded-md border border-gray-700 px-3 py-1 focus:ring-1 focus:outline-none'
											/>
										</div>
									)}
								/>

								<form.Field
									name='username'
									children={(field) => (
										<div className='mb-2'>
											<label
												aria-label={field.name}
												htmlFor={field.name}
												className='text-md mb-1 block font-medium'
											>
												Username: <FieldInfo field={field} />
											</label>
											<input
												aria-label='username'
												type='text'
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
										<div className='mb-2'>
											<label
												aria-label={field.name}
												htmlFor={field.name}
												className='text-md mb-1 block font-medium'
											>
												Password: <FieldInfo field={field} />
											</label>
											<input
												aria-label='password'
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
								<form.Field
									name='confirmPassword'
									children={(field) => (
										<div className='mb-5'>
											<label
												aria-label={field.name}
												htmlFor={field.name}
												className='text-md mb-1 block font-medium'
											>
												Confirm Password:
											</label>
											<input
												aria-label='confirmPass'
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
												aria-label='signUp'
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
													'Sign Up'
												)}
											</button>
										</div>
									)}
								/>
							</form>

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
