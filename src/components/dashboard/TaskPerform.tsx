import React, { ChangeEvent, FormEvent } from 'react'
import { MdOutlineKeyboardArrowLeft } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import { useEffect } from 'react'
import { selectUser, selectUserId } from '../../redux/slices/authSlice'
import { CheckmarkIcon, toast } from 'react-hot-toast'
import { useRef } from 'react'
import copy from '@/assets/copy.png'
import { GiCancel } from 'react-icons/gi'
import { handleGetUserTasks, selectTasks } from '../../redux/slices/taskSlice'
import { saveAs } from 'file-saver'
import { BiArrowToLeft } from 'react-icons/bi'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'

interface TaskPerformProps {
	taskId: string
	ad: {
		tasks: number
		desiredROI: number
	}
	userSocialName: string
	selectedImages: string[]
	taskSubmitted: boolean
	handleOnSubmit: (e: FormEvent) => void
	handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void
	handleImageChange: (e: ChangeEvent<HTMLInputElement>) => void
	handleImageRemove: (item: string) => void
	isLoading: boolean
	icons: any[]
}

const TaskPerform = ({
	taskId,
	ad,
	userSocialName,
	selectedImages,
	taskSubmitted,
	handleOnSubmit,
	handleInputChange,
	handleImageChange,
	handleImageRemove,
	isLoading,
	icons,
}: TaskPerformProps) => {
	const linkRef = useRef<HTMLInputElement>(null)
	const adCaptionRef = useRef<HTMLTextAreaElement>(null)
	const user = useSelector(selectUser)
	const dispatch = useDispatch()
	const userId = useSelector(selectUserId)
	const tasks = useSelector(selectTasks)
	const router = useRouter()
	const [newTask, setNewTask] = useState<any>()
	const [hideUsernameDisplayField, setHideUsernameDisplayField] =
		useState(false)
	const [hideLinkInputFields, setHideLinkInputFields] = useState(false)
	const [icon, setIcon] = useState<string | undefined>()
	const [adMedia, setAdMedia] = useState<any[]>()
	const [isDownloading, setIsDownloading] = useState(false)

	const getTask = async () => {
		dispatch(handleGetUserTasks() as any)
	}

	useEffect(() => {
		getTask()
	}, [dispatch])

	useEffect(() => {
		const selecectTask = tasks?.find((obj) => obj._id === taskId)

		setNewTask(selecectTask)

		const selectedPlatformIcon = icons?.find(
			(icon) => icon.platform === newTask?.platform,
		)
		setIcon(selectedPlatformIcon?.icon)

		setAdMedia(selecectTask?.adMedia)
	}, [])

	//Filter for different services and platforms
	useEffect(() => {
		//Link field Hidden
		if (
			newTask?.service === 'Instagram Story View' ||
			newTask?.service === 'Follow' ||
			newTask?.service === 'Like/Favourite' ||
			newTask?.service === 'Stream' ||
			newTask?.service === 'Facebook Friend' ||
			newTask?.service === 'Page Likes' ||
			newTask?.service === 'Page Followers' ||
			newTask?.service === 'Post Likes' ||
			newTask?.service === 'Video Views' ||
			newTask?.service === 'Join Twitter Space' ||
			newTask?.service === 'TikTok Favourites' ||
			newTask?.service === 'Subscribers' ||
			newTask?.service === 'LinkedIn Connect'
		) {
			setHideLinkInputFields(false)
		}

		//Link field Hidden for whatsapp
		if (
			newTask?.platform === 'whatsapp' &&
			newTask?.service === 'Post Your Content'
		) {
			setHideLinkInputFields(true)
		}

		//Hide username
		if (
			newTask?.service === 'Download App' ||
			newTask?.service === 'Video Views' ||
			newTask?.service === 'Download App and Review' ||
			newTask?.service === 'Download App Review and Register' ||
			newTask?.platform === 'whatsapp'
		) {
			setHideUsernameDisplayField(true)
		}
	}, [newTask?.platform, newTask?.service])

	const handleAdCaptionCopy = () => {
		adCaptionRef.current?.select()
		document.execCommand('copy')
		toast.success('Ad caption copied to clipboard')
	}

	const handleDownload = async (mediaUrl: string, mediaName: string) => {
		try {
			setIsDownloading(true)
			toast.success('Downloading media file...')

			const response = await fetch(mediaUrl)
			const contentType = response.headers.get('content-type')
			const fileExtension = contentType?.includes('image')
				? '.jpg'
				: contentType?.includes('video')
				? '.mp4'
				: ''

			const blob = await response.blob()
			saveAs(blob, `${mediaName}${fileExtension}`)

			setIsDownloading(false)
			toast.success('Media file downloaded successfully!')
		} catch (error) {
			setIsDownloading(false)
			console.error('Error occurred during download:', error)
		}
	}

	return (
		<div className='w-full h-fit'>
			{/* {isDownloading && <Loader />} */}
			<div className='flex items-center justify-between gap-3 border-b border-gray-200 py-5'>
				<div className='flex items-center'>
					<MdOutlineKeyboardArrowLeft
						size={30}
						onClick={() => router.back()}
						className='mr-1'
					/>
					<div className='flex flex-col'>
						<p className='font-semibold text-xl text-gray-700'></p>
						<small className='font-medium text-gray-500'>
							Click{' '}
							<span
								onClick={() => router.push(`/dashboard/tasks`)}
								className='text-secondary'>
								here
							</span>{' '}
							to see all your Tasks
						</small>
					</div>
				</div>
			</div>

			<div className=' mt-5 md:px-8 md:mt-8 mx-auto py-4 w-1/2 bg-gray-50 '>
				<div className='flex items-center justify-between bg-gray-50 p-6 mb-[2rem] shadow-lg'>
					<div className='flex w-full md:w-[70%] gap-2 items-center'>
						<img
							src={
								icons?.find((icon) => icon.platform === newTask?.platform)?.icon
							}
							alt={newTask?.platform}
							className='hidden md:flex'
						/>
						<div className='flex flex-col gap-3'>
							{/* {setCreatedAtDate(formatDate(newTask?.createdAt))} */}
							{/* <small>{createdAtDate}</small> */}
							<p className='text-gray-800 text-sm md:text-[15px]'>
								{newTask?.title}
							</p>
							<div className='flex flex-col gap-2'>
								<div className='flex flex-col items-center gap-2 md:flex-row'>
									<div className='text-gray-600 text-[9px] flex gap-1 items-center mt-2'>
										<label htmlFor='pricing' className='font-bold'>
											To Earn:
										</label>
										<p>₦{newTask?.toEarn}/task</p>
									</div>

									<div className='text-gray-600 text-[9px] flex gap-1 items-center mt-2'>
										<label htmlFor='pricing' className='font-bold'>
											Tasks Submitted Already:
										</label>
										<p>{ad?.tasks}</p>
									</div>

									<div className='text-gray-600 text-[9px] flex gap-1 items-center mt-2'>
										<label htmlFor='pricing' className='font-bold'>
											Units Left:
										</label>
										<p
											className={`${
												ad?.desiredROI < 2
													? 'text-red-800 font-bold'
													: 'text-green-800'
											}`}>
											{ad?.desiredROI}
										</p>
									</div>
									<img
										src={
											icons?.find((icon) => icon.platform === newTask?.platform)
												?.icon
										}
										alt={newTask?.platform}
										className='md:hidden w-[25px] h-[25px]'
									/>
								</div>

								{/* Status badge */}
								<div className='md:hidden md:flex-col md:w-[30%] gap-1 text-gray-100 py-2 rounded-2xl'>
									<label
										htmlFor='status'
										className='font-bold text-[12px] text-gray-600'>
										Status:
									</label>
									<p
										className={`w-full text-[12px] flex  justify-center items-center py-2 px-3 gap-2 
                            ${
															newTask?.status === 'Approved'
																? 'bg-secondary'
																: 'bg-red-700'
														} rounded-2xl`}>
										{newTask?.status}
										<span>
											{newTask?.status === 'Approved' && <CheckmarkIcon />}
										</span>
									</p>
								</div>
							</div>
						</div>
					</div>

					{/* Status badge */}
					<div className='hidden md:flex md:flex-col md:w-[30%] items-center gap-1 text-gray-100 py-2 px-4 rounded-2xl'>
						<label
							htmlFor='status'
							className='font-bold text-[12px] text-gray-600'>
							Status:
						</label>
						<p
							className={`w-full text-[12px] flex text-center justify-center items-center py-2 px-3 gap-2 ${
								newTask?.status === 'Approved' ? 'bg-secondary' : 'bg-red-700'
							} rounded-2xl`}>
							{newTask?.status}
							<span>{newTask?.status === 'Approved' && <CheckmarkIcon />}</span>
						</p>
					</div>
				</div>

				{/* Message from Admin */}
				{newTask?.message ? (
					<div className='w-full md:w-[500px] text-center mb-[2rem]'>
						<label className='text-gray-500 font-bold text-center mb-[1rem]'>
							Message from Admin:
						</label>
						<p className='text-gray-600 font-normal'>{newTask?.message}</p>
					</div>
				) : (
					''
				)}

				{/* Ad Caption */}
				{newTask?.caption ? (
					<div className='w-fit flex flex-col md-w-500px text-center items-center mx-auto mb-[2rem]'>
						<label className='text-gray-500 font-bold text-center mb-[1rem]'>
							Message from Advertiser:
						</label>
						<div className='flex flex-col items-center gap-1'>
							<p>
								<span className='text-tertiary'>NOTE:</span> Kindly include the
								caption below in your post on your WhatsApp Status
							</p>

							<div className='flex gap-1 items-center justify-center w-full'>
								<textarea
									ref={adCaptionRef}
									value={newTask?.caption}
									readOnly
									className='border border-gray-200 p-3 w-full md:w-[400px] h-fit'></textarea>
								<Image
									src={copy}
									alt='click to copy ref link'
									className='w-[30px] h-[30px]'
									onClick={handleAdCaptionCopy}
								/>
							</div>
						</div>
					</div>
				) : (
					''
				)}

				{/* Ad Image */}
				{adMedia && adMedia?.length > 0 ? (
					<div className='w-fit flex flex-col text-center items-center mx-auto md-w-500px mb-[2rem]'>
						<label className='text-gray-500 font-bold text-center mb-[1rem]'>
							Download Media:
						</label>
						<p>
							<span className='text-tertiary'>NOTE:</span> Download the media
							below and post on your WhatsApp status
						</p>

						{/* Display image and video previews */}
						{adMedia?.map((item, index) => {
							// Image or video preview
							return (
								<div key={index} className='my-[2rem]'>
									{item?.secure_url.endsWith('.jpg') ||
									item?.secure_url.endsWith('.png') ||
									item?.secure_url.endsWith('.jpeg') ? (
										<img
											src={item?.secure_url}
											alt='preview'
											className='w-full h-full object-cover'
										/>
									) : item?.secure_url.endsWith('.mp4') ||
									  item?.secure_url.endsWith('.webm') ||
									  item?.secure_url.endsWith('.ogg') ? (
										<video controls className='w-full h-full object-cover'>
											<source src={item?.secure_url} type='video/mp4' />
											Your browser does not support the video tag.
										</video>
									) : null}

									<button
										onClick={() =>
											handleDownload(item?.secure_url, item?.public_id)
										}
										className='bg-green-700 text-gray-50 px-5 py-2 rounded-2xl mt-[1rem] hover:bg-tertiary'>
										{!isDownloading && 'Download'}
										{isDownloading && 'Downloading...'}
									</button>
								</div>
							)
							// Handle other file types as needed
							return null
						})}
					</div>
				) : (
					''
				)}

				{/* Verification Instructions */}
				<div className='w-full md-w-500px text-center mb-[2rem]'>
					<h1 className='text-gray-500 font-bold text-center mb-[1rem]'>
						Verification Instructions
					</h1>
					<p>
						<span className='text-tertiary'>NOTE:</span> Immediately you perform
						the task, take a screenshot of the task performed on{' '}
						{newTask?.platform}
					</p>
					<div className='mt-2'>
						<p>{newTask?.taskVerification}</p>
					</div>
				</div>

				{/* Task link */}
				{hideLinkInputFields ? (
					''
				) : (
					<div className='flex flex-col gap-2'>
						<label
							htmlFor='task link'
							className='text-gray-500 font-bold text-center '>
							Task Link
						</label>
						<div className='w-full md:w-[500px] flex items-center justify-center mx-auto'>
							<input
								type='link'
								value={newTask?.socialPageLink}
								readOnly
								ref={linkRef}
								className='w-full h-[20px] px-6 py-5 text-gray-800 bg-gray-200 rounded-r rounded-2xl'
							/>

							{/* <Link
								href={newTask?.socialPageLink}
								target='_blank'
								rel='noopener noreferrer'
								className='w-[4rem] h-[20px] px-5 py-5 bg-secondary text-primary text-[9px]'>
								Visit
							</Link> */}
						</div>
						<small className='w-full md:w-[500px] mx-auto text-gray-400 text-[12px] text-center'>
							Remember, the task you were given is {newTask?.service} on{' '}
							{newTask?.platform}, use the link or username to perform this task
						</small>
					</div>
				)}

				<div className='flex flex-col items-center gap-3 mt-[4rem]'>
					{/* Submition Form */}
					<form onSubmit={handleOnSubmit} className='flex flex-col'>
						{/* Upload ScreenSHot */}

						{newTask?.status === 'Approved' ||
						newTask?.status === 'Submitted' ? (
							''
						) : (
							<div className='w-full h-full flex flex-col pt-[1rem] items-center border-gray-200'>
								<label
									htmlFor='upload proof of work'
									className='text-gray-500 font-bold text-center mb-[1rem]'>
									Upload Proof of work
								</label>
								<p className='text-tertiary font-bold'>
									Ensure to upload the right proof to avoid your account being
									banned
								</p>
								<div className='w-full h-fit flex flex-wrap items-center justify-center gap-2 p-5'>
									{selectedImages?.map((item, index) => (
										<div key={index} className='relative w-[200px] h-[200px]'>
											<img
												src={item}
												alt='preview'
												className='w-full h-full object-cover'
											/>
											<GiCancel
												size={20}
												className='absolute text-tertiary top-0 right-0 pr-1 pt-1'
												onClick={(e) => handleImageRemove(item)}
											/>
										</div>
									))}
								</div>

								{/* File Upload Input Tag  */}
								<input
									type='file'
									name='images'
									placeholder='Upload Screenshots'
									multiple
									onChange={handleImageChange}
									className='w-full p-3 shadow-inner rounded-2xl bg-gray-50 md:w-[300px]'
								/>
							</div>
						)}

						{/* Social Account Link */}
						{hideUsernameDisplayField ? (
							''
						) : (
							<div className='w-full md:w-[500px] flex flex-col items-center mt-[2rem] mx-auto'>
								<label
									htmlFor='social media username'
									className='text-gray-500 font-bold text-center mb-[1rem]'>
									Fill in your {newTask?.platform} Username
								</label>
								<input
									type='text'
									name='userSocialName'
									value={userSocialName}
									placeholder='Enter your social media username'
									onChange={handleInputChange}
									className='py-2 px-6 text-gray-800 bg-gray-200 rounded-2xl'
								/>
							</div>
						)}

						{newTask?.status === 'Approved' ||
						newTask?.status === 'Submitted' ||
						taskSubmitted ? (
							''
						) : (
							<button
								type='submit'
								className='flex items-center justify-center gap-2 w-full md:w-[300px] bg-secondary text-gray-100 py-3 px-6 mt-5 rounded-full mx-auto hover:bg-tertiary'>
								{!isLoading && 'Submit'}
								{isLoading && 'Submitting...'}
							</button>
						)}
					</form>
					{taskSubmitted ? (
						<button
							onClick={() => router.push(`/dashboard/tasks`)}
							className='text-green-700 text-[14px] px-6 py-2 flex items-center gap-1'>
							<span>
								<BiArrowToLeft />
							</span>
							Go to your task list page
						</button>
					) : (
						''
					)}
				</div>
			</div>
		</div>
	)
}

export default TaskPerform
