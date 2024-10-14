
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
 <div className="bg-white p-4 rounded-lg shadow-md mb-4">
      {/* Platform and Time */}
      <div className="flex items-center justify-between text-gray-600 text-sm">
        <div className="flex items-center gap-2">
          <Image
           src={icons?.find((icon) => icon.platform === item.platform)?.icon}
            alt={item.platform}
            className="w-6 h-6"
          />
          <span>{formatDate(date)}</span>
        </div>
      </div>

      {/* Order Title */}
      <h3 className="text-lg font-semibold text-black mt-2">
      {title}
      </h3>

      {/* Pricing and Followers */}
      <div className="mt-2 text-gray-700 text-sm">
      <p>Pricing: ₦{adperPostAmt} per advert post</p>
    <p>Task Completed: {completedTasksCount}</p>
    <p>Ad Unit: {roi}</p>
       
      </div>

      {/* Link */}
      <div className="mt-2">
        <span>Link - </span>
        <a
          href={url} 
          className="text-blue-500 underline"
          target="_blank"
          rel="noopener noreferrer"
        >
         {url.slice(0, 10)}...
        </a>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-4 text-sm text-gray-700">
    <div>
      <span className="font-semibold">Gender:</span> {item?.gender}
    </div>
    <div>
      <span className="font-semibold">LGA:</span> {item?.lga}
    </div>
    <div>
      <span className="font-semibold">State:</span> {item?.state}
    </div>
  </div>
      {/* Amount Paid and Status */}
      <div className="mt-4 flex justify-between items-center">
        <div className="text-lg text-black font-medium">
          Amount Paid:₦{adBudget}
        </div>
        <div className="flex items-center">
           <span
        className={`text-green-500 px-2 py-1 border border-green-500 rounded ${getPaymentStatusBgColor(status)}`}
      >
        {status}
      </span>
        </div>
      </div>

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
                                ${tp?.status === 'Approved'
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
  )
}

export default AdItem
