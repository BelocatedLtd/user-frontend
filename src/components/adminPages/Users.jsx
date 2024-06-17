import { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component'
import { toast } from 'react-hot-toast'
import { AiFillDelete } from 'react-icons/ai'
import { MdArrowDownward, MdOutlineKeyboardArrowLeft } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { selectAllAdverts } from '../../redux/slices/advertSlice'
import {
	handleGetAllActivities,
	selectActivities,
} from '../../redux/slices/feedSlice'
import { selectTasks } from '../../redux/slices/taskSlice'
import {
	handleGetAllUser,
	selectIsError,
	selectIsLoading,
	selectUsers,
} from '../../redux/slices/userSlice'
import { trashAllUserActivities } from '../../services/feedService'
import DataSearch from '../adminComponents/DataSearch'
import Loader from '../loader/Loader'

const Users = () => {
	const navigate = useNavigate()
	const dispatch = useDispatch()
	const users = useSelector(selectUsers)
	const tasks = useSelector(selectTasks)
	const adverts = useSelector(selectAllAdverts)
	const activities = useSelector(selectActivities)
	const isLoading = useSelector(selectIsLoading)
	const isError = useSelector(selectIsError)
	const sortIcon = <MdArrowDownward />
	const [activityIsLoading, setactivityIsLoading] = useState(false)
	const [filteredData, setFilteredData] = useState(users)

	useEffect(() => {
		dispatch(handleGetAllUser())
		dispatch(handleGetAllActivities())

		if (isError) {
			toast.error('failed to fetch users')
		}
	}, [dispatch])

	const trashAllActivities = async () => {
		if (activities.length < 500) {
			toast.error('Lets allow it get to atleast 500 activities in the feed')
			return
		}

		setactivityIsLoading(true)
		const response = trashAllUserActivities()
			.catch((error) => {
				setactivityIsLoading(false)
				toast.error("Failed to trash users' activities")
				console.log(error)
			})
			.then((res) => {
				setactivityIsLoading(false)
				console.log(res)
			})

		toast.promise(response, {
			loading: 'Emptying activity feed...',
			success: <b>Activity feed emptied successfully</b>,
			error: <b>Failed to emptying activity feed</b>,
		})
	}

	const handleFilter = (e) => {
		e.preventDefault()
		const newData = users?.filter((row) => {
			return (
				row?.username
					?.toLowerCase()
					?.includes(e?.target?.value?.toLowerCase()) ||
				row?.email?.toLowerCase()?.includes(e?.target?.value?.toLowerCase()) ||
				row?.phone
					?.toString()
					?.toLowerCase()
					?.includes(e?.target?.value?.toLowerCase())
			)
		})
		setFilteredData(newData)
	}

	const columns = [
		{
			name: 'Fullname',
			selector: (row) => row.fullname,
		},
		{
			name: 'Username',
			selector: (row) => row.username,
			sortable: true,
		},
		{
			name: 'Email',
			selector: (row) => row.email,
		},
		{
			name: 'Phone',
			selector: (row) => row.phone,
			sortable: true,
		},
		{
			name: 'State',
			selector: (row) => row.location,
			sortable: true,
		},
		{
			name: 'Gender',
			selector: (row) => row.gender,
			sortable: true,
		},
		{
			name: 'Ads Created',
			cell: (row) => {
				const userAds = adverts?.filter((ad) => ad.userId == row?._id)
				return <div className='font-bold text-[13px]'>{userAds?.length}</div>
			},
			sortable: true,
		},
		{
			name: 'Task On Going',
			cell: (row) => {
				const userTasks = tasks?.filter(
					(task) => task.taskPerformerId == row?._id,
				)
				const userTasksRunning = userTasks?.filter(
					(task) =>
						task.status == 'Awaiting Submission' ||
						task.status == 'Pending Approval' ||
						task.status == 'Submitted',
				)

				return (
					<div className='font-bold text-[13px]'>
						{userTasksRunning?.length}
					</div>
				)
			},
			sortable: true,
		},
		{
			name: 'Tasks Completed',
			cell: (row) => {
				const userTasks = tasks?.filter(
					(task) => task.taskPerformerId == row?._id,
				)
				const userTasksCompleted = userTasks?.filter(
					(task) => task.status == 'Approved',
				)

				return (
					<div className='font-bold text-[13px]'>
						{userTasksCompleted?.length}
					</div>
				)
			},
			sortable: true,
		},
		{
			name: 'Referred Users',
			selector: (row) => row.referrals?.length,
			sortable: true,
		},
		{
			name: 'Actions',
			button: true,
			cell: (row) => (
				<button
					className='bg-[#18141E] text-gray-100 px-3 py-2 rounded-2xl hover:bg-btn hover:bg-secondary'
					onClick={(e) => handleButtonClick(e, row._id)}>
					View User
				</button>
			),
		},
	]

	const customStyles = {
		headCells: {
			style: {
				backgroundColor: '#18141E',
				color: '#f4f4f4',
				fontSize: '15px',
			},
		},
	}

	const handleButtonClick = (e, userId) => {
		e.preventDefault()
		navigate(`/admin/dashboard/user/${userId}`)
	}

	return (
		<div className='w-full mx-auto mt-[2rem]'>
			{activityIsLoading && <Loader />}
			<div className='flex items-center justify-between mb-[2rem]'>
				<div className='flex items-center'>
					<MdOutlineKeyboardArrowLeft
						size={30}
						onClick={() => navigate(-1)}
						className='mr-1'
					/>
					<p className='font-semibold text-xl text-gray-700'>Users</p>
				</div>

				<div className='flex items-center gap-2'>
					<label>User Activities:</label>
					<p>{activities.length}</p>
					<AiFillDelete
						className='text-secondary hover:text-tertiary'
						onClick={trashAllActivities}
					/>
				</div>
			</div>

			<DataSearch placeholder='Search User...' handleFilter={handleFilter} />

			<DataTable
				columns={columns}
				data={filteredData}
				progressPending={isLoading}
				pagination
				selectableRows
				fixedHeader
				customStyles={customStyles}
				sortIcon={sortIcon}
				handleButtonClick={handleButtonClick}
			/>
		</div>
	)
}

export default Users
