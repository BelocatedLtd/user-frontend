'use client'
import Loader from '@/components/loader/Loader'
import { resendVerificationEmail } from '@/services/authServices'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { CheckmarkIcon, toast } from 'react-hot-toast'

const VerifyEmail = () => {
	const router = useRouter()

	const email = router.query.email as string

	const [isLoading, setIsLoading] = useState(false)
	const [timer, setTimer] = useState(10)
	const [resendBtn, setResendBtn] = useState(false)

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

	const handleResendEmail = async (e: any) => {
		e.preventDefault()

		try {
			setIsLoading(true)
			const response = await resendVerificationEmail(email)
			if (response) {
				toast.success(`Verification link sent href ${email}`)

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
						<span className='text-secondary font-bold'>{email!}</span> for
						instructions to verify your belocated account
					</p>
					<small className='text-tertiary text-[12px] w-[300px] text-center mb-[1rem]'>
						<span className='text-gray-800 font-bold'>Note:</span> Incase you
						didnt see the email in your inbox, Kindly check your spam inbox
					</small>

					<div className='flex items-center gap-2'>
						{resendBtn && (
							<button
								onClick={handleResendEmail}
								className='w-full mt-1  py-2 text-md rounded-xl bg-tertiary text-gray-100 text-center px-6 mb-5'>
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
