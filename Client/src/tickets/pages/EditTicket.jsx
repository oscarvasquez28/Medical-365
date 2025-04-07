import {React, useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import TicketsAPI from '../../services/TicketsAPI'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import CustomBreadcrumb from '../../common/components/CustomBreadcrumb'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import MenuItem from '@mui/material/MenuItem'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import NavigationButton from '../../common/components/NavigationButton'
import AppointmentsAPI from '../../services/AppointmentsAPI'
import SymptomsAPI from '../../services/SymptomsAPI'
import IncidentAPI from '../../services/IncidentAPI'
import Autocomplete from '@mui/material/Autocomplete'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'


const EditTicket = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [incidentTypes, setIncidentTypes] = useState([])
  const [risk, setRisk] = useState([])
  const [symptoms, setSymptoms] = useState([])
  const [patient, setPatient] = useState('')
  const [ticket, setTicket] = useState({
    name: '',
    patient: '',
    description: '',
    incidence: '',
    risk: '',
    symptoms: [],
    comments: '',
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setTicket({ ...ticket, [name]: value })
    console.log(ticket)
  }

  useEffect(() => {
    getTicket(id);
    getIncidentTypes();
    getRisksList();
    getSymptomsList();
  }, []);

  async function putTicket(id) {
    try {
      console.log(ticket);
      const response = await TicketsAPI.putTickets(id, ticket);
      console.log("Ticket Actualizado con éxito", response.data);
      toast.success("Ticket Actualizado con éxito")
      navigate('/tickets');
    } catch (error) {
      console.error(error);
      toast.error("Error al Actualizar Ticket")
    }
  }

  async function getTicket(id) {
    try {
      const {data} = await TicketsAPI.getTicketById(id);
      setTicket({
        name: data.nombre || '',
        patient: '',
        incidence: data.incidencia || '',
        risk: data.riesgo || '',
        symptoms: data.sintomas || [],
        comments: data.comentarios || '',
      });
      setPatient(data.paciente || '');
      console.log(data);
    } catch (error) {
      console.error(error);
      setTicket([]);
    }
  }

  async function getIncidentTypes() {
    try {
      const {data} = await IncidentAPI.getIncidentTypes();
      setIncidentTypes(data);
      console.log(data);
    } catch (error) {
      console.error(error);
      setIncidentTypes([]);
    }
  }

  async function getRisksList() {
    try {
      const {data} = await AppointmentsAPI.getRisksList();
      setRisk(data);
      console.log(data);
    } catch (error) {
      console.error(error);
      setRisk([]);
    }
  }

  async function getSymptomsList() {
    try {
      const {data} = await SymptomsAPI.getSymptomsList();
      setSymptoms(data);
      console.log(data);
    } catch (error) {
      console.error(error);
      setSymptoms([]);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    putTicket(id)
  };

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
                onChange={handleInputChange}
                value={ticket.name || ''}
                name="name"
              />
              <TextField
                id="outlined-basic"
                label="Colaborador"
                variant="outlined"
                fullWidth
                disabled
                onChange={handleInputChange}
                value={patient || ''}
                name="colaborador"
              />
              <TextField
                id="incidence"
                label="Tipo de Incidencia"
                select
                fullWidth
                value={ticket.incidence || ''}
                onChange={handleInputChange}
                name="incidence"
              >
                {incidentTypes.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                id="risk"
                label="Riesgo"
                select
                fullWidth
                value={ticket.risk || ''}
                onChange={handleInputChange}
                name="risk"
              >
                {risk.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
              <Autocomplete
                fullWidth
                multiple
                options={symptoms} // Pasa el array completo de objetos
                getOptionLabel={(option) => option.label} // Muestra el label de cada opción
                value={ticket.symptoms.map((symptom) => symptoms.find((s) => s.value === symptom) || { label: '', value: symptom })} // Convierte los valores almacenados en objetos para que el Autocomplete funcione
                onChange={(_, value) => setTicket({ ...ticket, symptoms: value.map((item) => item.value) })} // Guarda solo los valores
                renderInput={(params) => <TextField {...params} label="Síntomas" />}
              />
              <TextField
                id="comments"
                label="Comentarios"
                fullWidth
                onChange={handleInputChange}
                value={ticket.comments || ''}
                name='comments'
              />
            </Stack>
            <Stack direction="row" justifyContent="space-between" sx={{ marginTop: '2rem' }}>
              <NavigationButton variant="outlined" color="info" Route={'/tickets'} Text={'Regresar'}/>
              <Button variant="contained" color="primary" onClick={handleSubmit}>Guardar</Button>
            </Stack>
          </Box>
        </Box>
      </Container>
    </>
  )
}

export default EditTicket