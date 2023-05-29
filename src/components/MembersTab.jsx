import React from 'react'
import gha from '../assets/gha.png'

const MembersTab = () => {
  return (
    <section className='w-full h-[80vh] '>
        <div className='container flex justify-center items-center gap-7 mx-auto'>
            <div className='flex-1 flex flex-col items-center gap-3 text-center'>
                    <h1 className='text-3xl text-secondary font-extrabold'>For Advertisers </h1>
                    <p className='w-full text-[20px] leading-8 font-medium text-gray-600 mt-3'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Fugit, incidunt ea blanditiis totam velit explicabo deserunt. Ipsam culpa earum a quas recusandae vero doloremque amet odio quaerat temporibus, perferendis tempore. Ipsam culpa earum a quas recusandae vero doloremque amet odio quaerat temporibus, perferendis tempore?</p>
                    <button onClick className='bg-tertiary text-primary font-bold px-10 py-3 mt-[2rem] rounded-full hover:bg-transparent hover:text-tertiary hover:border-tertiary hover:border'>Register Today!</button>
                    <small>See Pricing</small>
            </div>

            <div className='flex-1 w-full h-full'><img src={gha} alt="" className='w-[500px] h-[500px] object-cover'/></div>

            <div className='flex-1 flex flex-col items-center gap-3 text-center'>
                    <h1 className='text-3xl text-secondary font-extrabold'>For Publishers </h1>
                    <p className='w-full text-[20px] leading-8 font-medium text-gray-600 mt-3'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Fugit, incidunt ea blanditiis totam velit explicabo deserunt. Ipsam culpa earum a quas recusandae vero doloremque amet odio quaerat temporibus, perferendis tempore. Ipsam culpa earum a quas recusandae vero doloremque amet odio quaerat temporibus, perferendis tempore?</p>
                    <button onClick className='bg-tertiary text-primary font-bold px-10 py-3 mt-[2rem] rounded-full hover:bg-transparent hover:text-tertiary hover:border-tertiary hover:border'>Register Today!</button>
                    <small>See Earnings</small>
            </div>
        </div>
    </section>
  )
}

export default MembersTab