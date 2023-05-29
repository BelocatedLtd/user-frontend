import React from 'react'
import close from '../../assets/close.svg'
import facebook from '../../assets/social icons/facebook.svg'
import tiktok from '../../assets/social icons/tiktok.svg'
import { useState } from 'react'
import { useEffect } from 'react'

const AdItem = ({socialIcon, date, title, adperPostAmt, roi, adBudget, adAsset, status, adDesc, location, community, religion }) => {
    const [icon, setIcon] = useState()
    const [payBtn, setPayBtn] = useState('Pay Now')

    useEffect(() => {
        if(socialIcon == 'facebook') {
            return setIcon(facebook)
         } 
         if(socialIcon == 'tiktok') {
             return setIcon(tiktok)
          } 
    }, [])

    useEffect(() => {
        if(status == 'pending') {
            return setPayBtn('Pay Now')
            }
            if(status == 'running') {
                return setPayBtn('Monitor Campaign')
            }
            if(status == 'rejected') {
                return setPayBtn('Edit Campaign')
            }
    }, [status, payBtn])
    

  return (
    <div className='relative flex w-[95%] h-fit mt-5 mb-[2rem] bg-[#fcfcfc] p-[2rem] rounded-2xl rounded-tr-none md:p-[3rem]'>
        {/* Close icon to delete ad campaign */}
        {status == 'pending' && 
        <img src={close} alt="close" size={20} className='absolute top-[-0.4rem] right-[-0.4rem] text-tertiary w-[28px] h-[28px]' />}

        {/* Social media icon  right */}
        <div className='hidden w-[8%] md:flex'>
        <img src={icon} alt="" className='w-[60px] h-[60px]'/>
        </div>

        {/* ad details left */}
        <div className='w-[92%] flex flex-3 flex-col'>

        {/* ad details first layer */}
        <div className='flex flex-col mb-[1.5rem] border-b border-gray-100 pb-4'>
            <small className='text-gray-400 font-semibold'>{date}</small>
            <h1 className='font-bold text-lg'>{title}</h1>
            <small className='text-gray-400 font-semibold'>Pricing: ₦{adperPostAmt} per advert post</small>
        </div>

        <div className='flex justify-between'>
            <div className='flex flex-col'>
            <div className='flex flex-col'>
                <label className='font-extrabold text-[12px] text-gray-700 md:text-[14px] md:font-bold'>No. of Facebook Advert Post:</label>
                <small className='text-gray-500 font-bold'>{roi}</small> 
            </div>

            <div className='flex flex-col mt-[1rem]'>
                <label className='font-extrabold text-[12px] text-gray-700 md:text-[14px] md:font-bold'>Amount Paid:</label>
                <small className='text-gray-500 font-bold'>{adBudget}</small> 
            </div>
            </div>

            <div className='flex flex-col'>
            <div>
                <label className='font-extrabold text-[12px]  text-gray-700 mr-1 md:text-[14px] md:font-bold'>Ad Asset:</label>
                <small className='text-gray-500 font-bold'>{adAsset}</small> 
            </div>
            

            <div className=''>
                <label className='font-extrabold text-[12px] text-gray-700 mr-1 md:text-[14px] md:font-bold'>Status:</label> 
                <small className='bg-yellow-600 text-primary px-3 py-1 rounded-full'>{status}</small> 
            </div>

            <button className='bg-tertiary text-[10px] text-primary rounded-full px-6 py-2 mt-[1rem] md:text-[14px] hover:bg-secondary'>{payBtn}</button>
            </div>
        </div>


        </div>
            </div>
  )
}

export default AdItem