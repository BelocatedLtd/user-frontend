import axios from "axios"
import { toast } from "react-hot-toast"
import { BACKEND_URL } from '../../utils/globalConfig'

//Create New User
export const createNewUser = async(formData) => {
    try {
         const response = await axios.post(`${BACKEND_URL}/api/user/register`, formData )
         if (response.statusText === "Created") {
          }
        return response.data 
     } catch (error) {
         const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
         toast.error(message)
     }
            
}

//Login User
export const loginUser = async(formData) => {
    try {
         const response = await axios.post(`${BACKEND_URL}/api/user/login`, formData)
        return response.data
     } catch (error) {
         const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
         toast.error(message)
     }
            
}

//Logout User
export const logoutUser = async() => {
    try {
         await axios.get(`${BACKEND_URL}/api/user/logout`)
     } catch (error) {
         const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
         toast.error(message)
     }
            
}

//Get Login Status
export const getLoginStatus = async() => {
    try {
         const response = await axios.get(`${BACKEND_URL}/api/user/loggedin`)
        return response.data
     } catch (error) {
         const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
         toast.error(message)
     }
            
}

//Get User
export const getUser = async() => {
    try {
         const response = await axios.get(`${BACKEND_URL}/api/user`)
        return response.data
     } catch (error) {
         const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
         toast.error(message)
     }
            
}

//Update user details
export const updateUser = async (formData) => {
    const response = await axios.patch(`${BACKEND_URL}/api/user/update`, formData) 
    return response.data
}

//Update user account details
export const updateUserAccountDetails = async (verificationData) => {
    try {
        const response = await axios.patch(`${BACKEND_URL}/api/user/update/accountdetails`, verificationData) 
         return response
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
         toast.error(message)
    }
}


//Verify Old Password
export const verifyUserPassword = async(data) => {
    try {
         const response = await axios.post(`${BACKEND_URL}/api/user/verifypasswordchange`, data)
        return response.data
     } catch (error) {
         const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
         toast.error(message)
     }
            
}

//Change Password
export const changeUserPassword = async(data) => {
    try {
         const response = await axios.post(`${BACKEND_URL}/api/user/verifypasswordchange`, data)
        return response.data
     } catch (error) {
         const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
         toast.error(message)
     }
            
}

//Resend Verification Email
export const resendVerificationEmail = async(email) => {
    try {
        const response = await axios.post(`${BACKEND_URL}/api/user/authverification/${email}`)
        return response.data
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
         toast.error(message)
    }
}

//Email Verified
export const emailVerified = async(token) => {
    try {
        const response = await axios.patch(`${BACKEND_URL}/api/user/emailverify/${token}`)
        return response.data
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
         toast.error(message)
    }
}

//Send Phone OTP
export const handlesendingPhoneOTP = async(accountDetailsData) => {
    try {
        const response = await axios.post(`${BACKEND_URL}/api/user/verifyphone`, accountDetailsData)
            return response.data
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
         toast.error(message)
    }
}

//Phone Verify
export const confirmOTP = async(OTP) => {
    try {
        const response = await axios.patch(`${BACKEND_URL}/api/user/confirmphone/${OTP}`)
        return response.data
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
         toast.error(message)
    }
}


