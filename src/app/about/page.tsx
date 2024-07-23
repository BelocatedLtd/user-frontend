'use client'

import { ShowOnLogin, ShowOnLogout } from '@/components/protect/hiddenLinks'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Suspense } from 'react'
import adRoi from '../../assets/adRoi.svg'
import refd from '../../assets/refd.svg'
// import Register from '../../../(auth)/Register'

const About = () => {
	const router = useRouter()
	return (
		<Suspense>
			<div className='w-full h-fit'>
				{/* {regBtn && <Register handleRegister={handleRegister} regBtn={regBtn} />} */}
				<div className='container h-full flex flex-col justify-center gap-7 mx-auto'>
					{/* Who we are */}
					<div className='flex flex-col h-full items-center justify-center mx-auto md:flex-row'>
						<div className='flex-1 flex w-full h-full flex-col mt-[3rem] px-[2rem] py-[4rem] gap-3'>
							<div className='flex items-center gap-2'>
								<h1 className='text-3xl text-gray-800 font-extrabold border-l-4 px-4 border-red-400'>
									Who We Are
								</h1>
							</div>
							<p className='w-full text-[20px] leading-8 text-gray-600 mt-3'>
								Belocated is an enterprising publicity and media service
								provider across industries. We are a revolutionizing team of
								people dedicated to providing solutions to your publicity and
								media challenges
							</p>
						</div>

						<div className='flex-1 w-full h-full flex justify-center mt-[3rem]'>
							<Image
								src={refd}
								alt='pic reprentation'
								className='w-[300px] h-[300px]'
							/>
						</div>
					</div>

					{/* Vision Mission */}
					<div className='mt-[5rem]'>
						<div className='flex flex-col items-center justify-center gap-[5rem] mt-[2rem] md:flex-row'>
							<div className='bg-transparent w-fit md:w-[450px] h-[450px] flex flex-col gap-2 items-center justify-center text-center '>
								<h2 className='text-[20px] font-[700] leading-[1.4em]  border-b-4 border-red-400 '>
									VISION
								</h2>
								<p className='px-6'>
									The belocated team is made up of highly determined and vision
									oriented group of individuals who are dedicated to providing
									solutions to publicity and media challenges while providing
									earning opportunities to all users.
								</p>
							</div>

							<div className='bg-transparent w-fit md:w-[450px] h-[450px] flex flex-col gap-2 items-center justify-center text-center '>
								<h2 className='text-[20px] font-[700] leading-[1.4em] border-b-4 border-red-400'>
									MISSION
								</h2>
								<p className='px-6'>
									BeLocated is a people driven organization passionate about
									solving the one major problem of businesses and brands;
									visibility. We partner with our clients by giving them a
									platform to be seen and with visibility comes the needed
									sales.
								</p>
							</div>
						</div>
					</div>

					{/* Core Values */}
					<div className='w-full h-fit flex flex-col mt-[5rem] px-[2rem]'>
						<div className='flex items-center gap-2 mb-6'>
							<h1 className='text-3xl text-gray-800 font-extrabold border-l-4 px-4 border-red-400'>
								Our Core Values
							</h1>
						</div>

						<div className='flex '>
							<ul className='grid md:grid-cols-4 gap-[3rem]'>
								<li className='w-full'>
									<h3 className='text-gray-700 text-[18px] my-[0.8rem] font-bold'>
										People First:
									</h3>
									<p className='w-fit '>
										Every product and service offered is inspired by the diverse
										needs of people. Having understood the struggles of new and
										existing businesses or brands with getting the needed
										publicity for their products, BeLocated is committed to
										solving these problems at all cost
									</p>
								</li>

								<li className='w-full'>
									<h3 className='text-gray-700 text-[18px] my-[0.8rem] font-bold'>
										Dependability:
									</h3>
									<p className='w-fit'>
										We take pride in the process and structures we have put in
										place to make us a highly dependable brand. Say no to
										unpredictable ads and poor-quality jobs. With BeLocated,
										quality is guaranteed.
									</p>
								</li>

								<li className='w-full'>
									<h3 className='text-gray-700 text-[18px] my-[0.8rem] font-bold'>
										Creativity:
									</h3>
									<p className='w-fit'>
										We do not just ‘think outside the box’ we are a brand that
										exist outside the ‘box’ because there is no limit to our
										learning and birthing new ideas to serve you better.
									</p>
								</li>

								<li className='w-full'>
									<h3 className='text-gray-700 text-[18px] my-[0.8rem] font-bold'>
										Integrity:
									</h3>
									<p className='w-fit'>
										We are guided by a strict standard of honesty and probity
										which makes us a trusted organization.
									</p>
								</li>
							</ul>
						</div>
					</div>

					<div className='my-[10rem]'>
						<h2 className='text-gray-600 px-6 text-[23px] md:text-2xl mb-[5px] font-bold text-center w-fit'>
							Across all media platforms, BeLocated drives the necessary{' '}
							<span className='text-red-500'>
								traffic, likes, followers, product review, comments and clicks
							</span>{' '}
							you need to take your business, product or brand to the next
							level.
						</h2>
						<h3 className='text-secondary text-[18px] mx-[1rem] w-fit md:text-4xl mb-[1rem] text-center'>
							We are a brand that does the unusual and so we stay outside the
							box to give our clients the very best services.
						</h3>
					</div>

					{/* what we do */}
					<div className='flex flex-col mt-[5rem]'>
						<div className='flex items-center gap-2 ml-[2rem]'>
							<h1 className='text-3xl text-gray-800 font-extrabold border-l-4 px-4 border-red-400'>
								What We Do
							</h1>
						</div>

						<div className='flex flex-col w-full items-center gap-2 mt-[2rem] md:flex-row'>
							<div className='bg-gray-100 w-fit md:w-[450px] h-[500px] mx-[1rem] flex flex-col gap-2 items-center justify-center text-center  rounded-2xl'>
								<div className='w-[70px] h-fit bg-gray-300 p-2 rounded-full mb-4'>
									<Image
										src={adRoi}
										alt='Advert ROI'
										className='w-full h-full object-cover'
									/>
								</div>
								<h2 className='text-[20px] font-[700] leading-[1.4em] px-[2rem]'>
									Locate Your Business
								</h2>
								<p className='px-6 text-center'>
									In today's connected world, having a visible presence is
									crucial for businesses. BeLocated helps you: Access countless
									business and earning Opportunities.
								</p>

								<button
									onClick={() => router.push('/services')}
									className='bg-red-400 text-primary px-4 py-2 mt-3'>
									Services
								</button>
							</div>

							<div className='bg-gray-100 w-fit md:w-[450px] h-[500px] mx-[1rem] flex flex-col gap-2 items-center justify-center text-center rounded-2xl'>
								<div className='w-[70px] h-fit bg-gray-300 p-2 rounded-full mb-4'>
									<Image
										src={adRoi}
										alt='Advert ROI'
										className='w-full h-full object-cover'
									/>
								</div>
								<h2 className='text-[20px] font-[700] leading-[1.4em] px-[2rem]'>
									Increase Your Business{' '}
								</h2>
								<p className='px-6 text-center'>
									Boost your business visibility with Belocated’s tailored
									publicity plans. We offer affordable packages for any budget,
									ensuring your brand gets noticed.
								</p>

								<button
									onClick={() => router.push('/services')}
									className='bg-red-400 text-primary px-4 py-2 mt-3'>
									Services
								</button>
							</div>

							<div className='bg-gray-100 w-fit md:w-[450px] h-[500px] mx-[1rem] flex flex-col gap-2 items-center justify-center text-center  roundedP-2xl'>
								<div className='w-[70px] h-fit bg-gray-300 p-2 rounded-full mb-4'>
									<Image
										src={adRoi}
										alt='Advert ROI'
										className='w-full h-full object-cover'
									/>
								</div>
								<h2 className='text-[20px] font-[700] leading-[1.4em] px-[2rem]'>
									Earn Steady Income
								</h2>
								<p className='px-6 text-center'>
									Belocated rewards you for every transaction. Clients get
									guaranteed returns, visible results, and quality service.
									Users earn for every task. With Belocated, everyone wins!
								</p>

								<ShowOnLogout>
									<button
										// onClick={handleRegister}
										className='bg-red-400 text-primary px-8 py-2 mt-3'>
										Earn
									</button>
								</ShowOnLogout>
								<ShowOnLogin>
									<button
										onClick={() => router.push('/dashboard/earn')}
										className='bg-red-400 text-primary px-4 py-2 mt-3'>
										Earn
									</button>
								</ShowOnLogin>
							</div>
						</div>
					</div>
				</div>
			</div>
		</Suspense>
	)
}

export default About
