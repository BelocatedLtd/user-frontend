import React, { Suspense, useState } from 'react'
import nigerianStates from '../data/States'
// import socialPlatforms from '../data/assets'
import { toIntlCurrency } from '@/utils'
import { Modal } from '@mui/material'
import { useEffect } from 'react'
import { toast } from 'react-hot-toast'
import { GiCancel } from 'react-icons/gi'
import { useSelector } from 'react-redux'
import { selectUser } from '../../redux/slices/authSlice'
import Button from '../Button'
import PaymentMethod from '../PaymentMethod'

interface AdBuyFormProps {
	advert: any
	service: string
	adTitle: string
	TD:string
	platform: string
	selectedFiles: any[]
	fileArray: any[]
	socialService: any
	handleImageRemove: (item: any) => void
	expBudget: number
	costToPay: number
	earnPerTask: number
	handleInputChange: (
		e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>,
	) => void
	handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void
	comments: string
	handleCaptionChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
	captionArray: string[]
}

const AdBuyForm = ({
	advert,
	service,
	adTitle,
	TD, 
	platform,
	selectedFiles,
	fileArray,
	socialService,
	handleImageRemove,
	expBudget,
	costToPay,
	earnPerTask,
	handleInputChange,
	handleImageChange,
	comments,
	handleCaptionChange,
	captionArray,
}: AdBuyFormProps) => {
	const user = useSelector(selectUser)
	const [mediaTypeImage, setMediaTypeImage] = useState('image')
	const [selectPaymentBtn, setSelectPaymentBtn] = useState(false)
	const [hideCommentInputFields, setHideCommentInputFields] = useState(false)
	const [hideImageInputFields, setHideImageInputFields] = useState(false)
	const [hideLinkInputFields, setHideLinkInputFields] = useState(false)
	const [selectedState, setSelectedState] = useState('')
	const [selectedStateCommunities, setSelectedStateCommunities] = useState<
		any[]
	>([])
	const [selectedCommunity, setSelectedCommunity] = useState('')

	useEffect(() => {
		//Both comment field and image field hidden
		if (
			service === 'Facebook Friend' ||
			service === 'Page Likes' ||
			service === 'Page Followers' ||
			service === 'Post Likes' ||
			service === 'Video Views' ||
			service === 'Share' ||
			service === 'Instagram Story View' ||
			service === 'Retweet' ||
			service === 'Join Twitter Space' ||
			service === 'TikTok Favourites' ||
			service === 'Subscribers' ||
			service === 'LinkedIn Connect' ||
			service === 'Repost' ||
			service === 'Download App' ||
			service === 'Download App and Review' ||
			service === 'Download App Review and Register' ||
			service === 'Follow' ||
			service === 'Like/Favourite' ||
			service === 'Stream'
		) {
			setHideCommentInputFields(true)
			setHideImageInputFields(true)
		}

		//Image field hidden
		if (
			service === 'Comment' ||
			service === 'Quote Tweet' ||
			service === 'Share With Comment' ||
			service === 'Repost With comment'
		) {
			setHideCommentInputFields(false)
			setHideImageInputFields(true)
		}

		//Comment field hidden
		// if (  ) {
		//   setHideCommentInputFields(true)
		//   setHideImageInputFields(true)
		// }

		if (platform === 'youtube' && service === 'Share') {
			setHideCommentInputFields(false)
			setHideImageInputFields(false)
		}

		//Link field Hidden
		if (service === 'Post Your Content') {
			setHideLinkInputFields(true)
		}
	}, [platform, service])

	const handleStateChange = (event: any) => {
		const index = event.target.value
		setSelectedState(index)
		setSelectedCommunity('')

		sortState()
	}

	const sortState = () => {
		const selectedStateObject = nigerianStates?.find(
			(item) => item.state === selectedState,
		)
		setSelectedStateCommunities(selectedStateObject?.community!)
	}

	const handleCommunityChange = (event: any) => {
		const city = event.target.value
		setSelectedCommunity(city)
	}

	const formData = {
		platform,
		service: service,
		adTitle,
		TD,
		desiredROI: advert.desiredROI,
		gender: advert.gender,
		state: selectedState,
		imageArray: fileArray,
		lga: selectedCommunity,
		//caption: comments,
		socialPageLink: advert.socialPageLink,
		costPerTask: costToPay,
		expBudget,
		earnPerTask,
	}

	const togglePaymentSelect = (e: any) => {
		e.preventDefault()

		if (expBudget < 1000) {
			toast.error('Cost of Ad too low, increase your Unit')
			return
		}

		if (hideImageInputFields === true) {
			if (
				!service ||
				!adTitle ||
				!advert.desiredROI ||
				!advert.gender ||
				!selectedState ||
				!selectedCommunity ||
				!expBudget
			) {
				toast.error(
					'Some required fields are empty, please fill in all the fields',
				)
			} else {
				setSelectPaymentBtn(!selectPaymentBtn)
			}

			return
		}

		if (
			(hideImageInputFields === false && formData?.imageArray?.length === 0) ||
			formData?.imageArray === undefined
		) {
			toast.error('images or videos must be uploaded')
			return
		}

		if (
			!service ||
			!adTitle ||
			!advert.desiredROI ||
			!advert.gender ||
			!selectedState ||
			!selectedCommunity ||
			!expBudget
		) {
			toast.error(
				'Some required fields are empty, please fill in all the fields',
			)
		} else {
			setSelectPaymentBtn(!selectPaymentBtn)
		}
	}

	return (
		<Suspense>
			<div className='w-full h-fit '>
				<form
					onSubmit={togglePaymentSelect}
					encType='multipart/form-data'
					className='w-fit md:w-full p-5 md:p-6 m-1 md:m-0 md:mr-6 border border-semi_tertiary rounded-2xl  text-center gap-6'>
					<div className='form__container flex flex-col w-full '>
						<div className='left flex-1 md:border-r md:border-gray-100 md:pr-5'>
							<div className='md:grid md:grid-cols-2 w-full md:flex-row md:gap-6'>
								{/* Services */}
								<div className=' md:gap-6 w-fit md:w-full text-left'>
									{/* <div className='flex flex-col bg-blue-300 mt-3 mb-3'> */}
									<label htmlFor='Product Name ' className='text-left'>
										Service on {platform}
									</label>
									<input
										value={service}
										disabled
										className='w-full mt-2 shadow-inner p-3 bg-transparent border border-gray-200 rounded-xl'
									/>
									<input
										value={TD}
										disabled
										className='w-full mt-2 shadow-inner p-3 bg-transparent border border-gray-200 rounded-xl'
									/>
									<small className='text-left'>
										{platform} service to advertise on
									</small>
									{/* </div> */}
								</div>

								{/* Unit */}
								<div className='flex flex-row w-full items-center md:gap-3 '>
									<div className='flex flex-col mb-3'>
										<label
											htmlFor='Business Name'
											className='text-left mb-1 ml-1'>
											Unit
										</label>
										<input
											type='number'
											placeholder=''
											name='desiredROI'
											value={advert.desiredROI}
											onChange={handleInputChange}
											className='w-fit md:w-full  shadow-inner p-3 bg-transparent border border-gray-200 rounded-xl'
										/>
										<small className='text-left w-[200px] md:w-full'>
											Expected Cost per unit For this Campaign: ₦{costToPay}
											/task
										</small>
									</div>

									{/* Unit's total cost */}
									<div className='flex flex-col justify-center'>
										<label className='text-left ml-1 text-sm'>
											You will Pay:
										</label>
										<div className='flex items-center ml-2'>
											<span>{toIntlCurrency(expBudget)}</span>
											{/* <input
												type='number'
												placeholder=''
												value={expBudget}
												disabled
												className='w-fit md:w-full text-gray-800 bg-transparent text-sm font-extrabold'
											/> */}
										</div>
										<small className='text-[9px] text-left ml-2 text-red-600'>
											Minimum ₦1,000
										</small>
									</div>
								</div>

								{/* State */}
								<div className='flex flex-col mt-3 mb-3'>
									<label htmlFor='location' className='text-left mb-1 ml-1'>
										State
									</label>
									<select
										className='w-full mt-2 shadow-inner p-3 bg-transparent border border-gray-200 rounded-xl'
										value={selectedState}
										name={selectedState}
										onChange={handleStateChange}>
										<option value=''>Select a state</option>
										<option value='All'>All States</option>
										{nigerianStates?.map((object, index) => (
											<option key={index} value={object.state}>
												{object.state}
											</option>
										))}
									</select>
								</div>

								{/* Local Government */}
								{/* {selectedState !== '' && ( */}
								<div className='flex flex-col mt-3 mb-3'>
									<label htmlFor='city-select' className='text-left mb-1 ml-1'>
										LGAs from {selectedState}
									</label>
									<select
										className='w-full  mt-2 shadow-inner p-3 bg-transparent border border-gray-200 rounded-xl'
										value={selectedCommunity}
										name={selectedCommunity}
										onChange={handleCommunityChange}>
										<option value=''>Select Local Government</option>
										<option value='All'>All Local Governments</option>
										{nigerianStates
											.find((obj) => obj.state === selectedState)
											?.community.map((city, index) => (
												<option key={index} value={city}>
													{city}
												</option>
											))}
									</select>
								</div>
								{/* )} */}

								{/* Gender */}
								<div className=' w-full text-left md:gap-6'>
									{/* <div className='flex flex-col mt-3 mb-3'> */}
									<label htmlFor='Gender' className='text-left mb-1 ml-1'>
										Gender
									</label>
									<select
										name='gender'
										id='gender'
										value={advert.gender}
										onChange={handleInputChange}
										className='w-full mt-2 shadow-inner p-3 bg-transparent border border-gray-200 rounded-xl'>
										<option value=''>Select a Gender</option>
										<option value='All'>All</option>
										<option value='Male'>Male</option>
										<option value='Female'>Female</option>
									</select>
									{/* </div> */}
								</div>

								{/*Associated Link */}
								{hideLinkInputFields ? (
									''
								) : (
									<div className='flex justify-center flex-col w-full '>
										{/* <div className='flex flex-col mt-3 mb-3'> */}
										<label htmlFor='Page Link' className='text-left'>
											Associated link if any
										</label>
										<input
											type='text'
											name='socialPageLink'
											id='socialPageLink'
											placeholder={`https://${platform}.com/${user?.username}`}
											value={advert.socialPageLink}
											onChange={handleInputChange}
											className='w-full shadow-inner mt-2 p-3 bg-transparent border border-gray-200 rounded-xl'
										/>
										<small className='text-left'>
											Eg, copy and paste your {platform} page link here.
										</small>
										{/* </div> */}
									</div>
								)}
							</div>

							{/* Ad text/Caption/Comment */}
							{hideCommentInputFields ? (
								''
							) : (
								<div className='w-full flex flex-col mt-3 mb-1'>
									<label htmlFor='adText' className='text-left mt-4 mb-1 ml-1'>
										{service == 'Comment' && 'Type of comments you want'}
										{service === 'Quote Tweet' &&
											'Kind of quotes you want (Give as many example as possible)'}
										{service === 'Share With Comment' &&
											'Kind of comments you want (Give as many example as possible)'}
										{service === 'Post Your Content' &&
											'Write up/Post Content (include link if necessary)'}
										{platform === 'youtube' &&
											service === 'Share' &&
											'Write up/Post Content (include link if necessary)'}
										{platform === 'linkedin' &&
											service === 'Repost With comment' &&
											'Kind of comments you want (Give as many example as possible)'}
									</label>

									<div className='w-full'>
										<textarea
											// type='textarea'
											cols={60}
											rows={10}
											name='adText'
											placeholder='Enter your advert captions (separated by a newline)'
											// {service === "Comment" || service === "Share With Comment" ? "Give as many examples as possible, write a comment example per line and seperated by fullstop" : "Ad description"
											// }
											value={comments}
											onChange={handleCaptionChange}
											className='shadow-inner bg-transparent border border-gray-200 rounded-xl p-3 mb-1 w-full box-border'
										/>
									</div>
								</div>
							)}
						</div>

						{/* Image and video upload */}
						<div className='right w-full flex flex-col items-start flex-1 pt-3'>
							{hideImageInputFields ? (
								''
							) : (
								<div className='text-left'>
									{/* <label htmlFor='media' className='my-6'>
									Campaign Media
								</label> */}
									<div className='w-full h-full  pt-[1rem] items-center border-gray-200'>
										{/* Upload Ad Media Contents */}
										<label
											htmlFor='upload proof of work'
											className='text-gray-500 font-bold text-center mb-[1rem]  w-full'>
											Upload Ad Media Contents
										</label>
										<div className='w-full h-fit flex flex-wrap  gap-4 p-5'>
											{/* Display image and video previews */}
											{selectedFiles?.map((item, index) => {
												if (item && typeof item === 'string') {
													// Image or video preview
													return (
														<div
															key={index}
															className='relative w-[200px] h-[200px]'>
															{item.startsWith('data:image') ? (
																<img
																	src={item}
																	alt='preview'
																	className='w-full h-full object-cover'
																/>
															) : item.startsWith('data:video') ? (
																<video
																	controls
																	className='w-full h-full object-cover'>
																	<source src={item} type='video/mp4' />
																	Your browser does not support the video tag.
																</video>
															) : null}
															<GiCancel
																size={20}
																className='absolute text-tertiary top-0 right-0 pr-1 pt-1'
																onClick={() => handleImageRemove(item)}
															/>
														</div>
													)
												}
												// Handle other file types as needed
												return null
											})}
										</div>

										{/* File Upload Input Tag  */}
										<input
											type='file'
											name='images'
											placeholder='Upload Screenshots'
											multiple
											onChange={handleImageChange}
											className='w-full p-3 shadow-inner rounded-2xl bg-gray-50 '
										/>
									</div>
								</div>
							)}
						</div>
					</div>

					<Button
						type='submit'
						color='danger'
						variant='solid'
						className='w-full px-4 py-2 mt-20 text-md rounded-xl  mb-5 md:w-2/6'>
						Submit!
					</Button>
				</form>

				<Modal
					open={selectPaymentBtn}
					onClose={() => setSelectPaymentBtn(false)}
					aria-labelledby='modal-modal-title'
					aria-describedby='modal-modal-description'>
					<div className='flex items-center justify-center h-full'>
						<PaymentMethod
							togglePaymentSelect={togglePaymentSelect}
							formData={formData}
							captionArray={captionArray}
						/>
					</div>
				</Modal>
			</div>
		</Suspense>
	)
}

export default AdBuyForm
