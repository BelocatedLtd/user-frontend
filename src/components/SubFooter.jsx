import React from 'react'
import { AiOutlineHolder } from 'react-icons/ai'
import { BsFillTelephoneFill } from 'react-icons/bs'
import { MdOutlineEmail, MdLocationPin } from 'react-icons/md'
import { RxDoubleArrowRight } from 'react-icons/rx'
import { Link } from 'react-router-dom'

const SubFooter = () => {
  return (
    <section className='hidden md:flex'>
        <div className='container flex  mx-auto pt-[3rem] pb-[3rem] border-t border-gray-300 md:flex-row'>
            
            <div className='w-full p-6 text-gray-600'>
                <div className='flex items-center gap-2 mb-6'>
                    <h1 className='text-2xl text-secondary'>Categories</h1>
                    <AiOutlineHolder className='rotate-90 text-2xl text-tertiary mt-1'/>
                </div> 
                <ul className='text-lg' key="category.id">
                    <li className='flex items-center gap-1'><RxDoubleArrowRight className='text-tertiary'/>Category</li>
                </ul>
            </div>

            <div className='w-full p-6 text-gray-600'>
                <div className='flex items-center gap-2 mb-6'>
                    <h1 className='text-2xl text-secondary'>Important Links</h1>
                    <AiOutlineHolder className='rotate-90 text-2xl text-tertiary mt-1'/>
                </div> 
                        <ul className='text-lg flex flex-col gap-2'>
                            <li>User Registration</li>
                            <li>Logout</li>
                            <li>How it Works</li>
                            <li>Help & FAQs</li>
                            <li>Legal</li>
                            <li>Terms of Service</li>
                            <li>Privacy Policy</li>
                        </ul>
            </div>


            <div className='w-full p-6 text-gray-600'>
                <div className='flex items-center gap-2 mb-6'>
                    <h1 className='text-2xl text-secondary'>Auctions</h1>
                    <AiOutlineHolder className='rotate-90 text-2xl text-tertiary mt-1'/>
                </div> 
                        <ul className='text-lg flex flex-col gap-2'>
                            <li>Live Auctions</li>
                            <li>Upcoming Auctions</li>
                            <li>Expired Auctions</li>
                            <li>Top Winners</li>
                            <li>Trending Auctions</li>
                            
                        </ul>
            </div>

            <div className='w-full p-6 text-gray-600'>
                <div className='flex items-center gap-2 mb-6'>
                    <h1 className='text-2xl text-secondary'>Contact Details</h1>
                    <AiOutlineHolder className='rotate-90 text-2xl text-tertiary mt-1'/>
                </div> 
                        <ul className='text-lg flex flex-col gap-3'>
                            <li className='flex items-center gap-2'><BsFillTelephoneFill className='text-tertiary border border-tertiary rounded-full p-1 text-2xl'/> +234 803 555 4444</li>
                            <li className='flex items-center gap-2'><MdOutlineEmail  className='text-tertiary border border-tertiary rounded-full p-1 text-2xl'/>cs@auctioncube.com</li>
                            <li className='flex items-center gap-2'><MdLocationPin  className='text-tertiary border border-tertiary rounded-full p-1 text-2xl'/>222 Chevron Estate, VI, Lagos</li>
                        </ul>
            </div>

        </div>
    </section>
  )
}

export default SubFooter