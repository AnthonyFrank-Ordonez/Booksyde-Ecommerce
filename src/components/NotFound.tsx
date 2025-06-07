export function NotFound() {
	return (
		<div className='col-span-1 md:col-span-12'>
			<div className='mx-auto flex h-screen w-full max-w-md flex-col items-center justify-center gap-5 md:max-w-2xl'>
				<h1 className='text-5xl font-bold md:text-7xl'>404 NOT FOUND</h1>
				<p className='max-w-lg text-center text-lg font-normal'>
					The page you are looking for is not registered on our website. Please
					check the URL or return to our homepage.
				</p>
			</div>
		</div>
	);
}
