'use client'
import React from 'react'
import { BsFillPlusCircleFill } from 'react-icons/bs'
import { MdOutlineKeyboardArrowLeft } from 'react-icons/md'
import AdItem from '../../../components/dashboard/AdItem'
import useRedirectLoggedOutUser from '../../../customHook/useRedirectLoggedOutUser'
import { useDispatch, useSelector } from 'react-redux'
import {
	handleGetUserAdverts,
	selectAdverts,
	selectIsError,
	selectIsLoading,
} from '../../../redux/slices/advertSlice'
import { useEffect } from 'react'
import { toast } from 'react-hot-toast'
import Loader from '../../../components/loader/Loader'
import { selectUser } from '../../../redux/slices/authSlice'
import { handleGetAllUser, selectUsers } from '../../../redux/slices/userSlice'
import { handleGetTasks } from '../../../redux/slices/taskSlice'
import { useRouter } from 'next/navigation'

const CampaignStats = () => {
	const user = useSelector(selectUser)
	console.log('🚀 ~ CampaignStats ~ user:', user)
	const adverts = useSelector(selectAdverts)
	const users = useSelector(selectUsers)
	const isLoading = useSelector(selectIsLoading)
	const isError = useSelector(selectIsError)
	const dispatch = useDispatch()
	const router = useRouter()
	useRedirectLoggedOutUser('/login')

	const getAdverts = async () => {
		dispatch(handleGetUserAdverts() as any)
		dispatch(handleGetAllUser())
		dispatch(handleGetTasks())
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
			{isLoading && <Loader />}
			<div className='flex items-center justify-between gap-3 border-b border-gray-200 py-5'>
				<div className='flex items-center'>
					<MdOutlineKeyboardArrowLeft
						size={30}
						onClick={() => router.back()}
						className='mr-1'
					/>
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
				<small className='hidden md:flex bg-secondary rounded-full p-4 text-primary'>
					{adverts.length}
				</small>
				<button
					onClick={() => router.push('/dashboard/advertise')}
					className='flex items-center gap-1 bg-secondary text-primary rounded-full px-5 py-2 mr-5 text-[12px] md:text-[15px] hover:bg-tertiary'>
					<BsFillPlusCircleFill />
					Campaign
				</button>
			</div>

			<div className='w-full'>
				{adverts.map((item) => (
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
						users={users}
						user={user}
						//taskList={tasksList}
					/>
				))}
			</div>
		</div>
	)
}

export default CampaignStats
