import { BACKEND_URL } from '../../utils/globalConfig'
import axios from "axios"

// Create Task
export const createTask = async (taskData) => {
    const response = await axios.post(`${BACKEND_URL}/api/tasks/create`, taskData)
   return response.data   
}

// Get User Tasks
export const getUserTasks = async() => {
    const response = await axios.get(`${BACKEND_URL}/api/tasks/task`)
   return response.data      
}

// Get All Tasks
export const getTasks = async() => {
    const response = await axios.get(`${BACKEND_URL}/api/tasks`)
   return response.data      
}

// Submit task
export const submitTask = async (taskData) => {
    const response = await axios.post(`${BACKEND_URL}/api/tasks/submit`, taskData)
   return response.data   
}

// Approve task
export const approveTask = async (taskData) => {
    const response = await axios.patch(`${BACKEND_URL}/api/tasks/approve`, taskData)
   return response.data   
}

// Delete task
export const deleteTask = async (taskId) => {
    try {
        const response = await axios.delete(`${BACKEND_URL}/api/tasks/delete/${taskId}`)
        return response.data
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
         toast.error(message)
    }
}