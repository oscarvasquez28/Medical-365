import { React, useState, useEffect } from 'react'
import AppointmentsAPI from '../../services/AppointmentsAPI'
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
    field: 'Ticket',
    headerName: 'Ticket',
    width: 150,
  },
  {
    field: 'Doctor',
    headerName: 'Doctor',
    width: 150,
  },
  {
    field: 'Riesgo',
    headerName: 'Riesgo',
    width: 120,
  },
  {
    field: 'Diagnostico',
    headerName: 'Diagnóstico',
    width: 200,
  },
  {
    field: 'FechaCita',
    headerName: 'Fecha de Cita',
    width: 180,
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
        Route={`editAppointment/${params.id}`}
      />
    ),
  },
];

const breadcrumbs = [
  { label: 'Inicio', href: '/' },
  { label: 'Citas'}
]

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    getAppointments();
  }, []);

  async function getAppointments() {
    try {
      const {data} = await AppointmentsAPI.getAppointments();
      setAppointments(data);
      console.log(data);
    } catch (error) {
      console.error(error);
      setAppointments([]);
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
      rows={appointments}
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