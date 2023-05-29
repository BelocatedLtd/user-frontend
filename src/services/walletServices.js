import { toast } from 'react-hot-toast'
import { BACKEND_URL } from '../../utils/globalConfig'
import axios from "axios"

// Get User Wallet Details
export const getWallet = async() => {
    try {
         const response = await axios.get(`${BACKEND_URL}/api/transactions`)
        return response.data
     } catch (error) {
         const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
         toast.error(message)
     }
            
}

// Fund User Wallet
export const fundWallet = async(trxData) => { 
    try {
        const response = await axios.patch(`${BACKEND_URL}/api/transactions/fund`, trxData)
        return response.data
     } catch (error) {
         const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
         toast.error(message)
     }
            
}



