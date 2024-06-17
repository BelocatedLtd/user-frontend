import React from 'react'
import {
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	Button,
} from '@mui/material'

interface ConfirmationModalProps {
	open: boolean
	title: string
	message: string
	onClose: () => void
	onConfirm: () => void
	confirmText?: string
	cancelText?: string
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
	open,
	title,
	message,
	onClose,
	onConfirm,
	confirmText = 'Confirm',
	cancelText = 'Cancel',
}) => {
	return (
		<Dialog open={open} onClose={onClose}>
			<DialogTitle>{title}</DialogTitle>
			<DialogContent>
				<DialogContentText>{message}</DialogContentText>
			</DialogContent>
			<DialogActions>
				<Button onClick={onClose} color='primary'>
					{cancelText}
				</Button>
				<Button onClick={onConfirm} color='primary' autoFocus>
					{confirmText}
				</Button>
			</DialogActions>
		</Dialog>
	)
}

export default ConfirmationModal
