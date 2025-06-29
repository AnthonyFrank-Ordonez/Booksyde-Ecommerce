import { useForm } from '@tanstack/react-form';
import { createFileRoute } from '@tanstack/react-router';
import { FaPlus } from 'react-icons/fa';
import { useState } from 'react';

import FieldInfo from '@/components/FieldInfo';
import { AddressSchema } from '@/utils/zod';
import type { AddresFormObjType } from '@/types';

export const Route = createFileRoute('/_settings/address')({
	component: Address,
});

function Address() {
	const [isFormOpen, setFormOpen] = useState(false);
	const addressFormObj: AddresFormObjType[] = [
		{ label: 'House Number', name: 'houseNo', type: 'text' },
		{ label: 'City', name: 'city', type: 'text' },
		{ label: 'Province', name: 'province', type: 'text' },
		{ label: 'Country', name: 'country', type: 'text' },
		{ label: 'Postal', name: 'postal', type: 'text' },
		{
			label: 'Use as your default address',
			name: 'defaultAddress',
			type: 'radio',
		},
	];

	const handleFormClick = () => {
		setFormOpen(true);
	};

	const handleCancelForm = () => {
		setFormOpen(false);
	};

	const form = useForm({
		defaultValues: {
			houseNo: '',
			city: '',
			province: '',
			country: '',
			defaultAddress: false,
			postal: '',
		},
		validators: {
			onChange: AddressSchema,
		},
		onSubmit: async ({ value }) => {
			console.log('🚀 ~ onSubmit: ~ value:', value);
		},
	});

	return (
		<div className='px-4 py-3 md:px-7 md:py-5'>
			<button
				disabled={isFormOpen}
				onClick={handleFormClick}
				className={`flex w-full cursor-pointer items-center justify-center gap-1 rounded-lg border border-gray-400 py-2 transition-colors duration-300 hover:bg-black/3 ${isFormOpen && 'diabled hover:cursor-not-allowed'}`}
			>
				<FaPlus className='h-3 w-3' />
				<span className='font-light'>Add New Address</span>
			</button>

			{isFormOpen && (
				<div>
					<h2 className='mt-5 mb-5 text-2xl font-light'>Address Form</h2>

					<form
						onSubmit={(e) => {
							e.preventDefault();
							e.stopPropagation();
							form.handleSubmit();
						}}
					>
						{addressFormObj.map((obj) => {
							if (obj.type === 'text') {
								return (
									<form.Field
										key={obj.name}
										name={obj.name}
										children={(field) => (
											<>
												<label
													aria-label={field.name}
													htmlFor={field.name}
													className='mb-1 block font-medium'
												>
													{obj.label} <FieldInfo field={field} />
												</label>
												<input
													type='text'
													aria-label={`${field.name} input`}
													name={field.name}
													id={field.name}
													value={String(field.state.value)}
													onChange={(e) => field.handleChange(e.target.value)}
													required
													className='mb-3 w-full rounded-md border border-gray-400 px-2 py-1 focus:border-transparent focus:ring-1 focus:outline-none'
												/>
											</>
										)}
									/>
								);
							} else if (
								obj.type === 'radio' &&
								obj.name === 'defaultAddress'
							) {
								return (
									<form.Field
										key={obj.name}
										name='defaultAddress'
										children={(field) => (
											<div>
												<label
													aria-label={field.name}
													htmlFor={field.name}
													className='mt-1 mb-1 block font-medium'
												>
													Use as your default address?
												</label>

												<div className='mb-2 flex items-center gap-5'>
													<label className='flex items-center gap-1 text-lg'>
														<input
															type='radio'
															aria-label={`${field.name} input`}
															name={field.name}
															id={field.name}
															checked={field.state.value === true}
															onChange={() => field.handleChange(true)}
														/>
														Yes
													</label>

													<label className='flex items-center gap-1 text-lg'>
														<input
															type='radio'
															aria-label={`${field.name} input`}
															name={field.name}
															id={field.name}
															checked={field.state.value === false}
															onChange={() => field.handleChange(false)}
														/>
														No
													</label>
												</div>
											</div>
										)}
									/>
								);
							}
						})}

						<form.Subscribe
							selector={(state) => [state.canSubmit, state.isSubmitting]}
							children={([canSubmit, isSubmitting]) => (
								<div>
									<button
										type='submit'
										aria-label='submit address btn'
										disabled={!canSubmit || isSubmitting}
										className='mt-3 mb-3 w-full cursor-pointer rounded-lg bg-black px-4 py-2 font-medium text-white transition-colors duration-300 hover:bg-black/85 focus:ring-1 focus:ring-gray-700 focus:ring-offset-2 focus:outline-none'
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
											'Add Address'
										)}
									</button>
								</div>
							)}
						/>
					</form>

					<button
						onClick={handleCancelForm}
						className='w-full cursor-pointer rounded-lg border border-gray-500 px-4 py-2 font-medium transition-colors duration-300 hover:bg-gray-500/5 focus:ring-1 focus:ring-gray-700 focus:ring-offset-2 focus:outline-none'
					>
						Cancel
					</button>
				</div>
			)}
		</div>
	);
}
