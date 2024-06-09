import Image from 'next/image'
import React from 'react'
import logo from '@/assets/seal-check.png'
import { useSelector } from 'react-redux'
import { selectUser } from '@/redux/slices/authSlice'
import Button from '../Button'
import { useRouter } from 'next/navigation'

export default function Completed() {
	const user = useSelector(selectUser)
	const router = useRouter()

	console.log('🚀 ~ Completed ~ user:', user)
	return (
		<div>
			<Image
				src={logo}
				alt='logo'
				className='w-[111px] h-[111px] mx-auto object-contain'
			/>
			<b className='text-xl font-medium'>
				🎉 Congratulations {user.fullname}! 🎉
			</b>
			<p className='text-sm text-gray-400'>
				You have complete onboarding, you can now start using Belocated!
			</p>
			<Button
				onClick={() => router.push('/dashboard')}
				color='secondary'
				className='mt-10 rounded-lg w-full'
				variant='solid'
				type='submit'>
				Launch Dashboard
			</Button>
		</div>
	)
}
