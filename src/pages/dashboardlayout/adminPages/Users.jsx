import React from 'react'
import { DataGrid } from '@mui/x-data-grid';

const Users = ({users}) => {

const columns = [
    { field: 'fullname', headerName: 'Name', width: 150 },
    { field: 'username', headerName: 'Username', width: 150 },
    { field: 'email', headerName: 'Email', width: 150 },
    {field: "gender", headerName: "Gender", width: 70},
    {field: "location", headerName: "Location", width: 100},
    { field: 'phone', headerName: 'Phone', type: 'String', width: 100 },
     { field: 'adsCreated', headerName: 'Ads Created', type: 'number', width: 100 },
   { field: 'taskOngoing', headerName: 'Tasks Ongoing', type: 'number', width: 120 },
   { field: 'taskCompleted', headerName: 'Tasks Completed', type: 'number', width: 120 },
  ];


  return (
        <div className='w-full mx-auto mt-[2rem]'>
            <DataGrid
            rows={users}
            getRowId={(user) => user?._id}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            checkboxSelection
             />
        </div>
  )
}

export default Users