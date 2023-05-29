import React, { useEffect } from 'react'
import { MdOutlineKeyboardArrowLeft } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'
import useRedirectLoggedOutUser from '../../../customHook/useRedirectLoggedOutUser'
import { socialMenu } from '../../../components/data/SocialData'
import { useDispatch, useSelector } from 'react-redux'
import { handleGetUserAdverts, selectAdverts, selectIsLoading } from '../../../redux/slices/advertSlice'
import { useState } from 'react'
import Loader from '../../../components/loader/Loader'
import { SET_USER, SET_USERNAME, selectUser } from '../../../redux/slices/authSlice'
import { getUser } from '../../../services/authServices'


const Earn = () => {
    const navigate = useNavigate()
    const adverts = useSelector(selectAdverts)
    const dispatch = useDispatch(selectAdverts)
    const isLoading = useSelector(selectIsLoading)
    const [platform, setPlatform] = useState('')
    const user = useSelector(selectUser)
    useRedirectLoggedOutUser('/login')


useEffect(() => {
    const handleGetTasks = async() => {
        await dispatch(handleGetUserAdverts())
    }
    handleGetTasks()
}, [dispatch])

    const handleSelect = (e, platform) => { 
        e.preventDefault(e)
        const filteredAdverts = adverts?.filter(advert => advert?.platform === platform);
        navigate(`/dashboard/taskearn/${platform}`, { state:{ filteredAdverts } });
    }

  return (
    <div className='w-full h-fit'>
        {isLoading && <Loader />}
        {adverts === [] && <Loader />}

        <div className='justify-between mx-auto mr-5'>
            <div className='flex items-center gap-3 border-b border-gray-200 pb-6'>
                <MdOutlineKeyboardArrowLeft size={30} onClick={() => (navigate(-1))}/>
                <div className='flex flex-col'>
                    <p className='font-semibold text-xl text-gray-700'>Perform Social Tasks and Earn</p>
                    <small className='font-medium text-gray-500'>When you click on a platform, you will see only the Tasks you are qualified to Perform</small>
                </div>
            </div>

            <div className='flex items-center gap-3 border-b border-gray-200'>
                <p className='font-normal text-[14px] text-gray-700 p-6'>You can earn consistently by posting adverts of various businesses and top brands on your social media accounts and performing simple social media tasks. To get started, simply click on any of the earning options shown below:</p>
            </div>

            <div className='flex flex-col gap-[3rem] items-center justify-center mt-[1rem] px-3 py-5'>
                {socialMenu.map(menu => (
                <div className='flex items-center gap-5' key={menu?.value}>
                    <div className='flex flex-col'>
                        <div className='flex items-center justify-center w-[100px] h-[100px] bg-gray-50 rounded-t-xl rounded-b-2xl'>
                            <img src={menu?.icon} alt="" className='object-cover rounded-full p-2'/>
                        </div>
                        <button onClick={e => handleSelect(e, menu?.value)} className='px-5 py-3 border border-gray-200 mt-5'>Select</button>
                    </div>
                    
                    <div className='w-full'>
                        <div className='flex flex-col md:flex-row md:justify-between md:items-center md:border-b md:border-gray-100' >
                            <div className='flex flex-col w-[70%]'>
                                <h3 className='font-bold text-[20px] text'>{menu?.title}</h3>
                                <p className='pb-3 text-[14px] text-gray-500 font-semibold'><span className='font-extrabold'>Earning: </span> Starts from ₦{menu?.earn}/Task Completed & Approved</p>
                            </div>
                            <div className='w-full md:text-right'>
                            <small className='py-2 px-5 bg-green-700 text-primary rounded-2xl'>{adverts?.filter(advert => advert?.platform === menu?.value).length} Tasks Available</small>
                            </div>
                        </div>
                        <p className='font-normal text-[14px] text-gray-700 mt-3'>{menu?.desc}</p>
                    </div>
                </div>
                ))}
            </div>
        </div>
    </div>
  )
}

export default Earn