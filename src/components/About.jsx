import React from 'react'
import aboutImg from '../assets/about.jpg'
import aboutIcon from '../assets/about.png'
import ActivityFeed from './ActivityFeed'

const About = () => {
  return (
    <section className='w-full h-fit md:h-screen mb-[3rem]'>
        <div className='container h-full flex flex-col justify-start gap-7 my-[3rem] mx-auto md:flex-row md:items-center'>
            <div className='flex h-full flex-col justify-center'>
                <div className='flex w-full h-full flex-col px-[2rem] py-[4rem] gap-3'>
                    <div className='flex items-center gap-2'>
                        <h1 className='text-3xl text-gray-600 font-extrabold border-l-4 px-4 border-red-400'>About Belocated </h1>
                    </div>
                    <p className='w-full text-[20px] text-gray-600 mt-3 text-justify md:text-left'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Fugit, incidunt ea blanditiis totam velit explicabo deserunt. Ipsam culpa earum a quas recusandae vero doloremque amet odio quaerat temporibus, perferendis tempore. Ipsam culpa earum a quas recusandae vero doloremque amet odio quaerat temporibus, perferendis tempore? Lorem ipsum dolor, sit amet consectetur adipisicing elit. Fugit, incidunt ea blanditiis totam velit explicabo deserunt. Ipsam culpa earum a quas recusandae vero doloremque amet odio quaerat temporibus, perferendis tempore.</p>
                </div>

                {/* <div className='stats flex gap-5 mt-5'>
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

                </div> */}
            </div>

            <div className='flex mb-[3rem] px-[2rem]'>
                <ActivityFeed />
            </div>
        </div>
    </section>
  )
}

export default About