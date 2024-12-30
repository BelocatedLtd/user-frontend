import logo from '@/assets/belocated-logo.png'
import Logout from '@/components/auth/Logout'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { FaAngleDown, FaUserCircle } from 'react-icons/fa'
import { MdMenu, MdOutlineCancel } from 'react-icons/md'
import { useSelector } from 'react-redux'
import { selectUser } from '../../redux/slices/authSlice'
import { ShowOnLogin } from '../protect/hiddenLinks'
import { FaAngleLeft } from "react-icons/fa6";

const Header = () => {
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
	const [suspendAccount, setSuspendedAccount] = useState(false)
	const user = useSelector(selectUser)

	const [anchorEl, setAnchorEl] = useState(null)
	const open = Boolean(anchorEl)
	const handleClick = (event: any) => {
		setAnchorEl(event.currentTarget)
	}
	const handleClose = () => {
		setAnchorEl(null)
	}

	useEffect(() => {
		if (user?.accountStatus === 'Suspended') {
			setSuspendedAccount(true)
			//toast.error("Account has being suspended, send an email to appeal@belocated.ng to appeal")
			return
		}
	}, [])

	const handleCloseMenu = () => {
		setMobileMenuOpen(!mobileMenuOpen)
	}

	return (
		<header className='container w-full px-3 border-b border-gray-200'>
			<div className='md:ml-5 pt-2 w-full flex justify-between items-center mx-auto md:px-2'>
				<div className='cursor-pointer w-full text-secondary'>
					<div className='flex  w-full justify-between items-center'>
						<Image
							src={logo}
							alt='logo'
							className='md:w-40 -ml-2 w-24 object-contain'
						/>
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
									<MdMenu
										onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
										size={30}
										className='text-gray-600'
									/>
								)}
							</div>
						</div>
					</div>

					{/* <span className='text-tertiary'>Be</span>located */}
					<div style={{ borderBottomRightRadius: "50px" }} className="relative">
  <div className="flex items-center">
    {/* Welcome Tag */}
    <div
      style={{ backgroundColor: "rgb(71, 71, 209)" }}
      className="text-white font-bold py-2 px-4 pt-2 text-[13px] sm:text-[12px] flex items-center gap-2"
    >
      <FaAngleLeft style={{ color: "white" }} />
      Welcome, {user?.fullname ? user?.fullname : user?.username}
    </div>
  </div>
  {/* Username */}
  <div
    style={{ padding: "0px 20px 30px 20px" }}
    className="text-black-500 text-[12px] sm:text-[24px] font-medium"
  >
    @{user?.username}
  </div>
