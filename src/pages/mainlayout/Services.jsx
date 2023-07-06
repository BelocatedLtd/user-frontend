import React from 'react'
import adRoi from '../../assets/adRoi.svg'

const Services = () => {
  return (
    <section className='w-full h-fit'>
        <div className='container flex flex-col items-center mx-auto leading-[1.2]'>
            <h3 className='text-[#0F1741] px-6 text-[23px] md:text-[38px] mb-[5px] font-bold text-center'>WITH BELOCATED, EVERYONE IS A WINNER</h3>
            <h3 className='text-secondary text-[18px] mx-[1rem] w-fit md:text-[38px] mb-[1rem] text-center'>It's all about reward!</h3>
            <p className='flex text-[18px] text-center mx-[1rem] w-fit md:w-[900px] text-gray-600 leading-[1.5]'>We reward our Clients/Advertisers with good services while upholding all our core values. But we don't stop there, we are also interested in our Earners by offering opportuinities to be rewarded for tasks performed on Belocated platform. Everyone gets more than they deserve on our platform because our users are our priority.</p>

            <div className='flex flex-col items-center gap-2 mt-[2rem] md:flex-row'>
                <div className='bg-gray-100 w-[350px] h-[400px] flex flex-col gap-2 items-center justify-center text-center shadow-2xl rounded-2xl'>
                    <div className='w-[70px] h-fit bg-gray-300 p-2 rounded-full mb-4'>
                        <img src={adRoi} alt="Advert ROI" className='w-full h-full object-cover'/>
                    </div>
                    <h2 className='text-[20px] font-[700] leading-[1.4em] px-[2rem]'>Massive ROI On Adverts</h2>
                    <p className='px-6'>Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.</p>
                </div>

                <div className='bg-gray-100 w-[350px] h-[400px] flex flex-col gap-2 items-center justify-center text-center shadow-2xl rounded-2xl'>
                    <div className='w-[70px] h-fit bg-gray-300 p-2 rounded-full mb-4'>
                        <img src={adRoi} alt="Advert ROI" className='w-full h-full object-cover'/>
                    </div>
                    <h2 className='text-[20px] font-[700] leading-[1.4em] px-[2rem]'>Affordable Pricing</h2>
                    <p className='px-6'>Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.</p>
                </div>

                <div className='bg-gray-100 w-[350px] h-[400px] flex flex-col gap-2 items-center justify-center text-center shadow-2xl rounded-2xl'>
                    <div className='w-[70px] h-fit bg-gray-300 p-2 rounded-full mb-4'>
                        <img src={adRoi} alt="Advert ROI" className='w-full h-full object-cover'/>
                    </div>
                    <h2 className='text-[20px] font-[700] leading-[1.4em] px-[2rem]'>Earn Steady Income</h2>
                    <p className='px-6'>Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.</p>
                </div>
            </div>
        </div>
    </section>
  )
}

export default Services