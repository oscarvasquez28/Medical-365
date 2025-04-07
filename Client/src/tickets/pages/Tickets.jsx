import { React, useState, useEffect } from 'react'
import TicketsAPI from '../../services/TicketsAPI'
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
    field: 'Nombre',
    headerName: 'Nombre del Ticket',
    width: 150,
  },
  {
    field: 'Paciente',
    headerName: 'Paciente',
    width: 150,
  },
  {
    field: 'Incidencia',
    headerName: 'Tipo de Incidencia',
    width: 150,
  },
  {
    field: 'Sintomas',
    headerName: 'Síntomas',
    width: 200,
  },
  {
    field: 'Comentarios',
    headerName: 'Comentarios',
    width: 200,
  },
  {
    field: 'FechaDeRegistro',
    headerName: 'Fecha de Registro',
    width: 150,
  },
  {
    field: 'FechaDeCierre',
    headerName: 'Fecha de Cierre',
    width: 150,
  },
  {
    field: 'Estatus',
    headerName: 'Estatus',
    width: 120,
  },
  {
    field: 'actions',
    headerName: 'Acciones',
    width: 160,
    renderCell: (params) => (
        <NavigationButton
          variant={'contained'}
          Text='Editar'
          color={'info'}
          Route={`editTicket/${params.row._id}`}/>
    ),
  }
];

const breadcrumbs = [
  { label: 'Inicio', href: '/' },
  { label: 'Tickets'}
]

const Tickets = () => {
    const [ticket, setTicket] = useState([]);

      useEffect(() => {
        getTickets();
      }, []);

      async function getTickets() {
        try {
          const {data} = await TicketsAPI.getTickets();
          setTicket(data);
          console.log(data);
        } catch (error) {
          console.error(error);
          setTicket([]);
        }
      }

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
      rows={ticket}
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