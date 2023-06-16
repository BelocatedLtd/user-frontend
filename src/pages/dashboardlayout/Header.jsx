import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import Logout from '../authLayout/Logout'
import { MdMenu, MdOutlineCancel } from 'react-icons/md'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { selectUser } from '../../redux/slices/authSlice'
import { ShowOnLogin } from '../../components/protect/hiddenLinks'

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const user = useSelector(selectUser)

  return (
    <header className='w-full border-b border-gray-200'>
        <div className='ml-5 py-6 px-2 flex justify-between items-center mx-auto md:px-2'>
            <div className='cursor-pointer text-secondary'>
            {/* <span className='text-tertiary'>Be</span>located */}
            <div className='flex flex-col justify-start md:hidden'>
              <div className='flex items-center gap-1'>
                <h1 className='text-lg text-gray-600 font-bold'>Welcome, </h1>
                <h4 className='text-lg text-gray-600 font-medium'>{user.fullname ? user.fullname : user.username}</h4>
              </div>
              <p className='text-gray-500 font-light text-sm'>@{user.username}</p>
            </div>
      
            <form className='hidden md:flex'>
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

            <div className='relative md:hidden'>
                <div>
                    {mobileMenuOpen && <MdOutlineCancel onClick={() => setMobileMenuOpen(!mobileMenuOpen)} size={30} className='text-gray-600' />}
                    {!mobileMenuOpen && <MdMenu onClick={() => setMobileMenuOpen(!mobileMenuOpen)} size={30} className='text-gray-600' />}
                </div>
            </div>

            {mobileMenuOpen && (
            <div className='absolute right-5 top-[6rem] p-[1.5rem] bg-gray-50 rounded-sm'>
                <div className='flex flex-col justify-center items-center w-[150px] h-fit gap-3 '>
                    <Link to="/">Home</Link>
                    <Link to="/about">About</Link>
                    <Link to="/more">More</Link>
                    <ShowOnLogin>
                        <Link to={`/dashboard/${user.username}`} className='text-gray-800 cursor-pointer'>Dashboard
                        </Link>
                    </ShowOnLogin>
                    <ShowOnLogin>
                        <Link to={'/logout'} className='text-gray-800 cursor-pointer'>Logout
                        </Link>
                    </ShowOnLogin>
                </div>
            </div>
            )}
        </div>
    </header>
  )
}

export default Header