// 'use client'

// import { services } from '@/components/data/servicesList'
// import Image from 'next/image'
// import { Suspense } from 'react'
// import { CheckmarkIcon } from 'react-hot-toast'
// import { AiOutlineHolder } from 'react-icons/ai'

// const ServicesPage = () => {
// 	return (
// 		<Suspense>
// 			<section className='w-full h-fit mb-5'>
// 				<div className='flex flex-col justify-center mx-auto gap-[3rem]'>
// 					<div className='w-full h-full py-[3rem] mt-[3rem] flex flex-col items-center justify-center mx-auto'>
// 						<h3 className='text-[#0F1741] px-6 text-[30px] md:text-[38px] mb-[5px] font-bold text-center'>
// 							Our Services
// 						</h3>
// 						<p className='flex text-[18px] text-center mx-[1rem] w-fit md:w-[800px] text-gray-600 leading-[1.5]'>
// 							We reward our Clients/Advertisers with good services while
// 							upholding all our core values. As a ‘people-first’ brand, here are
// 							some carefully curated services offered by BeLocated
// 						</p>
// 					</div>

// 					<div className='w-full h-fit flex justify-center bg-blue-50 py-[3rem]'>
// 						<div className='services-list flex flex-wrap w-fit md:w-[80%] h-fit px-[3rem] md:px-0'>
// 							{services?.map((item, index) => (
// 								<div
// 									key={index}
// 									className='w-1/2 min-w-[400px] py-6 px-[1.5rem] md:px-0'>
// 									<div className='flex items-center gap-2'>
// 										<div>
// 											<Image
// 												src={item?.icon}
// 												alt='social Icon'
// 												className='w-[25px] h-[25px] rounded-full'
// 											/>
// 										</div>

// 										<h1 className='text-[25px] font-bold leading-[1.4em]'>
// 											{item?.service}
// 										</h1>
// 										<AiOutlineHolder className='rotate-90 text-2xl text-tertiary' />
// 									</div>
// 									<p className='w-fit md:w-[450px] mt-1 text-[18px] my-6'>
// 										{item?.desc}
// 									</p>

// 									{item.assets?.map((asset, assetIndex) => (
// 										<ul key={assetIndex} className='my-6'>
// 											<li className='flex items-center gap-1'>
// 												<CheckmarkIcon />
// 												{asset}
// 											</li>
// 										</ul>
// 									))}
// 								</div>
// 							))}
// 						</div>
// 					</div>
// 				</div>
// 			</section>
// 		</Suspense>
// 	)
// }

// export default ServicesPage

'use client'

import { services } from '@/components/data/servicesList'
import Image from 'next/image'
import { useState } from 'react'
import { AiOutlineHolder } from 'react-icons/ai'

const ServicesPage = () => {
	const [activeIndex, setActiveIndex] = useState<number | null>(null)

	const toggleService = (index: number) => {
		setActiveIndex(activeIndex === index ? null : index) // Toggle open/close
	}

	return (
		<section className='w-full h-fit mb-5'>
			<div className='flex flex-col justify-center mx-auto gap-[2rem]'>
				<div className='w-full h-full py-[2rem] mt-[2rem] flex flex-col items-center justify-center mx-auto'>
					<h3 className='text-[#0F1741] px-6 text-[30px] md:text-[38px] mb-[5px] font-bold text-center'>
						Our Services
					</h3>
					<p className='flex text-[18px] text-center mx-[1rem] w-fit md:w-[800px] text-gray-600 leading-[1.5]'>
						We reward our Clients/Advertisers with good services while upholding all our core values. As a ‘people-first’ brand, here are some carefully curated services offered by BeLocated
					</p>
				</div>

				<div className='w-full h-fit flex justify-center bg-blue-50 py-[3rem]'>
					<div className='services-list flex flex-wrap w-full md:w-[80%] h-fit px-[3rem] md:px-0'>
						{services?.map((item, index) => (
							<div
								key={index}
								className='w-full md:w-1/2 px-[1.5rem] py-6'>
								<div
									className='flex items-center justify-between gap-2 cursor-pointer'
									onClick={() => toggleService(index)}>
									<div className='flex items-center gap-2'>
										<Image
											src={item?.icon}
											alt='Service Icon'
											className='w-[25px] h-[25px] rounded-full'
										/>
										<h1 className='text-[22px] font-bold leading-[1.4em]'>
											{item?.service}
										</h1>
									</div>
									<AiOutlineHolder
										className={`text-2xl text-tertiary transition-transform ${
											activeIndex === index ? 'rotate-0' : 'rotate-90'
										}`}
									/>
								</div>

								{/* Only show content if active */}
								{activeIndex === index && (
									<div className='mt-4'>
										<p className='text-[16px] text-gray-700'>
											{item?.desc}
										</p>

										<ul className='mt-4'>
											{item.assets?.map((asset, assetIndex) => (
												<li
													key={assetIndex}
													className='flex items-center gap-2'>
													<span className='text-[16px] text-gray-600'>{asset}</span>
												</li>
											))}
										</ul>
									</div>
								)}
							</div>
						))}
					</div>
				</div>
			</div>
		</section>
	)
}

export default ServicesPage

