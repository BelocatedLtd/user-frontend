'use client'

import close from '@/assets/close.svg'
import Loader from '@/components/loader/Loader'
import {
	confirmEmailOTP,
	resendOTPVerificationEmail,
} from '@/services/authServices'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'

const initialState = {
	OTP: '',
}

const ForgottenPasswordVerify = ({ handleModal, email, userId }: any) => {
	const router = useRouter()
	const [isLoading, setIsLoading] = useState(false)
	const [values, setValues] = useState(initialState)
	const [timer, setTimer] = useState(10)
	const [resendBtn, setResendBtn] = useState(false)
	const [isUpdating, setIsUpdating] = useState(false)

	let interval: any

	useEffect(() => {
		if (timer === 0) {
			setResendBtn(true)
			clearInterval(interval)
			return
		}

		interval = setInterval(() => {
			setTimer((prevTimer) => prevTimer - 1)
		}, 2000)

		return () => clearInterval(interval)
	}, [timer])

	const { OTP } = values

	const handleInputChange = (e: any) => {
		const { name, value } = e.target
		setValues({ ...values, [name]: value })
	}

	const transportData = {
		userId,
		email,
	}

	const handleOnSubmit = async (e: any) => {
		e.preventDefault()

		if (OTP.length > 6) {
			toast.error('Invalid Code')
			return
		}

		if (OTP.length < 6) {
			toast.error('Invalid Code')
			return
		}

		if (!OTP) {
			toast.error('You have to input the OTP code sent to your email')
			return
		}

		//Verifying OTP Code
		setIsLoading(true)
		const response = await confirmEmailOTP(OTP)

		setIsLoading(false)
		if (!response) {
			setIsLoading(false)
			toast.error('Failed to verify')
			return
		}

		setIsLoading(false)

		const transportDataString = JSON.stringify(transportData)
		//Sending data to update user account details
		if (response && response === 'Verification Successful') {
			setIsUpdating(true)
			router.push(
				{
					pathname: '/auth/forgot-password-change/',
					query: {
						...transportData,
						otp: OTP,
					},
				},
				'/auth/forgot-password-change',
			)
			handleModal()
			setIsUpdating(false)
		}
	}

	const resendOTP = async (e: any) => {
		e.preventDefault()

		try {
			setIsLoading(true)
			const response = await resendOTPVerificationEmail(email)
			if (response) {
				toast.success('OTP resent to your email')

				setResendBtn(false)
				setTimer(10)
			}
			setIsLoading(false)
		} catch (error) {
			setIsLoading(false)
			console.log(error)
		}
	}

	return (
		<div className='wrapper'>
			<Loader open={isLoading} />

			<div className='relative modal w-fit h-fit py-[3rem] px-[3rem] bg-primary md:w-[400px]'>
				<Image
					src={close}
					alt='close'
					onClick={handleModal}
					height={40}
					width={40}
					className='absolute top-[-1rem] right-[-1rem] text-tertiary'
				/>
				<div className='mb-5 flex flex-col items-center text-center'>
					<h2 className='w-full text-sm text-gray-400 font-medium px-6 text-center'>
						<span className='text-tertiary font-extrabold'>Verification</span>{' '}
						OTP Sent!
					</h2>
					<h3 className='w-full text-xl text-gray-600 font-bold px-6 mt-2'>
						Please, enter the OTP code sent to your Registered Email
					</h3>
				</div>
				<form onSubmit={handleOnSubmit} className='w-full px-6'>
					<input
						type='text'
						name='OTP'
						placeholder='123456'
						onChange={handleInputChange}
						className='w-full  mb-[1rem] shadow-inner py-3 px-3 bg-transparent border border-gray-500 rounded-xl'
					/>

					<div className='flex items-center gap-2'>
						<button
							type='submit'
							className='w-full mt-1 mb-[-0rem] py-2 text-md rounded-xl bg-secondary text-gray-100 mb-5'>
							{isLoading && 'Verifying...'}
							{isUpdating && 'Redirecting...'}
							{!isLoading && !isUpdating && 'Verify'}
						</button>
						{resendBtn && (
							<div
								onClick={resendOTP}
								className='w-full mt-1 mb-[-0rem] py-2 text-md rounded-xl bg-tertiary text-gray-100 text-center mb-5'>
								Resend OTP
							</div>
						)}
						{!resendBtn && (
							<span className='ml-4 p-3 bg-slate-100 text-gray-800 rounded-full'>
								{timer}
							</span>
						)}
					</div>
				</form>
			</div>
		</div>
	)
}

export default ForgottenPasswordVerify
