import React from 'react'
import ProfileForm from '../../../components/forms/ProfileForm'
import { useDispatch, useSelector } from 'react-redux'
import { handleUpdateUser, selectUser, selectUsername } from '../../../redux/slices/authSlice'
import { useState } from 'react'
import Loader from '../../../components/loader/Loader'
import { redirect, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'


const UpdateProfile = () => {
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate
  const dispatch = useDispatch()
  const user = useSelector(selectUser)
  const username = useSelector(selectUsername)

  const { email } = user

  const nullProfile = async () => {
    if (!email) {
      return redirect('/') 
     }
  }
 

  useEffect(() => {
    nullProfile()
  }, [email, redirect])
  

  const initialState = {
    fullname: user?.fullname,
    location: user?.location,
    community: user?.community,
    gender: user?.gender,
    religion: user?.religion,
  }

  const [profile, setProfile] = useState(initialState)

  const handleInputChange = (e) => {
    const {name, value } = e.target;
    setProfile({ ...profile, [name]: value })
  }

  const formData = {
    userId: user.id,
    fullname: profile?.fullname,
    location: profile?.location,
    community: profile?.community,
    gender: profile?.gender,
    religion: profile?.religion, 

  }

  const handleProfileUpdate = async (e) => {
    e.preventDefault()

    setIsLoading(true)
    try {
      await dispatch(handleUpdateUser(formData))
      //navigate('/dashboard/profile')
      setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
      console.log(error)
    }

  }

  return (
    <>
    {isLoading && <Loader />}
    <ProfileForm user={user} email={email} username={username} profile={profile} handleProfileUpdate={handleProfileUpdate} handleInputChange={handleInputChange} />
    </>
  )
}

export default UpdateProfile