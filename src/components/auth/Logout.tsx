import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import useRedirectLoggedOutUser from '../../customHook/useRedirectLoggedOutUser'
import { SET_LOGOUT } from '../../redux/slices/authSlice'
import Button from '../Button'
import Loader from '../loader/Loader'

const Logout = () => {
	const dispatch = useDispatch()
	const router = useRouter()
	const [isLoading, setIsLoading] = useState(false)
	useRedirectLoggedOutUser('/')

	const handleLogout = () => {
		setIsLoading(true)
		try {
			dispatch(SET_LOGOUT())
			router.push('/')
			toast.success('User successfully logged out')
			setIsLoading(false)
		} catch (error: any) {
			setIsLoading(false)
			toast.error(error)
		}
	}

	return (
		<div className=''>
			<Loader open={isLoading} />

			<Button
				size={'sm'}
				onClick={handleLogout}
				className='  '
				variant='solid'
				color='danger'>
				Logout
			</Button>
		</div>
	)
}

export default Logout
