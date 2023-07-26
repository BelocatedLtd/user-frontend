import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { SET_USER, SET_USERNAME, selectUser } from '../../../../redux/slices/authSlice'
import { useState } from 'react'
import { toast } from 'react-hot-toast'
import Loader from '../../../../components/loader/Loader'
import { handlesendingPhoneOTP, resendOTPVerificationEmail, updateUserAccountDetails } from '../../../../services/authServices'
import VerifyAccountOTP from './VerifyAccountOTP'



const AccountDetailsSettings = ({user}) => {
    const dispatch = useDispatch()
    const [isLoading, setIsLoading] = useState(false)
    const [toggleOTPVerify, setToggleOTPVerify] = useState(false)

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
    userId: user?.id,
    username: accountDetails?.username,
    email: accountDetails?.email,
    phone: accountDetails?.phone,
    token: user?.token
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    const OTPSent = await resendOTPVerificationEmail(user.email)

    setIsLoading(false)
    if (!OTPSent) {
      setIsLoading(false)
      toast.error('Error Sending Verification Email')
      return
    }

    if (OTPSent && OTPSent.message === "Verification OTP Sent") {
      setIsLoading(false)
      setToggleOTPVerify(true)
      toast.success('Please, verify your account')
      return
    }
  }

  const handleModal = () => {
    setToggleOTPVerify(!toggleOTPVerify)
  }


  return (
    <div>
      {isLoading && <Loader />}
      {toggleOTPVerify && <VerifyAccountOTP accountDetailsData={accountDetailsData} handleModal={handleModal} email={user?.email}/>}
        <form onSubmit={handleSubmit} className='w-full box p-6 shadow-lg'>
        
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
    </div>
    
  )
}

export default AccountDetailsSettings