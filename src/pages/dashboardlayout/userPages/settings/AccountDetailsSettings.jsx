import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { SET_USER, SET_USERNAME, selectUser } from '../../../../redux/slices/authSlice'
import { useState } from 'react'
import { toast } from 'react-hot-toast'
import Loader from '../../../../components/loader/Loader'
import { handlesendingPhoneOTP, updateUserAccountDetails } from '../../../../services/authServices'
import { useNavigate } from 'react-router-dom'



const AccountDetailsSettings = ({user}) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [isLoading, setIsLoading] = useState()

    const accountDetailsInitialState = {
        username: user?.username,
        email: user?.email,
        phone: user?.phone,
      }

      const [accountDetails, setAccountDetails] = useState(accountDetailsInitialState)


    //Account Details InPut Change
    const handleAccountDetailsInputChange = (e) => {
    const {name, value } = e.target;
    setAccountDetails({ ...accountDetails, [name]: value })
  }
  
  const accountDetailsData = {
    userId: user.id,
    username: accountDetails?.username,
    email: accountDetails?.email,
    phone: accountDetails?.phone,
  }

  const handleAccountDetailsUpdate = async (e) => {
    e.preventDefault()

    try {
      setIsLoading(true)
     //const response = await handlesendingPhoneOTP(accountDetailsData)

    //  if (!response) {
    //   return toast.error("error while sending OTP to yourphone")
    //  }
    // navigate('/verify-phone', { state:{ accountDetailsData } })

    const updatedUserDetailes = await updateUserAccountDetails(accountDetailsData)

    if (!updatedUserDetailes) {
      toast.error("Failed to update user details")
    }
       
    if(updatedUserDetailes) {
        await dispatch(SET_USERNAME(updatedUserDetailes.username))
        await dispatch(SET_USER(updatedUserDetailes))

        //const username = updatedUserDetailes?.username

        navigate(`/dashboard/profile`)
        setIsLoading(false)
    }
     // }
     setIsLoading(false)
   } catch (error) {
      setIsLoading(false)
     toast.error("failed to update user account details")
   }
  }


  return (
    <form onSubmit={handleAccountDetailsUpdate} className='w-full box p-6 shadow-lg'>
        {isLoading && <Loader />}
          <label htmlFor="accountDetails reset" className='font-bold'>Authentication Details</label>
              <div className='flex flex-col mt-3 mb-3'>
                  <label htmlFor="Product Name " className='text-left'>Username</label>
                  <input type='text' name="username" placeholder={accountDetails?.username} value={accountDetails.username} onChange={handleAccountDetailsInputChange} className='w-full shadow-inner p-3 border 
                  border-gray-200 rounded-xl text-gray-400' />
                  

                  <div className='w-full flex flex-col md:gap-6 md:flex-row border-b border-gray-100 pb-[2rem]'>
                    <div className='flex flex-col mt-3 mb-3'>
                        <label htmlFor="Email" className='text-left mb-1 ml-1'>Email</label>
                        <input type="email" name='email' placeholder={accountDetails?.email} value={accountDetails.email} onChange={handleAccountDetailsInputChange}  className='w-full shadow-inner p-3 border border-gray-200 rounded-xl text-gray-400'/>
                    </div>
                    <div className='flex flex-col mt-3 mb-3'>
                        <label htmlFor="Phone" className='text-left mb-1 ml-1'>Phone Number</label>
                        <input type="number" name="phone" placeholder="0803 000 0000" value={accountDetails.phone} onChange={handleAccountDetailsInputChange} className='w-full shadow-inner p-3 rounded-xl'/>
                        {/* <small className='text-[12px] text-gray-600'>Start your phone number with 234</small> */}
                    </div>
                  </div>

                  <button className='w-full bg-tertiary text-gray-100 p-2 rounded-2xl'>Edit</button>
              </div>
          </form>
  )
}

export default AccountDetailsSettings