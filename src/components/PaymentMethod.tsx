'use client'
import { closePaymentModal, useFlutterwave } from 'flutterwave-react-v3'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import close from '../assets/close.svg'
import { selectUser } from '../redux/slices/authSlice'
import {
	fundUserWallet,
	getUserWallet,
	handleInitializeUserTransaction,
	selectUserWallet,
} from '../redux/slices/walletSlice'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { toast } from 'react-hot-toast'
import { usePaystackPayment } from 'react-paystack'
import { io } from 'socket.io-client'
import { createAdvert, initializeAdvert } from '../services/advertService'
import { BACKEND_URL } from '../utils/globalConfig'
import Loader from './loader/Loader'

const socket = io(`${BACKEND_URL}`)

const PaymentMethod = ({
	togglePaymentSelect,
	formData,
	captionArray,
}: any) => {
	const dispatch = useDispatch()
	const [canPay, setCanPay] = useState(false)
	const [reference, setReference] = useState('')
	const router = useRouter()
	const [isLoading, setIsLoading] = useState(false)
	const user = useSelector(selectUser)
	const wallet = useSelector(selectUserWallet)
	console.log('🚀 ~ wallet:', wallet)

	const getWallet = async () => {
		dispatch(getUserWallet() as any)
	}

	useEffect(() => {
		getWallet()
	}, [dispatch])

	const {
		platform,
		service,
		adTitle,
		TD,
		desiredROI,
		costPerTask,
		earnPerTask,
		gender,
		state,
		lga,
		imageArray,
		socialPageLink,
		expBudget,
	} = formData

	useEffect(() => {
		if (wallet?.value !== null && wallet?.value >= expBudget) {
			setCanPay(true)
		} else if (wallet?.value !== null && wallet.value < expBudget) {
			setCanPay(false)
		}
		setReference(Date.now().toString())
	}, [wallet, expBudget])

	const title = `Buy ${desiredROI} ${platform} ${service}`

	//Append and prepare form data for transport
	const paymentFormData = new FormData()

	for (let i = 0; i < imageArray?.length; i++) {
		paymentFormData.append('images', imageArray[i])
	}
	paymentFormData.append('platform', platform)
	paymentFormData.append('service', service)
	paymentFormData.append('adTitle', adTitle)
	paymentFormData.append('TD', TD)
	paymentFormData.append('desiredROI', desiredROI)
	paymentFormData.append('gender', gender)
	paymentFormData.append('state', state)
	paymentFormData.append('lga', lga)
	paymentFormData.append('userId', user?.id)
	paymentFormData.append('costPerTask', costPerTask)
	paymentFormData.append('earnPerTask', earnPerTask)
	paymentFormData.append('socialPageLink', socialPageLink)
	// Loop through captionArray and append each caption
	captionArray.forEach((caption: any, index: string) => {
		paymentFormData.append(`caption[${index}]`, caption)
	})
	paymentFormData.append('adAmount', expBudget)

	//make payment from available wallet fund
	const handlePayment = async (e: any) => {
		e.preventDefault()

		// for (var pair of paymentFormData.entries()) {
		//     console.log(pair[0]+ ', ' + pair[1])
		// }
		// return

		if (canPay) {
			//const response = await dispatch(createNewAdvert(adFormData))
			paymentFormData.append('paymentRef', reference)
			paymentFormData.append('paymentMethod', 'wallet')

			setIsLoading(true)
			const response = await createAdvert(paymentFormData)
			console.log(response)
			setIsLoading(false)

			if (response) {
				toast.success('Your advertisement has been successfully created!')

				//Emit socket io event to the backend
				const emitData = {
					userId: user?.id,
					action: `@${user?.username} just created an Ad for ${platform}`,
				}

				//Emit Socket event to update activity feed
				socket.emit('sendActivity', emitData)

				router.push('/dashboard/campaign-stats')
				setIsLoading(false)
			} else {
				toast.error('Error creating advert, failed to make payment')
				router.push('/dashboard/campaign-stats')
				setIsLoading(false)
				togglePaymentSelect()
			}
		} else {
			toast.error('Insufficient fund, fund your wallet')
			setIsLoading(false)
		}
	}

	// Fund wallet using flutterwave
	const config = {
		public_key: process.env.NEXT_PUBLIC_FLUTTER_PUBLIC_KEY!,
		tx_ref: reference,
		amount: expBudget,
		currency: 'NGN',
		payment_options: 'card,mobilemoney,ussd',
		customer: {
			email: user.email,
			phone_number: user.phone,
			name: user.fullname,
		},
		customizations: {
			title: title,
			description: 'Advert creation',
			logo: 'Belocated',
		},
	}

	// const handleclick = () => {
	//     console.log(payment__key )
	// }

	const fwConfig = {
		...config,
		text: 'Pay with Flutterwave',
		callback: async (response: any) => {
			const trxData = {
				userId: user.id,
				email: response?.customer?.email,
				date: response.created_at,
				chargedAmount: response.charged_amount,
				trxId: response.transaction_id,
				paymentRef: response.flw_ref,
				status: response.charge_response_message,
			}

			dispatch(fundUserWallet(trxData) as any)

			closePaymentModal()
		},
		onClose: () => {
			router.back()
		},
	}

	const payStackConfig = {
		text: 'Pay with Paystack',
		publicKey: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY!,
		email: user?.email,
		reference,
		amount: expBudget * 100,
		currency: 'NGN',
		payment_options: 'card,mobilemoney,ussd',
		customer: {
			email: user.email,
			phone_number: user.phone,
			name: user.fullname,
		},
		customizations: {
			title: title,
			description: 'Advert creation',
			logo: 'Belocated',
		},
	}

	const onClose = () => {
		router.push('/dashboard/campaign-stats')
	}

	const onSuccess = (response: any) => {
		router.push('/dashboard/campaign-stats')
	}

	const paystackPayment = usePaystackPayment(payStackConfig)
	const flutterwavePayment = useFlutterwave(config)

	const initializePayment = async (
		paymentMethod: 'paystack' | 'flutterwave',
	) => {
		setIsLoading(true)
		paymentFormData.append('paymentRef', reference)

		const response = await initializeAdvert(paymentFormData)
		console.log(response)
		setIsLoading(false)

		if (response) {
			//Emit socket io event to the backend
			// const emitData = {
			// 	userId: user?.id,
			// 	action: `@${user?.username} just created an Ad for ${platform}`,
			// }

			// //Emit Socket event to update activity feed
			// socket.emit('sendActivity', emitData)

			const body = {
				userId: user.id,
				email: user.email,
				amount: expBudget,
				paymentRef: reference,
				date: Date.now().toString(),
				paymentMethod,
				advertId: response._id,
				paymentType: 'advert_payment',
			}

			const res = await dispatch(handleInitializeUserTransaction(body) as any)
			setIsLoading(false)

			if (res.meta.requestStatus === 'fulfilled') {
				if (paymentMethod === 'paystack')
					paystackPayment({ onSuccess, onClose })
				else if (paymentMethod === 'flutterwave')
					flutterwavePayment({
						callback: (response) => {
							console.log(response)
							closePaymentModal()
							onSuccess(response)
						},
						onClose: () => onClose(),
					})
			}
		}
		if (!response) {
			setIsLoading(false)
			toast.error('Error creating advert, failed to make payment')
			// router.push('/dashboard/campaign-stats')
			togglePaymentSelect()
		}
	}

	return (
		<div className=''>
			<Loader open={isLoading} />

			<div className='relative  w-[85%] h-fit md:w-[600px] bg-primary'>
				<Image
					src={close}
					alt='close'
					onClick={togglePaymentSelect}
					// size={40}
					className='absolute h-10 w-10 top-[-1rem] right-[-1rem] text-tertiary'
				/>
				<div className='w-full px-[2rem] py-[1.5rem] md:px-[3rem] md:py-[4rem]'>
					<h1 className='font-bold mb-3 text-xl'>Hello Payment Method</h1>
					<div className='mb-5 border-b border-gray-200 pb-6'>
						<h3 className='font-bold mb-2 text-lg text-gray-700'>
							100% Secure, Reliable & Fast Payment{' '}
						</h3>
						<small className='text-gray-700'>
							Pay through our highly secured online payment partner using your
							masterCard/VISA/Verve card. Bank transfer via USSD or internet
							bank transfer. You can select your preferred online payment method
							on the payment checkout page that comes up.
						</small>
					</div>

					<div className=' flex flex-col'>
						<h3 className='font-bold text-lg text-gray-700'>
							Pay with your Wallet{' '}
						</h3>
						<small className='font-bold mt-2'>
							Wallet Balance: ₦{wallet?.value}
						</small>

						{!canPay && (
							<div className='flex space-y-0 flex-col justify-center'>
								<p className='bg-red-400 text-primary p-5 my-3'>
									Your wallet is insufficient to perform this transaction. Click
									the button below to fund your wallet now
								</p>
								<button
									onClick={() => initializePayment('flutterwave')}
									className='px-6 py-2 bg-yellow-500 text-primary'>
									Pay with Flutterwave
								</button>
								{/* <button
									onClick={() => initializePayment('paystack')}
									className='px-6 py-2 bg-[#16A4DA] text-primary'>
									Pay with Paystack
								</button> */}
							</div>
						)}
						{canPay && (
							<div className='flex flex-col justify-center'>
								<p className='bg-secondary text-primary p-5 my-3'>
									Pay for this advert with the funds in your wallet. Click the
									button below to pay
								</p>
								<button
									onClick={handlePayment}
									className='px-6 py-2 bg-red-400 text-primary text-center'>
									{!isLoading && `Pay ₦${expBudget}`}
									{isLoading && 'Creating Ad...'}
								</button>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	)
}

export default PaymentMethod
