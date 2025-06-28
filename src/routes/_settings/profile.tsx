import { getUserSession } from '@/utils/servers/auth-server';
import { createFileRoute } from '@tanstack/react-router';
import { CiEdit } from 'react-icons/ci';

export const Route = createFileRoute('/_settings/profile')({
	component: Profile,
	loader: async () => {
		const session = await getUserSession();

		return {
			session,
		};
	},
});

function Profile() {
	const { session } = Route.useLoaderData();

	return (
		<div className='xl:px-8 xl:py-5'>
			<h2 className='text-xl font-bold xl:mb-7'>Profile</h2>

			{/* Profile Section */}
			<div className='relative flex w-full gap-5 rounded-xl border border-gray-300 px-5 py-6 xl:mb-7'>
				{/* Profile Image */}
				<div className='rounded-ful flex h-20 w-20 flex-shrink-0 items-center justify-center'>
					{session.image && (
						<img
							src={session.image}
							alt=''
							className='h-full w-full rounded-full object-cover'
						/>
					)}
				</div>

				{/* Profile Info */}
				<div className='flex flex-col'>
					<p className='font-medium'>{session.name}</p>
					<p className='font-light text-gray-500'>{session.email}</p>
					<p className='font-light text-gray-500'>Member</p>
				</div>

				{/* Edit Button */}
				<button className='absolute flex cursor-pointer items-center gap-1 rounded-lg border border-gray-500 px-2 py-1 transition-colors duration-300 hover:bg-black/5 xl:top-1/3 xl:right-5'>
					Edit
					<CiEdit />
				</button>
			</div>

			{/* Personal Information */}
			<div className='rounded-xl border border-gray-300 px-5 py-6 xl:mb-7'>
				{/* Title */}
				<div className='flex justify-between xl:mb-3'>
					<p className='font-medium'>Personal Information</p>
					<button className='flex cursor-pointer items-center rounded-lg border border-gray-500 px-2 py-1 transition-colors duration-300 hover:bg-black/5'>
						Edit <CiEdit />
					</button>
				</div>

				{/* Information */}
				<div className='grid grid-cols-[350px_500px] items-center'>
					<div className='flex flex-col gap-5'>
						<div className='flex flex-col gap-1'>
							<p className='text-sm font-medium text-gray-500'>First Name</p>
							<p>Anthony Frank</p>
						</div>

						<div className='flex flex-col gap-1'>
							<p className='text-sm font-medium text-gray-500'>Email Address</p>
							<p>{session.email}</p>
						</div>
					</div>

					<div className='flex flex-col gap-5'>
						<div className='flex flex-col gap-1'>
							<p className='text-sm font-medium text-gray-500'>Last Name</p>
							<p>Ordoñez</p>
						</div>

						<div className='flex flex-col gap-1'>
							<p className='text-sm font-medium text-gray-500'>Phone</p>
							<p>+63 123-456-7890</p>
						</div>
					</div>
				</div>
			</div>

			{/* Address Information */}
			<div className='rounded-xl border border-gray-300 px-5 py-6 xl:mb-7'>
				{/* Title */}
				<div className='flex justify-between xl:mb-3'>
					<p className='font-medium'>Address</p>
					<button className='flex cursor-pointer items-center rounded-lg border border-gray-500 px-2 py-1 transition-colors duration-300 hover:bg-black/5'>
						Edit <CiEdit />
					</button>
				</div>

				{/* Information */}
				<div className='grid grid-cols-[350px_500px] items-center'>
					<div className='flex flex-col gap-5'>
						<div className='flex flex-col gap-1'>
							<p className='text-sm font-medium text-gray-500'>House No.</p>
							<p>House Number</p>
						</div>

						<div className='flex flex-col gap-1'>
							<p className='text-sm font-medium text-gray-500'>Country</p>
							<p>Country</p>
						</div>
					</div>

					<div className='flex flex-col gap-5'>
						<div className='flex flex-col gap-1'>
							<p className='text-sm font-medium text-gray-500'>City/Province</p>
							<p>City, Province</p>
						</div>

						<div className='flex flex-col gap-1'>
							<p className='text-sm font-medium text-gray-500'>Postal</p>
							<p>Postal</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
