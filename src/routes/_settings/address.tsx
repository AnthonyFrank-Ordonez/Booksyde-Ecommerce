import { useForm } from '@tanstack/react-form';
import { createFileRoute } from '@tanstack/react-router';
import { FaPlus, FaTrash } from 'react-icons/fa';
import { useState } from 'react';
import { useSuspenseQuery } from '@tanstack/react-query';

import type {
	AddresFormObjType,
	AddressType,
	DeleteAddressObjType,
	UpdateAddressObjType,
} from '@/types';
import FieldInfo from '@/components/FieldInfo';
import { AddressSchema } from '@/utils/zod';
import {
	getUserAddQueryOptions,
	useAddAddress,
	useDeleteAddress,
	useUpdateDefaultAddress,
} from '@/utils/servers/address';
import ConfirmationModal from '@/components/ConfirmationModal';

export const Route = createFileRoute('/_settings/address')({
	component: Address,
	loader: async ({ context }) => {
		const userId = context.userID!;
		await context.queryClient.ensureQueryData(getUserAddQueryOptions(userId));

		return {
			userId,
		};
	},
});

function Address() {
	const { userId } = Route.useLoaderData();
	const userAddress = useSuspenseQuery(getUserAddQueryOptions(userId)).data;
	const { mutateAsync: addAddress } = useAddAddress();
	const { mutateAsync: updateAddress } = useUpdateDefaultAddress();
	const { mutateAsync: deleteAddress } = useDeleteAddress();
	const [isFormOpen, setFormOpen] = useState(false);
	const [showModal, setShowModal] = useState(false);
	const [typeModal, setTypeModal] = useState('');
	const [selectedAddressId, setSelectedAddressId] = useState<null | string>(
		null
	);
	const addressFormObj: Array<AddresFormObjType> = [
		{ label: 'House Number', name: 'houseNo', type: 'number' },
		{ label: 'Street', name: 'street', type: 'text' },
		{ label: 'City', name: 'city', type: 'text' },
		{ label: 'Province', name: 'province', type: 'text' },
		{ label: 'Country', name: 'country', type: 'text' },
		{ label: 'Postal', name: 'postal', type: 'number' },
		{
			label: 'Use as your default address',
			name: 'defaultAddress',
			type: 'radio',
		},
	];

	const handleShowForm = () => {
		setFormOpen(true);
	};

	const handleCancelForm = () => {
		setFormOpen(false);
	};

	const handleShowModal = (id: string, type: string) => {
		setSelectedAddressId(id);
		setTypeModal(type);
		setShowModal(true);
	};

	const handleNo = () => {
		setShowModal(false);
		setSelectedAddressId(null);
		setTypeModal('');
	};

	const handleChangeDefaultAddress = async () => {
		const updateAddressObj: UpdateAddressObjType = {
			userId: userId,
			addressId: selectedAddressId,
		};

		await updateAddress({ data: updateAddressObj });

		setShowModal(false);
		setSelectedAddressId(null);
		setTypeModal('');
	};

	const handleDeleteAddress = async () => {
		const addressToBeDeleted: DeleteAddressObjType = {
			userId: userId,
			addressId: selectedAddressId,
		};

		await deleteAddress({ data: addressToBeDeleted });

		setShowModal(false);
		setSelectedAddressId(null);
		setTypeModal('');
	};

	const form = useForm({
		defaultValues: {
			houseNo: 0,
			street: '',
			city: '',
			province: '',
			country: '',
			defaultAddress: false,
			postal: 0,
		},
		validators: {
			onChange: AddressSchema,
		},
		onSubmit: async ({ value }) => {
			const AddressObj: AddressType = { ...value, userId: userId };
			await addAddress({ data: AddressObj });

			form.reset();
			setFormOpen(false);
		},
	});

	return (
		<div className='px-4 py-3 md:px-7 md:py-5'>
			{userAddress
				.sort((add1, add2) => +add2.defaultAddress - +add1.defaultAddress)
				.map((addresses) => (
					<div
						key={addresses.id}
						className='mb-3 w-full rounded-lg border border-gray-400 px-4 py-5'
					>
						<div className='flex flex-col gap-2 md:flex-row md:items-center md:justify-between'>
							<h2 className='text-[0.95rem] font-light'>
								• {addresses.houseNo} {addresses.street}, {addresses.city},{' '}
								{addresses.province}, {addresses.country}, {addresses.postal}
							</h2>

							{addresses.defaultAddress ? (
								<button
									disabled
									className='rounded-full bg-green-300 px-1 py-2 text-xs font-medium text-black md:px-3 md:py-1 md:text-sm'
								>
									Default address
								</button>
							) : (
								<div className='flex items-center gap-2'>
									<button
										onClick={() => handleShowModal(addresses.id, 'update')}
										className='w-full cursor-pointer rounded-full border bg-black px-3 py-2 text-xs text-white transition-colors duration-300 hover:bg-black/80 md:py-1 md:text-sm'
									>
										Set as default address
									</button>
									<button
										onClick={() => handleShowModal(addresses.id, 'delete')}
									>
										<FaTrash className='h-4.5 w-4.5 cursor-pointer md:h-4 md:w-4' />
									</button>
								</div>
							)}
						</div>
					</div>
				))}

			{showModal && typeModal === 'update' && (
				<ConfirmationModal
					message='Do you want to set it as your default address'
					confirmFn={handleChangeDefaultAddress}
					cancelFn={handleNo}
				/>
			)}

			{showModal && typeModal === 'delete' && (
				<ConfirmationModal
					message='Do you want to delete this address'
					confirmFn={handleDeleteAddress}
					cancelFn={handleNo}
				/>
			)}

			<button
				disabled={isFormOpen}
				onClick={handleShowForm}
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
							} else if (obj.type === 'number') {
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
													type='number'
													aria-label={`${field.name} input`}
													name={field.name}
													id={field.name}
													value={String(field.state.value)}
													onChange={(e) =>
														field.handleChange(Number(e.target.value))
													}
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
