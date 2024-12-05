
'use client'
import { getTotalTasksByAllPlatforms } from '@/services/advertService'
import { cn, toIntlCurrency } from '@/utils'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Suspense, useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import { MdOutlineKeyboardArrowLeft } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'
import { socialMenu } from '../../../components/data/SocialData'
import useRedirectLoggedOutUser from '../../../customHook/useRedirectLoggedOutUser'
import { selectIsError} from '../../../redux/slices/advertSlice'
import { setTotalTasks } from '../../../redux/slices/advertSlice'
import { selectUser } from '../../../redux/slices/authSlice'
import Loading from '../loading'
import { checkCanAccessEarn } from '@/services/authServices';
interface PlatformTasks {
	[key: string]: { totalTasks: number, remainingTasks:number }
  }
  
// Import necessary dependencies and interfaces here

const Earn = () => {
	const router = useRouter()
	const dispatch = useDispatch()
	const isError: boolean = useSelector(selectIsError)
	const user = useSelector(selectUser)


	
	const [platformTasks, setPlatformTasks] = useState<PlatformTasks>({})
	const [isLoading, setIsLoading] = useState(false)
	const [canAccessEarn, setCanAccessEarn] = useState<boolean | null>(null);

	useRedirectLoggedOutUser('/login')

useEffect(() => {
		const fetchAccessStatus = async () => {
		  try {
			const accessStatus = await checkCanAccessEarn();
			setCanAccessEarn(accessStatus);
	  
			if (!accessStatus) {
			  router.push('/dashboard/earn/deposit-it'); // Redirect if access not allowed
			}
		  } catch (error) {
			console.error('Failed to fetch access status');
			router.push('/dashboard');
		  }
		};
	  
		fetchAccessStatus();
	  }, [router]);


	useEffect(() => {
		async function getTasks() {
			try {
				setIsLoading(true);
				const res: PlatformTasks = await getTotalTasksByAllPlatforms();
				setPlatformTasks(res);
	console.log("checking for can access",user)
				// Calculate remaining tasks across all platforms
				const remainingTasksAcrossAllPlatforms = Object.values(res).reduce(
					(acc, platform) => acc + platform.remainingTasks,
					0
				);
	
				// Dispatch the remaining tasks to Redux store
				dispatch(setTotalTasks(remainingTasksAcrossAllPlatforms));
	
				setIsLoading(false);
			} catch (error) {
				console.error('Failed to retrieve tasks', error);
				setIsLoading(false);
			}
		}
	
		getTasks();
	}, [dispatch]);
	


	// Create a sorted version of socialMenu based on totalTasks from platformTasks
	const sortedMenu = [...socialMenu].sort((a, b) => {
		const tasksA = platformTasks[a.value]?.remainingTasks || 0
		const tasksB = platformTasks[b.value]?.remainingTasks || 0
		return tasksB - tasksA // Sort in descending order
	})
	if (canAccessEarn === null) {
		return <Loading />; // Show a loading spinner while checking
	  }

	return (
		<Suspense>
			{isLoading ? (
				<Loading />
			) : (
				<div className='w-full min-h-screen pb-20'>
					<div className='justify-between mx-auto md:mr-5'>
						<div className='flex items-center gap-3 border-b border-gray-200 py-5'>
							<MdOutlineKeyboardArrowLeft
								className='cursor-pointer'
								size={30}
								onClick={() => router.back()}
							/>
							<div className='flex flex-col'>
								<p className='font-semibold text-xl text-gray-700'>
									Perform Social Tasks and Earn
								</p>
								<small className='font-medium text-gray-500'>
									When you click on a platform, you will see only the Tasks you
									are qualified to Perform
								</small>
							</div>
						</div>

						<div className='grid md:grid-cols-3 gap-8 items-center justify-center mt-[1rem] px-3 py-5'>
							{sortedMenu.map((menu, index) => (
								<div
									key={index}
									onClick={(e) => {
										e.preventDefault()
										router.push(`/dashboard/taskearn/${menu.value}`)
									}}
									className='w-fit hover:shadow cursor-pointer md:w-full border rounded-lg p-5'>
									<div className='flex flex-row items-center gap-5'>
										<div className='flex flex-col'>
											<div className='flex items-center justify-center w-[100px] h-[100px] bg-gray-50 rounded-t-xl rounded-b-2xl'>
												<Image
													src={menu.icon}
													alt={menu.title}
													className='object-cover h-16 w-16 rounded-full p-2'
												/>
											</div>
										</div>
										<div className='flex flex-col md:flex-row md:justify-between md:items-center md:border-gray-100'>
											<div className='flex flex-col w-full'>
												<h3 className='font-bold text-[20px]'>{menu.title}</h3>
												<p className='pb-3 text-[14px] text-gray-500 font-semibold'>
													<span className='font-extrabold'>Earning: </span>
													Starts from {toIntlCurrency(menu.earn.toString())}/Task
												</p>
											</div>
											<div className='w-full'>
												<small
													className={`py-2 px-5 ${
														!platformTasks[menu.value]?.remainingTasks ||
														platformTasks[menu.value]?.remainingTasks == 0
															? 'bg-gray-500'
															: 'bg-secondary'
													} text-primary rounded-2xl`}>
													<span className={cn('mr-1')}>
														{platformTasks[menu.value]?.remainingTasks || 0}
													</span>
													Tasks Available
												</small>
											</div>
										</div>
									</div>

									<div className='w-full mt-2'>
										<p className='font-normal text-[14px] text-gray-700 mt-3'>
											{menu.desc}
										</p>
									</div>
								</div>
							))}
						</div>
					</div>
				</div>
			)}
		</Suspense>
	)
}

export default Earn
