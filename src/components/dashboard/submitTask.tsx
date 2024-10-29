'use client'

import TaskPerform from '@/components/dashboard/TaskPerform'
import { icons } from '@/components/data/socialIcon'
import Loader from '@/components/loader/Loader'
import { selectAllAdverts } from '@/redux/slices/advertSlice'
import {checkExistingTask} from '@/services/taskServices' 
import { selectAdvert } from '@/redux/slices/advertSlice'
import { selectAdverts } from '@/redux/slices/advertSlice'
import { selectUser } from '@/redux/slices/authSlice'
import { handleGetTaskById } from '@/redux/slices/taskSlice'
import { submitTask } from '@/services/taskServices' // Import the fetchTaskById function
import { BACKEND_URL } from '@/utils/globalConfig'
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
	const dispatch = useDispatch()
	const user = useSelector(selectUser)
	const advert = useSelector(selectAdverts)

	const [isLoading, setIsLoading] = useState(false)
	const [task, setTask] = useState<any>(null)
	const [ad, setAd] = useState<any>(null)
	const [imageArray, setImageArray] = useState<File[]>([])
	const [selectedImages, setSelectedImages] = useState<string[]>([])
	const [userSocialName, setUserSocialName] = useState<string>('')
	const [taskSubmitted, setTaskSubmitted] = useState(false)
	
	// Fetch task by ID from backend
	const loadTask = async () => {
		try {
			setIsLoading(true)
			const fetchedTask = await dispatch(handleGetTaskById(taskId) as any)
			console.log('🚀 ~ loadTask ~ fetchedTask:', fetchedTask)
			if (fetchedTask.meta.requestStatus === 'fulfilled') {
				setAd(fetchedTask.payload.advert)
				setTask(fetchedTask.payload)
			}
			setIsLoading(false)
		} catch (error) {
			setIsLoading(false)
			toast.error('Failed to load task')
		}
	}

	useEffect(() => {
		loadTask()
	}, [taskId, dispatch])

	// Handle input change
	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setUserSocialName(e.target.value)
	}

	// Handle image upload and preview
	const handleImageChange = (files: FileList) => {
		const newFiles = Array.from(files)
		setImageArray((prev) => [...prev, ...newFiles])
		setSelectedImages((prev) => [
			...prev,
			...newFiles.map((file) => URL.createObjectURL(file)),
		])
	}

	// Remove uploaded images
	const handleImageRemove = (imagePreview: string) => {
		const updatedImages = selectedImages.filter(
			(preview) => preview !== imagePreview,
		)
		setSelectedImages(updatedImages)
		URL.revokeObjectURL(imagePreview)
		toast.success('Image discarded successfully')
	}

	// Handle form submission
	const handleOnSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		const performerId = user?.id
		const advertId = ad?._id
		// Check if the ad is already completed or desired ROI is 0
		if (ad && (ad.desiredROI === 0 || ad.status === 'Completed')) {
			toast.error(
				'This task cannot be submitted because the advert is already completed.'
			);
			return;
		}
	
		try {
			// Check if the task already exists for the user and advert
			const existingTask = await checkExistingTask(advertId, performerId);
	
			// Ensure the task exists check is handled properly
			if (existingTask?.exists) {
				toast.error(
					'This task cannot be submitted because it has already been created for this advert.'
				);
				return;
			}
	
			// Ensure that at least one image is uploaded
			if (!imageArray.length) {
				toast.error(
					'Please upload a screenshot to prove you performed the task.'
				);
				return;
			}
	
			// Proceed with the task submission
			setIsLoading(true);
			const formData = new FormData();
			imageArray.forEach((image) => formData.append('images', image));
			formData.append('taskId', taskId);
			formData.append('userSocialName', userSocialName);
	
			const responseMessage = await submitTask(formData);
			console.log(responseMessage)
				if (responseMessage) {
			setTaskSubmitted(true)
			toast.success(responseMessage)
		
			  // Notify via WebSocket
			  socket.emit('sendActivity', {
				userId: user?.id,
				action: `@${user?.username} just performed a task on ${task?.platform}`,
			  });
			  onClose();
			
		} else {
				toast.error('Error submitting task');
			}
		} catch (error) {
			toast.error('Error submitting task');
		} finally {
			setIsLoading(false);
		}
	};
	
	

	return (
		<>
			<Loader open={isLoading} />
			<TaskPerform
				task={task}
				onClose={onClose}
				ad={ad!}
				isLoading={isLoading}
				icons={icons}
				taskSubmitted={taskSubmitted}
				userSocialName={userSocialName}
				selectedImages={selectedImages}
				handleOnSubmit={handleOnSubmit}
				handleInputChange={handleInputChange}
				handleImageChange={(e) => {
					handleImageChange(e)
				}}
				handleImageRemove={handleImageRemove}
			/>
		</>
	)
}

export default TaskSubmit
