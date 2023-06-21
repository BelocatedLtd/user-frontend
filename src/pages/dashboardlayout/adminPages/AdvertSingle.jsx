import React from 'react'
import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { selectAllAdverts, handleGetALLUserAdverts } from '../../../redux/slices/advertSlice';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { selectUsers } from '../../../redux/slices/userSlice';
import { FaUser } from 'react-icons/fa';
import { MdOutlineKeyboardArrowLeft } from 'react-icons/md';
import placeholder from '../../../assets/placeholder.jpg'

const AdvertSingle = () => {
    const {id} = useParams()
    const adverts = useSelector(selectAllAdverts)
    const users = useSelector(selectUsers)
    const [ad, setAd] = useState()
    const navigate = useNavigate()
    const [adverter, setAdverter] = useState()

    useEffect(() => {
      const advert = adverts?.find(advert => advert?._id === id)
      const advertiser = users?.find(user => user._id === advert.userId)
      setAd(advert)
      setAdverter(advertiser)
    }, [])

  return (
    <div className='w-full h-fit'>
      <div className='flex items-center gap-3 border-b border-gray-200 pb-6'>
          <MdOutlineKeyboardArrowLeft size={30} onClick={() => (navigate(-1))}/>
          <div className='flex flex-col'>
              <p className='font-semibold text-xl text-gray-700'>Go back to Adverts</p>
              <small className='font-medium text-gray-500'>Here you can see the advert details clearly and perform all sorts of actions on it.</small>
          </div>
      </div>

      <div className='container shadow-xl py-[2rem] px-[2rem] mt-[2rem]'>
        {/* Advertiser Details */}
        <div className='box flex flex-col border-b border-gray-100 p-3 pb-6'>
        <label htmlFor="adverter" className='text-secondary text-[25px] font-bold'>Avertiser</label>
        <div className='flex items-center gap-3 mt-3'>
          <FaUser size={100} className='text-gray-800'/>
          <div className='flex flex-col gap-1'>
            <h3 className='text-[18px]'>{adverter?.fullname}</h3>
            <small className='text-gray-700 font-semibold'>@{adverter?.username}</small>
            <button className='px-4 py-2 bg-secondary text-primary hover:bg-gray-900 mt-2'>View Advertiser</button>
          </div>
          
        </div>
        </div>

        {/* Advert Details */}
        <div className='flex flex-col  md:flex-row'>
            <div className='box flex flex-col border-b border-gray-100 p-3 pb-6'>
              <label htmlFor="adverter" className='text-secondary text-[25px] font-bold'>Advert Details</label>
              
              <div className='flex items-center gap-[4rem] mt-3'>

                <div className='flex flex-col'>
                  <label htmlFor="" className='font-bold'>Platform:</label>
                  <p>{ad?.platform}</p>
                </div>

                <div className='flex flex-col'>
                  <label htmlFor="" className='font-bold'>Service:</label>
                  <p>{ad?.service}</p>
                </div>

              </div>

              <div className='flex items-center gap-[4rem] mt-3'>
                <div className='flex flex-col'>
                  <label htmlFor="" className='font-bold'>Ad Units:</label>
                  <div className='flex gap-1 items-baseline'>
                    <p>{ad?.desiredROI}</p>
                    <small className='text-[9px] text-gray-700 font-bold'>₦{ad?.costPerTask}/unit</small>
                  </div>
                  
                </div>

                <div className='flex flex-col'>
                  <label htmlFor="" className='font-bold'>Amount:</label>
                  <p>{ad?.adAmount}</p>
                </div>
              </div>

              <div className='flex items-center gap-[4rem] mt-3'>
                <div className='flex flex-col'>
                  <label htmlFor="" className='font-bold'>Ad Tasks:</label>
                  <div className='flex gap-1 items-baseline'>
                    <p>{ad?.tasks}</p>
                    <small className='text-[9px] text-gray-700 font-bold'>₦{ad?.earnPerTask}/task</small>
                  </div>
                </div>

                <div className='flex flex-col'>
                  <label htmlFor="" className='font-bold'>Ad Status:</label>
                  <p className={`
                  ${ad?.status === "Pending" && 'pending'}
                  ${ad?.status === "Running" && 'running'}
                  ${ad?.status === "Allocating" && 'allocating'}
                  ${ad?.status === "Completed" && 'completed'}
                  ${ad?.status === "Rejected" && 'rejected'}
                  `}>
                    {ad?.status}
                  </p>
                </div>
              </div>

            </div>


            <div className='w-[400px] h-[400px] mx-auto mt-6'>
              <img src={ad?.mediaURL ? ad?.mediaURL : placeholder} alt="" className='w-full h-full object-cover'/>
            </div>
        </div>
        
        {/* Advert Controls */}
        <div className='mt-[1rem]'>
          <div className='mb-[1rem] flex items-center gap-1'>
            <input type="checkbox" name="isWeeklyFree" id="" />
            <label htmlFor="">Feature in Weekly free Adverts</label>
          </div>
          
          <div className='flex gap-2'>
            <button className='py-2 px-5 bg-tertiary text-primary'>Delete</button>
            <button className='py-2 px-5 bg-secondary text-primary'>Message Advertiser</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdvertSingle