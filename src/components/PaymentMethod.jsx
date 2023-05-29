import React from 'react'
import close from '../assets/close.svg'
import  ReactDOM  from 'react-dom'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FlutterWaveButton, closePaymentModal } from 'flutterwave-react-v3';
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { selectUser } from '../redux/slices/authSlice'
import { fundUserWallet, getUserWallet, selectUserWallet } from '../redux/slices/walletSlice'
import { useEffect } from 'react'
//import { createAdvert  } from '../services/advertService'
import { createNewAdvert, selectIsLoading, selectIsSuccess, selectIsError } from '../redux/slices/advertSlice'
import { CheckmarkIcon, LoaderIcon } from 'react-hot-toast'
import Loader from './loader/Loader'

const payment__key = process?.env?.FLUTTER_PUBLIC_KEY

const PaymentMethod = ({togglePaymentSelect, formData}) => {
    const dispatch = useDispatch()
   const [canPay, setCanPay] = useState(false)
   const navigate = useNavigate()
   const isLoading = useSelector(selectIsLoading)
   const isSuccess = useSelector(selectIsSuccess)
   const isError = useSelector(selectIsError)
   const user = useSelector(selectUser)
   const wallet = useSelector(selectUserWallet)

   useEffect(() => {
    const getWallet = async() => {
        await dispatch(getUserWallet())
    }
    getWallet()
   }, [dispatch, wallet])

   const {platform, asset, desiredROI, costPerTask, earnPerTask, gender, location, community, religion, caption, mediaURL, socialPageLink, expBudget} = formData
   

   useEffect(() => {
    if (wallet.value >= expBudget) {
        setCanPay(true)
    }else if (wallet.value < expBudget) {
        setCanPay(false)
    }
   }, [wallet, expBudget])

   const title = `Buy ${desiredROI} ${platform} ${asset}`

   const formDataForPayment = {
    userId: user.id, 
    platform, 
    asset,
    desiredROI, 
    costPerTask,
    earnPerTask,
    gender, 
    location, 
    community,
    religion, 
    caption, 
    mediaURL,
    socialPageLink, 
    adAmount: expBudget
}

   //make payment from available wallet fund
   const handlePayment = async () => {
    if (canPay) {
        await dispatch(createNewAdvert(formDataForPayment))
        navigate('/dashboard/campaign-stats')
    } else {
        toast.error("Insufficient fund, fund your wallet")
    }
   }

// Fund wallet using flutterwave
    const config = {
        public_key: payment__key,
        tx_ref: Date.now(),
        amount: expBudget,
        currency: 'NGN',
        payment_options: 'card,mobilemoney,ussd',
        customer: {
        email: user.email,
        phone_number: user.phone,
        name: user.fullname,
        },
        customizations: {
        title: title,
        description: caption,
        },
    };

    const fwConfig = {
        ...config,
        text: 'Fund Wallet',
        callback: async (response) => {
                const trxData = {
                    userId: user.id,
                    email: response?.customer?.email,
                    date: response.created_at,
                    chargedAmount: response.charged_amount,
                    trxId: response.transaction_id,
                    paymentRef: response.flw_ref,
                    status: response.charge_response_message
                }

                await dispatch(fundUserWallet(trxData))
        closePaymentModal()
        },
        onClose: () => {
            navigate(-1)
        },
    };
   

    return ReactDOM.createPortal(
        <div className='wrapper'>
            <div className='relative modal w-[600px] h-[550px] bg-primary'>
            <img src={close} alt="close" onClick={togglePaymentSelect} size={40} className='absolute top-[-1rem] right-[-1rem] text-tertiary' />
            <div className='w-full px-[3rem] py-[4rem]'>
                <h1 className='font-bold mb-3 text-xl'>Hello Payment Method</h1>
                <div className='mb-5 border-b border-gray-200 pb-6'>
                    <h3 className='font-bold mb-2 text-lg text-gray-700'>100% Secure, Reliable & Fast Payment </h3>
                    <small className='text-gray-700'>Pay through our highly secured online payment partner using your masterCard/VISA/Verve card. Bank transfer via USSD or internet  bank transfer. You can select your preferred online payment method on the payment checkout page that comes up.</small>
                </div>

                <div className=' flex flex-col'>
                    <h3 className='font-bold text-lg text-gray-700'>Pay with your Wallet </h3>
                    <small className='font-bold mt-2'>Wallet Balance: ₦{wallet.value}</small>

                    {!canPay && 
                    <div className='flex flex-col justify-center'>
                        <p className='bg-red-400 text-primary p-5 my-3'>Your wallet is insufficient to perform this transaction. Click the button below to fund your wallet now</p>
                        <FlutterWaveButton {...fwConfig}  className='px-6 py-2 bg-secondary text-primary' />
                    </div>
                    }
                    {canPay && 
                    <div className='flex flex-col justify-center'>
                        <p className='bg-secondary text-primary p-5 my-3'>Pay for this advert with the funds in your wallet. Click the button below to pay</p>
                            <button onClick={handlePayment} className='px-6 py-2 bg-red-400 text-primary text-center'>
                            {!isLoading && `Pay ₦${expBudget}`}
                            {isLoading && 'Paying...'}
                        </button> 
                    </div>}
                </div>
            </div>
              

            </div>
        </div>,
        document.getElementById("backdrop")
      )
}

export default PaymentMethod