import React from 'react'
import useRedirectLoggedOutUser from '../../../customHook/useRedirectLoggedOutUser'

const PasswordUpdate = () => {
  useRedirectLoggedOutUser('/login')
  return (
    <div className='w-full h-screen'>PasswordUpdate</div>
  )
}

export default PasswordUpdate