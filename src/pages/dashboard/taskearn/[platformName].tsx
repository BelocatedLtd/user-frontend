'use client'

import appstore from '@/assets/animated icons/appstore.svg'
import audiomack from '@/assets/animated icons/audiomack.svg'
import boomplay from '@/assets/animated icons/boomplay.svg'
import facebook from '@/assets/animated icons/facebook.gif'
import instagram from '@/assets/animated icons/instagram.gif'
import linkedin from '@/assets/animated icons/linkedin.gif'
import playstore from '@/assets/animated icons/playstore.svg'
import spotify from '@/assets/animated icons/spotify.svg'
import tiktok from '@/assets/animated icons/tiktok.gif'
import twitter from '@/assets/animated icons/twitter.gif'
import whatsapp from '@/assets/animated icons/whatsapp.gif'
import youtube from '@/assets/animated icons/youtube.svg'
import { Suspense, useEffect } from 'react'

import BackButton from '@/components/Button/BackButton'
import ConfirmationModal from '@/components/ConfirmationModal'
import TaskSubmit from '@/components/dashboard/submitTask'
import Loader from '@/components/loader/Loader'
import { selectUser, selectUsername } from '@/redux/slices/authSlice'
import {
	createNewTask,
	handleGetUserTasks,
	selectIsError,
	selectIsLoading,
	selectIsSuccess,
	selectTasks,
} from '@/redux/slices/taskSlice'
import { getQualifiedAdverts } from '@/services/advertService'
import {
	getSocialPlatformAsset,
	getStatusBgColor,
	toIntlCurrency,
} from '@/utils'
import { Modal } from '@mui/material'
import Image, { StaticImageData } from 'next/image'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { toast } from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import TimeAgo from 'timeago-react'
import { cn } from '../../../../helpers'

