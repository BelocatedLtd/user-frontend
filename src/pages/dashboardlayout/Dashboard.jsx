import React from 'react'
import SidebarLeft from './SidebarLeft'
import SidebarRight from './SidebarRight'
import about from '../../assets/about.png'
import Wallet from '../../components/dashboard/Wallet'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { selectUsername, selectUser, SET_USER, SET_USERNAME } from '../../redux/slices/authSlice'
import { ProfileComplete, ProfileInComplete } from '../../components/protect/profileSetupCheck'
import { useEffect } from 'react'
import { useState } from 'react'
import useRedirectLoggedOutUser from '../../customHook/useRedirectLoggedOutUser'
import { getUser } from '../../services/authServices'
import { toast } from 'react-hot-toast'
import FreeTaskCount from '../../components/dashboard/FreeTaskCount'

const Dashboard = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [profile, setProfile] = useState(null)
  const username = useSelector(selectUsername)
  const user = useSelector(selectUser)
  useRedirectLoggedOutUser('/')

  useEffect(() => {
      async function getUserData() {
        if (!user.email) {
        const data = await getUser()
        setProfile(data)
        await dispatch(SET_USER(data))
       dispatch(SET_USERNAME(data?.username))
        }
      }
    getUserData()
  }, [dispatch])

  const handleEarn = (e) => {
    e.preventDefault()
    if (!user.phone || !user.location || !user.community || !user.gender) {
      toast.error("Please, complete your profile before you can perform tasks")
    }
    if (user.phone && user.location && user.community && user.gender)
    (navigate('/dashboard/earn'))
  }

  const handleAdvertise = (e) => {
    e.preventDefault()
    if (!user.phone || !user.location || !user.community || !user.gender) {
      toast.error("Please, complete your profile before you can create Adverts")
    }
    if (user.phone && user.location && user.community && user.gender)
    navigate('/dashboard/advertise')
  }
  

  return (
    <div className='w-full h-fit'>
        <div className='justify-between mx-auto mr-3'>
            <div className='hero__section flex flex-col w-full h-fit px-5 py-[3rem] border border-gray-200 md:flex-row'>
              <div className='hidden left w-full md:flex md:flex-1'>
                <div className='w-full flex flex-col justify-center items-center'>
                  <img src={about} alt=""  className='w-[150px] border p-[1rem] rounded-full'/>
                  <p className='mt-1'>Welcome, {user.fullname ? user.fullname : username}</p>
                  <small className='mb-5'>@{username}</small>

                  <div className='flex gap-2'>
                    <button onClick={handleEarn} className='flex-1 bg-secondary text-primary px-10 py-3 rounded-full hover:bg-transparent hover:text-tertiary hover:border-tertiary hover:border'>Earn</button>
                    <button onClick={handleAdvertise} className='flex-1 bg-tertiary text-primary px-6 py-3 rounded-full hover:bg-transparent hover:text-tertiary hover:border-tertiary hover:border'>Advertise</button>
                  </div>
                </div>
              </div>

              {/* User Wallet */}
              <div className='right flex-1 w-full mt-6'>
              <p className='text-center text-gray-600 text-[12px]'><span className='text-tertiary'>{user.freeTaskCount}</span> Tasks remaining to complete this week's free tasks </p>
                <Wallet />
              </div>
            </div>

          

        <ProfileInComplete>
          <div className="w-full flex justify-center mt-[1rem]">
            <FreeTaskCount/>
          </div>
        <div className='w-full flex flex-col justify-center items-center h-fit my-5 px-5 py-[3rem] border border-tertiary'>
              <small className='px-[2rem] text-[15px] text-gray-600 text-center'>Welcome, <span className='text-tertiary'>@{username}</span>. Your account setup is incomple click below to completely set up your belocated account so you can start fulfilling tasks and making or set up ad campaigns to promote your product or services.</small>

              <div className='w-fit text-[10px] bg-green-700 text-gray-100 px-3 py-3 mt-5 rounded-2xl'>180 tasks posted today for you to perform and make money</div>

              <button onClick={() => (navigate(`/dashboard/profile/`))} className='bg-tertiary text-gray-100 px-6 py-3 mt-5'>Complete Profile Setup</button>
            </div>
        </ProfileInComplete>

        <ProfileComplete>
        <FreeTaskCount className="w-full bg-black mx-auto"/>
            <div className='w-full flex flex-col justify-center items-center h-fit my-5 px-5 py-[3rem] border border-gray-200'>
              <small className='px-[2rem] text-[15px] text-gray-600 text-center'>Welcome, <span className='text-secondary'>@{username}</span>. Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam perspiciatis voluptatum mollitia animi quas id possimus rem qui esse maxime.</small>

              <div className='w-fit text-[10px] bg-green-700 text-gray-100 px-3 py-3 mt-5 rounded-2xl'>180 tasks posted today for you to perform and make money</div>

              <button onClick={() => (navigate('/dashboard/earn'))} className='bg-transparent border border-gray-300 px-6 py-3 mt-5'>Perform Tasks & Earn</button>
            </div>
          </ProfileComplete>
        </div>
    </div>
  )
}

export default Dashboard