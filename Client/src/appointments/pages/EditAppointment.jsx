import {React, useState, useEffect} from 'react'
import { useParams, useNavigate } from 'react-router-dom'
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
import AppointmentsAPI from '../../services/AppointmentsAPI'
import { toast } from 'react-hot-toast'
import { useContext } from 'react'
import { UserContext } from '../../Context/UserContext.jsx'
import ResourcesAPI from '../../services/ResourcesAPI.js'
import dayjs from 'dayjs';

const EditAppointment = () => {
  const navigate = useNavigate()
  const { user } = useContext(UserContext);
  const { id } = useParams()
  const [ticket, setTicket] = useState('')
  const [patient, setPatient] = useState('')
  const [doctor, setDoctor] = useState([])
  const [risk, setRisk] = useState([])
  const [resource, setResource] = useState([])
  const [status, setStatus] = useState([])
  const [errors, setErrors] = useState({});

  const today = dayjs().startOf('day');
  const [appointment, setAppointment] = useState({
    ticket: '',
    doctor: '',
    risk: '',
    appointmentDate: null,
    lastModifiedBy: user.id,
    status: '',
    diagnosis: '',
    resource: ''
  })
  const breadcrumbs = [
    { label: 'Inicio', href: '/' },
    { label: 'Citas', href: '/appointments' },
    { label: 'Editar Cita'}
  ]

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setAppointment({ ...appointment, [name]: value })
    console.log(appointment)
  }

  useEffect(() => {
    getDoctor();
    getRisk();
    getAppointmentById(id);
    getToolingsList();
    getStatus();
  }, []);

  async function putAppointments(id) {
    try {
      console.log(appointment);
      const response = await AppointmentsAPI.putAppointments(id, appointment);
      console.log("Cita Actualizada con éxito", response.data);
      toast.success("Cita Actualizada con éxito")
      navigate('/appointments');
    } catch (error) {
      console.error(error);
      toast.error("Error al Actualizar Cita")
    }
  }
  async function getAppointmentById(id) {
    try {
      const {data} = await AppointmentsAPI.getAppointmentById(id);
      setAppointment({
        ticket: null,
        doctor: data.Doctor || '',
        risk: data.Riesgo || '',
        appointmentDate: data.FechaCita ? dayjs(data.FechaCita) : null,
        lastModifiedBy: user.id || '',
        status: data.Estatus || '',
        diagnosis: data.Diagnostico || '',
        tooling: data.Recurso || '' ,
      });
      setTicket(data.Ticket || '');
      setPatient(data.Paciente || '');
      console.log(data);
    } catch (error) {
      console.error(error);
      setAppointment([]);
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

  async function getStatus() {
    try {
      const {data} = await AppointmentsAPI.getStatusList();
      setStatus(data);
      console.log(data);
    } catch (error) {
      console.error(error);
      setStatus([]);
    }
  }

  async function getToolingsList() {
    try {
      const {data} = await ResourcesAPI.getToolingsList();
      setResource(data);
      console.log(data);
    } catch (error) {
      console.error(error);
      setResource([]);
    }
  }

  const validate = () => {
    const newErrors = {};
    if (!appointment.doctor) newErrors.doctor = "El doctor es obligatorio";
    if (!appointment.risk) newErrors.risk = "El riesgo es obligatorio";
    if (!appointment.appointmentDate) {
      newErrors.appointmentDate = "La fecha de cita es obligatoria";
    } else if (dayjs(appointment.appointmentDate).isBefore(today)) {
      newErrors.appointmentDate = "La fecha debe ser hoy o posterior";
    }
    if (!appointment.status) newErrors.status = "El estatus es obligatorio";
    if (!appointment.diagnosis.trim()) newErrors.diagnosis = "El diagnóstico es obligatorio";
    if (!appointment.tooling) newErrors.tooling = "El recurso es obligatorio";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      putAppointments(id);
    }
  };

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
                fullWidth
                onChange={handleInputChange}
                name="ticket"
                value={ticket}
                disabled
              />
              <TextField
                id="patient"
                label="Paciente"
                fullWidth
                onChange={handleInputChange}
                name="patient"
                value={patient}
                disabled
              />
              <TextField
                id="doctor"
                label="Doctor"
                select
                fullWidth
                onChange={handleInputChange}
                value={appointment.doctor || ''}
                name="doctor"
                error={!!errors.doctor}
                helperText={errors.doctor}
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
                value={appointment.risk || ''}
                name="risk"
                error={!!errors.risk}
                helperText={errors.risk}
              >
                {risk.map((option) => (
                  <MenuItem key={option.value} value={option.label}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
              <DatePicker
                label="Fecha de Cita"
                value={appointment.appointmentDate}
                minDate={today}
                onChange={(newValue) => setAppointment({ ...appointment, appointmentDate: newValue })}
                sx={{ width: '100%' }}
                slotProps={{
                  textField: {
                    error: !!errors.appointmentDate,
                    helperText: errors.appointmentDate,
                  }
                }}
              />
              <TextField
                id="status"
                label="Estatus"
                select
                fullWidth
                onChange={handleInputChange}
                value={appointment.status || ''}
                name="status"
                error={!!errors.status}
                helperText={errors.status}
              >
                {status.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                id="diagnosis"
                label="Diagnóstico"
                fullWidth
                onChange={handleInputChange}
                name="diagnosis"
                value={appointment.diagnosis || ''}
                error={!!errors.diagnosis}
                helperText={errors.diagnosis}
              />
              <TextField
                id="tooling"
                label="Recurso"
                select
                fullWidth
                onChange={handleInputChange}
                value={appointment.tooling || ''}
                name="tooling"
                error={!!errors.tooling}
                helperText={errors.tooling}
              >
                {resource.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
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

export default EditAppointment