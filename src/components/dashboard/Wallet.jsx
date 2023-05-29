import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectUserId } from '../../redux/slices/authSlice'
import { useEffect } from 'react'
import { useState } from 'react'
import { getUserWallet, selectIsError, selectIsLoading, selectUserWallet } from '../../redux/slices/walletSlice'
import { LoaderIcon, toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import FundWallet from '../FundWallet'
import FundingForm from '../../components/forms/FundingForm'


const Wallet = () => {
  const [selectFundingBtn, setSelectFundingBtn] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const wallet = useSelector(selectUserWallet)
  const isLoading = useSelector(selectIsLoading)
  const isError = useSelector(selectIsError)

  
  // Toggle modal to fund account
  const toggleFundingSelect = (e) => {
    e.preventDefault()
    setSelectFundingBtn(!selectFundingBtn)
}

  useEffect(() => {
    async function getWallet() {
      await dispatch(getUserWallet())
      if (isError) {
        toast.error("There was a problem getting user wallet values")
      }
    }
    getWallet()
}, [dispatch])

  

  return (
    <div className='w-full h-full flex flex-col justify-between items-center border border-gray-200 rounded-2xl py-6'>
       {selectFundingBtn && <FundingForm toggleFundingSelect={toggleFundingSelect} />}
       {isError && <p className='text-red-400'>Failed to fund account</p>}
      <h3 className='pt-4'>My Balance</h3>
      <div className='mt-[1.5rem]'>
        <h1 className='text-3xl text-gray-800 font-extrabold'>{isLoading ? (<LoaderIcon />) : (<span>₦{wallet?.value}</span>)}</h1>
      </div>
      <div className='flex gap-2 mt-[1.5rem]'>
        <button onClick={toggleFundingSelect} className='flex-1 bg-secondary text-[12px] text-gray-100  px-6 py-3 rounded-full hover:bg-transparent hover:text-tertiary hover:border-tertiary hover:border md:px-10'>Fund</button>
        <button  className='flex-1 bg-transparent border border-gray-500 text-[12px] text-gray-600 px-6 py-3 rounded-full hover:bg-transparent hover:text-tertiary hover:border-tertiary hover:border'>Withdraw</button>
      </div>

      <div className='flex-wrap items-center justify-center mt-[4rem] pb-4 gap-5 md:flex'>
        <div className='flex flex-col items-center justify-center mb-[1rem] md:mb-[0rem]'>
          <h3 className='font-semibold text-gray-600 text-[12px]'>Total Earnings</h3> 
          <small>{isLoading ? (<LoaderIcon />) : (<span>₦{wallet?.totalEarning}</span>)}</small>
        </div >
        <div className='flex flex-col items-center justify-center mb-[1rem] md:mb-[0rem]'>
          <h3 className='font-semibold text-gray-600 text-[12px]'>Pending Balance</h3>
          <small>{isLoading ? (<LoaderIcon />) : (<span>₦{wallet?.pendingBalance}</span>)}</small>
        </div>
        <div className='flex flex-col items-center justify-center mb-[1rem] md:mb-[0rem]'>
          <h3 className='font-semibold text-gray-600 text-[12px]'>Amount Spent</h3>
          <small>{isLoading ? (<LoaderIcon />) : (<span>₦{wallet?.amountSpent}</span>)}</small>
        </div>

      </div>
    </div>
  )
}

export default Wallet