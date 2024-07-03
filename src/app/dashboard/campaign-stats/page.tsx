'use client'
import Button from '@/components/Button'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { toast } from 'react-hot-toast'
import { BsFillPlusCircleFill } from 'react-icons/bs'
import { useDispatch, useSelector } from 'react-redux'
import AdItem from '../../../components/dashboard/AdItem'
import Loader from '../../../components/loader/Loader'
import {
	handleGetUserAdverts,
	selectAdverts,
	selectIsError,
	selectIsLoading,
} from '../../../redux/slices/advertSlice'
import { selectUser } from '../../../redux/slices/authSlice'
import { handleGetTasks } from '../../../redux/slices/taskSlice'
import { handleGetAllUser, selectUsers } from '../../../redux/slices/userSlice'

const CampaignStats = () => {
	const user = useSelector(selectUser)
	const adverts = useSelector(selectAdverts)
	console.log('🚀 ~ CampaignStats ~ adverts:', adverts)
	const users = useSelector(selectUsers)
	const isLoading = useSelector(selectIsLoading)
	const isError = useSelector(selectIsError)
	const dispatch = useDispatch()
	const router = useRouter()
	// useRedirectLoggedOutUser('/login')

	const getAdverts = async () => {
		dispatch(handleGetUserAdverts() as any)
		dispatch(handleGetAllUser() as any)
		dispatch(handleGetTasks() as any)
	}

	useEffect(() => {
		getAdverts()

		//console.log(tasksList)

		if (isError) {
			toast.error('Failed to retrieve adverts, please reload page')
			router.back()
		}
	}, [dispatch])

	return (
		<div className='w-fit md:w-full h-fit'>
			<Loader open={isLoading} />

			<div className='flex items-center justify-between gap-3 border-b border-gray-200 py-5'>
				<div className='flex items-center'>
					<div className='flex flex-col'>
						<p className='font-semibold text-xl text-gray-700'>
							My Ad Campaigns
						</p>
						<small className='font-medium text-gray-500'>
							Click <span className='text-secondary'>here</span> to see and
							monitor your adverts
						</small>
					</div>
				</div>
				<small className='hidden md:flex h-6 w-10 items-center justify-center bg-secondary rounded-full  text-primary'>
					{adverts.length}
				</small>
				<Button
					variant='solid'
					color='danger'
					onClick={() => router.push('/dashboard/advertise')}
					className='flex items-center  gap-1 bg-secondary text-primary rounded-full px-5 py-2 mr-5 text-[12px] md:text-[15px] hover:bg-tertiary'>
					<BsFillPlusCircleFill />
					Campaign
				</Button>
			</div>

			<div className='w-full grid mt-4 gap-6 grid-cols-1 md:grid-cols-3'>
				{adverts.map((item: any) => (
					<AdItem
						key={item._id}
						socialIcon={item.platform}
						date={item.createdAt}
						title={`${item.service} on ${item?.platform?.toUpperCase()} `}
						adperPostAmt={`${item.costPerTask} Per Ad`}
						roi={item.desiredROI}
						adBudget={item.adAmount}
						tasks={item.tasks}
						adService={item.service}
						status={item.status}
						adDesc={item.caption}
						state={item.state}
						lga={item.lga}
						religion={item.religion}
						item={item}
						url={item.socialPageLink}
						//taskPerformers={item.taskPerformers}
						users={users?.users}
						user={user}
						//taskList={tasksList}
					/>
				))}
			</div>
		</div>
	)
}

export default CampaignStats
