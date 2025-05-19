export function NotFound() {
	return (
		<div className='col-span-1 md:col-span-8'>
			<div className='flex flex-col max-w-md md:max-w-2xl h-screent w-full h-screen mx-auto justify-center items-center gap-5'>
				<h1 className='font-bold text-5xl md:text-7xl'>404 NOT FOUND</h1>
				<p className='font-normal text-lg text-center max-w-lg'>
					The page you are looking for is not registered on our website. Please
					check the URL or return to the homepage.
				</p>
			</div>
		</div>
	);
}
