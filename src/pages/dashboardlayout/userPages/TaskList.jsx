import React from 'react'
import facebook from '../../../assets/social icons/facebook.svg'
//import instagram from '../../../assets/social icons/instagram.svg'
import tiktok from '../../../assets/social icons/tiktok.svg'
import twitter from '../../../assets/social icons/twitter.png'
import { MdOutlineKeyboardArrowLeft } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'
import Loader from '../../../components/loader/Loader'
import { handleGetUserTasks, selectIsLoading, selectTasks } from '../../../redux/slices/taskSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import { useEffect } from 'react'

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

            <div className='px-8 mt-8'>
         {tasks?.map(task => (
            <div className='flex items-center justify-between bg-gray-50 p-6 mb-[2rem] shadow-lg'>
                <div className='flex gap-2 items-center'>
                    <img src={task.platform} alt={task.platform} />
                    <div className=''>
                        <small>{task.createdAt}</small>
                        <h1 className='text-[18px] font-bold my-[-5px] p-0'>{`${task.desiredROI} ${task.asset} on ${task.platform}`}</h1>
                        <small className='text-gray-400 text-[9px]'>To Earn: {task.toEarn ? task.toEarn : "₦3"} Per {task.asset}</small>

                        <p className='text-gray-500 text-[15px]'>{task.caption}</p>

                        <div>
                        <ul className='flex gap-3'>
                            <li>State: {task.location}</li>
                            <li>Community: {task.community}</li>
                            <li>Religion: {task.religion}</li>
                        </ul>
                    </div>
                    </div>
                </div>
                    {/* {setMappedTaskId(task._id)} */}
                <div>
                    <button onClick={e => handleSelect(e, task._id)} disabled={task.status === "Approved"} className={`text-primary py-2 px-5 rounded-2xl ${task.status === "Approved" ? 'bg-secondary' : 'bg-tertiary'}`}>
                        {task.status === "Approved" && "Submitted & Approved"}
                        {task.status === "Submitted" && "Pending Approval"}
                        {task.status === "running" && "Submit Task"}
                    </button>
                </div>
            </div>
        ))}
        </div>
        </div>
    </div>
  )
}

export default TaskList