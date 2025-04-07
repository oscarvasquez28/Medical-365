import {React, useState, useEffect, useContext} from 'react'
import {UserContext} from '../../Context/UserContext.jsx';
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
import CollaboratorsAPI from '../../services/CollaboratorsAPI'
import TicketsAPI from '../../services/TicketsAPI'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import AppointmentsAPI from '../../services/AppointmentsAPI'

const AddAppointment = () => {
  const navigate = useNavigate()
  const { user } = useContext(UserContext);
  const [ticket, setTicket] = useState([])
  const [doctor, setDoctor] = useState([])
  const [risk, setRisk] = useState([])
  const [appointment, setAppointment] = useState({
    ticket: '',
    doctor: '',
    risk: '',
    appointmentDate: null,
    lastModifiedBy: user.id,
  })

  const breadcrumbs = [
    { label: 'Inicio', href: '/' },
    { label: 'Citas', href: '/appointments' },
    { label: 'Agregar Cita'}
  ]

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setAppointment({ ...appointment, [name]: value })
    console.log(appointment)
  }

  useEffect(() => {
    getTicket();
    getDoctor();
    getRisk();
  }, []);

  async function postAppointment() {
    try {
      console.log(appointment);
      const response = await AppointmentsAPI.postAppointments(appointment);
      console.log("Cita agregado con éxito", response.data);
      toast.success("Cita agregado con éxito")
      navigate('/appointments');
    } catch (error) {
      console.error(error);
      toast.error("Error al agregar Cita")
    }
  }

  async function getTicket() {
    try {
      const {data} = await TicketsAPI.getTicketsList();
      setTicket(data);
      console.log(data);
    } catch (error) {
      console.error(error);
      setTicket([]);
    }
  }

  async function getDoctor() {
    try {
      const {data} = await CollaboratorsAPI.getDoctorList();
      setDoctor(data);
      console.log(data);
    } catch (error) {
      console.error(error);
      setDoctor([]);
    }
  }

  async function getRisk() {
    try {
      const {data} = await AppointmentsAPI.getRisksList();
      setRisk(data);
      console.log(data);
    } catch (error) {
      console.error(error);
      setRisk([]);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    postAppointment()
  };


  return (
    <>
      <Container>
        <Box sx={{ flexGrow: 1, mt: '2rem' }}>
          <CustomBreadcrumb breadcrumbs={breadcrumbs} />
          <Typography variant="h4" component="h2" gutterBottom>
            Agregar Cita
          </Typography>
          <Box sx={{ borderRadius: '1rem', backgroundColor: 'white', padding: '2rem'}}>
            <Stack direction={{ xs: 'column'}} spacing={3} >
              <TextField
                id="ticket"
                label="Ticket"
                select
                fullWidth
                onChange={handleInputChange}
                name="ticket"
              >
                {ticket.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                id="doctor"
                label="Doctor"
                select
                fullWidth
                onChange={handleInputChange}
                name="doctor"
              >
                {doctor.map((option) => (
                  <MenuItem key={option.value} value={option.label}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                id="risk"
                label="Riesgo"
                select
                fullWidth
                onChange={handleInputChange}
                name="risk"
              >
                {risk.map((option) => (
                  <MenuItem key={option.value} value={option.label}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
              <DatePicker
                label="Fecha de Cita"
                value={appointment.appointmentDate} // Asegúrate de que el valor sea un objeto Date o null
                onChange={(newValue) => setAppointment({ ...appointment, appointmentDate: newValue })} // Actualiza el estado con la nueva fecha
                sx={{ width: '100%' }}
              />
            </Stack>
            <Stack direction="row" justifyContent="space-between" sx={{ marginTop: '2rem' }}>
              <NavigationButton variant="outlined" color="info" Route={'/appointments'} Text={'Regresar'}/>
              <Button variant="contained" color="primary" onClick={handleSubmit}>Guardar</Button>
            </Stack>
          </Box>
        </Box>
      </Container>
    </>
  )
}

export default AddAppointment