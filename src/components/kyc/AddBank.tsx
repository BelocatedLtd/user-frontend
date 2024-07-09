import { SET_USER, selectUser } from '@/redux/slices/authSlice'
import { useAppDispatch } from '@/redux/store'
import { updateUserBankAccountDetails } from '@/services/authServices'
import { Form, Formik } from 'formik'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { useSelector } from 'react-redux'
import * as Yup from 'yup'
import FormInput from '../FormInput'
import FormSubmitButton from '../FormSubmitButton'

interface FormValues {
	bankName: string
	bankAccountNumber: string
	accountHolderName: string
}

export default function AddBank({ next }: { next: () => void }) {
	const user = useSelector(selectUser)

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
		if (user?.id) {
			const updatedUserDetails = await updateUserBankAccountDetails({
				...values,
				userId: user?.id,
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
	}

	return (
		<div className=''>
			<p className='text-lg text-left font-medium'>Add Bank Details</p>
			<Formik
				initialValues={initialValues}
				validationSchema={validationSchema}
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
