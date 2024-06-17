import React, { useEffect } from 'react'
import AdBuyForm from '../../../components/forms/AdBuyForm'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { useState } from 'react'
import { toast } from 'react-hot-toast'
import socialPlatforms from '../../../components/data/assets'
import useRedirectLoggedOutUser from '../../../customHook/useRedirectLoggedOutUser'
import { MdOutlineKeyboardArrowLeft } from 'react-icons/md'

const initialState = {
    roi: '',
    gender: '', 
    socialPageLink: '',
    adText: '', 
}

const AdBuy = () => {
    const navigate = useNavigate()
    const [advert, setAdvert] = useState(initialState)
    const [fileArray, setFileArray] = useState([]);
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [expBudget, setExpBudget] = useState(0)
    const [costToPay, setCostToPay] = useState()
    const [earnPerTask, setEarnPerTask] = useState()
    const {platformName} = useParams();
    const location = useLocation();
    const { selectedPlatformObject, service, adTitle } = location.state || {};
    const [socialService, setSocialService] = useState(null)
    const [comments, setComments] = useState("");
    const [captionArray, setCaptionArray] = useState([])
    

    const {roi, gender, socialPageLink, adText } = advert

    const handleInputChange = (e) => {
        const {name, value } = e.target;∏
        setAdvert({ ...advert, [name]: value })
      }

      const handleCaptionChange = (e) => {
        setComments(e.target.value);
      };
  
      // Split comments by newline character and remove empty strings
      useEffect(() => {
        const commentsArray = comments.split('\n').filter(comment => comment.trim() !== '');
        setCaptionArray(commentsArray);
      }, [comments]);

// Upload and preview multiple screenshots
const handleImageChange = (e) => {
  const files = Array.from(e.target.files);
  setFileArray(files)

  // Create an array of file previews
  const filePreviews = files.map((file) => {
    if (file.type.startsWith('image/')) {
      // For image files, create preview using FileReader API
      const reader = new FileReader();
      return new Promise((resolve) => {
        reader.onloadend = () => {
          resolve(reader.result);
        };
        reader.readAsDataURL(file);
      });

    } else if (file.type.startsWith('video/')) {
      // For video files, create preview using FileReader API
      const reader = new FileReader();
      reader.readAsDataURL(file);
      return new Promise((resolve) => {
        reader.onloadend = () => {
          resolve(reader.result);
        };
      });
    }
    // Handle other file types as needed
    return null;
  });

  // Update state with the array of previews
  Promise.all(filePreviews).then((previews) => {
    setSelectedFiles((prevFiles) => [...prevFiles, ...previews]);
  });
};

const handleImageRemove = (itemToRemove) => {
  setSelectedFiles((prevFiles) => prevFiles.filter((item) => item !== itemToRemove));
};


    useEffect(() => {
      const selectedService = selectedPlatformObject?.assets?.find((item) => item?.asset == service);
      setEarnPerTask(selectedService?.amountForTask)
      setExpBudget(selectedService?.CostToOrder * advert?.roi)
      setCostToPay(selectedService?.CostToOrder)
    }, [service, advert.roi]) 


  return (
    <div>
        <div className='flex items-center gap-3 border-b border-gray-200 py-5 mb-3'>
            <MdOutlineKeyboardArrowLeft size={30} onClick={() => (navigate(-1))}/>
            <div className='flex flex-col'>
                <p className='font-semibold text-xl text-gray-700'>Create an Advertising Campaign</p>
                <small className='font-medium text-gray-500'>Click <span className='text-secondary'>here</span> to see and monitor your adverts</small>
            </div>
        </div>
       <AdBuyForm  
       platform={platformName}
       service={service}
       adTitle={adTitle}
       advert={advert} 
       handleImageRemove={handleImageRemove}
       selectedFiles={selectedFiles}
       fileArray={fileArray}
       handleInputChange={handleInputChange} 
       handleImageChange={handleImageChange} 
       handleCaptionChange={handleCaptionChange}
       expBudget= {expBudget}
       costToPay= {costToPay}
       earnPerTask = {earnPerTask}
       socialService= {socialService}
       comments={comments}
       captionArray={captionArray}
       />
    </div>
  )
}

export default AdBuy