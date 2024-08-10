'use client'
import Loader from '@/components/loader/Loader'
import { resendVerificationEmail } from '@/services/authServices'
import { useEffect, useState } from 'react'
import { CheckmarkIcon, toast } from 'react-hot-toast'

const VerifyEmail = ({ params }: { params: { email: string } }) => {
	const email = params?.email as string | undefined

	const [isLoading, setIsLoading] = useState(false)
	const [timer, setTimer] = useState(10)
	const [resendBtn, setResendBtn] = useState(false)
	const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null)

	useEffect(() => {
		// Ensure we're running on the client side before setting intervals
		if (typeof window === 'undefined') return

		if (timer === 0) {
			setResendBtn(true)
			if (intervalId) clearInterval(intervalId)
			return
		}

		const id = setInterval(() => {
			setTimer((prevTimer) => prevTimer - 1)
		}, 1000) // 1-second interval

		setIntervalId(id)

		return () => {
			if (intervalId) clearInterval(intervalId)
		}
	}, [timer, intervalId])

	const handleResendEmail = async (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault()

		if (!email) {
			toast.error('Email is missing!')
			return
		}

		try {
			setIsLoading(true)
			const response = await resendVerificationEmail(email)
			if (response) {
				toast.success(`Verification link sent to ${email}`)
				setResendBtn(false)
				setTimer(10)
			}
		} catch (error) {
			toast.error('Failed to resend verification email')
			console.error(error)
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<div className='w-full h-[88vh] flex items-center justify-center'>
			<Loader open={isLoading} />

			<div className='w-[350px] md:w-[600px] flex justify-center h-fit bg-primary mx-auto mt-[3rem] py-[3rem]'>
				<div className='w-full h-full flex flex-col justify-center items-center'>
					<h3 className='flex gap-1 text-xl text-gray-800 font-bold px-6 mt-2 items-center'>
						<span className='text-red-500 font-extrabold'>Verification</span>
						Email Sent
						<CheckmarkIcon />
					</h3>
					<p className='w-fit my-[1rem] text-center px-6'>
						Please check the email address{' '}
						<span className='text-secondary font-bold'>{email || 'N/A'}</span>{' '}
						for instructions to verify your belocated account
					</p>
					<small className='text-tertiary text-[12px] w-[300px] text-center mb-[1rem]'>
						<span className='text-gray-800 font-bold'>Note:</span> In case you
						didn’t see the email in your inbox, kindly check your spam folder.
					</small>

					<div className='flex items-center gap-2'>
						{resendBtn && (
							<button
								onClick={handleResendEmail}
								className='w-full mt-1 py-2 text-md rounded-xl bg-tertiary text-gray-100 text-center px-6 mb-5'>
								Resend Verification Link
							</button>
						)}
						{!resendBtn && (
							<span className='ml-4 p-3 bg-slate-100 text-gray-800 rounded-full'>
								Resend in: {timer}
							</span>
						)}
					</div>
				</div>
			</div>
		</div>
	)
}

export default VerifyEmail
