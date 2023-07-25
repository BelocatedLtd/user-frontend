import { toast } from 'react-hot-toast'
import { BACKEND_URL } from '../../utils/globalConfig'
import axios from "axios"

const user = JSON.parse(localStorage.getItem('user'))

// Create Task
export const createTask = async (taskData) => {
    const response = await axios.post(`${BACKEND_URL}/api/tasks/create`, taskData, {
        headers: {
            'Authorization': `Bearer ${user?.token}`
        }
     })
   return response.data   
}

// Get User Tasks
export const getUserTasks = async() => {
    const response = await axios.get(`${BACKEND_URL}/api/tasks/task`, {
        headers: {
            'Authorization': `Bearer ${user?.token}`
        }
     })
   return response.data      
}

// Get All Tasks
export const getTasks = async() => {
    const response = await axios.get(`${BACKEND_URL}/api/tasks`, {
        headers: {
            'Authorization': `Bearer ${user?.token}`
        }
     })
   return response.data      
}

// Submit task
export const submitTask = async (formData, token) => {
    const response = await axios.post(`${BACKEND_URL}/api/tasks/submit`, formData, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
     })
  return response.data   
}

// Approve task
export const approveTask = async (taskData) => {
    const response = await axios.post(`${BACKEND_URL}/api/tasks/approve`, taskData, {
        headers: {
            'Authorization': `Bearer ${user?.token}`
        }
     })
   return response.data   
}

// Reject task
export const rejectTask = async (taskData) => {
    const response = await axios.post(`${BACKEND_URL}/api/tasks/reject`, taskData, {
        headers: {
            'Authorization': `Bearer ${user?.token}`
        }
     })
   return response.data   
}

// Delete task
export const deleteTask = async (taskId) => {
    try {
        const response = await axios.delete(`${BACKEND_URL}/api/tasks/delete/${taskId}`, {
            headers: {
                'Authorization': `Bearer ${user?.token}`
            }
         })
        return response.data
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
         toast.error(message)
    }
}