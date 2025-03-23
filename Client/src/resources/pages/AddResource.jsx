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

const AddResource = () => {
  const breadcrumbs = [
    { label: 'Inicio', href: '/' },
    { label: 'Recursos', href: '/resources' },
    { label: 'Agregar Recurso'}
  ]

  return (
    <>
      <Container>
        <Box sx={{ flexGrow: 1, mt: '2rem' }}>
          <CustomBreadcrumb breadcrumbs={breadcrumbs} />
          <Typography variant="h4" component="h2" gutterBottom>
            Agregar Recurso
          </Typography>
          <Box sx={{ borderRadius: '1rem', backgroundColor: 'white', padding: '2rem'}}>
            <Stack direction={{ xs: 'column'}} spacing={3} >
              <TextField
                id="outlined-basic"
                label="Nombre del Recurso"
                variant="outlined"
                fullWidth
              />
              <TextField
                id="version"
                label="Versión"
                fullWidth
              />
              <TextField
                id="descripcion"
                label="Descripción"
                fullWidth
              />
            </Stack>
            <Stack direction="row" justifyContent="space-between" sx={{ marginTop: '2rem' }}>
              <NavigationButton variant="outlined" color="info" Route={'/resources'} Text={'Regresar'}/>
              <Button variant="contained" color="primary">Guardar</Button>
            </Stack>
          </Box>
        </Box>
      </Container>
    </>
  )
}

export default AddResource