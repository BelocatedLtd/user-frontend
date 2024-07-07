import { ReactNode } from 'react'
import { useSelector } from 'react-redux'
import { selectIsLoggedIn } from '../../redux/slices/authSlice'

export const ShowOnLogin = ({ children }: { children: ReactNode }) => {
	const isLoggedIn = useSelector(selectIsLoggedIn)
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
