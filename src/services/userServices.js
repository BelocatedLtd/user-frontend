import { BACKEND_URL } from '../../utils/globalConfig'
import axios from "axios"

const user = JSON.parse(localStorage.getItem('user'))

//Get User
export const getAllUser = async() => {
    try {
         const response = await axios.get(`${BACKEND_URL}/api/user/all`, {
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