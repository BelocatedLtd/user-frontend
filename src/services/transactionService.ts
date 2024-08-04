import api from '@/helpers/Api'
import { BACKEND_URL } from '../utils/globalConfig'

// Pay for advert
// export const adBuy = async () => {
// 	try {
// 		const response = await axios.update(`${BACKEND_URL}/api/transactions/pay`)
// 		return response.data
// 	} catch (error: any) {
// 		const message =
// 			(error.response && error.response.data && error.response.data.message) ||
// 			error.message ||
// 			error.toString()
// 		toast.error(message)
// 	}
// }

// Get User Transactions List
export const getUserTransactions = async () => {
	const response = await api.get(`${BACKEND_URL}/api/transactions/userall`)
	return response.data
}

// Get Transactions List
export const getAllTransactions = async () => {
	const response = await api.get(`${BACKEND_URL}/api/transactions/all`)
	return response.data
}
