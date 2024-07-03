import React from 'react'
// import Register from '../../../(auth)/Register'
import { useState } from 'react'
// import Login from '../../../(auth)/login'
import { ShowOnLogin, ShowOnLogout } from './protect/hiddenLinks'
// import Logout from '../../../(auth)/Logout'
import { Modal } from '@mui/material'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import { HiOutlineMenuAlt3 } from 'react-icons/hi'
import { MdOutlineCancel } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'
import { cn } from '../../helpers'
import logo from '../assets/belocated-logo.png'
import { fetchUserDetails, selectUser } from '../redux/slices/authSlice'
import Button from './Button'
import Logout from './auth/Logout'
import Login from './auth/login'
import Register from './auth/register'

export const Header = () => {
	const router = useRouter()

	const searchParam = useSearchParams()
	const referralToken = searchParam.get('referralToken')

	const dispatch = useDispatch()
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
	const user = useSelector(selectUser)
	const [isReg, setIsReg] = useState(false)
	const [isLogin, setIsLogIn] = useState(false)

	const showRegModal = () => {
		setIsReg(true)
		setIsLogIn(false)
	}

	const showLoginModal = () => {
		setIsReg(false)
		setIsLogIn(true)
	}

	const closeModal = () => {
		setIsLogIn(false)
		setIsReg(false)
	}

	const userDashboard = () => {
		// if (!user?.isKycDone) {
		// 	router.push(`/kyc`)
		// } else
		if (user?.accountType === 'Admin') {
			return (
				<button
					onClick={() => router.push(`/admin/dashboard`)}
					className='bg-transparent text- px-6 py-3 rounded-full hover:bg-transparent hover:text-secondary'>
					Dashboard
				</button>
			)
		}

		if (user?.accountType === 'User') {
			return (
				<button
					onClick={() => router.push(`/dashboard`)}
					className='bg-transparent text- px-6 py-3 rounded-full hover:bg-transparent hover:text-secondary'>
					Dashboard
				</button>
			)
		}
	}

	useEffect(() => {
		if (referralToken) showRegModal()
		userDashboard()
	}, [user])

	useEffect(() => {
		if (user?.token) dispatch(fetchUserDetails() as any)
	}, [])

	const handleCloseMenu = () => {
		setMobileMenuOpen(!mobileMenuOpen)
	}

	return (
		<header className='w-full absolute'>
			<div className='relative container px-6 py-6 flex justify-between items-center mx-auto md:px-0'>
				<Link
					href='/'
					className='logo cursor-pointer text-4xl font-extrabold  w-2 md:w-[170px]'>
					<Image src={logo} alt='logo' className='' />
				</Link>

				<div className='hidden nav__items gap-4 font-medium text-sm text-gray-600 md:flex'>
					<CustomLink href='/' text='Home' />
					<CustomLink href='/about' text='About' />
					<CustomLink href='/faq' text='FAQ' />
					<CustomLink href='/services' text='Services' />
					<CustomLink href='/contact' text='Contact' />
				</div>

				<ShowOnLogout>
					<div className='hidden gap-2 md:flex'>
						<button
							onClick={showLoginModal}
							className='bg-transparent  px-6 py-3 rounded-full hover:bg-transparent hover:text-secondary'>
							Login
						</button>
						<Button
							size={'sm'}
							onClick={showRegModal}
							variant='outline'
							color='secondary'>
							Create Account
						</Button>
					</div>
				</ShowOnLogout>

				<ShowOnLogin>
					<div className='hidden gap-2 md:flex'>
						{userDashboard()}
						<Logout />
					</div>
				</ShowOnLogin>

				<div className='relative md:hidden'>
					<div>
						{mobileMenuOpen && (
							<MdOutlineCancel
								onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
								size={30}
								className='text-gray-600'
							/>
						)}
						{!mobileMenuOpen && (
							<HiOutlineMenuAlt3
								onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
								size={30}
								className='text-gray-600'
							/>
						)}
					</div>
				</div>

				{mobileMenuOpen && (
					<div className='absolute w-full right-0 left-0 top-[5.5rem] py-[5rem] p-[1.5rem] shadow-xl rounded-sm bg-primary'>
						<div
							onClick={() => handleCloseMenu()}
							className='flex h-[200px] flex-col justify-center items-center gap-[1rem] font-extrabold text-gray-700'>
							<CustomLink href='/' text='Home' />
							<CustomLink href='/about' text='About' />
							<CustomLink href='/faq' text='FAQ' />
							<CustomLink href='/services' text='Services' />
							<CustomLink href='/contact' text='Contact' />

							<ShowOnLogout>
								<p
									onClick={showLoginModal}
									className='text-gray-800 cursor-pointer'>
									Login
								</p>
							</ShowOnLogout>
							<ShowOnLogout>
								<p
									onClick={showRegModal}
									className='text-gray-50 cursor-pointer bg-secondary px-8 rounded-full py-2'>
									Get Started Free{' '}
								</p>
							</ShowOnLogout>

							<ShowOnLogin>{userDashboard()}</ShowOnLogin>
							<ShowOnLogin>
								<Logout />
							</ShowOnLogin>
						</div>
					</div>
				)}
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
		</header>
	)
}

const CustomLink: React.FC<{ href: string; text: string }> = ({
	href,
	text,
}) => {
	const pathname = usePathname()
	const isActive = pathname === href

	return (
		<Link className={cn(isActive && 'active')} href={href}>
			{text}
		</Link>
	)
}
