'use client'

import React from 'react'
import { IoIosSend } from 'react-icons/io'
import { useState } from 'react'
import { useRef } from 'react'
import { useEffect } from 'react'
import { getUser } from '@/services/authServices'
import { SET_LOGOUT, SET_USER, selectUser } from '@/redux/slices/authSlice'
import { useDispatch, useSelector } from 'react-redux'
import { getOngoingRefChallenge } from '@/services/refService'
import { MdMessage } from 'react-icons/md'
import { FaCheckCircle, FaUserPlus } from 'react-icons/fa'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import { useRouter } from 'next/navigation'

const Referral = () => {
	const dispatch = useDispatch()
	const user = useSelector(selectUser)
	const router = useRouter()
	const inputRef = useRef(null)
	const [challenge, setChallenge] = useState()
	const [contestant, setContestant] = useState()
	const [rankedContestants, setRankedContestants] = useState([])
	const [refLink, setRefLink] = useState('')
	const [daysRemaining, setDaysRemaining] = useState()

	useEffect(() => {
		async function getUserData() {
			const data = await getUser()
			const Referral = await getOngoingRefChallenge()

			if (!data || data === undefined) {
				// toast.error('Unable to retrieve user data, session will be terminated')
				dispatch(SET_LOGOUT())
				router.push('/')
				return
			}

			setChallenge(Referral)
			//  setContestants(challenge?.referralChallengeContestants)

			await dispatch(SET_USER(data))
		}
		getUserData()

		const frontEndUrl = window.location.hostname
		setRefLink(`https://${frontEndUrl}/ref-cha/${user?.username}`)
	}, [dispatch])

	// Get updated ref challenge standing
	//console.log(challenge?.referralChallengeContestants)

	// Sort the contestants according to how many times they appear in the array and then rank them according to how many times each of them occur in the array and make an array object which each item contains the contestant and then how many times they occur

	useEffect(() => {
		const contestants = challenge?.referralChallengeContestants

		// Check if contestants is not null or undefined before processing
		if (contestants) {
			const contestantCounts = contestants?.reduce((acc, contestant) => {
				acc[contestant] = (acc[contestant] || 0) + 1
				return acc
			}, {})

			const sortedContestants = Object?.entries(contestantCounts).sort(
				(a, b) => b[1] - a[1],
			)

			setRankedContestants(
				sortedContestants?.map(([contestant, count], index) => ({
					contestant,
					pts: count / 2,
					rank: index + 1,
				})),
			)
		}
	}, [])

	function createData(name, calories, protein) {
		return { name, calories, protein }
	}

	const rows = [
		createData('Oladele dayo', 24, 4.0),
		createData('Aisha Yusufu', 37, 4.3),
		createData('Jgaban', 24, 6.0),
		createData('Moses Jude', 67, 4.3),
	]

	return (
		<div className='w-full h-screen lg:mr-5'>
			<h2 className='mt-1 font-medium text-lg  mb-10'>Referrals</h2>
			<div className='grid grid-cols-2 gap-8'>
				<div className='border w-full px-8 py-4 space-y-4 rounded-lg border-gray-200'>
					<div>
						<p>Earn with Belocated</p>
						<p className='text-xs mt-1 text-gray-400'>
							Invite friends to join Belocated
						</p>
					</div>

					<div className='flex items-center space-x-10'>
						<div className='flex items-center'>
							<MdMessage className='text-secondary' />
							<span className='ml-3'>Send Invitation</span>
						</div>
						<div className='flex items-center'>
							<FaUserPlus className='text-secondary' />
							<span className='ml-3'>Registration </span>
						</div>
						<div className='flex items-center'>
							<FaCheckCircle className='text-secondary' />
							<span className='ml-3'>Use Belocated for free!</span>
						</div>
					</div>
				</div>
				<div className='border w-full row-span-2 px-8 py-4 space-y-4 rounded-lg border-gray-200'>
					<div>
						<p>Invite your friends </p>
						<p className='text-xs text-gray-400'>
							Add your friend’s email address and send them invitations to join!
						</p>
					</div>
					<div>
						<div className='border mt-10 h-14 rounded-full pl-6 pr-3 flex items-center'>
							<input className=' w-full h-full' placeholder='Email Address' />
							<button className='bg-secondary cursor-pointer text-white text-xl rounded-full h-10 w-10 flex items-center justify-center ml-3'>
								<IoIosSend className='' />
							</button>
						</div>
					</div>
					<div className='mt-20'>
						<div className='mt-20'>
							<p>Share referral link </p>
							<p className='text-xs text-gray-400'>
								Your can also share your referral link by copying it and sending
								it to your friends or sharing on social media
							</p>
						</div>
						<div className='rounded-full mt-6 bg-primary-light flex items-center justify-between px-8 py-4'>
							<p>https://belocated.ng?ref=uegyebfybefer</p>
							<p className='text-secondary'>copy link</p>
						</div>
					</div>
				</div>

				<div className=' grid grid-cols-4 gap-4'>
					<div className='border w-full flex-row justify-between px-8 py-4 space-y-4 rounded-lg border-gray-200'>
						<p className='text-xs text-secondary'>Total Earnings</p>
						<strong className='flex justify-self-end'>$45,678.90</strong>
					</div>
					<div className='border w-full flex-row justify-between px-8 py-4 space-y-4 rounded-lg border-gray-200'>
						<p className='text-xs text-secondary'>Referred users</p>
						<strong className='flex justify-self-end'>100</strong>
					</div>
					<div className='border w-full flex-row justify-between px-8 py-4 space-y-4 rounded-lg border-gray-200'>
						<p className='text-xs text-secondary'>Referred users</p>
						<strong className='flex justify-self-end'>200</strong>
					</div>
					<div className='border w-full flex-row justify-between px-8 py-4 space-y-4 rounded-lg border-gray-200'>
						<p className='text-xs text-secondary'>Challenges won</p>
						<strong className='flex justify-self-end'>8</strong>
					</div>
				</div>

				<div className='border p-6 border-gray-200 rounded-lg '>
					<h3 className='mb-6'>Referral</h3>
					<TableContainer component={Paper}>
						<Table sx={{ minWidth: 350 }} aria-label='simple table'>
							<TableHead>
								<TableRow>
									<TableCell>Name</TableCell>
									<TableCell align='right'>Date</TableCell>
									<TableCell align='right'>Status</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{rows.map((row) => (
									<TableRow
										key={row.name}
										sx={{
											'&:last-child td, &:last-child th': { border: 0 },
										}}>
										<TableCell component='th' scope='row'>
											{row.name}
										</TableCell>
										<TableCell align='right'>{row.calories}</TableCell>
										<TableCell align='right'>{row.protein}</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</TableContainer>
				</div>

				<div className='border p-6 border-gray-200 rounded-lg flex'>
					<p>Referral Challenge</p>
				</div>
			</div>
		</div>
	)
}

export default Referral
