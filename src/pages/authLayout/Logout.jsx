import React from 'react'
import { useDispatch } from 'react-redux'
import { SET_LOGOUT } from '../../redux/slices/authSlice'
import { useNavigate } from 'react-router-dom'
import Loader from '../../components/loader/Loader'
import { useState } from 'react'
import { toast } from 'react-hot-toast'
import useRedirectLoggedOutUser from '../../customHook/useRedirectLoggedOutUser'
import Button from '../../components/Button'

const Logout = () => {
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const [isLoading, setIsLoading] = useState(false)
	useRedirectLoggedOutUser('/')

	const handleLogout = () => {
		setIsLoading(true)
		try {
			dispatch(SET_LOGOUT())
			navigate('/')
			toast.success('User successfully logged out')
			setIsLoading(false)
		} catch (error) {
			setIsLoading(false)
			toast.error(error)
		}
	}

	return (
		<div className=''>
			{isLoading && <Loader />}

			<Button
				size={'sm'}
				onClick={handleLogout}
				className=' bg-tertiary '
				variant='danger'>
				Logout
			</Button>
		</div>
	)
}

export default Logout
