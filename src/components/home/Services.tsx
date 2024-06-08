import React from 'react'
import adRoi from '@/assets/adRoi.svg'
import money from '@/assets/money.png'
import roi from '@/assets/roi.png'
import Image from 'next/image'

const Services = () => {
	return (
		<section className='w-full bg-secondary pt-10'>
			<div className='container mx-auto leading-[1.2]  mt-12'>
				<h3 className='text-xl md:text-3xl text-primary font-extrabold border-l-4 px-4 border-red-400 '>
					WITH BELOCATED, EVERYONE IS A WINNER <br /> It's all about reward!
				</h3>

				<p className='flex text-[15px] mx-[1rem] w-fit md:w-[900px] mt-[1em] text-primary leading-[1.5]'>
					We prioritize our Clients/Advertisers with excellent services and
					uphold our core values.
					<br /> We also offer Earners opportunities to be rewarded for tasks on
					Belocated.
					<br /> Our users come first, ensuring everyone gets more than
					expected.
				</p>
				<hr className='my-36 opacity-30' />

				<div className='flex flex-col items-center justify-between gap-2 md:flex-row'>
					<div className=' h-[400px] px-[2rem] flex flex-col gap-2 text-primary rounded-2xl '>
						<div className='w-[70px] h-fit  bg-primary-light p-4 rounded-full mb-4'>
							<Image
								src={roi}
								alt='Advert ROI'
								className='w-full h-full object-cover'
							/>
						</div>
						<h2 className='text-[20px] font-[700] leading-[1.4em] '>
							Massive ROI On Adverts
						</h2>
						<p className=''>
							A guaranteed quick & positive return on your business publicity
							investment. Monitor the progress of your order from your
							dashboard. Transparency + Speed + Efficiency = BeLocated ROI
						</p>
					</div>

					<div className=' h-[400px] px-[2rem] flex flex-col gap-2 text-primary rounded-2xl '>
						<div className='w-[70px] h-fit  bg-primary-light p-4 rounded-full mb-4'>
							<Image
								src={adRoi}
								alt='Advert ROI'
								className='w-full h-full object-cover'
							/>
						</div>
						<h2 className='text-[20px] font-[700] leading-[1.4em]'>
							Affordable Pricing
						</h2>
						<p className=''>
							Get reliable publicity packages at very affordable rates. You can
							dictate the budget and details of your campaign with just few
							clicks. Are you in doubt? A trial will convince you and get you
							hooked
						</p>
					</div>

					<div className=' h-[400px] px-[2rem] flex flex-col gap-2 text-primary rounded-2xl '>
						<div className='w-[70px] h-fit bg-primary-light p-4 rounded-full mb-4'>
							<Image
								src={money}
								alt='Advert ROI'
								className='w-full h-full object-cover'
							/>
						</div>
						<h2 className='text-[20px] font-[700] leading-[1.4em]'>
							Earn Steady Income
						</h2>
						<p className=''>
							BeLocated rewards you for media tasks, regardless of your status.
							With just a mobile device and data, you can earn steadily on our
							platform.
						</p>
					</div>
				</div>
			</div>
		</section>
	)
}

export default Services
