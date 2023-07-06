import React from 'react'
import close from '../../assets/close.svg'
import  ReactDOM  from 'react-dom'
import { MdCancel } from 'react-icons/md'
import { LoaderIcon, toast } from 'react-hot-toast';
import { useState } from 'react';
import Loader from '../../components/loader/Loader';
import { useNavigate } from 'react-router-dom';
import { resendPasswordVerificationEmail } from '../../services/authServices';

const initialState = {
  email: '',
}

const RetrievePassword = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [values, setValues] = useState(initialState)
  const [modalBtn, setModalBtn] = useState(false)
  const navigate = useNavigate()

  const {email} = values

  const handleInputChange = (e) => {
    const {name, value } = e.target;
    setValues({ ...values, [name]: value })
  }

  const handleOnSubmit = async (e) => {
    e.preventDefault()

      if (!email ) {
        return toast.error("You have to input your Email")
      }


      setIsLoading(true)
      try {
        // Handle retrieve password
      const emailSent = await resendPasswordVerificationEmail(email)

      if (!emailSent) {
        toast.error("User email not found")
      }

      if (emailSent.message === "Verification OTP Sent Successfully") {

        const accountDetailsData = {
          userId: emailSent.userId,
          email: email,
          oldPassword: ""
        }
       
          navigate('/password-verify', { state:{ accountDetailsData } })
          setIsLoading(false)
      }

      setIsLoading(false)

     } catch (error) {
        setIsLoading(false)
       toast.error(error, 'User not registered')
     }
    }

  return(
    <div className='w-full h-[70vh]'>
        {isLoading && <Loader />}
      <div className='flex flex-col justify-center items-center gap-4 mx-auto w-full h-full px-[2rem] md:w-1/2'>
        <div className='mb-5 flex justify-center text-center'>
            <h3 className='w-[80%] text-xl text-gray-600 font-bold px-6 mt-2'>Enter your registered email to retreive your forgotten password</h3>
        </div>
        <form onSubmit={handleOnSubmit} className=''>
                  <input type="email" name="email" placeholder="Email" onChange={handleInputChange} className='w-full  mb-[1rem] shadow-inner p-3 bg-transparent border border-gray-200 rounded-xl' />

                  <button type="submit" className=' w-full mt-1 mb-[-0rem] py-2 text-md rounded-xl bg-secondary text-gray-100 mb-5'>Retrieve Password! {isLoading && <LoaderIcon />}</button>
        </form>
      </div>
    </div>
  )
}

export default RetrievePassword