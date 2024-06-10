'use client'

import React from 'react'
import Header from '../../components/dashboard/Header'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { selectUser } from '../../redux/slices/authSlice'
import { useRouter } from 'next/navigation'
import SidebarLeft from './SidebarLeft'
//import useRedirectLoggedOutUser from '../../customHook/useRedirectLoggedOutUser'

const DashLayout = ({ children }: { children: React.ReactNode }) => {
	//useRedirectLoggedOutUser('/')
	const router = useRouter()
	const user = useSelector(selectUser)
	console.log('🚀 ~ DashLayout ~ user:', user)

	useEffect(() => {
		if (!user?.isKycDone) {
			router.push(`/kyc`)
			// setProfileComplete(true)
		} else {
			// setProfileComplete(false)
		}
	}, [user])

	return (
		<div className='w-full'>
			<SidebarLeft>
				<Header />
				<div
					style={{ minHeight: '80vh' }}
					className='flex p-1 md:p-6 mt-8 w-full'>
					{children}
				</div>
			</SidebarLeft>

			{/* <Footer /> */}
		</div>
	)
}

export default DashLayout
