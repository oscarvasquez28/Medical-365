import React from 'react'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import CustomBreadcrumb from '../../common/components/CustomBreadcrumb'

const AddAppointment = () => {
  const breadcrumbs = [
    { label: 'Inicio', href: '/' },
    { label: 'Citas', href: '/appointments'},
    { label: 'Agregar Cita'}
  ]

  return (
    <>
      <Container>
        <Box sx={{ flexGrow: 1, mt: '2rem' }}>
        <CustomBreadcrumb breadcrumbs={breadcrumbs} />
        </Box>
      </Container>
    </>
  )
}

export default AddAppointment