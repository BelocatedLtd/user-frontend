import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { SET_USER, SET_USERNAME, selectUser } from '../../../redux/slices/authSlice'
import useRedirectLoggedOutUser from '../../../customHook/useRedirectLoggedOutUser'
import { getUser } from '../../../services/authServices'
import { useState } from 'react'
import { useEffect } from 'react'
import AccountDetailsSettings from './settings/AccountDetailsSettings'
import BankDetailsSettings from './settings/BankDetailsSettings'
import PasswordChange from './settings/PasswordChange'
import { useParams } from 'react-router-dom'
import Loader from '../../../components/loader/Loader'


const PasswordUpdate = () => {
  const [isLoading, setIsLoading] = useState(false)
  const {username} = useParams()
  

  const dispatch = useDispatch()
  const user = useSelector(selectUser)
  useRedirectLoggedOutUser('/login')

  useEffect(() => {
    setIsLoading(true)
    async function getUserData() {
      const data = await getUser()
      await dispatch(SET_USER(data))
      await dispatch(SET_USERNAME(data.username))
      setIsLoading(false)
    }
    setIsLoading(false)
    getUserData()
}, [username, dispatch])


  return (
    <div className='w-full h-fit'>
      {isLoading && <Loader />}
      <div className='w-[60%] h-fit flex flex-col gap-[5rem] mt-[1rem]'>

        {/* Layered Boxes wrapper */}
        <div className='boxesContainer w-full flex  flex-col justify-center gap-[3rem] p-8'>
          {/* Profile details  Settings */}
          <AccountDetailsSettings user={user} />

          {/* Bank Details Settings */}
          <BankDetailsSettings  user={user} />

          {/* password change  */}
          <PasswordChange user={user} />
        </div>

        </div>
    </div>
  )
}

export default PasswordUpdate