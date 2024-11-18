
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
import { selectUser } from '@/redux/slices/authSlice'
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
import { submitTask } from '@/services/advertService'


const TaskEarn = () => {
	const router = useRouter()

	const platformName = router.query.platformName as string
	console.log('🚀 ~ TaskEarn ~ platformName:', platformName)
	const [isModalOpen, setModalOpen] = useState(false)

	const [selectedTask, setSelectedTask] = useState<string>()

	const [isOpen, setIsOpen] = useState(false)

	const dispatch = useDispatch()
	const user = useSelector(selectUser)
	const isError = useSelector(selectIsError)
	const isSuccess = useSelector(selectIsSuccess)
	const isLoading = useSelector(selectIsLoading)
	const [icon, setIcon] = useState<StaticImageData>()

	const [selectedAdvertId, setSelectedAdvertId] = useState<string | null>(null)
	const [selectedTaskId, setSelectedTaskId] = useState<string>()

	const tasks = useSelector(selectTasks)
	const [finalFilteredTasks, setFinalFilteredTasks] = useState([])
	const [td, setTd] = useState<string | null>(null)
	const [isaLoading, setIsLoading] = useState(false);
	const getAllTasks = async () => {
		dispatch(handleGetUserTasks() as any)
	}

	useEffect(() => {
		getAllTasks()
	}, [dispatch])


	useEffect(() => {
		switch (platformName) {
			case 'tiktok':
				setIcon(tiktok)
				break
			case 'facebook':
				setIcon(facebook)
				break
			case 'twitter':
				setIcon(twitter)
				break
			case 'instagram':
				setIcon(instagram)
				break
			case 'linkedin':
				setIcon(linkedin)
				break
			case 'whatsapp':
				setIcon(whatsapp)
				break
			case 'youtube':
				setIcon(youtube)
				break
			case 'appstore':
				setIcon(appstore)
				break
			case 'playstore':
				setIcon(playstore)
				break
			case 'audiomack':
				setIcon(audiomack)
				break
			case 'spotify':
				setIcon(spotify)
				break
			case 'boomplay':
				setIcon(boomplay)
				break

		}
	}, [platformName])

	useEffect(() => {
		const fetchQualifiedAdverts = async () => {
			try {
				const data = await getQualifiedAdverts(platformName)
				setFinalFilteredTasks(data)
			} catch (error) {
				console.error('Failed to fetch qualified adverts:', error)
			}
		}

		fetchQualifiedAdverts()
	}, [platformName])


	// const checkTaskExistence = (advert_Id: string) => {
	// 	const existingTask = tasks?.find(
	// 		(task) => task.taskPerformerId === user.id && task.advertId === advert_Id,
	// 	)
	// 	if (existingTask) {
	// 		return (
	// 			<button
	// 				onClick={() => goToTaskPage(existingTask._id)}
	// 				className='flex justify-center gap-1 text-primary text-[12px] md:text-[15px] py-2 px-5 rounded-2xl bg-secondary'>
	// 				View Task
	// 			</button>
	// 		)
	// 	} else {
	// 		return (
	// 			<button
	// 				onClick={() => handleSelect(advert_Id)}
	// 				className='flex justify-center gap-1 text-primary py-2 px-5 rounded-2xl bg-tertiary text-[12px] md:text-[15px]'>
	// 				Perform Task
	// 			</button>
	// 		)
	// 	}
	// }

	const handleSelect = (advert_Id: string) => {
		setSelectedAdvertId(advert_Id)

		setModalOpen(true)
	}

	const handleConfirm = async () => {
    setIsLoading(true);
    try {
        // Time the taskExistsResponse
      

        const taskToPerform: any = finalFilteredTasks?.find(
            (advert: any) => advert._id === selectedAdvertId
        );

        if (!taskToPerform) {
            toast.error('Cannot find advert, task creation failed');
            return;
        }

        console.log('🚀 ~ handleConfirm ~ taskToPerform:', taskToPerform);

        const randomIndex = Math.floor(Math.random() * taskToPerform?.caption.length);
        const pickedCaption = taskToPerform?.caption[randomIndex];

        if (taskToPerform) {
            // Optimize this by executing in parallel if needed
            const assetresult = await getSocialPlatformAsset(taskToPerform.platform, taskToPerform.service);
		setTd(assetresult.SC)
		console.log('what is thidsssssssssssssssss',td)

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
            };

            console.log('Task data being created:', taskData);

            // Create task
            const response = await dispatch(createNewTask(taskData) as any);

            if (response.meta.requestStatus === 'rejected') {
                toast.error('Error creating task.');
                return;
            }

            if (response.meta.requestStatus === 'fulfilled') {
                setSelectedTaskId(response.payload._id);
                setModalOpen(false);
                setIsOpen(true);
            }
        }
    } catch (error) {
        console.error('Error during handleConfirm:', error);
        toast.error('An error occurred while processing the task.');
    } finally {
        setIsLoading(false);
    }
};

	const handleCloseModal = () => {
		setModalOpen(false)
	}
	const renderLoader = () => {
		return isLoading ? <Loader open={isLoading} /> : null; // Adjust according to your Loader component's implementation
	};

	return (
		<Suspense>
			<div className='w-full min-h-screen pb-20'>
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
						</p>
					</div>
				</div>

				<div className='mt-3 md:mt-8 grid md:grid-cols-3 gap-8 '>
					{finalFilteredTasks?.map((task: any, index) => {
						return (
							<div
								key={index}
								onClick={() => handleSelect(task._id)}
								className='w-full cursor-pointer hover:shadow flex flex-col md:flex-row  md:items-center px-4 py-3  justify-between md:px-8 md:py-6 border rounded-lg'>
								<div className='w-full fle flex-col  py-2 gap-2 md:items-center md:flex-row'>
									<div className=' flex '>
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
												<p className='w-1/8'>{task.TD}</p>

												<span>{toIntlCurrency(task?.earnPerTask)}</span>
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
															{task.availableTasks}{' '}
														</span>
														tasks left to perform
													</li>
												</ul>
											</div>
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
					onClose={() => {
						setIsOpen(false)
					}}
					aria-labelledby='modal-modal-title'
					aria-describedby='modal-modal-description'>
					<TaskSubmit
						onClose={() => {
							setIsOpen(false)
						}}
						taskId={selectedTaskId!}
					/>
				</Modal>
			</div>
		</Suspense>
	)
}

export default TaskEarn
