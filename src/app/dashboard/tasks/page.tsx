'use client'

import TaskSubmit from '@/components/dashboard/submitTask'
import { icons } from '@/components/data/socialIcon'
import Loader from '@/components/loader/Loader'
import { selectUser } from '@/redux/slices/authSlice'
import {
	handleGetUserTasks,
	selectIsError,
	selectIsLoading,
	selectIsSuccess,
	selectTasks,
} from '@/redux/slices/taskSlice'
import { getStatusBgColor, toIntlCurrency } from '@/utils'
import { Modal } from '@mui/material'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Suspense, useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import TimeAgo from 'timeago-react'
import { cn } from '../../../../helpers'

const TaskList = () => {
	const router = useRouter()
	const dispatch = useDispatch()
	const isLoading = useSelector(selectIsLoading)
	const isSuccess = useSelector(selectIsSuccess)
	const isError = useSelector(selectIsError)
	const user = useSelector(selectUser)
	const [icon, setIcon] = useState('')
	const [platform, setPlatform] = useState('')
	const tasks = useSelector(selectTasks)
	const [sortedTasks, setSortedTasks] = useState<any>()
	// const itemsPerPage = 5;

	const [isOpen, setIsOpen] = useState(false)
	const [selectedTask, setSelectedTask] = useState<string>()

	const getUserTasks = async () => {
		dispatch(handleGetUserTasks() as any)
	}

	useEffect(() => {
		getUserTasks()
		//console.log(tasks)
	}, [dispatch])

	useEffect(() => {
		const sortedTaskList = [...tasks].sort(
			(a, b) =>
				new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
		)
		setSortedTasks(sortedTaskList)
	}, [tasks])

	const handleSelect = async (e: any) => {
		e.preventDefault()
		toast.success('Task has been completed, approved and cleared')
	}

	const navigateToTaskDetail = (task_Id: string, taskStatus: string) => {
		if (taskStatus === 'Approved') {
			handleSelect(null)
		} else {
			router.push(`/dashboard/submittask/${task_Id}`)
		}
	}

	return (
		<Suspense>
			<div className='w-full h-fit'>
				<Loader open={isLoading} />

				<div>
					<div className='flex items-center gap-3 border-b border-gray-200 py-5'>
						{/* <BackButton /> */}
						<div className='flex flex-col'>
							<p className='font-semibold text-xl text-gray-700'>
								Your Ongoing Tasks
							</p>
							<small className='font-medium text-gray-500'>
								Click each task to see details and monitor
							</small>
						</div>
					</div>

					<div className='md:px-8 mt-3 md:mt-8 grid md:grid-cols-3 gap-6'>
						{sortedTasks?.map((task: any, index: number) => (
							<div
								key={index}
								onClick={
									() => {
										setIsOpen(true)
										setSelectedTask(task._id)
									}
									// navigateToTaskDetail(task._id, task.status)
								}
								className='flex items-center border justify-between p-6 rounded-lg hover:shadow cursor-pointer'>
								<div className='bg-blue-'>
									<div className='flex items-center bg-red- w-full justify-between'>
										<div className='flex gap-3 items-center'>
											<Image
												src={
													icons?.find((icon) => icon.platform === task.platform)
														?.icon
												}
												alt={task.platform}
												className='hidden md:flex w-10 h-10 rounded-lg'
											/>
											<div>
												<small>
													<TimeAgo datetime={task.createdAt} />
												</small>
												<h1 className='text-[15px] md:text-[18px] font-bold md:my-[-5px] p-0'>
													{task?.title}
												</h1>
											</div>
										</div>

										<small className=' font-bold ml-10'>
											{toIntlCurrency(task?.toEarn)}/task
										</small>
									</div>
									{/* <p className='text-gray-500 text-[15px]'>{task.caption}</p> */}
									{/* <hr className='my-3' /> */}
									<div className='flex flex-col gap-2 mt-4'>
										<ul className='flex flex- gap-3 text-[13px]'>
											<li>State: {task.state}</li>
											<li>LGA: {task.lga}</li>
											<li>
												Status:{' '}
												<span
													className={cn(
														' text-xs ml-1 text-white rounded-full',
														getStatusBgColor(task.status),
													)}>
													{task.status}
												</span>
											</li>
										</ul>
										{task.socialPageLink ? (
											<p className='mt-2 text-sm'>
												Link:{' '}
												<a href={task.socialPageLink} className='text-blue-600'>
													{task.socialPageLink}
												</a>
											</p>
										) : (
											''
										)}
										<div className='flex gap-2 items-center'>
											<Image
												src={
													icons?.find((icon) => icon.platform === task.platform)
														?.icon
												}
												alt={task?.platform}
												className='flex md:hidden w-[20px] h-[20px]'
											/>

											{/* <div className='flex'>
											{checkTaskStatus(task?._id, task.status)}
										</div> */}
										</div>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>

				<Modal
					open={isOpen}
					onClose={() => {
						getUserTasks()
						setIsOpen(false)
					}}
					aria-labelledby='modal-modal-title'
					aria-describedby='modal-modal-description'>
					<TaskSubmit onClose={() => setIsOpen(false)} taskId={selectedTask!} />
				</Modal>
			</div>
		</Suspense>
	)
}

export default TaskList
