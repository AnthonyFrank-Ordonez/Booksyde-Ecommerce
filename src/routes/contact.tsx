import { ScrollFadeSection } from '@/components/ScrollFadeSection';
import { createFileRoute } from '@tanstack/react-router';
import { MdCall, MdEmail, MdPhoneAndroid } from 'react-icons/md';

export const Route = createFileRoute('/contact')({
	component: ContactUs,
});

function ContactUs() {
	return (
		<div className='col-span-1 md:col-span-12'>
			<section className='bg-gray-100'>
				<ScrollFadeSection className='relative h-[40rem] overflow-hidden md:min-h-screen'>
					<img
						src='https://picsum.photos/id/13/800/400'
						alt='ocean'
						className='object-fit h-full w-full'
					/>

					<div className='absolute inset-0 bg-gradient-to-b from-black/100 via-black/70 to-black/100'></div>

					<div className='absolute top-1/3 left-1/2 -translate-x-1/2 md:top-1/2'>
						<h2 className='text-center text-5xl font-bold text-white 2xl:text-7xl'>
							Contact Our Friendly Team
						</h2>
						<p className='mt-3 text-center text-xl font-light text-white md:text-2xl 2xl:text-4xl'>
							Let Us Know How Can We Help You
						</p>
					</div>
				</ScrollFadeSection>
			</section>

			<section>
				<ScrollFadeSection className='relative py-12'>
					<div className='absolute inset-0 flex items-center justify-center'>
						<div className='w-[50rem] border-t border-gray-300'></div>
					</div>
					<div className='relative flex justify-center text-xl'>
						<p className='bg-white px-2 text-gray-400'>
							Everything Will Be Solve, We Promise
						</p>
					</div>
				</ScrollFadeSection>

				<ScrollFadeSection className='flex flex-col flex-wrap md:flex-row'>
					<div className='flex flex-1 flex-col gap-3 border px-12 py-12'>
						<h2 className='text-4xl font-bold'>Contact Us</h2>
						<p className='text-md max-w-md font-light'>
							We are here to help you with any questions or concerns you may
							have. Please feel free to reach out to us using the contacts we
							have provided below.
						</p>

						<div className='flex flex-col gap-5 px-5 py-3'>
							<div className='flex items-center gap-2'>
								<MdCall size={18} />
								<p className='text-md font-normal'>+123 456-7890-901</p>
							</div>

							<div className='flex items-center gap-2'>
								<MdPhoneAndroid size={18} />
								<p className='text-md font-normal'>+123 456-7890-901</p>
							</div>

							<div className='flex items-center gap-2'>
								<MdEmail size={18} />
								<p className='text-md font-normal'>sampleemail@sample.com</p>
							</div>
						</div>
					</div>
					<div className='relative flex-1 border px-12 py-12'>
						<img src='' alt='' />
					</div>
				</ScrollFadeSection>
			</section>
		</div>
	);
}
