import { useRouter } from 'next/navigation'
import { ReactNode, useEffect, useState } from 'react'
import { BiMenuAltRight } from 'react-icons/bi'
import { FaAdversal, FaHome, FaTasks, FaTrophy, FaUsers } from 'react-icons/fa'
import { GrSettingsOption, GrTransaction } from 'react-icons/gr'
import { IoTrophyOutline } from 'react-icons/io5'
import { MdOutlineSupportAgent } from 'react-icons/md'
import { RiHome5Fill, RiMoneyDollarBoxFill } from 'react-icons/ri'
import { SiGoogleads, SiTodoist } from 'react-icons/si'
import { useDispatch, useSelector } from 'react-redux'
import { SET_USER, selectUser } from '../../redux/slices/authSlice'
import { getUser } from '../../services/authServices'
import SidebarItems from './SidebarItems'

const SidebarLeft = ({ children }: { children: ReactNode }) => {
	const router = useRouter()
	const dispatch = useDispatch()
	const user = useSelector(selectUser)
	const [isOpen, setIsOpen] = useState(true)
	const toggleSidebar = () => setIsOpen(!isOpen)

	async function getUserData() {
		if (!user?.email) {
			const data = await getUser()
			await dispatch(SET_USER(data))
		}
	}

	useEffect(() => {
		getUserData()
	}, [dispatch])

	const menu = [
		{
			title: 'Dashboard',
			icon: <RiHome5Fill className='md:mr-2 text-[15px] md:text-[24px]' />,
			path: `/dashboard`,
		},
		{
			title: 'My Campaigns',
			icon: <SiGoogleads className='md:mr-2 text-[15px] md:text-[24px]' />,
			path: '/dashboard/campaign-stats',
		},
		{
			title: 'My Ongoing Tasks',
			icon: <SiTodoist className='text-[15px] md:text-[24px] md:mr-2 ' />,
			path: `/dashboard/tasks`,
		},
		{
			title: 'Wallet',
			icon: (
				<RiMoneyDollarBoxFill className='text-[15px] md:text-[28px] md:mr-2 ' />
			),
			path: '/dashboard/wallet',
		},

		{
			title: 'Referral',
			icon: <FaTrophy className='md:mr-2 text-[15px] md:text-[30px]' />,
			path: `/dashboard/referral`,
		},
		{
			title: 'Contact Support',
			icon: (
				<MdOutlineSupportAgent className='md:mr-2 text-[15px] md:text-[30px]' />
			),
			path: '/dashboard/contact-support',
		},
	]

	const adminMenu = [
		{
			title: 'Dashboard',
			icon: <FaHome className='md:mr-2 text-[15px] md:text-[30px]' />,
			path: `/admin/dashboard`,
		},
		{
			title: 'All Users',
			icon: <FaUsers className='md:mr-2 text-[15px] md:text-[30px]' />,
			path: `/admin/dashboard/users/${user?.username}`,
		},
		{
			title: 'All Adverts',
			icon: <FaAdversal className='md:mr-2 text-[15px] md:text-[30px]' />,
			path: `/admin/dashboard/adverts`,
		},
		{
			title: 'All Tasks',
			icon: <FaTasks className='md:mr-2 text-[15px] md:text-[30px]' />,
			path: `/admin/dashboard/tasks`,
		},
		{
			title: 'All Transactions',
			icon: <GrTransaction className='md:mr-2 text-[15px] md:text-[30px]' />,
			path: `/admin/dashboard/transactions`,
		},
		{
			title: 'All Withdrawals',
			icon: <GrTransaction className='md:mr-2 text-[15px] md:text-[30px]' />,
			path: `/admin/dashboard/withdrawals/${user?.username}`,
		},
		{
			title: 'Account Settings',
			icon: <GrSettingsOption className='md:mr-2 text-[15px] md:text-[30px]' />,
			path: `/admin/dashboard/account-settings/${user?.username}`,
		},
		// {
		//   title: "Support Messages",
		//   icon: <BiMessageRoundedDetail className='md:mr-2 text-[15px] md:text-[30px]'/>,
		//   path: `/admin/dashboard/support-messages/${user?.username}`,
		// },
		{
			title: 'Referral Challenge',
			icon: <IoTrophyOutline className='md:mr-2 text-[15px] md:text-[30px]' />,
			path: `/admin/dashboard/ref-challenge/${user?.username}`,
		},
	]

	return (
		<div className=''>
			{/* Desktop Sidbar menu */}
			<div
				className={`hidden fixed top-0  left-0 w-[230px] h-screen shrink-0 border border-right border-gray-200 overflow-auto md:flex md:flex-col`}
				style={{ width: isOpen ? '230px' : '60px' }}>
				<div className='top_section flex justify-between items-center w-full py-6 px-3 text-[20px]  bg-tertiary_bg'>
					<h3
						className='text-[18px]'
						style={{ display: isOpen ? 'block' : 'none' }}
						onClick={() => router.push('/')}>
						<FaHome
							className='border border-btn rounded-full text-btn p-2 cursor-pointer'
							size={35}
						/>
					</h3>

					<div className='' style={{ marginLeft: isOpen ? '100px' : '0px' }}>
						<FaHome
							onClick={() => router.push('/')}
							className='flex border border-btn rounded-full text-btn p-2 cursor-pointer md:hidden'
							size={35}
						/>
						<BiMenuAltRight
							className='hidden text-btn cursor-pointer md:flex'
							onClick={toggleSidebar}
						/>
					</div>
				</div>

				{/* {sidebarAccountType} */}
				<div className='mt-10'>
					{user?.accountType === 'User' && (
						<>
							{menu.map((item, index) => {
								return <SidebarItems key={index} item={item} isOpen={isOpen} />
							})}
						</>
					)}
				</div>

				{(user?.accountType === 'Admin' ||
					user?.accountType === 'Super Admin') && (
					<>
						{adminMenu.map((item, index) => {
							return <SidebarItems key={index} item={item} isOpen={isOpen} />
						})}
					</>
				)}
			</div>

			<main
				className={`w-full transition-all duration-500 ${
					isOpen ? 'md:pl-[230px]' : 'md:pl-[60px]'
				}`}>
				{children}
			</main>

			{/* Mobile footer menu */}
			<div className='flex sticky bottom-0 w-full md:hidden bg-white p-3 h-fit shrink-0 border border-top border-gray-200 overflow-scroll justify-center mt-[1rem]'>
				<div className='flex'>
					{user?.accountType === 'User' && (
						<>
							{menu.map((item, index) => {
								return (
									<SidebarItems
										isMobile
										key={index}
										item={item}
										isOpen={isOpen}
									/>
								)
							})}
						</>
					)}
				</div>

				{user?.accountType === 'Admin' && (
					<div className='flex gap-0'>
						<>
							{adminMenu.slice(0, -3).map((item, index) => {
								return (
									<SidebarItems
										// className=''
										key={index}
										item={item}
										isOpen={isOpen}
									/>
								)
							})}
						</>
					</div>
				)}
			</div>
		</div>
	)
}

export default SidebarLeft