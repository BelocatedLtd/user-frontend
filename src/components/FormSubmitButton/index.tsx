import { useFormikContext } from 'formik'
import React from 'react'
import Button, { IButtonProps } from '../Button'

interface FormSubmitButtonProps extends IButtonProps {
	children: React.ReactNode
}

const FormSubmitButton: React.FC<FormSubmitButtonProps> = ({
	children,
	...props
}) => {
	const { isSubmitting, isValid, dirty } = useFormikContext()

	return (
		<Button
			type='submit'
			disabled={isSubmitting || !isValid || !dirty}
			{...props}>
			{children}
		</Button>
	)
}

export default FormSubmitButton