</div>


					{/* <form className='hidden md:flex'>
						<input
							type='text'
							placeholder='Search Tasks'
							className='w-[300px] px-5 py-2 border border-gray-200 rounded-2xl text-lg'
						/>
					</form> */}
				</div>

				<div className='hidden  z-10 mr-5 items-center justify-center gap-4 font-medium text-lg text-gray-600 md:flex'>
					<button
						className='flex items-center gap-3'
						aria-controls={open ? 'basic-menu' : undefined}
						aria-haspopup='true'
						aria-expanded={open ? 'true' : undefined}
						onClick={handleClick}>
						<div className='flex items-center gap-2'>
							<FaUserCircle />
							<span className=''>{user?.username}</span>
						</div>

						<FaAngleDown />
					</button>

					<Menu
						id='basic-menu'
						anchorEl={anchorEl}
						open={open}
						onClose={handleClose}
						MenuListProps={{
							'aria-labelledby': 'basic-button',
						}}>
						<MenuItem onClick={handleClose}>Profile</MenuItem>
						<MenuItem onClick={handleClose}>My account</MenuItem>
						<MenuItem onClick={handleClose}>
							<Logout />
						</MenuItem>
					</Menu>

					{/* {suspendAccount ? '' : <NavLink to='/dashboard/earn'>Earn</NavLink>}
					<NavLink to='/dashboard/advertise'>Advertise</NavLink>
					<NavLink to='/terms'>Terms</NavLink>
					<NavLink to='/contact'>Contact</NavLink>
					<Logout /> */}
				</div>

				{mobileMenuOpen && (
					<div className='absolute z-10 w-full right-0 left-0 shadow-xl top-[4rem] py-[5rem] p-[1.5rem] bg-primary rounded-sm'>
						{/* Mobile Dropdown Menu for ordinary Users */}
						<>
							{user?.accountType === 'User' && (
								<div
									onClick={() => handleCloseMenu()}
									className='flex flex-col h-[200px] justify-center items-center gap-[1rem] font-extrabold text-gray-700'>
									<Link href='/'>Home</Link>
									{suspendAccount ? (
										''
									) : (
										<Link href='/dashboard/earn'>Earn</Link>
									)}
									<Link href='/dashboard/advertise'>Advertise</Link>
									<Link href='/terms'>Terms</Link>
									<ShowOnLogin>
										<Link href={'/dashboard/settings/edit-profile'}>
											Settings
										</Link>
										<Link
											href={`/dashboard`}
											className='text-gray-800 cursor-pointer'>
											Dashboard
										</Link>
									</ShowOnLogin>
									<ShowOnLogin>
										<Logout />
									</ShowOnLogin>
								</div>
							)}
						</>

						{/* Mobile Dropdown Menu for Admins */}
						<>
							{user?.accountType === 'Admin' && (
								<div
									onClick={() => handleCloseMenu()}
									className='flex flex-col h-[200px] justify-center items-center gap-[1rem] font-extrabold text-gray-700'>
									<Link href='/'>Home</Link>
									<Link href='/terms'>Terms</Link>
									<ShowOnLogin>
										<Link
											href={`/admin/dashboard/transactions/${user?.username}`}>
											Transactions
										</Link>
										<Link
											href={`/admin/dashboard/withdrawals/${user?.username}`}>
											Withdrawals
										</Link>
										<Link href={'/dashboard/update-profile'}>Settings</Link>
										<Link href={`/dashboard/referral`}>Refferal Challenge</Link>
										<Link
											href={`/dashboard/${user?.username}`}
											className='text-gray-800 cursor-pointer'>
											User Dashboard
										</Link>
									</ShowOnLogin>
									<ShowOnLogin>
										<Logout />
									</ShowOnLogin>
								</div>
							)}
						</>
					</div>
				)}
			</div>
		</header>

		//     <header className='w-full border-b border-gray-200'>
		//    <div className='mx-auto px-2 md:px-2'>
		//       <div className='py-6 flex justify-between items-center'>

		//          {/* Left section with logo and user information */}
		//          <div className='cursor-pointer text-secondary'>
		//             <div className='flex flex-col justify-start md:hidden'>
		//                <div className='flex items-center gap-1'>
		//                   <h1 className='text-lg text-gray-600 font-bold'>Welcome, </h1>
		//                   <h4 className='text-lg text-gray-600 font-medium'>{user?.fullname ? user?.fullname : user?.username}</h4>
		//                </div>
		//                <p className='text-gray-500 font-light text-sm'>@{user?.username}</p>
		//             </div>

		//             <form className='hidden md:flex'>
		//                <input type="text" placeholder="Search Tasks" className='w-[300px] px-5 py-2 border border-gray-200 rounded-2xl text-lg'/>
		//             </form>
		//          </div>

		//          {/* Center section with navigation links */}
		//          <div className='hidden nav__items gap-4 font-medium text-lg text-gray-600 md:flex'>
		//             <NavLink to={`/dashboard/${user?.username}`}>Home</NavLink>
		//             <NavLink to='/dashboard/earn'>Earn</NavLink>
		//             <NavLink to='/dashboard/advertise'>Advertise</NavLink>
		//             <NavLink to='/terms'>Terms</NavLink>
		//             <NavLink to='/contact'>Contact</NavLink>
		//             <div className='flex items-center bg-tertiary text-gray-100 text-[15px] px-4 py-1 rounded-full cursor-pointer hover:bg-secondary'>
		//                <Logout />
		//             </div>
		//          </div>

		//          {/* Right section with mobile menu toggle */}
		//          <div className='relative md:hidden'>
		//             <div>
		//                {mobileMenuOpen && <MdOutlineCancel onClick={() => setMobileMenuOpen(!mobileMenuOpen)} size={30} className='text-gray-600' />}
		//                {!mobileMenuOpen && <MdMenu onClick={() => setMobileMenuOpen(!mobileMenuOpen)} size={30} className='text-gray-600' />}
		//             </div>
		//          </div>

		//          {/* Mobile menu */}
		//          {mobileMenuOpen && (
		//             <div className='absolute w-full right-0 left-0 shadow-xl top-[6rem] py-[5rem] p-[1.5rem] bg-primary rounded-sm'>
		//                <div onClick={() => handleCloseMenu()} className='flex flex-col h-[200px] justify-center items-center gap-[1rem] font-extrabold text-gray-700'>
		//                   {/* Mobile navigation links */}
		//                   <Link to="/">Home</Link>
		//                   <Link to="/dashboard/earn">Earn</Link>
		//                   <Link to="/dashboard/advertise">Advertise</Link>
		//                   <Link to='/terms'>Terms</Link>
		//                   <ShowOnLogin>
		//                      <Link to={`dashboard/account-settings/${user?.username}`}>Settings</Link>
		//                      <Link to={`/dashboard/${user?.username}`} className='text-gray-800 cursor-pointer'>Dashboard</Link>
		//                   </ShowOnLogin>
		//                   <ShowOnLogin>
		//                      <Logout />
		//                   </ShowOnLogin>
		//                </div>
		//             </div>
		//          )}
		//       </div>
		//    </div>
		// </header>
	)
}

export default Header
