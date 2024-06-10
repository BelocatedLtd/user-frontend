import React from 'react'
import * as Yup from 'yup'
import { Formik, Form, Field } from 'formik'
import { SET_USER, selectUser } from '@/redux/slices/authSlice'
import { useSelector } from 'react-redux'
import FormInput from '../FormInput'
import Button from '../Button'
import FormSubmitButton from '../FormSubmitButton'
import { updateUserBankAccountDetails } from '@/services/authServices'
import toast from 'react-hot-toast'
import { useAppDispatch } from '@/redux/store'
import { useRouter } from 'next/navigation'

interface FormValues {
	bankName: string
	bankAccountNumber: string
	accountHolderName: string
}

export default function AddBank({ next }: { next: () => void }) {
	const user = useSelector(selectUser)
	console.log('🚀 ~ AddBank ~ user:', user)

	const router = useRouter()

	const dispatch = useAppDispatch()

	const validationSchema = Yup.object().shape({
		bankName: Yup.string().required('Bank name is required'),
		bankAccountNumber: Yup.string().required('Account number is required'),
		accountHolderName: Yup.string().required('Account name is required'),
	})

	const initialValues: FormValues = {
		bankName: user?.bankName || '',
		bankAccountNumber: user?.bankAccountNumber || '',
		accountHolderName: user?.accountHolderName || '',
	}

	const handleSubmit = async (values: FormValues) => {
		console.log('🚀 ~ handleSubmit ~ values:', values)

		const updatedUserDetails = await updateUserBankAccountDetails({
			...values,
			userId: user?.id || user?._id,
		})

		if (!updatedUserDetails) {
			toast.error('Failed to update Bank Details')
			return
		}

		if (updatedUserDetails) {
			dispatch(SET_USER(updatedUserDetails))

			next()

			toast.success('User Account Details Updated!')
		}
	}

	return (
		<div className=''>
			<p className='text-lg text-left font-medium'>Add Bank Details</p>
			<Formik
				initialValues={initialValues}
				// validationSchema={validationSchema}
				onSubmit={handleSubmit}>
				{() => (
					<Form className='mt-4'>
						<FormInput name='bankName' label='Bank Name' />
						<div className='grid grid-cols-2 gap-4 mt-4'>
							<FormInput name='accountHolderName' label='Account Name' />
							<FormInput name='bankAccountNumber' label='Account Number' />
						</div>

						<FormSubmitButton
							color='secondary'
							variant='solid'
							className='w-full mt-10 rounded-lg'>
							Submit
						</FormSubmitButton>
					</Form>
				)}
			</Formik>
		</div>
	)
}
