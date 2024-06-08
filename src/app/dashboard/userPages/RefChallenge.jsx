import React from 'react'
import toast from 'react-hot-toast';
import { IoMdArrowDropdown } from 'react-icons/io'
import copy from '../../../assets/copy.png'
import { useState } from 'react';
import { useRef } from 'react';
import { useEffect } from 'react';
import { getUser } from '../../../services/authServices';
import { SET_LOGOUT, SET_USER, selectUser } from '../../../redux/slices/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import CountDown from '../../../components/ui/CountDown';
import { getOngoingRefChallenge } from '../../../services/refService';
import { selectUsers } from '../../../redux/slices/userSlice';

const refTableData = [
  {
    id: 1,
    position: 1,
    username: "uchegid",
    pts: 140
  },
  {
    id: 2,
    position: 2,
    username: "uchegid",
    pts: 120
  },
  {
    id: 3,
    position: 3,
    username: "uchegid",
    pts: 100
  },
  {
    id: 4,
    position: 4,
    username: "uchegid",
    pts: 80
  },
  {
    id: 5,
    position: 5,
    username: "uchegid",
    pts: 70
  },
  {
    id: 6,
    position: 6,
    username: "uchegid",
    pts: 50
  },
  {
    id: 7,
    position: 7,
    username: "uchegid",
    pts: 30
  },
  {
    id: 8,
    position: 8,
    username: "uchegid",
    pts: 140
  },
  {
    id: 9,
    position: 9,
    username: "uchegid",
    pts: 10
  },
  {
    id: 10,
    position: 10,
    username: "uchegid",
    pts: 5
  },
]

const RefChallenge = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector(selectUser)
  const users = useSelector(selectUsers)
  const inputRef = useRef(null)
  const [challenge, setChallenge] = useState()
  const [contestant, setContestant] = useState()
  const [rankedContestants, setRankedContestants] = useState([]);
  const [refLink, setRefLink] = useState('')
  const [daysRemaining, setDaysRemaining] = useState();

  useEffect(() => {
    async function getUserData() {
       const data = await getUser()
       const refChallenge = await getOngoingRefChallenge()

       if (!data || data === undefined) {
        // toast.error('Unable to retrieve user data, session will be terminated')
         await dispatch(SET_LOGOUT())
         navigate('/')
         return
       }

       setChallenge(refChallenge)
      //  setContestants(challenge?.referralChallengeContestants)

      await dispatch(SET_USER(data)) 
    }
  getUserData()

 const frontEndUrl = window.location.hostname;
 setRefLink(`https://${frontEndUrl}/ref-cha/${user?.username}`)
}, [dispatch])

// Get updated ref challenge standing
  //console.log(challenge?.referralChallengeContestants)

  // Sort the contestants according to how many times they appear in the array and then rank them according to how many times each of them occur in the array and make an array object which each item contains the contestant and then how many times they occur

  useEffect(() => {
    const contestants = challenge?.referralChallengeContestants
    
    // Check if contestants is not null or undefined before processing
    if (contestants) {
      const contestantCounts = contestants?.reduce((acc, contestant) => {
        acc[contestant] = (acc[contestant] || 0) + 1;
        return acc;
      }, {});
  
      const sortedContestants = Object?.entries(contestantCounts)
        .sort((a, b) => b[1] - a[1]);
  
      setRankedContestants(sortedContestants?.map(([contestant, count], index) => ({
        contestant,
        pts: count/2,
        rank: index + 1
      })));
    }
  }, []);


  const handleDaysRemaining = (days) => {
    setDaysRemaining(days)
  }




const handleRefLinkCopy = (e) => {
  inputRef.current.select();
  document.execCommand('copy')
  toast.success('Referral link copied to clipboard')
}

  return (
    <div className='w-full h-screen lg:mr-5'>
      <div className='w-full h-full flex items-center justify-center'>
          <h3 className='text-center text-3xl font-extrabold'>
            Coming Soon
          </h3>
      </div>
  
{/* Ref challenge stats */}
{/* <div className='dashboard__stats__container w-full h-fit py-[4rem] flex justify-center rounded-xl border-b-2 border-red-600 bg-blue-500'>
  <div className='dashboard__stats__wrapper w-[70%] flex flex-col justify-center items-center border border-gray-300 rounded-xl px-6 bg-white lg:flex-row'>
    <div className='border-b lg:border-r border-gray-300 w-full flex flex-col justify-center items-center p-4'>
      <label className='text-sm text-gray-600 font-semibold'>Days Left</label>
      <p className='text-[15px] text-gray-400'><CountDown handleDaysRemaining={handleDaysRemaining} /></p>
    </div>

    <div className='lg:border-l border-gray-300 w-full flex flex-col justify-center items-center p-4'>
    <label className='text-sm text-center text-gray-600 font-semibold'>Points</label>
      <p className='text-[15px] flex items-center gap-1 text-gray-400'><span className='text-red-600'><IoMdArrowDropdown /></span>{user.referralChallengePts}</p>
    </div>
  </div>
</div> */}

{/* Ref challenge league table */}

{/* <div className='w-full px-[1rem] py-[1rem]'>
  {daysRemaining <= 4 ? (<>
    {rankedContestants?.map(({ contestant, rank, pts }) => (
      <div key={contestant} className='w-full h-fit flex items-center py-[1rem] border-b border-gray-100 pb-4'>
        <div className='w-full flex items-center justify-between'>
          <div className='flex gap-3 items-center'>
            <span className={`
            ${
              rank === 1 && ('bg-green-600') || 
              rank === 2 && ('bg-blue-600') ||
              rank === 3 && ('bg-purple-600') ||
              rank > 3 && ('bg-yellow-600')
            } text-white p-2 rounded-full`}>{rank}</span>
            <p>{contestant}</p>
          </div>
          <p>{pts} Points</p>
        </div>
      </div>
    ))}</>
  ) : (<p className='w-full py-[1rem] text-center'>
    The Challenge Table will be available from the 4th day of the challenge
    </p>)}
  
</div> */}

{/* Ref link */}
{/* <div className='w-full flex flex-col items-center gap-2 justify-center mt-[1rem]  md:gap-0'>
                  <label className=''>Referral Link:</label>
                  <div className='flex items-center justify-center gap-2  w-[60%]'>
                    <input type="link" value={refLink} readOnly ref={inputRef} className='w-fit md:w-1/2 p-3 border border-gray-200 rounded-lg items-center'/>
                    <img src={copy} alt="click to copy ref link" className='w-[20px] h-[20px]' onClick={handleRefLinkCopy}/>
                  </div>
  </div> */}


    </div>
  )
}

export default RefChallenge