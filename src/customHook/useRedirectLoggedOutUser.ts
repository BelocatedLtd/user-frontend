import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { SET_LOGOUT, selectUser } from '../redux/slices/authSlice'
import { toast } from 'react-hot-toast'
import { getToken } from '../utils/tokenHandler'
import { getLoginStatus } from '../services/authServices'
import { useRouter } from 'next/navigation'

const useRedirectLoggedOutUser = (path: string) => {
	const dispatch = useDispatch()
	//const user = useSelector(selectUser)
	const router = useRouter()

	useEffect(() => {
		const redirectLoggedOutUser = async () => {
			const isLoggedIn = await getLoginStatus()
			const tokenAvailable = getToken()

			if (!isLoggedIn || !tokenAvailable) {
				dispatch(SET_LOGOUT())
				// toast.error('Session Expired, Please login to continue')
				router.push(path)
				return
			}

			if (tokenAvailable === undefined) {
				dispatch(SET_LOGOUT())
				toast.error('Session Expired, Please login to continue')
				router.push(path)
				return
			}
		}
		redirectLoggedOutUser()
	}, [dispatch])
}

export default useRedirectLoggedOutUser
