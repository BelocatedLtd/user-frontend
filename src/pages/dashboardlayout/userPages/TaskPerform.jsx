import React from 'react'
import facebook from '../../../assets/social icons/facebook.svg'
//import instagram from '../../../assets/social icons/instagram.svg'
import tiktok from '../../../assets/social icons/tiktok.svg'
import twitter from '../../../assets/social icons/twitter.png'
import Loader from '../../../components/loader/Loader'
import { MdOutlineKeyboardArrowLeft } from 'react-icons/md'
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectTasks } from '../../../redux/slices/taskSlice';
import { useState } from 'react'
import { useEffect } from 'react'
import { selectUserId } from '../../../redux/slices/authSlice'
import { CheckmarkIcon, LoaderIcon } from 'react-hot-toast'

const TaskPerform = ({taskId, taskSubmitData, mediaUrl, imagePreview, handleOnSubmit, handleInputChange, handleImageChange, isLoading, isError}) => {
  const userId = useSelector(selectUserId)
  const tasks = useSelector(selectTasks)
  const [icon, setIcon] = useState('')
  const navigate = useNavigate()
 

  const newTask = tasks.find(task => task._id === taskId)

  useEffect(() => {
    if (newTask?.platform === "facebook") {
        setIcon(facebook)
    }
    if (newTask?.platform === "twitter") {
        setIcon(twitter)
    }
    if (newTask?.platform === "tiktok") {
        setIcon(tiktok)
    }

  }, [])

 

  return (
    <div className='w-full h-fit'>
      {/* {isLoading && <Loader />} */}
      <div className='flex items-center justify-between gap-3 border-b border-gray-200 pb-6'>
                <div className='flex items-center'>
                  <MdOutlineKeyboardArrowLeft size={30} onClick={() => (navigate(-1))} className='mr-1'/>
                      <div className='flex flex-col'>
                          <p className='font-semibold text-xl text-gray-700'></p>
                          <small className='font-medium text-gray-500'>Click <span onClick={() => (navigate(`/dashboard/tasks/${userId}`))} className='text-secondary'>here</span> to see all your Tasks</small>
                      </div>
                </div>          
      </div>

      <div className='px-8 mt-8'>
            <div className='flex items-center justify-between bg-gray-50 p-6 mb-[2rem] shadow-lg'>
                <div className='flex gap-2 items-center'>
                    <img src={icon} alt={newTask?.platform} />
                    <div className='flex flex-col gap-3'>
                        <small>{newTask?.createdAt}</small>
                        <h1 className='text-[18px] font-bold my-[-5px] p-0'>{newTask?.title}</h1>

                        <div className='text-gray-400 text-[9px] flex gap-1 items-center mt-2'>
                           <label htmlFor="pricing">To Earn:</label>
                            <p>₦{newTask?.toEarn / 2} per {newTask?.asset}</p> 
                        </div>

                        <p className='text-gray-500 text-[15px]'>{newTask?.caption}</p>
                    </div>
                </div>

                <div className='flex items-center gap-1 bg-tertiary text-gray-100 py-2 px-4 rounded-2xl'>
                  <label htmlFor="status" className='font-bold'>Status:</label>
                  <p className='flex items-center gap-2'>{newTask?.status}<span>{newTask?.status === "Approved" ? <CheckmarkIcon /> : <LoaderIcon />}</span></p>
                </div>

                {/* <div>
                    <button onClick={e => handleSelect(e, newTask._id)} className='bg-secondary text-primary py-2 px-5 rounded-2xl'>Perform Task</button>
                </div> */}
            </div>

            <div className='flex flex-col gap-2'>
              <label htmlFor="task link" className='text-center'>Task Link</label>
              <div className='flex items-center justify-center gap-0'>
                <input type="text" value={newTask?.socialPageLink} disabled className='w-[70%] py-4 pl-7 text-gray-800 bg-gray-200 rounded-r rounded-2xl'/>
                <button className='py-4 px-4 bg-secondary text-gray-100'>Visit Link</button>
              </div>
              <small className='text-gray-400 font-bold text-[14px] text-center'>Remember, the task you were given is to {newTask?.asset} on {newTask?.platform}, follow the link to perform this task</small>
            </div>

            <div className='flex flex-col items-center gap-3 mt-[4rem]'>
              {/* Submition Form */}
              <form onSubmit={handleOnSubmit} className='flex flex-col'>

                {/* Upload ScreenSHot */}
                <div className='w-full h-full flex flex-col pt-[1rem] items-center border-gray-200'>
                  <label htmlFor="upload proof of work" className='text-gray-500 font-bold text-center mb-[1rem]'>Upload Proof of work</label>
                      {imagePreview != null ? (
                        <img src={imagePreview} alt="Media file" className='w-full h-full object-cover rounded-2xl mb-2 border border-gray-200'/>
                      ) : (<p className='mb-2 text-sm text-gray-300 font-bold'>No Screenshot Uploaded Yet</p>)}

                      <input type="file" name="mediaUrl"  placeholder='Upload Image' onChange={(e) => handleImageChange(e)} className='w-[100px] p-3 shadow-inner rounded-2xl bg-gray-50 md:w-[300px]'/>
                </div>

                {/* Social Account Link */}
                <div className='flex flex-col mt-[2rem]'>
                  <label htmlFor="social media username" className='text-gray-500 font-bold text-center mb-[1rem]'>Username on Social Media</label>
                  <input type="text" name="userSocialName" placeholder='Enter your social media username' value={taskSubmitData?.userSocialName} onChange={handleInputChange} className='py-6 px-6 text-gray-800 bg-gray-200 rounded-2xl'/>
                </div>

                <button type="submit" className='flex items-center gap-2 w-full bg-secondary text-gray-100 py-3 px-6 mt-5 rounded-full'>Submit {isLoading && <LoaderIcon />}</button>
              </form>
            </div>
        </div>
    </div>
  )
}

export default TaskPerform