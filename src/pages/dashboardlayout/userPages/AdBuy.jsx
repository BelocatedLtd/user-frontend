import React, { useEffect } from 'react'
import AdBuyForm from '../../../components/forms/AdBuyForm'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { useState } from 'react'
import { toast } from 'react-hot-toast'
import socialPlatforms from '../../../components/data/assets'
import useRedirectLoggedOutUser from '../../../customHook/useRedirectLoggedOutUser'

const initialState = {
    roi: '',
    gender: '', 
    socialPageLink: '',
    adText: '', 
}

const AdBuy = () => {
    const navigate = useNavigate()
    const [advert, setAdvert] = useState(initialState)
    const [mediaUrl, setMediaUrl] = useState({})
    const [imagePreview, setImagePreview] = useState(null)
    const [expBudget, setExpBudget] = useState(0)
    const [costToPay, setCostToPay] = useState()
    const [earnPerTask, setEarnPerTask] = useState()
    const {platformName} = useParams();
    const location = useLocation();
    const { selectedPlatformObject, service } = location.state || {};
    const [socialService, setSocialService] = useState(null)
    

    const {roi, gender, socialPageLink, adText } = advert

    const handleInputChange = (e) => {
        const {name, value } = e.target;
        setAdvert({ ...advert, [name]: value })
      }

     //Handle image preview
    const handleImageChange = (e) => {
        setMediaUrl(e.target.files[0])
        setImagePreview(URL.createObjectURL(e.target.files[0]))
        
    }

    const handleOnSubmit = async (e) => {
        e.preventDefault()
    
        if (
          !service ||
          !roi ||
          !gender ||
          !adText ||
          !mediaUrl
          ) {
          return toast.error("Make Sure All Fields Filled")
        }
    
        if (
          !mediaUrl
          ) {
          return toast.error("Please upload an image or video")
        }
    }


    useEffect(() => {
      const selectedService = selectedPlatformObject.assets?.find((item) => item?.asset == service);
      setEarnPerTask(selectedService?.amountForTask)
      setExpBudget(selectedService?.CostToOrder * advert?.roi)
      setCostToPay(selectedService?.CostToOrder)
    }, [service, advert.roi]) 


  return (
    <div>
       <AdBuyForm 
       platform={platformName}
       service={service}
       advert={advert} 
       mediaUrl={mediaUrl}
       imagePreview={imagePreview}
       handleOnSubmit={handleOnSubmit} 
       handleInputChange={handleInputChange} 
       handleImageChange={handleImageChange} 
       expBudget= {expBudget}
       costToPay= {costToPay}
       earnPerTask = {earnPerTask}
       socialService= {socialService}
       />
    </div>
  )
}

export default AdBuy