import close from '@/assets/close.svg'
import { toIntlCurrency } from '@/utils'
import { closePaymentModal, useFlutterwave } from 'flutterwave-react-v3'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { LoaderIcon } from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { selectUser } from '../../redux/slices/authSlice'
import {
	handleInitializeUserTransaction,
	fundUserWallet,
	selectUserWallet,
} from '../../redux/slices/walletSlice'
import io from 'socket.io-client';
import { BACKEND_URL } from '../../utils/globalConfig';

const socket = io(`${BACKEND_URL}`)

const FundWallet = ({
	toggleFLWFunding,
	fundingAmount,
}: {
	toggleFLWFunding: () => void
	fundingAmount: number
}) => {
	const dispatch = useDispatch()
	const user = useSelector(selectUser)
	const wallet = useSelector(selectUserWallet)
	const [reference, setReference] = useState('')

	const [isLoading, setisLoading] = useState(false)

	useEffect(() => {
		setReference(Date.now().toString())
	}, [fundingAmount])

	// Fund wallet using flutterwave
	const config = {
		public_key: process.env.NEXT_PUBLIC_FLUTTER_PUBLIC_KEY,
		tx_ref: reference,
		amount: fundingAmount,
		currency: 'NGN',
		payment_options: 'card,mobilemoney,ussd',
		customer: {
			email: user.email,
			phone_number: user.phone,
			name: user.fullname,
		},
		customizations: {
			title: `Fund User Wallet ${user.username}`,
			description: `Funding user wallet for user: ${user.id}`,
		},
	}

	const fwConfig = {
		...config,
		text: 'Fund Wallet',
		callback: async (response: any) => {
			toggleFLWFunding()

			setisLoading(false)

			closePaymentModal()
		},
		onClose: () => {
			toggleFLWFunding()
		},
	}

	const body = {
		userId: user.id,
		email: user.email,
		amount: fundingAmount,
		paymentRef: reference,
		date: Date.now().toString(),
		paymentMethod: 'flutterwave',
		paymentType: 'wallet_funding',
	}

	const handleFlutterPayment = useFlutterwave(fwConfig as any)

	return (
		<div className='flex flex-col h-full justify-center items-center'>
			<div className='relative w-[85%] md:w-[600px] h-fit bg-primary'>
				<Image
					src={close}
					alt='close'
					onClick={toggleFLWFunding}
					height={40}
					width={40}
					className='absolute cursor-pointer top-[-1rem] right-[-1rem] text-tertiary'
				/>
				<div className='w-full px-[2rem] py-[2rem] md:px-[3rem] md:py-[4rem]'>
					<h1 className='font-bold mb-3 text-xl'>Hello Payment Method</h1>
					<div className='mb-5 border-b border-gray-200 pb-6'>
						<h3 className='font-bold mb-2 text-lg text-gray-700'>
							100% Secure, Reliable & Fast Payment{' '}
						</h3>
						<small className='text-gray-700 text-[12px]'>
							Pay through our highly secured online payment partner using your
							masterCard/VISA/Verve card. Bank transfer via USSD or internet
							bank transfer. You can select your preferred online payment method
							on the payment checkout page that comes up.
						</small>
					</div>

					<div className=' flex flex-col'>
						<h3 className='font-bold text-lg text-gray-700'>
							Fund Your Wallet
						</h3>
						<small className='mt-2'>
							<span className='font-bold text-gray-900'>
								Current Wallet Balance:{' '}
							</span>
							{toIntlCurrency(wallet.value?.toString() || '0')}
							<span className='font-bold ml-3 text-gray-900'>
								Funding Amount:{' '}
							</span>
							{toIntlCurrency(fundingAmount.toString())}
						</small>

						<div className='flex flex-col justify-center'>
							<p className='bg-red-400 text-primary p-5 my-3 text-[12px]'>
								Click the button below to fund your wallet now. On completion,
								fund gets added to your wallet immediately
							</p>

							<button
								disabled={isLoading}
								onClick={async () => {
									setisLoading(true)
									const res = await dispatch(
										handleInitializeUserTransaction(body) as any,
									)
									if (res)
										handleFlutterPayment({
											callback: (response) => {
												const fundBody ={
													userId: user.id,
													email: response?.customer?.email,
													chargedAmount: fundingAmount,
													paymentRef: response.flw_ref,
													trxId: response.transaction_id,
													date: Date.now().toString(),
													paymentMethod: 'flutterwave',
													paymentType: 'wallet_funding',
												}
												
												console.log(response)
												if(response.status==='success'){
													fundUserWallet(fundBody) as any,

  socket.emit('sendActivity', {
            userId: user.id,
            action: `@${user?.username} just funded wallet with ₦${fundingAmount}`,
        });
												}
												closePaymentModal()
												toggleFLWFunding()
											},
											onClose: () => {
												toggleFLWFunding()
											},
										})
									setisLoading(false)
								}}
								className='px-6 py-2 bg-yellow-500 text-primary
								disabled:bg-gray-400
								hover:bg-gray-800'>
								{isLoading ? <LoaderIcon /> : 'Fund Wallet'}
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default FundWallet
