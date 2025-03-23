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

const EditTicket = () => {
  const breadcrumbs = [
    { label: 'Inicio', href: '/' },
    { label: 'Tickets', href: '/tickets' },
    { label: 'Editar Ticket'}
  ]

  return (
    <>
      <Container>
        <Box sx={{ flexGrow: 1, mt: '2rem' }}>
          <CustomBreadcrumb breadcrumbs={breadcrumbs} />
          <Typography variant="h4" component="h2" gutterBottom>
            Editar Ticket
          </Typography>
          <Box sx={{ borderRadius: '1rem', backgroundColor: 'white', padding: '2rem'}}>
            <Stack direction={{ xs: 'column'}} spacing={3} >
              <TextField
                id="outlined-basic"
                label="Nombre del Ticket"
                variant="outlined"
                fullWidth
              />
              <TextField
                id="outlined-basic"
                label="Colaborador"
                variant="outlined"
                fullWidth
                disabled
              />
              <TextField
                id="incidencia"
                label="Tipo de Incidencia"
                select
                fullWidth
              >
                <MenuItem value="consulta">Consulta</MenuItem>
                <MenuItem value="emergencia">Emergencia</MenuItem>
                <MenuItem value="seguimiento">Seguimiento</MenuItem>
              </TextField>
              <TextField
                id="prioridad"
                label="Prioridad"
                select
                fullWidth
              >
                <MenuItem value="alta">Alta</MenuItem>
                <MenuItem value="media">Media</MenuItem>
                <MenuItem value="baja">Baja</MenuItem>
              </TextField>
              <TextField
                id="sintomas"
                label="Síntomas"
                select
                fullWidth
              >
                <MenuItem value="consulta">Fiebre</MenuItem>
                <MenuItem value="emergencia">Dolor de Cabeza</MenuItem>
                <MenuItem value="seguimiento">Temperatura</MenuItem>
              </TextField>
              <TextField
                id="descripcion"
                label="Descripción"
                fullWidth
              />
            </Stack>
            <Stack direction="row" justifyContent="space-between" sx={{ marginTop: '2rem' }}>
              <NavigationButton variant="outlined" color="info" Route={'/tickets'} Text={'Regresar'}/>
              <Button variant="contained" color="primary">Guardar</Button>
            </Stack>
          </Box>
        </Box>
      </Container>
    </>
  )
}

export default EditTicket