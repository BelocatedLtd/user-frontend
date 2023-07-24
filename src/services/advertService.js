import { toast } from 'react-hot-toast'
import { BACKEND_URL } from '../../utils/globalConfig'
import axios from "axios"

const user = JSON.parse(localStorage.getItem('user'))

// Create Advert
export const createAdvert = async (paymentFormData) => {
    const response = await axios.post(`${BACKEND_URL}/api/adverts/create`, paymentFormData, {
        headers: {
            'Authorization': `Bearer ${user?.token}`
        }
     })
   return response.data
}

// Get User Adverts
export const getUserAdverts = async(token) => {
       const response = await axios.get(`${BACKEND_URL}/api/adverts`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
     })
      return response.data      
}

// Get All User Adverts
export const getAllUserAdverts = async() => {
    const response = await axios.get(`${BACKEND_URL}/api/adverts/all`)
   return response.data      
}

// Set Advert to be Free
export const setAdvertFree = async(id) => {
        const response = await axios.patch(`${BACKEND_URL}/api/adverts/setadfree/${id}`, {
            headers: {
                'Authorization': `Bearer ${user?.token}`
            }
         })
        return response.data
}

// Delete Advert
export const deleteAdvert = async(advertId) => {
    try {
        const response = await axios.delete(`${BACKEND_URL}/api/adverts/delete/${advertId}`, {
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