import React from 'react'
import { BsFillPlusCircleFill } from 'react-icons/bs'
import { MdOutlineKeyboardArrowLeft } from 'react-icons/md'
import close from '../../../assets/close.svg'
import facebook from '../../../assets/social icons/facebook.svg'
import AdItem from '../../../components/dashboard/AdItem'
import adCampaigns from '../../../components/data/adData'
import useRedirectLoggedOutUser from '../../../customHook/useRedirectLoggedOutUser'
import { useDispatch, useSelector } from 'react-redux'
import { handleGetUserAdverts, selectAdverts, selectIsError, selectIsLoading } from '../../../redux/slices/advertSlice'
import { useEffect } from 'react'
import { LoaderIcon, toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import Loader from '../../../components/loader/Loader'

const CampaignStats = () => {
  const adverts = useSelector(selectAdverts)
  const isLoading = useSelector(selectIsLoading)
  const isError = useSelector(selectIsError)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  useRedirectLoggedOutUser('/login')

  useEffect(() => {
    const getAdverts = async() => {
      await dispatch(handleGetUserAdverts()) 
    }
    getAdverts()

    if (isError) {
      toast.error("Failed to retrieve adverts, please reload page")
      navigate(-1)
    }
  }, [dispatch])

  return (
    <div className='w-fit md:w-full h-fit'>
            {isLoading && <Loader />}
      <div className='flex items-center justify-between gap-3 border-b border-gray-200 pb-6'>
                <div className='flex items-center'>
                  <MdOutlineKeyboardArrowLeft size={30} onClick={() => (navigate(-1))} className='mr-1'/>
                      <div className='flex flex-col'>
                          <p className='font-semibold text-xl text-gray-700'>My Ad Campaigns</p>
                          <small className='font-medium text-gray-500'>Click <span className='text-secondary'>here</span> to see and monitor your adverts</small>
                      </div>
                </div>
                  <small className='bg-secondary rounded-full p-4 text-primary'>{adverts.length}</small>
                  <button onClick={() => navigate('/dashboard/earn')} className='flex items-center gap-1 bg-secondary text-primary rounded-full px-5 py-2 mr-5 text-[12px] md:text-[15px] hover:bg-tertiary'><BsFillPlusCircleFill />Campaign</button>
      </div>

      <div className='w-fit md:w-full'>
        {adverts.map((item) => (
          <AdItem  
            key={item._id}
            socialIcon={item.platform} 
            date={item.createdAt} 
            title={`Buy ${item.desiredROI} ${item.platform} ${item.service}`}
            adperPostAmt={`${item.costPerTask} Per Ad`}
            roi={item.desiredROI}
            adBudget={item.adAmount}
            tasks={item.tasks}
            adService={item.service}
            status={item.status}
            adDesc={item.caption}
            state={item.state}
            lga={item.lga}
            religion={item.religion}
            item={item}
          />
        ))}
      </div>
    </div>
  )
}

export default CampaignStats