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
import Autocomplete from '@mui/material/Autocomplete'
import SymptomsAPI from '../../services/SymptomsAPI'
import IncidentAPI from '../../services/IncidentAPI'
import TicketsAPI from '../../services/TicketsAPI'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'
//importar contexto

const AddTicket = () => {
  const navigate = useNavigate()
  const { user } = useContext(UserContext);
  const [symptoms, setSymptoms] = useState([])
  const [incident, setIncident] = useState([])
  const [errors, setErrors] = useState({});
  const [ticket, setTicket] = useState({
    name: '',
    incidence: '',
    symptoms: [],
    comments: '',
    patient: user.id,
  })

  const breadcrumbs = [
    { label: 'Inicio', href: '/' },
    { label: 'Tickets', href: '/tickets' },
    { label: 'Agregar Ticket'}
  ]

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setTicket({ ...ticket, [name]: value })
    console.log(ticket)
  }

    useEffect(() => {
      getSymptomsList();
      getIncidentTypes();
    }, []);


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
  async function getIncidentTypes() {
    try {
      const {data} = await IncidentAPI.getIncidentTypes();
      setIncident(data);
      console.log(data);
    } catch (error) {
      console.error(error);
      setIncident([]);
    }
  }

  async function postTicket() {
    try {
      console.log(ticket);
      const response = await TicketsAPI.postTickets(ticket);
      console.log("Ticket agregado con éxito", response.data);
      toast.success("Ticket agregado con éxito")
      navigate('/tickets');
    } catch (error) {
      console.error(error);
      toast.error("Error al agregar Ticket")
    }
  }
    const validate = () => {
    const newErrors = {};
    if (!ticket.name.trim()) newErrors.name = "El nombre es obligatorio";
    if (!ticket.incidence) newErrors.incidence = "El tipo de incidencia es obligatorio";
    if (!ticket.symptoms || ticket.symptoms.length === 0) newErrors.symptoms = "Selecciona al menos un síntoma";
    if (!ticket.comments.trim()) newErrors.comments = "Los comentarios son obligatorios";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      postTicket();
    }
  };

  return (
    <>
      <Container>
        <Box sx={{ flexGrow: 1, mt: '2rem' }}>
          <CustomBreadcrumb breadcrumbs={breadcrumbs} />
          <Typography variant="h4" component="h2" gutterBottom>
            Agregar Ticket
          </Typography>
          <Box sx={{ borderRadius: '1rem', backgroundColor: 'white', padding: '2rem'}}>
            <Stack direction={{ xs: 'column'}} spacing={3} >
              <TextField
                id="outlined-basic"
                label="Nombre del Ticket"
                variant="outlined"
                fullWidth
                onChange={handleInputChange}
                name="name"
                error={!!errors.name}
                helperText={errors.name}
              />
              <TextField
                id="incidence"
                label="Tipo de Incidencia"
                select
                fullWidth
                onChange={handleInputChange}
                name="incidence"
                error={!!errors.incidence}
                helperText={errors.incidence}
              >
                {incident.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
              <Autocomplete
                fullWidth
                multiple
                options={symptoms}
                getOptionLabel={(option) => option.label}
                value={ticket.symptoms.map((symptom) => symptoms.find((s) => s.value === symptom) || { label: '', value: symptom })}
                onChange={(_, value) => setTicket({ ...ticket, symptoms: value.map((item) => item.value) })}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Síntomas"
                    error={!!errors.symptoms}
                    helperText={errors.symptoms}
                  />
                )}
              />
              <TextField
                id="comentarios"
                label="Comentarios"
                fullWidth
                onChange={handleInputChange}
                name="comments"
                error={!!errors.comments}
                helperText={errors.comments}
              />
            </Stack>
            <Stack direction="row" justifyContent="space-between" sx={{ marginTop: '2rem' }}>
              <NavigationButton variant="outlined" color="info" Route={'/tickets'} Text={'Regresar'}/>
              <Button variant="contained" color="primary" onClick={handleSubmit}>Agregar</Button>
            </Stack>
          </Box>
        </Box>
      </Container>
    </>
  )
}

export default AddTicket