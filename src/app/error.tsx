'use client'

import errorPage from '@/assets/errorpage.png'
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
		if (user?.email === '') {
			const data = await getUser()
			dispatch(SET_USER(data))
			dispatch(SET_USERNAME(data.username))
		}
		dispatch(handleGetUserTasks() as any)
		dispatch(handleGetUserTransactions() as any)
		dispatch(handleGetUserAdverts() as any)
	}

	useEffect(() => {
		getDetails()
	}, [dispatch])

	return (
		<Suspense>
			<div className='w-full h-[70vh]'>
				<div className='container items-center justify-center mx-auto'>
					<div className='flex flex-col items-center justify-center border-gray-100'>
						<Image
							src={errorPage}
							alt='errorpage img'
							className='border-b border-gray-300 w-[400px] h-[400px]'
						/>
						<p className='font-bold text-2xl text-gray-700 mt-[2rem]'>
							Oops!, seems you've hit a Snag.
						</p>
						<div className='flex items-center gap-2 mt-[1rem]'>
							<button
								onClick={() => router.back()}
								className='bg-tertiary text-primary w-[150px] py-4 px-8'>
								Go Back
							</button>
							<button
								onClick={() => router.push('/')}
								className='bg-secondary text-primary w-[150px] py-4 px-8'>
								Home Page{' '}
							</button>
						</div>
					</div>
				</div>
			</div>
		</Suspense>
	)
}

export default Error404Page
