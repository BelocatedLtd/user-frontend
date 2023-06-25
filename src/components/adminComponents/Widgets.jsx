import React from 'react'
import { useState } from 'react'
import { FaUserAlt } from 'react-icons/fa'
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io'
import {HiUsers} from 'react-icons/hi'
import { useEffect } from 'react'
import { GrMoney } from 'react-icons/gr'
import { BsDatabaseFillGear } from 'react-icons/bs'

const Widgets = ({type, totalUsers, totalAdverts, totalTrx, totalTasks}) => {
    const [percentage, setPercentage] = useState(20)

    let data; 

        switch(type) {
            case "users":
                data={
                    title: "USERS",
                    count: totalUsers,
                    link: "See All Users",
                    icon: <FaUserAlt className='icon text-[30px] p-[5px] rounded-[5px] self-end' style={{color:"crimson", backgroundColor: "rgba(255, 0, 0, 0.2"}}/>,
                };
                //setPercentage(totalUsers.length)
                break;
    
                case "adverts":
                data={
                    title: "ADVERTS",
                    count: totalAdverts,
                    link: "See All Adverts",
                    url: "#",
                    icon: <HiUsers className='icon text-[30px] p-[5px] rounded-[5px] self-end' style={{color:"green", backgroundColor: "rgba(0, 128, 0, 0.2"}}/>,
                };
                //setPercentage(totalAdverts.length)
                break;
    
                case "transactions":
                data={
                    title: "TRANSACTIONS",
                    count: totalTrx, 
                    link: "See All Transactions",
                    url: "#",
                    icon: <GrMoney className='icon text-[30px] p-[5px] rounded-[5px] self-end' style={{color:"goldenrod", backgroundColor: "rgba(218, 165, 32, 0.2"}}/>,
                };
                //setPercentage(totalTrx.length)
                break;
    
                case "tasks":
                data={
                    title: "TASKS",
                    count: totalTasks,
                    link: "See All Tasks",
                    url: "#",
                    icon: <BsDatabaseFillGear className='icon text-[30px] p-[5px] rounded-[5px] self-end'style={{color:"purple", backgroundColor: "rgba(128, 0, 128, 0.2"}}/>,
                };
                //setPercentage(totalTasks.length)
                break;
                default:
                break;
        }

    

  return (
    <div className='widget flex flex-1 justify-between p-[10px] shadow-lg rounded-[10px] h-[150px]'>
        <div className="left flex flex-col justify-between">
            <span className='title font-bold text[14px] text-gray-400'>{data?.title}</span>
            <span className='counter text-[28px] font-light'>{data?.count?.length}</span>
            <span className='link text-[12px] border-b border-gray-200 w-fit'><a href={data?.url}>{data?.link}</a></span>
        </div>
        <div className="right flex flex-col justify-between">
            <div className={`percentage flex items-center text-[14px] ${percentage > 20 && ('text-green-500') } ${percentage <= 20 && ('text-red-500') }`}>
                {percentage > 20 && <IoIosArrowUp />}
                {percentage <= 20 && <IoIosArrowDown />}
                {percentage}
            </div>
            {data?.icon}
        </div>
    </div>
  )
}

export default Widgets