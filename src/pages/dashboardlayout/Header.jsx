import React from 'react'
import { NavLink } from 'react-router-dom'
import Logout from '../authLayout/Logout'

const Header = () => {
  return (
    <header className='w-full border-b border-gray-200'>
        <div className='ml-5 py-6 flex justify-between items-center mx-auto md:px-2'>
            <div className='cursor-pointer text-secondary'>
                {/* <span className='text-tertiary'>Be</span>located */}
                <form>
                  <input type="text" placeholder="Search Tasks" className='w-[300px] px-5 py-2 border border-gray-200 rounded-2xl text-lg'/>
                </form>
            </div>

            <div className='hidden nav__items mr-5 gap-4 font-medium text-lg text-gray-600 md:flex'>
                <NavLink to='/dashboard/123456'>Home</NavLink>
                <NavLink to='/dashboard/earn'>Earn</NavLink>
                <NavLink to='/dashboard/advertise'>Advertise</NavLink>
                <NavLink to='/terms'>Terms</NavLink>
                <NavLink to='/contact'>Contact</NavLink>
                <div className='flex items-center  bg-tertiary text-gray-100 px-8 py-3 rounded-full cursor-pointer hover:bg-secondary'>
                  <Logout />
                </div>
            </div>

            <div>
              
            </div>
        </div>
    </header>
  )
}

export default Header