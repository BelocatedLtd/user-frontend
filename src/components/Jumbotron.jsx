import React from 'react'
import ActivityFeed from './ActivityFeed'
import { useState } from 'react'
import Register from '../pages/authLayout/Register'
import Login from '../pages/authLayout/Login'

const Jumbotron = ({handleRegister, handleLogin, handleCloseMenu, loginBtn, regBtn}) => {


  return (
    <section className='w-full h-[85vh] flex flex-col items-center mt-[8rem]'>
      {regBtn && <Register handleRegister={handleRegister} regBtn={regBtn} />}
      {loginBtn && <Login handleLogin={handleLogin}  loginBtn={loginBtn}/>}

        <div className='container flex flex-col items-center'>
            <h1 className='w-[90%] text-center text-[28px] text-gray-800 font-extrabold md:text-[3rem]'>Make <span className='text-tertiary'>Money</span> Daily by Completing Simple & Profitable <span className='text-secondary'>Tasks</span> on Your Media Platforms</h1>
            <p className='w-[80%] text-[22px] text-center font-medium text-gray-600 mt-3 md:w-[60%] md:text-[1.5rem]'>Get paid for carrying out media activities you would usually do daily for free. With belocated you can now invest your time and resources by earning for every successful task executed</p>
        </div>

        <button onClick={handleRegister} className='bg-tertiary text-primary font-bold px-10 py-3 mt-[5rem] rounded-full hover:bg-transparent hover:text-tertiary hover:border-tertiary hover:border'>Get Started</button>
        <small onClick={handleLogin} className='mt-3 font-medium text-gray-500'>Already a Member? <span className='text-secondary cursor-pointer'>Login</span></small>
    </section>
  )
}

export default Jumbotron