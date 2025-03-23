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

const AddCollaborator = () => {
  const breadcrumbs = [
    { label: 'Inicio', href: '/' },
    { label: 'Colaboradores', href: '/collaborators' },
    { label: 'Agregar Colaborador'}
  ]

  return (
    <>
      <Container>
        <Box sx={{ flexGrow: 1, mt: '2rem' }}>
          <CustomBreadcrumb breadcrumbs={breadcrumbs} />
          <Typography variant="h4" component="h2" gutterBottom>
            Agregar Colaborador
          </Typography>
          <Box sx={{ borderRadius: '1rem', backgroundColor: 'white', padding: '2rem'}}>
            <Stack direction={{ xs: 'column', md: 'row'}} spacing={3} sx={{ marginBottom: 3 }}>
              <TextField
                id="outlined-basic"
                label="Nombre"
                variant="outlined"
                fullWidth
              />
              <TextField
                id="outlined-basic"
                label="Apellido"
                variant="outlined"
                fullWidth
              />
            </Stack>
            <Stack direction={{ xs: 'column'}} spacing={3} >
            <DatePicker
                label="Fecha de Nacimiento"
                // value={value}
                // onChange={(newValue) => setValue(newValue)}
                sx={{ width: '100%' }}
              />
              <TextField
                id="outlined-basic"
                label="Correo"
                variant="outlined"
                fullWidth
              />
              <TextField
                id="outlined-basic"
                label="Contraseña"
                variant="outlined"
                fullWidth
              />
              <TextField
                id="departamento"
                label="Departamento"
                select
                fullWidth
              >
                <MenuItem value="operaciones">Operaciones</MenuItem>
                <MenuItem value="ingenieria">Ingeniería</MenuItem>
                <MenuItem value="desarrollo">Desarrollo</MenuItem>
              </TextField>
              <TextField
                id="rol"
                label="Rol"
                select
                fullWidth
              >
                <MenuItem value="administrador">Administrador</MenuItem>
                <MenuItem value="gerente">Gerente</MenuItem>
                <MenuItem value="colaborador">Colaborador</MenuItem>
              </TextField>
              <DatePicker
                label="Fecha de Registro"
                // value={value}
                // onChange={(newValue) => setValue(newValue)}
                sx={{ width: '100%' }}
              />
            </Stack>
            <Stack direction="row" justifyContent="space-between" sx={{ marginTop: '2rem' }}>
              <NavigationButton variant="outlined" color="info" Route={'/collaborators'} Text={'Regresar'}/>
              <Button variant="contained" color="primary">Agregar</Button>
            </Stack>
          </Box>
        </Box>
      </Container>
    </>
  )
}

export default AddCollaborator