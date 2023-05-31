import React, { useEffect } from 'react'
import AdBuyForm from '../../../components/forms/AdBuyForm'
import facebook from '../../../assets/social icons/facebook.svg'
//import instagram from '../../../assets/social icons/instagram.svg'
import tiktok from '../../../assets/social icons/tiktok.svg'
import twitter from '../../../assets/social icons/twitter.png'
import { useNavigate, useLocation, useParams, useSearchParams } from 'react-router-dom'
import { useState } from 'react'
import { LoaderIcon, toast } from 'react-hot-toast'
import { selectUser, selectUserId, selectUsername } from '../../../redux/slices/authSlice'
import socialPlatforms from '../../../components/data/assets'
import useRedirectLoggedOutUser from '../../../customHook/useRedirectLoggedOutUser'
import { MdOutlineKeyboardArrowLeft } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'
import { createNewTask, selectIsError, selectIsLoading, selectTasks } from '../../../redux/slices/taskSlice'

const TaskEarn = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const user = useSelector(selectUser)
    const userId = useSelector(selectUserId)
    const username = useSelector(selectUsername)
    const isLoading = useSelector(selectIsLoading)
    const isError = useSelector(selectIsError)
    const [icon, setIcon] = useState(null)
    const [newTask, setNewTask] = useState()
    const [taskSubmitted, setTaskSubmitted] = useState(false)
    const [mappedTaskId, setMappedTaskId] = useState()
    const tasks = useSelector(selectTasks)
    const {platformName} = useParams();
    const location = useLocation();
    const { filteredServiceAdvert, asset } = location.state || {};
    const [finalFilteredTasks, setFinalFilteredTasks] = useState([])

    useEffect(() => {
        if (user.email === "") {
          navigate(`/dashboard/${username}`)
        }
  }, [dispatch, user.email])


    useEffect(() => {
        if (platformName === "facebook") {
            setIcon(facebook)
        }
        if (platformName === "twitter") {
            setIcon(twitter)
        }
        if (platformName === "tiktok") {
            setIcon(tiktok)
        }

        //Filter all ads to get the ones this user is qualified to perform
        const filteredTasks = filteredServiceAdvert?.filter(advert => {
            const locationMatch = advert.location === user.location || advert.location === 'All'; 
            const communityMatch = advert.community === user.community || advert.community === 'All';
            const genderMatch = advert.gender === user.gender || advert.gender === 'All'; 
            
            return locationMatch && communityMatch && genderMatch;
        })

        //Setting the filtered ads to a state called finalFilteredTasks
       setFinalFilteredTasks(filteredTasks)
    }, [])
    

    //Handling click even on the button to perform task, this button should not create a new task if the user had already created a task for this ad
    const handleSelect = async(e, advert_Id) => {
        e.preventDefault()

        console.log(advert_Id)

        // Extracting the exact Ad that was clicked by user and checking if user has already applied to perform this task
        const taskCreatedAlreadyByUser = tasks?.find(task => 
            task.taskPerformerId === userId && task.advertId === advert_Id
            );

        // Happens if task has already being created by user 
        if (taskCreatedAlreadyByUser) {
            toast.error("You have already created a task for this Advert, Please perform the task and submit")
            setTaskSubmitted(true)
            console.log(taskCreatedAlreadyByUser)
            //navigate(`/dashboard/submittask/${taskCreatedAlreadyByUser._id}`)
        }

        // Happens if user has not applied to perform this task
        if (!taskCreatedAlreadyByUser) {
            setTaskSubmitted(false)

            // Extracting the information for this Advert that will be converted to task for this user and also checking if Advert is still in existence amd paid for
            const taskToPerform = finalFilteredTasks?.find(advert => advert._id === advert_Id);

            // Happens if advert meets all criteria to be performed as task
            if (taskToPerform) {

                // Creating task data 
                const taskData = {
                    advertId: taskToPerform._id,
                    advertiserId: taskToPerform.userId,
                    taskPerformerId: userId,
                    title: `${taskToPerform.desiredROI} ${taskToPerform.asset} on ${taskToPerform.platform}`,
                    platform: taskToPerform.platform,
                    asset: taskToPerform.asset,
                    desiredROI: taskToPerform.desiredROI,
                    toEarn: taskToPerform.toEarn ? taskToPerform.toEarn : 4,
                    gender: taskToPerform.gender,
                    location: taskToPerform.location,
                    community: taskToPerform.community,
                    religion: taskToPerform.religion,
                    caption: taskToPerform.caption,
                    socialPageLink: taskToPerform.socialPageLink,
                    // proofOfWorkMediaURL: '',
                    // nameOnSocialPlatform: '',
                }
                    const response = await dispatch(createNewTask(taskData))
                    setNewTask(response.payload)
                    console.log(response.payload)
                    //navigate(`/dashboard/submittask/${response?.payload?._id}`)
            }

            if (!taskToPerform) {
                toast.error ("Sorry, cannot find advert, so task cannot be created")
            }
        }   
    }

  return (
    <div className='w-full h-fit'>
        <div>
            <div className='flex items-center gap-3 border-b border-gray-200 pb-6'>
                    <MdOutlineKeyboardArrowLeft size={30} onClick={() => (navigate(-1))}/>
                    <div className='flex flex-col'>
                        <p className='font-semibold text-xl text-gray-700'>Perform Social Tasks on {platformName} and Earn Money</p>
                        <small className='font-medium text-gray-500'>Click <span onClick={() => (navigate(`/dashboard/tasks/${userId}`))} className='text-secondary'>here</span> to see and monitor your Tasks</small>
                    </div>
            </div>

            <div className='flex items-center gap-3 border-b border-gray-200'>
                <p className='font-normal text-[14px] text-gray-700 p-6'>You can earn consistently by posting adverts of various businesses and top brands on your social media accounts and performing simple social media tasks. There are <span className='text-tertiary font-bold'>({finalFilteredTasks.length})</span> {asset} tasks you are qualified to perform on {platformName}. To get started, simply click on any of the earning options shown below:</p>
            </div>
        </div>

        <div className='px-8 mt-8'>
         {finalFilteredTasks?.map(task => (
            <div className='flex items-center justify-between bg-gray-50 p-6 mb-[2rem] shadow-lg'>
                <div className='flex gap-2 items-center'>
                    <img src={icon} alt={platformName} />
                    <div className=''>
                        <small>{task.createdAt}</small>
                        <h1 className='text-[18px] font-bold my-[-5px] p-0'>{`${task.desiredROI} ${task.asset} on ${task.platform}`}</h1>
                        <small className='text-gray-400 text-[9px]'>To Earn: {task.toEarn ? task.toEarn : "₦3"} Per {task.asset}</small>

                        <p className='text-gray-500 text-[15px]'>{task.caption}</p>

                        <div>
                        <ul className='flex gap-3'>
                            <li>State: {task.location}</li>
                            <li>Community: {task.community}</li>
                        </ul>
                    </div>
                    </div>
                </div>
                <div>
                    <button onClick={e => handleSelect(e, task._id)} className={`flex items-center gap-1 text-primary py-2 px-5 rounded-2xl ${tasks?.find(task =>  task.taskPerformerId === userId && task.advertId === task._id) && 'bg-red-600'} ${!tasks?.find(task =>  task.taskPerformerId === userId && task.advertId === task._id) && 'bg-secondary'}`}>
                        {tasks?.find(task =>  task.taskPerformerId === userId && task.advertId === task._id) && "Task Submitted"}

                        {!tasks?.find(task =>  task.taskPerformerId === userId && task.advertId === task._id) && "Perform Task"}
                        <span>{isLoading && <LoaderIcon />}</span>
                        </button>
                </div>
            </div>
        ))}
        </div>
        

        
    </div>
  )
}

export default TaskEarn