import axios from 'axios'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ConfirmPassword from '../../(auth)/ConfirmPassword'
import EmailVerified from '../../(auth)/EmailVerified'
import Logout from '../../(auth)/Logout'
import RefChaRegister from '../../(auth)/RefChaRegister'
import RefRegister from '../../(auth)/RefRegister'
import RetrievePassword from '../../(auth)/RetrievePassword'
import VerifyEmail from '../../(auth)/VerifyEmail'
import VerifyOTP from '../../(auth)/VerifyOTP'
import AuthLayout from '../../(auth)/layout'
import Login from '../../(auth)/login'
import MainLayout from '../app/MainLayout'
import Contact from '../app/contact/page'
import SidebarLeft from '../app/dashboard/SidebarLeft'
import SidebarRight from '../app/dashboard/SidebarRight'
import Advertise from '../app/dashboard/advertise/page'
import ContactSupport from '../app/dashboard/contact-support/page'
import Earn from '../app/dashboard/earn/page'
import DashLayout from '../app/dashboard/layout'
import Dashboard from '../app/dashboard/page'
import Referral from '../app/dashboard/referral/page'
import TaskEarn from '../pages/dashboard/taskearn/[platformName]/[platformName]'
import TaskList from '../app/dashboard/tasks/page'
import AdBuy from '../app/dashboard/userPages/AdBuy'
import KnowledgeBase from '../app/dashboard/userPages/KnowledgeBase'
import PasswordChangeOTP from '../app/dashboard/userPages/PasswordChangeOTP'
import PasswordUpdate from '../app/dashboard/userPages/PasswordUpdate'
import Profile from '../app/dashboard/userPages/Profile'
import RefBonus from '../app/dashboard/userPages/RefBonus'
import RefChallenge from '../app/dashboard/userPages/RefChallenge'
import UpdateProfile from '../app/dashboard/userPages/UpdateProfile'
import ChangePassword from '../app/dashboard/userPages/settings/ChangePassword'
import ForgotPasswordChange from '../app/dashboard/userPages/settings/ForgotPasswordChange'
import PasswordChangeSuccess from '../app/dashboard/userPages/settings/PasswordChangeSuccess'
import PasswordVerify from '../app/dashboard/userPages/settings/PasswordVerify'
import TransHistory from '../app/dashboard/wallet/page'
import Error404Page from '../app/error'
import KycLayout from '../app/kyc/page'
import ServicesPage from '../app/services/page'
import { SET_LOGIN, selectUser } from '../redux/slices/authSlice'
import { getLoginStatus } from '../services/authServices'
import { Home } from './App'
import WithdrawalModal from './adminComponents/WithdrawalModal'
import AccountSettings from './adminPages/AccountSettings'
import AdminDashboard from './adminPages/AdminDashboard'
import AdsTasksList from './adminPages/AdsTasksList'
import AdvertSingle from './adminPages/AdvertSingle'
import AdvertSingleUser from './adminPages/AdvertSingleUser'
import Adverts from './adminPages/Adverts'
import RefChallengeAdmin from './adminPages/RefChallengeAdmin'
import Supportmessages from './adminPages/Supportmessages'
import TaskSingle from './adminPages/TaskSingle'
import Tasks from './adminPages/Tasks'
import TasksSingleUser from './adminPages/TasksSingleUser'
import Transactions from './adminPages/Transactions'
import TransactionsSingleUser from './adminPages/TransactionsSingleUser'
import UserSingle from './adminPages/UserSingle'
import Users from './adminPages/Users'
import WithdrawalRequests from './adminPages/WithdrawalRequests'
import About from './app/About'
import FAQ from './app/FAQ'
import CampaignStats from './app/dashboard/userPages/CampaignStats'
import TaskSubmit from './app/dashboard/userPages/TaskSubmit'

axios.defaults.withCredentials = true

