'use client'

import React from 'react'
import { icons } from '@/components/data/socialIcon'
import { MdOutlineKeyboardArrowLeft } from 'react-icons/md'
import Loader from '@/components/loader/Loader'
import {
	handleGetUserTasks,
	selectIsError,
	selectIsLoading,
	selectIsSuccess,
	selectTasks,
} from '@/redux/slices/taskSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import { useEffect } from 'react'
import { formatDate } from '@/utils/formatDate'
import { toast } from 'react-hot-toast'
import { selectUser } from '@/redux/slices/authSlice'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import TimeAgo from 'timeago-react'
import { getStatusBgColor, toIntlCurrency } from '@/utils'
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
	console.log('🚀 ~ TaskList ~ tasks:', tasks)
	const [sortedTasks, setSortedTasks] = useState<any>()
	// const itemsPerPage = 5;

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
		<div className='w-full h-fit'>
			{isLoading && <Loader />}
			<div>
				<div className='flex items-center gap-3 border-b border-gray-200 py-5'>
					<MdOutlineKeyboardArrowLeft size={30} onClick={() => router.back()} />
					<div className='flex flex-col'>
						<p className='font-semibold text-xl text-gray-700'>
							Your Ongoing Tasks
						</p>
						<small className='font-medium text-gray-500'>
							Click each task to see details and monitor
						</small>
					</div>
				</div>

				<div className='md:px-8 mt-3 md:mt-8 grid grid-cols-3 gap-6'>
					{sortedTasks?.map((task: any, index: number) => (
						<div
							key={index}
							onClick={() => navigateToTaskDetail(task._id, task.status)}
							className='flex items-center border justify-between  p-6 rounded-lg hover:shadow cursor-pointer'>
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
								<hr className='my-3' />
								<div className='flex flex-col gap-2'>
									<ul className='flex flex- gap-3 text-[13px]'>
										<li>State: {task.state}</li>
										<li>LGA: {task.lga}</li>
										<li>
											Status:{' '}
											<span
												className={cn(
													'p-2 text-xs ml-2 text-white rounded-full',
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
									{/* <div className='flex gap-2 items-center'>
										<Image
											src={
												icons?.find((icon) => icon.platform === task.platform)
													?.icon
											}
											alt={task?.platform}
											className='flex md:hidden w-[20px] h-[20px]'
										/>

										<div className='flex'>
											{checkTaskStatus(task?._id, task.status)}
										</div>
									</div> */}
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	)
}

export default TaskList
