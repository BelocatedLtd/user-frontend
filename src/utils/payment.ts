import { useFlutterwave, closePaymentModal } from 'flutterwave-react-v3'

interface PaymentConfig {
	public_key: string
	tx_ref: string
	amount: number
	currency: string
	payment_options: string
	customer: {
		email: string
		phone_number: string
		name: string
	}
	customizations: {
		title: string
		description: string
		logo: string
	}
}

const makePayment = (
	amount: number,
	email: string,
	phone: string,
	fullname: string,
	title: string,
	desc: string,
): void => {
	const config: PaymentConfig = {
		public_key: process.env.NEXT_PUBLIC_FLUTTER_PUBLIC_KEY!,
		tx_ref: Date.now().toString(),
		amount: amount,
		currency: 'NGN',
		payment_options: 'card,mobilemoney,ussd',
		customer: {
			email: email,
			phone_number: phone,
			name: fullname,
		},
		customizations: {
			title: title,
			description: desc,
			logo: 'Belocated',
		},
	}

	const fwConfig = {
		...config,
		text: 'Fund wallet',
		callback: (response: any) => {
			console.log(response)
			closePaymentModal()
		},
		onClose: () => {},
	}

	useFlutterwave(fwConfig)
}

export default makePayment

export function toNaira(amount: number): string {
	if (isNaN(amount)) {
		throw new Error('Invalid amount. Please provide a valid numeric amount.')
	}

	try {
		const formattedAmount = new Intl.NumberFormat('en-NG', {
			style: 'currency',
			currency: 'NGN',
		}).format(amount)
		return formattedAmount
	} catch (error) {
		throw new Error('Error formatting amount to Naira.')
	}
}
