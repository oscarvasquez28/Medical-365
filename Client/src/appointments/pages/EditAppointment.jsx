import React from 'react'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import CustomBreadcrumb from '../../common/components/CustomBreadcrumb'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import MenuItem from '@mui/material/MenuItem'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import NavigationButton from '../../common/components/NavigationButton'
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const EditAppointment = () => {
  const breadcrumbs = [
    { label: 'Inicio', href: '/' },
    { label: 'Citas', href: '/appointments' },
    { label: 'Editar Cita'}
  ]

  return (
    <>
      <Container>
        <Box sx={{ flexGrow: 1, mt: '2rem' }}>
          <CustomBreadcrumb breadcrumbs={breadcrumbs} />
          <Typography variant="h4" component="h2" gutterBottom>
            Editar Cita
          </Typography>
          <Box sx={{ borderRadius: '1rem', backgroundColor: 'white', padding: '2rem'}}>
            <Stack direction={{ xs: 'column'}} spacing={3} >
              <TextField
                id="ticket"
                label="Ticket"
                select
                fullWidth
              >
                <MenuItem value="Ticket1">Ticket 1</MenuItem>
                <MenuItem value="Ticket2">Ticket 2</MenuItem>
                <MenuItem value="Ticket3">Ticket 3</MenuItem>
              </TextField>
              <TextField
                id="doctor"
                label="Doctor"
                select
                fullWidth
              >
                <MenuItem value="idCollaborator1">Doc. Oscar Vásquez</MenuItem>
                <MenuItem value="idCollaborator2">Doc. Max Zertuche</MenuItem>
                <MenuItem value="idCollaborator3">Doc. Carlos Pecina</MenuItem>
              </TextField>
              <TextField
                id="riesgo"
                label="Riesgo"
                select
                fullWidth
              >
                <MenuItem value="riesgo1">Alto</MenuItem>
                <MenuItem value="riesgo2">Medio</MenuItem>
                <MenuItem value="riesgo3">Bajo</MenuItem>
              </TextField>
              <DatePicker
                label="Fecha de Cita"
                // value={value}
                // onChange={(newValue) => setValue(newValue)}
                sx={{ width: '100%' }}
              />
              <TextField
                id="Estatus"
                label="Estatus"
                select
                fullWidth
              >
                <MenuItem value="cerrado">Cerrado</MenuItem>
                <MenuItem value="pendiente">Pendiente</MenuItem>
                <MenuItem value="cancelado">Cancelado</MenuItem>
              </TextField>
              <TextField
                id="diagnostico"
                label="Diagnóstico"
                fullWidth
              />
              <TextField
                id="Recurso"
                label="Recurso"
                select
                fullWidth
              >
                <MenuItem value="Recurso 1">Recurso Prueba</MenuItem>
                <MenuItem value="Recurso 2">Recurso Prueba</MenuItem>
                <MenuItem value="Recurso 3">Recurso Prueba</MenuItem>
              </TextField>
            </Stack>
            <Stack direction="row" justifyContent="space-between" sx={{ marginTop: '2rem' }}>
              <NavigationButton variant="outlined" color="info" Route={'/appointments'} Text={'Regresar'}/>
              <Button variant="contained" color="primary">Guardar</Button>
            </Stack>
          </Box>
        </Box>
      </Container>
    </>
  )
}

export default EditAppointment