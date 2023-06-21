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

const TaskSingle = () => {
    const {id} = useParams()
    const tasks = useSelector(selectTasks)
    const users = useSelector(selectUsers)
    const [task, settask] = useState()
    const navigate = useNavigate()
    const [taskPerformer, setTaskPerformer] = useState()
    const [advertiser, setAdvertiser] = useState()

    useEffect(() => {
      const taskDetails = tasks?.find(task => task?._id === id)
      const taskPerformerDetails = users?.find(user => user._id === task?.taskPerformerId)
      const advertiserDetails = users?.find(user => user._id === task?.advertiserId)

      settask(taskDetails)
      setTaskPerformer(taskPerformerDetails)
      setAdvertiser(advertiserDetails)
    }, [])

  return (
    <div className = 'w-full h-fit'>
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
        <div className='flex items-center gap-3 mt-3'>
          <FaUser size={100} className='text-gray-800'/>
            <div className='flex flex-col gap-1'>
              <h3 className='text-[18px]'>{taskPerformer?.fullname}</h3>
              <small className='text-gray-700 font-semibold'>@{taskPerformer?.username}</small>
              <button className='px-4 py-2 bg-secondary text-primary hover:bg-gray-900 mt-2'>View Task Performer</button>
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

              <div className='flex flex-col'>
                <label htmlFor="" className='font-bold'>Advert Details:</label>
                <p className='flex items-center'><span>Advertiser Name:</span> {advertiser?.fullname} <span><MdKeyboardDoubleArrowRight /></span></p>
              </div>

            </div>

            <div className='flex items-center gap-[4rem] mt-3'>

              <div className='flex flex-col'>
                <label htmlFor="" className='font-bold'>Platform:</label>
                <p>{task?.platform}</p>
              </div>

              <div className='flex flex-col'>
                <label htmlFor="" className='font-bold'>Service:</label>
                <p>{task?.service}</p>
              </div>

            </div>

            <div className='flex items-center gap-[4rem] mt-3'>
              <div className='flex flex-col'>
                <label htmlFor="" className='font-bold'>Ad Units:</label>
                <div className='flex gap-1 items-baseline'>
                  <p>{task?.desiredROI}</p>
                  <small className='text-[9px] text-gray-700 font-bold'>₦{task?.costPerTask}/unit</small>
                </div>
                
              </div>

              <div className='flex flex-col'>
                <label htmlFor="" className='font-bold'>Amount to Earn:</label>
                <p>{task?.toEarn}</p>
              </div>
            </div>

            <div className='flex items-center gap-[4rem] mt-3'>
              <div className='flex flex-col'>
                <label htmlFor="" className='font-bold'>Task Proof URL:</label>
                <div className='flex gap-1 items-baseline'>
                  <p>{task?.nameOnSocialPlatform}</p>
                </div>
              </div>

              <div className='flex flex-col'>
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

          {/* Task Media Submit  */}
          <div className='w-[400px] h-[400px] mx-auto mt-6'>
            <img src={task?.proofOfWorkMediaURL?.url ? task?.proofOfWorkMediaURL?.url : placeholder} alt="" className='w-full h-full object-cover'/>
          </div>
        </div>
        

        {/* Advert Controls */}
        <div className='mt-[1rem]'>
          <div className='mb-[1rem] flex items-center gap-1'>
            <input type="checkbox" name="isWeeklyFree" id="" />
            <label htmlFor="">Feature in Weekly free Adverts</label>
          </div>
          
          <div className='flex gap-2'>
            <button className='py-2 px-5 bg-tertiary text-primary'>Delete</button>
            <button className='py-2 px-5 bg-secondary text-primary'>Message Advertiser</button>
          </div>
        </div>
      </div>

    </div>
  )
}

export default TaskSingle