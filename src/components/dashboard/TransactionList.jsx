import React from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import DataTable from 'react-data-table-component';
import { useNavigate } from 'react-router-dom'
import { handleGetUserTransactions } from '../../redux/slices/transactionSlice'

const TransactionList = () => {
    const dispatch = useDispatch()
    const {transactions, isLoading, isError, message} = useSelector((state) => state.transactions)
    const [perPage, setPerPage] = useState(10)
    const navigate = useNavigate()

    const columns = [
        {
          name: 'S/N', 
          selector: row => row.trxId,
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
    
    //   const handleButtonClick = (e, artisanId) => {
    //     e.preventDefault();
    //     navigate(`/dashboard/artisan/${artisanId}`)
    //   }
    
       useEffect(() => {
        dispatch(handleGetUserTransactions())
    
      if (isError) {
        console.log(message)
      }
    }, [isError, message, dispatch])


    return (
        <DataTable 
        columns={columns} 
        data={transactions}
        progressPending={isLoading}
        pagination
        selectableRows
        fixedHeader
        customStyles={customStyles}
        //handleButtonClick={handleButtonClick}
        />
  )
}

export default TransactionList