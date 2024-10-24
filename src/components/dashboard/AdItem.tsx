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
  const [toggleTaskProofModal, setToggleTaskProofModal] = useState(false)
  const [taskProof, setTaskProof] = useState(null)
  const [openProofModal, setOpenProofModal] = useState(false)
  const [selectedProof, setSelectedProof] = useState<string | null>(null)

  const dispatch = useDispatch()
  const isError = useSelector(selectIsError)
  const isSuccess = useSelector(selectIsSuccess)
  const isLoading = useSelector(selectIsLoading)

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
    if (taskSubmitters?.length === 0) {
      toast.error('No Task Submitted')
      return
    }
    settoggleTaskPerformers((prev) => !prev)
  }

  const handleTaskApproval = async (e: any, clickedTask: any) => {
    e.preventDefault()

    if (clickedTask.status === 'Approved') {
      toast.success('Task has already been approved')
      return
    }

    if (!clickedTask?._id) {
      toast.error('Task information missing')
      return
    }

    dispatch(
      handleApproveTask({
        taskId: clickedTask._id,
        status: 'Approved',
        message: 'The advertiser approved this task',
      }) as any
    )

    if (isError) {
      toast.error('Error Approving Task')
      return
    }

    if (isSuccess) {
      toast.success('Task Approved')
      callback()
    }
  }

  const handleProofClick = (proofUrl: string) => {
    setSelectedProof(proofUrl)
    setOpenProofModal(true)
  }

  const handleCloseProofModal = () => {
    setOpenProofModal(false)
    setSelectedProof(null)
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
      className='relative border cursor-pointer hover:shadow flex w-full p-[1.5rem] rounded-2xl'
    >
      <Loader open={isLoading} />

      <Modal open={openProofModal} onClose={handleCloseProofModal}>
        <div className='flex items-center justify-center min-h-screen'>
          <div className='bg-white p-6 rounded-lg shadow-md'>
            {selectedProof ? (
              <Image
                src={selectedProof}
                alt='Proof'
                width={600}
                height={600}
                className='rounded-md'
              />
            ) : (
              'No proof available.'
            )}
            <button
              onClick={handleCloseProofModal}
              className='mt-4 bg-gray-500 text-white px-4 py-2 rounded'
            >
              Close
            </button>
          </div>
        </div>
      </Modal>

      <div className='bg-white p-4 rounded-lg shadow-md'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-2'>
            <Image
              src={icons.find((icon) => icon.platform === item.platform)?.icon}
              alt={item.platform}
              className='w-6 h-6'
            />
            <div>
              <span className='text-gray-500'>{formatDate(date)}</span>
              <h3 className='text-base font-medium'>{title}</h3>
            </div>
          </div>
        </div>

        <div className='mt-2'>
          <p className='text-gray-700'>
            <span className='font-medium'>Pricing:</span> ₦{adperPostAmt} per advert
          </p>
          <p className='text-gray-700'>
            <span className='font-semi-bold'>Approved Tasks:</span> {completedTasksCount}
          </p>
          <p className='text-gray-700'>
            <span className='font-medium'>Submitted Tasks:</span> {taskSubmitters?.length}
          </p>
        </div>

        <div className='mt-2'>
          <p>
            <span className='font-medium'>Link:</span>{' '}
            <a
              href={url}
              target='_blank'
              rel='noopener noreferrer'
              className='text-blue-500 underline'
            >
              {url.slice(0, 20)}...
            </a>
          </p>
          <p className='text-gray-700'>
            <span className='font-medium'>Ad Unit:</span> {roi}
          </p>
        </div>

        <div className='mt-4 flex justify-between'>
          <div className='text-lg font-medium'>Amount Paid: ₦{adBudget}</div>
          <span className={`px-2 py-1 rounded ${getPaymentStatusBgColor(status)}`}>
            {status}
          </span>
        </div>

        <div className='mt-4 flex justify-end'>
          <button className='px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600'>
            {payBtn}
          </button>
        </div>
      </div>
    </div>
  )
}

export default AdItem
