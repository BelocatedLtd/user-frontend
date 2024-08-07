'use client'

import close from '@/assets/close.svg'
import Loader from '@/components/loader/Loader'
import { SET_LOGIN, SET_USER } from '@/redux/slices/authSlice'
import { loginUser, resendVerificationEmail } from '@/services/authServices'
import { BACKEND_URL } from '@/utils/globalConfig'
import { setToken } from '@/utils/tokenHandler'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { io } from 'socket.io-client'

const socket = io(`${BACKEND_URL}`)

const initialState = {
	email: '',
	password: '',
}

const Login = ({ showRegModal, closeModal }: any) => {
	const router = useRouter()
	const dispatch = useDispatch()
	const [isLoading, setIsLoading] = useState(false)
	const [values, setValues] = useState(initialState)

	const { email, password } = values

	const handleInputChange = (e: any) => {
		const { name, value } = e.target
		setValues({ ...values, [name]: value })
	}

	const handleOnSubmit = async (e: any) => {
		e.preventDefault()

		if (!email || !password) {
			return toast.error('All fields are required')
		}

		const formData = {
			email: email?.toLowerCase(),
			password,
		}

		setIsLoading(true)

		try {
			const response = await loginUser(formData)
			setIsLoading(false)

			// When user email is not verified
			if (response.isEmailVerified === false) {
				toast.error('User Exist but not verified')

				//Proceeding to send verification link
				const emailResponse = resendVerificationEmail(email)
					.catch(() => {
						toast.error('Failed to send verification email')
					})
					.then(() => {
						router.push(`/verify-email/${email}`)
						setIsLoading(false)
					})

				toast.promise(emailResponse, {
					loading: 'Sending verification email...',
					success: <b>Email sent</b>,
					error: <b>Failed to send email</b>,
				})

				closeModal()

				setIsLoading(false)
			}

			// When user email is  verified
			if (response.isEmailVerified === true) {
				const { token } = response

				if (!token) {
					setIsLoading(false)
					toast.error('Login failure...user not authorized')
					return
				}

				setToken(token)
				dispatch(SET_LOGIN())
				dispatch(SET_USER({ ...response, token }))

				if (response.isKycDone === false) {
					return router.push(`/kyc`)
				}

				const username = response.username
				console.log(
					'🚀 ~ handleOnSubmit ~ response.accountType:',
					response.accountType,
				)

				if (response.accountType === 'User') {
					//Emit socket io event to the backend
					const emitData = {
						userId: response?.id,
						action: `@${username} just logged in`,
					}

					//Emit Socket event to update activity feed
					socket.emit('sendActivity', emitData)

					router.push(`/dashboard`)
					toast.success(`Welcome back @${username}!`)

					// closeModal()
					// setIsLoading(false)
				} else {
					toast.success('Please login as user')
				}

				// if (
				// 	response.accountType === 'Admin' ||
				// 	response.accountType === 'Super Admin'
				// ) {
				// 	router.push(`/admin/dashboard/${username}`)
				// }
			}
		} catch (error) {
			setIsLoading(false)
			toast.error('Error trying to login')
		}

		// const response = await loginUser(formData)
		// setIsLoading(false)

		// if(response.isEmailVerified === false) {
		//   toast.error('User Exist but not verified')

		//   //Proceeding to send verification link
		//   const emailResponse = resendVerificationEmail(email)
		//   .catch((error)=> {
		//     toast.error("Failed to send verification email")
		//   })
		//   .then((res) =>  {
		//     router.push('/verify-email', { state:{ formData } })
		//     setIsLoading(false)
		//   })

		//   toast.promise(emailResponse, {
		//       loading: 'Sending verification email...',
		//       success: <b>Email sent</b>,
		//       error: <b>Failed to send email</b>
		//     }
		//   );

		//   closeModal()

		//   setIsLoading(false)
		//   }
		//   setIsLoading(false)

		// if(response.isEmailVerified === true) {

		//   const {token} = response

		//   if (!token) {
		//     setIsLoading(false)
		//     toast.error("Login failure...user not authorized")
		//     return
		//   }

		//   await setToken(token)
		//   await dispatch(SET_LOGIN(true))
		//   await dispatch(SET_USER(response))
		//   const username = response.username

		//   if (response.accountType === "User") {

		//       //Emit socket io event to the backend
		//       const emitData = {
		//         userId: response?.id,
		//         action: `@${username} just logged in`
		//       }

		//       //Emit Socket event to update activity feed
		//       socket.emit('sendActivity', emitData)

		//         router.push(`/dashboard/${username}`)

		//   }

		//   if (response.accountType === "Admin") {
		//     router.push(`/admin/dashboard/${username}`)
		//   }

		//   setIsLoading(false)
		// }

		setIsLoading(false)
	}

	const handleRetrievePass = (e: any) => {
		e.preventDefault()

		router.push('/auth/retrieve-pass')
	}

	return (
		<>
			<div className=''>
				<Loader open={isLoading} />

				<div className='relative w-[350px] flex flex-col items-center h-[550px] bg-primary md:w-[400px]'>
					<Image
						src={close}
						alt='close'
						onClick={closeModal}
						// size={40}
						className='absolute top-[-1rem] cursor-pointer right-[-1rem] text-tertiary'
					/>
					<div className='modal__header__text flex flex-col items-center my-[3rem]'>
						<h2 className='text-sm text-gray-400 font-medium px-6 text-center'>
							<span className='text-secondary font-extrabold'>200+</span> simple
							and profitable tasks posted today!
						</h2>
						<h3 className='text-2xl text-gray-800 font-bold px-6 mt-2 text-center'>
							<span className='text-red-500'>Login</span> to start making money
							on{' '}
							<span className='text-secondary font-extrabold'>Belocated</span>
						</h3>
					</div>

					<div className='w-full h-fit px-[2rem] md:w-full'>
						<form onSubmit={handleOnSubmit}>
							<label htmlFor='email' className='mr-[1rem]'>
								Email
							</label>
							<input
								type='email'
								name='email'
								onChange={handleInputChange}
								className='w-full  mb-[1rem] shadow-inner p-3 bg-transparent border border-gray-200 rounded-xl'
							/>

							<label htmlFor='password' className='mr-[1rem]'>
								Enter Password
							</label>
							<input
								type='password'
								name='password'
								onChange={handleInputChange}
								className='w-full mt-[0.5rem] mb-[1rem] shadow-inner p-3 bg-transparent border border-gray-200 rounded-xl'
							/>

							<button
								type='submit'
								className='w-full mt-4 py-2 mt-1 mb-[-0rem] text-md rounded-xl bg-secondary text-gray-100 mb-5'>
								Login!
							</button>
						</form>
						<small
							onClick={handleRetrievePass}
							className='text-gray-700 font-bold text-[12px] cursor-pointer'>
							Forgot Password
						</small>
						<p
							onClick={showRegModal}
							className='text-sm text-gray-500 text-center cursor-pointer'>
							No account yet? <span className='text-btn'>Sign Up</span>
						</p>
					</div>
				</div>
			</div>
		</>
	)
}

export default Login
