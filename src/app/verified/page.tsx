'use client'
import React from 'react'
import Loader from '../../components/loader/Loader'
import { CheckmarkIcon, toast } from 'react-hot-toast'
import { useState } from 'react'
import { useEffect } from 'react'
import { emailVerified } from '../../services/authServices'
import Login from '../../components/auth/login'
import { useRouter, useSearchParams } from 'next/navigation'
import { Modal } from '@mui/material'

const EmailVerified = () => {
	const router = useRouter()

	const searchParams = useSearchParams()
	const token = searchParams.get('token')
	//const {verificationToken} = useParams()
	const [isLoading, setIsLoading] = useState(false)
	const [formData, setFormData] = useState()
	const [loginBtn, setLoginBtn] = useState(false)

	const handleVerifyEmail = async () => {
		const response = await emailVerified(token)

		if (!response) {
			return toast.error('Internal server error')
		}

		if (response.isEmailVerified === false) {
			setFormData(response)
			toast.error('Invalid or Expired Verification Link. please login')
			router.push('/')
		}

		if (response.isEmailVerified === true) {
			toast.success('Email Verified, proceed to login')
		}
	}

	useEffect(() => {
		handleVerifyEmail()
	}, [])

	const handleLogin = (e: any) => {
		e.preventDefault()
		setLoginBtn(!loginBtn)
	}

	return (
		<div className='w-full h-[88vh] flex items-center'>
			<Loader open={isLoading} />

			<div className='w-[600px] h-fit bg-primary mx-auto mt-[3rem] py-[3rem]'>
				<div className='w-full h-full flex flex-col justify-center items-center'>
					<h3 className='flex gap-1 text-xl text-gray-800 font-bold px-6 mt-2 items-center'>
						<span className='text-red-500 font-extrabold'>Email</span>
						Successfully Verified
						<CheckmarkIcon />
					</h3>
					<p className='w-[500px] my-[1rem] text-center px-6'>
						Email verified, please proceed to log into your Belocated account
					</p>
					<button
						onClick={handleLogin}
						className='w-[60%] mt-1 py-2 text-md rounded-xl bg-secondary text-gray-100 mb-5 hover:bg-red-400'>
						Login to Account
					</button>
				</div>
			</div>

			<Modal
				open={loginBtn}
				onClose={setLoginBtn}
				aria-labelledby='modal-modal-title'
				aria-describedby='modal-modal-description'>
				<div className='flex items-center justify-center h-full'>
					<Login
						handleLogin={handleLogin}
						setLoginBtn={setLoginBtn}
						loginBtn={loginBtn}
						formData={formData}
					/>
				</div>
			</Modal>
		</div>
	)
}

export default EmailVerified
