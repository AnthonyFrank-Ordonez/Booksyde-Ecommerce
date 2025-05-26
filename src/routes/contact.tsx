import { ScrollFadeSection } from '@/components/ScrollFadeSection';
import { createFileRoute } from '@tanstack/react-router';
import { FaClock } from 'react-icons/fa';
import { FaLocationDot } from 'react-icons/fa6';
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
				<ScrollFadeSection className='relative mt-44 mb-44 py-12 md:mt-44 md:mb-44 2xl:mt-64 2xl:mb-64'>
					<div className='absolute inset-0 flex items-center justify-center'>
						<div className='w-84 border-t border-gray-300 md:w-[50rem]'></div>
					</div>
					<div className='text-md relative flex justify-center md:text-xl 2xl:text-2xl'>
						<p className='bg-white px-2 text-gray-400 2xl:px-5'>
							Everything Will Be Solve, We Promise
						</p>
					</div>
				</ScrollFadeSection>

				<ScrollFadeSection className='flex flex-col flex-wrap md:flex-row'>
					<div className='mb-20 flex flex-1 flex-col justify-center gap-3 px-12 py-12 md:mb-0'>
						<h2 className='text-4xl font-bold 2xl:text-6xl'>Contact Us</h2>
						<p className='text-md max-w-md font-light md:mt-3 md:mb-3 2xl:mt-5 2xl:max-w-2xl 2xl:text-xl 2xl:leading-8'>
							We are here to help you with any questions or concerns you may
							have. Please feel free to reach out to us using the contacts we
							have provided below.
						</p>

						<div className='flex flex-col gap-5 px-5 py-3 2xl:mt-5 2xl:gap-8'>
							<div className='flex items-center gap-3 2xl:gap-5'>
								<MdCall className='h-5 w-5 2xl:h-7 2xl:w-7' />
								<p className='text-md font-normal 2xl:text-xl'>
									+123 456-7890-901
								</p>
							</div>

							<div className='flex items-center gap-3 2xl:gap-5'>
								<MdPhoneAndroid className='h-5 w-5 2xl:h-7 2xl:w-7' />
								<p className='text-md font-normal 2xl:text-xl'>
									+123 456-7890-901
								</p>
							</div>

							<div className='flex items-center gap-3 2xl:gap-5'>
								<MdEmail className='h-5 w-5 2xl:h-7 2xl:w-7' />
								<p className='text-md font-normal 2xl:text-xl'>
									sampleemail@sample.com
								</p>
							</div>

							<div className='flex items-center gap-3 2xl:gap-5'>
								<FaLocationDot className='h-5 w-5 2xl:h-7 2xl:w-7' />
								<p className='text-md font-normal 2xl:text-xl'>
									1234. Example Street. PH
								</p>
							</div>

							<div className='flex items-center gap-3 2xl:gap-5'>
								<FaClock className='mb-5 h-5 w-5 2xl:h-7 2xl:w-7' />
								<div className='flex flex-col 2xl:text-xl'>
									<p className='text-md font-normal'>Monday - Friday</p>
									<p className='text-md font-normal'>8:00AM - 5:00PM</p>
								</div>
							</div>
						</div>
					</div>

					<div className='relative flex-1'>
						<div className='relative h-[45rem] overflow-hidden rounded-md 2xl:h-[60rem]'>
							<img
								src='https://picsum.photos/id/237/200/300'
								alt='dog'
								className='object-fit h-full w-full'
							/>

							<div className='absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black/80'></div>

							<div className='absolute right-0 bottom-0 left-0 p-4 text-white'>
								<h2 className='mb-1 text-4xl font-bold md:mb-2 2xl:text-5xl'>
									Stay Connected
								</h2>
								<p className='text-lg font-light 2xl:text-2xl'>
									We are always here to assist you with any inquiries or support
									you may need. Reach out to us through the contact information
									provided, and our team will be happy to help.
								</p>
							</div>
						</div>
					</div>
				</ScrollFadeSection>
			</section>
		</div>
	);
}
