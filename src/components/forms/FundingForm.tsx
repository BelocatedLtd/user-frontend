import close from '@/assets/close.svg'
import { Modal } from '@mui/material'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import FundWallet from '../Modal/FundWallet'

const FundingForm = ({ onClose }: { onClose: () => void }) => {
	const dispatch = useDispatch()
	const router = useRouter()
	const [fundingAmount, setFundingAmount] = useState(0)
	console.log('🚀 ~ FundingForm ~ fundingAmount:', fundingAmount)
	const [fLWFundingModal, setFLWFundingModal] = useState(false)

	const handleInputChange = (e: any) => {
		const { value } = e.target
		setFundingAmount(value)
	}

	const toggleFLWFunding = (e: any) => {
		e.preventDefault()
		setFLWFundingModal(!fLWFundingModal)
	}

	return (
		<div className='flex flex-col justify-center items-center h-full '>
			<div className='relative  w-fit md:w-[600px] h-fit  bg-primary'>
				<Image
					src={close}
					alt='close'
					onClick={onClose}
					width={40}
					height={40}
					className='absolute cursor-pointer top-[-1rem] right-[-1rem] text-tertiary'
				/>
				<form
					onSubmit={toggleFLWFunding}
					className='flex flex-col justify-center items-center p-[4rem] gap-2'>
					<label htmlFor='fund account' className='font-bold text-sm'>
						How much would you like to fund?
					</label>
					<input
						type='number'
						name='fundingAmount'
						placeholder='Amount to fund'
						className='border border-gray-300 p-3 mb-2'
						onChange={handleInputChange}
					/>
					<button type='submit' className='bg-gray-800 text-gray-100 px-6 py-1'>
						Fund Now!
					</button>
				</form>
			</div>
			<Modal
				open={fLWFundingModal}
				onClose={() => setFLWFundingModal(false)}
				aria-labelledby='modal-modal-title'
				aria-describedby='modal-modal-description'>
				<FundWallet
					toggleFLWFunding={() => setFLWFundingModal(false)}
					fundingAmount={fundingAmount}
				/>
			</Modal>
		</div>
	)
}

export default FundingForm
