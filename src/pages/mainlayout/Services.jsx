import React from 'react'
import adRoi from '../../assets/adRoi.svg'

const Services = () => {
  return (
    <section className='w-full h-fit'>
        <div className='container flex flex-col items-center mx-auto leading-[1.2]'>
            <h3 className='text-[#0F1741] px-6 text-[23px] md:text-[38px] mb-[5px] font-bold text-center'>Lorem Ipsum Dolor Sit Amet  Consectetur</h3>
            <h3 className='text-secondary text-[18px] mx-[1rem] w-fit md:text-[38px] mb-[1rem] text-center'>Quae Fuga Obcaecati Numquam Quidem.</h3>
            <p className='flex text-[18px] text-center mx-[1rem] w-fit md:w-[700px] text-gray-600 leading-[1.5]'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat architecto dolore vitae quos, saepe ex similique molestias, provident sunt ea soluta, nemo aspernatur.</p>

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