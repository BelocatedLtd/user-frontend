import React from 'react'
import gha from '../assets/gha.png'
import { BiCheckCircle } from 'react-icons/bi'

const MembersTab = () => {
  return (
    <section className='w-full h-fit mb-[4rem]'>
        <div className='container flex flex-col justify-center items-center gap-[5rem] mx-auto md:flex-row'>
            <div className='flex-1 flex flex-col items-center justify-center gap-3 text-center p-10 bg-gray-100 shadow-2xl mx-[1.5rem] w-fit md:w-[500px] h-[600px] rounded-2xl'>
                    <h1 className='text-3xl text-secondary font-extrabold'>Earners </h1>
                    <p className='w-full text-[20px] leading-8 font-medium text-gray-600 mt-3'>On Belocated platform, earners are those who earn money by doing tasks provided by the Belocated Platform and Advertisers on the Belocated Platform. Your earnings are accumulated in your wallet on the platform and you can start transacting with your funds</p>
                    <div className='flex flex-col gap-2'>
                      <div className='flex items-center'>                      
                        <p className='text-[12px] font-medium text-gray-800'> You can purchase data and airtime with your earnings when it is up to ₦1,000</p>
                        </div>
                      <div className='flex items-center'>
                      <p className='text-[12px] font-medium text-gray-800'> You can withdraw to your account when your earnings is up to ₦5,000</p>
                      </div>
                    </div>
                    <button onClick className='bg-tertiary text-primary font-bold px-10 py-3 mt-[2rem] rounded-full hover:bg-transparent hover:text-tertiary hover:border-tertiary hover:border'>Register Today!</button>
                    <small>See Earnings</small>
            </div>

            {/* <div className='hidden w-full h-full md:flex'><img src={gha} alt="" className='w-[500px] h-[500px] object-cover'/></div> */}

            <div className='flex-1 flex flex-col items-center justify-center gap-3 text-center p-10 bg-gray-100 shadow-2xl mx-[1.5rem] w-fit md:w-[500px] h-[600px] rounded-2xl'>
                    <h1 className='text-3xl text-secondary font-extrabold'>Advertisers </h1>
                    <p className='w-full text-[20px] leading-8 font-medium text-gray-600 mt-3'>Enjoy fast and affordable media services across all media platforms taking advantage of numerous service offers on the Belocated platform. You are regarded as an advertiser when you pay for any of our services on the Belocated Platform. <br /><br />
                    With Belocated, you get just what you desire on major media platforms
                    </p>
                    <button onClick className='bg-tertiary text-primary font-bold px-10 py-3 mt-[2rem] rounded-full hover:bg-transparent hover:text-tertiary hover:border-tertiary hover:border'>Register Today!</button>
                    <small>See Pricing</small>
            </div>
        </div>
    </section>
  )
}

export default MembersTab