import React from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import Register from '../pages/authLayout/Register'
import { useState } from 'react'
import Login from '../pages/authLayout/Login'
import { ShowOnLogin, ShowOnLogout } from './protect/hiddenLinks'
import Logout from '../pages/authLayout/Logout'
import { useSelector } from 'react-redux'
import { selectUser, selectUsername } from '../redux/slices/authSlice'
import { MdMenu, MdOutlineCancel } from 'react-icons/md'
import { HiOutlineMenuAlt3 } from 'react-icons/hi'
import { useEffect } from 'react'

export const Header = () => {
    const navigate = useNavigate()
    const [regBtn, setRegBtn] = useState(false)
    const [loginBtn, setLoginBtn] = useState(false)
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false) 
    const user = useSelector(selectUser)
    const username = useSelector(selectUsername)

    const userDashboard = () => {
         if (user.accountType === "Admin") {
            return (<Link to={`/admin/dashboard/${username}`} className='bg-transparent text-tertiary px-6 py-3 rounded-full hover:bg-transparent hover:text-secondary'>Dashboard</Link>  )
         } else {
           return (<Link to={`/dashboard/${user.username}`} className='bg-transparent text-tertiary px-6 py-3 rounded-full hover:bg-transparent hover:text-secondary'>Dashboard</Link>)
        }
    }

    useEffect(() => {
        userDashboard()
    }, [user])
    

    const handleRegister = (e) => {
        e.preventDefault()
        setRegBtn(!regBtn)
    }

    const handleLogin = (e) => {
        e.preventDefault()
        setLoginBtn(!loginBtn)
    }

    const handleCloseMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen)
    }

  return (
    <header className='w-full border-b border-gray-200'>
        {regBtn && <Register handleRegister={handleRegister} setRegBtn={setRegBtn} regBtn={regBtn} />}
        {loginBtn && <Login handleLogin={handleLogin} setLoginBtn={setLoginBtn} loginBtn={loginBtn}/>}

        <div className='relative container px-6 py-6 flex justify-between items-center mx-auto md:px-0'>
            <Link to='/' className='logo cursor-pointer text-4xl font-extrabold text-secondary'>
                <span className='text-tertiary'>Be</span>located
            </Link>

            <div className='hidden nav__items gap-4 font-bold text-lg text-gray-600 md:flex'>
                <NavLink to='/'>Home</NavLink>
                <NavLink to='/about'>About</NavLink>
                <NavLink to='/faq'>FAQ</NavLink>
                <NavLink to='/hiw'>Partners</NavLink>
                <NavLink to='/contact'>Contact</NavLink>
            </div>

            <ShowOnLogout>
            <div className='hidden gap-2 md:flex'>
                <button onClick={handleLogin} className='bg-transparent text-tertiary px-6 py-3 rounded-full hover:bg-transparent hover:text-secondary'>Login</button>
                <button onClick={handleRegister} className='bg-tertiary text-primary px-6 py-3 rounded-full hover:bg-transparent hover:text-tertiary hover:border-tertiary hover:border'>Create Account</button>
            </div>
            </ShowOnLogout>

            <ShowOnLogin>
            <div className='hidden gap-2 md:flex'>
                {userDashboard()}
                <Logout />
            </div>
            </ShowOnLogin>

            <div className='relative md:hidden'>
                <div>
                    {mobileMenuOpen && <MdOutlineCancel onClick={() => setMobileMenuOpen(!mobileMenuOpen)} size={30} className='text-gray-600' />}
                    {!mobileMenuOpen && <HiOutlineMenuAlt3 onClick={() => setMobileMenuOpen(!mobileMenuOpen)} size={30} className='text-gray-600' />}
                </div>
            </div>

            {mobileMenuOpen && (
            <div className='absolute w-full right-0 left-0 top-[5.5rem] py-[5rem] p-[1.5rem] shadow-xl rounded-sm bg-[#BEE2F2]'>
                        <div onClick={() => handleCloseMenu()} className='flex h-[200px] flex-col justify-center items-center gap-[1rem] font-extrabold text-gray-700'>
                            <Link to="/">Home</Link>
                            <Link to="/about">About</Link>
                            <Link to="/">FAQ</Link>
                            <Link to="/">Partner</Link>
                            <Link to="/">Contact</Link>
                            

                            <ShowOnLogout>
                                <p onClick={handleLogin} className='text-gray-800 cursor-pointer'>Login</p>
                            </ShowOnLogout>
                            <ShowOnLogout>
                                <p onClick={handleRegister} className='text-gray-800 cursor-pointer'>Register</p>
                            </ShowOnLogout>

                            <ShowOnLogin>
                                <Link to={`/dashboard/${user.username}`} className='text-gray-800 cursor-pointer'>Dashboard
                                </Link>
                            </ShowOnLogin>
                            <ShowOnLogin>
                                <Logout />
                            </ShowOnLogin>
                        </div>
            </div>
            )}

        </div>
    </header>
  )
}
