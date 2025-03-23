import React from 'react'
import NavigationButton from '../../common/components/NavigationButton'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import DataTable from '../../common/components/DataTable'
import TextField from '@mui/material/TextField'
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Stack from '@mui/material/Stack'
import MenuItem from '@mui/material/MenuItem'
import CustomBreadcrumb from '../../common/components/CustomBreadcrumb'

const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'ticket',
    headerName: 'Ticket',
    width: 150,
  },
  {
    field: 'doctor',
    headerName: 'Doctor',
    width: 150,
  },
  {
    field: 'riesgo',
    headerName: 'Riesgo',
    width: 150,
  },
  {
    field: 'recurso',
    headerName: 'Recurso',
    width: 150,
  },
  {
    field: 'fechaCita',
    headerName: 'Fecha de Cita',
    width: 150,
  },
  {
    field: 'actions',
    headerName: 'Acciones',
    width: 160,
    renderCell: (params) => (
        <NavigationButton
          variant = {'contained'}
          Text='Editar'
          color={'info'}
          Route={`editAppointment/${params.id}`}/>
    ),
  }
];

const rows = [
  { id: 1, ticket: 'TCK-001', doctor: 'Dr. Oscar Vasquez', riesgo: 'Alto', recurso: 'Sala 1', fechaCita: '2023-10-01' },
  { id: 2, ticket: 'TCK-002', doctor: 'Dr. Max Zertuche', riesgo: 'Medio', recurso: 'Sala 2', fechaCita: '2023-10-02' },
  { id: 3, ticket: 'TCK-003', doctor: 'Dr. Carlos Pecina', riesgo: 'Bajo', recurso: 'Sala 3', fechaCita: '2023-10-03' },
  { id: 4, ticket: 'TCK-004', doctor: 'Dr. Oscar Vasquez', riesgo: 'Alto', recurso: 'Sala 4', fechaCita: '2023-10-04' },
  { id: 5, ticket: 'TCK-005', doctor: 'Dr. Max Zertuche', riesgo: 'Medio', recurso: 'Sala 5', fechaCita: '2023-10-05' },
  { id: 6, ticket: 'TCK-006', doctor: 'Dr. Carlos Pecina', riesgo: 'Bajo', recurso: 'Sala 6', fechaCita: '2023-10-06' },
  { id: 7, ticket: 'TCK-007', doctor: 'Dr. Oscar Vasquez', riesgo: 'Alto', recurso: 'Sala 7', fechaCita: '2023-10-07' },
  { id: 8, ticket: 'TCK-008', doctor: 'Dr. Max Zertuche', riesgo: 'Medio', recurso: 'Sala 8', fechaCita: '2023-10-08' },
  { id: 9, ticket: 'TCK-009', doctor: 'Dr. Carlos Pecina', riesgo: 'Bajo', recurso: 'Sala 9', fechaCita: '2023-10-09' },
  { id: 10, ticket: 'TCK-010', doctor: 'Dr. Oscar Vasquez', riesgo: 'Alto', recurso: 'Sala 10', fechaCita: '2023-10-10' },
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
      <Stack direction={{ xs: 'row', sm: 'row' }} spacing={3} >
        <TextField
          id="outlined-basic"
          label="Ticket"
          variant="outlined"
          fullWidth
        />
      </Stack>
      <Stack direction={{ xs: 'col', sm: 'row' }} spacing={3} sx={{ paddingTop: 3, borderRadius: '1rem'}}>
        <TextField
          id="doctor"
          label="Doctor"
          select
          fullWidth
        >
          <MenuItem value="idCollaborator1">Dr. Oscar Vásquez</MenuItem>
          <MenuItem value="idCollaborator2">Dr. Max Zertuche</MenuItem>
          <MenuItem value="idCollaborator3">Dr. Carlos Pecina</MenuItem>
        </TextField>
        <TextField
          id="departamento"
          label="Riesgo"
          select
          fullWidth
        >
          <MenuItem value="Alto">Alto</MenuItem>
          <MenuItem value="Medio">Medio</MenuItem>
          <MenuItem value="Bajo">Bajo</MenuItem>
        </TextField>
        <DatePicker
          label="Fecha Inicio"
          // value={value}
          // onChange={(newValue) => setValue(newValue)}
          sx={{ width: '100%' }}
        />
                <DatePicker
          label="Fecha Fin"
          // value={value}
          // onChange={(newValue) => setValue(newValue)}
          sx={{ width: '100%' }}
        />
      </Stack>
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