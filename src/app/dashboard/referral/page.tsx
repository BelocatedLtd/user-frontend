'use client'

import ReferralsTable from '@/components/dashboard/referralTable'
import Loader from '@/components/loader/Loader'
import { SET_LOGOUT, SET_USER, selectUser } from '@/redux/slices/authSlice'
import {
	handleGetAllReferrals,
	selectAllReferrals,
} from '@/redux/slices/referrals'
import { getUser, sendInviteEmail } from '@/services/authServices'
import { getOngoingRefChallenge } from '@/services/refService'
import { getRefDashboardData, withdrawReferralEarnings } from '@/services/referrals'
import { handleRefLinkCopy } from '@/utils'
import { toNaira } from '@/utils/payment'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import { useRouter } from 'next/navigation'
import { Suspense, useEffect, useRef, useState } from 'react'
import toast from 'react-hot-toast'
import { FaCheckCircle, FaUserPlus } from 'react-icons/fa'
import { IoIosSend } from 'react-icons/io'
import { MdMessage } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'
import * as Yup from 'yup'

interface FormValues {
	email: string
}

const Referral = () => {
	const dispatch = useDispatch()
	const user = useSelector(selectUser)

	const referrals = useSelector(selectAllReferrals)

	const router = useRouter()
	const inputRef = useRef(null)
	const [challenge, setChallenge] = useState()
	const [contestant, setContestant] = useState()
	const [rankedContestants, setRankedContestants] = useState([])
	const [refLink, setRefLink] = useState('')
	const [daysRemaining, setDaysRemaining] = useState()
	const [isWithdrawing, setIsWithdrawing] = useState(false);
	

	const [dashboardData, setDasboardData] = useState<{
		totalPoints: string
		totalEarning: string
		referredUsers: string
		challengesWon: string
	}>()

	useEffect(() => {
		async function getUserData() {
			const data = await getUser()
			const Referral = await getOngoingRefChallenge()

			const dashData = await getRefDashboardData()
			setDasboardData(dashData)

			if (!data || data === undefined) {
				// toast.error('Unable to retrieve user data, session will be terminated')
				dispatch(SET_LOGOUT())
				router.push('/')
				return
			}

			setChallenge(Referral)
			//  setContestants(challenge?.referralChallengeContestants)

			dispatch(SET_USER(data))
		}
		getUserData()

		dispatch(handleGetAllReferrals() as any)

		const frontEndUrl =
			typeof window !== 'undefined' && window.location.hostname

		setRefLink(`https://${frontEndUrl}/ref-cha/${user?.username}`)
	}, [dispatch])

	const CurlyArrow = () => (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 100 24'
			fill='none'
			stroke='currentColor'
			className='text-secondary w-6 h-6 mx-3'>
			<path d='M0,12 Q25,0 50,12 T100,12' strokeWidth='3' fill='none' />
		</svg>
	)

	const initialValues: FormValues = {
		email: '',
	}

	const validationSchema = Yup.object().shape({
		email: Yup.string().email().required('Email is required'),
	})

	const [isLoading, setIsLoading] = useState(false)

	const handleSubmit = async (values: FormValues) => {
		console.log('🚀 ~ Referral ~ values:', values)
		try {
			setIsLoading(true)
			const response = await sendInviteEmail(values.email)
			if (response) {
				toast.success(`Invitation sent to user: ${values.email}`)
				dispatch(handleGetAllReferrals() as any)
			}
			setIsLoading(false)
		} catch (error) {
			setIsLoading(false)
			console.log(error)
		}
	}

	const handleWithdraw = async () => {
		setIsWithdrawing(true);
		try {
		  const response = await withdrawReferralEarnings();// Adjust URL as needed
		  if (response) {
			// Update wallet balance and reset totalEarning to zero after withdrawal
			
			toast.success("Widthdrawal Successful"); // Display success message
		  }
		  setIsWithdrawing(false);
		} catch (error) {
			if (error instanceof Error) {
			  alert(error.message || 'An error occurred during withdrawal');
			} else {
			  console.error('Unexpected error:', error);
			  alert('An unexpected error occurred');
			}
		  } finally {
			setIsWithdrawing(false);
		  }
		}
	const frontEndUrl = typeof window !== 'undefined' && window.location.hostname

	return (
		<Suspense>
			<div className='w-full lg:mr-5 min-h-screen pb-20'>
				<Loader open={isLoading} />

				<h2 className='mt-1 mb-10 font-semibold text-xl text-gray-700'>
					Referrals
				</h2>
				<div className='md:grid md:grid-cols-2 gap-8'>
					<div className='border w-full px-4 md:px-8 py-4 space-y-4 rounded-lg border-gray-200'>
						<div>
							<p>Earn with Belocated</p>
							<p className='text-xs mt-1 text-gray-400'>
								Invite friends to join Belocated
							</p>
						</div>

						<div className='flex items-center justify-evenly'>
							<div className='flex items-center'>
								<MdMessage className='text-secondary' />
								<span className='ml-3'>Send Invitation</span>
							</div>
							<CurlyArrow />
							<div className='flex items-center'>
								<FaUserPlus className='text-secondary' />
								<span className='ml-3'>Registration</span>
							</div>
							<CurlyArrow />
							<div className='flex items-center'>
								<FaCheckCircle className='text-secondary' />
								<span className='ml-3'>Use Belocated for free!</span>
							</div>
						</div>
					</div>
					<div className="border border-yellow-500 p-4" style={{ marginTop: '20px', fontSize: '14px', color: '#555' }}>
						<h4><b>Referral Points System:</b></h4>
						<ul style={{ listStyleType: 'none', paddingLeft: '0' }}>
							<li>1 successful referral = 10 points</li>
							<li>10 points = ₦100</li>
							<li>The Withdrawal Button will be active when you have <b>100 points = ₦1,000 and above</b></li>
						</ul>
					</div>

					<div className='border w-full row-span-2 px-8 py-4 space-y-4 rounded-lg border-gray-200'>
						<div className=' gap-4'>
							<div>
								<p>Invite your friends </p>
								<p className='text-xs text-gray-400'>
									Add your friend’s email address and send them invitations to
									join!
								</p>
							</div>
							<div>
								<Formik
									initialValues={initialValues}
									validationSchema={validationSchema}
									onSubmit={handleSubmit}>
									{() => (
										<Form>
											<Field name='email'>
												{({ field }: any) => (
													<>
														<div className='border mt-10 h-14 rounded-full  pr-3 flex items-center'>
															<input
																{...field}
																className=' w-full h-full rounded-l-full pl-6'
																placeholder='Email Address'
															/>

															<button
																type='submit'
																className='bg-secondary cursor-pointer text-white text-xl rounded-full h-10 w-10 flex items-center justify-center ml-3'>
																<IoIosSend className='' />
															</button>
														</div>
														<ErrorMessage
															name='email'
															component='div'
															className='text-red-500'
														/>
													</>
												)}
											</Field>
										</Form>
									)}
								</Formik>
							</div>
							<div className='mt-20'>
								<div className='mt-20'>
									<p>Share referral link </p>
									<p className='text-xs text-gray-400'>
										Your can also share your referral link by copying it and
										sending it to your friends or sharing on social media
									</p>
								</div>
								<div className='rounded-full mt-6 bg-primary-light flex items-center justify-between px-8 py-4'>
									<p>{`https://${frontEndUrl}?ref=${user?.username}`}</p>
									<button
										onClick={() =>
											handleRefLinkCopy(
												`https://${frontEndUrl}?ref=${user?.username}`,
											)
										}
										className='text-secondary'>
										copy link
									</button>
								</div>
							</div>
						</div>
					</div>

					<div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
						<div className='border w-full flex-row justify-between px-8 py-4 space-y-4 rounded-lg border-gray-200'>
							<p className='text-xs text-secondary'>Total Earnings</p>
							<strong className='flex justify-self-end'>
								{toNaira(dashboardData?.totalEarning ?? 0)}
							</strong>
						</div>
						<div className='border w-full flex-row justify-between px-8 py-4 space-y-4 rounded-lg border-gray-200'>
							<p className='text-xs text-secondary'>Total points</p>
							<strong className='flex justify-self-end'>
								{dashboardData?.totalPoints ?? 0}
							</strong>
						</div>
						<div className='border w-full flex-row justify-between px-8 py-4 space-y-4 rounded-lg border-gray-200'>
							<p className='text-xs text-secondary'>Referred users</p>
							<strong className='flex justify-self-end'>
								{dashboardData?.referredUsers ?? 0}
							</strong>
						</div>
						<div className="border p-6 border-gray-200 rounded-lg mt-4">
							<h3 className="mb-4">Withdraw Referral Earnings</h3>
							<button
  onClick={handleWithdraw}
  disabled={parseFloat(dashboardData?.totalEarning ?? '0') < 1000 || isWithdrawing} // Convert to number
  className={`${
    parseFloat(dashboardData?.totalEarning ?? '0') >= 1000 // Convert to number
      ? 'bg-green-500 hover:bg-green-600'
      : 'bg-gray-300'
  } text-white py-2 px-4 rounded mt-4`}
>
  {isWithdrawing ? 'Processing...' : 'Withdraw Earnings'}
</button>
						</div>
						<div className='border w-full flex-row justify-between px-8 py-4 space-y-4 rounded-lg border-gray-200'>
							<p className='text-xs text-secondary'>Challenges won</p>
							<strong className='flex justify-self-end'>
								{dashboardData?.challengesWon ?? 0}
							</strong>
						</div>
					</div>


					<div className='border p-6 border-gray-200 rounded-lg '>
						<h3 className='mb-6'>Referral</h3>
						<ReferralsTable />
					</div>

					<div className='border p-6 border-gray-200 rounded-lg '>
						<p>Referral Challenge</p>
						<div className='flex text-tertiary items-center justify-center h-full w-full'>
							<p>Coming Soon!</p>
						</div>
					</div>
				</div>
			</div>
		</Suspense>
	)
}

export default Referral
