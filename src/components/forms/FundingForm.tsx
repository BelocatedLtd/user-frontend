import close from '@/assets/close.svg'
import { selectUser } from '@/redux/slices/authSlice'
import { Modal } from '@mui/material'
import Image from 'next/image'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import FundWallet from '../Modal/FundWallet'

const FundingForm = ({ onClose }: { onClose: () => void }) => {
	const [fundingAmount, setFundingAmount] = useState(0)
	const [fLWFundingModal, setFLWFundingModal] = useState(false)

	const user = useSelector(selectUser)
	const dispatch = useDispatch()

	const handleInputChange = (e: any) => {
		const { value } = e.target
		const numericValue = parseFloat(value); // Convert string to number
    if (!isNaN(numericValue)) {
      setFundingAmount(numericValue); // Update state only if valid number
    } else {
      setFundingAmount(0); // Reset to 0 if input is invalid
    }
	}

	const toggleFLWFunding = async (e: any) => {
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
					toggleFLWFunding={() => {
						setFLWFundingModal(false)
						onClose()
					}}
					fundingAmount={fundingAmount}
				/>
			</Modal>
		</div>
	)
}

export default FundingForm
