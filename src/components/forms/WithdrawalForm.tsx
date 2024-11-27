import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import close from '../../assets/close.svg'
import {
	selectIsError,
	selectIsLoading,
	selectIsSuccess,
	withdrawUserWallet,
} from '../../redux/slices/walletSlice'

const initialState = {
	withdrawalMethod: '',
	withdrawalAmount: null,
	withdrawalStatus: '',
}

const WithdrawalForm = ({
	handleWithdrawFunds,
	wallet,
	user,
}: {
	handleWithdrawFunds: () => void
	wallet: any
	user: any
}) => {
	const dispatch = useDispatch()
	const router = useRouter()
	const isSuccess = useSelector(selectIsSuccess)
	const isError = useSelector(selectIsError)
	const isLoading = useSelector(selectIsLoading)
	const [formProgression, setFormProgression] = useState('')
	const [confirmBtn, setConfirmBtn] = useState(false)
	const [withdrawDetails, setWithdrawDetails] = useState(initialState)
	const [withdrawMethod, setWithdrawMethod] = useState('')
	const [amount, setAmount] = useState<any>()
	const [walletBalance, setwalletBalance] = useState(wallet?.value)
	const [canWithdraw, setCanWithdraw] = useState(false)
	const [error, setError] = useState('')

	const handleWithdrawalMethodChange = (event: any) => {
		setWithdrawMethod(event.target.value)
	}

	//   const {withdrawalMethod, withdrawalAmount, withdrawalStatus} = withdrawDetails

	useEffect(() => {
		if (withdrawMethod === 'airtime') {
			setFormProgression('airtime')
			setConfirmBtn(true)
		}

		if (withdrawMethod === 'bank transfer') {
			setFormProgression('bank transfer')
			setConfirmBtn(true)
		}

		if (withdrawMethod === '') {
			setFormProgression('')
			setConfirmBtn(false)
		}
	}, [withdrawMethod])

	const handleWithdrawalAmount = (event: any) => {
		const withdrawAmount = event.target.value
		setAmount(event.target.value)
		setwalletBalance(walletBalance - withdrawAmount)

		if (parseFloat(withdrawAmount) > wallet?.value) {
			setCanWithdraw(false)
			toast.error('Withdrawal amount exceeds account balance')
		}
		if (parseFloat(withdrawAmount) > parseFloat(wallet?.value)) {
			setCanWithdraw(false)
			toast.error('Withdrawal amount exceeds account balance')
		} else if (isNaN(withdrawAmount) || withdrawAmount <= 0) {
			setCanWithdraw(false)
			toast.error('Invalid Amount')
		} else if (withdrawAmount > wallet?.value) {
			setCanWithdraw(false)
			toast.error('Withdrawal Amount exceeds balance')
		} else if (withdrawAmount > parseFloat(wallet?.value)) {
			setCanWithdraw(false)
			toast.error('Insufficient Funds')
		} else {
			setCanWithdraw(true)
		}
	}

	const confirmedWithdrawalDetails = {
		userId: user.id,
		withdrawalMethod: withdrawMethod,
		withdrawAmount: amount,
	}

	const handleOnSubmit = async (e: any) => {
		e.preventDefault()

		if (withdrawMethod == 'bank transfer' && parseFloat(amount) < 5000) {
			toast.error('Minimum withdrawal via bank transfer is 5,000 Naira')
			return
		}

		if (withdrawMethod == 'airtime' && parseFloat(amount) < 1000) {
			toast.error('Minimum withdrawal via airtime is 1,000 Naira')
			return
		}

		if (parseFloat(amount) > wallet?.value) {
			toast.error('Withdrawal amount exceeds account balance')
			return
		}
		if (parseFloat(amount) > parseFloat(wallet?.value)) {
			toast.error('Withdrawal amount exceeds account balance')
			return
		} else if (isNaN(amount) || amount <= 0) {
			toast.error('Invalid Amount')
			return
		} else if (amount > wallet?.value) {
			toast.error('Withdrawal Amount exceeds balance')
			return
		} else if (amount > parseFloat(wallet?.value)) {
			toast.error('Insufficient Funds')
			return
		} else {
			if (canWithdraw) {
				if (withdrawMethod === 'airtime' && amount > 5000) {
					toast.error(
						'You can only get less than 5,000 Naira for Airtime Withdrawal',
					)
					return
				}

				if (withdrawMethod === 'bank transfer' && amount < 5000) {
					toast.error(
						'You can only withdraw 5,000 Naira and above for bank withdrawals',
					)
					return
				}

				dispatch(withdrawUserWallet(confirmedWithdrawalDetails) as any)

				if (isError) {
					toast.error('Error sending withdrawal request')
				}

				if (isSuccess) {
					router.push(`/dashboard/wallet`);
					// handleWithdrawFunds()
					// navigate(`/dashboard/${user.username}`)
				}
			}
		}
	}

	return (
		<div className='flex flex-col justify-center items-center h-full '>
			<div className='relative  w-[85%] md:w-[600px] h-fit md:py-[2rem]  bg-primary'>
				<Image
					src={close}
					alt='close'
					onClick={handleWithdrawFunds}
					height={40}
					width={40}
					className='absolute cursor-pointer top-[-1rem] right-[-1rem] text-tertiary'
				/>

				<div className='w-full flex flex-col md:flex-row justify-center items-center py-[1.5rem] gap-1'>
					<div className='flex items-center gap-1'>
						<label htmlFor='wallet balance' className='font-bold'>
							Wallet Balance:
						</label>
						<p>₦{wallet?.value}</p>
					</div>
				</div>
				<hr className='w-full my-2' />

				<div className='w-fit md:w-[400px] h-fit flex items-center justify-center mx-auto'>
					{(!wallet?.value || wallet?.value === 0) && (
						<p className='w-full md:w-full text-gray-600 text-center font-bold'>
							Wallet is Empty, Perform Tasks to start earning
						</p>
					)}

					{wallet?.value > 0 && (
						<form
							onSubmit={handleOnSubmit}
							className='flex flex-col justify-center items-center p-[3rem] gap-2'>
							<label htmlFor='fund account' className='font-bold text-sm'>
								How would you like to be paid?
							</label>
							<select
								name='withdrawalMethod'
								value={withdrawMethod}
								className='border border-gray-300 p-3 mb-2'
								onChange={handleWithdrawalMethodChange}>
								<option value=''>Select Withdrawal Method</option>
								<option value='airtime'>Airtime</option>
								<option value='bank transfer'>Bank Transfer</option>
							</select>

							<div className='withdraw__method'>
								{/* Airtime */}
								{formProgression === 'airtime' ? (
									<div className='flex flex-col justify-center items-center gap-5'>
										{/* Withdrawal Amount */}
										<div className='flex flex-col'>
											<label
												htmlFor='fund account'
												className='font-bold text-sm mb-1'>
												How much would you like to withdraw?
											</label>
											<input
												type='number'
												name='amount'
												placeholder='₦'
												value={amount}
												onChange={handleWithdrawalAmount}
												className='border border-gray-600 py-2 px-2'
											/>
										</div>

										<label htmlFor='fund account' className='font-bold text-sm'>
											We will send your airtime to your registered Phone number?
										</label>
										<p className='font-bold text-xl text-center'>
											0{user?.phone}
										</p>
										<small className='font-medium text-gray-600'>
											<span className='text-tertiary font-bold text-center'>
												Note:
											</span>{' '}
											Please make sure the number is currently
										</small>
									</div>
								) : (
									''
								)}

								{/* Bank Transfer */}
								{formProgression === 'bank transfer' ? (
									<div className='flex flex-col justify-center items-center gap-2'>
										<div className='flex flex-col'>
											<label
												htmlFor='fund account'
												className='font-bold text-sm mb-1'>
												How much would you like to withdraw?
											</label>
											<input
												type='number'
												name='withdrawalAmount'
												placeholder='₦'
												value={amount}
												onChange={handleWithdrawalAmount}
												className='border border-gray-600 py-2 px-2'
											/>
										</div>

										<label htmlFor='fund account' className='font-bold text-sm'>
											We will transfer your withdrawed funds to this bank
											account?
										</label>

										<div className='flex items-center gap-1'>
											<label htmlFor='bankName' className='font-bold'>
												Bank Name:
											</label>
											<p>{user.bankName}</p>
										</div>
										<div className='flex items-center gap-1'>
											<label htmlFor='bankName' className='font-bold'>
												Account Name:
											</label>
											<p>{user.accountHolderName}</p>
										</div>
										<div className='flex items-center gap-1'>
											<label htmlFor='bankName' className='font-bold'>
												Account Number:
											</label>
											<p>{user.bankAccountNumber}</p>
										</div>
									</div>
								) : (
									''
								)}
							</div>

							<div className='flex items-center'>
								{/* {confirmBtn && (<button onClick={confirmWithdrawalMethod} className='bg-tertiary text-gray-100 px-6 py-1 mt-5'>Confirm</button>)} */}

								{canWithdraw ? (
									<button
										type='submit'
										className='bg-gray-800 text-gray-100 px-6 py-1 mt-5'>
										<>
											{!isLoading && 'Send Request'}
											{isLoading && 'Sending Request...'}
											{isError && 'Sending Failed'}
										</>
									</button>
								) : (
									<p className='text-tertiary text-center mt-2'>
										You can only withdraw the amount in your wallet
									</p>
								)}
							</div>
						</form>
					)}
				</div>
			</div>
		</div>
	)
}

export default WithdrawalForm
