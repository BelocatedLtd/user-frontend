import React from 'react'
import { useState } from 'react'
import TaskPerform from './TaskPerform'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { handleSubmitTask, selectTasks, selectIsLoading, selectIsError } from '../../../redux/slices/taskSlice'
import { selectUser, selectUserId } from '../../../redux/slices/authSlice'
import { useEffect } from 'react'
import { icons} from '../../../components/data/socialIcon'


const initialState = {
  userSocialName: '',
}

const TaskSubmit = () => {
    const dispatch = useDispatch()
    const userId = useSelector(selectUserId)
    const isLoading = useSelector(selectIsLoading)
    const isError = useSelector(selectIsError)
    const navigate = useNavigate
    const user = useSelector(selectUser)
    const { taskId } = useParams()
    const tasks = useSelector(selectTasks)
    const [task, setTask] = useState()
    const [selectedImages, setSelectedImages] = useState([]);
    const location = useLocation();
    // const { newTask } = location.state || {};
    const [verificationProcess, setVerificationProcess] = useState("")
    const [taskSubmitData, setTaskSubmitData] = useState(initialState)


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
        setTaskSubmitData({...taskSubmitData, [name]: value});
      } 


     // Upload and preview multiple screenshots
  const handleImageChange = (e) => {
    const files = e.target.files;



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



    const handleOnSubmit = async (e) => {
      e.preventDefault()

      const formData = new FormData();
      selectedImages.forEach((image) => {
        formData.append('images', image);
      });
      formData.append('taskId', taskId);
      formData.append('userSocialName', userSocialName);   

      const response = await dispatch(handleSubmitTask(formData))  

        if (response.payload) {
          navigate(`dashboard/tasks/${task.taskPerformerId}`)
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
            taskSubmitData = {taskSubmitData}
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