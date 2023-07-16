import React from 'react'
import useRedirectLoggedOutUser from '../../../customHook/useRedirectLoggedOutUser'
import Contact from '../../mainlayout/Contact'

const ContactSupport = () => {
  useRedirectLoggedOutUser('/login')
  return (
    <div className='w-full h-screen'>
      <Contact />
    </div>
  )
}

export default ContactSupport