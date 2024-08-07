import { SET_LOGOUT } from '@/redux/slices/authSlice'
import { store } from '@/redux/store'
import { BACKEND_URL } from '@/utils/globalConfig'
import { getToken } from '@/utils/tokenHandler'
import axios from 'axios'

const baseURL = BACKEND_URL

console.log('backend running on' + baseURL)

// Create an Axios instance with the base URL
const api = axios.create({
	baseURL: `${baseURL}`,
})

// Add an interceptor to include JWT in request headers if available
api.interceptors.request.use(
	(config) => {
		const jwt = getToken() // Replace GetStoredAuthToken() with the function to get the JWT from your storage or state

		if (jwt) {
			config.headers.Authorization = `Bearer ${jwt}`
		}

		return config
	},
	(error) => {
		return Promise.reject(error)
	},
)

// Add an interceptor to handle response errors
api.interceptors.response.use(
	(response) => {
		return response
	},
	(error) => {
		if (error.response) {
			const { status, data } = error.response
			console.log('🚀 ~ status, data:', status, data)
			if (
				status === 401 &&
				data.message === 'An error occurred - Token Expired'
			) {
				store.dispatch(SET_LOGOUT())
			}
		}
		return Promise.reject(error)
	},
)

export default api
