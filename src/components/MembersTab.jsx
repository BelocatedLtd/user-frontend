import React from 'react'
import Register from '../pages/authLayout/Register'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectUser } from '../redux/slices/authSlice'
import earners from '../assets/earners.png'
import advertisers from '../assets/advertisers.png'
import Button from './Button'

const MembersTab = ({ handleRegister, regBtn }) => {
	const navigate = useNavigate()
	const user = useSelector(selectUser)
	return (
		<section className='w-full h-full mt-20 '>
			{regBtn && <Register handleRegister={handleRegister} regBtn={regBtn} />}
			<div className='flex flex-col items-center justify-center'>
				<div className='flex flex-col md:flex-row md:items-center justify-center mx-[1.5rem] my-10 md:w-[90%] bg-red-3 md:h-[600px]'>
					<div className='md:w-1/2'>
						<h1 className='text-4xl text-gray-600 font-black'>Earners</h1>
						<div className='mt-3'>
							<p className='w-full text-gray-600'>
								On Belocated platform, earners are those who earn money by doing
								tasks provided by the Belocated Platform and Advertisers on the
								Belocated Platform. Your earnings are accumulated in your wallet
								on the platform and you can start transacting with your funds
							</p>
							<ol className='list-disc mt-3'>
								<li>
									You can purchase data and airtime with your earnings when it
									is up to ₦1,000
								</li>
								<li>
									You can withdraw to your account when your earnings is up to
									₦5,000
								</li>
							</ol>
							<Button
								size={'sm'}
								onClick={() => null}
								className='mt-4'
								variant='solid'>
								Start Earning!
							</Button>
						</div>
					</div>
					<img
						src={earners}
						alt='earners'
						className='w-full h-full object-contain mt-10'
					/>
					{/* <ShowOnLogout>
							<button
								onClick={handleRegister}
								className='bg-tertiary text-primary font-bold px-10 py-3 mt-[2rem] rounded-full hover:bg-transparent hover:text-tertiary hover:border-tertiary hover:border'>
								Start Earning!
							</button>
						</ShowOnLogout>
						<ShowOnLogin>
							<button
								onClick={() => navigate(`/dashboard/${user?.username}`)}
								className='bg-tertiary text-primary font-bold px-10 py-3 mt-[2rem] rounded-full hover:bg-transparent hover:text-tertiary hover:border-tertiary hover:border'>
								Start Earning!
							</button>
						</ShowOnLogin> */}
				</div>
				<div className='flex flex-col-reverse md:flex-row md:items-center md:text-right justify-center  mx-[1.5rem] w-[90%] bg-red-3 md:h-[600px]'>
					<img
						src={advertisers}
						alt='Advertisers'
						className='w-full h-full object-contain mt-10 md:mt-0'
					/>
					<div className='md:w-1/2 mt-6'>
						<h1 className='text-4xl text-gray-600 font-black'>Advertisers </h1>
						<p className='w-full text-gray-600 mt-3'>
							Enjoy fast and affordable media services across all media
							platforms taking advantage of numerous service offers on the
							Belocated platform. You are regarded as an advertiser when you pay
							for any of our services on the Belocated Platform.
						</p>
						<p className='w-full text-sm text-tertiary mt-2'>
							With Belocated, you get just what you desire on major media
							platforms
						</p>
						<Button
							size={'sm'}
							onClick={() => null}
							className='mt-4'
							variant='solid'>
							Start Advertising!
						</Button>
					</div>

					{/* <ShowOnLogout>
							<button
								onClick={handleRegister}
								className='bg-tertiary text-primary font-bold px-10 py-3 mt-[2rem] rounded-full hover:bg-transparent hover:text-tertiary hover:border-tertiary hover:border'>
								Start Earning!
							</button>
						</ShowOnLogout>
						<ShowOnLogin>
							<button
								onClick={() => navigate(`/dashboard/${user?.username}`)}
								className='bg-tertiary text-primary font-bold px-10 py-3 mt-[2rem] rounded-full hover:bg-transparent hover:text-tertiary hover:border-tertiary hover:border'>
								Start Earning!
							</button>
						</ShowOnLogin> */}
				</div>
			</div>
		</section>
	)
}

export default MembersTab
