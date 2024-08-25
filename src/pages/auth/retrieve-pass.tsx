'use client'

import ForgottenPasswordVerify from '@/components/auth/ForgottenPasswordVerify'
import Loader from '@/components/loader/Loader'
import { resendOTPVerificationEmail } from '@/services/authServices'
import { Modal } from '@mui/material'
import React, { useState } from 'react'
import { toast } from 'react-hot-toast'

const initialState = {
	email: '',
}

const RetrievePassword = () => {
	const [values, setValues] = useState(initialState)
	const [isLoading, setIsLoading] = useState(false)
	const [toggleOTPVerify, setToggleOTPVerify] = useState(false)
	const [userId, setUserId] = useState('')

	const { email } = values

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target
		setValues({ ...values, [name]: value })
	}

	const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		if (!email) {
			return toast.error('You have to input your Email')
		}

		setIsLoading(true)

		try {
			const OTPSent = await resendOTPVerificationEmail(email)
			setIsLoading(false)

			if (!OTPSent) {
				toast.error('Error Sending Verification Email')
				return
			}

			if (OTPSent && OTPSent.message === 'Verification OTP Sent') {
				setUserId(OTPSent.userId)
				setToggleOTPVerify(true)
				toast.success('Please, verify your account')
			}
		} catch (error) {
			setIsLoading(false)
			toast.error('Error Sending Verification Email')
		}
	}

	const handleModal = () => {
		setToggleOTPVerify(!toggleOTPVerify)
	}

	return (
		<div className='w-full h-[70vh]'>
			<Loader open={isLoading} />

			<div className='flex flex-col justify-center items-center gap-4 mx-auto w-full h-full px-[2rem] md:w-1/2'>
				<div className='mb-5 flex justify-center text-center'>
					<h3 className='w-[80%] text-xl text-gray-600 font-bold px-6 mt-2'>
						Enter your registered email to retrieve your forgotten password
					</h3>
				</div>
				<form onSubmit={handleOnSubmit} className=''>
					<input
						type='email'
						name='email'
						placeholder='Email'
						onChange={handleInputChange}
						className='w-full mb-[1rem] shadow-inner p-3 bg-transparent border border-gray-200 rounded-xl'
					/>

					<button
						type='submit'
						className='w-full mt-1 mb-[-0rem] py-2 text-md rounded-xl bg-secondary text-gray-100 mb-5'>
						Retrieve Password!
					</button>
				</form>
			</div>

			<Modal
				open={toggleOTPVerify}
				onClose={() => setToggleOTPVerify(false)} // Ensure onClose properly closes the modal
				aria-labelledby='modal-modal-title'
				aria-describedby='modal-modal-description'>
				<div className='flex items-center justify-center h-full'>
					<ForgottenPasswordVerify
						handleModal={handleModal}
						email={email}
						userId={userId}
					/>
				</div>
			</Modal>
		</div>
	)
}

export default RetrievePassword