const TaskEarn = () => {
	const router = useRouter()

	const platformName = router.query.platformName as string
	console.log('🚀 ~ TaskEarn ~ platformName:', platformName)
	const [isModalOpen, setModalOpen] = useState(false)

	const [selectedTask, setSelectedTask] = useState<string>()

	const [isOpen, setIsOpen] = useState(false)

	const dispatch = useDispatch()
	const user = useSelector(selectUser)
	const username = useSelector(selectUsername)
	const isError = useSelector(selectIsError)
	const isSuccess = useSelector(selectIsSuccess)
	const isLoading = useSelector(selectIsLoading)
	const [icon, setIcon] = useState<StaticImageData>()
	const [newTask, setNewTask] = useState()

	const [selectedAdvertId, setSelectedAdvertId] = useState<string | null>(null)

	const tasks = useSelector(selectTasks)
	// const { filteredServiceAdvert, asset, taskTitle, taskVerification } =
	// 	location.state || {}
	const [finalFilteredTasks, setFinalFilteredTasks] = useState([])

	const getAllTasks = async () => {
		dispatch(handleGetUserTasks() as any)
	}

	useEffect(() => {
		getAllTasks()
	}, [dispatch])

	useEffect(() => {
		if (platformName === 'tiktok') {
			setIcon(tiktok)
		}
		if (platformName === 'facebook') {
			setIcon(facebook)
		}
		if (platformName === 'twitter') {
			setIcon(twitter)
		}
		if (platformName === 'instagram') {
			setIcon(instagram)
		}
		if (platformName === 'linkedin') {
			setIcon(linkedin)
		}
		if (platformName === 'whatsapp') {
			setIcon(whatsapp)
		}
		if (platformName === 'youtube') {
			setIcon(youtube)
		}
		if (platformName === 'appstore') {
			setIcon(appstore)
		}
		if (platformName === 'playstore') {
			setIcon(playstore)
		}
		if (platformName === 'audiomack') {
			setIcon(audiomack)
		}
		if (platformName === 'spotify') {
			setIcon(spotify)
		}
		if (platformName === 'boomplay') {
			setIcon(boomplay)
		}

		const fetchQualifiedAdverts = async () => {
			try {
				const data = await getQualifiedAdverts(platformName)
				setFinalFilteredTasks(data)
			} catch (error) {
				console.error('Failed to fetch qualified adverts:', error)
			}
		}

		fetchQualifiedAdverts()

		//Filter all ads to get the ones this user is qualified to perform
		// const filteredTasks = filteredServiceAdvert?.filter((advert: any) => {
		// 	const locationMatch =
		// 		advert.state === user.location || advert.state === 'All'
		// 	const communityMatch =
		// 		advert.lga === user.community || advert.lga === 'All'
		// 	const genderMatch =
		// 		advert.gender === user.gender || advert.gender === 'All'

		// 	return locationMatch && communityMatch && genderMatch
		// })

		//Setting the filtered ads to a state called finalFilteredTasks
		// setFinalFilteredTasks(filteredTasks)
	}, [platformName])

	//Check if user has already opted in to perform a task, any task he/she is already performing will be marked submit task and new unperformed tasks marked perform task.
	const checkTaskExistence = (advert_Id: string) => {
		const existingTask = tasks?.find(
			(task) => task.taskPerformerId === user.id && task.advertId === advert_Id,
		)
		if (existingTask) {
			return (
				<button
					onClick={() => goToTaskPage(existingTask._id)}
					className='flex justify-center gap-1 text-primary text-[12px] md:text-[15px] py-2 px-5 rounded-2xl bg-secondary'>
					View Task
				</button>
			)
		} else {
			return (
				<button
					onClick={() => handleSelect(advert_Id)}
					className='flex justify-center gap-1 text-primary py-2 px-5 rounded-2xl bg-tertiary text-[12px] md:text-[15px]'>
					Perform Task
				</button>
			)
		}
	}

	const goToTaskPage = (existingTaskId: string) => {
		router.push(`/dashboard/submittask/${existingTaskId}`)
	}

	const handleSelect = (advert_Id: string) => {
		setSelectedAdvertId(advert_Id)
		console.log('🚀 ~ handleConfirm ~ selectedAdvertId:', selectedAdvertId)

		setModalOpen(true)
	}

	const handleConfirm = async () => {
		const taskToPerform: any = finalFilteredTasks?.find(
			(advert: any) => advert._id === selectedAdvertId,
		)
		console.log('🚀 ~ handleSelect ~ taskToPerform:', taskToPerform)

		const randomIndex = Math.floor(
			Math.random() * taskToPerform?.caption.length,
		)
		const pickedCaption = taskToPerform?.caption[randomIndex]

		if (taskToPerform) {
			const assetresult = getSocialPlatformAsset(
				taskToPerform.platform,
				taskToPerform.service,
			)

			const taskData = {
				advertId: taskToPerform._id,
				advertiserId: taskToPerform.userId,
				taskPerformerId: user?.id,
				title: assetresult.SC,
				platform: taskToPerform.platform,
				service: taskToPerform.service,
				desiredROI: taskToPerform.desiredROI,
				toEarn: taskToPerform.earnPerTask,
				gender: taskToPerform.gender,
				state: taskToPerform.state,
				lga: taskToPerform.lga,
				caption: pickedCaption,
				taskVerification: assetresult.verification,
				socialPageLink: taskToPerform.socialPageLink,
				adMedia: taskToPerform.mediaURL,
			}

			console.log('🚀 ~ handleSelect ~ result:', assetresult)

			console.log(taskData)

			const response = await dispatch(createNewTask(taskData) as any)
			console.log('🚀 ~ handleSelect ~ response:', response)
			// setNewTask(response.payload)

			if (isError) {
				toast.error('Error Creating a Task from this advert')
				return
			}

			if (isSuccess) {
				setModalOpen(false)
				toast.success('Successfully created a Task from this advert')
				setIsOpen(true)
				// router.push(`/dashboard/submittask/${response?.payload?._id}`)
			}
		}

		if (!taskToPerform) {
			toast.error('Sorry, cannot find advert, so task cannot be created')
		}
	}

	//console.log(finalFilteredTasks)

	const handleCloseModal = () => {
		setModalOpen(false)
	}

	return (
		<Suspense>
			<div className='w-full h-fit'>
				<Loader open={isLoading} />
				<div>
					<div className='flex items-center gap-3 border-b border-gray-200 py-5'>
						<BackButton />
						<div className='flex flex-col'>
							<p className='font-semibold text-xl text-gray-700'>
								Perform Social Tasks on {platformName} and Earn Money
							</p>
							<small className='font-medium text-gray-500'>
								Click{' '}
								<span
									onClick={() => router.push(`/dashboard/tasks`)}
									className='text-secondary'>
									here
								</span>{' '}
								to see and monitor your Tasks
							</small>
						</div>
					</div>

					<div className='flex items-center gap-3 border-b border-gray-200'>
						<p className='font-normal text-[14px] text-gray-700 p-6 w-1/2'>
							Earn by posting adverts and performing simple tasks on your social
							media.
							{/* You have{' '} */}
							{/* <span className='text-tertiary font-bold'>
							({finalFilteredTasks?.length})
						</span>{' '}
						tasks available on {platformName}. Click below to start. */}
						</p>
					</div>
				</div>

				<div className='mt-3 md:mt-8 grid grid-cols-3 gap-8 '>
					{finalFilteredTasks?.map((task: any, index) => {
						const status = tasks?.find(
							(task) =>
								task.taskPerformerId === user.id && task.advertId === task._id,
						)?.status

						return (
							<div
								key={index}
								onClick={() => handleSelect(task._id)}
								className='w-full cursor-pointer hover:shadow flex flex-col md:flex-row  md:items-center justify-between md:px-8 md:py-6 border rounded-lg'>
								<div className='w-full fle flex-col  py-2 gap-2 md:items-center md:flex-row'>
									<div className=' md:flex '>
										{/* <Image
									alt={platformName}
									src={icon!}
									className='hidden md:flex'
								/> */}
										<Image
											src={icon!}
											alt={platformName}
											className='w-16 h-16'
										/>
										{/* Ad details to perform as Task */}
										<div className='flex flex-col gap-[0.3rem] ml-3'>
											<small className=' text-[9px] '>
												<TimeAgo datetime={task.createdAt} />
											</small>

											<h4 className='text-gray-600 flex text-[15px] md:text-[18px] font-bold p-0  border-gray-200 pb-2'>
												<p className='w-1/8'>{task?.adTitle}</p>

												<span>{toIntlCurrency(task?.earnPerTask)}</span>
											</h4>
											{/* <small className='text-gray-600 text-[12px] mb-[1rem]'>
										<span className='font-bold'>To Earn:</span> ₦
										{task?.earnPerTask}
									</small> */}
										</div>
									</div>
									<hr />

									<div className='w-full flex flex-col mt-3'>
										{/* Demographics and platform and create task button */}
										<div className='flex flex-col w-full gap-3 md:flex-row'>
											<div className='flex w-full justify-between items-center gap-[2rem]'>
												<ul className='grid  grid-cols-4 gap-3 text-[12px] font-light'>
													<li>
														<span className='font-bold'>State:</span>{' '}
														{task.state}
													</li>
													<li>
														<span className='font-bold'>LGA:</span> {task.lga}
													</li>

													{status && (
														<li>
															<span className='font-bold'>Status:</span>{' '}
															<span
																className={cn(
																	'p-2 text-xs ml-2 text-white rounded-full',
																	getStatusBgColor(status),
																)}>
																{status}
															</span>
														</li>
													)}
													<li className='font-bold'>
														{' '}
														{/* <span className='font-bold'>Fee:</span>{' '} */}
														{task.isFree ? 'Free' : 'Paid'}
													</li>
													{task.socialPageLink ? (
														<li className='flex col-span-4  w-full'>
															<span className='font-bold'>Link:</span>{' '}
															<a
																href={task.socialPageLink}
																className='text-blue-600 ml-2'>
																{task.socialPageLink}
															</a>
														</li>
													) : (
														''
													)}
													<li className='bg-red- text-sm col-span-4'>
														<span
															className={cn(
																'font-bold',
																task.availableTasks > 4
																	? 'text-green-600'
																	: 'text-red-600',
															)}>
															{task.availableTasks}{' '}
														</span>
														tasks left to perform
													</li>
												</ul>

												{/* Button */}
												{/* <div className='hidden w-[30%] md:flex md:justify-end'>
												{checkTaskExistence(task._id)}
											</div> */}
											</div>

											{/* <div className='md:hidden w-fit flex gap-3 items-center md:mt-0 md:w-full md:justify-end'>
											<Image
												src={icon!}
												alt={platformName}
												className='flex w-[20px] h-[20px] md:hidden'
											/>
											{checkTaskExistence(task._id)}
										</div> */}
										</div>
									</div>
								</div>
							</div>
						)
					})}
				</div>
				<ConfirmationModal
					open={isModalOpen}
					title='Perform task'
					message='Are you sure you want to perform this task?'
					onClose={handleCloseModal}
					onConfirm={handleConfirm}
				/>

				<Modal
					open={isOpen}
					onClose={() => setIsOpen(false)}
					aria-labelledby='modal-modal-title'
					aria-describedby='modal-modal-description'>
					<TaskSubmit
						onClose={() => setIsOpen(false)}
						taskId={selectedAdvertId!}
					/>
				</Modal>
			</div>
		</Suspense>
	)
}

export default TaskEarn
