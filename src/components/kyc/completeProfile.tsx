import { handleUpdateUser, selectUser } from '@/redux/slices/authSlice'
import { useAppDispatch } from '@/redux/store'
import { Form, Formik } from 'formik'
import { useSelector } from 'react-redux'
import * as Yup from 'yup'
import FormInput from '../FormInput'
import FormSelect from '../FormSelect'
import FormSubmitButton from '../FormSubmitButton'
import { fetchCitiesOtpionsByState, stateOptions } from '../data/NigeriaData'

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
		phone: Yup.string()
			.required('Phone is required')
			.min(11, 'Phone must be 11 digits long')
			.matches(/^(07|08|09)/, 'Kindly input correct phone number.'),

		state: Yup.string().required('State is required'),
		lga: Yup.string().required('LGA is required'),
		gender: Yup.string().required('Gender is required'),
		religion: Yup.string().required('Religion is required'),
	})

	const initialValues: FormValues = {
		fullname: user?.fullname || '',
		phone: user?.phone || '',
		state: user?.state || '',
		lga: user?.lga || '',
		gender: user?.gender || '',
		religion: user?.religion || '',
	}

	const handleSubmit = async (values: FormValues) => {
		console.log('🚀 ~ CompleteProfile ~ values:', values)
		dispatch(handleUpdateUser(values) as any)
			.then((res: any) => {
				if (res?.meta?.requestStatus === 'fulfilled') {
					next()
				}
			})
			.catch((error: any) => {
				console.error('Error occurred during dispatch:', error)
			})
	}

	const genderOptions = [
		{ id: 'Male', value: 'Male' },
		{ id: 'Female', value: 'Female' },
	]

	// const religionOption = [
	// 	{ id: 'Christianity', value: 'Christianity' },
	// 	{ id: 'Islam', value: 'Islam' },
	// 	{ id: 'Other', value: 'Other' },
	// ]

	return (
		<div className=''>
			<p className='text-lg text-left font-medium'>Complete Your Profile</p>
			<Formik
				initialValues={initialValues}
				validationSchema={validationSchema}
				onSubmit={handleSubmit}>
				{({ values, setFieldValue }) => (
					<Form className='mt-4'>
						<div className='grid grid-cols-2 gap-4'>
							<FormInput name='fullname' label='Fullname' />
							<FormInput name='phone' label='Phone Number' />

							<FormSelect
								name='state'
								label='State of Residence
							'
								options={stateOptions}
							/>
							<FormSelect
								name='lga'
								label='LGA of Residence'
								options={
									fetchCitiesOtpionsByState(values.state as any) || [
										{ id: '', value: '' },
									]
								}
							/>

							<FormSelect
								name='gender'
								containerClassName='col-span-2'
								label='Gender'
								options={genderOptions}
							/>
							{/* <FormSelect
								name='religion'
								label='Religion'
								options={religionOption}
							/> */}
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
