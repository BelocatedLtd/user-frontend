import React, { useEffect, useState } from 'react'
import { DataGrid } from '@mui/x-data-grid';
import { useDispatch, useSelector } from 'react-redux';
import {useNavigate} from 'react-router-dom'
import { selectAdverts } from '../../../redux/slices/advertSlice';
import { selectIsLoading } from '../../../redux/slices/advertSlice';
import { selectIsError } from '../../../redux/slices/advertSlice';
import { selectUsers } from '../../../redux/slices/userSlice';



const Adverts = ({adverts}) => {
  const users = useSelector(selectUsers)
  const navigate = useNavigate()

const actionColumn = [
  {field: '_id', headerName: '', width: 100, renderCell:(params) => {
    return (
      <div className='cellAction'>
        <div onClick={() => navigate(`/admin/dashboard/adverts/${params.row._id}`)} className='viewBtn py-2 px-5 rounded-[5px] text-[darkblue] border border-[#00008b50] cursor-pointer'>View</div>
      </div>
    )
  } }
]

const columns = [
    { field: 'userId', headerName: 'Advertiser', width: 150, renderCell:(params) => {
      const advertiser = users.find(user => user._id === params.row.userId)
      return (
        
          <div className=''>{advertiser.fullname}</div>
        
      )
    } },

    { field: 'platform', headerName: 'Platform', width: 150 },
    { field: 'asset', headerName: 'Asset', width: 150 },
    { field: 'desiredROI', headerName: 'Desired ROI', type: 'number', width: 100 },
    { field: 'adAmount', headerName: 'Ad Amount', type: 'number', width: 150 },
    { field: 'tasks', headerName: 'Tasks', type: 'number', width: 120 },
    { field: 'status', headerName: 'Status', type: 'string', width: 200, renderCell: (params) => {
      return (
        <div className={`p-[5px] rounded-[5px] 
          ${params.row.status === "Pending" && 'pending'}
          ${params.row.status === "Running" && 'running'}
          ${params.row.status === "Allocating" && 'allocating'}
          ${params.row.status === "Completed" && 'completed'}
          ${params.row.status === "Rejected" && 'rejected'}
          
          `}>{params.row.status}</div>
      )
    } },
    
  ];

  





  return (
        <div className='w-full mx-auto mt-[2rem]'>
            <DataGrid
            rows={adverts}
            getRowId={(advert) => advert?._id}
            columns={columns.concat(actionColumn)}
            pageSize={5}
            rowsPerPageOptions={[5]}
            
            checkboxSelection
             />
        </div>
  )

}

export default Adverts