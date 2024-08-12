'use client'

import CompleteProfile from '@/components/kyc/completeProfile'
import { useRouter } from 'next/navigation'

export default function EditProfileSettings() {
	const router = useRouter()
	const handleNext = () => {
		router.push('/dashboard')
	}

	return (
		<div className='md:w-1/2'>
			<CompleteProfile header='Edit your details' next={handleNext} />
		</div>
	)
}
