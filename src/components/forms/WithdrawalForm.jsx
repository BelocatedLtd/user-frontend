import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import close from '../../assets/close.svg'
import  ReactDOM  from 'react-dom'
import { BsFillArrowRightCircleFill } from 'react-icons/bs'
import { useEffect } from 'react'
import { selectUser } from '../../redux/slices/authSlice'
import { selectIsError, selectIsLoading, selectIsSuccess, withdrawUserWallet } from '../../redux/slices/walletSlice'
import { toast } from 'react-hot-toast'

const initialState = {
    withdrawalMethod: "",
    withdrawalAmount: null,
    withdrawalStatus: ""
}

const WithdrawalForm = ({handleWithdrawFunds, wallet, user}) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const isSuccess = useSelector(selectIsSuccess)
    const isError = useSelector(selectIsError)
    const isLoading = useSelector(selectIsLoading)
    const [formProgression, setFormProgression] = useState("")
    const [confirmBtn, setConfirmBtn] = useState(false)
    const [withdrawDetails, setWithdrawDetails] = useState(initialState)
    const [withdrawMethod, setWithdrawMethod] = useState("")
    const [withdrawAmount, setWithdrawAmount] = useState()
    const [walletBalance, setwalletBalance] = useState(wallet?.value)
    

      const handleWithdrawalMethodChange = (event) => {
        setWithdrawMethod(event.target.value);
      }

    //   const {withdrawalMethod, withdrawalAmount, withdrawalStatus} = withdrawDetails

    useEffect(() => {
        if (withdrawMethod === "airtime"){
            setFormProgression("airtime")
            setConfirmBtn(true)

        }

        if (withdrawMethod === "bank transfer"){
            setFormProgression("bank transfer")
            setConfirmBtn(true)
        }

        if (withdrawMethod === ""){
            setFormProgression("")
            setConfirmBtn(false)
        }
    }, [withdrawMethod])

    const handleWithdrawalAmount = (event) => {
        setWithdrawAmount(event.target.value)
        setwalletBalance(wallet?.value - withdrawAmount)
    }

    const confirmedWithdrawalDetails = {
        userId: user.id,
        withdrawalMethod: withdrawMethod,
        withdrawAmount: withdrawAmount,
    }


    const handleOnSubmit = async(e) => {
        e.preventDefault()

        console.log(confirmedWithdrawalDetails)

        await dispatch(withdrawUserWallet(confirmedWithdrawalDetails))

        if (isError) {
            toast.error("Error sending withdrawal request")
        }

        if (isSuccess) {
            handleWithdrawFunds()
            navigate(`/dashboard/${user.username}`)
        }
        
        
    }

    return ReactDOM.createPortal(
        <div className='wrapper'>
            <div className='relative modal w-[85%] md:w-[600px] h-fit md:py-[2rem]  bg-primary'>
                <img src={close} alt="close" onClick={handleWithdrawFunds} size={40} className='absolute top-[-1rem] right-[-1rem] text-tertiary' />

                <div className='w-full border-b border-gray-200 shadow-sm flex flex-col md:flex-row justify-center items-center py-[1.5rem] gap-1'>
                    <div className='flex items-center gap-1'>
                    <label htmlFor="wallet balance" className='font-bold'>Wallet Balance:</label>
                    <p>₦{walletBalance}</p>
                    </div>   
                </div>

                <div className='w-fit md:w-[400px] h-fit flex items-center justify-center mx-auto'>
                {wallet?.value === 0 && (<p className="w-full md:w-full text-gray-600 text-center font-bold">Wallet is Empty, Perform Tasks to start earning</p>)}

                {wallet?.value > 0 && (
                        <form onSubmit={handleOnSubmit} className='flex flex-col justify-center items-center p-[3rem] gap-2'>
                        <label htmlFor="fund account" className='font-bold text-sm'>How would you like to be paid?</label>
                        <select name="withdrawalMethod" value={withdrawMethod} className='border border-gray-300 p-3 mb-2' onChange={handleWithdrawalMethodChange}>
                            <option value="">Select Withdrawal Method</option>
                            <option value="airtime">Airtime</option>
                            <option value="bank transfer">Bank Transfer</option>
                        </select>

                    

                        <div className='withdraw__method'>
                            {/* Airtime */}
                            {formProgression === "airtime" ? (
                                <div className='flex flex-col justify-center items-center gap-5'>
                                    {/* Withdrawal Amount */}
                                    <div className='flex flex-col md:flex-row'>
                                        <label htmlFor="fund account" className='font-bold text-sm'>How much would you like to withdraw?</label>
                                        <input type="number" name='withdrawalAmount' placeholder='₦' value={withdrawAmount} onChange={handleWithdrawalAmount} className='border border-gray-600 py-2 px-2'/>
                                    </div>
                                    
                                    <label htmlFor="fund account" className='font-bold text-sm'>We will send your airtime to your registered Phone number?</label>
                                        <p className='font-bold text-xl text-center'>0{user?.phone}</p>
                                    <small className='font-medium text-gray-600'><span className='text-tertiary font-bold text-center'>Note:</span> Please make sure the number is currently</small>
                                </div>
                            ) : ""}

                            {/* Bank Transfer */}
                            {formProgression === "bank transfer" ? (
                                <div className='flex flex-col justify-center items-center gap-2'>
                                    <div className='flex flex-col md:flex-row'>
                                        <label htmlFor="fund account" className='font-bold text-sm'>How much would you like to withdraw?</label>
                                        <input type="number" name='withdrawalAmount' placeholder='₦' value={withdrawAmount} onChange={handleWithdrawalAmount} className='border border-gray-600 py-2 px-2'/>
                                    </div>

                                    <label htmlFor="fund account" className='font-bold text-sm'>We will transfer your withdrawed funds to this bank account?</label>
                                    
                                    <div className='flex items-center gap-1'>
                                        <label htmlFor="bankName" className='font-bold'>Bank Name:</label>
                                        <p>{user.bankName}</p>
                                    </div>
                                    <div className='flex items-center gap-1'>
                                        <label htmlFor="bankName" className='font-bold'>Account Name:</label>
                                        <p>{user.accountHolderName}</p>
                                    </div>
                                    <div className='flex items-center gap-1'>
                                        <label htmlFor="bankName" className='font-bold'>Account Number:</label>
                                        <p>{user.bankAccountNumber}</p>
                                    </div>
                                </div>
                            ) : ""}
                        </div>

                        <div className='flex items-center'>
                        {/* {confirmBtn && (<button onClick={confirmWithdrawalMethod} className='bg-tertiary text-gray-100 px-6 py-1 mt-5'>Confirm</button>)} */}

                        <button type='submit' className='bg-gray-800 text-gray-100 px-6 py-1 mt-5'>
                            {withdrawMethod && withdrawAmount ? (
                                <>
                                 {!isLoading && ("Send Request")}
                                {isLoading && ("Sending Request...")}
                                {isError && ("Sending Failed")}
                                </>
                            ) : ""}
                            
                        </button>
                        </div>
                    </form>
                )}
                </div>
                
                
            </div>
    </div>,
        document.getElementById("backdrop")
      )
}

export default WithdrawalForm