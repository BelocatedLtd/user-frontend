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
    const [timer, setTimer] = useState(10);
    const [resendBtn, setResendBtn] = useState(false)

    let interval;

  useEffect(() => {
    if (timer === 0) {
      setResendBtn(true)
      clearInterval(interval);
      return
    }

    interval = setInterval(() => {
      setTimer((prevTimer) => prevTimer - 1);
    }, 2000);

    return () => clearInterval(interval);
  }, [timer])

    const {email} = formData || {};

    const handleResendEmail = async (e) => {
      e.preventDefault()
 
     try {
         setIsLoading(true)
      const response = await resendVerificationEmail(email) 
      if (response) {
         toast.success(`Verification link sent to ${email}`)
         
         setResendBtn(false)
         setTimer(10)
 
      }
       setIsLoading(false)
     } catch (error) {
       setIsLoading(false)
       console.log(error)
     }
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
                <div className='flex items-center gap-2'>
                    {resendBtn && <button onClick={handleResendEmail} className='w-full mt-1  py-2 text-md rounded-xl bg-tertiary text-gray-100 text-center px-6 mb-5'>Resend Verification Link</button>}
                    {!resendBtn && <span className='ml-4 p-3 bg-slate-100 text-gray-800 rounded-full'>Resend in: {timer}</span> }
                  </div>
            </div>
          </div>
        </div>
      )
}

export default VerifyEmail