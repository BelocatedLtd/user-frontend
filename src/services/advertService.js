import { toast } from 'react-hot-toast'
import { BACKEND_URL } from '../../utils/globalConfig'
import axios from "axios"

// Create Advert
export const createAdvert = async (formDataForPayment) => {
    const response = await axios.post(`${BACKEND_URL}/api/adverts/create`, formDataForPayment)
   return response.data
}

// Get User Adverts
export const getUserAdverts = async() => {
       const response = await axios.get(`${BACKEND_URL}/api/adverts`)
      return response.data      
}

// Get All User Adverts
export const getAllUserAdverts = async() => {
    const response = await axios.get(`${BACKEND_URL}/api/adverts/all`)
   return response.data      
}

// Set Advert to be Free
export const setAdvertFree = async(advertId) => {
        const response = await axios.patch(`${BACKEND_URL}/api/adverts/setadfree/${advertId}`)
        return response.data
}

// Delete Advert
export const deleteAdvert = async(advertId) => {
    try {
        const response = await axios.delete(`${BACKEND_URL}/api/adverts/delete/${advertId}`)
        return response.data
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
         toast.error(message)
    }
}