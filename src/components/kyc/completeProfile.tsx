import { handleUpdateUser, selectUser } from '@/redux/slices/authSlice'
import { useAppDispatch } from '@/redux/store'
import { Form, Formik } from 'formik'
import { useSelector } from 'react-redux'
import * as Yup from 'yup'
import FormInput from '../FormInput'
import FormSubmitButton from '../FormSubmitButton'

interface FormValues {
	fullname: string
	phone: string
	state: string
	lga: string
	gender: string
	religion: string
}

export default function CompleteProfile({ next }: { next: () => void }) {
	const user = useSelector(selectUser)
	console.log('🚀 ~ CompleteProfile ~ user:', user)

	const dispatch = useAppDispatch()

	const validationSchema = Yup.object().shape({
		fullname: Yup.string().required('Fullname is required'),
		phone: Yup.string().required('phone is required'),
		state: Yup.string().required('state is required'),
		lga: Yup.string().required('lga is required'),
		gender: Yup.string().required('Gender is required'),
		religion: Yup.string().required('Religion is required'),
	})

	const initialValues: FormValues = {
		fullname: user?.fullname || '',
		phone: user?.phone || '',
		lga: user?.location || '',
		state: user?.community || '',
		gender: user?.gender || '',
		religion: user?.religion || '',
	}

	const handleSubmit = async (values: FormValues) => {
		console.log('🚀 ~ CompleteProfile ~ values:', values)
		dispatch(handleUpdateUser(values) as any)
			.then((res: any) => {
				if (res?.meta?.requestStatus == 'fulfilled') {
					next()
				}
				console.log('🚀 ~ .then ~ res:', res)
			})
			.catch((error: any) => {
				console.error('Error occurred during dispatch:', error)
			})
	}

	return (
		<div className=''>
			<p className='text-lg text-left font-medium'>Complete Your Profile</p>
			<Formik
				initialValues={initialValues}
				validationSchema={validationSchema}
				onSubmit={handleSubmit}>
				{() => (
					<Form className='mt-4'>
						<div className='grid grid-cols-2 gap-4'>
							<FormInput name='fullname' label='Fullname' />
							<FormInput name='phone' label='Phone Number' />
							<FormInput name='state' label='Residential State' />
							<FormInput name='lga' label='Residential LGA' />
							<FormInput name='gender' label='Gender' />
							<FormInput name='religion' label='Religion' />
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
