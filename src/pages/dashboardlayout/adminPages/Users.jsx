import React from 'react'
import { DataGrid } from '@mui/x-data-grid';
import DataTable from 'react-data-table-component';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { handleGetAllUser, selectIsError, selectIsLoading, selectUsers } from '../../../redux/slices/userSlice';
import { useNavigate } from 'react-router-dom';
import { MdArrowDownward } from 'react-icons/md';
import { toast } from 'react-hot-toast';


const Users = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const users = useSelector(selectUsers)
  const isLoading = useSelector(selectIsLoading)
  const isError = useSelector(selectIsError)
  const sortIcon = <MdArrowDownward />;

  useEffect(() => {
    dispatch(handleGetAllUser())

    if (isError) {
      toast.error("failed to fetch users")
    }
}, [dispatch])


  const columns = [
    {
      name: 'Fullname',
      selector: row => row.fullname,
    },
    {
      name: 'Username',
      selector: row => row.username,
      sortable: true
    },
    {
      name: 'Email',
      selector: row => row.email,
  
    },
    {
      name: 'Phone',
      selector: row => row.phone, 
      sortable: true
    },
    {
      name: 'State',
      selector: row => row.location, 
      sortable: true
    },
    {
      name: 'Gender',
      selector: row => row.gender, 
      sortable: true
    },
    {
      name: 'Ads Created',
      selector: row => row.adsCreated, 
      sortable: true
    },
    {
      name: 'Task On Going',
      selector: row => row.taskOngoing, 
      sortable: true
    },
    {
      name: 'Tasks Completed',
      selector: row => row.taskCompleted, 
      sortable: true
    },
    {
      name: 'Actions',
      button: true,
      cell: (row) => (
        <button className='bg-[#18141E] text-gray-100 px-3 py-2 rounded-2xl hover:bg-btn hover:bg-secondary' onClick={(e) => handleButtonClick(e, row._id)}>View User</button>
      )
    },
  ];

  const customStyles = {
    headCells: {
      style: {
        backgroundColor: '#18141E',
        color: '#f4f4f4',
        fontSize: '15px'
      }
    },
  }

  const handleButtonClick = (e, userId) => {
    e.preventDefault();
    navigate(`/admin/dashboard/user/${userId}`)
  }

  return (
        <div className='w-full mx-auto mt-[2rem]'>
        <DataTable 
        columns={columns} 
        data={users}
        progressPending={isLoading}
        pagination
        selectableRows
        fixedHeader
        customStyles={customStyles}
        sortIcon={sortIcon}
        handleButtonClick={handleButtonClick}
        />
        </div>
  )
}

export default Users