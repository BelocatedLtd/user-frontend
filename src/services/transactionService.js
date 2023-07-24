import { toast } from 'react-hot-toast'
import { BACKEND_URL } from '../../utils/globalConfig'
import axios from "axios"

const user = JSON.parse(localStorage.getItem('user'))

// Pay for advert
export const adBuy = async() => {
    try {
         const response = await axios.update(`${BACKEND_URL}/api/transactions/pay`, {
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

// Get User Transactions List
export const getUserTransactions = async(token) => {
         const response = await axios.get(`${BACKEND_URL}/api/transactions/userall`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
         })
        return response.data       
}

// Get Transactions List
export const getAllTransactions = async(token) => {
    const response = await axios.get(`${BACKEND_URL}/api/transactions/all`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
     })
   return response.data       
}



