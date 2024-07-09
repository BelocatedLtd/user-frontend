import whatsappimage from '@/assets/whatsapp.png'
import Image from 'next/image'
import { useState } from 'react'
import Button from '../Button'

export default function Whatsapp({ next }: { next: () => void }) {
	const [linkClicked, setLinkClicked] = useState(false)

	const handleLinkClick = () => {
		setLinkClicked(true)
	}

	return (
		<div className='bg-red- '>
			<Image
				src={whatsappimage}
				alt='logo'
				className='w-36 h-10 mx-auto object-contain'
			/>
			<b className='text-lg font-medium'>Join Our Community</b>
			<p className='text-gray-400 text-sm'>
				Follow the link below to join our WhatsApp group and stay updated
			</p>
			<div
				className='bg-primary-light rounded-lg text-center py-2 mt-3 cursor-pointer'
				onClick={handleLinkClick}>
				<span className='text-sm text-gray-500'>
					https://whatsapp.com/invite?id=jefncenrfnerfbrefewuifnu
				</span>
			</div>

			<Button
				color='secondary'
				variant='solid'
				disabled={!linkClicked}
				onClick={() => next()}
				className='mt-10 w-full rounded-lg'>
				Next Step
			</Button>
		</div>
	)
}
