import React from 'react'
import Footer from '../../components/Footer'
import { Outlet } from 'react-router-dom'

const AuthLayout = () => {
  return (
    <div>
        <Outlet />
        <Footer />
    </div>
  )
}

export default AuthLayout