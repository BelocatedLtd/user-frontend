// components/BackButton.tsx

import React from 'react'
import { MdOutlineKeyboardArrowLeft } from 'react-icons/md'
import { useRouter } from 'next/navigation'
import { cn } from '../../../helpers'

interface BackButtonProps {
	size?: number
	className?: string
}

const BackButton: React.FC<BackButtonProps> = ({
	size = 30,
	className = 'mr-1',
}) => {
	const router = useRouter()

	return (
		<MdOutlineKeyboardArrowLeft
			size={size}
			onClick={() => router.back()}
			className={cn('cursor-pointer', className)}
		/>
	)
}

export default BackButton
