import React from 'react'
import { icons} from '../../../components/data/socialIcon'
import { MdOutlineKeyboardArrowLeft } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'
import Loader from '../../../components/loader/Loader'
import { handleGetUserTasks, selectIsLoading, selectTasks } from '../../../redux/slices/taskSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import { useEffect } from 'react'
import {formatDate} from '../../../../utils/formatDate'

const TaskList = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [icon, setIcon] = useState('')
    const [platform, setPlatform] = useState("")
    const tasks = useSelector(selectTasks)
    const isLoading = useSelector(selectIsLoading)


    useEffect(() => {
        const getUserTasks = async() => {
            await dispatch(handleGetUserTasks())
        }
        getUserTasks()
    }, [dispatch])

    const checkTaskStatus = (task_Id, taskStatus) => {
             if (taskStatus === 'Awaiting Submission') {
                return ( <button onClick={() => goToTaskPage(task_Id)} className='flex justify-center gap-1 text-primary text-[9px] md:text-[15px] py-2 px-5 rounded-2xl bg-secondary'>Submit</button>);
             } 

            if (taskStatus === 'Submitted') {
                return ( <button onClick={() => handleSelect(e, task_Id)} className='flex justify-center gap-1 text-primary py-2 px-5 rounded-2xl bg-yellow-600 text-[9px] md:text-[15px]'>Pending Approval</button>);
            } 

            if (taskStatus === 'Rejected') {
                return ( <button onClick={() => handleSelect(e, task_Id)} className='flex justify-center gap-1 text-primary py-2 px-5 rounded-2xl bg-tertiary text-[9px] md:text-[15px]'>Rejected</button>);
            } 

            if (taskStatus === 'Approved') {
                return ( <button onClick={() => handleSelect(e, task_Id)} className='flex justify-center gap-1 text-primary py-2 px-5 rounded-2xl bg-secondary text-[9px] md:text-[15px]'>Approved</button>);
            } 
     }

     const goToTaskPage = (task_Id) => {
        navigate(`/dashboard/submittask/${task_Id}`) 
    }


    const handleSelect = async(e, taskId) => {
        e.preventDefault()
            navigate(`/dashboard/submittask/${taskId}`)
    }
 

  return (
    <div className='w-full h-fit'>
    {isLoading && <Loader />}
        <div>
            <div className='flex items-center gap-3 border-b border-gray-200 pb-6'>
                    <MdOutlineKeyboardArrowLeft size={30} onClick={() => (navigate(-1))}/>
                    <div className='flex flex-col'>
                        <p className='font-semibold text-xl text-gray-700'>Your Ongoing Tasks</p>
                        <small className='font-medium text-gray-500'>Click each task to see details and monitor</small>
                    </div>
            </div>

            <div className='md:px-8 mt-3 md:mt-8'>
         {tasks?.map(task => (
            <div className='flex items-center justify-between bg-gray-50 p-6 mb-[2rem] shadow-lg'>
                <div className='flex gap-2 items-center'>
                <img src={icons?.find((icon) => icon.platform === task.platform)?.icon} alt={task.platform} className='hidden md:flex'/>
                    <div className=''>
                        {/* <small>{formatDate(task.createdAt)}</small> */}
                        <h1 className='text-[15px] md:text-[18px] font-bold md:my-[-5px] p-0'>{task?.title}</h1>
                        <small className='text-gray-400 text-[9px]'>To Earn: {task.toEarn} Per {task.asset}</small>

                        <p className='text-gray-500 text-[15px]'>{task.caption}</p>

                        <div className='flex items-center gap-2'>
                        <ul className='flex gap-3 text-[13px]'>
                            <li>State: {task.state}</li>
                            <li>LGA: {task.lga}</li>
                        </ul>
                        <img src={icons?.find((icon) => icon.platform === task.platform)?.icon} alt={task.platform} className='flex md:hidden w-[20px] h-[20px]'/>

                        <div className='flex md:hidden'>
                            {checkTaskStatus(task?._id, task.status)}
                        </div>
                    </div>
                    </div>
                </div>
                   
                <div className='hidden md:flex'>
                    {checkTaskStatus(task?._id, task.status)}
                </div>
            </div>
        ))}
        </div>
        </div>
    </div>
  )
}

export default TaskList