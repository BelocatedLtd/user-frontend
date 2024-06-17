// Import necessary modules
import React from 'react'
import loaderImg from '../../assets/loader.gif'
import Image from 'next/image'
import Modal from '@mui/material/Modal'
import Box from '@mui/material/Box'

// Style for the modal content
const style = {
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	// bgcolor: 'background.paper',
	// boxShadow: 24,
	p: 4,
}

const Loader = ({ open }) => {
	return (
		<Modal
			open={open}
			aria-labelledby='loader-modal'
			aria-describedby='loader-modal-description'>
			<Box sx={style}>
				<Image src={loaderImg} alt='loading...' />
			</Box>
		</Modal>
	)
}

export const SpinnerImg = () => {
	return (
		<div className='loader'>
			<Image src={loaderImg} alt='loading...' />
		</div>
	)
}

export default Loader
