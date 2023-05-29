import React, { useEffect } from 'react'
import AdBuyForm from '../../../components/forms/AdBuyForm'
import { useNavigate, useParams } from 'react-router-dom'
import { useState } from 'react'
import { toast } from 'react-hot-toast'
import socialPlatforms from '../../../components/data/assets'
import useRedirectLoggedOutUser from '../../../customHook/useRedirectLoggedOutUser'

const initialState = {
    asset: '',
    roi: '',
    gender: '', 
    religion: '', 
    socialPageLink: '',
    adText: '', 

}

const AdBuy = () => {
    const navigate = useNavigate()
    const [advert, setAdvert] = useState(initialState)
    const [platform, setPlatform] = useState('')
    const [mediaUrl, setMediaUrl] = useState({})
    const [imagePreview, setImagePreview] = useState(null)
    const [expBudget, setExpBudget] = useState(0)
    const [costToPay, setCostToPay] = useState()
    const [earnPerTask, setEarnPerTask] = useState()
    const [theAsset, setTheAsset] = useState('')
    const [socialAsset, setSocialAsset] = useState(null)
    const { param } = useParams()
    


    useEffect(() => {
        setPlatform(param)
    }, [param])

    const {asset, roi, gender, religion, socialPageLink, adText } = advert

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
          !asset ||
          !roi ||
          !gender ||
          !religion || 
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
      const sortPlatform = () => {
        const selectedPlatform = socialPlatforms?.find((item) => item.assetplatform == platform);
        setSocialAsset(selectedPlatform?.assets) 
      }
      sortPlatform()
    }, [platform, socialPlatforms])

    useEffect(() => {
      const selectedAsset = socialAsset?.find((item) => item?.asset == advert?.asset);
      setEarnPerTask(selectedAsset?.amountForTask)
      setExpBudget(selectedAsset?.CostToOrder * advert?.roi)
      setCostToPay(selectedAsset?.CostToOrder)
    }, [advert.asset, advert.roi]) 


  return (
    <div>
       <AdBuyForm 
       platform={platform}
       advert={advert} 
       mediaUrl={mediaUrl}
       imagePreview={imagePreview}
       handleOnSubmit={handleOnSubmit} 
       handleInputChange={handleInputChange} 
       handleImageChange={handleImageChange} 
       expBudget= {expBudget}
       costToPay= {costToPay}
       earnPerTask = {earnPerTask}
       socialAsset= {socialAsset}
       />
    </div>
  )
}

export default AdBuy