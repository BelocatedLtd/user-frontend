'use client'
import React, { useEffect } from 'react'
import Jumbotron from '../components/home/Jumbotron'
import MembersTab from '../components/home/MembersTab'
import Services from '../components/home/Services'
import { useRouter } from 'next/navigation'
import { selectUser } from '@/redux/slices/authSlice'
import { useSelector } from 'react-redux'

export default function Home() {
	const router = useRouter()
	const user = useSelector(selectUser)

	useEffect(() => {
		if (!user?.isKycDone) {
			router.push(`/kyc`)
		} else {
		}
	}, [user])

	return (
		<div>
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
		</div>
	)
}
