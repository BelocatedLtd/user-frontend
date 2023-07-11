import React from 'react'
import { useState } from 'react';

const FAQ = () => {
    const [isActive, setIsActive] = useState(false);

  return (
    <div className='w-full h-fit'>
        <div className='container flex flex-col items-center mx-auto leading-[1.2]'>
            <div className='w-full h-full py-[5rem] mt-[5rem] flex flex-col items-center justify-center mx-auto'>
            <h3 className='text-[#0F1741] px-6 text-[30px] md:text-[38px] mb-[5px] font-bold text-center'>Frequently Asked Questions</h3>
            <p className='flex text-[18px] text-center mx-[1rem] w-fit md:w-[800px] text-gray-600 leading-[1.5]'>We reward our Clients/Advertisers with good services while upholding all our core values. As a ‘people-first’ brand, here are some carefully curated services offered by BeLocated</p>
            </div>
        </div>

        <div className='accordion'>

        </div>
    </div>
  )
}

export default FAQ