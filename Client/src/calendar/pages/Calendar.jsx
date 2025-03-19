import React from 'react'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import CustomBreadcrumb from '../../common/components/CustomBreadcrumb'
import CustomCalendar from '../../common/components/CustomCalendar'
import dayjs from 'dayjs'

const Calendar = () => {
  const events = [
    {
      title: "Cita",
      start: dayjs().toDate(),
      end: dayjs().toDate(),
    },
  ];

  const breadcrumbs = [
    { label: 'Inicio', href: '/' },
    { label: 'Calendario'}
  ]

  return (
    <>
      <Container>
        <Box sx={{ flexGrow: 1, mt: '2rem' }}>
        <CustomBreadcrumb breadcrumbs={breadcrumbs} />
          <CustomCalendar events={events}/>
        </Box>
      </Container>
    </>
  )
}

export default Calendar