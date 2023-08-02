import React, { useRef } from 'react'
import SidebarLeft from './SidebarLeft'
import SidebarRight from './SidebarRight'
import about from '../../assets/about.png'
import Wallet from '../../components/dashboard/Wallet'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { selectUser, SET_USER } from '../../redux/slices/authSlice'
import { ProfileComplete, ProfileInComplete } from '../../components/protect/profileSetupCheck'
import { useEffect } from 'react'
import { useState } from 'react'
import useRedirectLoggedOutUser from '../../customHook/useRedirectLoggedOutUser'
import { getUser } from '../../services/authServices'
import { toast } from 'react-hot-toast'
import FreeTaskCount from '../../components/dashboard/FreeTaskCount'
import copy from '../../assets/copy.png'
import { getUserWallet, selectUserWallet } from '../../redux/slices/walletSlice'
import { BiArrowToLeft } from 'react-icons/bi'
import {HiOutlineArrowLeft, HiOutlineArrowRight} from 'react-icons/hi'

const Dashboard = () => {
  const inputRef = useRef(null)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [profile, setProfile] = useState(null)
  const wallet = useSelector(selectUserWallet)
  const user = useSelector(selectUser)
  const [profileComplete, setProfileComplete] = useState(false)
  const [refLink, setRefLink] = useState('')
  useRedirectLoggedOutUser('/')

  useEffect(() => {
    if (!user?.fullname || !user?.phone || !user?.location || !user?.gender || !user?.community || !user?.religion) {
      setProfileComplete(true)
    } else {
      setProfileComplete(false)
    }
  }, [user])

  useEffect(() => {
       async function getUserData() {
          const data = await getUser()
         await dispatch(SET_USER(data))
        await dispatch(getUserWallet())
       }
     getUserData()

    const frontEndUrl = window.location.hostname;
    setRefLink(`https://${frontEndUrl}/register/ref/${user?.id}`)
  }, [dispatch])

  const handleEarn = (e) => {
    e.preventDefault()
    if (!user?.location || !user?.community || !user?.gender) {
      toast.error("Please, complete your profile before you can perform tasks")
      navigate('/dashboard/update-profile')
    }
    if (!user?.phone) {
      toast.error("Phone number not verified")
      navigate(`/dashboard/account-settings/${user?.username}`)
    }
    if (user?.phone && user?.location && user?.community && user?.gender)
    (navigate('/dashboard/earn'))
  }

  const handleAdvertise = (e) => {
    e.preventDefault()
    if (!user.location || !user.community || !user.gender) {
      toast.error("Please, complete your profile before you can create Adverts")
      navigate('/dashboard/update-profile')
    }

    if (!user.phone) {
      toast.error("Phone number not verified")
      navigate(`/dashboard/account-settings/${user.username}`)
    }
    if (user.phone && user.location && user.community && user.gender)
    navigate('/dashboard/advertise')
  }

  const handleRefLinkCopy = (e) => {
    inputRef.current.select();
    document.execCommand('copy')
    toast.success('Referral link copied to clipboard')
  }
  

  return (
    <div className='w-full h-fit'>
        <div className='justify-between mx-auto mr-3'>
            <div className={`hero__section flex flex-col w-full h-fit px-5 py-[3rem]  border ${profileComplete ? ('border-tertiary') : ('border-gray-200')} md:flex-row`}>
              <div className='hidden left w-full md:flex md:flex-1'>
                <div className='w-full flex flex-col justify-center items-center'>
                  <img src={about} alt=""  className='w-[150px] border p-[1rem] rounded-full'/>
                  <p className='mt-1'>Welcome, {user?.fullname ? user?.fullname : user?.username}</p>
                  <small className='mb-1'>@{user?.username}</small>
                  <small className='mb-5'>Referred: {user?.referrals?.length}</small>

                  <div className='flex gap-2'>
                    <button onClick={handleEarn} className='flex-1 bg-secondary text-primary px-10 py-3 rounded-full hover:bg-transparent hover:text-tertiary hover:border-tertiary hover:border'>Earn</button>
                    <button onClick={handleAdvertise} className='flex-1 bg-tertiary text-primary px-6 py-3 rounded-full hover:bg-transparent hover:text-tertiary hover:border-tertiary hover:border'>Advertise</button>
                  </div>
                </div>
              </div>

              {/* User Wallet */}
              <div className='right flex-1 w-full mt-6'>
              <p className='text-center text-gray-600 text-[12px]'><span className='text-tertiary'>{user?.freeTaskCount}</span> free tasks remaining this Week</p>
                <Wallet />
              </div>

              <div className='flex items-center justify-center gap-[2rem] mt-3 md:hidden'>
                    <button onClick={handleEarn} className='flex items-center gap-1 text-green-600'><HiOutlineArrowLeft /> Earn</button>

                    <button onClick={handleAdvertise} className='flex items-center gap-1 text-secondary'>Advertise <HiOutlineArrowRight /> </button>
              </div>
            </div>

          

            <ProfileComplete className='flex flex-col justify-center'>
              <FreeTaskCount className="w-full bg-black mx-auto"/>

              <div className='w-full flex flex-col items-center gap-2 justify-center md:flex-row md:justify-center md:items-center md:mx-auto'>
                  <label>Referral Link:</label>
                  <div className='flex items-center gap-2  w-[60%]'>
                    <input type="link" value={refLink} readOnly ref={inputRef} className='w-fit md:w-1/2 p-3 border border-gray-200 rounded-lg items-center'/>
                    <img src={copy} alt="click to copy ref link" className='w-[20px] h-[20px]' onClick={handleRefLinkCopy}/>
                  </div>
              </div>
            </ProfileComplete>
        </div>
    </div>
  )
}

export default Dashboard