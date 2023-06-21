import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useLocation, useParams } from 'react-router-dom'
import { selectUsers } from '../../../redux/slices/userSlice'
import { useState } from 'react'
import Loader from '../../../components/loader/Loader'
import { FaUser } from 'react-icons/fa'
import { selectAllAdverts } from '../../../redux/slices/advertSlice'
import { selectTasks } from '../../../redux/slices/taskSlice'
import { MdKeyboardDoubleArrowRight, MdOutlineKeyboardDoubleArrowRight } from 'react-icons/md'
import { selectTransactions } from '../../../redux/slices/transactionSlice'
import DeleteModal from '../../../components/adminComponents/DeleteModal'

const UserSingle = () => {
  const {id} = useParams()
  const users = useSelector(selectUsers)
  const adverts = useSelector(selectAllAdverts)
  const tasksList = useSelector(selectTasks)
  const transactionsList = useSelector(selectTransactions)
  const [userAds, setUserAds] = useState()
  const [user, setUser] = useState()
  const [tasks, setTasks] = useState()
  const [trxs, setTrxs] = useState()
  const [isLoading, setIsLoading] = useState(false)
  const [delBtn, setDelBtn] = useState(false)

  useEffect(() => {
   const userDetails = users?.find(user => user?._id === id) 
   const userAdList = adverts?.filter(ads => ads.userId === id)
   const userTasks = tasksList?.filter(task => task.taskPerformerId === id)
   const userTrx = transactionsList?.filter(trx => trx.userId === id)
   setUser(userDetails)
   setUserAds(userAdList )
   setTasks(userTasks)
   setTrxs(userTrx)
  }, [])

  const handleDelete = (e) => {
    e.preventDefault()
    setDelBtn(!delBtn)
  }
  

  return (
    <div className='w-full h-fit'>
      {delBtn && <DeleteModal handleDelete={handleDelete} user={user}/>}
      {isLoading && <Loader />}
      <div className='box flex flex-col border-b border-gray-100 p-3 pb-6 ml-5'>
        <div className='flex items-center gap-[2rem] mt-3'>
          <FaUser size={300} className='text-gray-800 border border-gray-100 p-[2rem] rounded-full'/>
            <div className='flex flex-col gap-1'>
              <h3 className='text-[3rem]'>{user?.fullname ? user?.fullname : user?.username}</h3>
              <small className='text-gray-700 font-semibold'>@{user?.username}</small>
              
              <div className='flex items-center gap-2'>
                <label htmlFor="">Ads Created:</label>
                <p>{userAds?.length}</p>
                <MdOutlineKeyboardDoubleArrowRight size={12} className='text-gray-500'/>
              </div>

              <div className='flex items-center gap-2'>
                <label htmlFor="">Tasks:</label>
                <p>{tasks?.length}</p>
                <MdOutlineKeyboardDoubleArrowRight size={12} className='text-gray-500'/>
              </div>

              <div className='flex items-center gap-2'>
                <label htmlFor="">Transactions:</label>
                <p>{trxs?.length}</p>
                <MdOutlineKeyboardDoubleArrowRight size={12} className='text-gray-500'/>
              </div>
            </div>
        </div>

        <div className='container shadow-xl py-[2rem] px-[2rem] mt-[2rem]'>

        {/* User Details */}
        <div className='flex flex-col  md:flex-row'>
          <div className='box flex flex-col border-b border-gray-100 p-3 pb-6'>
            <label htmlFor="adverter" className='text-secondary text-[25px] font-bold'>User Details</label>
            <div className='flex flex-col gap-[1rem] mt-3 border-b border-gray-50 pb-6'>

              <div className='flex flex-col'>
                <label htmlFor="" className='font-bold'>Email:</label>
                <p>{user?.email}</p>
              </div>

              <div className='flex flex-col'>
                <label htmlFor="" className='font-bold'>Phone:</label>
                <p className=''>{user?.phone}</p>
              </div>

            </div>

            <div className='flex items-center gap-[4rem] mt-3'>
              <div className='flex flex-col'>
                <label htmlFor="" className='font-bold'>State:</label>
                <p>{user?.location}</p>
              </div>

              <div className='flex flex-col'>
                <label htmlFor="" className='font-bold'>LGA:</label>
                <p>{user?.community}</p>
              </div>

            </div>

            <div className='flex items-center gap-[4rem] mt-3'>
              <div className='flex flex-col'>
                <label htmlFor="" className='font-bold'>Gender:</label>
                <div className='flex gap-1 items-baseline'>
                  <p>{user?.gender}</p>
                </div>
                
              </div>

              <div className='flex flex-col'>
                <label htmlFor="" className='font-bold'>Religion:</label>
                <p>{user?.religion}</p>
              </div>
            </div>

            <div className='flex items-center gap-[4rem] mt-3'>
              <div className='flex flex-col'>
                <label htmlFor="" className='font-bold'>Email Verification:</label>
                <div className='flex gap-1 items-baseline'>
                  <p>{user?.isEmailVerified}</p>
                </div>
              </div>

              <div className='flex flex-col'>
                <label htmlFor="" className='font-bold'>Phone Verification:</label>
                  <p>{user?.isPhoneVerified}</p>
              </div>
            </div>

            <div className='flex items-center gap-[4rem] mt-3'>
              <div className='flex flex-col'>
                <label htmlFor="" className='font-bold'>Account Type:</label>
                <div className='flex gap-1 items-baseline'>
                  <p>{user?.accountType}</p>
                </div>
              </div>

              <div className='flex flex-col'>
                <label htmlFor="" className='font-bold'>Weekly Free Tasks:</label>
                  <p>{user?.freeTaskCount}</p>
              </div>
            </div>

          </div>

          {/* Task Media Submit  */}
          <div className='w-[400px] h-[400px] mx-auto mt-6'>
            
          </div>
        </div>
        

        {/* Advert Controls */}
        <div className='mt-[1rem]'>
          
          <div className='flex gap-2'>
            <button onClick={handleDelete} className='py-2 px-5 bg-tertiary text-primary'>Delete User</button>
            <button className='py-2 px-5 bg-secondary text-primary'>Message Advertiser</button>
          </div>
        </div>
      </div>
      </div>
    </div>
  )
}

export default UserSingle