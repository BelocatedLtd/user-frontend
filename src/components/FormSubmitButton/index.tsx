import React from 'react'
import { useFormikContext } from 'formik'
import Button, { IButtonProps } from '../Button'

interface FormSubmitButtonProps extends IButtonProps {
	children: React.ReactNode
}

const FormSubmitButton: React.FC<FormSubmitButtonProps> = ({
	children,
	...props
}) => {
	const { isSubmitting, isValid } = useFormikContext()

	return (
		<Button type='submit' disabled={isSubmitting || !isValid} {...props}>
			{children}
		</Button>
	)
}

export default FormSubmitButton
