'use client'

import SidebarLeft from '@/app/dashboard/SidebarLeft'
import { getUserWallet } from '@/redux/slices/walletSlice'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Header from '../../components/dashboard/Header'
import { selectUser } from '../../redux/slices/authSlice'

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
	//useRedirectLoggedOutUser('/')
	const router = useRouter()
	const user = useSelector(selectUser)
	const dispatch = useDispatch()

	useEffect(() => {
		if (user?.token)
			if (!user?.isKycDone) {
				router.push(`/kyc`)
				// setProfileComplete(true)
			} else {
				dispatch(getUserWallet() as any)

				// setProfileComplete(false)
			}
	}, [])

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

export default DashboardLayout
