import {React, useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import CustomBreadcrumb from '../../common/components/CustomBreadcrumb'
import CustomCalendar from '../../common/components/CustomCalendar'
import dayjs from 'dayjs'
import AppointmentsAPI from '../../services/AppointmentsAPI'

const Calendar = () => {
  const { id } = useParams()
  const [events, setEvents] = useState([]);
  // const events = [
  //   {
  //     title: "Cita",
  //     start: dayjs().toDate(),
  //     end: dayjs().toDate(),
  //   },
  // ];

  useEffect(() => {
    getAppointmentsCalendar(id);
  }, []);

  async function getAppointmentsCalendar(id) {
    try {
      const {data} = await AppointmentsAPI.getAppointmentsCalendar(id);
      const formattedEvents = data.map((event) => ({
        id: event.id,
        title: event.title || "Evento sin título", // Asigna un título predeterminado si no existe
        start: new Date(event.start), // Convierte a objeto Date
        end: new Date(event.end), // Convierte a objeto Date
        allDay: event.allDay || false, // Usa el valor de allDay o false por defecto
      }));
      setEvents(formattedEvents); // Actualiza el estado con los eventos formateados
      console.log("Eventos formateados:", formattedEvents);
    } catch (error) {
      console.error(error);
      setAppointments([]);
    }
  }

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