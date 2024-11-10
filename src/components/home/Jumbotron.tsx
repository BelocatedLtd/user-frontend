import { useAppDispatch } from '@/redux/store'
import { Modal } from '@mui/material'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useSelector } from 'react-redux'
import { SET_LOGOUT, selectUser } from '../../redux/slices/authSlice'
import Login from '../auth/login'
import Register from '../auth/register'
import { ShowOnLogin, ShowOnLogout } from '../protect/hiddenLinks'
import Marqueez from './Marquee'

const Jumbotron = () => {
	const router = useRouter()
	const user = useSelector(selectUser)
	const [isReg, setIsReg] = useState(false)
	const [isLogin, setIsLogIn] = useState(false)
	const dispatch = useAppDispatch()
	const searchParam = useSearchParams()
	const referralToken = searchParam?.get('referralToken');
	const referralUsername = searchParam?.get('ref')
	const action = searchParam?.get('action')

	const showRegModal = () => {
		setIsReg(true)
		setIsLogIn(false)
	}

	const showLoginModal = () => {
		setIsLogIn(true)
		setIsReg(false)
	}

	const closeModal = () => {
		router.push(`/${referralToken ? `?referralToken=${referralToken}` : ''}`)
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

	useEffect(() => {
		if (referralToken) {
			console.log('Referral Token', referralToken);

			localStorage.setItem('referralToken', referralToken);
		}

	}, [searchParam])
	useEffect(() => {
		if (referralUsername) {
			console.log('Referral Username', referralUsername);

			localStorage.setItem('referralUsername', referralUsername);
		}
	}, [searchParam])

	useEffect(() => {
		if (referralToken === referralToken || referralUsername === referralUsername){
			showRegModal()
		}
			if (action === 'register') {
				showRegModal()
			} else if (action === 'login') {
				showLoginModal()
			} else {
				setIsReg(false)
				setIsLogIn(false)
			}
	}, [action])

	return (
		<section
			style={{
				backgroundImage: 'url(/bg.png)',
				backgroundPosition: 'center',
				backgroundSize: 'cover',
				backgroundRepeat: 'no-repeat',
			}}
			className='w-full flex flex-col items-center'>
			<div className='container flex mt-5 flex-col items-center'>
				<h1 className='w-[90%] text-center text-[28px] text-gray-800 font-extrabold md:text-[3rem]'>
					Earn Daily: Complete Lucrative <br /> Social Media Tasks Easily
				</h1>
				<p className='w-[80%] text-[22px] font-light text-center text-gray-600 md:w-[60%] md:text-[1.5rem]'>
					Earn while you engage with media. Belocated pays for every task you
					complete.
				</p>
			</div>

			<ShowOnLogout>
				<div className='flex mt-5 items-center'>
					<button
						onClick={() => router.push(`/?action=register`)}
						className='bg-secondary text-primary font-bold px-10 py-3 rounded-full hover:bg-transparent hover:text-secondary hover:border-secondary hover:border'>
						Get Started
					</button>
					<small
						onClick={() => router.push(`/?action=login`)}
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
					onClick={handleLogout}
					className='mt-3 font-medium text-gray-500 mb-3'>
					Welcome, @{user?.username}.{' '}
					<span className='text-secondary cursor-pointer'>Logout</span>
				</small>
			</ShowOnLogin>

			<div className='mt-4 w-full bottom-0'>
				<Marqueez />
			</div>

			<Modal
				open={isReg}
				onClose={closeModal}
				aria-labelledby='modal-modal-title'
				aria-describedby='modal-modal-description'>
				<div className='flex items-center justify-center h-full'>
					<Register
						showRegModal={showRegModal}
						showLoginModal={showLoginModal}
						closeModal={closeModal}
					/>
				</div>
			</Modal>

			<Modal
				open={isLogin}
				onClose={closeModal}
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