function App() {
	const dispatch = useDispatch()
	const user = useSelector(selectUser)
	const [regBtn, setRegBtn] = useState(false)
	const [loginBtn, setLoginBtn] = useState(false)
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
	const [profile, setProfile] = useState(null)
	const [isLoggedin, setIsLoggedIn] = useState(false)

	useEffect(() => {
		const setLoginStatus = async () => {
			const status = await getLoginStatus()
			dispatch(SET_LOGIN(status))
		}
		setLoginStatus()
	}, [dispatch])

	const handleRegister = (e) => {
		e.preventDefault()
		setRegBtn(!regBtn)
	}

	const handleLogin = (e) => {
		e.preventDefault()
		setLoginBtn(!loginBtn)
	}

	const handleCloseMenu = () => {
		setMobileMenuOpen(!mobileMenuOpen)
	}

	return (
		<BrowserRouter>
			<Routes>
				<Route
					path='/success'
					element={
						<PasswordChangeSuccess
							handleLogin={handleLogin}
							handleRegister={handleRegister}
							loginBtn={loginBtn}
							regBtn={regBtn}
							handleCloseMenu={handleCloseMenu}
						/>
					}
				/>

				{/* Referral Programme Reg Page */}
				<Route path='/register/ref/:refusername' element={<RefRegister />} />

				{/* Referral Programme Reg Page */}
				<Route path='/ref-cha/:refusername' element={<RefChaRegister />} />

				<Route
					path='/'
					element={
						<MainLayout handleRegister={handleRegister} regBtn={regBtn} />
					}>
					<Route
						index
						element={
							<Home
								handleLogin={handleLogin}
								handleRegister={handleRegister}
								loginBtn={loginBtn}
								regBtn={regBtn}
								handleCloseMenu={handleCloseMenu}
							/>
						}
					/>
					{/* <Route index element={<Maintainance />}/> */}
					<Route
						path='/about'
						element={<About handleRegister={handleRegister} regBtn={regBtn} />}
					/>
					<Route path='/contact' element={<Contact />} />
					<Route path='/services' element={<ServicesPage />} />
					<Route path='/faq' element={<FAQ />} />
					<Route path='/*' element={<Error404Page />} />
					<Route path='/retrieve-pass' element={<RetrievePassword />} />
					<Route path='/verify-phone' element={<VerifyOTP />} />
					<Route path='/verify-email' element={<VerifyEmail />} />
					<Route path='/verified' element={<EmailVerified />} />

					<Route path='/password-verify' element={<PasswordVerify />} />
				</Route>

				<Route path='/' element={<AuthLayout />}>
					{/* <Route path="/register/ref/:refusername" element={<RefRegister />}/> */}
					<Route path='/login' element={<Login />} />
					<Route path='/logout' element={<Logout />} />
					<Route path='/confirm-pass' element={<ConfirmPassword />} />
					<Route path='/password-change/:id' element={<ChangePassword />} />
					<Route
						path='/forgot-password-change/:id'
						element={<ForgotPasswordChange />}
					/>
				</Route>

				<Route path='/logout' element={<Logout />} />
				<Route path='/*' element={<Error404Page />} />

				{/* Dashboard home route */}
				<Route
					path='/dashboard/:username'
					element={
						<SidebarLeft>
							<DashLayout>
								<Dashboard />
								{/* <SidebarRight /> */}
							</DashLayout>
						</SidebarLeft>
					}
				/>

				{/* Dashboard Earn Route */}
				<Route
					path='/dashboard/earn'
					element={
						<SidebarLeft>
							<DashLayout>
								<Earn />
								<SidebarRight />
							</DashLayout>
						</SidebarLeft>
					}
				/>

				{/* Dashboard Task Earn route */}
				<Route
					path='/dashboard/taskearn/:platformName'
					element={
						<SidebarLeft>
							<DashLayout>
								<TaskEarn />
								<SidebarRight />
							</DashLayout>
						</SidebarLeft>
					}
				/>

				{/* Dashboard Task Earn Perform route */}
				<Route
					path='/dashboard/submittask/:taskId'
					element={
						<SidebarLeft>
							<DashLayout>
								<TaskSubmit />
								<SidebarRight />
							</DashLayout>
						</SidebarLeft>
					}
				/>

				{/* Dashboard Tasks List */}
				<Route
					path='/dashboard/tasks'
					element={
						<SidebarLeft>
							<DashLayout>
								<TaskList />
								<SidebarRight />
							</DashLayout>
						</SidebarLeft>
					}
				/>

				{/* Advertise Route */}
				<Route
					path='/dashboard/advertise'
					element={
						<SidebarLeft>
							<DashLayout>
								<Advertise />
								<SidebarRight />
							</DashLayout>
						</SidebarLeft>
					}
				/>

				{/* Dashboard Ad buy route */}
				<Route
					path='/dashboard/adbuy/:platformName'
					element={
						<SidebarLeft>
							<DashLayout>
								<AdBuy />
								<SidebarRight />
							</DashLayout>
						</SidebarLeft>
					}
				/>

				{/* Dashboard Ad buy Stats Route */}
				<Route
					path='/dashboard/campaign-stats'
					element={
						<SidebarLeft>
							<DashLayout>
								<CampaignStats />
								<SidebarRight />
							</DashLayout>
						</SidebarLeft>
					}
				/>

				{/* Transaction History Route */}
				<Route
					path='/dashboard/transactions'
					element={
						<SidebarLeft>
							<DashLayout>
								<TransHistory />
								<SidebarRight />
							</DashLayout>
						</SidebarLeft>
					}
				/>

				{/* Profile Route */}
				<Route
					path='/dashboard/profile/'
					element={
						<SidebarLeft>
							<DashLayout>
								<Profile />
								<SidebarRight />
							</DashLayout>
						</SidebarLeft>
					}
				/>

				{/* Location Route */}
				<Route
					path='/dashboard/update-profile/'
					element={
						<SidebarLeft>
							<DashLayout>
								<UpdateProfile />
								<SidebarRight />
							</DashLayout>
						</SidebarLeft>
					}
				/>

				<Route
					path='/kyc'
					element={
						<KycLayout>
							{/* <UpdateProfile /> */}
							{/* <SidebarRight /> */}
						</KycLayout>
					}
				/>

				{/* Password Route */}
				<Route
					path='/dashboard/account-settings/:username'
					element={
						<SidebarLeft>
							<DashLayout>
								<PasswordUpdate />
								<SidebarRight />
							</DashLayout>
						</SidebarLeft>
					}
				/>

				{/* Password OTP Password Route */}
				<Route
					path='/dashboard/password-verify'
					element={
						<SidebarLeft>
							<DashLayout>
								<PasswordChangeOTP />
								<SidebarRight />
							</DashLayout>
						</SidebarLeft>
					}
				/>

				{/* Password Change Route */}
				<Route
					path='/dashboard/password-change'
					element={
						<SidebarLeft>
							<DashLayout>
								<ChangePassword />
								<SidebarRight />
							</DashLayout>
						</SidebarLeft>
					}
				/>

				{/* Contact Route */}
				<Route
					path='/dashboard/contact-support'
					element={
						<SidebarLeft>
							<DashLayout>
								<ContactSupport />
							</DashLayout>
						</SidebarLeft>
					}
				/>

				{/* Ref Challenge */}
				<Route
					path='/dashboard/ref-cha/:username'
					element={
						<SidebarLeft>
							<DashLayout>
								<RefChallenge />
								{/* <SidebarRight /> */}
							</DashLayout>
						</SidebarLeft>
					}
				/>
				<Route
					path='/dashboard/referral'
					element={
						<SidebarLeft>
							<DashLayout>
								<Referral />
								{/* <SidebarRight /> */}
							</DashLayout>
						</SidebarLeft>
					}
				/>

				{/* Ref Bonus */}
				<Route
					path='/dashboard/ref-bonus/:username'
					element={
						<SidebarLeft>
							<DashLayout>
								<RefBonus />
								<SidebarRight />
							</DashLayout>
						</SidebarLeft>
					}
				/>

				{/* Contact Route */}
				<Route
					path='/how-it-works'
					element={
						<SidebarLeft>
							<DashLayout>
								<KnowledgeBase />
								<SidebarRight />
							</DashLayout>
						</SidebarLeft>
					}
				/>

				{/* ************************************************************************************************************* */}

				{/* Admin Routes Starts Here */}

				{/* Admin Dashboard*/}
				<Route
					path='/admin/dashboard/:username'
					element={
						<SidebarLeft>
							<DashLayout>
								<AdminDashboard />
							</DashLayout>
						</SidebarLeft>
					}
				/>

				{/* Admin Users*/}
				<Route
					path='/admin/dashboard/users/:username'
					element={
						<SidebarLeft>
							<DashLayout>
								<Users />
							</DashLayout>
						</SidebarLeft>
					}
				/>

				{/* Admin Users Single*/}
				<Route
					path='/admin/dashboard/user/:id'
					element={
						<SidebarLeft>
							<DashLayout>
								<UserSingle />
							</DashLayout>
						</SidebarLeft>
					}
				/>

				{/* Admin Adverts*/}
				<Route
					path='/admin/dashboard/adverts/:username'
					element={
						<SidebarLeft>
							<DashLayout>
								<Adverts />
							</DashLayout>
						</SidebarLeft>
					}
				/>

				{/* Admin Adverts Single*/}
				<Route
					path='/admin/dashboard/advert/:id'
					element={
						<SidebarLeft>
							<DashLayout>
								<AdvertSingle />
								<SidebarRight />
							</DashLayout>
						</SidebarLeft>
					}
				/>

				{/* Admin single advert tasks list*/}
				<Route
					path='/admin/dashboard/advert/tasks/:id'
					element={
						<SidebarLeft>
							<DashLayout>
								<AdsTasksList />
							</DashLayout>
						</SidebarLeft>
					}
				/>

				{/* Admin Adverts Single User*/}
				<Route
					path='/admin/dashboard/adverts/user/:userId'
					element={
						<SidebarLeft>
							<DashLayout>
								<AdvertSingleUser />
							</DashLayout>
						</SidebarLeft>
					}
				/>

				{/* Admin Tasks*/}
				<Route
					path='/admin/dashboard/tasks/:username'
					element={
						<SidebarLeft>
							<DashLayout>
								<Tasks />
							</DashLayout>
						</SidebarLeft>
					}
				/>

				{/* Admin Tasks Single*/}
				<Route
					path='/admin/dashboard/task/:id'
					element={
						<SidebarLeft>
							<DashLayout>
								<TaskSingle />
							</DashLayout>
						</SidebarLeft>
					}
				/>

				{/* Admin Tasks Single User*/}
				<Route
					path='/admin/dashboard/tasks/user/:userId'
					element={
						<SidebarLeft>
							<DashLayout>
								<TasksSingleUser />
							</DashLayout>
						</SidebarLeft>
					}
				/>

				{/* Admin Transactions*/}
				<Route
					path='/admin/dashboard/transactions/:username'
					element={
						<SidebarLeft>
							<DashLayout>
								<Transactions />
							</DashLayout>
						</SidebarLeft>
					}
				/>

				{/* Admin transactions Single*/}
				<Route
					path='/admin/dashboard/adverts/:id'
					element={
						<SidebarLeft>
							<DashLayout>
								<AdvertSingle />
							</DashLayout>
						</SidebarLeft>
					}
				/>

				{/* Admin Transactions Single User*/}
				<Route
					path='/admin/dashboard/transactions/user/:userId'
					element={
						<SidebarLeft>
							<DashLayout>
								<TransactionsSingleUser />
							</DashLayout>
						</SidebarLeft>
					}
				/>

				{/* Admin Withdrawal Request List*/}
				<Route
					path='/admin/dashboard/withdrawals/:username'
					element={
						<SidebarLeft>
							<DashLayout>
								<WithdrawalRequests />
							</DashLayout>
						</SidebarLeft>
					}
				/>

				{/* Admin Withdrawal Request List*/}
				<Route
					path='/admin/dashboard/withdrawals/confirm/:withdrawalRequestId'
					element={
						<SidebarLeft>
							<DashLayout>
								<WithdrawalModal />
							</DashLayout>
						</SidebarLeft>
					}
				/>

				{/* Admin Support messages*/}
				<Route
					path='/admin/dashboard/support-messages/:username'
					element={
						<SidebarLeft>
							<DashLayout>
								<Supportmessages />
							</DashLayout>
						</SidebarLeft>
					}
				/>

				{/* Admin Support messages*/}
				<Route
					path='/admin/dashboard/account-settings/:username'
					element={
						<SidebarLeft>
							<DashLayout>
								<AccountSettings />
							</DashLayout>
						</SidebarLeft>
					}
				/>

				{/* Admin Support messages*/}
				<Route
					path='/admin/dashboard/ref-challenge/:username'
					element={
						<SidebarLeft>
							<DashLayout>
								<RefChallengeAdmin />
							</DashLayout>
						</SidebarLeft>
					}
				/>
			</Routes>
		</BrowserRouter>
	)
}

export default App
