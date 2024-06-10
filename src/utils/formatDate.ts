import { format } from 'date-fns'

export const formatDate = (date: string) => {
	console.log('🚀 ~ formatDate ~ date:', date)
	const newDate = new Date(date)

	const formattedDate = format(newDate, 'MMMM dd, yyyy')

	return formattedDate
}
