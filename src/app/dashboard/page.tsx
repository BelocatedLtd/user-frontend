'use client'
import React, { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectUser, SET_LOGOUT, SET_USER } from '@/redux/slices/authSlice'
import { useEffect } from 'react'
import { useState } from 'react'
import useRedirectLoggedOutUser from '@/customHook/useRedirectLoggedOutUser'
import { getDashboardData, getUser } from '@/services/authServices'
import { toast } from 'react-hot-toast'
import copy from '@/assets/copy.png'
import banner from '@/assets/banner.png'
import { getUserWallet, selectUserWallet } from '@/redux/slices/walletSlice'
import ActivityFeed from '@/components/ActivityFeed'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import { FaCopy } from 'react-icons/fa'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { toNaira } from '@/utils/payment'
import ReferralsTable from '@/components/dashboard/referralTable'
import { selectAdverts } from '@/redux/slices/advertSlice'
import { handleGetAllReferrals } from '@/redux/slices/referrals'

const Dashboard = () => {
	const inputRef = useRef(null)
	const router = useRouter()
	const dispatch = useDispatch()
	const [profile, setProfile] = useState(null)
	const wallet = useSelector(selectUserWallet)

	const adverts = useSelector(selectAdverts)

	const user = useSelector(selectUser)
	const [profileComplete, setProfileComplete] = useState(false)
	const [dashboardData, setDasboardData] = useState<{
		totalEarnings: {
			value: string
		}
		myBalance: {
			value: string
			// growth: growthRate,
		}
		advertsCreated: {
			value: string
			// growth: growthRate,
		}
		tasksCompleted: {
			value: string
			// growth: growthRate,
		}
	}>()
	const [refLink, setRefLink] = useState('')
	useRedirectLoggedOutUser('/')

	useEffect(() => {
		async function getUserData() {
			const data = await getUser()
			const dashboard = await getDashboardData()
			setDasboardData(dashboard)

			// if (!data || data === undefined) {
			// 	// toast.error('Unable to retrieve user data, session will be terminated')
			// 	await dispatch(SET_LOGOUT())
			// 	router.push('/')
			// 	return
			// }

			dispatch(SET_USER(data))
			dispatch(getUserWallet())

			dispatch(handleGetAllReferrals() as any)
		}
		getUserData()

		const frontEndUrl = window.location.hostname
		setRefLink(`https://${frontEndUrl}/register/ref/${user?.username}`)
	}, [dispatch])

	const handleEarn = (e) => {
		e.preventDefault()
		if (user?.accountStatus === 'Suspended') {
			toast.error(
				'Account has being suspended, send an email to appeal@belocated.ng to appeal',
			)
			return
		}

		if (!user?.location || !user?.community || !user?.gender) {
			toast.error('Please, complete your profile before you can perform tasks')
			router.push(`/dashboard/account-settings/${user?.username}`)
		}
		if (!user?.phone) {
			toast.error('Phone number not verified')
			router.push(`/dashboard/account-settings/${user?.username}`)
		}
		if (user?.phone && user?.location && user?.community && user?.gender)
			router.push('/dashboard/earn')
	}

	const handleAdvertise = (e) => {
		e.preventDefault()
		if (!user.location || !user.community || !user.gender) {
			toast.error('Please, complete your profile before you can create Adverts')
			router.push(`/dashboard/update-profile`)
		}

		if (!user.phone) {
			toast.error('Phone number not verified')
			router.push(`/dashboard/update-profile`)
		}
		if (user.phone && user.location && user.community && user.gender)
			router.push('/dashboard/advertise')
	}

	const handleRefLinkCopy = (e) => {
		inputRef.current.select()
		document.execCommand('copy')
		toast.success('Referral link copied to clipboard')
	}

	return (
		<div className='w-full h-fit'>
			<div className='justify-between mx-auto md:mr-3'>
				<div className='flex mb-10 items-center justify-between'>
					<div>
						<h2 className='mt-1 font-medium text-lg '>
							Welcome, {user?.fullname ? user?.fullname : user?.username}
						</h2>
					</div>

					<div className='space-x-2 '>
						<button
							onClick={() => router.push('/dashboard/earn')}
							className='text-sm bg-secondary text-white px-4 py-2 rounded-lg'>
							Earn
						</button>
						<button
							onClick={handleAdvertise}
							className='text-sm bg-tertiary text-white px-4 py-2 rounded-lg'>
							Advertise
						</button>
						<button
							onClick={() => router.push('/dashboard/referral')}
							className='text-sm bg-gray-600 text-white px-4 py-2 rounded-lg'>
							Refer
						</button>
					</div>
				</div>

				<div
					className={`grid grid-cols-4 gap-8 w-full h-fit  justify-evenly md:flex-row`}>
					<div className='border w-full flex-col text-center items-center justify-center py-8 space-y-4 rounded-lg border-gray-200'>
						<p>Total Earnings</p>
						<div>
							<strong className='text-3xl'>
								{toNaira(dashboardData?.totalEarnings.value ?? 0)}
							</strong>
						</div>
						{/* <p className='text-xs text-gray-400'>+20% month over month</p> */}
					</div>
					<div className='border w-full flex-col text-center items-center justify-center py-8 space-y-4 rounded-lg border-gray-200'>
						<p>My Balance</p>
						<div>
							<strong className='text-3xl'>
								{toNaira(dashboardData?.myBalance.value ?? 0)}
							</strong>
						</div>
						{/* <p className='text-xs text-gray-400'>+20% month over month</p> */}
					</div>
					<div className='border w-full flex-col text-center items-center justify-center py-8 space-y-4 rounded-lg border-gray-200'>
						<p>Adverts Created</p>
						<div>
							<strong className='text-3xl'>
								{dashboardData?.advertsCreated.value ?? 0}
							</strong>
						</div>
						{/* <p className='text-xs text-gray-400'>+20% month over month</p> */}
					</div>
					<div className='border w-full flex-col text-center items-center justify-center py-8 space-y-4 rounded-lg border-gray-200'>
						<p>Tasks Completed</p>
						<div>
							<strong className='text-3xl'>
								{dashboardData?.tasksCompleted.value ?? 0}
							</strong>
						</div>
						{/* <p className='text-xs text-gray-400'>+20% month over month</p> */}
					</div>
					{/* <div className='hidden left w-full md:flex md:flex-1'>
						<div className='w-full flex flex-col justify-center items-center'>
							<img
								src={about}
								alt=''
								className='w-[150px] border p-[1rem] rounded-full'
							/>
							<p className='mt-1'>
								Welcome, {user?.fullname ? user?.fullname : user?.username}
							</p>
							<small className='mb-1'>@{user?.username}</small>
							<small className='mb-5'>
								Referred: {user?.referrals?.length}
							</small>

							<div className='flex gap-2'>
								<button
									onClick={handleEarn}
									className='flex-1 bg-secondary text-primary px-10 py-3 rounded-full hover:bg-transparent hover:text-tertiary hover:border-tertiary hover:border'>
									Earn
								</button>
								<button
									onClick={handleAdvertise}
									className='flex-1 bg-tertiary text-primary px-6 py-3 rounded-full hover:bg-transparent hover:text-tertiary hover:border-tertiary hover:border'>
									Advertise
								</button>
							</div>

							<div className='mt-2'>
								<p
									onClick={() => router.push('/how-it-works')}
									className='hidden text-[12px] text-tertiary hover:text-gray-600 cursor-pointer text-center items-center gap-1 md:flex'>
									Click to see how Belocated Works{' '}
									<FaAngleDoubleRight className='text-[10px] text-secondary' />
								</p>
							</div>
						</div>
					</div> */}

					{/* <div className='right flex-1 w-full mt-6'>
						<div className='flex flex-col justify-center items-center gap-2'>
							<p
								onClick={() => router.push('/how-it-works')}
								className='text-[12px] text-tertiary hover:text-gray-600 cursor-pointer text-center flex items-center gap-1 md:hidden'>
								Click to see how Belocated Works{' '}
								<FaAngleDoubleRight className='text-[10px] text-secondary' />
							</p>
						</div>
						<Wallet handleAdvertise={handleAdvertise} handleEarn={handleEarn} />
					</div> */}

					<div className='border p-6 col-span-2 border-gray-200 rounded-lg '>
						<h3 className='mb-6'>Referral</h3>
						<ReferralsTable />
					</div>
					{/* <ProfileComplete className='flex  flex-col justify-center'> */}
					<div className='rounded-lg p-6 border border-gray-300 flex flex-col gap-2   md:gap-0'>
						<label className=''>Referral Link:</label>
						<div className='flex items-center gap-2 mt-2  w-full'>
							<input
								type='link'
								value={refLink}
								readOnly
								ref={inputRef}
								className='p-3 w-full border border-gray-200 rounded-lg items-center'
							/>
							<FaCopy
								className='cursor-pointer text-xl text-secondary'
								onClick={handleRefLinkCopy}
							/>
						</div>
					</div>
					{/* </ProfileComplete> */}
					<div className='border row-span-2 border-gray-200 rounded-lg flex'>
						<ActivityFeed />
					</div>
					<div className='border col-span-3 border-gray-200 rounded-lg flex'>
						<Image
							src={banner}
							alt=''
							className='w-full h-[8em] rounded-lg object-cover'
						/>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Dashboard
