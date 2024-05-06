import React from 'react'
import callToAction from '../assets/callToAction.svg'
import { BiArrowToRight } from 'react-icons/bi'
import { FaArrowRight } from 'react-icons/fa'
import { MdArrowRightAlt } from 'react-icons/md'
import Register from '../pages/authLayout/Register'
import { ShowOnLogin, ShowOnLogout } from './protect/hiddenLinks'
import { useSelector } from 'react-redux'
import { selectUser } from '../redux/slices/authSlice'
import { useNavigate } from 'react-router-dom'
import sectionBg from '../assets/section-bg.png'
import Button from './Button'

const CallToAction = ({ handleRegister, regBtn }) => {
	const user = useSelector(selectUser)
	const navigate = useNavigate()

	return (
		<div
			className='w-full h-[70%] bg-cover bg-center flex items-center justify-center '
			style={{
				// backgroundImage: `url(${sectionBg})}`,
				backgroundImage: 'url(' + sectionBg + ')',
				backgroundPosition: 'center',
				backgroundSize: 'cover',
				backgroundRepeat: 'no-repeat',
			}}>
			<div className=''>
				{regBtn && <Register handleRegister={handleRegister} regBtn={regBtn} />}

				<div className='flex items-center justify-center '>
					<h3 className='text-center  font-extrabold border-l-4 px-4 border-red-400 '>
						Get Onboard
					</h3>
				</div>

				<div className='container flex text-center justify-center mx-auto px-[2rem]  leading-[1.2] mb-[3rem] mt-[1rem]'>
					<div className='flex-1 w-full pr-5'>
						<h1 className='text-[18px] md:text-[40px]  font-black leading-[1.4]'>
							Earners and advertisers,
							<br /> BeLocated offers rewards and <br /> affordable advertising
							with guaranteed ROI
						</h1>

						<ShowOnLogout>
							<Button
								size={'sm'}
								onClick={() => null}
								className='w-40 flex items-center mx-auto justify-center mt-[2rem]'
								variant='outline'>
								Join us Now!
								<span>
									<MdArrowRightAlt
										size={20}
										className='text-secondary ml-2 mt-1'
									/>
								</span>
							</Button>
						</ShowOnLogout>
					</div>
				</div>
			</div>
		</div>
	)
}

export default CallToAction
