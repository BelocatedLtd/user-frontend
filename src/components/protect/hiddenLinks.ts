import { useSelector } from 'react-redux'
import { selectIsLoggedIn } from '../../redux/slices/authSlice'
import { ReactNode } from 'react'

export const ShowOnLogin = ({ children }: { children: ReactNode }) => {
	const isLoggedIn = useSelector(selectIsLoggedIn)
	console.log('🚀 ~ ShowOnLogin ~ isLoggedIn:', isLoggedIn)
	//const isLoggedIn = await getLoginStatus()
	//const tokenAvailable = await getToken()

	if (isLoggedIn) {
		return children
	}
	return null
}

export const ShowOnLogout = ({ children }: { children: ReactNode }) => {
	const isLoggedIn = useSelector(selectIsLoggedIn)

	if (!isLoggedIn) {
		return children
	}
	return null
}
