import React from 'react'
import { toast } from 'react-hot-toast';
import { useState } from 'react';
import Loader from '../../components/loader/Loader';

const initialState = {
  OTP: '',
}

const  VerifyOTP = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [values, setValues] = useState(initialState)

  const {OTP} = values

  const handleInputChange = (e) => {
    const {name, value } = e.target;
    setValues({ ...values, [name]: value })
  }

  const handleOnSubmit = async (e) => {
    e.preventDefault()

      if (!OTP ) {
        return toast.error("You have to input your the OTP code sent to your email")
      }


      setIsLoading(true)
      try {
        toast.success(OTP)
       //const response = await retrieveUserPassword(email)
       setIsLoading(false)

      //  if(response.email) {
      //     await dispatch(SET_LOGIN(true))
      //     await dispatch(SET_USERNAME(response.username))
      //     await dispatch(SET_USER(response))
      //     const username = response.username

      //     navigate(`/dashboard/${username}`)
      //  }
        
     } catch (error) {
        setIsLoading(false)
       toast.error(error, 'Verification Unsuccessful')
     }
    }

  return(
    <div className='w-full h-[70vh]'>
        {isLoading && <Loader />}
      <div className='flex flex-col justify-center items-center gap-4 mx-auto w-full h-full px-[2rem] md:w-1/2'>
        <div className='mb-5 flex flex-col items-center text-center'>
            <h2 className='text-sm text-gray-400 font-medium px-6 text-center'><span className='text-tertiary font-extrabold'>Verification</span> Email Sent!</h2>
            <h3 className='w-[80%] text-xl text-gray-600 font-bold px-6 mt-2'>Please, enter the OTP code sent to your email </h3>
        </div>
        <form onSubmit={handleOnSubmit} className=''>
                  <input type="text" name="OTP" placeholder="123456" onChange={handleInputChange} className='w-full  mb-[1rem] shadow-inner p-3 bg-transparent border border-gray-200 rounded-xl' />

                  <button type="submit" className='w-full mt-1 mb-[-0rem] py-2 text-md rounded-xl bg-secondary text-gray-100 mb-5'>Verify!</button>
        </form>
      </div>
    </div>
  )
}

export default VerifyOTP