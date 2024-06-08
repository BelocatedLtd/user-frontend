import React from 'react'
// import Register from '../../../(auth)/Register'
import { useState } from 'react'
// import Login from '../../../(auth)/login'
import { ShowOnLogin, ShowOnLogout } from './protect/hiddenLinks'
// import Logout from '../../../(auth)/Logout'
import { useDispatch, useSelector } from 'react-redux'
import { selectUser } from '../redux/slices/authSlice'
import { MdOutlineCancel } from 'react-icons/md'
import { HiOutlineMenuAlt3 } from 'react-icons/hi'
import { useEffect } from 'react'
import logo from '../assets/belocated-logo.png'
import Button from './Button'
import { usePathname, useRouter } from 'next/navigation'
import Logout from './auth/Logout'
import Link from 'next/link'
import Register from './auth/register'
import Login from './auth/login'
import Image from 'next/image'
import { cn } from '../../helpers'

export const Header = () => {
	const router = useRouter()
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
		if (user?.accountType === 'Admin') {
			return (
				<button
					onClick={() => router.push(`/admin/dashboard/${user?.username}`)}
					className='bg-transparent text- px-6 py-3 rounded-full hover:bg-transparent hover:text-secondary'>
					Dashboard
				</button>
			)
		}

		if (user?.accountType === 'User') {
			return (
				<button
					onClick={() => router.push(`/dashboard/${user?.username}`)}
					className='bg-transparent text- px-6 py-3 rounded-full hover:bg-transparent hover:text-secondary'>
					Dashboard
				</button>
			)
		}
	}

	useEffect(() => {
		userDashboard()
	}, [user])

	const handleCloseMenu = () => {
		setMobileMenuOpen(!mobileMenuOpen)
	}

	return (
		<header className='w-full'>
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

			<div className='relative container px-6 py-6 flex justify-between items-center mx-auto md:px-0'>
				<Link
					href='/'
					className='logo cursor-pointer text-4xl font-extrabold  w-[150px] md:w-[170px]'>
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
						<Button size={'sm'} onClick={showRegModal} variant='outline'>
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
