import copy from '@/assets/copy.png'
import { saveAs } from 'file-saver'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { CheckmarkIcon, toast } from 'react-hot-toast'
import { BiArrowToLeft } from 'react-icons/bi'
import { GiCancel } from 'react-icons/gi'
import { IoClose, IoTimeOutline } from 'react-icons/io5'
import { useDispatch, useSelector } from 'react-redux'
import { cn } from '../../../helpers'
import loaderImg from '../../assets/loader.gif'
import { selectUser, selectUserId } from '../../redux/slices/authSlice'
import { handleGetUserTasks, selectTasks } from '../../redux/slices/taskSlice'
import Button from '../Button'

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
	handleImageChange: (e: any[]) => void
	handleImageRemove: (item: string) => void
	isLoading: boolean
	icons: any[]
	onClose: () => void
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
	onClose,
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
		console.log('🚀 ~ useEffect ~ selecectTask:', { selecectTask, ad })

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

	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		onDrop: handleImageChange,
		// accept: 'image/*',
		multiple: true,
	})

	return (
		<div className=' mt-5 relative md:px-8 md:mt-8 mx-4 md:mx-auto overflow-scroll h-[90%] rounded-lg py-4 md:w-1/2 bg-gray-50 '>
			<IoClose
				className='absolute top-4 right-4 cursor-pointer'
				onClick={onClose}
			/>
			<h1 className='text-gray-500  font-bold text-lg text-center mb-[1rem]'>
				Verification Instructions
			</h1>
			<div className='grid gap-6 p-4 my-[2rem] md:grid-cols-2'>
				{/* Verification Instructions */}
				<div className=' '>
					<p>
						<span className='text-tertiary'>NOTE:</span> Immediately you perform
						the task, take a screenshot of the task performed on{' '}
						{newTask?.platform}
					</p>
					<div className='mt-2'>
						<p>{newTask?.taskVerification}</p>
					</div>
				</div>
				<div className=' bg-gray-50 p-6 mb-[2rem] border rounded '>
					<div className='flex w-full gap-2 items-center'>
						<Image
							src={
								icons?.find((icon) => icon.platform === newTask?.platform)?.icon
							}
							alt={newTask?.platform}
							className='hidden md:flex h-10 w-10'
						/>
						<div className='flex flex-col gap-3'>
							{/* {setCreatedAtDate(formatDate(newTask?.createdAt))} */}
							{/* <small>{createdAtDate}</small> */}
							<p className='text-gray-800 text-sm md:text-[15px]'>
								{newTask?.title}
							</p>
						</div>
					</div>
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
							<Image
								src={
									icons?.find((icon) => icon.platform === newTask?.platform)
										?.icon
								}
								alt={newTask?.platform}
								className='md:hidden w-[25px] h-[25px]'
							/>
						</div>
					</div>

					{/* Status badge */}
					<div className='flex gap-1 text-gray-100 py-2 items-center rounded-2xl'>
						<label
							htmlFor='status'
							className='font-bold text-[12px] text-gray-600'>
							Status:
						</label>
						<p
							className={cn(
								' text-[12px] flex ml-2  justify-center items-center  gap-2',
								newTask?.status === 'Approved'
									? 'text-secondary'
									: 'text-red-700',
							)}>
							{newTask?.status}
							<span>
								{newTask?.status === 'Approved' ? (
									<CheckmarkIcon />
								) : newTask?.status === 'Submitted' ? (
									<IoTimeOutline />
								) : (
									<Image src={loaderImg} alt='loading...' className='h-4 w-4' />
								)}
							</span>
						</p>
					</div>
				</div>
				{/* Task link */}
				{hideLinkInputFields ? (
					''
				) : (
					<div className='flexflex-col gap-2 p-2'>
						<label
							htmlFor='task link'
							className='text-gray-500 font-bold text-center'>
							Task Link
						</label>
						<div className='bg-gray-200 text-gray-800 h-10 pl-4 mt-2  rounded-r rounded-2xl flex items-center w-full'>
							<input
								ref={linkRef}
								type='text'
								value={newTask?.socialPageLink || ''}
								disabled
								className='text-sm truncate w-[calc(100%-4rem)] bg-gray-200 border-none focus:outline-none'
							/>
							<Link
								href={newTask?.socialPageLink || ''}
								target='_blank'
								rel='noopener noreferrer'
								className='w-[4rem] h-full flex justify-center items-center bg-secondary text-primary text-base'>
								Visit
							</Link>
						</div>
						<small className='w-full mx-auto text-gray-400 text-[12px] text-center'>
							Remember, the task you were given is {newTask?.service} on{' '}
							{newTask?.platform}, use the link or username to perform this task
						</small>
					</div>
				)}
				{/* Ad Caption */}
				{newTask?.caption ? (
					<div className='w-fit flex flex-col md-w-500px gap-2 text-center items-center mx-auto '>
						<label className='text-gray-500 font-bold text-center '>
							Message from Advertiser:
						</label>
						<div className='flex flex-col items-center text-xs gap-1'>
							<div className='flex gap-1 items- justify-center w-full'>
								<textarea
									ref={adCaptionRef}
									value={newTask?.caption}
									readOnly
									className='border border-gray-200 p-3 w-full  h-fit'></textarea>
								<Image
									src={copy}
									alt='click to copy ref link'
									className='w-5 h-5 cursor-pointer'
									onClick={handleAdCaptionCopy}
								/>
							</div>
							<p>
								<span className='text-tertiary'>NOTE:</span> Kindly include the
								caption below in your post on your WhatsApp Status
							</p>
						</div>
					</div>
				) : (
					''
				)}

				{/* Ad Image */}
				{adMedia && adMedia?.length > 0 ? (
					<div className='w-fit flex flex-col text-center items-center mx-auto md:w-500px mb-[2rem]'>
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
						})}
					</div>
				) : (
					''
				)}
			</div>

			<div className='flex flex-col w-full items-center p-4 gap-3 '>
				{/* Submition Form */}
				<form onSubmit={handleOnSubmit} className='flex w-full flex-col'>
					{/* Upload ScreenSHot */}

					{newTask?.status === 'Approved' || newTask?.status === 'Submitted' ? (
						''
					) : (
						<div className='w-full h-full flex  flex-col pt-[1rem] items-center border-gray-200'>
							<label
								htmlFor='upload proof of work'
								className='text-gray-500 font-bold text-center'>
								Upload Proof of work
							</label>
							<p className='text-tertiary font-bold'>
								Ensure to upload the right proof to avoid your account being
								banned
							</p>
							<div className='w-full h-fit flex flex-wrap items-center justify-center gap-2 p-5'>
								{selectedImages?.map((item, index) => (
									<div key={index} className='relative w-[200px] h-[200px]'>
										<Image
											src={item}
											alt='preview'
											className='w-full h-full object-cover'
											width={200}
											height={200}
										/>
										<GiCancel
											size={20}
											className='absolute text-tertiary top-0 right-0 cursor-pointer pr-1 pt-1'
											onClick={() => handleImageRemove(item)}
										/>
									</div>
								))}
							</div>

							{/* File Upload Input Tag  */}
							{/* <input
								type='file'
								name='images'
								placeholder='Upload Screenshots'
								multiple
								onChange={handleImageChange}
								className='w-full p-3 shadow-inner rounded-2xl bg-gray-50 md:w-[300px]'
							/> */}

							{/* <input
								type='file'
								name='images'
								placeholder='Upload Screenshots'
								multiple
								onChange={handleImageChange}
								className='w-full p-3 shadow-inner rounded-2xl bg-gray-50 md:w-[300px]'
							/> */}

							<div
								{...getRootProps()}
								className={`w-full p-6 border-2 border-dashed rounded-2xl h-22 ${
									isDragActive
										? 'border-blue-500 bg-blue-50'
										: 'border-gray-300 bg-gray-50'
								}`}>
								<input {...getInputProps()} />
								{isDragActive ? (
									<p className='text-center text-blue-500'>
										Drop the files here...
									</p>
								) : (
									<p className='text-center text-gray-500'>
										Drag & drop some files here, or click to select files
									</p>
								)}
							</div>
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
						<Button
							className='mt-4 w-1/2 mx-auto'
							variant='solid'
							color='secondary'
							disabled={selectedImages.length < 1}
							type='submit'>
							{!isLoading && 'Submit'}
							{isLoading && 'Submitting...'}
						</Button>
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
		</div>
	)
}

export default TaskPerform
