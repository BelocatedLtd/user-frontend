import api from '@/helpers/Api'
import { toast } from 'react-hot-toast'
import { BACKEND_URL } from '../utils/globalConfig'

interface UserRegistrationData {
	username: string
	email: string
	password: string
	// Add other fields as necessary
}

interface ApiResponse<T> {
	data: T
	statusText: string
}

interface LoginData {
	email: string
	password: string
}

interface ManageUserData {
	status: string
	userId: string
}

interface VerificationData {
	// Define the shape of your verification data here
}

interface OTPData {
	OTP: string
}

interface AccountDetailsData {
	// Define the shape of your account details data here
}

// Create New User
export const createNewUser = async (
	formData: UserRegistrationData,
): Promise<any> => {
	try {
		const response: ApiResponse<any> = await api.post(
			`${BACKEND_URL}/api/user/register`,
			formData,
		)
		if (response.statusText === 'Created') {
			// Handle the case where the user is successfully created
		}
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

// Create New User Ref
export const createNewUserRef = async (
	formData: UserRegistrationData,
): Promise<any> => {
	try {
		const response: ApiResponse<any> = await api.post(
			`${BACKEND_URL}/api/user/refregister`,
			formData,
		)
		if (response.statusText === 'Created') {
			// Handle the case where the user is successfully created
		}
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

// Create New User From Ref Challenge
export const createNewUserRefChal = async (
	formData: UserRegistrationData,
): Promise<any> => {
	try {
		const response: ApiResponse<any> = await api.post(
			`${BACKEND_URL}/api/user/refchalregister`,
			formData,
		)
		if (response.statusText === 'Created') {
			// Handle the case where the user is successfully created
		}
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

// Login User
export const loginUser = async (formData: LoginData): Promise<any> => {
	try {
		const response: ApiResponse<any> = await api.post(
			`${BACKEND_URL}/api/user/login`,
			formData,
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

// Get Login Status
export const getLoginStatus = async (): Promise<any> => {
	try {
		const response: ApiResponse<any> = await api.get(
			`${BACKEND_URL}/api/user/loggedin`,
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

// Get User
export const getUser = async (): Promise<any> => {
	try {
		const response: ApiResponse<any> = await api.get(`${BACKEND_URL}/api/user`)
		return response.data
	} catch (error: any) {
		const message =
			(error.response && error.response.data && error.response.data.message) ||
			error.message ||
			error.toString()
		toast.error(`${message}, Error retrieving user data, Please Log out`)
		throw new Error(message)
	}
}

// Get dashboard data
export const getDashboardData = async (): Promise<any> => {
	try {
		const response: ApiResponse<any> = await api.get(
			`${BACKEND_URL}/api/user/dashboard`,
		)
		return response.data
	} catch (error: any) {
		const message =
			(error.response && error.response.data && error.response.data.message) ||
			error.message ||
			error.toString()
		toast.error(`${message}, Error retrieving user data, please Logout`)
		throw new Error(message)
	}
}

// Update user details
export const updateUser = async (
	formData: Partial<UserRegistrationData>,
): Promise<any> => {
	const response: ApiResponse<any> = await api.patch(
		`${BACKEND_URL}/api/user/update`,
		formData,
	)
	return response.data
}

// Update user account details
export const updateUserAccountDetails = async (
	verificationData: VerificationData,
): Promise<any> => {
	try {
		const response: ApiResponse<any> = await api.patch(
			`${BACKEND_URL}/api/user/update/accountdetails`,
			verificationData,
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

// Update user bank account details
export const updateUserBankAccountDetails = async (
	verificationData: VerificationData,
): Promise<any> => {
	try {
		const response: ApiResponse<any> = await api.patch(
			`${BACKEND_URL}/api/user/update/bankaccountdetails`,
			verificationData,
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

// Verify User Password
export const verifyUserPassword = async (data: {
	password: string
}): Promise<any> => {
	try {
		const response: ApiResponse<any> = await api.post(
			`${BACKEND_URL}/api/user/verifypasswordchange`,
			data,
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

// Verify Old User Password
export const verifyOldUserPassword = async (data: {
	password: string
}): Promise<any> => {
	try {
		const response: ApiResponse<any> = await api.post(
			`${BACKEND_URL}/api/user/verifyoldpassword`,
			data,
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

// Change Password
export const changeUserPassword = async (data: {
	oldPassword: string
	newPassword: string
}): Promise<any> => {
	try {
		const response: ApiResponse<any> = await api.post(
			`${BACKEND_URL}/api/user/changePassword`,
			data,
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

// Reset forgotten password
export const forgottenPasswordChange = async (data: {
	email: string
}): Promise<any> => {
	try {
		const response: ApiResponse<any> = await api.post(
			`${BACKEND_URL}/api/user/forgotpassword`,
			data,
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

// Resend Verification Email
export const resendVerificationEmail = async (email: string): Promise<any> => {
	try {
		const response: ApiResponse<any> = await api.post(
			`${BACKEND_URL}/api/user/authverification/${email}`,
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

export const sendInviteEmail = async (email: string): Promise<any> => {
	try {
		console.log('🚀 ~ sendInviteEmail ~ :')

		const response: ApiResponse<any> = await api.post(
			`${BACKEND_URL}/api/user/send-referral-email`,
			{ email },
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

export const resendOTPVerificationEmail = async (
	email: string,
): Promise<any> => {
	try {
		const response: ApiResponse<any> = await api.post(
			`${BACKEND_URL}/api/user/authverificationpassword/${email}`,
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

// Email Verified
export const emailVerified = async (emailToken: string): Promise<any> => {
	try {
		const response: ApiResponse<any> = await api.patch(
			`${BACKEND_URL}/api/user/emailverify/${emailToken}`,
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

// Email OTP Verified
export const confirmEmailOTP = async (OTP: string): Promise<any> => {
	try {
		const response: ApiResponse<any> = await api.patch(
			`${BACKEND_URL}/api/user/confirmemailOTP/${OTP}`,
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

// Send Phone OTP
export const handlesendingPhoneOTP = async (
	accountDetailsData: AccountDetailsData,
): Promise<any> => {
	try {
		const response: ApiResponse<any> = await api.post(
			`${BACKEND_URL}/api/user/verifyphone`,
			accountDetailsData,
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

// Phone Verify
export const confirmOTP = async (OTPData: OTPData): Promise<any> => {
	try {
		const response: ApiResponse<any> = await api.patch(
			`${BACKEND_URL}/api/user/confirmphone`,
			OTPData,
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

// /Delete User
export const handleManageUser = async (
	formData: ManageUserData,
): Promise<any> => {
	console.log(formData)
	if (formData.status == '') {
		toast.error('Please select an option')
		return
	}

	try {
		const response = await api.post(
			`${BACKEND_URL}/api/user/manage/${formData.userId}`,
			formData,
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
