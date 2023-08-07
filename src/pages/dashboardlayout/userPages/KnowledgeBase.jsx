import React from 'react'
import { FaAngleDoubleRight, FaEnvelope, FaTelegram, FaWhatsapp } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const KnowledgeBase = () => {
  return (
    <section className='w-full h-fit'>
        <div className='container mt-[2rem] md:px-[1rem]'>
            <div className='text__area w-full h-fit px-1 py-1'>
                <h2 className='font-extrabold text-xl md:text-2xl'>How it works</h2>

                <ul className='w-full flex flex-col gap-[1rem] my-2 border-b border-gray-200 pb-[2rem]'>
                    <li>- Once you are logged in, right on your dashboard you will see the icon earn and Advertise right under your wallet and available balance. </li>
                    <li>- Once you click earn or advertise, you will be required to verify your phone number and then fill out your profile details.</li>
                    <li>- Clicking the earn and advertise icon again after verifying your phone number and updating your profile, you will then gain access full access to earn and to advertise.</li>
                </ul>

                <h3 className='font-extrabold text-lg md:text-xl text-gray-700 mt-[1.5rem]'>Earn</h3>
                
                <ul className='w-full flex flex-col gap-[1rem] my-2 border-b border-gray-200 pb-[2rem]'>
                    <li>- When you click earn you are required to do two free task every week (the seven days of the week starts counting on a Sunday. You can see the free task countdown on your dash board) to gain access to the numerous paid task. Ensure you scroll through to scroll through all the listings until you see available tasks. Click on it to perform task. </li>
                    <li>- You can only withdraw when you have an accumulation of 1000 naira (withdrawal as airtime) and 5000 (withdrawal as cash). </li>
                </ul>


                <h3 className='font-extrabold text-lg md:text-xl text-gray-700 mt-[1.5rem]'>Advertise</h3>
                
                <ul className='w-full flex flex-col gap-[1rem] my-2 border-b border-gray-200 pb-[2rem]'>
                    <li>- When you click on the advertise icon, you will have access to a list of services on the different media platforms. </li>
                    <li>- You can advertise with your pending balance or fund your wallet to advertise </li>
                </ul>

            </div>

            <div className='w-full h-fit px-1 py-1 my-2'>
                <p>For any other question, kindly join our telegram group, send an email or send a WhatsApp message to chat with a customer rep.</p> 

                <ul className='flex flex-col gap-[2rem] mt-[2rem] '>
                <li className='flex flex-col gap-1'>
                    <label className='flex items-center gap-1'><FaTelegram  className='text-[24px] text-secondary'/>Telegram Channel:</label> 
                    <Link to={'https://t.me/belocated'} target="_blank" rel="noopener noreferrer" className='flex items-center gap-1'>Join Telegram Channel <FaAngleDoubleRight className='text-[18px] text-secondary'/></Link>
                </li>

                <li className='flex flex-col gap-1'>
                    <label className='flex items-center gap-1'><FaWhatsapp className='text-[24px] text-green-400'/>WhatsApp:</label>
                    <Link to={'https://wa.me/2347031935276'} target="_blank" rel="noopener noreferrer" className='flex items-center gap-1'>Join Belocated WhatsApp Group <FaAngleDoubleRight className='text-[18px] text-secondary'/></Link> 
                </li>
                
                <li className='flex flex-col gap-1'>
                    <label className='flex items-center gap-1'><FaEnvelope className='text-[24px] text-tertiary'/>Email:</label> 
                    <p>cs@belocated.ng</p>
                </li>
                </ul>  
            </div>

            <p className='mt-[4rem]'>Belocated</p>
        </div>
    </section>
  )
}

export default KnowledgeBase