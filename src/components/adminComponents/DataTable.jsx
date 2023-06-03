import React from 'react'
import { DataGrid } from '@mui/x-data-grid';
import { useSelector } from 'react-redux';
import { selectUsers } from '../../redux/slices/userSlice';
import { userColumns } from '../data/TableColums';


 

const DataTable = () => {
    const users = useSelector(selectUsers)
  return (
    <div className=''>
        <DataGrid
        rows={users}
        getRowId={(user) => user?._id}
        columns={userColumns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
      />
    </div>
  )
}

export default DataTable