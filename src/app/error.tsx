'use client'

import errorPage from '@/assets/errorpage.png'
import Button from '@/components/Button'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Suspense, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { handleGetUserAdverts } from '../redux/slices/advertSlice'
import { SET_USER, SET_USERNAME, selectUser } from '../redux/slices/authSlice'
import { handleGetUserTasks } from '../redux/slices/taskSlice'
import { handleGetUserTransactions } from '../redux/slices/transactionSlice'
import { getUser } from '../services/authServices'

const Error404Page = () => {
	const dispatch = useDispatch()
	const user = useSelector(selectUser)
	const router = useRouter()

	const getDetails = async () => {
		if (user?.roken) {
			if (user?.email === '') {
				const data = await getUser()
				dispatch(SET_USER(data))
				dispatch(SET_USERNAME(data.username))
			}

			dispatch(handleGetUserTasks() as any)
			dispatch(handleGetUserTransactions() as any)
			dispatch(handleGetUserAdverts() as any)
		}
	}

	useEffect(() => {
		getDetails()
	}, [dispatch])

	return (
		<Suspense>
			<div className='w-full h-full'>
				<div className='container h-full items-center justify-center mx-auto'>
					<div className='flex flex-col h-full w-full items-center justify-center border-gray-100'>
						<Image
							src={errorPage}
							alt='errorpage img'
							className='w-40 h-40 md:w-80 md:h-80'
						/>
						<hr />
						<p className='font-bold text-lg md:text-2xl text-gray-700 mt-[2rem]'>
							Oops!, seems you've hit a Snag.
						</p>
						<div className='flex justify-center items-center gap-3 w-full mt-[1rem]'>
							<Button
								variant='solid'
								color='danger'
								onClick={() => router.back()}
								className='rounded-sm '>
								Go Back
							</Button>
							<Button
								variant='solid'
								color='secondary'
								onClick={() => router.push('/')}
								className='rounded-sm '>
								Home Page
							</Button>
						</div>
					</div>
				</div>
			</div>
		</Suspense>
	)
}

export default Error404Page
