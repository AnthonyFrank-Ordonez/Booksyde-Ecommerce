import { Link } from '@tanstack/react-router';
import { FaBars, FaShoppingCart, FaUser } from 'react-icons/fa';
import { IoMdClose } from 'react-icons/io';
import { AnimatePresence, motion } from 'motion/react';
import { useState } from 'react';
// import { useSession, signOut } from '@/utils/auth-client for client-side';
import type { SessionType } from '@/types';

import { useServerFn } from '@tanstack/react-start';
import { signOutUserFn } from '@/utils/servers/user';

interface HeaderProps {
	session: {
		id: string | undefined;
		name: string | undefined;
		image: string | null | undefined;
		email: string | undefined;
	};
}

export default function Header({ session }: HeaderProps) {
	// const { data: session } = useSession() for client-side;
	const signOutUser = useServerFn(signOutUserFn);
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	const isEmpty = (session: SessionType) => {
		if (Object.keys(session).length === 0) return true;
		if (Object.values(session).some((val) => val === undefined)) return true;
	};

	return (
		<motion.header
			className='w-full'
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 0.6, ease: 'easeInOut' }}
		>
			<nav className='flex items-center justify-between px-6 py-4 shadow'>
				<div className='flex items-center'>
					<span className='text-xl font-semibold text-black'>Booksyde</span>
				</div>

				<div className='hidden items-center space-x-8 text-black md:flex'>
					<Link
						to='/'
						aria-label='Home'
						className='hover:underline'
						activeProps={{ className: 'font-bold hover:underline' }}
					>
						Home
					</Link>
					<Link
						to='/about'
						aria-label='About'
						className='hover:underline'
						activeProps={{ className: 'font-bold hover:underline' }}
					>
						About
					</Link>
					<Link
						to='/products'
						aria-label='Products'
						className='hover:underline'
						activeProps={{ className: 'font-bold hover:underline' }}
					>
						Products
					</Link>
					<Link
						to='/contact'
						aria-label='Contact'
						className='hover:underline'
						activeProps={{ className: 'font-bold hover:underline' }}
					>
						Contact
					</Link>
				</div>

				<div className='flex items-center space-x-4'>
					{!session || isEmpty(session) ? (
						<Link
							to='/signin'
							aria-label='login'
							className='cursor-pointer rounded-full border bg-black px-5 py-1 font-medium text-white'
						>
							Login
						</Link>
					) : (
						<>
							<div className='group relative'>
								<Link
									to='/'
									aria-label='Account'
									className='hidden items-center space-x-1 text-black hover:text-gray-600 sm:flex'
								>
									<FaUser />
									<span className='hidden md:inline'>Account</span>
								</Link>

								<div className='invisible absolute right-0 z-50 mt-2 w-auto max-w-sm min-w-[12rem] rounded-md bg-white py-1 opacity-0 shadow-lg transition-all duration-300 group-hover:visible group-hover:opacity-100'>
									<div className='absolute -top-2 h-2 w-full'></div>
									<div className='border-b border-gray-100 px-4 py-3'>
										<div className='flex items-center space-x-3'>
											<div className='flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-gray-200'>
												{session?.image ? (
													<img
														src={session.image}
														alt={`${session.name || 'User'}'s profile`}
														className='h-full w-full rounded-full object-cover'
													/>
												) : (
													<FaUser className='text-gray-600' />
												)}
											</div>
											<div className='min-w-0 flex-grow'>
												<p className='truncate font-medium text-gray-800'>
													{session?.name}
												</p>
												<p className='truncate text-sm text-gray-500'>
													{session?.email}
												</p>
											</div>
										</div>
									</div>
									<Link
										to='/'
										aria-label='Your Profile'
										className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'
									>
										Your Profile
									</Link>
									<Link
										to='/profile'
										aria-label='Settings'
										className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'
									>
										Settings
									</Link>
									<button
										onClick={() => signOutUser()}
										aria-label='signOut'
										className='block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100'
									>
										Sign out
									</button>
								</div>
							</div>

							<Link
								to='/'
								aria-label='Cart'
								className='flex items-center space-x-1 text-black hover:text-gray-600'
							>
								<FaShoppingCart />
								<span className='hidden md:inline'>Cart (0)</span>
							</Link>
						</>
					)}

					{/* Burger Icon */}
					<button
						aria-label='Menu'
						className='cursor-pointer text-black hover:text-gray-600 md:hidden'
						onClick={() => setIsMenuOpen(!isMenuOpen)}
					>
						<div className='relative'>
							<motion.div
								initial={false}
								animate={{
									opacity: isMenuOpen ? 0 : 1,
									rotate: isMenuOpen ? 45 : 0,
								}}
								transition={{ duration: 0.3 }}
								style={{
									position: isMenuOpen ? 'absolute' : 'relative',
									top: 0,
									left: 0,
								}}
							>
								<FaBars size={18} />
							</motion.div>

							<motion.div
								initial={false}
								animate={{
									opacity: isMenuOpen ? 1 : 0,
									rotate: isMenuOpen ? 0 : -45,
								}}
								transition={{ duration: 0.3 }}
								style={{
									position: isMenuOpen ? 'relative' : 'absolute',
									top: 0,
									left: 0,
								}}
							>
								<IoMdClose size={24} />
							</motion.div>
						</div>
					</button>
				</div>
			</nav>

			{/* Menu Nav */}
			<AnimatePresence>
				{isMenuOpen && (
					<motion.div
						className='bg-white shadow-md md:hidden'
						initial={{ opacity: 0, height: 0 }}
						animate={{ opacity: 1, height: 'auto' }}
						exit={{ opacity: 0, height: 0 }}
						transition={{ duration: 0.3 }}
					>
						<div className='flex flex-col space-y-5 px-6 py-2'>
							<Link
								to='/'
								className='font-medium'
								activeProps={{
									className: 'font-bold underline',
								}}
							>
								Home
							</Link>
							<Link
								to='/about'
								className='font-medium'
								activeProps={{
									className: 'font-bold underline',
								}}
							>
								About
							</Link>
							<Link
								to='/products'
								className='font-medium'
								activeProps={{
									className: 'font-bold underline',
								}}
							>
								Products
							</Link>
							<Link
								to='/contact'
								className='font-medium'
								activeProps={{
									className: 'font-bold underline',
								}}
							>
								Contact
							</Link>

							<Link
								to='/'
								className='font-medium'
								activeProps={{
									className: 'font-bold underline',
								}}
							>
								Account
							</Link>
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</motion.header>
	);
}
