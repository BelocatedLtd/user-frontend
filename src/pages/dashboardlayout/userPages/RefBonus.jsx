import React from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";
import { FaCircle } from "react-icons/fa";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { useLocation, useNavigate } from "react-router-dom";
import copy from '../../../assets/copy.png'
import toast from "react-hot-toast";
import { handleRefPtsConv } from "../../../services/refService";
import { getUserWallet } from "../../../redux/slices/walletSlice";
import { getUser } from "../../../services/authServices";
import { SET_USER, selectUser } from "../../../redux/slices/authSlice";
import { useSelector } from "react-redux";

const RefBonus = () => {
const inputRef = useRef(null)
const [refLink, setRefLink] = useState('')
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);
  const [percentage, setPercentage] = useState(0);
  const user = useSelector(selectUser)

  const maxValue = 50;
  
  useEffect(() => {
    setProgress(user?.referralBonusPts)
    const newPercentage = (progress / maxValue) * 100;
    setPercentage(newPercentage);

    const frontEndUrl = window.location.hostname;
    setRefLink(`https://${frontEndUrl}/register/ref/${user?.username}`)
  }, [progress, maxValue]);

  const handleRefLinkCopy = (e) => {
    inputRef.current.select();
    document.execCommand('copy')
    toast.success('Referral link copied to clipboard')
  }

  const convertPts = async(e) => {
    e.preventDefault()
    // console.log(user)
    // return
    const userId = user.id
  
    try {
      toast.success("Converting in progress...")
      await handleRefPtsConv(userId)
      await dispatch(getUserWallet(user?.token))
      const userData = await getUser()
      await dispatch(SET_USER(userData))
        toast.success("Conversion completed")
    } catch (error) {
      toast.error(`Conversion Failed, ${error}`)
    }
   
  }
  

  return (
    <div className="w-full flex flex-col">
      <div className="flex items-center gap-3 border-b border-gray-200 py-5">
        <MdOutlineKeyboardArrowLeft size={30} onClick={() => navigate(-1)} />
        <div className="flex flex-col">
          <p className="font-semibold text-xl text-gray-700">Referral Bonus</p>
          <small className="font-medium text-gray-500">
            Refer your friends and family to Belocated and earn more money
          </small>
        </div>
      </div>

    <div className="w-full flex justify-center">
      <div className="w-[80%] h-fit py-[2rem] px-[2rem] mt-[1rem] bg-primary border border-blue-300 rounded-2xl shadow-xl">
      <div className="w-full flex flex-col items-center">
      <label className='font-bold text-gray-600 text-center'>Point Balance</label>
      <div className='flex justify-center'>
        <h1 className='text-[45px] text-gray-800 font-extrabold text-center'>{progress}</h1>
        <small className="text-center flex items-center mt-5 text-[8px] text-gray-400">1 Point = ₦50</small>
      </div>
        <div className="w-full flex flex-col items-center mb-[2rem]">
            <h3 className="mb-[0.8rem]">Convert Points to Cash Instantly</h3>
            <div className="h-4 w-full bg-gray-300 rounded overflow-hidden">
            <div className="h-full bg-blue-500" style={{ width: `${percentage}%` }} />
            </div>

            <p className="">
                {progress >= 50 ? ('You have crossed the threshold, redeem your points') : 
                progress >= 1 ? (`You need ${50 - progress} more points to redeem`) :
                ('You need atleast 50 points to redeem')
                }
            </p>
        </div>

        <div className="w-full flex justify-center">
        {user?.referralBonusPts >= 50 ? (<button onClick={convertPts} className="bg-red-600 text-primary px-4 py-2 rounded-2xl">Redeem Points</button>) : ""}
        </div>
      </div>
      </div>
    </div>

      {/* Ref Link */}
      <div className='w-full flex flex-col items-center gap-2 justify-center mt-[1rem]  md:gap-0'>
            <label className=''>Referral Link:</label>
            <div className='flex items-center justify-center gap-2  w-[60%]'>
                <input type="link" value={refLink} readOnly ref={inputRef} className='w-fit md:w-1/2 p-3 border border-gray-200 rounded-lg items-center'/>
                <img src={copy} alt="click to copy ref link" className='w-[20px] h-[20px]' onClick={handleRefLinkCopy}/>
            </div>
        </div>

        {/* Activities */}

        <div className="w-[80%] mt-[2rem]">
            <label className="font-bold">Recent Activities</label>
        </div>
    </div>
  );
};

export default RefBonus;
