import React from 'react'
import loaderImg from '../../assets/loader.gif'
import Image from 'next/image'

const Loader = () => {
	return (
		<div className='wrapper'>
			<div className='loader'>
				<Image src={loaderImg} alt='loading...' />
			</div>
		</div>
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
