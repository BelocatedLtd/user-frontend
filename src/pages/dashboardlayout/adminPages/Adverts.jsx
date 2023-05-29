import React, { useEffect, useState } from 'react'
import { DataGrid } from '@mui/x-data-grid';
import { useDispatch, useSelector } from 'react-redux';
import {useNavigate} from 'react-router-dom'
import { selectAdverts } from '../../../redux/slices/advertSlice';
import { selectIsLoading } from '../../../redux/slices/advertSlice';
import { selectIsError } from '../../../redux/slices/advertSlice';



const Adverts = ({adverts}) => {
    //const adverts = useSelector(selectAdverts)
    

//   const customStyles = {
//     headCells: {
//       style: {
//         backgroundColor: '#18141E',
//         color: '#f4f4f4',
//         fontSize: '15px'
//       }
//     },
//   }

//   const handleButtonClick = (e, artisanId) => {
//     e.preventDefault();
//     navigate(`/dashboard/artisan/${artisanId}`)
//   }

const columns = [
    { field: 'userId', headerName: 'Advertiser', width: 200 },
    { field: 'platform', headerName: 'Platform', width: 150 },
    { field: 'asset', headerName: 'Asset', width: 150 },
    { field: 'desiredROI', headerName: 'Desired ROI', type: 'number', width: 150 },
    { field: 'adAmount', headerName: 'Ad Amount', type: 'number', width: 150 },
    { field: 'tasks', headerName: 'Tasks', type: 'number', width: 150 },
    { field: 'status', headerName: 'Status', type: 'string', width: 150 },
    // { field: 'fullName', headerName: 'Full name', description: 'This column', sortable: false, width: 160,
    //   valueGetter: (params) =>
    //     `${params.row.firstName || ''} ${params.row.lastName || ''}`,
    // },
  ];

  





  return (
        <div className='w-full mx-auto mt-[2rem]'>
            <DataGrid
            rows={adverts}
            getRowId={(advert) => advert?._id}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            checkboxSelection
             />
        </div>
  )

}

export default Adverts