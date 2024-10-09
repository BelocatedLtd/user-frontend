'use client'

import TaskSubmit from '@/components/dashboard/submitTask'
import { icons } from '@/components/data/socialIcon'
import PaginatedComponent from '@/components/Pagination'
import { getUserTasks } from '@/services/taskServices'
import { getStatusBgColor, toIntlCurrency } from '@/utils'
import { Modal } from '@mui/material'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Suspense, useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import TimeAgo from 'timeago-react'
import { cn } from '../../../../helpers'
import Loading from '../loading'

const TaskList = () => {
	const router = useRouter()
	const dispatch = useDispatch()
	const [tasks, setTasks] = useState([])
	const [totalTasks, setTotalTasks] = useState(0)
	const [currentPage, setCurrentPage] = useState(1)
	const [limit, setLimit] = useState(9)
	const [isLoading, setIsLoading] = useState(false)

	const [sortedTasks, setSortedTasks] = useState<any>()

	const [isOpen, setIsOpen] = useState(false)
	const [selectedTask, setSelectedTask] = useState<string>()

	// Function to get tasks based on current page and limit
	const getTasks = async (page = 1, limit = 10) => {
		try {
			// setIsLoading(true)
			const response = await getUserTasks({ page, limit })

			setTasks(response?.tasks)

			setTotalTasks(response.totalTasks)
			// setIsLoading(false)
		} catch (error) {
			toast.error('Failed to retrieve tasks, please reload page')
		}
	}

	useEffect(() => {
		getTasks(currentPage, limit)
	}, [])

	return (
		<Suspense>
			<div className='w-full h-fit'>
				{isLoading ? (
					<Loading />
				) : (
					<>
						<div>
							<div className='flex items-center gap-3 border-b border-gray-200 py-5'>
								<div className='flex flex-col'>
									<p className='font-semibold text-xl text-gray-700'>
										Your Ongoing Tasks
									</p>
									<small className='font-medium text-gray-500'>
										Click each task to see details and monitor
									</small>
								</div>
							</div>

							{/* <div className='md:px-8 mt-3 md:mt-8 grid md:grid-cols-3 gap-6'>
								{tasks?.map((task: any, index: number) => (
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
															icons?.find(
																(icon) => icon.platform === task.platform,
															)?.icon
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
														<h1 className='text-[15px] md:text-[18px] font-bold md:my-[-5px] p-0'>
															{task?._id}
														</h1>
													</div>
												</div>

												<small className=' font-bold ml-10'>
													{toIntlCurrency(task?.toEarn)}/task
												</small>
											</div>
											{/* <p className='text-gray-500 text-[15px]'>{task.caption}</p> */}
							{/* <hr className='my-3' /> */}
							{/* <div className='flex flex-col gap-2 mt-4'>
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
														<a
															href={task.socialPageLink}
															className='text-blue-600'>
															{task.socialPageLink}
														</a>
													</p>
												) : (
													''
												)}
												<div className='flex gap-2 items-center'>
													<Image
														src={
															icons?.find(
																(icon) => icon.platform === task.platform,
															)?.icon
														}
														alt={task?.platform}
														className='flex md:hidden w-[20px] h-[20px]'
													/> */}

							{/* <div className='flex'>
											{checkTaskStatus(task?._id, task.status)}
										</div> */}
							{/* </div>
											</div>
										</div>
									</div>
								))}
							</div> */}

							<div className='md:px-8 mt-3 md:mt-8 grid md:grid-cols-3 gap-6'>
								{tasks?.map((task: any, index: number) => (
									<div
										key={index}
										onClick={() => {
											setIsOpen(true)
											setSelectedTask(task._id)
										}}
										className='flex flex-col items-start border justify-between p-6 rounded-lg hover:shadow cursor-pointer box-border'>
										<div className='w-full'>
											<div className='flex items-center justify-between w-full'>
												{/* Task Icon */}
												<div className='flex gap-3 items-center'>
													<Image
														src={icons?.find(icon => icon.platform === task.platform)?.icon}
														alt={task.platform}
														className='hidden md:flex w-10 h-10 rounded-lg object-contain'
													/>
													{/* Task Details */}
													<div>
														<small>
															<TimeAgo datetime={task.createdAt} />
														</small>
														<h1 className='text-[15px] md:text-[18px] font-bold md:my-[-5px] p-0 truncate'>
															{task?.title}
														</h1>
														<h1 className='text-[15px] md:text-[18px] font-bold md:my-[-5px] p-0 truncate'>
															{task?._id}
														</h1>
													</div>
												</div>

												{/* Earnings */}
												<small className='font-bold ml-10 truncate'>
													{toIntlCurrency(task?.toEarn)}/task
												</small>
											</div>

											{/* Task Status and Details */}
											<div className='flex flex-col gap-2 mt-4'>
												<ul className='flex gap-3 text-[13px]'>
													<li>State: {task.state}</li>
													<li>LGA: {task.lga}</li>
													<li>Status:
														<span
															className={cn(
																'text-xs ml-1 text-white rounded-full',
																getStatusBgColor(task.status)
															)}>
															{task.status}
														</span>
													</li>
												</ul>

												{/* Social Page Link */}
												{task.socialPageLink && (
													<p className='mt-2 text-sm truncate'>
														Link:{' '}
														<a href={task.socialPageLink} className='text-blue-600 truncate'>
															{task.socialPageLink}
														</a>
													</p>
												)}

												{/* Small Icon for Mobile */}
												<div className='flex gap-2 items-center'>
													<Image
														src={icons?.find(icon => icon.platform === task.platform)?.icon}
														alt={task?.platform}
														className='flex md:hidden w-[20px] h-[20px] object-contain'
													/>
												</div>
											</div>
										</div>
									</div>
								))}
							</div>

						</div>

						<div className='my-10'>
							<PaginatedComponent
								total={totalTasks}
								initialPage={currentPage}
								initialLimit={limit}
								fetch={getTasks}
							/>
						</div>

						<Modal
							open={isOpen}
							onClose={() => {
								getTasks()
								setIsOpen(false)
							}}
							aria-labelledby='modal-modal-title'
							aria-describedby='modal-modal-description'>
							<TaskSubmit
								onClose={() => {
									getTasks()
									setIsOpen(false)
								}}
								taskId={selectedTask!}
							/>
						</Modal>
					</>
				)}
			</div>
		</Suspense>
	)
}

export default TaskList
