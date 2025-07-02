import { getUserDefaultAddQueryOptions } from '@/utils/servers/address';
import { getUserSession } from '@/utils/servers/auth-server';
import { useForm } from '@tanstack/react-form';
import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import { CiEdit } from 'react-icons/ci';
import { FaUser } from 'react-icons/fa';

export const Route = createFileRoute('/_settings/profile')({
	component: Profile,
	loader: async ({ context }) => {
		const session = await getUserSession();
		await context.queryClient.ensureQueryData(
			getUserDefaultAddQueryOptions(session.id)
		);

		return {
			session,
		};
	},
});

function Profile() {
	const { session } = Route.useLoaderData();
	const userDefaultAddress = useSuspenseQuery(
		getUserDefaultAddQueryOptions(session.id)
	).data;
	const [isEdit, setIsEdit] = useState(false);
	const [editType, setEditType] = useState('');

	if (typeof window !== 'undefined') window.userSession = session;

	const handleEdit = (type: string) => {
		setIsEdit(true);
		setEditType(type);
	};

	const handleCancel = () => {
		setIsEdit(false);
		setEditType('');
	};

	const form = useForm({
		defaultValues: {
			firstName: session.firstName || '',
			lastName: session.lastName || '',
			phone: session.phone || '',
		},
	});

	return (
		<div className='px-4 py-3 md:px-7 md:py-5 xl:px-8 xl:py-5'>
			<h2 className='mb-3 text-xl font-bold md:mb-6 xl:mb-7'>Profile</h2>

			{/* Profile Section */}
			<div className='relative mb-5 flex w-full flex-col gap-5 rounded-xl border border-gray-300 px-5 py-6 md:flex-row xl:mb-7'>
				<div className='ml-2 flex h-35 w-35 flex-shrink-0 items-center justify-center rounded-full sm:ml-5 sm:h-38 sm:w-38 md:ml-0 md:h-25 md:w-25 xl:h-20 xl:w-20'>
					{session.image ? (
						<img
							src={session.image}
							alt=''
							className='h-full w-full rounded-full object-cover'
						/>
					) : (
						<FaUser className='h-full w-full rounded-full bg-gray-500 object-cover text-white' />
					)}
				</div>

				<div className='flex flex-col gap-0.5'>
					<p className='text-[1.2rem] font-medium sm:text-[1.5rem] md:text-[1.3rem]'>
						{session.name}
					</p>
					<p className='text-[1rem] font-light text-gray-500 sm:text-[1.1rem] md:text-[1rem]'>
						{session.email}
					</p>
					<p className='text-[1rem] font-light text-gray-500 sm:text-[1.1rem] md:text-[1rem]'>
						Member
					</p>
				</div>

				<button className='absolute top-3 right-3 flex cursor-pointer items-center gap-1 rounded-lg border border-gray-500 px-2 py-0 transition-colors duration-300 hover:bg-black/5 xl:top-1/3 xl:right-5 xl:px-2 xl:py-1'>
					<span>Edit</span>
					<CiEdit />
				</button>
			</div>

			{/* Personal Information */}
			<div className='mb-5 rounded-xl border border-gray-300 px-5 py-6 xl:mb-7'>
				{/* <div className='mb-5 flex justify-between xl:mb-5'>
					<p className='font-medium sm:text-[1.1rem]'>Personal Information</p>
					<button
						onClick={() => handleEdit('personal')}
						className='flex cursor-pointer items-center rounded-lg border border-gray-500 px-2 py-0 transition-colors duration-300 hover:bg-black/5 xl:px-2 xl:py-1'
					>
						<span>Edit</span> <CiEdit />
					</button>
				</div> */}

				{isEdit && editType === 'personal' ? (
					<>
						<form
							onSubmit={(e) => {
								e.preventDefault();
								e.stopPropagation();
								form.handleSubmit();
							}}
						>
							<div className='mb-5 flex justify-between xl:mb-5'>
								<p className='font-medium sm:text-[1.1rem]'>
									Personal Information
								</p>

								<div className='flex gap-1 md:gap-3'>
									<form.Subscribe
										selector={(state) => [state.canSubmit, state.isSubmitting]}
										children={([canSubmit, isSubmitting]) => (
											<div>
												<button
													type='submit'
													aria-label='submit address btn'
													disabled={!canSubmit || isSubmitting}
													className='flex cursor-pointer items-center rounded-lg bg-black px-2.5 py-0.5 text-white transition-colors duration-300 hover:bg-black/85 focus:ring-1 focus:ring-gray-700 focus:ring-offset-2 focus:outline-none xl:px-2 xl:py-1'
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
														'Save'
													)}
												</button>
											</div>
										)}
									/>

									<button
										type='button'
										onClick={handleCancel}
										className='cursor-pointer rounded-lg border border-gray-400 px-1.5 transition-colors duration-300 hover:bg-black/5 md:px-2 md:py-1'
									>
										Cancel
									</button>
								</div>
							</div>

							<div className='grid grid-cols-1 items-center gap-5 md:grid-cols-2 md:gap-10 xl:grid-cols-[350px_350px]'>
								<div className='flex flex-col gap-5 md:mb-0'>
									<form.Field
										name='firstName'
										children={(field) => (
											<div className='flex flex-col gap-1'>
												<label
													aria-label={field.name}
													htmlFor={field.name}
													className='text-sm font-medium text-gray-500'
												>
													First Name
												</label>
												<input
													type='text'
													aria-label={`${field.name} input`}
													name={field.name}
													id={field.name}
													value={field.state.value}
													onChange={(e) => field.handleChange(e.target.value)}
													className='w-full border-b border-gray-400 focus:border-transparent focus:ring-1 focus:ring-gray-400 focus:outline-none'
												/>
											</div>
										)}
									/>

									<div className='flex flex-col gap-1'>
										<p className='text-sm font-medium text-gray-500'>
											Email Address
										</p>
										<p>{session.email}</p>
									</div>
								</div>

								<div className='flex flex-col gap-5'>
									<form.Field
										name='lastName'
										children={(field) => (
											<div className='flex flex-col gap-1'>
												<label
													aria-label={field.name}
													htmlFor={field.name}
													className='text-sm font-medium text-gray-500'
												>
													Last Name
												</label>
												<input
													type='text'
													aria-label={`${field.name} input`}
													name={field.name}
													id={field.name}
													value={field.state.value}
													onChange={(e) => field.handleChange(e.target.value)}
													className='w-full border-b border-gray-400 focus:border-transparent focus:ring-1 focus:ring-gray-400 focus:outline-none'
												/>
											</div>
										)}
									/>

									<form.Field
										name='phone'
										children={(field) => (
											<div className='flex flex-col gap-1'>
												<label
													aria-label={field.name}
													htmlFor={field.name}
													className='text-sm font-medium text-gray-500'
												>
													Phone
												</label>
												<input
													type='text'
													aria-label={`${field.name} input`}
													name={field.name}
													id={field.name}
													value={field.state.value}
													onChange={(e) => field.handleChange(e.target.value)}
													className='w-full border-b border-gray-400 focus:border-transparent focus:ring-1 focus:ring-gray-400 focus:outline-none'
												/>
											</div>
										)}
									/>
								</div>
							</div>
						</form>
					</>
				) : (
					<>
						<div className='mb-5 flex justify-between xl:mb-5'>
							<p className='font-medium sm:text-[1.1rem]'>
								Personal Information
							</p>
							<button
								onClick={() => handleEdit('personal')}
								className='flex cursor-pointer items-center rounded-lg border border-gray-500 px-2 py-0 transition-colors duration-300 hover:bg-black/5 xl:px-2 xl:py-1'
							>
								<span>Edit</span> <CiEdit />
							</button>
						</div>

						<div className='grid grid-cols-1 items-center gap-5 md:grid-cols-2 md:gap-10 xl:grid-cols-[350px_500px]'>
							<div className='flex flex-col gap-5 md:mb-0'>
								<div className='flex flex-col gap-1'>
									<p className='text-sm font-medium text-gray-500'>
										First Name
									</p>
									<p>{session.firstName || 'First Name'}</p>
								</div>

								<div className='flex flex-col gap-1'>
									<p className='text-sm font-medium text-gray-500'>
										Email Address
									</p>
									<p>{session.email}</p>
								</div>
							</div>

							<div className='flex flex-col gap-5'>
								<div className='flex flex-col gap-1'>
									<p className='text-sm font-medium text-gray-500'>Last Name</p>
									<p>{session.lastName || 'Last Name'}</p>
								</div>

								<div className='flex flex-col gap-1'>
									<p className='text-sm font-medium text-gray-500'>Phone</p>
									<p>{session.phone || 'Your Phone Here'}</p>
								</div>
							</div>
						</div>
					</>
				)}
			</div>

			{/* Address Information */}
			<div className='rounded-xl border border-gray-300 px-5 py-6 xl:mb-7'>
				<div className='mb-7 flex justify-between xl:mb-5'>
					<p className='font-medium sm:text-[1.1rem]'>Address</p>
				</div>

				<div className='grid grid-cols-1 items-center gap-5 md:grid-cols-2 md:gap-10 xl:grid-cols-[350px_500px]'>
					<div className='flex flex-col gap-5 md:mb-0'>
						<div className='flex flex-col gap-1'>
							<p className='text-sm font-medium text-gray-500'>House No.</p>
							<p>{userDefaultAddress?.houseNo || 'House Number'}</p>
						</div>

						<div className='flex flex-col gap-1'>
							<p className='text-sm font-medium text-gray-500'>City, Country</p>
							<p>
								{`${userDefaultAddress?.province || 'City'}, ${userDefaultAddress?.country || 'Country'}`}
							</p>
						</div>
					</div>

					<div className='flex flex-col gap-5'>
						<div className='flex flex-col gap-1'>
							<p className='text-sm font-medium text-gray-500'>
								Street/Province
							</p>
							<p>
								{`${userDefaultAddress?.street || 'Street'}, ${userDefaultAddress?.city || 'Province'}`}
							</p>
						</div>

						<div className='flex flex-col gap-1'>
							<p className='text-sm font-medium text-gray-500'>Postal</p>
							<p>{userDefaultAddress?.postal || 'Postal'}</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
