import React from 'react'
import { useState } from 'react'
import TaskPerform from './TaskPerform'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { handleSubmitTask, selectTasks, selectIsLoading, selectIsError } from '../../../redux/slices/taskSlice'
import { selectUser, selectUserId } from '../../../redux/slices/authSlice'
import { useEffect } from 'react'

const initialState = {
    userSocialName: '',
}

const TaskSubmit = () => {
    const dispatch = useDispatch()
    const userId = useSelector(selectUserId)
    const [taskSubmitData, setTaskSubmitData] = useState(initialState)
    const isLoading = useSelector(selectIsLoading)
    const isError = useSelector(selectIsError)
    const navigate = useNavigate
    const user = useSelector(selectUser)
    const [mediaUrl, setMediaUrl] = useState(null)
    const [imagePreview, setImagePreview] = useState(null)
    const { taskId } = useParams()
    const tasks = useSelector(selectTasks)
    const [task, setTask] = useState()


    const { userSocialName } = taskSubmitData

    useEffect(() => {
      if (!user.email || !tasks) {
        navigate(-1)
      }
      }, [])
    

    useEffect(() => {
      setTask(tasks?.find(obj => obj._id === taskId))
    }, [])


    //Handle Input
    const handleInputChange = (e) => {
        const {name, value } = e.target;
        setTaskSubmitData({ ...taskSubmitData, [name]: value })
      }

     //Handle image preview
     const handleImageChange = (e) => {
      setMediaUrl(e.target.files[0])
      setImagePreview(URL.createObjectURL(e.target.files[0]))
        
    }

    const handleOnSubmit = async (e) => {
      e.preventDefault()
  
      if ( !userSocialName || !mediaUrl) {
        return toast.error("Make Sure All Fields Filled before you can submit")
      }
  
      if (!mediaUrl) {
        return toast.error("Please upload an screenshot")
      }
  
      if (userSocialName, mediaUrl) {
  
        const taskData = {
          taskId,
          advertId: task.advertId,
          taskPerformerId: task.taskPerformerId,
          userSocialName,
          mediaUrl,
          status: "Submitted"
        }

        

       const response = await dispatch(handleSubmitTask(taskData))

        console.log(response.payload)

        if (response.payload) {
          navigate(`dashboard/tasks/${task.taskPerformerId}`)
        }


          
      }
  }


  return (
    <div className='w-full h-fit'>
        <TaskPerform 
            taskId = {taskId}
            isLoading = {isLoading}
            isError = {isError}
            taskSubmitData = {taskSubmitData}
            mediaUrl={mediaUrl}
            imagePreview={imagePreview}
            handleOnSubmit={handleOnSubmit} 
            handleInputChange={handleInputChange} 
            handleImageChange={handleImageChange} 
        />
    </div>
  )
}

export default TaskSubmit