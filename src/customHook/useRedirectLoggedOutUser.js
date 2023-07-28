import React from 'react'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { SET_LOGOUT } from '../redux/slices/authSlice'
import { toast } from 'react-hot-toast'
import { getToken } from '../../utils/tokenHandler'



const useRedirectLoggedOutUser = (path) => {
  const dispatch = useDispatch()
    const navigate = useNavigate()

  useEffect(() => {
    const redirectLoggedOutUser = async () => {
        if(!getToken) {
          await dispatch(SET_LOGOUT())
            toast.error('Session Expired, Please login to continue')
            navigate(path)
            return
        }
    }
    redirectLoggedOutUser()
  }, [navigate, dispatch])
}

export default useRedirectLoggedOutUser