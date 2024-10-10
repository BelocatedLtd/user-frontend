'use client'
import banner from '@/assets/homebanner.png'
import ActivityFeed from '@/components/ActivityFeed'
import ReferralsTable from '@/components/dashboard/referralTable'
import useRedirectLoggedOutUser from '@/customHook/useRedirectLoggedOutUser'
import { selectAdverts } from '@/redux/slices/advertSlice'
import { SET_USER, selectUser } from '@/redux/slices/authSlice'
import { handleGetAllReferrals } from '@/redux/slices/referrals'
import { selectUserWallet } from '@/redux/slices/walletSlice'
import { getDashboardData, getUser } from '@/services/authServices'
import { handleRefLinkCopy } from '@/utils'
import { toNaira } from '@/utils/payment'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { toast } from 'react-hot-toast'
import { FaCopy } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { taskPerform } from '@/components/dashboard/taskPerform'

const Dashboard = () => {
	const inputRef = useRef<HTMLInputElement>(null)
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

			dispatch(handleGetAllReferrals() as any)
		}
		getUserData()

		const frontEndUrl = window.location.hostname
		setRefLink(`https://${frontEndUrl}?ref=${user?.username}`)
	}, [dispatch])

	const handleEarn = (e: any) => {
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

	const handleAdvertise = (e: any) => {
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

	return (
		// <div className='container w-full h-fit'>
		// 	<div className='justify-between mx-auto md:mr-3'>
		// 		<div className='md:flex mb-10 px-3 items-center justify-between'>
		// 			<div>
		// 				<h2 className='mt-1 font-medium text-lg'>
		// 					Welcome, {user?.fullname ? user?.fullname : user?.username}
		// 				</h2>
		// 			</div>

		// 			<div className='space-x-2 mt-2'>
		// 				<button
		// 					onClick={() => router.push('/dashboard/earn')}
		// 					className='text-sm bg-secondary text-white px-4 py-2 rounded-lg'>
		// 					Earn
		// 				</button>
		// 				<button
		// 					onClick={handleAdvertise}
		// 					className='text-sm bg-tertiary text-white px-4 py-2 rounded-lg'>
		// 					Advertise
		// 				</button>
		// 				<button
		// 					onClick={() => router.push('/dashboard/wallet')}
		// 					className='text-sm bg-green-600 text-white px-4 py-2 rounded-lg'>
		// 					My Wallet
		// 				</button>
		// 				<button
		// 					onClick={() => router.push('/dashboard/referral')}
		// 					className='text-sm bg-gray-600 text-white px-4 py-2 rounded-lg'>
		// 					Refer
		// 				</button>
		// 			</div>
		// 		</div>

		<div className='container w-full h-fit'>
			<div className='justify-between mx-auto md:mr-3'>
				<div className='md:flex mb-10 px-3 items-center justify-between'>
					<div>
						{/* Welcome message */}
						<h2 className='mt-1 font-medium text-lg'>
							Welcome, {user?.fullname ? user?.fullname : user?.username}
						</h2>
						{/* Task completion message */}
						<p className='mt-1 text-sm text-gray-600'>
							You have {taskPerform?.ad.tasks} tasks to complete.
						</p>
					</div>
				</div>

				{/* Buttons Section */}
				<div className='space-y-4 mt-2'>


					{/* Perform Task and Earn Button */}
					<button
						onClick={() => router.push('/dashboard/earn')}
						className='text-sm bg-blue-500 text-white px-4 py-3 rounded-lg w-full'>
						Perform task and earn
					</button>

					{/* Remaining Buttons */}
					<div className='flex space-x-2'>
						<button
							onClick={handleAdvertise}
							 className='text-sm bg-tertiary text-white px-4 py-2 rounded-lg'>
							Advertise
						</button>
						<button
							onClick={() => router.push('/dashboard/wallet')}
							className='text-sm bg-green-600 text-white px-4 py-2 rounded-lg'>
							My Wallet
						</button>
						<button
							onClick={() => router.push('/dashboard/referral')}
							className='text-sm bg-gray-600 text-white px-4 py-2 rounded-lg'>
							Refer
						</button>
					</div>
				</div>



				<div
					className={`flex-1 grid grid-cols-2  md:grid-cols-4 gap-8  h-fit  justify-evenly md:flex-row mt-4`}>
					<div className='border w-full  flex-col text-center items-center justify-center py-8 space-y-2 rounded-lg border-gray-200'>
						<span>Total Earnings</span>
						<div>
							<strong className='text-xl md:text-3xl'>
								{toNaira(dashboardData?.totalEarnings.value ?? 0)}
							</strong>
						</div>
					</div>
					<div className='border w-full flex-col text-center items-center justify-center py-8 space-y-2 rounded-lg border-gray-200'>
						<p>My Balance</p>
						<div>
							<strong className='text-xl md:text-3xl'>
								{toNaira(dashboardData?.myBalance.value ?? 0)}
							</strong>
						</div>
					</div>
					<div className='border w-full flex-col text-center items-center justify-center py-8 space-y-2 rounded-lg border-gray-200'>
						<p>Adverts Created</p>
						<div>
							<strong className='text-xl md:text-3xl'>
								{dashboardData?.advertsCreated.value ?? 0}
							</strong>
						</div>
					</div>
					<div className='border w-full flex-col text-center items-center justify-center py-8 space-y-2 rounded-lg border-gray-200'>
						<p>Tasks Completed</p>
						<div>
							<strong className='text-xl md:text-3xl'>
								{dashboardData?.tasksCompleted.value ?? 0}
							</strong>
						</div>
					</div>

					<div className='border p-6 col-span-2 border-gray-200 rounded-lg '>
						<h3 className='mb-6'>Referral</h3>
						<ReferralsTable />
					</div>
					<div className='rounded-lg p-6 col-span-2 md:col-span-1 border border-gray-300 flex flex-col gap-2   md:gap-0'>
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
								onClick={() =>
									handleRefLinkCopy(inputRef?.current?.value as string)
								}
							/>
						</div>
					</div>
					{/* </ProfileComplete> */}
					<div className='border md:row-span-2 col-span-2 md:col-span-1 border-gray-200 rounded-lg flex'>
						<ActivityFeed />
					</div>
					{/* <div className='border bg-red-200 md:col-span-3 col-span-2 border-gray-200 rounded-lg flex'> */}
					<Image
						src={banner}
						alt=''
						className='w-full  md:col-span-3  rounded-lg object-contain'
					/>
					{/* </div> */}
				</div>
			</div>
		</div>
	)
}

export default Dashboard
