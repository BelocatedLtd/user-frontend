import React from 'react'
import { useState } from 'react'
import image from '../../assets/animated icons/image.gif'
import video from '../../assets/animated icons/video.gif'
import  nigerianStates  from '../data/States'
// import socialPlatforms from '../data/assets'
import { useEffect } from 'react'
import PaymentMethod from '../PaymentMethod'
import { toast } from 'react-hot-toast'


const AdBuyForm = ({advert, service, platform, mediaUrl, socialService, expBudget, costToPay, earnPerTask, imagePreview, handleOnSubmit, handleInputChange, handleImageChange }) => {
    const [mediaTypeImage, setMediaTypeImage] = useState('image')
    const [selectPaymentBtn, setSelectPaymentBtn] = useState(false)
    const [hideInputFields, setHideInputFields] = useState(false)
    const [selectedState, setSelectedState] = useState("")
    const [selectedStateCommunities, setSelectedStateCommunities] = useState([])
    const [selectedCommunity, setSelectedCommunity] = useState("")


    useEffect(() => {
      if (platform === "tiktok" && service === "Page Followers") {
        setHideInputFields(true)
      }
    }, [platform, service])
    

    


    const handleStateChange = (event) => {
      const index = event.target.value;
      setSelectedState(index);
      setSelectedCommunity("");

      sortState()
    }

    const sortState = () => {
      const selectedStateObject = nigerianStates?.find((item) => item.state === selectedState);
      setSelectedStateCommunities(selectedStateObject?.community) 
    }

    const handleCommunityChange = (event) => {
      const city = event.target.value;
      setSelectedCommunity(city);
    }

    const toggleMediaTypeImage = () => {
            setMediaTypeImage('image')
    }

    const toggleMediaTypeVideo = () => {
        setMediaTypeImage('video')
    }

    const formData = {
      platform,
      service: service,
      desiredROI: advert.roi,
      gender: advert.gender,
      state: selectedState,
      lga: selectedCommunity,
      caption: advert.adText,
      mediaURL: mediaUrl,
      socialPageLink: advert.socialPageLink,
      costPerTask: costToPay,
      expBudget,
      earnPerTask,
      
    }

    

    const togglePaymentSelect = (e) => {
      e.preventDefault()


      if (!service || !advert.roi || !advert.gender || !selectedState || !selectedCommunity || !expBudget ) {
        toast.error("Some required fields are empty, please fill in all the fields")
      } else {
       setSelectPaymentBtn(!selectPaymentBtn)
      }
  }

  console.log(service)

  


  return (
    <div className='w-full h-fit'>
      {selectPaymentBtn && <PaymentMethod togglePaymentSelect={togglePaymentSelect} formData={formData} />}
       <form onSubmit={togglePaymentSelect} className='w-full p-6 border border-semi_tertiary rounded-2xl flex flex-col text-center gap-6'>
                <div className='form__container flex flex-col w-full md:flex-row'>
                  <div className='left flex-1 md:border-r md:border-gray-100 md:pr-5'>

                          {/* Services */}
                          <div className='flex flex-col md:gap-6 w-full md:flex-row'>
                            <div className='flex flex-col mt-3 mb-3'>
                                <label htmlFor="Product Name " className='text-left'>Service</label>
                                <input  value={service} disabled className='w-full shadow-inner p-3 bg-transparent border border-gray-200 rounded-xl' />
                                <small className='text-left'>{platform} service to advertise on</small>
                            </div>
                          </div>

                            {/* Expt Budget and ROI */}
                            <div className='flex flex-col w-full items-center md:gap-3 md:flex-row'>
                            <div className='flex flex-col mt-3 mb-3'>
                                <label htmlFor="Business Name" className='text-left mb-1 ml-1'>Expected ROI</label>
                                <input type="number" placeholder='' name='roi' value={advert.roi} onChange={handleInputChange} className='w-full shadow-inner p-3 bg-transparent border border-gray-200 rounded-xl'/>
                                <small className='text-left'>Expected Cost per unit For this Campaign: ₦{costToPay}/task</small>
                            </div>
                            <div className='flex flex-col mb-3 justify-center'>
                            <label className='text-left mb-1 ml-1 text-sm'>You will Pay:</label>
                            <div className='flex items-center ml-2'>
                            <span>₦</span>
                            <input type="number" placeholder='' value={expBudget} disabled className='w-full text-gray-800 bg-transparent text-sm font-extrabold'/>
                            </div>
                              
                            </div>
                          </div>
                          

                          <div className='flex flex-col w-full md:flex-row md:gap-6'>
                          <div className='flex flex-col mt-3 mb-3'>
                              <label htmlFor="location" className='text-left mb-1 ml-1'>State</label>
                                <select 
                                  className='w-full shadow-inner p-3 bg-transparent border border-gray-200 rounded-xl'
                                  value={selectedState}
                                  name={selectedState}
                                  onChange={handleStateChange}>
                                    <option value="">Select a state</option>
                                    <option value="All">All</option>
                                    {nigerianStates?.map((object, index) => (
                                      <option key={index} value={object.state}>{object.state}</option>
                                    ))}
                                </select>
                          </div>

                          {selectedState !== "" && (
                            <div className='flex flex-col mt-3 mb-3'>
                            <label htmlFor="city-select" className='text-left mb-1 ml-1'>LGAs from {selectedState}</label>
                              <select
                                className='w-full shadow-inner p-3 bg-transparent border border-gray-200 rounded-xl'
                                value={selectedCommunity}
                                name={selectedCommunity}
                                onChange={handleCommunityChange}>
                                  <option value="">Select LGA</option>
                                  <option value="All">All</option>
                                  {nigerianStates
                                    .find((obj) => obj.state === selectedState)
                                    ?.community.map((city, index) => (
                                      <option key={index} value={city}>{city}</option>
                                    ))}
                              </select>
                            </div>
                          )}
                          </div>

                                  
                          <div className='flex flex-col w-full md:flex-row md:gap-6'>
                            <div className='flex flex-col mt-3 mb-3'>
                                <label htmlFor="Gender" className='text-left mb-1 ml-1'>Gender</label>
                                <select name="gender" id="gender" value={advert.gender} onChange={handleInputChange} className='w-full shadow-inner p-3 bg-transparent border border-gray-200 rounded-xl'>
                                    <option value="">Select a Gender</option>
                                    <option value="All">All</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                </select>
                            </div>
                          </div>

                          {hideInputFields ? "" : (
                          <div className='flex flex-col mt-3 mb-1'>
                              <label htmlFor="badText" className='text-left mt-4 mb-1 ml-1'>{service == "Comment" ? "Comment" : "Caption"}</label>
                              <textarea type="textarea" cols="80" rows="10" name='adText' value={advert.adText} onChange={handleInputChange} className='shadow-inner bg-transparent border border-gray-200 rounded-xl p-3 mb-1 w-[100%]'/>
                          </div>
                          )}
                  </div>

                    {/* Image and video upload */}
                    
                  <div className='right w-full flex-1 pt-3'>
                  {hideInputFields ? "" : (
                    <div className=''>
                        <label htmlFor="media" className='my-6'>Campaign Media</label>
                        <div className='w-full h-full flex flex-col pt-[1rem] items-center border-gray-200'>
                                <div className='flex gap-3 mb-3'>
                                    <p onClick={toggleMediaTypeImage} className='px-4 py-2 bg-secondary text-[10px] text-gray-100 hover:bg-yellow-500 rounded-2xl cursor-pointer'>Upload Image Advert</p>
                                    <p onClick={toggleMediaTypeVideo} className='px-4 py-2 bg-secondary text-[10px] text-gray-100 hover:bg-yellow-500 rounded-2xl cursor-pointer'>Upload Video Advert</p>
                                </div>
                                {imagePreview != null ? (
                                    <img src={imagePreview} alt="ad media file" className='w-full h-full object-cover rounded-2xl mb-2'/> 
                                    ) : (
                                    <div className='w-[400px] h-[300px] flex items-center justify-center'>
                                        {mediaTypeImage === 'image' && <img src={image} alt=""  className='rounded-2xl mb-2'/>}
                                        {mediaTypeImage === 'video' && <img src={video} alt=""  className='rounded-2xl mb-2'/>}
                                    </div>
                                    )}
                                
                            <input type="file" name="mediaUrl" placeholder='Upload Media' onChange={(e) => handleImageChange(e)} className='w-[100px] p-3 shadow-inner rounded-2xl bg-gray-50 md:w-[300px]'/>
                        </div>
                    </div>
                  )}

                    <div className='flex justify-center mt-[2rem] flex-col md:gap-6 w-full md:flex-row'>
                            <div className='flex flex-col mt-3 mb-3'>
                                <label htmlFor="Page Link" className='text-left'>Associated link if any</label>
                                      <input type="text" name="socialPageLink" id="socialPageLink" value={advert.socialPageLink} onChange={handleInputChange} className='w-full shadow-inner p-3 bg-transparent border border-gray-200 rounded-xl'/>
                                <small className='text-left'>Eg, copy and paste your {platform} page link here.</small>
                            </div>
                          </div>
                  </div>
                    

                </div>

                <button type="submit"  className='w-full px-4 py-2  text-md rounded-xl bg-tertiary text-gray-100 mb-5 hover:bg-secondary md:w-2/6 md:ml-[4.5rem]'>Submit!</button>
    </form>
    </div>
   
  )
}

export default AdBuyForm