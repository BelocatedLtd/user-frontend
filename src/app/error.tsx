'use client'

import errorPage from '@/assets/errorpage.png'
import Button from '@/components/Button'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Suspense } from 'react'

const Error404Page = () => {
	const router = useRouter()

	return (
		<Suspense>
			<div className='w-full h-full'>
				<div className='container h-full items-center justify-center mx-auto'>
					<div className='flex flex-col h-full w-full items-center justify-center border-gray-100'>
						<Image
							src={errorPage}
							alt='errorpage img'
							className='w-40 h-40 md:w-80 md:h-80'
						/>
						<hr />
						<p className='font-bold text-lg md:text-2xl text-gray-700 mt-[2rem]'>
							Oops!, seems you've hit a Snag.
						</p>
						<div className='flex justify-center items-center gap-3 w-full mt-[1rem]'>
							<Button
								variant='solid'
								color='danger'
								onClick={() => router.back()}
								className='rounded-sm '>
								Go Back
							</Button>
							<Button
								variant='solid'
								color='secondary'
								onClick={() => router.push('/')}
								className='rounded-sm '>
								Home Page
							</Button>
						</div>
					</div>
				</div>
			</div>
		</Suspense>
	)
}

export default Error404Page
