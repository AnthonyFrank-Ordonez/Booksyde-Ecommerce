import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import {
	getUserOrdersQueryOptions,
	useGetUserOrders,
} from '@/utils/servers/order';
import CustomSelect from '@/components/CustomSelect';

export const Route = createFileRoute('/_settings/orders')({
	beforeLoad: async ({ context }) => {
		const userId = context.userID!;

		await context.queryClient.ensureQueryData(
			getUserOrdersQueryOptions(userId)
		);

		return { userId };
	},
	component: RouteComponent,
});

function RouteComponent() {
	const { userId } = Route.useRouteContext();
	const { data: userOrders } = useGetUserOrders(userId);
	console.log('🚀 ~ RouteComponent ~ userOrders:', userOrders);

	// State for filters
	const [statusFilter, setStatusFilter] = useState('');
	const [categoryFilter, setCategoryFilter] = useState('');
	const [amountSort, setAmountSort] = useState('');

	// Helper to format date as 'Month, DD, YYYY'
	const formatDate = (dateString: string | Date) => {
		const date = dateString instanceof Date ? dateString : new Date(dateString);
		return date.toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'long',
			day: '2-digit',
		});
	};

	// Options for status dropdown
	const statusOptions = [
		{ value: '', label: 'All Status' },
		{ value: 'PENDING', label: 'Pending' },
		{ value: 'APPROAVED', label: 'Approved' },
		{ value: 'SHIPPED', label: 'Shipped' },
		{ value: 'DELIVERED', label: 'Delivered' },
		{ value: 'CANCELLED', label: 'Cancelled' },
	];

	// Options for category dropdown
	const categoryOptions = [
		{ value: '', label: 'View All' },
		{ value: 'BOOK', label: 'Book' },
		{ value: 'MANGA', label: 'Manga' },
		{ value: 'NOVEL', label: 'Novel' },
	];

	const amountSortOptions = [
		{ value: '', label: 'Default' },
		{ value: 'asc', label: 'Amount: Low to High' },
		{ value: 'desc', label: 'Amount: High to Low' },
	];

	return (
		<div className='px-4 py-3 md:px-7 md:py-5 xl:px-8 xl:py-5'>
			<h2 className='mb-3 text-xl font-bold md:mb-6 xl:mb-7'>Orders</h2>

			{/* Filter Section */}
			<div className='mb-5 grid grid-cols-1 gap-3 rounded-md border border-gray-300 p-7 lg:grid-cols-4'>
				<div className='flex flex-col gap-1'>
					<p className='text-sm font-medium'>Search for Order:</p>
					<input
						type='text'
						className='rounded-md border border-gray-300 px-3 py-1 hover:border-gray-400 focus:ring-1 focus:ring-black focus:outline-none'
						placeholder='Search'
					/>
				</div>

				<div className='flex flex-col gap-1'>
					<p className='text-sm font-medium'>Status:</p>
					<CustomSelect
						options={statusOptions}
						value={statusFilter}
						onChange={setStatusFilter}
						placeholder='All Status'
					/>
				</div>

				<div className='flex flex-col gap-1'>
					<p className='text-sm font-medium'>Category:</p>
					<CustomSelect
						options={categoryOptions}
						value={categoryFilter}
						onChange={setCategoryFilter}
						placeholder='All Statuses'
					/>
				</div>

				<div className='flex flex-col gap-1'>
					<p className='text-sm font-medium'>Amount:</p>
					<CustomSelect
						options={amountSortOptions}
						value={amountSort}
						onChange={setAmountSort}
						placeholder='Sort by Amount'
					/>
				</div>
			</div>

			<div className='mt-6 overflow-x-auto rounded-md border border-gray-200 bg-white'>
				<table className='min-w-full divide-y divide-gray-200'>
					<thead className='bg-gray-300'>
						<tr>
							<th className='px-4 py-4 text-left text-xs font-bold tracking-wider text-black uppercase'>
								Order Id
							</th>
							<th className='px-4 py-4 text-left text-xs font-bold tracking-wider text-black uppercase'>
								Status
							</th>
							<th className='px-4 py-4 text-left text-xs font-bold tracking-wider text-black uppercase'>
								Date
							</th>
							<th className='px-4 py-4 text-left text-xs font-bold tracking-wider text-black uppercase'>
								Amount
							</th>
							<th className='px-4 py-4 text-left text-xs font-bold tracking-wider text-black uppercase'></th>
						</tr>
					</thead>
					<tbody className='divide-y divide-gray-100 bg-white'>
						{userOrders.map((order) => (
							<tr
								key={order.id}
								className='transition-colors hover:bg-gray-200'
							>
								<td className='px-4 py-5 text-sm font-semibold text-gray-800'>
									{order.id}
								</td>
								<td className='px-4 py-5 text-xs font-medium'>
									<span className={`rounded-xl bg-black px-5 py-1 text-white`}>
										{order.status}
									</span>
								</td>
								<td className='px-4 py-5 text-sm font-semibold text-gray-700'>
									{formatDate(order.createdAt)}
								</td>
								<td className='px-4 py-5 text-sm font-semibold text-gray-400'>
									₱{order.totalAmount}
								</td>
								<td className='px-4 py-5 text-sm text-gray-700'>
									<button className='cursor-pointer rounded-xl bg-gray-800/50 px-3 py-1 text-white shadow-sm transition-colors hover:bg-gray-800/40 focus:ring-2 focus:ring-gray-400 focus:ring-offset-0 focus:outline-none'>
										View Items
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
}
