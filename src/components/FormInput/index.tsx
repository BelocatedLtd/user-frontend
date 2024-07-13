import { ErrorMessage, Field, useFormikContext } from 'formik'
import React from 'react'

interface FormInputProps {
	name: string
	label: string
	type?: string
	placeholder?: string
}

const FormInput: React.FC<FormInputProps> = ({
	name,
	label,
	type = 'text',
	placeholder,
}) => {
	const formik = useFormikContext() // Access Formik context

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		let value = event.target.value

		if (name === 'phone') {
			value = value.replace(/\D/g, '')
			value = value.slice(0, 11)
		}

		formik.setFieldValue(name, value) // Use setFieldValue from useFormikContext
	}

	return (
		<div className='text-left'>
			<label htmlFor={name}>{label}</label>
			<div>
				<Field
					className='border w-full rounded-lg h-10 px-2'
					type={type}
					name={name}
					placeholder={placeholder}
					onChange={handleChange} // Pass handleChange directly to onChange
				/>
			</div>

			<div className='text-sm text-tertiary '>
				<ErrorMessage name={name} component='div' />
			</div>
		</div>
	)
}

export default FormInput
