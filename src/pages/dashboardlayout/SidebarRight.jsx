import React from 'react'
import facebook from '../../assets/social icons/facebook.svg'
import twitter from '../../assets/social icons/twitter.png'
import tiktok from '../../assets/social icons/tiktok.svg'
import { MdOutlineKeyboardArrowDown } from 'react-icons/md'
import ActivityFeed from '../../components/ActivityFeed'

const SidebarRight = () => {
  return (
    <div className='hidden right-0 w-[400px] h-[71vh] border-l border-gray-200 md:flex md:flex-col'>
        <div className='w-full border-b border-gray-200 px-5 pb-3 my-3'>
            <h1 className='text-xl font-semibold text-gray-600'>Recent Activities</h1>
            <p className='text-sm mt-2 text-gray-500 font-medium'>See what people are doing on Belocated</p>
        </div>
        <ActivityFeed />
    </div>
  )
}

export default SidebarRight