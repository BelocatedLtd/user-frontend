import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getLoginStatus } from '../services/authServices'
import { SET_LOGIN, selectUser } from '../redux/slices/authSlice'
import { toast } from 'react-hot-toast'


const useRedirectLoggedOutUser = (path) => {
    const dispatch = useDispatch()
    const user = useSelector(selectUser)
    const navigate = useNavigate()

  useEffect(() => {
    const redirectLoggedOutUser = async () => {
        const isLoggedIn = await getLoginStatus()
        dispatch(SET_LOGIN(isLoggedIn))

        if(!isLoggedIn && user?.email === "") {
            toast.error('Session Expired, Please login to continue')
            navigate(path)
            return
        }
    }
    redirectLoggedOutUser()
  }, [navigate, path, dispatch])
}

export default useRedirectLoggedOutUser