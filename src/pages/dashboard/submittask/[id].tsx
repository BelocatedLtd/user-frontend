'use client'

import TaskPerform from '@/components/dashboard/TaskPerform'
import { icons } from '@/components/data/socialIcon'
import Loader from '@/components/loader/Loader'
import {
	handleGetALLUserAdverts,
	selectAllAdverts,
} from '@/redux/slices/advertSlice'
import { selectUser } from '@/redux/slices/authSlice'
import {
	handleGetUserTasks,
	selectIsError,
	selectTasks,
} from '@/redux/slices/taskSlice'
import { submitTask } from '@/services/taskServices'
import { BACKEND_URL } from '@/utils/globalConfig'
import { useRouter } from 'next/router'
import { Suspense, useEffect, useMemo, useState } from 'react'
import { toast } from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { io } from 'socket.io-client'

const socket = io(`${BACKEND_URL}`)

const TaskSubmit = () => {
	const dispatch = useDispatch()
	const router = useRouter()

	const taskId = router.query.id as string
	const user = useSelector(selectUser)
	const tasks = useSelector(selectTasks)
	const adverts = useSelector(selectAllAdverts)
	const isError = useSelector(selectIsError)

	const [isLoading, setIsLoading] = useState(false)
	const [selectedImages, setSelectedImages] = useState<any>([])
	const [userSocialName, setUserSocialName] = useState<any>()
	const [taskSubmitted, setTaskSubmitted] = useState(false)

	// Fetch tasks and adverts on component mount
	useEffect(() => {
		dispatch(handleGetUserTasks() as any)
		dispatch(handleGetALLUserAdverts() as any)
	}, [dispatch])

	// Find the task and related advert based on the taskId
	const task = useMemo(
		() => tasks?.find((obj) => obj._id === taskId),
		[tasks, taskId],
	)
	const ad = useMemo(
		() => adverts?.find((obj: any) => obj._id === task?.advertId),
		[adverts, task],
	)

	// Handle input change for social media username
	const handleInputChange = (e: any) => {
		setUserSocialName(e.target.value)
	}

	// Handle image upload and preview
	const handleImageChange = (e: any) => {
		const files = Array.from(e.target.files)
		setSelectedImages(files.map((file: any) => URL.createObjectURL(file)))
	}

	// Remove uploaded image and revoke URL to free up memory
	const handleImageRemove = (imagePreview: any) => {
		setSelectedImages(
			selectedImages.filter((preview: any) => preview !== imagePreview),
		)
		URL.revokeObjectURL(imagePreview)
		toast.success('Image discarded successfully')
	}

	// Form submission logic
	const handleOnSubmit = async (e: any) => {
		e.preventDefault()

			if (
		taskSubmitted ||
		(task && task.taskPerformerId === user._id && task.status === 'Submitted')
	) {
		toast.error('You have already completed this task.')
		return
	}

		if (ad && (ad.desiredROI === 0 || ad.status === 'Completed')) {
			toast.error(
				'This task cannot be submitted because the advert is already completed.',
			)
			return
		}

		if (!selectedImages.length) {
			toast.error('Please upload a screenshot to prove you performed the task.')
			return
		}

		const formData = new FormData()
		selectedImages.forEach((image: any) => formData.append('images', image))
		formData.append('taskId', taskId)
		formData.append('userSocialName', userSocialName)

		setIsLoading(true)
		const response = await submitTask(formData)
		setIsLoading(false)

		if (response.status === 200) {
			 toast.success(response.data.message); 
			 console.log('Message:', response.data.message);
			setTaskSubmitted(true)
			socket.emit('sendActivity', {
				userId: user?.id,
				action: `@${user?.username} just performed a task on ${task?.platform}`,
			})

			router.push('/dashboard/tasks')
		} else {
			toast.error('Error submitting task')
		}
	}

	return (
		<Suspense>
			<div className='w-full h-fit'>
				<Loader open={isLoading} />
				<TaskPerform
					task={taskId}
					onClose={() => null}
					ad={ad!}
					isLoading={isLoading}
					icons={icons}
					taskSubmitted={taskSubmitted}
					userSocialName={userSocialName}
					selectedImages={selectedImages}
					handleOnSubmit={handleOnSubmit}
					handleInputChange={handleInputChange}
					handleImageChange={handleImageChange}
					handleImageRemove={handleImageRemove}
				/>
			</div>
		</Suspense>
	)
}

export default TaskSubmit
