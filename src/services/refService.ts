import api from '@/helpers/Api'
import { BACKEND_URL } from '../utils/globalConfig'

// Ref Challenge

// Get Ongoing Ref Challenge
export const getOngoingRefChallenge = async () => {
	const response = await api.get(`${BACKEND_URL}/api/ref/challenge`)
	return response.data
}

// Get All Ref Challenges
export const getAllChallenges = async () => {
	const response = await api.get(`${BACKEND_URL}/api/ref/challenge/all`)
	return response.data
}

// Ref Bonus

// Convert Ref bonus pts to wallet funds
export const handleRefPtsConv = async (userId: string) => {
	const response = await api.post(
		`${BACKEND_URL}/api/ref/bonus/convert`,
		userId,
	)
	console.log(response)
	return response.data
}
