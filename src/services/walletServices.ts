import api from '@/helpers/Api'
import { toast } from 'react-hot-toast'
import { BACKEND_URL } from '../utils/globalConfig'

// Define the types for the transaction data
interface TransactionData {
	amount: number
	accountNumber?: string
	bankCode?: string
	[key: string]: any
}

// Define the types for the responses
interface ApiResponse<T> {
	data: T
	status: number
	statusText: string
}

// Get User Wallet Details
export const getWallet = async (): Promise<any> => {
	try {
		const response: ApiResponse<any> = await api.get(
			`${BACKEND_URL}/api/transactions/wallet/user`,
		)
		return response.data
	} catch (error: any) {
		const message =
			(error.response && error.response.data && error.response.data.message) ||
			error.message ||
			error.toString()
		toast.error(`${message}, Error retrieving user wallet, Please Logout`)
	}
}

// Get Wallet Details
export const getUserWallet = async (): Promise<any> => {
	try {
		const response: ApiResponse<any> = await api.get(
			`${BACKEND_URL}/api/transactions/wallet/user`,
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

// Get Single User Wallet
export const getSingleUserWallet = async (id: string): Promise<any> => {
	try {
		const response: ApiResponse<any> = await api.get(
			`${BACKEND_URL}/api/transactions/wallet/user/${id}`,
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

// Fund User Wallet
export const fundWallet = async (trxData: TransactionData): Promise<any> => {
	try {
		const response: ApiResponse<any> = await api.patch(
			`${BACKEND_URL}/api/transactions/fund`,
			trxData,
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

// Initialize User Transaction
export const initTransaction = async (
	trxData: TransactionData,
): Promise<any> => {
	try {
		const response: ApiResponse<any> = await api.post(
			`${BACKEND_URL}/api/transactions/initialize-transaction`,
			trxData,
		)
		return response.data
	} catch (error: any) {
		const message =
			(error.response && error.response.data && error.response.data.message) ||
			error.message ||
			error.toString()
		throw new Error(message)
	}
}

// Withdraw User Wallet
export const withdrawWallet = async (
	trxData: TransactionData,
): Promise<any> => {
	try {
		const response: ApiResponse<any> = await api.post(
			`${BACKEND_URL}/api/transactions/withdraw`,
			trxData,
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

// Get All Withdrawals
export const getWithdrawals = async (): Promise<any> => {
	try {
		const response: ApiResponse<any> = await api.get(
			`${BACKEND_URL}/api/transactions/withdrawals`,
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

// Get User Withdrawals
export const getUserWithdrawals = async (userId: string): Promise<any> => {
	try {
		const response: ApiResponse<any> = await api.get(
			`${BACKEND_URL}/api/transactions/withdrawals/${userId}`,
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

// Confirm User Withdrawal Request
export const confirmWithdrawal = async (
	withdrawalRequestId: string,
): Promise<any> => {
	try {
		const response: ApiResponse<any> = await api.patch(
			`${BACKEND_URL}/api/transactions/withdrawals/confirm/${withdrawalRequestId}`,
			null,
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

// Delete User Withdrawal
export const deleteWithdrawal = async (
	withdrawalRequestId: string,
): Promise<any> => {
	try {
		const response: ApiResponse<any> = await api.delete(
			`${BACKEND_URL}/api/transactions/withdrawals/delete/${withdrawalRequestId}`,
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
