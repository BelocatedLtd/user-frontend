import React, { MouseEventHandler, ReactNode } from 'react'
import { cn } from '../../../helpers'

interface ButtonProps {
	onClick: MouseEventHandler<HTMLButtonElement>
	variant?: 'solid' | 'outline' | 'text'
	size?: 'sm' | 'lg' | 'xl'
	children: ReactNode
	className?: string
	rounded?: boolean
}

const Button = ({
	onClick,
	variant,
	size,
	children,
	className,
	rounded,
}: ButtonProps) => {
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
		buttonClasses += `bg-secondary text-primary hover:bg-transparent hover:text-secondary hover:border-secondary hover:border rounded-${rounded}`
	} else if (variant === 'outline') {
		buttonClasses +=
			' border border-secondary text-secondary hover:bg-secondary hover:text-primary'
	} else if (variant === 'text') {
		buttonClasses += ' text-secondary hover:text-primary'
	} else if (variant === 'danger') {
		buttonClasses +=
			' border border-tertiary text-white hover:bg-white hover:text-tertiary'
	}

	return (
		<button onClick={onClick} className={cn(buttonClasses, className)}>
			{children}
		</button>
	)
}

export default Button
