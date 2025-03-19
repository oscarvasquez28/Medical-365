import React from 'react'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import CustomBreadcrumb from '../../common/components/CustomBreadcrumb'

const AddTicket = () => {
  const breadcrumbs = [
    { label: 'Inicio', href: '/' },
    { label: 'Tickets', href: '/tickets' },
    { label: 'Agregar Ticket'}
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

export default AddTicket