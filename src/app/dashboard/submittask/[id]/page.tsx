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
import { useRouter } from 'next/navigation'
import { Suspense, useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { io } from 'socket.io-client'

const socket = io(`${BACKEND_URL}`)

const TaskSubmit = ({ params }: { params: { taskId: string } }) => {
	const dispatch = useDispatch()
	const router = useRouter()
	// const isLoading = useSelector(selectIsLoading)
	// const isSuccess = useSelector(selectIsSuccess)
	const isError = useSelector(selectIsError)
	const [isLoading, setIsLoading] = useState(false)
	const user = useSelector(selectUser)
	const tasks = useSelector(selectTasks)
	const [task, setTask] = useState<any>()
	const adverts = useSelector(selectAllAdverts)
	const [ad, setAd] = useState<any>()
	const [imageArray, setimageArray] = useState<any>()
	const [selectedImages, setSelectedImages] = useState<any>([])
	const [userSocialName, setUserSocialName] = useState<any>()
	const [taskSubmitted, setTaskSubmitted] = useState(false)

	//const { userSocialName } = taskSubmitData

	const getTask = async () => {
		await dispatch(handleGetUserTasks() as any)
		await dispatch(handleGetALLUserAdverts() as any)
	}

	useEffect(() => {
		getTask()
	}, [dispatch])

	useEffect(() => {
		setTask(tasks?.find((obj) => obj._id === params.taskId))
	}, [])

	useEffect(() => {
		setAd(adverts?.find((obj: any) => obj._id === task?.advertId))
	}, [task, adverts])

	//Handle Input
	const handleInputChange = (e: any) => {
		setUserSocialName(e.target.value)
	}

	// Upload and preview multiple screenshots
	const handleImageChange = (e: any) => {
		const files = Array.from(e.target.files)
		setimageArray(files)

		//Create an array of files previews
		const filePreviews = Array.from(files).map((file: any) =>
			URL.createObjectURL(file),
		)

		setSelectedImages(filePreviews)
	}

	//Remove uploaded images
	const handleImageRemove = (imagePreview: any) => {
		//filter out the selected image and update the state
		const updatedImages = selectedImages.filter(
			(preview: any) => preview !== imagePreview,
		)

		setSelectedImages(updatedImages)

		//Revoke the object URL to release memory
		URL.revokeObjectURL(imagePreview)
		toast.success('Image discarded successfully')
	}

	//Append and prepare form data for transport
	const formData = new FormData()

	for (let i = 0; i < imageArray?.length; i++) {
		formData?.append('images', imageArray[i])
	}

	formData.append('taskId', params.taskId)
	formData.append('userSocialName', userSocialName)

	const handleOnSubmit = async (e: any) => {
		e.preventDefault()

		if (ad && (ad.desiredROI === 0 || ad.status === 'Completed')) {
			toast.error(
				'Unfortunately, you cannot submit this task again because the advert has already being completed',
			)
			return
		}

		if (!imageArray) {
			toast.error('Please upload a screenshot to prove you performed the Task')
			return
		}

		//await dispatch(handleSubmitTask(formData))

		setIsLoading(true)
		const response = await submitTask(formData)

		setIsLoading(false)

		if (response === "Task submitted successfully, wait for Admin's Approval") {
			setIsLoading(false)
			setTaskSubmitted(true)
			toast.success('Task submitted, wait for admins response')

			//Emit socket io event to the backend
			const emitData = {
				userId: user?.id,
				action: `@${user?.username} just performed a task on ${task?.platform}`,
			}

			//Emit Socket event to update activity feed
			socket.emit('sendActivity', emitData)

			router.push('/dashboard/tasks')
			return
		}

		if (!response) {
			setIsLoading(false)
			setTaskSubmitted(false)
			toast.error('Error submitting task')
			return
		}
	}

	return (
		<Suspense>
			<div className='w-full h-fit'>
				<Loader open={isLoading} />

				<TaskPerform
					taskId={params.taskId!}
					onClose={() => null}
					// newTask= {task}
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
