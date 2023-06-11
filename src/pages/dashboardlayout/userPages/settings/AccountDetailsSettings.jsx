import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectUser } from '../../../../redux/slices/authSlice'
import { useState } from 'react'
import { toast } from 'react-hot-toast'
import Loader from '../../../../components/loader/Loader'
import { handlesendingPhoneOTP } from '../../../../services/authServices'
import { useNavigate } from 'react-router-dom'



const AccountDetailsSettings = ({user}) => {
    const navigate = useNavigate()
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
     const response = await handlesendingPhoneOTP(accountDetailsData)
     if (response) {
        toast.success('OTP sent to your phone number')
        navigate('/verify-phone', { state:{ accountDetailsData } })
     }
      setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
      console.log(error)
    }
  }


  return (
    <form onSubmit={handleAccountDetailsUpdate} className='box p-6 shadow-lg'>
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
                        <input type="number" name="phone" placeholder="234" value={accountDetails.phone} onChange={handleAccountDetailsInputChange} className='w-full shadow-inner p-3 rounded-xl'/>
                        <small className='text-[12px] text-gray-600'>Start your phone number with 234</small>
                    </div>
                  </div>

                  <button className='w-full bg-tertiary text-gray-100 p-2 rounded-2xl'>Edit</button>
              </div>
          </form>
  )
}

export default AccountDetailsSettings