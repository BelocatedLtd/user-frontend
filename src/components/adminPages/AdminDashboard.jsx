import { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import useRedirectLoggedOutUser from '../../customHook/useRedirectLoggedOutUser'
import {
	handleGetALLUserAdverts,
	selectAllAdverts,
} from '../../redux/slices/advertSlice'
import { SET_LOGOUT, SET_USER, selectUser } from '../../redux/slices/authSlice'
import { handleGetTasks, selectTasks } from '../../redux/slices/taskSlice'
import {
	handleGetTransactions,
	selectTransactions,
} from '../../redux/slices/transactionSlice'
import { handleGetAllUser, selectUsers } from '../../redux/slices/userSlice'
import { getUser } from '../../services/authServices'
import Widgets from '../adminComponents/Widgets'
import Adverts from './Adverts'

const AdminDashboard = () => {
	const dispatch = useDispatch()
	const adverts = useSelector(selectAllAdverts)
	//const isLoading = useSelector(selectIsLoading)
	const user = useSelector(selectUser)
	const users = useSelector(selectUsers)
	const transactions = useSelector(selectTransactions)
	const tasks = useSelector(selectTasks)
	const [tableSwitch, setTableSwitch] = useState('users')
	useRedirectLoggedOutUser('/')
	const [adsList, setAdsList] = useState()
	const [tasksList, setTasksList] = useState()

	useEffect(() => {
		async function getUserData() {
			await dispatch(handleGetAllUser(user?.token))
			await dispatch(handleGetALLUserAdverts(user?.token))
			await dispatch(handleGetTransactions(user?.token))
			await dispatch(handleGetTasks(user?.token))
			if (!user) {
				const data = await getUser()

				if (!data || data === undefined) {
					toast.error(
						'Unable to retrieve user data, session will be terminated',
					)
					await dispatch(SET_LOGOUT())
					navigate('/')
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
	}, [adverts, tasks])

	return (
		<div className='w-full h-fit flex flex-col'>
			<div className='widgets flex flex-wrap md:p-[20px] mb-[3rem] gap-[20px]'>
				<Widgets type='users' totalUsers={users} />
				<Widgets type='adverts' totalAdverts={adsList} />
				<Widgets type='transactions' totalTrx={transactions} />
				<Widgets type='tasks' totalTasks={tasksList} />
			</div>

			{/* <div className='charts flex w-full px-[20px] py-[5px] gap-[20px]'>
        <FeaturedChart />
        <ActivityFeed />
      </div> */}

			<div className='listContainer shadow-lg md:m-[20px]'>
				<div className='listTitle font-semibold text-gray-600 m-[15px]'>
					Latest Adverts
				</div>

				<Adverts adverts={adverts} />
			</div>
		</div>
	)
}

export default AdminDashboard
