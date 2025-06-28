import { createFileRoute, Link, Outlet } from '@tanstack/react-router';
import {
	MdOutlineAccountCircle,
	MdOutlinePayment,
	MdOutlineHome,
} from 'react-icons/md';

export const Route = createFileRoute('/_settings')({
	component: SettingsLayout,
});

function SettingsLayout() {
	return (
		<div className='col-span-1 bg-gray-100 md:col-span-12 xl:px-12 xl:py-5'>
			<h2 className='font-light xl:mb-5 xl:text-2xl'>Account Settings</h2>

			<div className='grid grid-cols-1 rounded-lg bg-white md:grid-cols-12'>
				<aside className='min-h-screen rounded-l-lg p-4 md:col-span-2 xl:border-r xl:border-r-gray-300'>
					<nav className='flex flex-col px-1 py-1 xl:space-y-2'>
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

				<div className='md:col-span-10'>
					<Outlet />
				</div>
			</div>
		</div>
	);
}
