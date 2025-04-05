import React from 'react'
import Box from '@mui/material/Box'
import {DataGrid, GridToolbarContainer, GridToolbarExport} from '@mui/x-data-grid'

const DataTable = ({rows, columns}) => {

  function CustomToolbar() {
    return (
      <GridToolbarContainer>
        <GridToolbarExport/>
      </GridToolbarContainer>
    );
  }

  return (
    <Box sx={{ height: 420, width: '100%', marginTop: '2rem' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            }
          }
        }}
        checkboxSelection
        pageSizeOptions={[5, 50, 100, 150, 200]}
        sx={{backgroundColor: 'white'}}
        slots={{
          toolbar: CustomToolbar,
        }}
      />
    </Box>
  )
}

export default DataTable