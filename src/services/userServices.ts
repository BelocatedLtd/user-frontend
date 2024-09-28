import api from '@/helpers/Api'
import toast from 'react-hot-toast'
import { BACKEND_URL } from '../utils/globalConfig'

//Get User
// export const getAllUser = async () => {
// 	try {
// 		const response = await api.get(`${BACKEND_URL}/api/user/all`)
// 		return response.data
// 	} catch (error: any) {
// 		const message =
// 			(error.response && error.response.data && error.response.data.message) ||
// 			error.message ||
// 			error.toString()
// 		toast.error(message)
// 	}
// }
