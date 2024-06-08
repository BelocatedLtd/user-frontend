import { toast } from 'react-hot-toast'
import { BACKEND_URL } from '../utils/globalConfig'
import axios from 'axios'
import { getToken } from '../utils/tokenHandler'

const getAuthHeaders = () => {
	const token = getToken()

	if (token) {
		return {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		}
	}
}

// Get User Wallet Details
export const getWallet = async () => {
	const headers = getAuthHeaders()
	try {
		const response = await axios.get(
			`${BACKEND_URL}/api/transactions/wallet/user`,
			headers,
		)
		return response.data
	} catch (error) {
		const message =
			(error.response && error.response.data && error.response.data.message) ||
			error.message ||
			error.toString()
		toast.error(`${message}, Error retrieving user wallet`)
	}
}

// Get Wallet Details
export const getUserWallet = async () => {
	const headers = getAuthHeaders()
	try {
		const response = await axios.get(
			`${BACKEND_URL}/api/transactions/wallet/user`,
			headers,
		)
		return response.data
	} catch (error) {
		const message =
			(error.response && error.response.data && error.response.data.message) ||
			error.message ||
			error.toString()
		toast.error(message)
	}
}

// Get Wallet Details
export const getSingleUserWallet = async (id) => {
	const headers = getAuthHeaders()
	try {
		const response = await axios.get(
			`${BACKEND_URL}/api/transactions/wallet/user/${id}`,
			headers,
		)
		return response.data
	} catch (error) {
		const message =
			(error.response && error.response.data && error.response.data.message) ||
			error.message ||
			error.toString()
		toast.error(message)
	}
}

// Fund User Wallet
export const fundWallet = async (trxData) => {
	const headers = getAuthHeaders()
	try {
		const response = await axios.patch(
			`${BACKEND_URL}/api/transactions/fund`,
			trxData,
			headers,
		)
		return response.data
	} catch (error) {
		const message =
			(error.response && error.response.data && error.response.data.message) ||
			error.message ||
			error.toString()
		toast.error(message)
	}
}

// Withdraw User Wallet
export const withdrawWallet = async (trxData) => {
	const headers = getAuthHeaders()
	try {
		const response = await axios.post(
			`${BACKEND_URL}/api/transactions/withdraw`,
			trxData,
			headers,
		)
		return response.data
	} catch (error) {
		const message =
			(error.response && error.response.data && error.response.data.message) ||
			error.message ||
			error.toString()
		toast.error(message)
	}
}

// Get All Withdrawals
export const getWithdrawals = async () => {
	const headers = getAuthHeaders()
	try {
		const response = await axios.get(
			`${BACKEND_URL}/api/transactions/withdrawals`,
			headers,
		)
		return response.data
	} catch (error) {
		const message =
			(error.response && error.response.data && error.response.data.message) ||
			error.message ||
			error.toString()
		toast.error(message)
	}
}

// Get User Withdrawals
export const getUserWithdrawals = async (userId) => {
	const headers = getAuthHeaders()
	try {
		const response = await axios.get(
			`${BACKEND_URL}/api/transactions/withdrawals/${userId}`,
			headers,
		)
		return response.data
	} catch (error) {
		const message =
			(error.response && error.response.data && error.response.data.message) ||
			error.message ||
			error.toString()
		toast.error(message)
	}
}

// Confirm User Withdrawal Request
export const confirmWithdrawal = async (withdrawalRequestId) => {
	const headers = getAuthHeaders()
	try {
		const response = await axios.patch(
			`${BACKEND_URL}/api/transactions/withdrawals/confirm/${withdrawalRequestId}`,
			null,
			headers,
		)
		return response.data
	} catch (error) {
		const message =
			(error.response && error.response.data && error.response.data.message) ||
			error.message ||
			error.toString()
		toast.error(message)
	}
}

// Get User Withdrawals
export const deleteWithdrawal = async (withdrawalRequestId) => {
	const headers = getAuthHeaders()
	try {
		const response = await axios.delete(
			`${BACKEND_URL}/api/transactions/withdrawals/delete/${withdrawalRequestId}`,
			headers,
		)
		return response.data
	} catch (error) {
		const message =
			(error.response && error.response.data && error.response.data.message) ||
			error.message ||
			error.toString()
		toast.error(message)
	}
}
