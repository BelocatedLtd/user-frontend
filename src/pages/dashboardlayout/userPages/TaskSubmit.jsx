import React from 'react'
import { useState } from 'react'
import TaskPerform from './TaskPerform'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { handleSubmitTask, selectTasks, selectIsLoading, selectIsError, selectIsSuccess } from '../../../redux/slices/taskSlice'
import { selectUser, selectUserId } from '../../../redux/slices/authSlice'
import { useEffect } from 'react'
import { icons} from '../../../components/data/socialIcon'
import io from 'socket.io-client'
import { BACKEND_URL } from '../../../../utils/globalConfig'


const socket = io.connect(`${BACKEND_URL}`)



const TaskSubmit = () => {
    const dispatch = useDispatch()
    const userId = useSelector(selectUserId)
    const isLoading = useSelector(selectIsLoading)
    const isSuccess = useSelector(selectIsSuccess)
    const isError = useSelector(selectIsError)
    const navigate = useNavigate
    const user = useSelector(selectUser)
    const { taskId } = useParams()
    const tasks = useSelector(selectTasks)
    const [task, setTask] = useState()
    const [imageArray, setimageArray] = useState()
    const [selectedImages, setSelectedImages] = useState([])
    const [userSocialName, setUserSocialName] = useState("")


    //const { userSocialName } = taskSubmitData

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
        setUserSocialName(e.target.value);
      } 


     // Upload and preview multiple screenshots
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setimageArray(files)


    //Create an array of files previews
    const filePreviews = Array.from(files).map((file) => 
    URL.createObjectURL(file));

    setSelectedImages(filePreviews);
  }

  //Remove uploaded images
  const handleImageRemove = (imagePreview) => {
    //filter out the selected image and update the state
    const updatedImages = selectedImages.filter((preview) => preview !== imagePreview);

    setSelectedImages(updatedImages);

    //Revoke the object URL to release memory
    URL.revokeObjectURL(imagePreview);
    toast.success("Image discarded successfully")
  };

  //Append and prepare form data for transport
  const formData = new FormData();

  for (let i = 0; i < imageArray?.length; i++ ) {
    formData?.append('images', imageArray[i]);
  };

  formData.append('taskId', taskId);
  formData.append('userSocialName', userSocialName); 



    const handleOnSubmit = async (e) => {
      e.preventDefault()

      if (!imageArray) {
        toast.error("Please upload a screenshot to prove you performed the Task")
        return
      }
      
      

      await dispatch(handleSubmitTask({formData, token: user?.token}))  

        if (isSuccess) {
          navigate(`dashboard/tasks/${task.taskPerformerId}`)
           //Emit socket io event to the backend
            const emitData = {
              userId: user?.id,
              action: `@${user?.username} just performed a task on ${task?.platform}`
          }

          //Emit Socket event to update activity feed
          socket.emit('sendActivity', emitData) 
        }  

        if (isError) {
          toast.error('Task not submitted')
        }
      }


  return (
    <div className='w-full h-fit'>
        <TaskPerform 
            taskId = {taskId}
            // newTask= {task}
            isLoading = {isLoading}
            isError = {isError}
            icons={icons}
            userSocialName= {userSocialName}
            selectedImages={selectedImages}
            handleOnSubmit={handleOnSubmit} 
            handleInputChange={handleInputChange} 
            handleImageChange={handleImageChange} 
            handleImageRemove={handleImageRemove}
        />
    </div>
  )
}

export default TaskSubmit