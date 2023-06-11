import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { SET_USER, SET_USERNAME, selectUser } from '../../../redux/slices/authSlice'
import useRedirectLoggedOutUser from '../../../customHook/useRedirectLoggedOutUser'
import { getUser } from '../../../services/authServices'
import { useState } from 'react'
import { useEffect } from 'react'
import AccountDetailsSettings from './settings/AccountDetailsSettings'


const PasswordUpdate = () => {
  const [isLoading, setIsLoading] = useState()
  

  const dispatch = useDispatch()
  const user = useSelector(selectUser)
  useRedirectLoggedOutUser('/login')

  useEffect(() => {
    if (!user.email) {
      setIsLoading(true) 
    async function getUserData() {
      const data = await getUser()
      setIsLoading(false)
      await dispatch(SET_USER(data))
      await dispatch(SET_USERNAME(data.username))
    }
    getUserData()
    }
}, [dispatch, user.email])


  
  const bankDetailsInitialState = {
  bankName: user?.bankName,
  bankAccountNumber: user?.bankAccountNumber,
  bankAccountName: user?.bankAccountName,
  }

  const [bankAccountDetails, setBankAccountDetails] = useState(bankDetailsInitialState)

  const passwordInitialState = {
  oldPassword: "",
  newPassWord: "",
}

const [passwordChange, setPasswordChange] = useState(passwordInitialState)



// Bank Details InPut Change
const handleBankInputChange = (e) => {
  const {name, value } = e.target;
  setBankAccountDetails({ ...bankAccountDetails, [name]: value })
}

//Password InPut Change
const handlePasswordInputChange = (e) => {
  e.preventDefault()
  const {name, value } = e.target;
  setProfile({ ...profile, [name]: value })
}

  return (
    <div className='w-full h-fit'>
      <div className='w-[95%] h-fit flex flex-col gap-[5rem] mx-auto mt-[1rem]'>

        {/* Layered Boxes wrapper */}
        <div className='boxesContainer w-full flex  flex-col justify-center gap-[5rem] p-8 md:flex-row'>
          {/* Profile details  Settings */}
          <AccountDetailsSettings user={user} />

          {/* Bank Details Settings */}
          <form className='box p-6 shadow-lg'>
          <label htmlFor="accountDetails reset" className='font-bold'>Bank Details</label>
              <div className='flex flex-col mt-3 mb-3'>
                  <label htmlFor="Product Name " className='text-left'>Bank Name</label>
                  <select type='text' name="username" placeholder={user?.username} value={user?.username} onChange={handleBankInputChange} className='w-full shadow-inner p-3 border border-gray-200 rounded-xl text-gray-400'>
                    <option value="">First Bank</option>
                    <option value="">Access Bank</option>
                  </select>

                  <div className='flex flex-col md:gap-6 w-full md:flex-row border-b border-gray-100 pb-[2rem]'>
                    <div className='flex flex-col mt-3 mb-3'>
                        <label htmlFor="Email" className='text-left mb-1 ml-1'>Account Name</label>
                        <input type="email" placeholder={"name"} value={user?.fullname} onChange={handleBankInputChange} className='w-full shadow-inner p-3 border border-gray-200 rounded-xl text-gray-400'/>
                    </div>
                    <div className='flex flex-col mt-3 mb-3'>
                        <label htmlFor="Phone" className='text-left mb-1 ml-1'>Account Number</label>
                        <input type="number" placeholder={"1234567890"} value={user?.phone} onChange={handleBankInputChange} className='w-full shadow-inner p-3 border border-gray-200 rounded-xl text-gray-400'/>
                    </div>
                  </div>

                  <button className='w-full bg-red-400 text-gray-100 p-2 rounded-2xl'>Edit</button>
              </div>
          </form>

        </div>

         {/* Layered Boxes wrapper */}
         <div className='boxesContainer w-full flex  flex-col justify-center gap-[5rem] p-8 md:flex-row'>
          {/* password change  */}
          <form className='box p-6 shadow-lg'>
          <label htmlFor="accountDetails reset" className='font-bold'>Change Password</label>
              <div className='flex flex-col mt-3 mb-3'>
                  <label htmlFor="Product Name " className='text-left'>Old Password</label>
                  <input type='password' name="password" placeholder={"******"} onChange={handlePasswordInputChange} className='w-full shadow-inner p-3 border border-gray-200 rounded-xl text-gray-400' />

                  <div className='flex flex-col md:gap-6 w-full md:flex-row border-b border-gray-100 pb-[2rem]'>
                    <div className='flex flex-col mt-3 mb-3'>
                        <label htmlFor="Email" className='text-left mb-1 ml-1'>New Password</label>
                        <input type="password" name="newPassword" placeholder={"******"} onChange={handlePasswordInputChange} className='w-full shadow-inner p-3 border border-gray-200 rounded-xl text-gray-400'/>
                    </div>
                    <div className='flex flex-col mt-3 mb-3'>
                        <label htmlFor="Phone" className='text-left mb-1 ml-1'>Confirm New Password</label>
                        <input type="password" name="confirmNewPassword" placeholder={"******"}  onChange={handlePasswordInputChange} className='w-full shadow-inner p-3 border border-gray-200 rounded-xl text-gray-400'/>
                    </div>
                  </div>

                  <button className='w-full bg-tertiary text-gray-100 p-2 rounded-2xl'>Change Password</button>
              </div>
          </form>

          {/* User Account Settings */}
          <form className='box p-6 shadow-lg'>
          <label htmlFor="accountDetails reset" className='font-bold'>User Account Settings</label>
              <div className='flex flex-col mt-3 mb-3'>
                  <label htmlFor="Product Name " className='text-left'>Username</label>
                  <input type='text' name="username" disabled placeholder={user?.username} value={user?.username}  className='w-full shadow-inner p-3 bg-gray-100 border border-gray-200 rounded-xl text-gray-400' />
                  <small className='text-[10px] text-left mt-1 text-gray-400'>Go to account settings to change your username</small>

                  <div className='flex flex-col md:gap-6 w-full md:flex-row border-b border-gray-100 pb-[2rem]'>
                    <div className='flex flex-col mt-3 mb-3'>
                        <label htmlFor="Email" className='text-left mb-1 ml-1'>Email</label>
                        <input type="email" placeholder={user?.email} value={user?.email} disabled className='w-full shadow-inner p-3 bg-gray-100 border border-gray-200 rounded-xl text-gray-400'/>
                    </div>
                    <div className='flex flex-col mt-3 mb-3'>
                        <label htmlFor="Phone" className='text-left mb-1 ml-1'>Phone Number</label>
                        <input type="number" disabled placeholder={user?.phone} value={user?.phone}  className='w-full shadow-inner p-3 rounded-xl'/>
                    </div>
                  </div>

                  <button className='w-full bg-tertiary text-gray-100 p-2 rounded-2xl'>Edit</button>
              </div>
          </form>

        </div>
      </div>
    </div>
  )
}

export default PasswordUpdate