import React from 'react'

const Jumbotron = () => {
  return (
    <section className='w-full h-[85vh] flex flex-col items-center my-[8rem]'>
        <div className='container flex flex-col items-center'>
            <h1 className='w-[80%] text-center text-[2.5rem] text-gray-800 font-extrabold'>Make <span className='text-tertiary'>Money</span> Daily by Completing Simple & Profitable <span className='text-secondary'>Tasks</span> on Your Social Media</h1>
            <p className='w-[60%] text-[1.5rem] text-center font-medium text-gray-600 mt-3'>Earn daily income by reselling products, posting adverts and performing simple social tasks for top businesses and brands on your social media account</p>
        </div>

        <button onClick className='bg-tertiary text-primary font-bold px-10 py-3 mt-[5rem] rounded-full hover:bg-transparent hover:text-tertiary hover:border-tertiary hover:border'>Get Started</button>
        <small className='mt-3 font-medium text-gray-500'>Already a Member? <span className='text-secondary cursor-pointer'>Login</span></small>
    </section>
  )
}

export default Jumbotron