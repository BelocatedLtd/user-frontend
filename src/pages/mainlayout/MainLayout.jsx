import React from 'react'
import { Outlet } from 'react-router-dom'
import { Header } from '../../components/Header'
import Footer from '../../components/Footer'

const MainLayout = () => {
  return (
    <div className='bg-gradient-to-r from-[#BEE2F2]'>
        <Header />
        <Outlet />
        <Footer />
    </div>
  )
}

export default MainLayout