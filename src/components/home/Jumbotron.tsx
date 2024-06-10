import React from 'react'
import { useState } from 'react'
// import Register from '../../../(auth)/Register'
// import Login from '../../../(auth)/login'
import { ShowOnLogin, ShowOnLogout } from '../protect/hiddenLinks'
import { useSelector } from 'react-redux'
import { SET_LOGOUT, selectUser } from '../../redux/slices/authSlice'
import logo from '@/assets/bg.png'
import Marqueez from './Marquee'
import { useRouter, useSearchParams } from 'next/navigation'
import Image from 'next/image'
import Register from '../auth/register'
import Login from '../auth/login'
import toast from 'react-hot-toast'
import { useAppDispatch } from '@/redux/store'
import { Modal } from '@mui/material'

const Jumbotron = ({}: any) => {
	const router = useRouter()
	const user = useSelector(selectUser)
	const [isReg, setIsReg] = useState(false)
	const [isLogin, setIsLogIn] = useState(false)

	const dispatch = useAppDispatch()

	const searchParam = useSearchParams()
	const referralToken = searchParam.get('referralToken')

	const showRegModal = () => {
		setIsReg(true)
		setIsLogIn(false)
	}

	const showLoginModal = () => {
		setIsLogIn(true)
		setIsReg(false)
	}

	const closeModal = () => {
		setIsLogIn(false)
		setIsReg(false)
	}

	const handleLogout = () => {
		try {
			dispatch(SET_LOGOUT())
			router.push('/')
			toast.success('User successfully logged out')
		} catch (error: any) {
			toast.error(error)
		}
	}

	return (
		<section
			style={{
				backgroundImage: 'url(/bg.png)',
				// backgroundImage: 'url(' + sectionBg + ')',
				backgroundPosition: 'center',
				backgroundSize: 'cover',
				backgroundRepeat: 'no-repeat',
			}}
			className='w-full h-screen  flex flex-col items-center pt-[10rem]'>
			<div className='container flex mt-20 flex-col items-center'>
				<h1 className='w-[90%] text-center text-[28px] text-gray-800 font-extrabold md:text-[3rem]'>
					Earn Daily: Complete Lucrative <br /> Social Media Tasks Easily
				</h1>
				<p className='w-[80%] text-[22px] font-light text-center text-gray-600  md:w-[60%] md:text-[1.5rem]'>
					Earn while you engage with media. Belocated pays for every task you
					complete.
				</p>
			</div>

			<ShowOnLogout>
				<div className='flex mt-6 items-center'>
					<button
						onClick={() => showRegModal()}
						className='bg-secondary text-primary font-bold px-10 py-3  rounded-full hover:bg-transparent hover:text-secondary hover:border-secondary hover:border'>
						Get Started
					</button>
					<small
						onClick={showLoginModal}
						className='ml-3 font-medium text-gray-500'>
						Already a Member?{' '}
						<span className='text-secondary cursor-pointer'>Login</span>
					</small>
				</div>
			</ShowOnLogout>

			<ShowOnLogin>
				<button
					onClick={() => router.push(`/dashboard`)}
					className='bg-tertiary text-primary font-bold px-10 py-3 mt-[5rem] rounded-full hover:bg-transparent hover:text-tertiary hover:border-tertiary hover:border'>
					Go to Dashboard
				</button>
				<small
					onClick={() => handleLogout()}
					className='mt-3 font-medium text-gray-500 mb-3'>
					Welcome, @{user?.username}.{' '}
					<span className='text-secondary cursor-pointer'>Logout</span>
				</small>
			</ShowOnLogin>
			{/* <Image
				src={logo}
				alt='logo'
				className='w-full h-[39%] mt-8  object-cover'
			/> */}
			<div className='absolute bottom-0'>
				<Marqueez />
			</div>

			<Modal
				open={isReg}
				onClose={setIsReg}
				aria-labelledby='modal-modal-title'
				aria-describedby='modal-modal-description'>
				<div className='flex items-center justify-center h-full'>
					<Register
						referralToken={referralToken}
						showRegModal={showRegModal}
						showLoginModal={showLoginModal}
						closeModal={closeModal}
					/>
				</div>
			</Modal>

			<Modal
				open={isLogin}
				onClose={setIsLogIn}
				aria-labelledby='modal-modal-title'
				aria-describedby='modal-modal-description'>
				<div className='flex items-center justify-center h-full'>
					<Login
						showLoginModal={showLoginModal}
						showRegModal={showRegModal}
						closeModal={closeModal}
					/>
				</div>
			</Modal>
		</section>
	)
}

export default Jumbotron
