import api from '@/helpers/Api'
import { BACKEND_URL } from '../utils/globalConfig'

// Get Activity List
export const getAllActivities = async () => {
	const response = await api.get(`${BACKEND_URL}/api/activities`)
	return response.data
}

// Emptying activity feed
export const trashAllUserActivities = async () => {
	const response = await api.delete(`${BACKEND_URL}/api/activities/trash`)
	return response.data
}
