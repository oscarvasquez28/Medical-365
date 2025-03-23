import React from 'react'
import NavigationButton from '../../common/components/NavigationButton'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import DataTable from '../../common/components/DataTable'
import TextField from '@mui/material/TextField'
import MenuItem from '@mui/material/MenuItem'
import Stack from '@mui/material/Stack'
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import CustomBreadcrumb from '../../common/components/CustomBreadcrumb'

const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'ticketName',
    headerName: 'Nombre del Ticket',
    width: 150,
  },
  {
    field: 'colaborador',
    headerName: 'Colaborador',
    width: 150,
  },
  {
    field: 'tipoIncidencia',
    headerName: 'Tipo de Incidencia',
    width: 110,
  },
  {
    field: 'prioridad',
    headerName: 'Prioridad',
    description: 'This column has a value getter and is not sortable.',
    width: 90,
  },
  {
    field: 'sintomas',
    headerName: 'Síntomas',
    description: 'This column has a value getter and is not sortable.',
    width: 150,
  },
  {
    field: 'descripcion',
    headerName: 'Descripción',
    description: 'This column has a value getter and is not sortable.',
    width: 150,
  },
  {
    field: 'fecha',
    headerName: 'Fecha',
    description: 'This column has a value getter and is not sortable.',
    width: 100,
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
          Route={`editTicket/${params.id}`}/>
    ),
  }
];

const rows = [
  {
    id: 1,
    ticketName: 'Dolor de cabeza',
    colaborador: 'Juan Pérez',
    tipoIncidencia: 'Consulta',
    prioridad: 'Alta',
    sintomas: 'Dolor persistente',
    descripcion: 'Dolor de cabeza constante durante 3 días',
  },
  {
    id: 2,
    ticketName: 'Fiebre alta',
    colaborador: 'María López',
    tipoIncidencia: 'Emergencia',
    prioridad: 'Alta',
    sintomas: 'Temperatura superior a 39°C',
    descripcion: 'Fiebre alta acompañada de escalofríos',
  },
  {
    id: 3,
    ticketName: 'Chequeo general',
    colaborador: 'Carlos Gómez',
    tipoIncidencia: 'Preventiva',
    prioridad: 'Baja',
    sintomas: 'N/A',
    descripcion: 'Chequeo médico de rutina',
  },
];

const breadcrumbs = [
  { label: 'Inicio', href: '/' },
  { label: 'Tickets'}
]

const Tickets = () => {
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
          id="colaborador"
          label="Colaborador"
          select
          fullWidth
        >
          <MenuItem value="idCollaborator1">Oscar Vásquez</MenuItem>
          <MenuItem value="idCollaborator2">Max Zertuche</MenuItem>
          <MenuItem value="idCollaborator3">Carlos Pecina</MenuItem>
        </TextField>
        <TextField
          id="tipoIncidencia"
          label="Tipo de Incidencia"
          select
          fullWidth
        >
          <MenuItem value="Incidencia1">Incidencia 1</MenuItem>
          <MenuItem value="Incidencia2">Incidencia 2</MenuItem>
          <MenuItem value="Incidencia3">Incidencia 3</MenuItem>
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
        Text='Agregar Ticket'
        color={'info'}
        Route={'addTicket'}/>
    </Box>
    </Container>
    </>
  )
}

export default Tickets