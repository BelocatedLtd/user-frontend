import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectUser } from '../../../../redux/slices/authSlice'
import { useState } from 'react'
import { toast } from 'react-hot-toast'
import Loader from '../../../../components/loader/Loader'
import { handlesendingPhoneOTP } from '../../../../services/authServices'
import { useNavigate } from 'react-router-dom'

const BankDetailsSettings = ({user}) => {
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState()


    const bankDetailsInitialState = {
        bankName: user?.bankName,
        bankAccountNumber: user?.bankAccountNumber,
        bankAccountName: user?.bankAccountName,
        }
      
        const [bankAccountDetails, setBankAccountDetails] = useState(bankDetailsInitialState)

    
// Bank Details InPut Change
const handleBankInputChange = (e) => {
    const {name, value } = e.target;
    setBankAccountDetails({ ...bankAccountDetails, [name]: value })
  }

    const handleSubmit = () => {
        toast.success("Bank Account details settings")
    }

  return (
    <form onSubmit={handleSubmit} className='box p-6 shadow-lg'>
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
  )
}

export default BankDetailsSettings