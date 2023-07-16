import React from 'react'
import contactus from '../../assets/contactus.png'
import { FaFacebook, FaWhatsapp } from 'react-icons/fa'
import { BsInstagram, BsTwitter, BsYoutube } from 'react-icons/bs'
import { MdEmail } from 'react-icons/md'
import { BiPhoneCall } from 'react-icons/bi'

const Contact = () => {
  return (
    <div className='w-full h-full'>
      <div className='container h-full flex flex-col justify-center mt-[5rem] md:mt-[3rem] items-center gap-7 mx-auto md:flex-row'>
        <div className='w-full h-full flex items-center'>
          <ul className='flex flex-col pl-[2rem] gap-[2rem]'>
          <li className='flex items-center gap-2'>
              <BiPhoneCall className='text-blue-50 text-[60px] bg-blue-600 p-3 rounded-full'/>
              <div>
                <label className='font-bold text-blue-800 text-[20px]'>Phone</label>
                <p>+234 703 193 5276</p>
              </div>
            </li>
          <li className='flex items-center gap-2'>
              <FaWhatsapp className='text-green-50 text-[60px] bg-green-500 p-1 rounded-full'/>
              <div>
                <label className='font-bold text-gray-800 text-[20px]'>WhatsApp</label>
                <p>Chat on WhatsApp</p>
              </div>
            </li>
            <li className='flex items-center gap-2'>
              <FaFacebook className='text-blue-50 text-[60px] bg-blue-500 p-1 rounded-full'/>
              <div>
                <label className='font-bold text-gray-800 text-[20px]'>Facebook</label>
                <p>Belocated</p>
              </div>
            </li>
            <li className='flex items-center gap-2'>
              <BsInstagram className='text-red-50 text-[60px] bg-red-500 p-1 rounded-full'/>
              <div>
                <label className='font-bold text-gray-800 text-[20px]'>Instagram</label>
                <p>@belocated</p>
              </div>
            </li>
            <li className='flex items-center gap-2'>
              <MdEmail className='text-red-50 text-[60px] bg-red-600 p-3 rounded-full'/>
              <div>
                <label className='font-bold text-red-800 text-[20px]'>Email</label>
                <p>cs@belocated.ng</p>
              </div>
            </li>
          </ul>
        </div>

        <div className='w-full h-fit md:w-full md:h-full flex justify-center items-center'>
          <img src={contactus} alt="contact us" className='w-full h-full object-cover'/>
        </div>

        
      </div>
    </div>
  )
}

export default Contact