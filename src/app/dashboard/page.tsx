'use client'
import banner from '@/assets/homebanner.png'
import ActivityFeed from '@/components/ActivityFeed'
import ReferralsTable from '@/components/dashboard/referralTable'
import useRedirectLoggedOutUser from '@/customHook/useRedirectLoggedOutUser'
import { selectAdverts } from '@/redux/slices/advertSlice'
import { selectTotalTasks } from '../../redux/slices/advertSlice'
import { SET_USER, selectUser, selectUserId } from '@/redux/slices/authSlice'
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
import { getTotalTasksByAllPlatforms } from '@/services/advertService'
import { getApprovedTasks } from '@/services/taskServices';
import { getCompletedTasks } from '@/services/taskServices';
import { getUserTaskById } from '@/services/taskServices'
import { IoCopySharp } from "react-icons/io5";

interface PlatformTasks {
	[key: string]: { totalTasks: number }
}

const Dashboard = () => {
	const inputRef = useRef<HTMLInputElement>(null)
	const router = useRouter()
	const dispatch = useDispatch()
	const [profile, setProfile] = useState(null)
	const wallet = useSelector(selectUserWallet)
	const adverts = useSelector(selectAdverts)
	const [totalTasks, setTotalTasks] = useState(0)
	const [completedTasks, setCompletedTasks] = useState<number>(0);
	const [approvedTasks, setApprovedTasks] = useState<number>(0);
	const [remainingTasksToComplete, setRemainingTasksToComplete] = useState<number>(0);
	const [remainingTasksToApprove, setRemainingTasksToApprove] = useState<number>(0);

	const [isLoading, setIsLoading] = useState(false)
	const user = useSelector(selectUser)
	const userId = user?.id
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
		async function fetchTotalTasks() {
			try {
				setIsLoading(true)

				// Fetch the tasks by platform
				const res: PlatformTasks = await getTotalTasksByAllPlatforms()

				// Calculate the total tasks across all platforms
				const total = Object.values(res).reduce((acc, platform) => acc + platform.totalTasks, 0)

				// Set the total tasks in state

				setIsLoading(false)
			} catch (error) {
				console.error('Failed to retrieve tasks', error)
				setIsLoading(false)
			}
		}

		fetchTotalTasks()
	}, [])


	useEffect(() => {
		async function getUserData() {
			const data = await getUser()
			const dashboard = await getDashboardData()
			setDasboardData(dashboard)
			console.log("useEffect triggered, userId:", user?.id);
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


	const fetchApprovedTasks = async () => {
		console.log("Fetching approved tasks for user:", userId);


		if (!userId) return;
		// Ensure userId is defined
		setIsLoading(true); // Show loading state
		try {

			const data = await getApprovedTasks(userId);
			if (data) {
				setTotalTasks(data.totalTasks);
				setApprovedTasks(data.approvedTasks);
				setRemainingTasksToApprove(data.remainingTaskstoApprove);
			}
		} catch (error) {
			console.error('Error fetching remaining tasks:', error);
		} finally {
			setIsLoading(false); // Hide loading state
		}
	};
	const fetchCompletedTasks = async () => {
		if (!userId) return; // Ensure userId is defined
		setIsLoading(true); // Show loading state
		try {
			const data = await getCompletedTasks(userId);
			if (data) {

				setCompletedTasks(data.completedTasks);
				setRemainingTasksToComplete(data.remainingTaskToComplete);
			}
		} catch (error) {
			console.error('Error fetching remaining tasks:', error);
		} finally {
			setIsLoading(false); // Hide loading state
		}
	};

	useEffect(() => {
		fetchApprovedTasks();
	}, [userId]);



	useEffect(() => {
		fetchCompletedTasks();
	}, [userId]);


	const fetchAllTasks = async () => {
		if (!userId) return; // Ensure userId is defined
		setIsLoading(true); // Show loading state
		try {
			const data = await getUserTaskById(userId);
			if (data) {

				setRemainingTasksToComplete(data.totalTasks);

			}
		} catch (error) {
			console.error('Error fetching remaining tasks:', error);
		} finally {
			setIsLoading(false); // Hide loading state
		}
	};

	useEffect(() => {
		fetchAllTasks();
	}, [userId]);

	const tasksCompleted = Number(dashboardData?.tasksCompleted?.value) || 0;


	// Perform arithmetic operation
	const remainTask = totalTasks - tasksCompleted;
	if (isLoading) {
		return <div>Loading...</div>; // Loading state
	}



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
		<div style={{borderBottomRightRadius:"50px"}} className="container w-full min-h-screen pb-20">
		{/* Welcome Section with Wave Shadow */}
{/* 		<div style={{borderBottomRightRadius:"50px"}} className="relative">
			<div className="flex items-center">
				{/* Less-Than Symbol 
				 Welcome Tag 
				<div style={{backgroundColor:"rgb(71, 71, 209)" }} className="text-white font-bold py-2 px-4 rounded text-[18px] sm:text-[12px] text-[13px]">
					<span className="text-white-500 text-[18px] mr-2">&lt;</span>
					Welcome, {user?.fullname ? user?.fullname : user?.username}!
				</div>
			</div>
			{/* Username 
			<div style={{padding:"0px 20px 30px 20px"}} className="text-black-500 text-[12px] sm:text-[24px] font-medium">
				@{user?.username}
			</div>
		</div> */}
	
		{/* Task Section */}
		<div style={{padding: '0 10px'}} className="text-center pb-2">
			{/* Task Count */}
			<div className="text-[12px] sm:text-[12px] font-semibold text-gray-700 p-[20px] ">
				You have {totalTasks} available tasks to complete.
			</div>
	
			{/* Task Summary Box */}
			<div className="bg-white rounded-md p-6 mt-2 font-bold" style={{backgroundColor:"#e2ecf8", margin: '0 30px 10px 30px', textAlign:"left"}}>
				{/* Approved and Completed Tasks */}
				<div className="text-[13px] sm:text-[13px] font-normal text-gray-700">
					<strong> {approvedTasks} </strong> Approved of <strong> {completedTasks + approvedTasks} </strong> Completed Tasks
				</div>
				{/* Remaining Tasks */}
				<div className="text-[13px] sm:text-[13px] font-normal text-gray-600 mt-2">
					Remaining Task to Perform:  <strong> {remainingTasksToComplete} </strong>
				</div>
				{/* Tasks Waiting Approval */}
				<div className="text-[13px] sm:text-[13px] font-normal text-gray-600 mt-2">
					<strong> {remainingTasksToApprove} </strong> Tasks waiting Approval
				</div>
			</div>
		</div>
	
		{/* Click Here Button (Full Width) */}
		<div className="w-[91%] pt-3 ml-0" style={{ marginLeft: "7%" }}>
			<button onClick={() => router.push('/dashboard/earn')} className="w-[95%] text-white py-3 font-normal text-sm rounded-md hover:bg-blue-600 transition duration-300" style={{background:'linear-gradient(#4b99c1, #4b55c1)' borderRadius:'100px', marginLeft: "2%"}}>
				Click Here To
				Perform Task and Earn
			</button>
		</div>
	
		{/* Three Buttons Side by Side */}
		<div className="flex space-x-4" style={{ marginLeft: "2%", marginRight:"2%", padding:'20px'}}>
			<button style={{boxShadow:"0px 8px 8px 0px rgba(113, 199, 239, 0.8)", background:'linear-gradient(#1ea1db, #ffff)', width:'35%'}} className="text-black px-6 py-2 font-semibold text-[12px] rounded-full transition duration-300 shadow-md" onClick={handleAdvertise}>
				Advertise
			</button>
			<button style={{boxShadow:"0px 8px 8px 0px rgba(113, 199, 239, 0.8)", background:'linear-gradient(#1ea1db, #ffff)',width:'35%'}} className="text-black px-6 py-2 font-semibold text-[12px] rounded-full transition duration-300 shadow-md" onClick={() => router.push('/dashboard/wallet')}>
				My Wallet
			</button>
			<button style={{boxShadow:"0px 8px 8px 0px rgba(113, 199, 239, 0.8)", background:'linear-gradient(#1ea1db, #ffff)',width:'35%'}} className="text-black px-6 py-2 font-semibold text-[12px] rounded-full transition duration-300 shadow-md" onClick={() => router.push('/dashboard/referral')}>
				Referral Program
			</button>
		</div>
	
		{/* Four Small Cards (2 rows of 2) */}
		<div className="grid grid-cols-2 gap-4" style={{paddingLeft:'30px', paddingRight:'30px', paddingTop:'10px'}}>
			{/* Card 1 */}
			<div className="border border-[#1ea1db] bg-white p-6 text-center" style={{borderRadius:'30px'}}>
				<h3 className="font-normal text-sm text-black-700">Total Earnings</h3>
				<p className="text-black-500 mt-2"><strong className='text-lg md:text-2xl'>
					{toNaira(dashboardData?.totalEarnings.value ?? 0)}
				</strong></p>
			</div>
			{/* Card 2 */}
			<div className="border border-[#1ea1db] bg-white p-6 text-center" style={{borderRadius:'30px'}}>
				<h3 className="font-normal text-sm text-black-700">My Balance</h3>
				<p className="text-black-500 mt-2"><strong className='text-lg md:text-2xl'>{toNaira(dashboardData?.myBalance.value ?? 0)}</strong></p>
			</div>
			{/* Card 3 */}
			<div className="border border-[#1ea1db] bg-white p-6 text-center" style={{borderRadius:'30px'}}>
				<h3 className="font-normal text-sm text-black-700">Adverts Created</h3>
				<p className="text-black-500 mt-2"><strong className='text-lg md:text-2xl'>
					{dashboardData?.advertsCreated.value ?? 0}
				</strong></p>
			</div>
			{/* Card 4 */}
			<div className="border border-[#1ea1db] bg-white p-6 text-center" style={{borderRadius:'30px'}}>
				<h3 className="font-normal text-sm text-gray-700">Tasks Completed</h3>
				<p className="text-black-500 mt-2"><strong className='text-lg md:text-2xl'>{completedTasks + approvedTasks}</strong></p>
			</div>
		</div>
	
		<div className='border p-6 col-span-2 border-gray-200 rounded-lg '>
		<div className="text-[#4b55c1] font-bold py-2 px-4 pt-4 rounded text-[18px] sm:text-[12px] text-[13px]">Referral</div>
			<ReferralsTable />
		</div>
	
		<div className='rounded-lg p-6 col-span-2 md:col-span-1 border border-gray-300 flex flex-col gap-2 md:gap-0'>
			<label className=''>Referral Link:</label>
			<div className='flex items-center gap-2 mt-2 w-full'>
				<input
					type='link'
					value={refLink}
					readOnly
					ref={inputRef}
					className='p-3 w-full border bg-[#e2ecf8] rounded-lg items-center'
				/>
				<IoCopySharp className='cursor-pointer text-xl text-secondary' style={{color:"rgb(71, 71, 209)" }} onClick={() => handleRefLinkCopy(inputRef?.current?.value as string)} />
			</div>
		</div>
		<div className='border md:row-span-2 col-span-2 md:col-span-1 border-gray-200 rounded-lg flex'>
			<ActivityFeed />
		</div>
		<div className="relative w-full pb-5" style={{ width: '380px' }}>
			<Image style={{ position: 'relative', height: 'auto' }} src={banner} alt="Banner" layout="fill" className="object-cover" />
		</div>
	</div>
	
	);
};

export default Dashboard;
