import React from 'react'
import { FaUserCog, FaUsers } from 'react-icons/fa'
import Adverts from './Adverts'
import { handleGetUserAdverts, selectAdverts, selectIsLoading } from '../../../redux/slices/advertSlice';
import { handleGetAllUser, selectUsers, selectIsLoading } from '../../../redux/slices/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { handleGetUserTransactions, selectTransactions, selectIsLoading } from '../../../redux/slices/transactionSlice';
import { handleGetUserTasks, selectTasks, selectIsLoading } from '../../../redux/slices/taskSlice';
import useRedirectLoggedOutUser from '../../../customHook/useRedirectLoggedOutUser';
import { SET_USER, SET_USERNAME, selectUser } from '../../../redux/slices/authSlice';
import { getUser } from '../../../services/authServices';
import { useEffect } from 'react';
import { useState } from 'react';
import Users from './Users';
import Tasks from './Tasks';
import Transactions from './Transactions';
import { LoaderIcon } from 'react-hot-toast';



const AdminDashboard = () => {
    const dispatch = useDispatch()
    const adverts = useSelector(selectAdverts)
    const isLoading = useSelector(selectIsLoading)
    const user = useSelector(selectUser)
    const users = useSelector(selectUsers)
    const transactions = useSelector(selectTransactions)
    const tasks = useSelector(selectTasks)
    const [tableSwitch, setTableSwitch] = useState('users')
    useRedirectLoggedOutUser('/')

    // const changeTable = (e, params) => {
    //     e.preventDefault()
    //     if (params === "Users") {
    //         setTableSwitch("Users")
    //     }
    //     if (params === "Tasks") {
    //         setTableSwitch("Tasks")
    //     }
    //     if (params === "Transactions") {
    //         setTableSwitch("Transactions")
    //     }
    //     if (params === "Adverts") {
    //         setTableSwitch("Adverts")
    //     }
    // }

    

    
        const handleClick = (table) => {
            if (table !== tableSwitch) {
                setTableSwitch(table)
                
            }
        }
     
 
    

    

    useEffect(() => {
        async function getUserData() {
            await dispatch(handleGetAllUser())
            await dispatch(handleGetUserAdverts())
            await dispatch(handleGetUserTransactions())
            await dispatch(handleGetUserTasks())
          if (!user.email) {
          const data = await getUser()
          await dispatch(SET_USER(data))
        await dispatch(SET_USERNAME(data.username))
          }
        }
        console.log(users)
        console.log(adverts)
        console.log(tasks)
      getUserData()
    }, [dispatch, user])

    

    

  return (
    <div className='w-full h-fit flex flex-col'>
      <div className='flex flex-wrap justify-around items-center justify-center gap-5 px-3 py-5 md:flex-row'>

      <div onClick={() => handleClick('users')} className='w-[250px] h-[150px] bg-secondary   flex justify-center items-center gap-5 rounded-xl drop-shadow-2xl'>
          <FaUserCog className='text-gray-200 text-5xl bg-btn rounded-xl p-3'/>
          <div className='flex flex-col text-gray-200'>
          <h3 className='text-3xl font-bold mb-1'>{isLoading ? <LoaderIcon /> : users?.length}</h3>
          {/* {isLoading ? <LoaderIcon /> : users.length} */}
            <p>Users</p>
          </div>
        </div>

        <div onClick={() => handleClick('adverts')} className='w-[250px] h-[150px] bg-secondary  flex justify-center items-center gap-5 rounded-xl drop-shadow-2xl'>
          <FaUsers className='text-gray-200 text-5xl bg-btn border border-primary_bg rounded-xl p-3'/>
          <div className='flex flex-col text-gray-200'>
            <h3 className='text-3xl font-bold mb-1'>{isLoading ? <LoaderIcon /> : adverts?.length}</h3>
            <p>Adverts</p>
          </div>
        </div>

        <div onClick={() => handleClick('tasks')} className='w-[250px] h-[150px] bg-secondary   flex justify-center items-center gap-5 rounded-xl drop-shadow-2xl'>
          <FaUserCog className='text-gray-200 text-5xl bg-btn rounded-xl p-3'/>
          <div className='flex flex-col text-gray-200'>
          <h3 className='text-3xl font-bold mb-1'>{isLoading ? <LoaderIcon /> : tasks?.length}</h3>
            <p>Tasks</p>
          </div>
        </div>

        <div onClick={() => handleClick('transactions')} className='w-[250px] h-[150px] bg-secondary  flex justify-center items-center gap-5 rounded-xl drop-shadow-2xl'>
          <FaUserCog className='text-gray-200 text-5xl bg-btn rounded-xl p-3'/>
          <div className='flex flex-col text-gray-200'>
          <h3 className='text-3xl font-bold mb-1'>{isLoading ? <LoaderIcon /> : transactions?.length}</h3>
            <p>Transactions</p>
          </div>
        </div>

      </div>

    {tableSwitch === "Adverts" && (<Adverts adverts={adverts}/>)}
    {tableSwitch === "Users" && (<Users users={users}/>)}
    {tableSwitch === "Tasks" && (<Tasks tasks={tasks}/>)}
    {tableSwitch === "Transactions" && (<Transactions transactions={transactions}/>)}
      
    </div>
  )
}

export default AdminDashboard