import { toast } from 'react-hot-toast'
import { BACKEND_URL } from '../../utils/globalConfig'
import axios from "axios"

const user = JSON.parse(localStorage.getItem('user'))

// Get User Wallet Details
export const getWallet = async(token) => {
    try {
         const response = await axios.get(`${BACKEND_URL}/api/transactions/wallet/user`,  {
            headers: {
                'Authorization': `Bearer ${token}`
            }
         })
        return response.data
     } catch (error) {
         const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
         toast.error(`${message}, Error retrieving user wallet`)
     }         
}

// Get Wallet Details
export const getUserWallet = async() => {
    try {
         const response = await axios.get(`${BACKEND_URL}/api/transactions/wallet/user`,  {
            headers: {
                'Authorization': `Bearer ${user?.token}`
            }
         })
        return response.data
     } catch (error) {
         const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
         toast.error(message)
     }         
}

// Fund User Wallet
export const fundWallet = async(trxData) => { 
    try {
        const response = await axios.patch(`${BACKEND_URL}/api/transactions/fund`, trxData, {
            headers: {
                'Authorization': `Bearer ${user?.token}`
            }
         })
        return response.data
     } catch (error) {
         const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
         toast.error(message)
     }
            
}

// Withdraw User Wallet 
export const withdrawWallet = async(trxData) => { 
    try {
        const response = await axios.post(`${BACKEND_URL}/api/transactions/withdraw`, trxData, {
            headers: {
                'Authorization': `Bearer ${user?.token}`
            }
         })
        return response.data
     } catch (error) {
         const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
         toast.error(message)
     }        
}

// Get All Withdrawals
export const getWithdrawals = async() => {
    try {
         const response = await axios.get(`${BACKEND_URL}/api/transactions/withdrawals`, {
            headers: {
                'Authorization': `Bearer ${user?.token}`
            }
         })
        return response.data
     } catch (error) {
         const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
         toast.error(message)
     }         
}



// Get User Withdrawals
export const getUserWithdrawals = async(userId) => {
    try {
         const response = await axios.get(`${BACKEND_URL}/api/transactions/withdrawals/${userId}`, {
            headers: {
                'Authorization': `Bearer ${user?.token}`
            }
         })
        return response.data
     } catch (error) {
         const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
         toast.error(message)
     }         
}

// Get User Withdrawals
export const confirmWithdrawal = async(withdrawalRequestId) => {
    try {
         const response = await axios.patch(`${BACKEND_URL}/api/transactions/withdrawals/confirm/${withdrawalRequestId}`, {
            headers: {
                'Authorization': `Bearer ${user?.token}`
            }
         })
        return response.data
     } catch (error) {
         const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
         toast.error(message)
     }         
}

// Get User Withdrawals
export const deleteWithdrawal = async(withdrawalRequestId) => {
    try {
         const response = await axios.delete(`${BACKEND_URL}/api/transactions/withdrawals/delete/${withdrawalRequestId}`, {
            headers: {
                'Authorization': `Bearer ${user?.token}`
            }
         })
        return response.data
     } catch (error) {
         const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
         toast.error(message)
     }         
}
