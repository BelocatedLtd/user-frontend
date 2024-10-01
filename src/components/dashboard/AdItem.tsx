import close from '@/assets/close.svg'
import { useEffect, useState } from 'react'
import toast, { CheckmarkIcon, LoaderIcon } from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import {
	handleApproveTask,
	selectIsError,
	selectIsLoading,
	selectIsSuccess,
} from '../../redux/slices/taskSlice'
import { formatDate } from '../../utils/formatDate'
import { icons } from '../data/socialIcon'
import TaskProofModal from '../ui/TaskProofModal'
//import Loader from '../../components/loader/Loader'
import { Modal } from '@mui/material'
import Image from 'next/image'
import { cn } from '../../../helpers'
import Loader from '../loader/Loader'

interface AdItemProps {
	id: string
	date: string
	title: string
	adperPostAmt: string
	roi: number
	adBudget: number
	adService: string
	status: string
	item: any
	url: string
	taskSubmitters: any[]
	user: any
	callback: () => void
	completedTasksCount: number
}

const AdItem = ({
	date,
	title,
	adperPostAmt,
	roi,
	adBudget,
	adService,
	status,
	item,
	url,
	user,
	id,
	taskSubmitters,
	callback,
	completedTasksCount,
}: AdItemProps) => {
	const [payBtn, setPayBtn] = useState('Pay Now')
	const [toggleTaskPerformers, settoggleTaskPerformers] = useState(false)
	// const [taskSubmitters, setTaskSubmitters] = useState()
	const dispatch = useDispatch()
	const isError = useSelector(selectIsError)
	const isSuccess = useSelector(selectIsSuccess)
	const isLoading = useSelector(selectIsLoading)
	const [toggleTaskProofModal, setToggleTaskProofModal] = useState(false)
	const [taskProof, setTaskProof] = useState()

	useEffect(() => {
		if (status == 'Pending') {
			return setPayBtn('Pay Now')
		}
		if (status == 'Running' || status == 'Allocating') {
			return setPayBtn('Monitor Campaign')
		}
		if (status == 'Rejected') {
			return setPayBtn('Edit Campaign')
		}
	}, [status, payBtn])

	const handleToggleTaskPerformers = (e: any) => {
		e.preventDefault()

		console.log('🚀 ~ handleToggleTaskPerformers ~ taskSubmitters:', {
			taskSubmitters,
			id,
		})

		if (taskSubmitters && taskSubmitters.length === 0) {
			toast.error('No Task Submitted')
			return
		}

		settoggleTaskPerformers(!toggleTaskPerformers)
	}

	function openPopup(e: any, tp: any) {
		e.preventDefault()

		setTaskProof(tp)
		// if (!tp) {
		//     toast.error("Sorry, proof of task not available")
		//     return
		// }

		setToggleTaskProofModal(!toggleTaskProofModal)
	}

	// Handle task for me.
	const handleTaskApproval = async (e: any, clickedTask: any) => {
		e.preventDefault()

		console.log(clickedTask)

		if (clickedTask.status === 'Approved') {
			toast.success('Task has already being approved')
			return
		}

		const approveTaskData = {
			taskId: clickedTask?._id,
			status: 'Approved',
			message: 'The advertiser approved this task',
		}

		//If Advertiser Approves
		if (!clickedTask?._id) {
			toast.error('Task information missing')
			return
		}

		dispatch(handleApproveTask(approveTaskData) as any)

		if (isError) {
			toast.error('Error Approving Task')
		}

		if (isSuccess) {
			toast.success('Task Approved')
			callback()
		}
	}

	const getPaymentStatusBgColor = (status: any) => {
		switch (status) {
			case 'Pending':
				return 'bg-yellow-500'
			case 'Running':
			case 'Allocating':
				return 'bg-green-500'
			case 'Rejected':
				return 'bg-red-500'
			case 'Completed':
				return 'bg-blue-500'
			default:
				return 'bg-gray-500'
		}
	}

	return (
		<div
			onClick={handleToggleTaskPerformers}
			className='relative border cursor-pointer hovershadow flex w-full h-fit p-[1.5rem] rounded-2xl '>
			<Loader open={isLoading} />

			{toggleTaskProofModal && (
				<TaskProofModal toggleTaskProof={openPopup} task={taskProof} />
			)}
			{/* Close icon to delete ad campaign */}
			{status == 'pending' && (
				<Image
					src={close}
					alt='close'
					// size={20}
					className=' text-tertiary w-[28px] h-[28px]'
				/>
			)}

			{/* ad details left */}
			<div className='w-full md:w-[92%] flex flex-3 flex-col'>
				<div className='flex'>
					{/* Social media icon  right */}
					<div className='hidden w-[40px] h-[40px] md:flex md:mr-2'>
						<Image
							src={icons?.find((icon) => icon.platform === item.platform)?.icon}
							alt=''
							className='w-full h-full object-cover'
						/>
					</div>
					{/* ad details first layer */}
					<div className='flex flex-col mb-[1.5rem] border-b border-gray-100 pb-4'>
						<small className='text-gray-400 font-semibold text-[9px]'>
							{formatDate(date)}
						</small>
						<h1 className='font-bold text-sm md:text-lg text-gray-800'>
							{title}
						</h1>
						<small className='text-[9px] text-gray-400 font-semibold'>
							Pricing: ₦{adperPostAmt} per advert post
						</small>
					</div>
				</div>

				<div className='flex flex-row gap-2 justify-between'>
					<div className='flex flex-col'>
						<div className='flex flex-col'>
							<label className='font-extrabold text-[12px] text-gray-700 md:text-[14px] md:font-bold'>
								Ad Unit Remaining:
							</label>
							<small className='text-gray-500 font-bold'>{roi}</small>
						</div>

						<div className='flex flex-col mt-[1rem]'>
							<label className='font-extrabold text-[12px] text-gray-700 md:text-[14px] md:font-bold'>
								Amount Paid:
							</label>
							<small className='text-gray-500 font-bold'>₦{adBudget}</small>
						</div>

						<div className='flex flex-col mt-[1rem]'>
							<label className='font-extrabold text-[12px] text-gray-700 md:text-[14px] md:font-bold'>
								Link
							</label>
							{url ? (
								<small className='text-gray-500 font-bold'>
									<a href={url} className='text-blue-600'>
										{url.slice(0, 20)}...
									</a>
								</small>
							) : (
								'N/A'
							)}
						</div>
					</div>

					<div className='flex flex-col'>
						<div>
							<label className='font-extrabold text-[12px]  text-gray-700 mr-1 md:text-[14px] md:font-bold'>
								Ad Service:
							</label>
							<small className='text-gray-500 font-bold'>{adService}</small>
						</div>

						<div className=''>
							<label className='font-extrabold text-[12px] text-gray-700 mr-1 md:text-[14px] md:font-bold'>
								Status:
							</label>
							<small
								className={cn(
									'bg-yellow-600 text-primary px-3 py-1 rounded-full',
									getPaymentStatusBgColor(status),
								)}>
								{status}
							</small>
						</div>

						<div className='w-fit flex flex-col justify-start gap-2 text-[10px] py-2 mt-[1rem] md:text-[14px]'>
							<div className='flex gap-2'>
								<div className=''>
									<label className='font-extrabold text-[12px] text-gray-700 mr-1 md:text-[14px] md:font-bold'>
										Tasks Submitted:
									</label>
									<span className='text-[12px]'>{taskSubmitters?.length}</span>
								</div>
								<div className=''>
									<label className='font-extrabold text-[12px] text-gray-700 mr-1 md:text-[14px] md:font-bold'>
										Tasks Completed:
									</label>
									<span className='text-[12px]'>{completedTasksCount}</span>
								</div>
							</div>
							<ul className='flex items-center gap-2'>
								<li>
									<label className='font-extrabold text-[12px] text-gray-700 mr-1 md:text-[14px] md:font-bold'>
										Gender:
									</label>
									<p className='text-[12px]'>{item?.gender}</p>
								</li>
								<li>
									<label className='font-extrabold text-[12px] text-gray-700 mr-1 md:text-[14px] md:font-bold'>
										State:
									</label>
									<p className='text-[12px]'>{item?.state}</p>
								</li>
								<li>
									<label className='font-extrabold text-[12px] text-gray-700 mr-1 md:text-[14px] md:font-bold'>
										LGA:
									</label>
									<p className='text-[12px]'>{item?.lga}</p>
								</li>

								<li>
									{/* Social media icon  right */}
									<div className='flex md:hidden w-[25px] h-[25px]'>
										<Image
											src={
												icons?.find((icon) => icon.platform === item.platform)
													?.icon
											}
											alt=''
											className='w-full h-full'
										/>
									</div>
								</li>
							</ul>
							{/* Task Performer Button */}
						</div>
					</div>
				</div>
				{/* <div className='w-full'>
					<Button
						onClick={handleToggleTaskPerformers}
						variant='solid'
						color='secondary'
						className='flex gap-1 mt-2 items-center w-full justify-center px-3 py-1 '>
						View and Monitor Results <span>{tasksUserAd?.length}</span>
					</Button>
				</div> */}
				{/* {!toggleTaskPerformers && ( */}
				<Modal
					open={toggleTaskPerformers}
					onClose={() => {
						settoggleTaskPerformers(false)
					}}
					aria-labelledby='modal-modal-title'
					aria-describedby='modal-modal-description'>
					<div className='flex flex-col justify-center items-center h-full '>
						<div className='relative  w-[85%] md:w-[600px] h-1/2 overflow-y-auto md:py-[2rem] rounded-2xl p-4 bg-primary'>
							{taskSubmitters?.map((tp: any) => (
								<div className='w-full border-gray-200 py-[1rem]' key={tp._id}>
									<div className='task performer details mb-[1rem] flex justify-between w-full gap-1'>
										<div>
											<small className='text-gray-400 font-semibold'>
												Perfomer Username: @{tp?.taskPerformerId?.username}
											</small>
											<h3 className='font-bold text-gray-600'>
												Perfomer Fullname: {tp?.taskPerformerId?.fullname}
											</h3>
											<span className='text-gray-400 font-semibold text-[9px]'>
												{formatDate(tp?.createdAt)}
											</span>
										</div>

										<div className='flex items-center gap-2'>
											<button
												onClick={(e) => handleTaskApproval(e, tp)}
												className={`
                                ${
																	tp?.status === 'Approved'
																		? 'bg-green-600'
																		: 'bg-yellow-600'
																} 
                                flex items-center gap-2 rounded-2xl px-3 py-2 text-primary hover:bg-orange-400`}>
												{tp?.status === 'Approved' ? 'Approved' : 'Approve'}
												<span>{isLoading && <LoaderIcon />}</span>
											</button>
										</div>
									</div>

									<div className='flex flex-col gap-3 md:items-center justify-between mb-[1rem] md:flex-row'>
										<div className='first columns flex flex-col'>
											<label className='font-bold'>Social Media</label>
											<a
												href={tp?.socialPageLink}
												className='text-blue-600 hover:text-red-600 cursor-pointer'>
												{tp.socialPageLink.slice(0, 20)}...
											</a>
										</div>

										<div className='third columns'>
											<label className='font-bold'>Status</label>
											<p className='flex items-center gap-1'>
												<span>
													<CheckmarkIcon />
												</span>
												{tp?.status}
											</p>
										</div>
									</div>

									<div className='second columns flex mt-4 flex-col'>
										<label className='font-bold'>Proof</label>
										{tp?.proofOfWorkMediaURL?.[0]?.secure_url ? (
											<Image
												src={tp?.proofOfWorkMediaURL?.[0]?.secure_url}
												alt='proof'
												width={300}
												height={300}
											/>
										) : (
											'N/A'
										)}
									</div>
								</div>
							))}
						</div>
					</div>
				</Modal>
			</div>
		</div>
	)
}

export default AdItem
