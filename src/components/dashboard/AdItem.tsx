
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
  const [taskPerformers, setTaskPerformers] = useState(taskSubmitters || []) // Initialize with taskSubmitters
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
  const [openProofModal, setOpenProofModal] = useState(false);
  const [selectedProof, setSelectedProof] = useState<string | null>(null);

  const handleProofClick = (proofUrl: string) => {
    setSelectedProof(proofUrl);
    setOpenProofModal(true);
  };

  const handleCloseProofModal = () => {
    setOpenProofModal(false);
    setSelectedProof(null);
  };


 const handleTaskApproval = async (e: any, clickedTask: any) => {
    e.preventDefault();
    e.stopPropagation();

    if (clickedTask.status === 'Approved') {
      toast.success('Task has already been approved');
      return;
    }

    const approveTaskData = {
      taskId: clickedTask?._id,
      status: 'Approved',
      message: 'The advertiser approved this task',
    };

    if (!clickedTask?._id) {
      toast.error('Task information missing');
      return;
    }

    // Dispatch the action to approve the task
    await dispatch(handleApproveTask(approveTaskData) as any); // Ensure it's awaited

    if (isError) {
      toast.error('Error Approving Task');
    } else if (isSuccess) {
      toast.success('Task Approved');

      // Update local state directly to reflect the change
      setTaskPerformers((prevTaskPerformers) =>
        prevTaskPerformers.map((tp) =>
          tp._id === clickedTask._id ? { ...tp, status: 'Approved' } : tp
        )
      );
    }
  };
  
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

      <div className="bg-white p-4 rounded-lg shadow-md mb-4 text-sm">
        {/* Top Section: Icon, Date, Title */}
        <div className="flex items-center justify-between">
          {/* Icon and Date */}
          <div className="flex items-center gap-2">
            <Image
              src={icons?.find((icon) => icon.platform === item.platform)?.icon}
              alt={item.platform}
              className="w-6 h-6"
            />
            <div>
              <span className="text-gray-500">{formatDate(date)}</span>
              <h3 className="text-base font-medium text-black">{title}</h3>
            </div>
          </div>
        </div>

        {/* Pricing, Completed Tasks, and Submitted Tasks */}
        <div className="mt-2">
          <p className="text-gray-700 text-xs">
            <span className="font-bold">Pricing:</span> ₦{adperPostAmt} per advert
          </p>
          <p className="text-gray-700 text-xs">
            <span className="font-bold">Approved Tasks:</span> {completedTasksCount}
          </p>
          <p className="text-gray-700 text-xs">
            <span className="font-bold">Submitted Tasks:</span> {taskSubmitters?.length}
          </p>
        </div>

        {/* Link and Ad Unit */}
        <div className="mt-2">
          <p>
            <span className="font-medium">Link:</span>{' '}
            <a
              href={url}
              className="text-blue-500 underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              {url.slice(0, 20)}...
            </a>
          </p>
          <p className="text-gray-700 text-xs">
            <span className="font-bold">Ad Unit:</span> {roi}
          </p>
        </div>

        {/* Location Details */}
        <div className="mt-2 grid grid-cols-2 gap-4 text-xs">
          <div>
            <span className="font-bold">Gender:</span> {item?.gender}
          </div>
          <div>
            <span className="font-bold">LGA:</span> {item?.lga}
          </div>
          <div>
            <span className="font-bold">State:</span> {item?.state}
          </div>
        </div>

        {/* Amount Paid and Status */}
        <div className="mt-4 flex justify-between items-center">
          <div className="text-lg font-bold text-xs">
            <span>Amount Paid:</span> ₦{adBudget}
          </div>
          <div>
            <span
              className={`px-2 py-1 border border-green-500 rounded text-black ${getPaymentStatusBgColor(status)}`}
            >
              {status}
            </span>
          </div>
        </div>

        {/* View and Monitor Buttons */}
        <div className="mt-4 flex justify-end gap-2">
          <button className="px-3 py-1 text-white bg-blue-500 rounded hover:bg-blue-600">
            View & Monitor Results
          </button>
        </div>

      </div>

      {/* Task Performers Modal */}
      <Modal
        open={toggleTaskPerformers} // Keeps the modal open if state is true
  onClose={() => settoggleTaskPerformers(false)}
  aria-labelledby="task-performers-modal"
      >
        <div className="fixed inset-0 bg-white z-50 p-8 overflow-y-auto">
          <button
            onClick={() => settoggleTaskPerformers(false)} // Keep the close button intact for manual closure.
            className="absolute top-4 right-4 p-2 bg-gray-100 rounded-full hover:bg-gray-200"
          >
            ✕
          </button>

          {taskSubmitters?.map((tp: any) => (
            <div key={tp._id} className="border-b py-6">
              <h3 className="font-bold">Allocation Result</h3>
              <div className="flex justify-between items-center my-4">
                <div>
                  <p className="text-sm">@{tp?.taskPerformerId?.username}</p>
                  <p className="text-sm">{tp?.taskPerformerId?.fullname}</p>
                  <p className="text-xs text-gray-500">{formatDate(tp.createdAt)}</p>
                </div>

                <button
                  onClick={(e) => handleTaskApproval(e, tp)}
                  className={`px-4 py-2 rounded-md text-white ${tp.status === 'Approved' ? 'bg-green-500' : 'bg-yellow-500 hover:bg-yellow-600'
                    }`}
                >
                  {tp.status === 'Approved' ? 'Approved' : 'Approve'}
                </button>
              </div>

              <div className="flex justify-between items-center text-sm">
                <div>
                  <label>Social Media:</label>{' '}
                  <a
                    href={tp.socialPageLink}
                    className="text-blue-500 hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {tp.socialPageLink.slice(0, 13)}...
                  </a>
                </div>

                <div>
                  <label>Status:</label> {tp.status}
                </div>
              </div>

              <div className="mt-2">
                <label>Proof:</label>{' '}
                {tp.proofOfWorkMediaURL?.[0]?.secure_url ? (
                  <span
                    onClick={() => handleProofClick(tp.proofOfWorkMediaURL[0].secure_url)}
                    className="text-blue-500 hover:text-red-500 cursor-pointer"
                  >
                    View Proof
                  </span>
                ) : (
                  'N/A'
                )}
              </div>
            </div>
          ))}
        </div>
      </Modal>

      {/* Proof Modal */}
      <Modal open={openProofModal} onClose={handleCloseProofModal} aria-labelledby="proof-modal">
        <div className="flex items-center justify-center min-h-screen">
          <div className="bg-white p-6 rounded-lg shadow-md">
            {selectedProof ? (
              <Image src={selectedProof} alt="Proof" width={600} height={600} className="rounded-md" />
            ) : (
              'No proof available.'
            )}
            <button
              onClick={handleCloseProofModal}
              className="mt-4 bg-gray-500 text-white px-4 py-2 rounded"
            >
              Close
            </button>
          </div>
        </div>
      </Modal>

    </div>
  )
}

export default AdItem
