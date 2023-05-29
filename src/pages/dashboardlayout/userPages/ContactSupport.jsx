import React from 'react'
import useRedirectLoggedOutUser from '../../../customHook/useRedirectLoggedOutUser'

const ContactSupport = () => {
  useRedirectLoggedOutUser('/login')
  return (
    <div className='w-full h-screen'>Contact Support</div>
  )
}

export default ContactSupport