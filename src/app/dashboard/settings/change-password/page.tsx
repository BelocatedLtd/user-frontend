'use client'

import FormInput from '@/components/FormInput'
import FormSubmitButton from '@/components/FormSubmitButton'
import Loader from '@/components/loader/Loader'
import { changeUserPassword } from '@/services/authServices'
import { Form, Formik } from 'formik'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'react-hot-toast'
import * as Yup from 'yup'

interface FormValues {
	oldPassword: string
	newPassword: string
	confirmNewPassword: string
}

const ChangePassword = () => {
	const router = useRouter()
	const [isLoading, setIsLoading] = useState(false)

	const initialValues: FormValues = {
		oldPassword: '',
		newPassword: '',
		confirmNewPassword: '',
	}

	const handleOnSubmit = async (values: FormValues) => {
		setIsLoading(true)

		const passwordChanged = await changeUserPassword({ ...values })

		if (!passwordChanged) {
			toast.error('Failed to changed password')
			return
		}

		if (passwordChanged) {
			toast.success('Password Changed Sucessfully')
			router.push('/dashboard')
		}
		setIsLoading(false)
	}

	const validationSchema = Yup.object().shape({
		newPassword: Yup.string().required('New password is required'),
		oldPassword: Yup.string()
			.required('New password is required')
			.min(8, 'Password must be at least 8 characters long'),
		confirmNewPassword: Yup.string()
			.required('Confirm password is required')
			.oneOf([Yup.ref('newPassword')], 'Passwords must match'),
	})

	return (
		<div className='w-full h-[70vh]'>
			<Loader open={isLoading} />

			<p className='text-lg text-left font-medium'>
				<span className='text-tertiary font-extrabold'>Set</span> New Password
			</p>

			<div className='flex flex-col justify- items- gap-4 w-full h-full  md:w-1/2'>
				<Formik
					initialValues={initialValues}
					validationSchema={validationSchema}
					onSubmit={handleOnSubmit}>
					{({ values, setFieldValue }) => (
						<Form className='space-y-4 mt-4'>
							<FormInput
								name='oldPassword'
								type='password'
								label='Old Password'
							/>
							<FormInput
								name='newPassword'
								type='password'
								label='New Password'
							/>

							<FormInput
								name='confirmNewPassword'
								type='password'
								label='Confirm New Password'
							/>

							<FormSubmitButton
								color='secondary'
								variant='solid'
								className='w-full mt-16 rounded-lg'>
								Change Password
							</FormSubmitButton>
						</Form>
					)}
				</Formik>
			</div>
		</div>
	)
}

export default ChangePassword
