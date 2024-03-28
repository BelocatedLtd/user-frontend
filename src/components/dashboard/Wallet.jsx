import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { SET_USER, selectUser } from '../../redux/slices/authSlice'
import { useEffect } from 'react'
import { useState } from 'react'
import { getUserWallet, selectIsError, selectIsLoading, selectUserWallet } from '../../redux/slices/walletSlice'
import { LoaderIcon, toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import FundWallet from '../FundWallet'
import FundingForm from '../../components/forms/FundingForm'
import WithdrawalForm from '../forms/WithdrawalForm'
import {HiOutlineArrowLeft, HiOutlineArrowRight} from 'react-icons/hi'
import { handleRefPtsConv } from '../../services/refService'
import { getUser } from '../../services/authServices'
//import bgRed from '../../assets/newIcons/Red.svg'
import family from '../../assets/newIcons/Family.svg'
import trophy from '../../assets/newIcons/Trophy.svg'


const Wallet = ({handleEarn, handleAdvertise}) => {
  const [selectFundingBtn, setSelectFundingBtn] = useState(false)
  const [togleWithdrawBtn, setTogleWithdrawBtn] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const wallet = useSelector(selectUserWallet)
  const user = useSelector(selectUser)
  const isLoading = useSelector(selectIsLoading)
  const isError = useSelector(selectIsError)

  // Toggle modal to fund account
  const toggleFundingSelect = (e) => {
    e.preventDefault()
    setSelectFundingBtn(!selectFundingBtn)
}

// Toggle withdraw funds
const handleWithdrawFunds = (e) => {
e?.preventDefault()
setTogleWithdrawBtn(!togleWithdrawBtn)
}

  useEffect(() => {
    async function getWallet() {
      await dispatch(getUserWallet(user?.token))
      if (isError) {
        toast.error("There was a problem getting user wallet values")
      }
    }
    getWallet()
}, [dispatch])

// const convertPts = async(e) => {
//   e.preventDefault()
//   // console.log(user)
//   // return
//   const userId = user.id

//   try {
//     toast.success("Converting in progress...")
//     await handleRefPtsConv(userId)
//     await dispatch(getUserWallet(user?.token))
//     const data = await getUser()
//     await dispatch(SET_USER(data))
//       toast.success("Conversion completed")
//   } catch (error) {
//     toast.error(`Conversion Failed, ${error}`)
//   }
  
 
// }

const handleRefBonus = () => {
  navigate(`/dashboard/ref-bonus/${user.username}`, { state: { data: user } })
}

const handleRefChallenge = () => {
  toast.error("This feature is coming soon")
  return
}

  

  return (
    <div className='w-full h-full flex flex-col justify-between items-center border border-gray-200 rounded-2xl py-6'>
       {selectFundingBtn && <FundingForm toggleFundingSelect={toggleFundingSelect} />}
       {togleWithdrawBtn && <WithdrawalForm handleWithdrawFunds={handleWithdrawFunds} wallet={wallet} user={user}/>}
       {isError && <p className='text-red-400'>Failed to fund account</p>}
      <h3 className='pt-4 font-bold text-gray-600'>My Balance</h3>
      <div className='mt-[1.5rem]'>
        <h1 className='text-3xl text-gray-800 font-extrabold text-center'>{isLoading ? (<LoaderIcon />) : (<span>₦{wallet?.value}</span>)}</h1>

        {/* {!wallet?.refBonWallet ? "" :
        (<div className='w-full flex items-center gap-2 text-sm text-gray-400 font-extrabold text-center'>
          {isLoading ? (<LoaderIcon />) : 
            (<p className='flex gap-2 items-center text-[13px] text-gray-600 text-center'>Referral Pts:<span className='font-light'>{user?.referralBonusPts}Pts</span></p>)
          }
          {user?.referralBonusPts >= 50 ? (<button onClick={convertPts} className='bg-secondary text-primary text-[8px] px-1 rounded-2xl'>Convert</button>) : ""}
        </div>)} */}
      </div>

      {/* Withdraw and fund button */}
      <div className='hidden md:flex gap-2 mt-[1.5rem]'>
        <button onClick={toggleFundingSelect} className='flex-1 bg-secondary text-[9px] md:text-[12px] text-gray-100  px-7 py-0 md:py-3 rounded-full hover:bg-transparent hover:text-tertiary hover:border-tertiary hover:border md:px-10'>Fund</button>
        <button  onClick={handleWithdrawFunds} className='flex-1 bg-transparent border border-gray-500 text-[12px] text-gray-600 px-4 py-2 md:py-3 rounded-full hover:bg-transparent hover:text-tertiary hover:border-tertiary hover:border'>Withdraw</button>
      </div>

      {/* Earn and advertise button */}
      <div className='flex items-center justify-center gap-[2rem] mt-3 md:hidden'>
            <button onClick={handleEarn} className='flex-1 bg-secondary text-[12px] text-gray-100  px-7 py-2 md:py-3 rounded-full hover:bg-transparent hover:text-tertiary hover:border-tertiary hover:border md:px-10'>Earn</button>

            <button onClick={handleAdvertise} className='flex-1 bg-transparent border border-gray-500 text-[12px] text-gray-600 px-4 py-2 md:py-3 rounded-full hover:bg-transparent hover:text-tertiary hover:border-tertiary hover:border'>Advertise</button>
      </div>

      {/* Fund and withdraw mobile */}
      <div className='md:hidden flex gap-2 mt-[1.5rem]'>
        <button onClick={toggleFundingSelect} className='flex items-center gap-1 text-sm text-green-600 mr-[2rem]'><HiOutlineArrowLeft /> Fund</button>
        <button  onClick={handleWithdrawFunds} className='flex items-center gap-1 text-sm text-secondary'>Withdraw<HiOutlineArrowRight /></button>
      </div>

      {/* Ref Bnus and Ref Challenge */}
      <div className='w-[70%] flex flex-col items-center gap-2 mt-[2rem]'>
        <button onClick={handleRefBonus} className='w-full flex items-center gap-1 justify-center bg-tertiary rounded-full text-primary py-2'>Referral Bonus</button>
        <button onClick={handleRefChallenge} className='w-full bg-secondary rounded-full text-primary py-2'>Referral Challenge</button>
      </div>



      <div className='flex px-6 items-center justify-center mt-[4rem] pb-4 gap-5 md:flex'>
        <div className='flex flex-col items-center justify-center mb-[1rem] md:mb-[0rem]'>
          <h3 className='font-semibold text-gray-600 text-[9px] md:text-[12px] text-center'>Total Earnings</h3> 
          <small>{isLoading ? (<LoaderIcon />) : (<span>₦{wallet?.totalEarning}</span>)}</small>
        </div >
        <div className='flex flex-col items-center justify-center mb-[1rem] md:mb-[0rem]'>
          <h3 className='font-semibold text-gray-600 text-[9px] md:text-[12px] text-center'>Pending Balance</h3>
          <small>{isLoading ? (<LoaderIcon />) : (<span>₦{wallet?.pendingBalance}</span>)}</small>
        </div>
        <div className='flex flex-col items-center justify-center mb-[1rem] md:mb-[0rem]'>
          <h3 className='font-semibold text-gray-600 text-[9px] md:text-[12px] text-center'>Amount Spent</h3>
          <small>{isLoading ? (<LoaderIcon />) : (<span>₦{wallet?.amountSpent}</span>)}</small>
        </div>
      </div>
    </div>
  )
}

export default Wallet