// Import necessary dependencies
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
    <div className="bg-gray-100 min-h-screen p-4 font-[Montserrat]">
      {/* Header Section */}
      <div className="bg-white p-6 rounded-md shadow-md">
        <div className="flex flex-col sm:flex-row items-center justify-between">
          <h1 className="text-[43px] font-semibold">Welcome, {user?.fullname ? user?.fullname : user?.username}!</h1>
          <p className="text-[35px] font-[Product Sans]">{user?.username}</p>
        </div>
      </div>

      {/* Task Summary */}
      <div className="mt-6 bg-white p-6 rounded-md shadow-md">
        <p className="text-xl">You have <span className="font-semibold"> {totalTasks} </span> available tasks to complete.</p>
        <div className="mt-4 bg-blue-100 p-4 rounded-md">
          <p className="text-lg">{approvedTasks} Approved of {completedTasks + approvedTasks} Completed Tasks</p>
          <p className="text-lg">Remaining Tasks to Perform: <span className="font-semibold">{remainingTasksToComplete}</span></p>
          <p className="text-lg">{remainingTasksToApprove} Tasks waiting Approval</p>
        </div>
        <button onClick={() => router.push('/dashboard/earn')}   className="mt-4 bg-blue-500 text-white py-3 px-6 rounded-md w-full sm:w-auto hover:bg-blue-600">
          Click Here To Perform Task and Earn
        </button>
      </div>
      <div className='flex space-x-2 mt-5 mb-15'>
						<button style={{fontFamily:"'Libre Baskerville', serif", boxShadow: "0px 8px 8px 0px azure",}}
							onClick={handleAdvertise}
							 className='w-32 h-10 text-center text-sm font-bold bg-blue-500 text-white px-4 py-2 rounded-full'>
							Advertise
						</button>
						<button style={{fontFamily:"'Libre Baskerville', serif", boxShadow: "0px 8px 8px 0px rgba(113, 199, 239, 0.8)",}}
							onClick={() => router.push('/dashboard/wallet')}
							className='w-32 h-10 text-center text-sm font-bold bg-blue-500 text-white px-4 py-2 rounded-full'>
							My Wallet
						</button>
						<button style={{fontFamily:"'Libre Baskerville', serif", boxShadow: "0px 8px 8px 0px rgba(113, 199, 239, 0.8)",}}
							onClick={() => router.push('/dashboard/referral')}
							className='w-32 h-10 text-center text-xs font-bold bg-blue-500 text-white px-4 py-2 rounded-full'>
							Referral Program
						</button>
					</div>
			
      {/* Wallet and Referral */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Wallet Section */}
        <div className="bg-white p-6 rounded-md shadow-md">
          <h2 className="text-xl font-semibold">My Wallet</h2>
          <div className="mt-4 flex justify-between items-center">
            <div>
              <p>Total Earnings</p>
              <p className="text-2xl font-bold">{toNaira(dashboardData?.totalEarnings.value ?? 0)}</p>
            </div>
            <div>
              <p>My Balance</p>
              <p className="text-2xl font-bold">{toNaira(dashboardData?.myBalance.value ?? 0)}</p>
            </div>
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

        {/* Referral Section */}
        <div className="bg-white p-6 rounded-md shadow-md">
          <h2 className="text-xl font-semibold">Referral Program</h2>
          <ReferralsTable />
          <p className="mt-2">Referral Link:</p>
          <div className="relative mt-2">
            <input
              type='link'
              value={refLink}
              readOnly
              ref={inputRef}
              className="w-full border rounded-md p-3 bg-gray-100 text-gray-700"
            />
          <FaCopy
								className='cursor-pointer text-xl text-secondary'
								onClick={() =>
									handleRefLinkCopy(inputRef?.current?.value as string)
								}
							/>
          </div>
        </div>
      </div>

      {/* Recent Activities */}
      <div className="mt-6 bg-white p-6 rounded-md shadow-md">
        <h2 className="text-xl font-semibold">Recent Activities</h2>
        <ActivityFeed />
      

        <Image
    style={{position:'relative', height:'auto'}}
    src={banner} 
    alt="Banner" 
    layout="fill" 
     // Set the base width as per the original image's aspect ratio
    // Adjust height as needed
    className="object-cover"
  />

      {/* Footer Navigation */}
      
    </div>
    </div>
    
  );
};

export default Dashboard;
