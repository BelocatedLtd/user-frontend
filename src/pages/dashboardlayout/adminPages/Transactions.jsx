import React from 'react'
import DataTable from 'react-data-table-component';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectTransactions, selectIsError, selectIsLoading } from '../../../redux/slices/transactionSlice';

const Transactions = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const users = useSelector(selectTransactions)
  const isLoading = useSelector(selectIsLoading)
  const isError = useSelector(selectIsError)

  const columns = [
    {
      name: 'S/N', 
      selector: row => row.trxId,
    },
    {
      name: 'User',
      cell: (row) => (
        <button className='bg-[#18141E] text-gray-100 px-3 py-2 rounded-2xl hover:bg-btn' onClick={(e) => handleButtonClick(e, row._id)}>View User</button>
      )
    },
    {
      name: 'Transaction Type',
      selector: row => row.trxType,
    },
    {
      name: 'Amount',
      selector: row => row.chargedAmount,
      sortable: true
    },
    {
      name: 'Date',
      selector: row => row.date,
  
    },
    {
      name: 'Status',
      selector: row => row.status, 
      sortable: true
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

   useEffect(() => {
    dispatch(handleGetAllUser())

    if (isError) {
      toast.error("failed to fetch users")
    }

}, [isError, dispatch])


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
        //handleButtonClick={handleButtonClick}
        />
        </div>
  )
}

export default Transactions