'use client'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import { BsDatabaseFillGear } from 'react-icons/bs'
import { FaUserAlt } from 'react-icons/fa'
import { GrMoney } from 'react-icons/gr'
import { HiUsers } from 'react-icons/hi'
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io'
import { useDispatch, useSelector } from 'react-redux'
import { SET_LOGOUT, SET_USER, selectUser } from '../../redux/slices/authSlice'
import { getUser } from '../../services/authServices'

interface WidgetsProps {
	type: 'users' | 'adverts' | 'transactions' | 'tasks'
	totalUsers: number
	totalAdverts: number
	totalTrx: number
	totalTasks: number
}

interface Data {
	title: string
	count: number
	link: string
	url: string
	icon: JSX.Element
}

const Widgets: React.FC<WidgetsProps> = ({
	type,
	totalUsers,
	totalAdverts,
	totalTrx,
	totalTasks,
}) => {
	const [percentage, setPercentage] = useState<number>(20)
	const user = useSelector(selectUser)
	const dispatch = useDispatch()
	const router = useRouter()

	useEffect(() => {
		async function getUserData() {
			const data = await getUser()

			if (!data || data === undefined) {
				toast.error('Unable to retrieve user data, session will be terminated')
				dispatch(SET_LOGOUT())
				router.push('/')
				return
			}

			dispatch(SET_USER(data))
		}
		getUserData()
	}, [])

	const dataMap: { [key in WidgetsProps['type']]: Data } = {
		users: {
			title: 'USERS',
			count: totalUsers || 0,
			link: 'See All Users',
			url: `/admin/dashboard/users/${user?.username}`,
			icon: (
				<FaUserAlt
					className='icon text-[30px] p-[5px] rounded-[5px] self-end'
					style={{
						color: 'crimson',
						backgroundColor: 'rgba(255, 0, 0, 0.2)',
					}}
				/>
			),
		},
		adverts: {
			title: 'ADVERTS',
			count: totalAdverts || 0,
			link: 'See All Adverts',
			url: `/admin/dashboard/adverts/${user?.username}`,
			icon: (
				<HiUsers
					className='icon text-[30px] p-[5px] rounded-[5px] self-end'
					style={{ color: 'green', backgroundColor: 'rgba(0, 128, 0, 0.2)' }}
				/>
			),
		},
		transactions: {
			title: 'TRANSACTIONS',
			count: totalTrx || 0,
			link: 'See All Transactions',
			url: `/admin/dashboard/transactions/${user?.username}`,
			icon: (
				<GrMoney
					className='icon text-[30px] p-[5px] rounded-[5px] self-end'
					style={{
						color: 'goldenrod',
						backgroundColor: 'rgba(218, 165, 32, 0.2)',
					}}
				/>
			),
		},
		tasks: {
			title: 'TASKS',
			count: totalTasks || 0,
			link: 'See All Tasks',
			url: `/admin/dashboard/tasks/${user?.username}`,
			icon: (
				<BsDatabaseFillGear
					className='icon text-[30px] p-[5px] rounded-[5px] self-end'
					style={{
						color: 'purple',
						backgroundColor: 'rgba(128, 0, 128, 0.2)',
					}}
				/>
			),
		},
	}

	const data = dataMap[type]

	return (
		<div className=' flex flex-1 justify-between p-4 border rounded-lg h-[150px]'>
			<div className='left flex flex-col justify-between'>
				<span className='title font-bold text[14px] text-gray-400'>
					{data?.title}
				</span>
				<span className='counter text-[28px] font-light'>{data?.count}</span>
				<span className='link text-[12px] border-b border-gray-200 w-fit hover:text-red-600'>
					{data?.url ? <Link href={data?.url}>{data?.link}</Link> : null}
				</span>
			</div>

			<div className='right flex flex-col justify-between'>
				<div
					className={`percentage flex items-center text-[14px] ${
						percentage > 20 ? 'text-green-500' : 'text-red-500'
					}`}>
					{percentage > 20 ? <IoIosArrowUp /> : <IoIosArrowDown />}
					{percentage}
				</div>
				{data?.icon}
			</div>
		</div>
	)
}

export default Widgets
