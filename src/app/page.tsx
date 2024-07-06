'use client'
import { selectUser } from '@/redux/slices/authSlice'
import { useRouter } from 'next/navigation'
import { Suspense, useEffect } from 'react'
import { useSelector } from 'react-redux'
import Jumbotron from '../components/home/Jumbotron'
import MembersTab from '../components/home/MembersTab'
import Services from '../components/home/Services'

export default function Home() {
	const router = useRouter()
	const user = useSelector(selectUser)

	useEffect(() => {
		if (user?.token)
			if (!user?.isKycDone) {
				router.push(`/kyc`)
			} else {
			}
	}, [])

	return (
		<Suspense>
			<Jumbotron
			// handleRegister={handleRegister}
			// handleLogin={handleLogin}
			// loginBtn={loginBtn}
			// regBtn={regBtn}
			/>
			<MembersTab
			// handleRegister={handleRegister} regBtn={regBtn}
			/>
			<Services />
			{/* <About /> */}
		</Suspense>
	)
}
