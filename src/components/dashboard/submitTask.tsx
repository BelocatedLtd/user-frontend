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
import { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { io } from 'socket.io-client'

const socket = io(`${BACKEND_URL}`)

const TaskSubmit = ({
	taskId,
	onClose,
}: {
	taskId: string
	onClose: () => void
}) => {
	console.log('🚀 ~ taskId:', taskId)
	const dispatch = useDispatch()
	const router = useRouter()
	// const isLoading = useSelector(selectIsLoading)
	// const isSuccess = useSelector(selectIsSuccess)
	const isError = useSelector(selectIsError)
	const [isLoading, setIsLoading] = useState(false)
	const user = useSelector(selectUser)
	const tasks = useSelector(selectTasks)
	const [task, setTask] = useState<any>()
	console.log('🚀 ~ task:', task)
	const adverts = useSelector(selectAllAdverts)
	const [ad, setAd] = useState<any>()
	const [imageArray, setimageArray] = useState<any>([])
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
		setTask(tasks?.find((obj) => obj._id === taskId))
	}, [])

	useEffect(() => {
		const findTask = tasks?.find((obj) => obj._id === taskId)
		setAd(findTask)
		console.log('🚀 ~ useEffect ~ ad:', ad)
	}, [task, adverts])

	//Handle Input
	const handleInputChange = (e: any) => {
		setUserSocialName(e.target.value)
	}

	// Upload and preview multiple screenshots
	const handleImageChange = (files: any[]) => {
		setimageArray((prevImages: any) => [...prevImages, ...files])

		const filePreviews = files.map((file) => URL.createObjectURL(file))
		setSelectedImages((prevPreviews: any) => [...prevPreviews, ...filePreviews])
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

	formData.append('taskId', taskId)
	formData.append('userSocialName', userSocialName)

	const handleOnSubmit = async (e: any) => {
		try {
			e.preventDefault()
			console.log('🚀 ~ handleOnSubmit ~ ad:', ad)

			if (ad && (ad.desiredROI === 0 || ad.status === 'Completed')) {
				toast.error(
					'Unfortunately, you cannot submit this task again because the advert has already being completed',
				)
				return
			}

			if (!imageArray) {
				toast.error(
					'Please upload a screenshot to prove you performed the Task',
				)
				return
			}

			//await dispatch(handleSubmitTask(formData))

			setIsLoading(true)
			const response = await submitTask(formData)
			console.log('🚀 ~ handleOnSubmit ~ response:', response)

			setIsLoading(false)

			if (
				response === "Task submitted successfully, wait for Admin's Approval"
			) {
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

				onClose()
				return
			}
			setIsLoading(false)

			if (!response) {
				setIsLoading(false)
				setTaskSubmitted(false)
				toast.error('Error submitting task')
				return
			}
		} catch (error) {
			setIsLoading(false)
			setTaskSubmitted(false)
			toast.error('Error submitting task')
		}
	}

	return (
		<>
			<Loader open={isLoading} />

			<TaskPerform
				taskId={taskId!}
				// newTask= {task}
				onClose={onClose}
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
		</>
	)
}

export default TaskSubmit
