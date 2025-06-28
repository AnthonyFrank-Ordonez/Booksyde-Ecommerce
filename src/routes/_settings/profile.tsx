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
		<div className='px-4 py-3 xl:px-8 xl:py-5'>
			<h2 className='mb-3 text-xl font-bold xl:mb-7'>Profile</h2>

			{/* Profile Section */}
			<div className='relative mb-5 flex w-full flex-col gap-5 rounded-xl border border-gray-300 px-5 py-6 md:flex-row xl:mb-7'>
				{/* Profile Image */}
				<div className='flex h-35 w-35 flex-shrink-0 items-center justify-center rounded-full xl:h-20 xl:w-20'>
					{session.image && (
						<img
							src={session.image}
							alt=''
							className='h-full w-full rounded-full object-cover'
						/>
					)}
				</div>

				{/* Profile Info */}
				<div className='flex flex-col gap-0.5'>
					<p className='text-[1.2rem] font-medium'>{session.name}</p>
					<p className='text-[1rem] font-light text-gray-500'>
						{session.email}
					</p>
					<p className='text-[1rem] font-light text-gray-500'>Member</p>
				</div>

				{/* Edit Button */}
				<button className='absolute top-3 right-3 flex cursor-pointer items-center gap-1 rounded-lg border border-gray-500 px-2 py-0 transition-colors duration-300 hover:bg-black/5 xl:top-1/3 xl:right-5 xl:px-2 xl:py-1'>
					<span>Edit</span>
					<CiEdit />
				</button>
			</div>

			{/* Personal Information */}
			<div className='mb-5 rounded-xl border border-gray-300 px-5 py-6 xl:mb-7'>
				{/* Title */}
				<div className='mb-5 flex justify-between xl:mb-3'>
					<p className='font-medium'>Personal Information</p>
					<button className='flex cursor-pointer items-center rounded-lg border border-gray-500 px-2 py-0 transition-colors duration-300 hover:bg-black/5 xl:px-2 xl:py-1'>
						<span>Edit</span> <CiEdit />
					</button>
				</div>

				{/* Information */}
				<div className='grid grid-cols-1 items-center md:grid-cols-[350px_500px]'>
					<div className='mb-7 flex flex-col gap-5 md:mb-0'>
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
				<div className='mb-7 flex justify-between xl:mb-3'>
					<p className='font-medium'>Address</p>
					<button className='flex cursor-pointer items-center rounded-lg border border-gray-500 px-2 py-0 transition-colors duration-300 hover:bg-black/5 xl:px-2 xl:py-1'>
						<span>Edit</span> <CiEdit />
					</button>
				</div>

				{/* Information */}
				<div className='grid grid-cols-1 items-center md:grid-cols-[350px_500px]'>
					<div className='mb-7 flex flex-col gap-5 md:mb-0'>
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
