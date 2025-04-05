import React from 'react'
import NavigationButton from '../../common/components/NavigationButton'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import DataTable from '../../common/components/DataTable'
import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Grid2 from '@mui/material/Grid2'
import CustomBreadcrumb from '../../common/components/CustomBreadcrumb'

const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'firstName',
    headerName: 'First name',
    width: 150,
    editable: true,
  },
  {
    field: 'lastName',
    headerName: 'Last name',
    width: 150,
    editable: true,
  },
  {
    field: 'age',
    headerName: 'Age',
    type: 'number',
    width: 110,
    editable: true,
  },
  {
    field: 'fullName',
    headerName: 'Full name',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160,
    valueGetter: (value, row) => `${row.firstName || ''} ${row.lastName || ''}`,
  },
];

const rows = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', age: 14 },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 31 },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 31 },
  { id: 4, lastName: 'Stark', firstName: 'Arya', age: 11 },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  { id: 6, lastName: 'Melisandre', firstName: 'Daenerys', age: 150 },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
  { id: 10, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
  { id: 11, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];

const breadcrumbs = [
  { label: 'Inicio', href: '/' },
  { label: 'Citas'}
]

const Appointments = () => {
  return (
    <>
    <Container>
    <Box sx={{ flexGrow: 1, mt: '2rem' }}>
      <CustomBreadcrumb breadcrumbs={breadcrumbs}/>
      <Grid2 container spacing={2}>
        <Grid2 size={12}>
          <TextField
            id="outlined-basic"
            label="Recurso"
            variant="outlined"
            fullWidth
          />
        </Grid2>
        <Grid2 size={{xs: 6, sm: 6, md:6, lg: 3, xl: 3}}>
          <Autocomplete
            disablePortal
            // options={top100Films}
            renderInput={(params) => <TextField {...params} label="Colaborador" />}
            fullWidth
          />
        </Grid2>
        <Grid2 size={{xs: 6, sm: 6, md:6, lg: 3, xl: 3}}>
          <TextField
            id="outlined-basic"
            label="Outlined"
            variant="outlined"
            fullWidth
          />
        </Grid2>
        <Grid2 size={{xs: 6, sm: 6, md:6, lg: 3, xl: 3}}>
          <TextField
            id="outlined-basic"
            label="Outlined"
            variant="outlined"
            fullWidth
          />
        </Grid2>
        <Grid2 size={{xs: 6, sm: 6, md:6, lg: 3, xl: 3}}>
          <DatePicker
            label="Fecha"
            // value={value}
            // onChange={(newValue) => setValue(newValue)}
            sx={{ width: '100%' }}
          />
        </Grid2>
      </Grid2>
    </Box>
    <DataTable
      rows={rows}
      columns={columns}
    />
    <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: '2rem' }}>
      <NavigationButton
        variant = {'outlined'}
        Text='Regresar'
        color={'info'}
        Route={'/'}/>
      <NavigationButton
        variant = {'outlined'}
        Text='Agregar Cita'
        color={'info'}
        Route={'addAppointment'}/>
    </Box>
    </Container>
    </>
  )
}

export default Appointments