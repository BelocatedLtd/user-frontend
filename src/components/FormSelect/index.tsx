import { ErrorMessage, useField } from 'formik'
import React, { ComponentProps } from 'react'
import { cn } from '../../../helpers'

interface FormSelectProps {
	name: string
	label: string
	options: { id: string | number; value: string }[]
	className?: ComponentProps<'div'>['className']
	containerClassName?: ComponentProps<'div'>['className']
}

const FormSelect: React.FC<FormSelectProps> = ({
	name,
	label,
	options,
	className,
	containerClassName,
}) => {
	console.log('🚀 ~ className:', className)
	const [field, meta, helpers] = useField(name)

	return (
		<div className={cn('text-left', containerClassName)}>
			<label className='' htmlFor={name}>
				{label}
			</label>
			<div className=''>
				<select
					{...field}
					id={name}
					className={cn(
						'shadow-inner h-12 p-3 bg-transparent border border-gray-200 rounded-xl w-full',
						className,
					)}>
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
