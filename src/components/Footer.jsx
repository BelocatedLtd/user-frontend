import React from 'react'
import { Link } from 'react-router-dom'
import twitter from '../assets/social icons/twitter.png'
import facebook from '../assets/social icons/facebook.svg'

const Footer = () => {
	return (
		<section className=' w-full    bg-gray-800  md:flex'>
			<footer className=' w-full flex-col justify-center container text-center items-center mx-auto text-gray-200 py-6 '>
				<hr className='border-primary-border opacity-20' />

				<div className='w-full py-10  '>
					<div>
						<p>&copy; 2023 Belocated - All Rights Reserved</p>
					</div>
				</div>
			</footer>
		</section>
	)
}

export default Footer
