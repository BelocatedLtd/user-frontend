import { ReactNode } from 'react'
import { useSelector } from 'react-redux'
import { selectUser } from '../../redux/slices/authSlice'

export const ProfileInComplete = ({ children }: { children: ReactNode }) => {
	const user = useSelector(selectUser)

	if (
		!user?.fullname ||
		!user?.phone ||
		!user?.location ||
		!user?.gender ||
		!user?.community ||
		!user?.religion
	) {
		return children
	}
	return null
}

export const ProfileComplete = ({ children }: { children: ReactNode }) => {
	const user = useSelector(selectUser)

	if (
		user?.fullname ||
		user?.phone ||
		user?.location ||
		user?.gender ||
		user?.community ||
		user?.religion
	) {
		return children
	}
	return null
}
