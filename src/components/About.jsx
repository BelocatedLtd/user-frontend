import React from 'react'
import aboutImg from '../assets/about.jpg'
import aboutIcon from '../assets/about.png'

const About = () => {
  return (
    <section className='w-full h-screen'>
        <div className='container flex justify-center items-center gap-7 mx-auto'>
            <div className='flex-1 w-full h-full'>
                <img src={aboutImg} alt="about us" className='w-full h-full object-cover' />
            </div>
            <div className='flex-1 flex flex-col'>
                <div className='flex items-center gap-3'>
                <h1 className='text-3xl text-gray-800 font-extrabold'>Lorem ipsum dolor sit </h1>
                <img src={aboutIcon} alt="about us" className='w-[50px] h-[50px]' />
                </div>
                <p className='w-[80%] text-[20px] leading-8 text-gray-600 mt-3'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Fugit, incidunt ea blanditiis totam velit explicabo deserunt. Ipsam culpa earum a quas recusandae vero doloremque amet odio quaerat temporibus, perferendis tempore. Ipsam culpa earum a quas recusandae vero doloremque amet odio quaerat temporibus, perferendis tempore?</p>

                <div className='stats flex gap-5 mt-5'>
                    <div className='flex items-center'>
                        <img src={aboutIcon} alt="about us" className='w-[70px] h-[70px]' />
                       <div className='flex flex-col'>
                            <p className='text-2xl text-gray-700 font-extrabold'>30K</p>
                            <small className='text-gray-500'>Members</small>
                       </div>
                    </div>
                    <div className='flex items-center'>
                        <img src={aboutIcon} alt="about us" className='w-[70px] h-[70px]' />
                       <div className='flex flex-col'>
                            <p className='text-2xl text-gray-700 font-extrabold'>10K</p>
                            <small className='text-gray-500'>Advertisers</small>
                       </div>
                    </div>
                    <div className='flex items-center'>
                        <img src={aboutIcon} alt="about us" className='w-[70px] h-[70px]' />
                       <div className='flex flex-col'>
                            <p className='text-2xl text-gray-700 font-extrabold'>300K</p>
                            <small className='text-gray-500'>Tasks Completed</small>
                       </div>
                    </div>

                </div>
            </div>
        </div>
    </section>
  )
}

export default About