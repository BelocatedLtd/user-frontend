import React from 'react'
import { useState } from 'react'
import Register from '../pages/authLayout/Register'
import Login from '../pages/authLayout/Login'
import { ShowOnLogin, ShowOnLogout } from './protect/hiddenLinks'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectUser } from '../redux/slices/authSlice'
import logo from '../assets/bg.png'

const Jumbotron = ({}) => {
	const navigate = useNavigate()
	const user = useSelector(selectUser)
	const [isReg, setIsReg] = useState(false)
	const [isLogin, setIsLogIn] = useState(false)

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

	return (
		<section className='w-full h-[85vh] flex flex-col items-center mt-[8rem]'>
			{isReg && (
				<Register
					showRegModal={showRegModal}
					showLoginModal={showLoginModal}
					closeModal={closeModal}
				/>
			)}
			{isLogin && (
				<Login
					showLoginModal={showLoginModal}
					showRegModal={showRegModal}
					closeModal={closeModal}
				/>
			)}

			<div className='container flex flex-col items-center'>
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
						onClick={showRegModal}
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
					onClick={() => navigate(`/dashboard/${user?.username}`)}
					className='bg-tertiary text-primary font-bold px-10 py-3 mt-[5rem] rounded-full hover:bg-transparent hover:text-tertiary hover:border-tertiary hover:border'>
					Go to Dashboard
				</button>
				<small
					onClick={() => navigate('/logout')}
					className='mt-3 font-medium text-gray-500 mb-3'>
					Welcome, @{user?.username}.{' '}
					<span className='text-secondary cursor-pointer'>Logout</span>
				</small>
			</ShowOnLogin>
			<img src={logo} alt='logo' className='w-full h-full  object-cover' />
		</section>
	)
}

export default Jumbotron
