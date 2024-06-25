'use client'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'
import DataTable, { TableColumn } from 'react-data-table-component'
import { toast } from 'react-hot-toast'
import { MdArrowDownward, MdOutlineKeyboardArrowLeft } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'
import {
	handleGetALLUserAdverts,
	selectAllAdverts,
} from '../../redux/slices/advertSlice'
import {
	selectIsError,
	selectIsLoading,
	selectUsers,
} from '../../redux/slices/userSlice'

interface Advert {
	_id: string
	userId: string
	platform: string
	service: string
	desiredROI: string
	adAmount: string
	tasks: string
	socialPageLink: string
	tasksModerator: string
	status: string
}

interface User {
	_id: string
	fullname: string
}

const getPaymentStatusBgColor = (status: string): string => {
	switch (status) {
		case 'Pending':
			return 'bg-yellow-500'
		case 'Running':
		case 'Allocating':
			return 'bg-green-500'
		case 'Rejected':
			return 'bg-red-500'
		default:
			return 'bg-gray-500'
	}
}

const Adverts: React.FC = () => {
	const users: User[] = useSelector(selectUsers)
	const adverts: Advert[] = useSelector(selectAllAdverts)
	const router = useRouter()
	const dispatch = useDispatch()
	const isLoading = useSelector(selectIsLoading)
	const isError = useSelector(selectIsError)
	const sortIcon = <MdArrowDownward />

	const columns: TableColumn<Advert>[] = [
		{
			name: 'Advertiser',
			selector: (row) => {
				const advertiser = users.find((user) => user._id === row.userId)
				return (
					<div className='font-bold text-[13px]'>{advertiser?.fullname}</div>
				)
			},
		},
		{
			name: 'Platform',
			selector: (row) => row.platform,
			sortable: true,
		},
		{
			name: 'Service',
			selector: (row) => row.service,
		},
		{
			name: 'Units',
			selector: (row) => row.desiredROI,
			sortable: true,
		},
		{
			name: 'Amount',
			selector: (row) => row.adAmount,
			sortable: true,
		},
		{
			name: 'Tasks',
			selector: (row) => row.tasks,
			sortable: true,
		},
		{
			name: 'Ad Url',
			cell: (row) => (
				<div className='w-full'>
					<a
						href={row.socialPageLink}
						target='_blank'
						className='text-blue-600'>
						{row.socialPageLink}
					</a>
				</div>
			),
			selector: (row) => row.tasks,
			sortable: true,
		},
		{
			name: 'Moderator',
			selector: (row) => row.tasksModerator,
			sortable: true,
		},
		{
			name: 'Status',
			sortable: true,
			cell: (row) => (
				<p
					className={`px-6 py-1 rounded-[5px] ${getPaymentStatusBgColor(
						row.status,
					)}`}>
					{row.status}
				</p>
			),
		},
		{
			name: 'Actions',
			button: true,
			cell: (row) => (
				<button
					className='px-6 py-2 bg-gray-800 text-primary rounded-[5px]'
					onClick={(e) => handleButtonClick(e, row._id)}>
					View
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

	const handleButtonClick = (
		e: React.MouseEvent<HTMLButtonElement>,
		advertId: string,
	) => {
		e.preventDefault()
		router.push(`/admin/dashboard/advert/${advertId}`)
	}

	useEffect(() => {
		dispatch(handleGetALLUserAdverts())

		if (isError) {
			toast.error('failed to fetch adverts')
		}
	}, [isError])

	return (
		<div className='w-full mx-auto mt-[2rem]'>
			{/* <div className='flex items-center justify-between mb-[2rem]'>
				<div className='flex items-center'>
					<MdOutlineKeyboardArrowLeft
						size={30}
						onClick={() => router.back()}
						className='mr-1'
					/>
					<p className='font-semibold text-xl text-gray-700'>Adverts</p>
				</div>
			</div> */}
			<DataTable
				columns={columns}
				data={adverts}
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

export default Adverts
