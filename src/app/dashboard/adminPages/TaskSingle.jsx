import React from 'react'
import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { selectUsers } from '../../../redux/slices/userSlice';
import { FaUser } from 'react-icons/fa';
import { MdKeyboardDoubleArrowRight, MdOutlineKeyboardArrowLeft } from 'react-icons/md';
import { selectTasks } from '../../../redux/slices/taskSlice';
import { BiArrowToRight } from 'react-icons/bi';
import placeholder from '../../../assets/placeholder.jpg'
import TaskModal from '../../../components/adminComponents/TaskModal';
import Loader from '../../../components/loader/Loader';
import DeleteTaskModal from '../../../components/adminComponents/DeleteTaskModal';
import Carousel from '../../../components/Carousel';
import ImageGallery from '../../../components/ImageGallery';
import { selectAllAdverts } from '../../../redux/slices/advertSlice';
import { toast } from 'react-hot-toast';
import TaskProofModal from '../../../components/ui/TaskProofModal';

const TaskSingle = () => {
    const {id} = useParams()
    const tasks = useSelector(selectTasks)
    const users = useSelector(selectUsers)
    const adverts = useSelector(selectAllAdverts)
    const [task, settask] = useState()
    const navigate = useNavigate()
    const [taskPerformer, setTaskPerformer] = useState()
    const [advertiser, setAdvertiser] = useState()
    const [isLoading, setIsLoading] = useState(false)
    const [modalBtn, setModalBtn] = useState(false)
    const [delBtn, setDelBtn] = useState(false)
    const [slides, setSlides] = useState([])
    const [ad, setAd] = useState()
    const [toggleTaskProofModal, setToggleTaskProofModal] = useState(false)
    const [taskProof, setTaskProof] = useState()

    useEffect(() => {
      const taskDetails = tasks?.find(task => task?._id === id)
      const taskPerformerDetails = users?.find(user => user._id === taskDetails?.taskPerformerId)
      const advertiserDetails = users?.find(user => user._id === taskDetails?.advertiserId)
      const advert = adverts?.find(ad => ad._id === taskDetails?.advertId)

      settask(taskDetails)
      setSlides(taskDetails?.proofOfWorkMediaURL)
      setTaskPerformer(taskPerformerDetails)
      setAdvertiser(advertiserDetails)
      setAd(advert)
    }, [])

    //console.log(ad)

    const handleModal = () => {
      // if (ad?.status === 'Completed') {
      //   toast.error('Ad unit is completed and ad is no more running')
      //   return
      // }

      if (ad?.status === 'Pending Payment') {
        toast.error('Task is yet to start running')
        return
      }

      if (task?.status === 'Awaiting Submission') {
        toast.error('Task has not being performed yet')
        return
      }
 
      setModalBtn(!modalBtn)
    }

    const handleDelete = (e) => {
      e.preventDefault()
      setDelBtn(!delBtn)
    }

    function openPopup(e, task) {
      e.preventDefault()

      setTaskProof(task)
      // if (!task) {
      //     toast.error("Sorry, proof of task not available")
      //     return
      // }

          setToggleTaskProofModal(!toggleTaskProofModal)
          //window.open(imageUrl, '_blank', 'width=800,height=600,toolbar=no,scrollbars=yes,resizable=yes');

  }

  return (
    <div className = 'w-full h-fit'>
      {modalBtn && <TaskModal handleModal={handleModal} task={task} taskPerformer={taskPerformer} />}

      {delBtn && <DeleteTaskModal handleDelete={handleDelete} task={task}/>}
      {toggleTaskProofModal && <TaskProofModal toggleTaskProof={openPopup} task={taskProof} />}
      {isLoading && <Loader />}
      <div className='flex items-center gap-3 border-b border-gray-200 pb-6'>
          <MdOutlineKeyboardArrowLeft size={30} onClick={() => (navigate(-1))}/>
          <div className='flex flex-col'>
              <p className='font-semibold text-xl text-gray-700'>Go back to Tasks</p>
              <small className='font-medium text-gray-500'>Here you can see the task details clearly and perform all sorts of actions on it.</small>
          </div>
      </div>

      <div className='container shadow-xl py-[2rem] px-[2rem] mt-[2rem]'>
        {/* Task Performer Details */}
        <div className='box flex flex-col border-b border-gray-100 p-3 pb-6'>
        <label htmlFor="adverter" className='text-secondary text-[25px] font-bold'>Task Performer</label>
        <div className='flex flex-col items-center gap-3 mt-3 md:flex-row'>
          <FaUser size={300} className='text-gray-800 border border-gray-100 p-[2rem] rounded-full'/>
            <div className='flex flex-col text-center gap-1 md:text-left'>
              <h3 className='text-[3rem]'>{taskPerformer?.fullname}</h3>
              <small className='text-gray-700 mt-[-0.7rem] mb-[1rem] font-semibold'>@{taskPerformer?.username}</small>
              <button onClick={() => navigate(`/admin/dashboard/user/${taskPerformer?._id}`)} className='px-4 py-2 bg-secondary text-primary hover:bg-gray-900 mt-2'>View Task Performer</button>
            </div>
        </div>
        </div>

        {/* Task Details */}
        <div className='flex flex-col  md:flex-row'>
          <div className='box flex flex-col border-b border-gray-100 p-3 pb-6'>
            <label htmlFor="adverter" className='text-secondary text-[25px] font-bold'>Task Details</label>
            <div className='flex flex-col gap-[1rem] mt-3 border-b border-gray-50 pb-6'>
              <div className='flex flex-col'>
                <label htmlFor="" className='font-bold'>Task Title:</label>
                <p>{task?.title}</p>
              </div>

              <div className='flex flex-col mt-4'>
                  <div className='flex flex-col items gap-[3rem] md:flex-row'>
                      <div className='border-b border-gray-50 pb-6 md:border-0'>
                        <label htmlFor="" className='font-bold'>Advertiser Name:</label>
                        <div onClick={() => navigate(`/admin/dashboard/user/${advertiser._id}`)} className='flex items-center cursor-pointer gap-1 hover:text-secondary'>
                          <p>{users?.find(user => user?._id === task?.advertiserId)?.username}</p>
                          <MdKeyboardDoubleArrowRight className='text-secondary '/>
                        </div>
                      </div>

                      <div>
                        <label htmlFor="" className='font-bold'>Advert Id:</label>
                        <div onClick={() => navigate(`/admin/dashboard/advert/${task?.advertId}`)} className='flex items-center cursor-pointer gap-1 hover:text-secondary'>
                          <p>{task?.advertId}</p>
                          <MdKeyboardDoubleArrowRight className='text-secondary '/>
                        </div>
                      </div>
                  </div>
              </div>

            </div>

          {/* Task Sub Details */}
          <div className='user__details__container flex flex-col gap-1 md:gap-[4rem] md:flex-row'>
            <div className='left flex flex-col gap-1 md:gap-[4rem] mt-3'>
                <div className='flex flex-col border-b border-gray-50 py-3'>
                  <label htmlFor="" className='font-bold'>Platform:</label>
                  <p>{task?.platform}</p>
                </div>

                <div className='flex flex-col border-b border-gray-50 py-3'>
                  <label htmlFor="" className='font-bold'>Service:</label>
                  <p>{task?.service}</p>
                </div>

                <div className='flex flex-col border-b border-gray-50 py-3'>
                  <label htmlFor="" className='font-bold'>Task Proof URL:</label>
                  <div className='flex gap-1 items-baseline'>
                    <p>{task?.nameOnSocialPlatform}</p>
                  </div>
                </div>
            </div>

            <div className='right flex flex-col gap-1 md:gap-[4rem] mt-3'>
              <div className='flex flex-col border-b border-gray-50 py-3'>
                <label htmlFor="" className='font-bold'>Ad Units:</label>
                <div className='flex gap-1 items-baseline'>
                  <p>{task?.desiredROI}</p>
                  <small className='text-[9px] text-gray-700 font-bold'>₦{task?.costPerTask}/unit</small>
                </div>
                
              </div>

              <div className='flex flex-col border-b border-gray-50 py-3'>
                <label htmlFor="" className='font-bold'>Ad Status:</label>
                <div className='flex gap-1 items-baseline'>
                  <p>{adverts?.find(ad => ad._id === task?.advertId)?.status}</p>
                </div>
              </div>

              <div className='flex flex-col border-b border-gray-50 py-3'>
                <label htmlFor="" className='font-bold'>Amount to Earn:</label>
                <p>₦{task?.toEarn}</p>
              </div>

              <div className='flex flex-col border-b border-gray-50 py-3'>
                <label htmlFor="" className='font-bold'>Task Status:</label>
                <p className={`
                ${task?.status === "Pending" && 'pending'}
                ${task?.status === "Running" && 'running'}
                ${task?.status === "Allocating" && 'allocating'}
                ${task?.status === "Completed" && 'completed'}
                ${task?.status === "Rejected" && 'rejected'}
                `}>
                  {task?.status}
                </p>
              </div>
            </div>
          </div>

          </div>

          {/* Task Media Submit  */}
          <div className='md:w-[400px] md:h-[400px] mx-auto md:mt-6'>
            {/* <ImageGallery  images = {slides}/> */}
          <div className='w-full h-full justify-center md:mt-[5rem] flex-1 md:flex'>
          {task?.proofOfWorkMediaURL?.length === 0 && (
            <div className='max-w-lg '>
                <p>No Proof uploaded yet</p>
            </div>
          )}

          {task?.proofOfWorkMediaURL?.length >= 1 && (
            <div className='w-full h-[400px]'>
                {/* <img src={task?.proofOfWorkMediaURL[0]?.secure_url} className='w-full h-full object-cover'/> */}
                <a onClick={(e) => openPopup(e, task)} className='text-blue-600 hover:text-red-600'>
  Click to view
    </a>
            </div>
          )}

          {/* {task?.proofOfWorkMediaURL?.length > 1 && (
            <Carousel autoSlide={true} >
            {slides?.map((s, index) => (
                <img key={index} src={s.secure_url} className='w-full h-full object-cover'/>
            ))}
            </Carousel>
          )} */}
          </div>
          </div>
        </div>
        

        {/* Task Controls */}
        <div className='mt-[1rem]'>
          <div className='flex flex-col md:flex-row gap-2'>
            <button onClick={handleModal} className='py-2 px-5 bg-secondary text-primary'>Approve/Reject</button>
            <button onClick={handleDelete} className='py-2 px-5 bg-tertiary text-primary'>Delete</button>
          </div>
        </div>
      </div>

    </div>
  )
}

export default TaskSingle