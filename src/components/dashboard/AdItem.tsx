
import close from '@/assets/close.svg';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import {
  handleApproveTask,
  selectIsError,
  selectIsLoading,
  selectIsSuccess,
  selectTasks,
} from '../../redux/slices/taskSlice';
import { formatDate } from '../../utils/formatDate';
import { icons } from '../data/socialIcon';
import TaskProofModal from '../ui/TaskProofModal';
import { Modal } from '@mui/material';
import Image from 'next/image';
import Loader from '../loader/Loader';




interface AdItemProps {
  id: string;
  date: string;
  title: string;
  adperPostAmt: string;
  roi: number;
  adBudget: number;
  adService: string;
  status: string;
  item: any;
  url: string;
  taskSubmitters: any[];
  user: any;
  callback: () => void;
  completedTasksCount: number;
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
  const [payBtn, setPayBtn] = useState('Pay Now');
  const [toggleTaskPerformers, setToggleTaskPerformers] = useState(false);
  const [taskPerformers, setTaskPerformers] = useState(taskSubmitters || []);
  const dispatch = useDispatch();
  const isError = useSelector(selectIsError);
  const isSuccess = useSelector(selectIsSuccess);
  const isLoading = useSelector(selectIsLoading);
  const [toggleTaskProofModal, setToggleTaskProofModal] = useState(false);
  const [taskProof, setTaskProof] = useState<any>(null);

  useEffect(() => {
    if (status === 'Pending') {
      setPayBtn('Pay Now');
    } else if (status === 'Running' || status === 'Allocating') {
      setPayBtn('Monitor Campaign');
    } else if (status === 'Rejected') {
      setPayBtn('Edit Campaign');
    }
  }, [status]);

  const handleToggleTaskPerformers = (e: any) => {
    e.preventDefault();
    if (!taskSubmitters || taskSubmitters.length === 0) {
      toast.error('No Task Submitted');
      return;
    }
    setToggleTaskPerformers(!toggleTaskPerformers);
  };

  function openPopup(e: any, tp: any) {
    e.preventDefault();
    setTaskProof(tp);
    setToggleTaskProofModal(!toggleTaskProofModal);
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

  const approveTask = async (taskId: string) => {
    await dispatch(handleApproveTask({ taskId, status: 'Approved' ,  message: 'The advertiser approved this task'}) as any);
  };

  const handleTaskApproval = async (e: any, clickedTask: any) => {
    e.preventDefault();
    e.stopPropagation();

    if (clickedTask.status === 'Approved') {
      toast.success('Task has already been approved');
      return;
    }

    if (!clickedTask?._id) {
      toast.error('Task information missing');
      return;
    }

    const updatedTask = { ...clickedTask, status: 'Approved' };
    
    // Optimistically update UI
    setTaskPerformers((prevTaskPerformers) =>
      prevTaskPerformers.map((tp) =>
        tp._id === clickedTask._id ? updatedTask : tp
      )
    );

    await approveTask(clickedTask._id);

    if (isError) {
      toast.error('Error Approving Task');
      // Revert UI update on error
      setTaskPerformers((prevTaskPerformers) =>
        prevTaskPerformers.map((tp) =>
          tp._id === clickedTask._id ? { ...tp, status: 'Pending' } : tp
        )
      );
    } else if (isSuccess) {
      toast.success('Task Approved');
    }
  };

  const getPaymentStatusBgColor = (status: string) => {
    switch (status) {
      case 'Pending':
        return 'bg-yellow-500';
      case 'Running':
      case 'Allocating':
        return 'bg-green-500';
      case 'Rejected':
        return 'bg-red-500';
      case 'Completed':
        return 'bg-blue-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div
      onClick={handleToggleTaskPerformers}
      className="relative border cursor-pointer hover:shadow flex w-full h-fit p-[1.5rem] rounded-2xl"
    >
      <Loader open={isLoading} />

      {toggleTaskProofModal && (
        <TaskProofModal toggleTaskProof={openPopup} task={taskProof} />
      )}
      {status === 'Pending' && (
        <Image
          src={close}
          alt="close"
          className="text-tertiary w-[28px] h-[28px]"
        />
      )}

      <div className="bg-white p-4 rounded-lg shadow-md mb-4 text-sm">
        <div className="flex items-center justify-between">
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
        <div className="mt-4 flex justify-end gap-2">
          <button className="px-3 py-1 text-white bg-blue-500 rounded hover:bg-blue-600">
            View & Monitor Results
          </button>
        </div>
      </div>

      <Modal
        open={toggleTaskPerformers}
        onClose={() => setToggleTaskPerformers(false)}
        aria-labelledby="task-performers-modal"
      >
        <div className="fixed inset-0 bg-white z-50 p-8 overflow-y-auto">
          <button
            onClick={() => setToggleTaskPerformers(false)}
            className="absolute top-4 right-4 p-2 bg-gray-100 rounded-full hover:bg-gray-200"
          >
            ✕
          </button>

          {taskPerformers?.map((tp: any) => (
            <div key={tp._id} className="border-b py-6">
              <h3 className="font-bold">Allocation Result</h3>
              <div className="flex justify-between items-center my-4">
                <div>
                  <p className="text-sm">@{tp?.taskPerformerId?.username}</p>
                
                </div>
               <button
                  onClick={(e) => handleTaskApproval(e, tp)}
                  className={`px-4 py-2 text-xs rounded ${
                    tp.status === 'Approved'
                      ? 'bg-green-500'
                      : 'bg-yellow-500 hover:bg-green-500'
                  } text-white`}
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
  );
};

export default AdItem;
