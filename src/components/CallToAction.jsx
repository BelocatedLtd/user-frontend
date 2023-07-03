import React from 'react'
import callToAction from '../assets/callToAction.svg'
import { BiArrowToRight } from 'react-icons/bi'
import { FaArrowRight } from 'react-icons/fa'
import { MdArrowRightAlt } from 'react-icons/md'

const CallToAction = () => {
  return (
    <div className='w-full h-fit'>
        <div className='container flex items-center mx-auto leading-[1.2]'>
            <div className='flex-1'>
                <img src={callToAction} alt="call to action" />
            </div>
            <div className='flex-1 w-full pr-5'>
                <h1 className='text-[18px] md:text-[40px] text-red-400 font-extrabold leading-[1.4]'>Sounds too good to be true?</h1>
                <p className='text-gray-700 font-light text-[20px] md:text-[40px] leading-[1.4]'>Sign up an let us prove you wrong</p>
                <button className='mt-[2rem]  md:w-[200px] bg-transparent border border-gray-600 px-[1rem] py-3 flex items-center justify-center gap-1 font-light rounded-2xl'>Sign Up <span><MdArrowRightAlt size={20} className='text-gray-600' /></span></button>
            </div> 
        </div>

    </div>
  )
}

export default CallToAction