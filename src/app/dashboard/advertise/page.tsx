'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Suspense, useState } from 'react'
import { MdOutlineKeyboardArrowLeft } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'
import { socialMenu } from '../../../components/data/SocialData'
import socialPlatforms from '../../../components/data/assets'
import { selectUser } from '../../../redux/slices/authSlice'

interface SocialMenu {
	title: string
	price: number
	descAd: string
	value: string
	icon: string
}

interface Asset {
	asset: string
	SC: string
	CostToOrder: number
}

interface SocialPlatform {
	assetplatform: string
	assets: Asset[]
}

const Advertise = () => {
	const router = useRouter()
	const dispatch = useDispatch()
	const user = useSelector(selectUser)
	const [platformName, setPlatformName] = useState<string>('')
	const [toggleServices, setToggleServices] = useState<boolean>(false)
	const [selectedPlatformObject, setSelectedPlatformObject] = useState<
		SocialPlatform | undefined
	>()

	const handleSelect = (
		e: React.MouseEvent<HTMLButtonElement>,
		platform: string,
	) => {
		e.preventDefault()

		setPlatformName(platform)
		setToggleServices(!toggleServices)

		const servicesList = socialPlatforms?.find(
			(object) => object?.assetplatform === platform,
		)
		setSelectedPlatformObject(servicesList)
	}

	const handleSelectService = (
		e: React.MouseEvent<HTMLLIElement>,
		service: string,
		adTitle: string,
	) => {
		e.preventDefault()

		router.push(
			`/dashboard/ad-buy/${platformName}?service=${service}&adTitle=${adTitle}`,
		)
	}

	return (
		<Suspense>
			<div className='w-full min-h-screen pb-40'>
				<div className='justify-between mx-auto md:mr-5'>
					<div className='flex items-center gap-3 border-b border-gray-200 py-5'>
						<MdOutlineKeyboardArrowLeft
							className='cursor-pointer'
							size={30}
							onClick={() => router.back()}
						/>

						<div className='flex flex-col'>
							<p className='font-semibold text-xl text-gray-700'>
								Create a Task Campaign to Advertise
							</p>
							<small className='font-medium text-gray-500'>
								Click <span className='text-secondary'>here</span> to see and
								monitor your adverts
							</small>
						</div>
					</div>

					<div className='flex items-center gap-3 border-b border-gray-200'>
						<p className='font-normal text-[14px] text-gray-700 p-6'>
							Get people with at least 1000 active followers to repost your
							adverts and perform certain social tasks for you on their social
							media accounts. Select the type of task you want people to perform
							below:
						</p>
					</div>

					<div className='grid md:grid-cols-3 gap-[3rem] items-center justify-center mt-[1rem] px-3 py-5'>
						{socialMenu.map((menu: any, index: number) => (
							<div key={index} className='w-fit md:w-full shadow p-5'>
								<div className='flex flex-row items-center gap-5'>
									<div className='flex flex-col'>
										<div className='flex items-center justify-center w-[100px] h-[100px] bg-gray-50 rounded-t-xl rounded-b-2xl'>
											<Image
												src={menu.icon}
												alt=''
												className='object-cover h-16 w-16 rounded-full p-2'
											/>
										</div>
										<button
											onClick={(e) => handleSelect(e, menu.value)}
											className='text-xs py-2 border border-gray-200 mt-5'>
											Select
										</button>
									</div>

									<div className='w-full'>
										<div className='flex flex-col md:flex-row md:justify-between md:items-center md:border-b md:border-gray-100'>
											<div className='flex flex-col w-full md:w-[70%]'>
												<h3 className='font-bold text-[20px] text'>
													{menu.title}
												</h3>
												<p className='border-b border-gray-100 pb-3 text-[14px] text-gray-500 font-medium'>
												 ₦{menu.price}/Task Performed
												</p>
											</div>
										</div>
										<p className='font-normal text-[14px] text-gray-700 mt-3'>
											{menu?.descAd}
										</p>
									</div>
								</div>
								<div className='absolute bg-white space-y-4 border   max-h-72  overflow-scroll'>
									{selectedPlatformObject?.assetplatform === menu.value &&
									toggleServices ? (
										<ul className=' mt-2 overflow-scroll rounded-sm absolute z-100 pb-2'>
											{selectedPlatformObject?.assets?.map(
												(service: Asset, index: number) => (
													<li
														key={index}
														onClick={(e) =>
															handleSelectService(e, service?.asset, service.SC)
														}
														className='flex cursor-pointer hover:bg-gray-300 px-4 items-center text-sm gap-3 border-b border-gray-50 py-2 '>
														<p>{service.SC}</p>
														<span className='bg-gray-50 rounded-full p-3'>
															₦{service.CostToOrder}
														</span>
													</li>
												),
											)}
										</ul>
									) : (
										''
									)}
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</Suspense>
	)
}

export default Advertise
