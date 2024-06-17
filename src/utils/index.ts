import socialPlatforms, {
	IAssetData,
	IPlatformData,
} from '@/components/data/assets'
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
export function getSocialPlatformAsset(
	platform: string,
	asset: string,
): IAssetData {
	const platformData = socialPlatforms.find(
		(p) => p.assetplatform.toLowerCase() === platform.toLowerCase(),
	)

	if (!platformData) {
		throw `Platform '${platform}' does not exist.`
	}

	const assetData = platformData.assets.find(
		(a) => a.asset.toLowerCase() === asset.toLowerCase(),
	)

	if (!assetData) {
		throw `Asset '${asset}' does not exist in platform '${platform}'.`
	}

	return assetData
}

export const getStatusBgColor = (taskStatus: string) => {
	switch (taskStatus) {
		case 'Awaiting Submission':
			return 'bg-secondary'
		case 'Submitted':
			return 'bg-yellow-600'
		case 'Rejected':
			return 'bg-tertiary'
		case 'Approved':
			return 'bg-secondary'
		case 'Partial Approval':
			return 'bg-secondary'
		default:
			return 'bg-gray-200'
	}
}
