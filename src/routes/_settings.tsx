import {
	createFileRoute,
	Link,
	Outlet,
	redirect,
} from '@tanstack/react-router';
import {
	MdOutlineAccountCircle,
	MdOutlinePayment,
	MdOutlineHome,
	MdOutlineShoppingBag,
} from 'react-icons/md';

export const Route = createFileRoute('/_settings')({
	component: SettingsLayout,
	beforeLoad: async ({ context }) => {
		if (!context.userID) return redirect({ to: '/signin' });
	},
});

function SettingsLayout() {
	return (
		<div className='col-span-1 bg-gray-100 px-5 py-5 md:col-span-12 xl:px-12 xl:py-5'>
			<h2 className='mb-3 text-xl font-light xl:mb-5 xl:text-2xl'>
				Account Settings
			</h2>

			<div className='mb-10 grid grid-cols-4 gap-3 bg-white px-5 py-3 md:hidden'>
				<Link
					to='/profile'
					className='flex flex-col items-center rounded-md border py-2'
					activeProps={{ className: 'bg-black text-white' }}
				>
					<MdOutlineAccountCircle className='h-5 w-5' />
					<span className='text-sm'>Profile</span>
				</Link>

				<Link
					to='/orders'
					className='flex flex-col items-center rounded-md border py-2'
					activeProps={{ className: 'bg-black text-white' }}
				>
					<MdOutlineShoppingBag className='h-5 w-5' />
					<span className='text-sm'>Orders</span>
				</Link>

				<Link
					to='/address'
					className='flex flex-col items-center rounded-md border py-2'
					activeProps={{ className: 'bg-black text-white' }}
				>
					<MdOutlineHome className='h-5 w-5' />
					<span className='text-sm'>Address</span>
				</Link>

				<Link
					to='/billing'
					className='flex flex-col items-center rounded-md border py-2'
					activeProps={{ className: 'bg-black text-white' }}
				>
					<MdOutlinePayment className='h-5 w-5' />
					<span className='text-sm'>Billing</span>
				</Link>
			</div>

			<div className='grid-cols-1 rounded-lg bg-white md:grid md:grid-cols-12'>
				<aside className='hidden min-h-screen rounded-l-lg p-4 md:col-span-2 md:block xl:border-r xl:border-r-gray-300'>
					<nav className='flex flex-col px-1 py-1 xl:space-y-2'>
						{/* Profile */}
						<Link
							to='/profile'
							className='flex items-center rounded-full px-2 py-2 transition-colors duration-300 hover:bg-gray-300/30 xl:gap-2'
							activeProps={{
								className: 'bg-gray-300/30 rounded-full w-full',
							}}
						>
							<MdOutlineAccountCircle className='xl:h-5 xl:w-5' />
							<span className=''>Profile</span>
						</Link>

						{/* Orders */}
						<Link
							to='/orders'
							className='flex items-center rounded-full px-2 py-2 transition-colors duration-300 hover:bg-gray-300/30 xl:gap-2'
							activeProps={{
								className: 'bg-gray-300/30 rounded-full w-full',
							}}
						>
							<MdOutlineShoppingBag className='xl:h-5 xl:w-5' />
							<span className=''>Orders</span>
						</Link>

						{/* Address */}
						<Link
							to='/address'
							className='flex items-center rounded-full px-2 py-2 transition-colors duration-300 hover:bg-gray-300/30 xl:gap-2'
							activeProps={{
								className: 'bg-gray-300/30 rounded-full w-full',
							}}
						>
							<MdOutlineHome className='xl:h-5 xl:w-5' />
							<span className=''>Address</span>
						</Link>

						{/* Billing */}
						<Link
							to='/billing'
							className='flex items-center rounded-full px-2 py-2 transition-colors duration-300 hover:bg-gray-300/30 xl:gap-2'
							activeProps={{
								className: 'bg-gray-300/30 rounded-full w-full',
							}}
						>
							<MdOutlinePayment className='xl:h-5 xl:w-5' />
							<span className=''>Billing</span>
						</Link>
					</nav>
				</aside>

				<div className='col-span-1 md:col-span-10'>
					<Outlet />
				</div>
			</div>
		</div>
	);
}
