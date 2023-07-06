import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { handlesendingPhoneOTP, resendPasswordVerificationEmail, verifyOldUserPassword, verifyUserPassword } from '../../../../services/authServices'
import { toast } from 'react-hot-toast'
import Loader from '../../../../components/loader/Loader'

const initialState = {
    password: ""
  } 


const PasswordChange = ({user}) => {
    const navigate = useNavigate()
    const [passwordChange, setPasswordChange] = useState(initialState)
    const [isLoading, setIsLoading] = useState()

//Password InPut Change
const handlePasswordInputChange = (e) => {
  e.preventDefault()
  const {name, value } = e.target;
  setPasswordChange({ ...passwordChange, [name]: value })
}

const {password} = passwordChange

const handleSubmit = async(e) => {
    e.preventDefault()
    if (!password) {
        return toast.error("Input your old password")
      }

    if (password.length < 6) {
        return toast.error("Please, input your old password")
    }

    const data = {
        userId: user.id,
        oldPassword: password,
    }

    const accountDetailsData = {
        userId: user.id,
        email: user.email,
        oldPassword: password
      }

    try {
        setIsLoading(true)
        const oldPasswordOk = await verifyOldUserPassword(data)
     
     if (oldPasswordOk.message === "Password is Correct") {
        // const OTPSent = await handlesendingPhoneOTP(accountDetailsData)

        const emailSent = await resendPasswordVerificationEmail(user.email)

        if (emailSent === "Password Reset Link Sent Successfully") {
         
            navigate('/password-verify', { state:{ accountDetailsData } })
            setIsLoading(false)
        }
        setIsLoading(false)

     } else {
        toast.error("Password is incorrect")
        setIsLoading(false)
     }

      setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
      console.log(error)
    }
}

  return (
    <form onSubmit={handleSubmit} className='box p-6 shadow-lg'>
        {isLoading && <Loader />}
          <label htmlFor="accountDetails reset" className='font-bold'>Change Password</label>
              <div className='flex flex-col mt-3 mb-3'>
                  <label htmlFor="Password Change" className='text-left'>Old Password</label>
                  <input type='password' name="password" placeholder={"******"} onChange={handlePasswordInputChange} className='w-full shadow-inner p-3 border border-gray-200 rounded-xl text-gray-400' />

                  <button className='w-full bg-tertiary text-gray-100 p-2 rounded-2xl mt-6'>Change Password</button>
              </div>
          </form>
  )
}

export default PasswordChange