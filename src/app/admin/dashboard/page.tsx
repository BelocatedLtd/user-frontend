'use client'
import Adverts from '@/components/adminComponents/Adverts'
import Widgets from '@/components/adminComponents/Widgets'
import useRedirectLoggedOutUser from '@/customHook/useRedirectLoggedOutUser'
import {
	handleGetALLUserAdverts,
	selectAllAdverts,
} from '@/redux/slices/advertSlice'
import { SET_LOGOUT, SET_USER, selectUser } from '@/redux/slices/authSlice'
import { handleGetTasks, selectTasks } from '@/redux/slices/taskSlice'
import {
	handleGetTransactions,
	selectTransactions,
} from '@/redux/slices/transactionSlice'
import { handleGetAllUser, selectUsers } from '@/redux/slices/userSlice'
import { getUser } from '@/services/authServices'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'

const AdminDashboard = () => {
	const dispatch = useDispatch()
	const adverts = useSelector(selectAllAdverts)
	const router = useRouter()
	//const isLoading = useSelector(selectIsLoading)
	const user = useSelector(selectUser)
	const users = useSelector(selectUsers)
	const transactions = useSelector(selectTransactions)
	const tasks = useSelector(selectTasks)
	const [tableSwitch, setTableSwitch] = useState('users')
	useRedirectLoggedOutUser('/')
	const [adsList, setAdsList] = useState([])
	const [tasksList, setTasksList] = useState([])

	useEffect(() => {
		async function getUserData() {
			dispatch(handleGetAllUser(user?.token) as any)
			dispatch(handleGetALLUserAdverts(user?.token))
			dispatch(handleGetTransactions(user?.token))
			dispatch(handleGetTasks(user?.token))
			if (!user) {
				const data = await getUser()

				if (!data || data === undefined) {
					toast.error(
						'Unable to retrieve user data, session will be terminated',
					)
					await dispatch(SET_LOGOUT())
					router.push('/')
					return
				}

				await dispatch(SET_USER(data))
			}
		}
		getUserData()
	}, [dispatch, user])

	useEffect(() => {
		const adList = adverts.filter((ad) => ad.status == 'Running')
		setAdsList(adList)

		const taskList = tasks.filter((task) => task.status == 'Submitted')
		setTasksList(taskList)
	}, [])

	console.log('🚀 ~ AdminDashboard ~ users.length:', {
		users,
		adsList,
		transactions,
		tasksList,
	})

	return (
		<div className='w-full h-fit flex flex-col'>
			<div className='widgets flex flex-wrap md:p-[20px] mb-[2rem] gap-[20px]'>
				<Widgets type='users' totalUsers={users.length} />
				<Widgets type='adverts' totalAdverts={adsList.length} />
				<Widgets type='transactions' totalTrx={transactions.length} />
				<Widgets type='tasks' totalTasks={tasksList.length} />
			</div>

			{/* <div className='charts flex w-full px-[20px] py-[5px] gap-[20px]'>
        <FeaturedChart />
        <ActivityFeed />
      </div> */}

			<div className='border md:mx-[20px]'>
				<div className='px-4 font-semibold text-gray-600 m-[15px]'>
					Latest Adverts
				</div>

				<Adverts adverts={adverts} />
			</div>
		</div>
	)
}

export default AdminDashboard
