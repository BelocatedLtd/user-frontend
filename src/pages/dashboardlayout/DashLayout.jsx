import React from 'react'
import Header from './Header'
import Footer from '../../components/Footer'
import { Outlet } from 'react-router-dom'
//import useRedirectLoggedOutUser from '../../customHook/useRedirectLoggedOutUser'

const DashLayout = ({children}) => {
 //useRedirectLoggedOutUser('/')
  return (
    <div>
        <Header />
        <div style={{minHeight: "80vh"}} className='flex p-6'>
        {children}
        </div>
        <Footer />
    </div>
  )
}

export default DashLayout