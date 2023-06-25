import { BACKEND_URL } from '../../utils/globalConfig'
import axios from "axios"


// Get Activity List
export const getAllActivities = async() => {
    const response = await axios.get(`${BACKEND_URL}/api/activities`)
        return response.data        
}