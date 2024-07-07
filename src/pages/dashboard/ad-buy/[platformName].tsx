'use client' // Corrected 'use client' to 'use strict' or similar if intended
import BackButton from '@/components/Button/BackButton'
import socialPlatforms from '@/components/data/assets'
import AdBuyForm from '@/components/forms/AdBuyForm'
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/router'
import { Suspense, useEffect, useState } from 'react'

interface AdvertState {
	roi: string
	gender: string
	socialPageLink: string
	adText: string
}



const AdBuy = () => {
	const router = useRouter()

	const platformName = router.query.platformName as string
	const searchParam = useSearchParams()

	const service = searchParam?.get('service') || ''
	const adTitle = searchParam?.get('adTitle') || ''
	console.log('🚀 ~ AdBuy ~ pathname:', searchParam?.get('service'))

	const [advert, setAdvert] = useState<AdvertState>({
		roi: '',
		gender: '',
		socialPageLink: '',
		adText: '',
	})
	const [fileArray, setFileArray] = useState<File[]>([])
	const [selectedFiles, setSelectedFiles] = useState<string[]>([])
	const [expBudget, setExpBudget] = useState<number>(0)
	const [costToPay, setCostToPay] = useState<number>(0)
	const [earnPerTask, setEarnPerTask] = useState<number>(0)
	const [selectedPlatformObject, setSelectedPlatformObject] =
		useState<any>(null) // Adjusted type

	const [socialService, setSocialService] = useState<any>(null) // Adjusted type
	const [comments, setComments] = useState<string>('') // Added type annotation
	const [captionArray, setCaptionArray] = useState<string[]>([]) // Added type annotation

	const handleInputChange = (
		e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>,
	) => {
		const { name, value } = e.target
		setAdvert({ ...advert, [name]: value })
	}

	const handleCaptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		setComments(e.target.value)
	}

	// Split comments by newline character and remove empty strings
	useEffect(() => {
		const commentsArray = comments
			.split('\n')
			.filter((comment) => comment.trim() !== '')
		setCaptionArray(commentsArray)
	}, [comments])

	// Upload and preview multiple screenshots
	const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const files = Array.from(e.target.files || [])
		setFileArray(files as File[]) // Type assertion for files array

		// Create an array of file previews
		const filePreviews = files.map((file) => {
			if (file.type.startsWith('image/')) {
				// For image files, create preview using FileReader API
				const reader = new FileReader()
				return new Promise((resolve) => {
					reader.onloadend = () => {
						resolve(reader.result as string)
					}
					reader.readAsDataURL(file)
				})
			} else if (file.type.startsWith('video/')) {
				// For video files, create preview using FileReader API
				const reader = new FileReader()
				reader.readAsDataURL(file)
				return new Promise((resolve) => {
					reader.onloadend = () => {
						resolve(reader.result as string)
					}
				})
			}
			// Handle other file types as needed
			return null
		})

		// Update state with the array of previews
		Promise.all(filePreviews).then((previews) => {
			setSelectedFiles((prevFiles) => [...prevFiles, ...(previews as string[])])
		})
	}

	const handleImageRemove = (itemToRemove: string) => {
		setSelectedFiles((prevFiles) =>
			prevFiles.filter((item) => item !== itemToRemove),
		)
	}

	useEffect(() => {
		const servicesList = socialPlatforms?.find(
			(object) => object?.assetplatform === platformName,
		)
		setSelectedPlatformObject(servicesList)
	}, [platformName])

	useEffect(() => {
		const selectedService = selectedPlatformObject?.assets?.find(
			(item: any) => item?.asset === service,
		)
		setEarnPerTask(selectedService?.amountForTask || 0)
		setExpBudget(
			selectedService?.CostToOrder || 0 * parseFloat(advert.roi) || 0,
		) // Corrected calculation
		setCostToPay(selectedService?.CostToOrder || 0)
	}, [service, advert.roi])

	return (
		<Suspense>
			<div className='flex items-center gap-3 border-b border-gray-200 py-5 mb-3'>
				<BackButton />
				<div className='flex flex-col'>
					<p className='font-semibold text-xl text-gray-700'>
						Create an Advertising Campaign
					</p>
					<small className='font-medium text-gray-500'>
						Click <span className='text-secondary'>here</span> to see and
						monitor your adverts
					</small>
				</div>
			</div>
			<AdBuyForm
				platform={platformName!}
				service={service}
				adTitle={adTitle}
				advert={advert}
				handleImageRemove={handleImageRemove}
				selectedFiles={selectedFiles}
				fileArray={fileArray}
				handleInputChange={handleInputChange}
				handleImageChange={handleImageChange}
				handleCaptionChange={handleCaptionChange}
				expBudget={expBudget}
				costToPay={costToPay}
				earnPerTask={earnPerTask}
				socialService={socialService}
				comments={comments}
				captionArray={captionArray}
			/>
		</Suspense>
	)
}

export default AdBuy
