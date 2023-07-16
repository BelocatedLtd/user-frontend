import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { useState } from 'react'
import { BsFillArrowRightCircleFill } from 'react-icons/bs'
import { useEffect } from 'react'
import { selectUser } from '../../redux/slices/authSlice'
import { handleConfirmUserWithdrawal, handleDeleteWithdrawal, selectIsError, selectIsLoading, selectIsSuccess, selectWithdrawals, withdrawUserWallet } from '../../redux/slices/walletSlice'
import { toast } from 'react-hot-toast'
import { selectUsers } from '../../redux/slices/userSlice'
import Loader from '../loader/Loader'
import { confirmWithdrawal, deleteWithdrawal } from '../../services/walletServices'
import { BiArrowBack } from 'react-icons/bi'
import { MdOutlineKeyboardArrowLeft } from 'react-icons/md'

const WithdrawalModal = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const users = useSelector(selectUsers)
    const wds = useSelector(selectWithdrawals)
    const isSuccess = useSelector(selectIsSuccess)
    const isError = useSelector(selectIsError)
    //const wdData = useParams()
    const location = useLocation();
    const { wdDataItem } = location.state || {};
   // const isLoading = useSelector(selectIsLoading)
    const [isLoading, setIsLoading] = useState(false)
    const [wdItem, setWdItem] = useState(null)
    const [wdUser, setWdUser] = useState()
    
    
    const {_id, userId, withdrawAmount, withdrawMethod} = wdDataItem || {}

    useEffect(() => {
        const user = users?.find(user => user._id === wdDataItem?.userId)
        setWdUser(user)
     }, [])   


     console.log(wdDataItem)
     return
   


    const handleOnSubmit = async(e) => {
        e.preventDefault()

        setIsLoading(true)
        const response = await confirmWithdrawal(_id)

        
        if (!response) {
            setIsLoading(false)
            toast.error("Error confirming withdrawal request")
        }

        if (response) {
            setIsLoading(false)
            navigate(`/admin/dashboard/withdrawals/${user?.username}`)
            handleClose()
        }

        setIsLoading(false)
    }

    const handleDelete = async(e) => {
        e.preventDefault()

        setIsLoading(true)
        const response = await deleteWithdrawal(wd?._id)

        if (!response) {
            setIsLoading(false)
            toast.error("Error deleting withdrawal request")
        }

        if (response) {
            setIsLoading(false)
            navigate(`/admin/dashboard/withdrawals/${user?.username}`)
            handleClose()
        }

        setIsLoading(false)
    }

    return (
    <div className='w-full h-fit'>
            {isLoading && (<Loader />)}
            <div className='flex items-center gap-3 border-b border-gray-200 pb-6'>
                <MdOutlineKeyboardArrowLeft size={30} onClick={() => (navigate(-1))}/>
                <div className='flex flex-col'>
                    <p className='font-semibold text-xl text-gray-700'>Go back to Withdrawal Request List</p>
                    <small className='font-medium text-gray-500'>Here you can see the task details clearly and perform all sorts of actions on it.</small>
                </div>
            </div>

            <div className='container flex flex-col mx-auto  w-fit md:w-[50%] h-fit shadow-xl py-[2rem] px-[2rem] mt-[2rem]'>

                <div className='w-full border-b border-gray-200 shadow-sm flex flex-col md:flex-row justify-center items-center py-[1.5rem] gap-1'>
                    <div className='flex items-center gap-1'>
                    <label htmlFor="wallet balance" className='font-bold'>Withdraw Amount:</label>
                    <p>₦{withdrawAmount}</p>
                    </div>   
                </div>

                <div className='w-[85%] md:w-[400px] h-fit flex items-center justify-center mx-auto'>
                    <div className='flex flex-col justify-center items-center md:p-[3rem] gap-2'>
                        <div className='withdraw__method w-full flex-flex-col justify-center text-center mt-[1rem]'>
                            <label htmlFor="fund account" className='w-full font-bold text-[12px]'>This User would like to be paid by <span className='text-tertiary'>{withdrawMethod?.toUpperCase()}</span></label>
                            

                            {/* Airtime */}
                            {withdrawMethod === "airtime" && (
                                <div className='flex flex-col justify-center items-center gap-5 mt-[1rem]'>
                                    <label htmlFor="fund account" className='font-bold text-sm'>{`Send ₦${withdrawAmount} airtime to:`} </label>
                                    <p className='font-bold text-xl text-center'>0{wdUser?.phone}</p>
                                </div>
                            )}

                            {/* Bank Transfer */}
                            {withdrawMethod === "bank transfer" && (
                                <div className='flex flex-col justify-center items-center gap-2 mt-[1rem]'>
                                <label htmlFor="fund account" className='font-bold text-sm'>{`You will transfer the sum of ₦${withdrawAmount} to this bank account details below:`}</label>
                                
                                <div className='flex items-center gap-1'>
                                    <label htmlFor="bankName" className='font-bold'>Bank Name:</label>
                                    <p>{wdUser?.bankName}</p>
                                </div>
                                <div className='flex items-center gap-1'>
                                    <label htmlFor="bankName" className='font-bold'>Account Name:</label>
                                    <p>{wdUser?.accountHolderName}</p>
                                </div>
                                <div className='flex items-center gap-1'>
                                    <label htmlFor="bankName" className='font-bold'>Account Number:</label>
                                    <p>{wdUser?.bankAccountNumber}</p>
                                </div>
                                </div>
                            )}
    
                        </div>

                        <div className='flex flex-col md:flex-row items-center'>
                        {/* {confirmBtn && (<button onClick={confirmWithdrawalMethod} className='bg-tertiary text-gray-100 px-6 py-1 mt-5'>Confirm</button>)} */}

                        <button onClick={handleOnSubmit} className='bg-gray-800 text-gray-100 px-6 py-1 mt-5'>
                                <>
                                {!isLoading && ("Approve")}
                                {isLoading && ("Confirming...")}
                                </>   
                        </button>
                        <button onClick={handleDelete} className='bg-tertiary text-gray-100 px-6 py-1 mt-5'>
                                <>
                                {!isLoading && ("Delete")}
                                {isLoading && ("Deleting...")}
                                </>   
                        </button>
                        </div>
                        <small onClick={() => navigate(-1)} className='flex items-center gap-1'><BiArrowBack/> Go Back</small>
                    </div>
                </div>              
            </div>
    </div>
    )}

export default WithdrawalModal