'use client'

import TransactionList from '@/components/dashboard/TransactionList'
import FundingForm from '@/components/forms/FundingForm'
import WithdrawalForm from '@/components/forms/WithdrawalForm'
import Loader from '@/components/loader/Loader'
import useRedirectLoggedOutUser from '@/customHook/useRedirectLoggedOutUser'
import { selectUser } from '@/redux/slices/authSlice'
import {
	handleGetUserTransactions,
	selectIsError,
	selectIsLoading,
	selectTransactions,
} from '@/redux/slices/transactionSlice'
import { getUserWallet, selectUserWallet } from '@/redux/slices/walletSlice'
import { toNaira } from '@/utils/payment'
import { Modal } from '@mui/material'
import { useRouter } from 'next/navigation'
import { Suspense, useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import { BsFillPlusCircleFill } from 'react-icons/bs'
import { FaCircleMinus } from 'react-icons/fa6'
import { useDispatch, useSelector } from 'react-redux'

const TransHistory = () => {
	const transactions = useSelector(selectTransactions)
	const router = useRouter()
	const user = useSelector(selectUser)
	const isLoading = useSelector(selectIsLoading)
	const isError = useSelector(selectIsError)
	const dispatch = useDispatch()
	const [isOpen, setIsOpen] = useState(false)
	const [openWithdraw, setOpenWithdraw] = useState(false)
	const wallet = useSelector(selectUserWallet)
	console.log('🚀 ~ TransHistory ~ wallet:', wallet)

	const handleWithdrawFunds = () => {
		setOpenWithdraw(!openWithdraw)
	}

	useRedirectLoggedOutUser('/login')

	useEffect(() => {
		const getTransactions = async () => {
			await dispatch(handleGetUserTransactions() as any)
		}
		getTransactions()
		dispatch(getUserWallet() as any)

		if (isError) {
			toast.error('Failed to retrieve adverts, please reload page')
			router.back()
		}
	}, [])

	return (
		<Suspense>
			<div className='w-full h-fit'>
				<Loader open={isLoading} />
				<div className='md:flex items-center justify-between gap-3  py-5'>
					<div>
						<h2 className='mt-1 font-semibold text-xl text-gray-700'>
							My Wallet
						</h2>
					</div>
					<div className='flex gap-3 mt-2 md:mt-0'>
						<button
							onClick={() => setIsOpen(true)}
							className='flex items-center gap-2 bg-green-600 text-primary rounded-full px-5 py-2 text-[12px] md:text-[15px]'>
							<BsFillPlusCircleFill />
							Fund Wallet
						</button>
						<button
							onClick={handleWithdrawFunds}
							className='flex items-center gap-2 bg-tertiary text-primary rounded-full px-5 py-2 text-[12px] md:text-[15px]'>
							<FaCircleMinus />
							Withdraw
						</button>
					</div>
				</div>

				<div className='flex items-center justify-center gap-4 mt-2'>
					<div className='border w-full flex-col text-center items-center justify-center py-8 space-y-2 rounded-lg border-gray-200'>
						<p>Total Earnings</p>
						<div>
							<strong className='text-xl md:text-3xl'>
								{toNaira(wallet.totalEarning?.toString() || '0')}
							</strong>
						</div>
					</div>
					<div className='border w-full flex-col text-center items-center justify-center py-8 space-y-2 rounded-lg border-gray-200'>
						<p>Wallet Balance</p>
						<div>
							<strong className='text-xl md:text-3xl'>
								{toNaira(wallet.value?.toString() || '0')}
							</strong>
						</div>
					</div>
				</div>

				<hr className='mt-5' />

				<div className='flex items-center justify-between gap-3 py-5'>
					<div className='flex items-center'>
						{/* <BackButton /> */}
						<div className='flex flex-col'>
							<p className='font-semibold text-xl text-gray-700'>
								My Transactions
							</p>
							<small className='font-medium text-gray-500'>
								Click <span className='text-secondary'>here</span> to see and
								monitor your adverts
							</small>
						</div>
					</div>

					<small className='hidden md:flex h-6 w-10 items-center justify-center bg-secondary rounded-full  text-primary'>
						{transactions.length}
					</small>
					{/* <button className='flex items-center gap-1 bg-secondary text-primary rounded-full px-5 py-2 mr-5 text-[12px] md:text-[15px]'>
					<BsFillPlusCircleFill />
					Transactions
				</button> */}
				</div>

				<div>
					<TransactionList />
				</div>

				<Modal
					open={isOpen}
					onClose={() => setIsOpen(false)}
					aria-labelledby='modal-modal-title'
					aria-describedby='modal-modal-description'>
					<FundingForm
						onClose={() => {
							setIsOpen(false)
							dispatch(getUserWallet() as any)
							dispatch(handleGetUserTransactions() as any)
						}}
					/>
				</Modal>
				<Modal
					open={openWithdraw}
					onClose={() => {
						setOpenWithdraw(false)
					}}
					aria-labelledby='modal-modal-title'
					aria-describedby='modal-modal-description'>
					<WithdrawalForm
						handleWithdrawFunds={handleWithdrawFunds}
						wallet={wallet}
						user={user}
					/>
				</Modal>
			</div>
		</Suspense>
	)
}

export default TransHistory
