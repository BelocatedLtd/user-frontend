import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { BACKEND_URL } from '../utils/globalConfig'
import {
	NEW_ACTIVITY,
	handleGetAllActivities,
	selectActivities,
} from '../redux/slices/feedSlice'
import { useDispatch, useSelector } from 'react-redux'
import speaker from '../assets/animated icons/speaker.gif'
import { formatDistanceToNow } from 'date-fns'
import Image from 'next/image'
import { io } from 'socket.io-client'

const socket = io(`${BACKEND_URL}`)

const ActivityFeed = () => {
	const newsFeed = useSelector(selectActivities)
	const dispatch = useDispatch()
	const [currentPage, setCurrentPage] = useState(1)

	const itemsPerPage = 4

	const totalPage = Math.ceil(newsFeed.length / itemsPerPage)

	// const handlePageChange = (selectedPage) => {
	// 	setCurrentPage(selectedPage)
	// }

	const getCurrentPageData = () => {
		const startIndex = (currentPage - 1) * itemsPerPage
		const endIndex = startIndex + itemsPerPage
		return newsFeed.slice(startIndex, endIndex)
	}

	useEffect(() => {
		//Listen for activity event from the backend
		socket.on('recievedActivity', (data) => {
			;async () => {
				await dispatch(NEW_ACTIVITY(data))
			}
		})
	}, [socket])

	const getActivities = async () => {
		dispatch(handleGetAllActivities() as any)
	}

	useEffect(() => {
		getActivities()
	}, [dispatch])

	return (
		<div className='right-0 w-[400px] md:flex md:flex-col'>
			<div className='w-full border-b border-gray-200 px-5 pb-3 my-3'>
				<h1 className='text-xl font-semibold text-gray-600 px-4 border-red-400'>
					Recent Activities
				</h1>
				<p className='text-sm mt-2 text-gray-500 font-medium'>
					See what people are doing on Belocated
				</p>
			</div>

			<div className='flex flex-col w-full px-5 pb-3 gap-3 py-5'>
				<div className='grid grid-cols-2 gap-4 p-4 border-gray-100'>
					{getCurrentPageData().map((item: any, index: number) => (
						<div
							key={index}
							className='flex p-2 border-b border-gray-200'>
							<div className=''>
								<Image
									src={speaker}
									alt='announcement'
									className='bg-secondary rounded-full w-10 h-10'
								/>
							</div>
							<div className='ml-3 flex flex-col'>
								<small>{formatDistanceToNow(new Date(item?.createdAt))}</small>
								<p className='text-gray-600 text-[14px]'>{item.action}</p>
							</div>
						</div>
					))}
				</div>

				{/* {currentPage < totalPage && (
                    <div onClick={() => handlePageChange(currentPage + 1)} className='flex items-center justify-center  gap-2 p-6 '>
                        <p className='font-bold text-gray-500'>View More</p>
                        <MdOutlineKeyboardArrowDown  size={30} className='text-gray-500'/>
                    </div>
                )} */}
			</div>
		</div>
	)
}

export default ActivityFeed
