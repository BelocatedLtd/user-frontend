import React from 'react'
import { DataGrid } from '@mui/x-data-grid';

const Users = ({users}) => {
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
    { field: 'fullname', headerName: 'Name', width: 200 },
    { field: 'username', headerName: 'Username', width: 150 },
    { field: 'email', headerName: 'Email', width: 150 },
    { field: 'phone', headerName: 'Phone', type: 'String', width: 150 },
   // { field: 'adsCreated', headerName: 'Ads Created', type: 'number', width: 150 },
   // { field: 'taskOngoing', headerName: 'Tasks Ongoing', type: 'number', width: 150 },
   // { field: 'taskCompleted', headerName: 'Tasks Completed', type: 'number', width: 150 },
    { field: 'status', headerName: 'Status', type: 'string', width: 150 },
    // { field: 'fullName', headerName: 'Full name', description: 'This column', sortable: false, width: 160,
    //   valueGetter: (params) =>
    //     `${params.row.firstName || ''} ${params.row.lastName || ''}`,
    // },
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