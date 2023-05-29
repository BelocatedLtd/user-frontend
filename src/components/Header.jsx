import React from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import Register from '../pages/authLayout/Register'
import { useState } from 'react'
import Login from '../pages/authLayout/Login'
import { ShowOnLogin, ShowOnLogout } from './protect/hiddenLinks'
import Logout from '../pages/authLayout/Logout'
import { useSelector } from 'react-redux'
import { selectUser, selectUsername } from '../redux/slices/authSlice'

export const Header = () => {
    const navigate = useNavigate()
    const [regBtn, setRegBtn] = useState(false)
    const [loginBtn, setLoginBtn] = useState(false)
    const user = useSelector(selectUser)
    const username = useSelector(selectUsername)

    const handleRegister = (e) => {
        e.preventDefault()
        setRegBtn(!regBtn)
    }

    const handleLogin = (e) => {
        e.preventDefault()
        setLoginBtn(!loginBtn)
    }
  return (
    <header className='w-full border-b border-gray-200'>
        {regBtn && <Register handleRegister={handleRegister} setRegBtn={setRegBtn} regBtn={regBtn} />}
        {loginBtn && <Login handleLogin={handleLogin} setLoginBtn={setLoginBtn} loginBtn={loginBtn}/>}
        <div className='container px-4 py-6 flex justify-between items-center mx-auto md:px-0'>
            <div className='logo cursor-pointer text-4xl font-extrabold text-secondary'>
                <span className='text-tertiary'>Be</span>located
            </div>

            <div className='hidden nav__items gap-4 font-bold text-lg text-gray-600 md:flex'>
                <NavLink to='/'>Home</NavLink>
                <NavLink to='/about'>About</NavLink>
                <NavLink to='/#'>More</NavLink>
                <NavLink to='/contact'>Contact</NavLink>
            </div>

            <ShowOnLogout>
            <div className='flex gap-2'>
                <button onClick={handleLogin} className='bg-transparent text-tertiary px-6 py-3 rounded-full hover:bg-transparent hover:text-secondary'>Login</button>
                <button onClick={handleRegister} className='bg-tertiary text-primary px-6 py-3 rounded-full hover:bg-transparent hover:text-tertiary hover:border-tertiary hover:border'>Create Account</button>
            </div>
            </ShowOnLogout>
            <ShowOnLogin>
            <div className='flex gap-2'>
                {user.accountType === "Admin" && (
                    <Link to={`/admin/dashboard/${username}`} className='bg-transparent text-tertiary px-6 py-3 rounded-full hover:bg-transparent hover:text-secondary'>Dashboard</Link>
                )}
                {user.accountType === "User" && (
                    <Link to={`/dashboard/${username}`} className='bg-transparent text-tertiary px-6 py-3 rounded-full hover:bg-transparent hover:text-secondary'>Dashboard</Link>
                )}
                <Logout />
            </div>
            </ShowOnLogin>
        </div>
    </header>
  )
}
