import { ErrorMessage, useField } from 'formik'
import React from 'react'

interface FormSelectProps {
	name: string
	label: string
	options: { id: string | number; value: string }[]
}

const FormSelect: React.FC<FormSelectProps> = ({ name, label, options }) => {
	const [field, meta, helpers] = useField(name)

	return (
		<div className=' text-left'>
			<label htmlFor={name}>{label}</label>
			<div className=''>
				<select
					{...field}
					id={name}
					className='shadow-inner h-12 p-3 bg-transparent border border-gray-200 rounded-xl w-full'>
					<option value=''>Select {label}</option>
					{options.map((option) => (
						<option key={option.id} value={option.value}>
							{option.value}
						</option>
					))}
				</select>
			</div>

			<div className='text-sm text-tertiary'>
				<ErrorMessage name={name} component='div' />
			</div>
		</div>
	)
}

export default FormSelect
