import axios from 'axios'
import { toast } from 'react-hot-toast'
import { BACKEND_URL } from '../utils/globalConfig'
import { getToken } from '../utils/tokenHandler'

const getAuthHeaders = () => {
	const token = getToken()

	if (token) {
		return {
			headers: {
				Authorization: `Bearer ${token}`,
				'Content-Type': 'application/x-www-form-urlencoded',
			},
		}
	}
}

// Create Advert
export const createAdvert = async (adFormData: FormData) => {
	const headers = getAuthHeaders()
	const response = await axios.post(
		`${BACKEND_URL}/api/adverts/create`,
		adFormData,
		headers,
	)
	return response.data
}

export const initializeAdvert = async (adFormData: FormData) => {
	const headers = getAuthHeaders()
	const response = await axios.post(
		`${BACKEND_URL}/api/adverts/initialize`,
		adFormData,
		headers,
	)
	return response.data
}

// Get User Adverts
export const getUserAdverts = async () => {
	const headers = getAuthHeaders()
	const response = await axios.get(`${BACKEND_URL}/api/adverts`, headers)
	return response.data
}

// Get All User Adverts
export const getAllUserAdverts = async () => {
	const response = await axios.get(`${BACKEND_URL}/api/adverts/all`)
	return response.data
}

// Set Advert to be Free
export const setAdvertFree = async (advertId: string) => {
	const headers = getAuthHeaders()
	const response = await axios.post(
		`${BACKEND_URL}/api/adverts/setadfree/${advertId}`,
		{ advertId },
		headers,
	)
	return response.data
}

// Delete Advert
export const deleteAdvert = async (advertId: string) => {
	const headers = getAuthHeaders()
	try {
		const response = await axios.delete(
			`${BACKEND_URL}/api/adverts/delete/${advertId}`,
			headers,
		)
		return response.data
	} catch (error: any) {
		const message =
			(error.response && error.response.data && error.response.data.message) ||
			error.message ||
			error.toString()
		toast.error(message)
	}
}

// Get Qualified Adverts
export const getQualifiedAdverts = async (platformName: string) => {
	const headers = getAuthHeaders()
	try {
		const response = await axios.get(
			`${BACKEND_URL}/api/adverts/qualified/${platformName}`,
			headers,
		)
		return response.data
	} catch (error: any) {
		const message =
			(error.response && error.response.data && error.response.data.message) ||
			error.message ||
			error.toString()
		toast.error(message)
	}
}

export const getTotalTasksByAllPlatforms = async () => {
	const headers = getAuthHeaders()

	const response = await axios.get(
		`${BACKEND_URL}/api/adverts/qualified`,
		headers,
	)
	return response.data
}
