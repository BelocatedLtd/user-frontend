import toast from "react-hot-toast"

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
