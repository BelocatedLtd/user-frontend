import api from '@/helpers/Api'
import { toast } from 'react-hot-toast'
import { BACKEND_URL } from '../utils/globalConfig'

interface TaskData {
	// Define the shape of your task data here
	title: string
	description: string
	// Add other fields as necessary
}

interface SubmitTaskData {
	// Define the shape of your submit task data here
}

interface ApproveTaskData {
	// Define the shape of your approve task data here
}

interface RejectTaskData {
	// Define the shape of your reject task data here
}

// Create Task
export const createTask = async (taskData: TaskData): Promise<any> => {
	const response = await api.post(`${BACKEND_URL}/api/tasks/create`, taskData)
	return response.data
}

// Get Task
export const getTask = async (taskId: string): Promise<any> => {
	const response = await api.get(`${BACKEND_URL}/api/tasks/task/${taskId}`)
	return response.data
}

// Get User Tasks - Gets a specific user tasks
export const getUserTasks = async (): Promise<any> => {
	const response = await api.get(`${BACKEND_URL}/api/tasks/task`)
	console.log('🚀 ~ getUserTasks ~ response:', response)
	return response.data
}

// Get All Tasks - Get all tasks from db
export const getTasks = async (): Promise<any> => {
	const response = await api.get(`${BACKEND_URL}/api/tasks`)
	return response.data
}

// Submit Task
export const submitTask = async (formData: SubmitTaskData): Promise<any> => {
	const response = await api.post(`${BACKEND_URL}/api/tasks/submit`, formData)
	return response.data
}

// Approve Task
export const approveTask = async (taskData: ApproveTaskData): Promise<any> => {
	const response = await api.post(`${BACKEND_URL}/api/tasks/approve`, taskData)
	return response.data
}

// Reject Task
export const rejectTask = async (taskData: RejectTaskData): Promise<any> => {
	const response = await api.post(`${BACKEND_URL}/api/tasks/reject`, taskData)
	return response.data
}

// Delete Task
export const deleteTask = async (taskId: string): Promise<any> => {
	try {
		const response = await api.delete(
			`${BACKEND_URL}/api/tasks/delete/${taskId}`,
		)
		return response.data
	} catch (error: any) {
		const message =
			(error.response && error.response.data && error.response.data.message) ||
			error.message ||
			error.toString()
		toast.error(message)
		throw new Error(message)
	}
}