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
				'Content-Type': 'application/x-www-form-urlencoded',
			},
		}
	}
}

// Ref Challenge

// Get Ongoing Ref Challenge
export const getOngoingRefChallenge = async () => {
	const response = await axios.get(`${BACKEND_URL}/api/ref/challenge`)
	return response.data
}

// Get All Ref Challenges
export const getAllReferrals = async () => {
	const headers = getAuthHeaders()
	const response = await axios.get(`${BACKEND_URL}/api/ref/byUser`, headers)
	return response.data
}

// Get Ref Dahsboard Data
export const getRefDashboardData = async () => {
	const headers = getAuthHeaders()
	const response = await axios.get(`${BACKEND_URL}/api/ref/dashboard`, headers)
	return response.data
}
export const withdrawReferralEarnings = async () => {
  try {
    const headers = getAuthHeaders();

    if (!headers) {
      throw new Error("Authorization headers not found");
    }

    const response = await axios.post(`${BACKEND_URL}/api/ref/withdraw`, null, headers);
    console.log("Response:", response.data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // Axios-specific error handling
      console.error("Axios error:", error.response?.data || error.message);
      throw new Error(error.response?.data?.message || "Something went wrong with the request");
    } else if (error instanceof Error) {
      // Generic error handling
      console.error("Error:", error.message);
      throw new Error(error.message);
    } else {
      console.error("Unexpected error:", error);
      throw new Error("An unexpected error occurred");
    }
  }
};

// Ref Bonus

// Convert Ref bonus pts to wallet funds
export const handleRefPtsConv = async (userId: string) => {
	const headers = getAuthHeaders()
	const response = await axios.post(
		`${BACKEND_URL}/api/ref/bonus/convert`,
		userId,
		headers,
	)
	console.log(response)
	return response.data
}
