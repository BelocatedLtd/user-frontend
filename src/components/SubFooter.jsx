import React from 'react'
import { AiOutlineHolder } from 'react-icons/ai'
import { BsFillTelephoneFill } from 'react-icons/bs'
import { MdOutlineEmail, MdLocationPin } from 'react-icons/md'
import { RxDoubleArrowRight } from 'react-icons/rx'
import { Link, useNavigate } from 'react-router-dom'
import facebook from '../assets/facebook.svg'
import twitter from '../assets/twitter.svg'
import instagram from '../assets/instagram.svg'
import whatsapp from '../assets/whatsapp.svg'
import logo from '../assets/belocated-logo.png'
import {
	FaFacebookSquare,
	FaInstagramSquare,
	FaTelegram,
	FaTelegramPlane,
	FaTwitterSquare,
	FaWhatsappSquare,
} from 'react-icons/fa'

const SubFooter = () => {
	const navigate = useNavigate()

	return (
		<section className='h-[70%] text-primary bg-gray-800'>
			<div className='container h-full  mx-auto '>
				<div className='flex  justify-between items-center gap-2 py-8 '>
					<img src={logo} alt='logo' width={150} className=' object-cover' />
					<div className='flex gap-4 mr-4'>
						<Link
							to={'https://www.facebook.com/belocatedng'}
							target='_blank'
							rel='noopener noreferrer'>
							<FaFacebookSquare size='24' />
						</Link>
						<Link
							to={'https://twitter.com/belocatedng'}
							target='_blank'
							rel='noopener noreferrer'>
							<FaTwitterSquare size='24' className='hover:cursor-pointer' />
						</Link>
						<Link
							to={'https://www.whatsapp.com/channel/0029Va7JRtyEVccRNhgObL3E'}
							target='_blank'
							rel='noopener noreferrer'>
							<FaWhatsappSquare size='24' className='hover:cursor-pointer' />
						</Link>
						<Link
							to={'https://instagram.com/belocatedng'}
							target='_blank'
							rel='noopener noreferrer'>
							<FaInstagramSquare size='24' className='hover:cursor-pointer' />
						</Link>
						<Link
							to={'https://t.me/belocated'}
							target='_blank'
							rel='noopener noreferrer'>
							<span className='bg-primary w-[22px] hover:cursor-pointer rounded-sm h-[22px] flex items-center justify-center '>
								<FaTelegramPlane color='black' />
							</span>
						</Link>
					</div>
				</div>
				<hr className='border-primary-border opacity-20' />

				<div className='container  flex flex-col px-3 md:px-0 justify-between mx-auto pt-[3rem] pb-[3rem] md:flex-row'>
					<div className='w-full text-gray-600 md:flex md:flex-col'>
						<div className='text-lg text-primary md:w-[40%]' key='category.id'>
							<p className='flex items-center gap-1'>
								Belocated is an enterprising publicity and media service
								provider across industries
							</p>
						</div>
					</div>
					<div className='flex md:gap-36 mt-10  bg-red-'>
						<div className='w-full  text-primary'>
							<div className='flex items-center gap-2 mb-6'>
								<h1 className='text-xl text-primary-light'>Important Links</h1>
								<AiOutlineHolder className='rotate-90 text-2xl text-tertiary mt-1' />
							</div>
							<ul className='flex flex-col text-xs md:text-sm gap-2'>
								<li>Create account</li>
								<li>How it Works</li>
								<li>Legal</li>
								<li>Blog Posts</li>
							</ul>
						</div>

						<div className='w-full  text-primary'>
							<div className='flex items-center gap-2 mb-6'>
								<h1 className='text-xl text-primary-light'>Our Company</h1>
								<AiOutlineHolder className='rotate-90 text-2xl text-tertiary mt-1' />
							</div>
							<ul className='flex flex-col gap-2 text-xs md:text-sm'>
								<li>Sitemap</li>
								<li>About Us</li>
								<li>Terms of Service</li>
								<li>Privacy Policy</li>
								<li>Team</li>
							</ul>
						</div>

						<div className='w-full text-primary'>
							<div className='flex items-center gap-2 mb-6'>
								<h1 className='text-xl text-primary-light'>Support</h1>
								<AiOutlineHolder className='rotate-90 text-2xl text-tertiary mt-1' />
							</div>
							<ul className='flex flex-col gap-3 text-xs md:text-sm'>
								<li>Help Center</li>
								<li>Top Partners</li>
								<li>Help & FAQs</li>
								<li className='flex items-center gap-2'>
									<BsFillTelephoneFill className='text-tertiary border border-tertiary rounded-full p-1 text-2xl' />{' '}
									+234 703 193 5276
								</li>
								<li className='flex items-center gap-2'>
									<MdOutlineEmail className='text-tertiary border border-tertiary rounded-full p-1 text-2xl' />
									cs@belocated.ng
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}

export default SubFooter
