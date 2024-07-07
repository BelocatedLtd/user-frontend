import { HTMLAttributes, MouseEventHandler, ReactNode } from 'react'
import { cn } from '../../../helpers'

export interface IButtonProps extends HTMLAttributes<HTMLButtonElement> {
	onClick?: MouseEventHandler<HTMLButtonElement>
	variant?: 'solid' | 'outline' | 'text'
	color?: 'primary' | 'secondary' | 'danger' | 'gray'
	size?: 'sm' | 'lg' | 'xl'
	children: ReactNode
	rounded?: boolean
	disabled?: boolean
	type?: 'button' | 'submit' | 'reset'
}

const Button = ({
	onClick,
	variant,
	color,
	size,
	children,
	className,
	rounded,
	disabled = false,
	...props
}: IButtonProps) => {
	let buttonClasses =
		'font-bold rounded-full transition duration-300 ease-in-out'

	// Apply size classes based on the size prop
	if (size === 'sm') {
		buttonClasses += ' px-4 py-2 text-sm'
	} else if (size === 'lg') {
		buttonClasses += ' px-8 py-4 text-lg'
	} else if (size === 'xl') {
		buttonClasses += ' px-12 py-6 text-xl'
	} else {
		// Default size
		buttonClasses += ' px-6 py-3'
	}

	// Apply variant classes based on the variant prop
	if (variant === 'solid') {
		if (color === 'primary') {
			buttonClasses += ' bg-primary text-white hover:bg-primary-dark'
		} else if (color === 'secondary') {
			buttonClasses += ' bg-secondary text-primary hover:bg-secondary-dark'
		} else if (color === 'danger') {
			buttonClasses += ' bg-tertiary text-white hover:bg-tertiary-dark'
		} else if (color === 'gray') {
			// Handle 'gray' color option
			buttonClasses += ' bg-gray-500 text-white hover:bg-gray-700'
		}
	} else if (variant === 'outline') {
		if (color === 'primary') {
			buttonClasses +=
				' border border-primary text-primary hover:bg-primary hover:text-white'
		} else if (color === 'secondary') {
			buttonClasses +=
				' border border-secondary text-secondary hover:bg-secondary hover:text-white'
		} else if (color === 'danger') {
			buttonClasses +=
				' border border-tertiary text-tertiary hover:bg-tertiary hover:text-white'
		}
	} else if (variant === 'text') {
		if (color === 'primary') {
			buttonClasses += ' text-primary hover:bg-primary-light'
		} else if (color === 'secondary') {
			buttonClasses += ' text-secondary hover:bg-secondary-light'
		} else if (color === 'danger') {
			buttonClasses += ' text-tertiary hover:bg-tertiary-light'
		}
	}

	// Add disabled class if button is disabled
	if (disabled) {
		buttonClasses += ' opacity-50 cursor-not-allowed'
	}

	return (
		<button
			onClick={onClick}
			className={cn(buttonClasses, className)}
			disabled={disabled}
			{...props}>
			{children}
		</button>
	)
}

export default Button
