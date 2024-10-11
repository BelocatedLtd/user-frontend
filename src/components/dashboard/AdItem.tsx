
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
	const dispatch = useDispatch()
	const isError = useSelector(selectIsError)
	const isSuccess = useSelector(selectIsSuccess)
	const isLoading = useSelector(selectIsLoading)
	const [toggleTaskProofModal, setToggleTaskProofModal] = useState(false)
	const [taskProof, setTaskProof] = useState()

	useEffect(() => {
		if (status === 'Pending') {
			return setPayBtn('Pay Now')
		}
		if (status === 'Running' || status === 'Allocating') {
			return setPayBtn('Monitor Campaign')
		}
		if (status === 'Rejected') {
			return setPayBtn('Edit Campaign')
		}
	}, [status])

	const handleToggleTaskPerformers = (e: any) => {
		e.preventDefault()

		if (taskSubmitters && taskSubmitters.length === 0) {
			toast.error('No Task Submitted')
			return
		}

		settoggleTaskPerformers(!toggleTaskPerformers)
	}

	function openPopup(e: any, tp: any) {
		e.preventDefault()

		setTaskProof(tp)
		setToggleTaskProofModal(!toggleTaskProofModal)
	}

	const handleTaskApproval = async (e: any, clickedTask: any) => {
		e.preventDefault()

		if (clickedTask.status === 'Approved') {
			toast.success('Task has already been approved')
			return
		}

		const approveTaskData = {
			taskId: clickedTask?._id,
			status: 'Approved',
			message: 'The advertiser approved this task',
		}

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
		<div onClick={handleToggleTaskPerformers} className='relative border cursor-pointer hovershadow flex w-full h-fit p-[1.5rem] rounded-2xl '>
			<Loader open={isLoading} />

			{toggleTaskProofModal && (
				<TaskProofModal toggleTaskProof={openPopup} task={taskProof} />
			)}
			{status === 'Pending' && (
				<Image
					src={close}
					alt='close'
					className=' text-tertiary w-[28px] h-[28px]'
				/>
			)}

			{/*	<div className='w-full md:w-[92%] lg:w-full flex flex-3 flex-col'>
  <div className='flex'>
    <div className='hidden w-[40px] h-[40px] md:flex md:mr-2'>
      <Image
        src={icons?.find((icon) => icon.platform === item.platform)?.icon}
        alt=''
        className='w-full h-full object-cover'
      />
    </div>
    <div className='flex flex-col mb-[1rem] border-b border-gray-100 pb-3'>
      <small className='text-gray-400 font-medium text-[9px]'>
        {formatDate(date)}
      </small>
      <h1 className='font-medium text-sm text-gray-800'>{title}</h1>
      <small className='text-[9px] text-gray-400'>
        Pricing: ₦{adperPostAmt} per advert post
      </small>
    </div>
  </div>

  <div className='flex flex-row gap-2 justify-between'>
    <div className='flex flex-col'>
      <div className='flex flex-col'>
        <label className='font-semibold text-[6px] text-gray-700 md:text-[8px]'>
          Ad Unit Remaining:
        </label>
        <small className='text-gray-500'>{roi}</small>
      </div>

      <div className='flex flex-col mt-[1rem]'>
        <label className='font-semibold text-[6px] text-gray-700 md:text-[8px]'>
          Amount Paid:
        </label>
        <small className='text-gray-500'>₦{adBudget}</small>
      </div>

      <div className='flex flex-col mt-1'>
        <label className='font-semibold text-[12px] text-gray-700 md:text-[14px]'>
          Link
        </label>
        {url ? (
          <small className='text-gray-500'>
            <a href={url} className='text-blue-600'>
              {url.slice(0, 10)}...
            </a>
          </small>
        ) : (
          'N/A'
        )}
      </div>
    </div>

    <div className='flex flex-col'>
      <div>
        <label className='font-semibold text-[12px] text-gray-700 md:text-[14px]'>
          Ad Service:
        </label>
        <small className='text-gray-500'>{adService}</small>
      </div>

      <div className=''>
        <label className='font-semibold text-[12px] text-gray-700 md:text-[14px]'>
          Status:
        </label>
        <small
          className={cn(
            'bg-yellow-600 text-primary px-2 py-1 rounded-full',
            getPaymentStatusBgColor(status),
          )}
        >
          {status}
        </small>
      </div>

      <div className='flex flex-row gap-2 mt-[1rem]'>
        <div className='flex flex-col'>
          <label className='font-semibold text-[12px] text-gray-700 md:text-[14px]'>
            Tasks Submitted:
          </label>
          <span className='text-[12px]'>{taskSubmitters?.length}</span>
        </div>

        <div className='flex flex-col'>
          <label className='font-semibold text-[12px] text-gray-700 md:text-[14px]'>
            Tasks Completed:
          </label>
          <span className='text-[12px]'>{completedTasksCount}</span>
        </div>
      </div>
      
      <ul className='flex items-center gap-2 mt-2'>
        <li>
          <label className='font-semibold text-[12px] text-gray-700 md:text-[14px]'>
            Gender:
          </label>
          <p className='text-[12px]'>{item?.gender}</p>
        </li>
        <li>
          <label className='font-semibold text-[12px] text-gray-700 md:text-[14px]'>
            State:
          </label>
          <p className='text-[12px]'>{item?.state}</p>
        </li>
        <li>
          <label className='font-semibold text-[12px] text-gray-700 md:text-[14px]'>
            LGA:
          </label>
          <p className='text-[12px]'>{item?.lga}</p>
        </li>

        <li>
          <div className='flex md:hidden w-[25px] h-[25px]'>
            <Image
              src={icons?.find((icon) => icon.platform === item.platform)?.icon}
              alt=''
              className='w-full h-full'
            />
          </div>
        </li>
      </ul>
    </div>
  </div>
</div>*/}





			
			<div className="my-orders-section w-full md:w-[92%] lg:w-full flex flex-col gap-4">
  
    <div className="order-card flex flex-col border rounded-lg p-4 bg-white shadow-sm">
      {/* Order Header */}
      <div className="order-header flex justify-between items-center mb-2">
        <div className="flex items-center">
          {/* Icon */}
          <div className="icon-container w-[40px] h-[40px] mr-2">
            <Image
              src={icons?.find((icon) => icon.platform === item.platform)?.icon}
              alt="icon"
              className="w-full h-full object-cover"
            />
          </div>
          {/* Order Details */}
          <div className="order-details">
            <small className="text-gray-400 font-medium text-xs">{formatDate(date)}</small>
            <h1 className="font-medium text-lg text-gray-800">{title}</h1>
            <small className="text-xs text-gray-400">Pricing: ₦{adperPostAmt} per advert post</small>
          </div>
        </div>
      </div>

      {/* Order Body */}
      <div className="order-body flex flex-col md:flex-row justify-between items-center gap-2">
        {/* Left Side */}
	<label className="font-semibold text-xs text-gray-700">Ad Service : </label>
        <div className="flex flex-wrap space-y-2">
          {adService}
          <div>
            <label className="font-semibold text-xs text-gray-700">Ad Unit Remaining : </label>
            <small className="text-gray-500">{roi}</small>
          </div>
          {/* Amount Paid */}
          <div>
            <label className="font-semibold text-xs text-gray-700">Amount Paid : </label>
            <small className="text-gray-500">₦{adBudget}</small>
          </div>
          {/* Link */}
          <div>
            <label className="font-semibold text-xs text-gray-700">Your Link : </label> {url ? (
            <small className="text-blue-600">
                    <a href={url} className='text-blue-600'>
              {url.slice(0, 10)}...
            </a>
          </small>
        ) : (
          'N/A'
        )}
          </div>
        </div>

        {/* Right Side */}
        <div className="flex flex-wrap space-x-2 space-y-2">
          {/* Status */}
          <div>
        <div className='flex flex-wrap'>
          <label className="font-semibold text-xs text-gray-600">
            Tasks Submitted :
          </label>
          <span className='text-[12px]'>{taskSubmitters?.length}</span>
        </div>

        <div className='flex flex-wrap'>
          <label className="font-semibold text-xs text-gray-600">
            Tasks Completed :
          </label>
          <span className='text-[12px]'>{completedTasksCount}</span>
        </div>
      </div>
      
      <ul className='flex items-center gap-2 mt-2'>
        <li>
          <label className="font-semibold text-xs text-gray-700">
            Gender:
          </label>
          <p className='text-[12px]'>{item?.gender}</p>
        </li>
        <li>
          <label className="font-semibold text-xs text-gray-700">
            State:
          </label>
          <p className='text-[12px]'>{item?.state}</p>
        </li>
        <li>
          <label className="font-semibold text-xs text-gray-700">
            LGA:
          </label>
          <p className='text-[12px]'>{item?.lga}</p>
        </li>
        </ul>
            <label className="font-semibold text-xs text-gray-700">Status</label>
            <small className={`px-2 py-1 rounded-full bg-yellow-600 text-primary ${getPaymentStatusBgColor(status)}`}>{status}</small>
          </div>
          {/* Button */}
          <div>
            <button className="btn bg-green-500 text-white rounded-md px-4 py-2">
              View & Monitor Results
            </button>
          </div>
        </div>
      </div>
</div>

			

				<Modal
					className='overflow-y-auto bg-none max-h-[80vh]'
					open={toggleTaskPerformers}
					onClose={handleToggleTaskPerformers}>
					<div className='absolute max-h-[80%] mt-[10%] overflow-y-scroll left-[5%] right-[5%] w-[90%] md:w-[60%] top-12 max-w-[80%] p-2 bg-white rounded-md shadow-lg'>
						<div className='flex items-center justify-between pb-5'>
							<h2 className='text-lg font-medium'>Task Performers</h2>
							<button
								onClick={handleToggleTaskPerformers}
								className='cursor-pointer font-medium'>
								Close
							</button>
						</div>

						<ul className='space-y-3'>
							{taskSubmitters?.map((tp) => (
								<li
									key={tp._id}
									className='p-4 border flex flex-col gap-3 rounded-md bg-gray-50'>
									<div className='flex justify-between items-center'>
										<span className='font-semibold'>{tp.user?.username}</span>
										<button
											className='font-medium bg-secondary text-primary p-2 rounded-lg'
											onClick={(e) => openPopup(e, tp)}>
											View Task Proof
										</button>
									</div>

									<div className='flex flex-col'>
										<label className='font-semibold text-[14px] text-gray-700'>
											Status:
										</label>
										<small
											className={cn(
												'bg-yellow-600 text-primary px-2 py-1 rounded-full',
												getPaymentStatusBgColor(tp.status),
											)}>
											{tp.status}
										</small>
									</div>

									<button
										onClick={(e) => handleTaskApproval(e, tp)}
										className='bg-green-500 text-white p-2 rounded-lg'>
										{tp.status === 'Approved'
											? 'Approved'
											: 'Approve Task'}
									</button>
								</li>
							))}
						</ul>
					</div>
				</Modal>
		</div>
	)
}

export default AdItem
