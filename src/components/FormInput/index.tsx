import React from 'react'
import { Field, ErrorMessage } from 'formik'

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
	return (
		<div className=' text-left'>
			<label htmlFor={name}>{label}</label>
			<div className=''>
				<Field
					className='border w-full rounded-lg h-10 px-2'
					type={type}
					name={name}
					placeholder={placeholder}
				/>
			</div>

			<div className='text-sm text-tertiary'>
				<ErrorMessage name={name} component='div' />
			</div>
		</div>
	)
}

export default FormInput
