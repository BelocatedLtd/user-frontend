'use client'

import { formatDistanceToNow } from 'date-fns'
import { useEffect, useState } from 'react'
import Marquee from 'react-fast-marquee'
import { useDispatch, useSelector } from 'react-redux'
import { io } from 'socket.io-client'
import {
	NEW_ACTIVITY,
	handleGetAllActivities,
	selectActivities,
} from '../../redux/slices/feedSlice'
import { BACKEND_URL } from '../../utils/globalConfig'

const socket = io(`${BACKEND_URL}`)

export default function Marqueez() {
	const newsFeed = useSelector(selectActivities)

	const dispatch = useDispatch()
	const itemsPerPage = 4
	const [currentPage, setCurrentPage] = useState(1)

	const getCurrentPageData = () => {
		const startIndex = (currentPage - 1) * itemsPerPage
		const endIndex = startIndex + itemsPerPage
		return newsFeed.slice(startIndex, endIndex)
	}

	useEffect(() => {
		//Listen for activity event from the backend
		socket.on('recievedActivity', (data) => {
			dispatch(NEW_ACTIVITY(data))
		})
	}, [socket])

	const getActivities = () => {
		dispatch(handleGetAllActivities() as any)
	}

	useEffect(() => {
		getActivities()
	}, [dispatch])

	return (
		<div className=' bg-primary-light w-full text-gray-500'>
			<Marquee pauseOnHover gradient gradientColor='#EBF4FF'>
				{getCurrentPageData().map((item: any, index: number) => (
					<div
						key={index}
						className='flex items-center ml-24 border-gray-100 py-5'>
						<div className=''>
							{/* <img
								src={speaker}
								alt='announcement'
								width={24}
								className='bg-secondary rounded-full p-[1px] mr-3'
							/> */}
						</div>
						<div className='flex flex-col'>
							<small>{formatDistanceToNow(new Date(item?.createdAt))}</small>
							<p className='text-gray-600 text-[14px]'>{item.action}</p>
						</div>
					</div>
				))}
			</Marquee>
		</div>
	)
}
