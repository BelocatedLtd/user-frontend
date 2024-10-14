

'use client'

import { Suspense, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import Image, { StaticImageData } from 'next/image'
import { Modal } from '@mui/material'
import { toast } from 'react-hot-toast'
import TimeAgo from 'timeago-react'

import BackButton from '@/components/Button/BackButton'
import ConfirmationModal from '@/components/ConfirmationModal'
import TaskSubmit from '@/components/dashboard/submitTask'
import Loader from '@/components/loader/Loader'
import {
	createNewTask,
	handleGetUserTasks,
	selectIsError,
	selectIsLoading,
	selectIsSuccess,
	selectTasks,
} from '@/redux/slices/taskSlice'
import { selectUser } from '@/redux/slices/authSlice'
import { getQualifiedAdverts } from '@/services/advertService'
import { getSocialPlatformAsset, getStatusBgColor, toIntlCurrency } from '@/utils'
import { cn } from '../../../../helpers'

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

// Types
interface Task {
	_id: string
	adTitle: string
	earnPerTask: number
	platform: string
	service: string
	caption: string[]
	state: string
	lga: string
	createdAt: string
	socialPageLink?: string
	availableTasks: number
	isFree: boolean
	userId: string
	desiredROI: number
	mediaURL: string
	gender: string
}

const TaskEarn = () => {
	const router = useRouter()
	const platformName = router.query.platformName as string
	console.log('🚀 ~ TaskEarn ~ platformName:', platformName)
	const [isModalOpen, setModalOpen] = useState<boolean>(false)
	const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null)
	const [selectedAdvertId, setSelectedAdvertId] = useState<string | null>(null)
	const [icon, setIcon] = useState<string | StaticImageData>()
	const [isOpen, setIsOpen] = useState<boolean>(false)
	const [finalFilteredTasks, setFinalFilteredTasks] = useState<Task[]>([])

	const dispatch = useDispatch<any>()
	const user = useSelector(selectUser)
	const isError = useSelector(selectIsError)
	const isSuccess = useSelector(selectIsSuccess)
	const isLoading = useSelector(selectIsLoading)
	const tasks = useSelector(selectTasks)

	const getAllTasks = async () => {
		dispatch(handleGetUserTasks())
	}

	useEffect(() => {
		getAllTasks()
	}, [dispatch])

	useEffect(() => {
		const fetchQualifiedAdverts = async () => {
						try {
							const data = await getQualifiedAdverts(platformName)
							setFinalFilteredTasks(data)
						} catch (error) {
							console.error('Failed to fetch qualified adverts:', error)
						}
					}

		const iconMap: Record<string, string | StaticImageData> = {
			tiktok,
			facebook,
			twitter,
			instagram,
			linkedin,
			whatsapp,
			youtube,
			appstore,
			playstore,
			audiomack,
			spotify,
			boomplay,
		}
		setIcon(iconMap[platformName] || '')

		fetchQualifiedAdverts()
	}, [platformName])

	const handleSelect = (advertId: string) => {
		setSelectedAdvertId(advertId)
		setModalOpen(true)
	}
	const calculateRemainingTasks = (taskId: string) => {
		const completedTasks = tasks.filter(
			(task) => task.taskPerformerId === user.id && task.advertId === taskId
		).length
		const taskData = finalFilteredTasks.find((task: any) => task._id === taskId)
		return taskData ? taskData.availableTasks - completedTasks : 0
	}
	const handleConfirm = async () => {
		const taskToPerform = finalFilteredTasks.find(
			(advert) => advert._id === selectedAdvertId
		)

		if (!taskToPerform) {
			toast.error('Sorry, cannot find advert, so task cannot be created')
			return
		}

		const randomIndex = Math.floor(Math.random() * taskToPerform.caption.length)
		const pickedCaption = taskToPerform.caption[randomIndex]
		const assetResult = getSocialPlatformAsset(
			taskToPerform.platform,
			taskToPerform.service
		)

		const taskData = {
			advertId: taskToPerform._id,
			advertiserId: taskToPerform.userId,
			taskPerformerId: user?.id,
			title: assetResult.SC,
			platform: taskToPerform.platform,
			service: taskToPerform.service,
			desiredROI: taskToPerform.desiredROI,
			toEarn: taskToPerform.earnPerTask,
			gender: taskToPerform.gender,
			state: taskToPerform.state,
			lga: taskToPerform.lga,
			caption: pickedCaption,
			taskVerification: assetResult.verification,
			socialPageLink: taskToPerform.socialPageLink,
			adMedia: taskToPerform.mediaURL,
		}

		const response = await dispatch(createNewTask(taskData))
		if (isError) {
			toast.error('Error creating a task from this advert')
			return
		}

		if (isSuccess) {
			setSelectedTaskId(response.payload._id)
			setModalOpen(false)
			toast.success('Successfully created a task from this advert')
			setIsOpen(true)
		}
	}
	const handleCloseModal = () => {
		setModalOpen(false)
	}
	return (
		<Suspense fallback={<Loader open={isLoading} />}>
			<div className="w-full">
				<div className="flex items-center gap-3 border-b border-gray-200 py-5">
					<BackButton />
					<div className="flex flex-col">
						<p className="font-semibold text-xl text-gray-700">
							Perform Social Tasks on {platformName} and Earn Money
						</p>
						<small className="font-medium text-gray-500">
							Click{' '}
							<span
								onClick={() => router.push('/dashboard/tasks')}
								className="text-secondary cursor-pointer"
							>
								here
							</span>{' '}
							to see and monitor your Tasks
						</small>
					</div>
				</div>

				<div className="mt-3 md:mt-8 grid md:grid-cols-3 gap-8">
					{finalFilteredTasks.map((task) => (
						<div
							key={task._id}
							onClick={() => handleSelect(task._id)}
							className="cursor-pointer hover:shadow flex flex-col md:flex-row md:items-center px-4 py-3 justify-between border rounded-lg"
						>
							<div className="flex items-center">
								<Image src={icon!} alt={platformName} className="w-16 h-16" />
								<div className="ml-3">
									<TimeAgo datetime={task.createdAt} />
									<h4 className="text-gray-600 font-bold text-[15px] md:text-[18px]">
										{task.adTitle} - {toIntlCurrency(task.earnPerTask)}
									</h4>
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
													
                  {calculateRemainingTasks(task._id)} 
                
												</span>
												tasks left to perform
											</li>
										</ul>
									</div>
								</div>
							</div>

						</div>
					))}
				</div>

				<ConfirmationModal
					open={isModalOpen}
					title="Perform task"
					message="Are you sure you want to perform this task?"
					onClose={handleCloseModal}
					onConfirm={handleConfirm}
				/>

				<Modal open={isOpen} onClose={() => setIsOpen(false)} aria-labelledby='modal-modal-title'
					aria-describedby='modal-modal-description'>
					<TaskSubmit onClose={() => setIsOpen(false)} taskId={selectedTaskId!} />
				</Modal>
			</div>
		</Suspense>
	)
}

export default TaskEarn
