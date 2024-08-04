import whatsappimage from '@/assets/whatsapp.png'
import Image from 'next/image'
import { useState } from 'react'

export default function Whatsapp({ next }: { next: () => void }) {
	const [linkClicked, setLinkClicked] = useState(false)

	const handleLinkClick = () => {
		setLinkClicked(true)
	}

	return (
		<div className='bg-red- '>
			<a
				href='https://whatsapp.com/channel/0029Va7JRtyEVccRNhgObL3E'
				target='_blank'>
				<Image
					src={whatsappimage}
					alt='logo'
					onClick={() => next()}
					className='w-36 h-10 mx-auto object-contain'
				/>
			</a>

			<b className='text-lg font-medium'>Join Our Community</b>
			<p className='text-gray-400 mt-2 text-sm'>
				Click the whatsapp icon above to join our WhatsApp group and stay
				updated
			</p>
		</div>
	)
}
