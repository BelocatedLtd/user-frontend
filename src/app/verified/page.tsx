'use client'
import Button from '@/components/Button'
import { Modal } from '@mui/material'
import { useRouter, useSearchParams } from 'next/navigation' // Import from 'next/router' instead of 'next/navigation'
import { Suspense, useEffect, useState } from 'react'
import { CheckmarkIcon, toast } from 'react-hot-toast'
import Login from '../../components/auth/login'
import Loader from '../../components/loader/Loader'
import { emailVerified } from '../../services/authServices'

const EmailVerified = () => {
	const router = useRouter()

	const searchParams = useSearchParams()

	const token = searchParams?.get('token')

	const [isLoading, setIsLoading] = useState(false)
	const [formData, setFormData] = useState<any>()
	const [loginBtn, setLoginBtn] = useState(false)

	const handleVerifyEmail = async () => {
		setIsLoading(true)
		try {
			const response = await emailVerified(token)

			if (response.isEmailVerified === false) {
				setFormData(response)
				toast.error('Invalid or Expired Verification Link. Please login.')
				router.push('/')
			}

			if (response.isEmailVerified === true) {
				toast.success('Email Verified, proceed to login')
			}
		} catch (error) {
			console.error('Error verifying email:', error)
			// toast.error('Error verifying email. Please try again.')
		} finally {
			setIsLoading(false)
		}
	}

	useEffect(() => {
		handleVerifyEmail()
	}, [])

	const handleLogin = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault()
		setLoginBtn(!loginBtn)
	}

	return (
		<Suspense fallback={<Loader open={true} />}>
			<div className='w-full h-[88vh] flex items-center'>
				<Loader open={isLoading} />

				<div className='w-full md:w-[600px] h-fit bg-primary mx-auto mt-[3rem] py-[3rem]'>
					<div className='w-full h-full flex flex-col justify-center items-center'>
						<h3 className='flex gap-1 text-xl text-gray-800 font-bold px-6 mt-2 items-center'>
							<span className='text-red-500 font-extrabold'>Email</span>
							Successfully Verified
							<CheckmarkIcon />
						</h3>
						<p className='md:w-[500px] my-[1rem] text-center px-6'>
							Email verified, please proceed to log into your Belocated account
						</p>
						<Button
							variant='solid'
							color='secondary'
							onClick={handleLogin}
							className='md:w-[60%] mt-1 rounded-xl'>
							Login to Account
						</Button>
					</div>
				</div>

				<Modal
					open={loginBtn}
					onClose={() => setLoginBtn(false)} // Ensure onClose properly closes the modal
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
		</Suspense>
	)
}

export default EmailVerified
