import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useLocation, useParams } from 'react-router-dom'
import { selectUsers } from '../../../redux/slices/userSlice'
import { useState } from 'react'
import Loader from '../../../components/loader/Loader'

const UserSingle = () => {
  const {id} = useParams()
  const location = useLocation();
  const { user } = location.state || {};
  //const users = useSelector(selectUsers)
  const [userDetail, setUser] = useState()
  const [isLoading, setIsLoading] = useState(false)

  return (
    <div className='w-full h-fit'>
      {isLoading && <Loader />}
      <div className='w-[70%] h-full shadow-xl'>
        <div>
          <label htmlFor="fullname">Fullname</label>
          <p>{user?.fullname}</p>
        </div>
        <div>
          <label htmlFor="fullname">Username</label>
          <p className='text-black'>{user?.username}</p>
        </div>
      </div>
    </div>
  )
}

export default UserSingle