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
import { RiMegaphoneFill } from "react-icons/ri";

const socket = io(`${BACKEND_URL}`)

const ActivityFeed = () => {
	const newsFeed = useSelector(selectActivities)
	const dispatch = useDispatch()
	const [currentPage, setCurrentPage] = useState(1)

	const itemsPerPage = 6

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
			<div className='w-full border-gray-200 px-5 pb-3 my-3'>
				<h1 className='text-xl font-semibold text-[#05126b] px-4 border-red-400'>
					Recent Activities
				</h1>
				<p className='text-sm mt-2 text-[777777] font-medium'>
					See what people are doing on Belocated
				</p>
			</div>

			<div className='flex flex-col w-full px-5 pb-3 gap-3 py-5'>
				<div className='flex flex-col gap-[0.8rem] divide-y text-gray-600 text-[14px]'>
					{getCurrentPageData().map((item: any, index: number) => (
						<div
							key={index}
							className='grid grid-cols-6 p-4 border-gray-100 '>
							<div className=''>
							<RiMegaphoneFill style={{color:"#13a2df", fontSize:"40px"}}/>
							</div>
							<div className='flex ml-3 col-span-5  flex-col'>
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
