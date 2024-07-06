'use client'

import { toIntlCurrency } from '@/utils'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Suspense, useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import { MdOutlineKeyboardArrowLeft } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'
import { socialMenu } from '../../../components/data/SocialData'
import socialPlatforms from '../../../components/data/assets'
import useRedirectLoggedOutUser from '../../../customHook/useRedirectLoggedOutUser'
import {
	handleGetALLUserAdverts,
	selectAllAdverts,
	selectIsError,
	selectIsLoading,
	selectIsSuccess,
} from '../../../redux/slices/advertSlice'
import { selectUser } from '../../../redux/slices/authSlice'

interface Advert {
	_id: string
	status: string
	desiredROI: number
	platform: string
	isFree: boolean
	service: string
}

interface SocialMenu {
	title: string
	earn: number
	desc: string
	value: string
	icon: string
}

interface Asset {
	asset: string
	TD: string
	verification: string
}

interface SocialPlatform {
	assetplatform: string
	assets: Asset[]
}

const Earn = () => {
	const router = useRouter()
	const adverts: Advert[] = useSelector(selectAllAdverts)
	const dispatch = useDispatch()
	const isLoading: boolean = useSelector(selectIsLoading)
	const isError: boolean = useSelector(selectIsError)
	const isSuccess: boolean = useSelector(selectIsSuccess)
	const [toggleServices, setToggleServices] = useState(false)
	const [selectedPlatformObject, setSelectedPlatformObject] = useState<
		SocialPlatform | undefined
	>()
	const user = useSelector(selectUser)
	const [finalFilteredTasks, setFinalFilteredTasks] = useState<Advert[]>([])
	const [selectedPlatformAds, setSelectedPlatformAds] = useState<
		Advert[] | undefined
	>()
	const [platformName, setPlatformName] = useState<string>('')
	useRedirectLoggedOutUser('/login')
	const [taskList, setTaskList] = useState<Advert[] | undefined>()
	const [theSortedSocials, setTheSortedSocials] = useState<any[] | undefined>()

	useEffect(() => {
		async function getAdverts() {
			dispatch(handleGetALLUserAdverts() as any)
		}

		getAdverts()

		if (isError) {
			toast.error('Failed to retrieve adverts, please reload page')
			router.back()
		}
	}, [dispatch])

	useEffect(() => {
		// Get the list of only adverts that are still running
		const runningAdsList = adverts?.filter(
			(ad) =>
				ad.status !== 'Completed' &&
				ad.status !== 'Pending Payment' &&
				ad.desiredROI === 0,
		)

		// Check if task performer is still eligible for free tasks so he will see only the adverts that are marked as free. If not, he will see paid adverts
		if (user?.freeTaskCount > 0) {
			setTaskList(runningAdsList)
		}

		if (user?.freeTaskCount === 0) {
			const paidAdverts = runningAdsList?.filter((advert) => !advert.isFree)
			setTaskList(paidAdverts)
		}

		// Calculate the number of tasks for each platform
		const platformsWithTasks = socialMenu?.map((platform) => {
			const platformTasks = taskList?.filter(
				(task) => task?.platform === platform?.value,
			)

			return { ...platform, taskCount: platformTasks?.length }
		})

		// Sort platforms based on task count in descending order
		const sortedPlatforms = platformsWithTasks?.sort(
			(a, b) => (b.taskCount || 0) - (a.taskCount || 0),
		)

		setTheSortedSocials(sortedPlatforms)
	}, [adverts])

	// When user selects a platform
	const handleSelect = (
		e: React.MouseEvent<HTMLDivElement>,
		platform: string,
	) => {
		e.preventDefault()

		setPlatformName(platform)

		// Filter out only the ads that are relevant to the platform user clicked
		const filteredAdverts = taskList?.filter(
			(advert) => advert?.platform === platform,
		)
		setSelectedPlatformAds(filteredAdverts)

		// Function to toggle to services list open and close
		setToggleServices(!toggleServices)

		// Extract all the object containing services relevant to the platform the user picked
		const servicesList = socialPlatforms?.find(
			(object) => object?.assetplatform === platform,
		)
		setSelectedPlatformObject(servicesList)
	}

	// When user selects a service/asset inside a platform
	const handleSelectAsset = (
		e: any,
		asset: string,
		taskTitle: string,
		taskVerification: string,
	) => {
		e.preventDefault()

		const filteredServiceAdvert = selectedPlatformAds?.filter(
			(advert) => advert?.service === asset,
		)

		router.push(`/dashboard/taskearn/${platformName}`)
	}

	return (
		<Suspense>
			<div className='w-full h-fit'>
				<div className='justify-between mx-auto md:mr-5'>
					<div className='flex items-center gap-3 border-b border-gray-200 py-5'>
						<MdOutlineKeyboardArrowLeft
							className='cursor-pointer'
							size={30}
							onClick={() => router.back()}
						/>
						<div className='flex flex-col'>
							<p className='font-semibold text-xl text-gray-700'>
								Perform Social Tasks and Earn
							</p>
							<small className='font-medium text-gray-500'>
								When you click on a platform, you will see only the Tasks you
								are qualified to Perform
							</small>
						</div>
					</div>

					<div className='flex flex-col justify-center gap-3 border-b border-gray-200 py-6'>
						<p className='font-normal text-[14px] text-gray-700 px-6'>
							You can earn consistently by posting adverts of various businesses
							and top brands on your social media accounts and performing simple
							social media tasks. To get started, simply click on any of the
							earning options shown below:
						</p>
					</div>

					<div className='grid md:grid-cols-3 gap-8 items-center justify-center mt-[1rem] px-3 py-5'>
						{theSortedSocials?.map((menu: SocialMenu, index: number) => (
							<div
								key={index}
								onClick={(e) => {
									e.preventDefault()
									router.push(`/dashboard/taskearn/${menu.value}`)
								}}
								className='w-fit hover:shadow cursor-pointer md:w-full border rounded-lg p-5'>
								<div className='flex flex-row items-center gap-5'>
									<div className='flex flex-col'>
										<div className='flex items-center justify-center w-[100px] h-[100px] bg-gray-50 rounded-t-xl rounded-b-2xl'>
											<Image
												src={menu?.icon}
												alt=''
												className='object-cover h-16 w-16 rounded-full p-2'
											/>
										</div>
									</div>
									<div className='flex flex-col md:flex-ro md:justify-between md:items-center md:border-gray-100'>
										<div className='flex flex-col w-full'>
											<h3 className='font-bold text-[20px] text'>
												{menu?.title}
											</h3>
											<p className='pb-3 text-[14px] text-gray-500 font-semibold'>
												<span className='font-extrabold'>Earning: </span> Starts
												from {toIntlCurrency(menu?.earn.toString())}/Task <br />{' '}
												Completed & Approved
											</p>
										</div>
										<div className='w-full '>
											<small
												className={`py-2 px-5 ${
													user?.freeTaskCount === 0
														? 'bg-tertiary'
														: 'bg-secondary'
												} text-primary rounded-2xl`}>
												<span className='mr-1'>
													{
														taskList?.filter(
															(advert) => advert?.platform === menu?.value,
														).length
													}
												</span>
												Tasks Available
											</small>
										</div>
									</div>
								</div>

								<div className='w-full mt-2'>
									<p className='font-normal text-[14px] text-gray-700 mt-3'>
										{menu?.desc}
									</p>
								</div>

								<div className='absolute bg-white space-y-4 border max-h-72 overflow-scroll'>
									{selectedPlatformObject?.assetplatform === menu.value &&
									toggleServices ? (
										<div className='w-full h-fit'>
											{selectedPlatformObject?.assets?.map(
												(service: Asset, index: number) => (
													<ul
														key={index}
														className='mt-2 overflow-scroll rounded-sm cursor-pointer hover:bg-gray-300 px-4'>
														<li className='flex items-center gap-3 border-b border-gray-50 py-3'>
															<div
																onClick={(e) =>
																	handleSelectAsset(
																		e,
																		service?.asset,
																		service?.TD,
																		service?.verification,
																	)
																}
																className='flex items-center gap-3 '>
																{service.TD}
																<button className='bg-gray-200 p-2 border border-gray-200 rounded-full'>
																	{
																		selectedPlatformAds?.filter(
																			(advert) =>
																				advert?.service === service?.asset,
																		).length
																	}
																</button>
															</div>
														</li>
													</ul>
												),
											)}
										</div>
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

export default Earn
