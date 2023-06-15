import React from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import SidebarItems from './SidebarItems'
//import menu from '../../components/data/SidebarData'
import { FaGrinHearts, FaHome, FaStar, FaUsers } from 'react-icons/fa'
import { AiOutlineUser, AiOutlineLogout } from 'react-icons/ai'
import { MdCreateNewFolder, MdOutlineWorkHistory } from 'react-icons/md'
import { GrSettingsOption } from 'react-icons/gr'
import { BiMenuAltRight } from 'react-icons/bi'
import { useDispatch, useSelector } from 'react-redux'
import { SET_LOGIN, SET_USER, SET_USERNAME, selectUser } from '../../redux/slices/authSlice'
import { selectUsername } from '../../redux/slices/authSlice'
import { getUser, logoutUser } from '../../services/authServices'
import { toast } from 'react-hot-toast'
import { useEffect } from 'react'

const SidebarLeft = ({children}) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const user = useSelector(selectUser)
    const [isOpen, setIsOpen] = useState(false)
    const toggleSidebar = () => setIsOpen(!isOpen)
    const username = useSelector(selectUsername)




    const menu = [
      {
        title: "Dashboard",
        icon: <FaHome className='mr-2'/>,
        path:  `/dashboard/${username}`,
      },
      {
        title: "My Campaigns",
        icon: <MdCreateNewFolder className='mr-2'/>,
        path: "/dashboard/campaign-stats",
      },
      {
        title: "Transactions",
        icon: <MdCreateNewFolder className='mr-2'/>,
        path: "/dashboard/transactions",
      },
      {
        title: "Profile",
        icon: <MdCreateNewFolder className='mr-2'/>,
        path: '/dashboard/profile',
      },
      {
        title: "Update Profile",
        icon: <GrSettingsOption className='mr-2'/>,
        path: `/dashboard/update-profile/`,
      },
      {
        title: "Account Settings",
        icon: <FaStar className='mr-2'/>,
        path: `/dashboard/account-settings/${username}`,
      },
      {
        title: "Contact Support",
        icon: <GrSettingsOption className='mr-2'/>,
        path: "/dashboard/contact-support",
      },
    ]

    const adminMenu = [
      {
        title: "Dashboard",
        icon: <FaHome className='mr-2'/>,
        path:  `/admin/dashboard/${username}`,
      },
      {
        title: "All Users",
        icon: <FaStar className='mr-2'/>,
        path: `/admin/dashboard/users/${username}`,
      },
      {
        title: "All Adverts",
        icon: <FaStar className='mr-2'/>,
        path: `/admin/dashboard/adverts/${username}`,
      },
      {
        title: "All Tasks",
        icon: <FaStar className='mr-2'/>,
        path: `/admin/dashboard/tasks/${username}`,
      },
      {
        title: "All Transactions",
        icon: <FaStar className='mr-2'/>,
        path: `/admin/dashboard/transactions/${username}`,
      },
      {
        title: "Account Settings",
        icon: <FaStar className='mr-2'/>,
        path: `/admin/dashboard/account-settings/${username}`,
      },
      {
        title: "Support Messages",
        icon: <GrSettingsOption className='mr-2'/>,
        path: `/admin/dashboard/support-messages/${username}`,
      },
    ]

    const handleLogout = async () => {
      try {
          await logoutUser()
          await dispatch(SET_LOGIN(false))
          navigate('/')
          toast.success('User logged out')
      } catch (error) {
        setIsLoading(false)
        toast.error(error)
      }
}
  

  return ( 
    <div className=''>
        <div className={`fixed top-0  left-0 w-[230px] h-screen shrink-0 border border-right border-gray-200 overflow-auto`} style={{width: isOpen ? "230px" : "60px"}}>
          <div className='top_section flex justify-between items-center w-full py-6 px-3 text-[20px]  bg-tertiary_bg'>
                  <h3 className='text-[18px]' style={{display: isOpen ? "block" : "none"}} onClick={() => navigate('/')} ><FaHome  className='border border-btn rounded-full text-btn p-2 cursor-pointer' size={35}/></h3>

                  <div className='' style={{marginLeft: isOpen ? "100px" : "0px"}}>
                  <FaHome  onClick={() => navigate('/')} className='flex border border-btn rounded-full text-btn p-2 cursor-pointer md:hidden' size={35}/>
                  <BiMenuAltRight className='hidden text-btn cursor-pointer md:flex' onClick={toggleSidebar} />
                  </div>
          </div>
         
          {user.accountType === "User" && (
             <>
              {menu.map((item, index) => { 
                return <SidebarItems key={item.title} item={item} isOpen={isOpen} />
             })}
            </>
          )}

          {user.accountType === "Admin" && (
              <>
              {adminMenu.map((item, index) => { 
                return <SidebarItems key={item.title} item={item} isOpen={isOpen} />
             })}
             </>
          )}
          
        </div>
     
      <main className='w-full ' style={{ paddingLeft: isOpen ? "230px" : "60px", transition: "all .5s" }}>
        {children}
      </main>
    </div>
  )
}

export default SidebarLeft