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

		<div className='container w-full min-h-screen pb-20'>
			<div className='justify-between mx-auto md:mr-3'>
				<div className='md:flex mb-10 px-3 items-center justify-between'>
					<div className="p-4 bg-white rounded-lg shadow-md">
  {/* Welcome message */}
  <h2 className="mt-1 font-medium text-lg text-gray-800">
    Welcome, {user?.fullname ? user?.fullname : user?.username}!
  </h2>

  {/* Task completion message */}
  <p className="mt-2 text-sm text-gray-600">
    You have <strong> {totalTasks} </strong> available tasks to complete.
  </p>
  
  <div className="mt-2 bg-gray-100 p-3 rounded-md">
    <p>
      <strong> {approvedTasks} </strong> Approved of <strong> {completedTasks + approvedTasks} </strong> Completed Tasks
    </p>
    <p className="text-gray-700 mt-2">
      Remaining Tasks to Perform: <strong> {remainingTasksToComplete} </strong>
    </p>
    <p className="text-gray-700 mt-2 mb-2">
      <strong> {remainingTasksToApprove} </strong> Tasks waiting Approval
    </p>
  </div>
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
								{completedTasks + approvedTasks}
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

export default Dashboard;
