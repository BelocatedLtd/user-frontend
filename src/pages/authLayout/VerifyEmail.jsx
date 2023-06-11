import React from 'react'
import { CheckmarkIcon, toast } from 'react-hot-toast';
import { useState } from 'react'
import Loader from '../../components/loader/Loader'   
import { resendVerificationEmail } from '../../services/authServices';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const VerifyEmail = () => {
  const location = useLocation();
  const { formData } = location.state || {};
    const [isLoading, setIsLoading] = useState(false)

    const {email} = formData || {};

    const handleResendEmail = async() => {
        const response = await resendVerificationEmail(email)
    }

    return (
        <div className='w-full h-[88vh] flex items-center'>
            {isLoading && <Loader />}
          <div className='w-[600px] h-fit bg-primary mx-auto mt-[3rem] py-[3rem]'>
            <div className='w-full h-full flex flex-col justify-center items-center'>
                <h3 className='flex gap-1 text-xl text-gray-800 font-bold px-6 mt-2 items-center'>
                  <span className='text-red-500 font-extrabold'>Verification</span>   
                    Email Sent  
                    <CheckmarkIcon />
                </h3>
                <p className='w-[500px] my-[1rem] text-center px-6'>Please check the email address {email} for instructions to verify your belocated account</p>
                <button onClick={() => handleResendEmail()} type="submit" className='w-[60%] mt-1 py-2 text-md rounded-xl bg-secondary text-gray-100 mb-5'>Resend Email</button>
            </div>
          </div>
        </div>
      )
}

export default VerifyEmail