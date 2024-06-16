import toast from 'react-hot-toast'

export const handleRefLinkCopy = async (text: string) => {
	try {
		if (text) {
			await navigator.clipboard.writeText(text)
			toast.success('Referral link copied to clipboard')
		}
	} catch (err) {
		console.error('Failed to copy: ', err)
		toast.error('Failed to copy referral link')
	}
}

export function toIntlCurrency(amount: string): string {
	const numericAmount = parseFloat(amount)
	if (isNaN(numericAmount)) {
		throw new Error('Invalid amount. Please provide a valid numeric amount.')
	}

	try {
		const formattedCurrency = new Intl.NumberFormat('en-NG', {
			style: 'currency',
			currency: 'NGN',
			currencyDisplay: 'symbol',
		}).format(numericAmount)
		return formattedCurrency
	} catch (error) {
		throw new Error('Invalid currency or locales provided.')
	}
}
