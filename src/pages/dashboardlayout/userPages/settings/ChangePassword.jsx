import React from 'react'
import { useState } from 'react';
import { changeUserPassword } from '../../../../services/authServices';
import { useParams, useSearchParams } from 'react-router-dom'
import { useEffect } from 'react'

const initialState = {
    newPassword: '',
    confirmPassword: '',
  }

const ChangePassword = () => {
    const [values, setValues] = useState()


    const {newPassword, confirmPassword } = values


    const handleInputChange = (e) => {
        const {name, value } = e.target;
        setValues({ ...values, [name]: value })
      }

      const handleOnSubmit = async(e) => {
        e.preventDefault()

        if ( newPassword || confirmPassword ) {
            return toast.error("All fields are required")
          }
    
          if (newPassword.length < 6) {
            return toast.error("Password must be upto 6 characters")
          }
    
          if (newPassword !== confirmPassword) {
            return toast.error("Passwords do not match")
          }
    
          const formData = {
            userId, 
            oldPassword,
            newPassword
          }
        
          setIsLoading(true)
        try {
            const passwordChanged = await changeUserPassword(formData)

            if (passwordChanged) {
                navigate('/dashboard/profile/')
            }
            setIsLoading(false)
        } catch (error) {
            
        }
      }

    return(
        <div className='w-full h-[70vh]'>
            {isLoading && <Loader />}
          <div className='flex flex-col justify-center items-center gap-4 mx-auto w-full h-full px-[2rem] md:w-1/2'>
            <div className='mb-5 flex flex-col items-center text-center'>
                <h2 className='text-sm text-gray-400 font-medium px-6 text-center'><span className='text-tertiary font-extrabold'>Set</span> New Password!</h2>
            </div>
            <form onSubmit={handleOnSubmit} className='w-[500px]'>
                        <label htmlFor="new password"> New Password</label>
                      <input type="password" name="newPassword" placeholder="123456" onChange={handleInputChange} className='w-full  mb-[1rem] shadow-inner p-6 bg-transparent border border-gray-500 rounded-xl' />

                      <label htmlFor="new password">Confirm New Password</label>
                      <input type="password" name="confirmNewPassword" placeholder="123456" onChange={handleInputChange} className='w-full  mb-[1rem] shadow-inner p-6 bg-transparent border border-gray-500 rounded-xl' />
    
                      <div className='flex items-center gap-2'>
                        <button type="submit" className='w-full mt-1 mb-[-0rem] py-2 text-md rounded-xl bg-secondary text-gray-100 mb-5'>Change Password!</button>
                      </div>
            </form>
          </div>
        </div>
      )
}

export default ChangePassword