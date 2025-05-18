import { React, useState, useEffect } from 'react';
import TicketsAPI from '../../services/TicketsAPI';
import IncidentAPI from '../../services/IncidentAPI';
import NavigationButton from '../../common/components/NavigationButton';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import DataTable from '../../common/components/DataTable';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import CustomBreadcrumb from '../../common/components/CustomBreadcrumb';
import CollaboratorsAPI from '../../services/CollaboratorsAPI';
import Button from '@mui/material/Button';
import { useContext } from 'react';
import { UserContext } from '../../Context/UserContext.jsx';

const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  { field: 'nombre', headerName: 'Nombre del Ticket', width: 150 },
  { field: 'paciente', headerName: 'Paciente', width: 150 },
  { field: 'incidencia', headerName: 'Tipo de Incidencia', width: 150 },
  { field: 'sintomas', headerName: 'Síntomas', width: 200 },
  { field: 'comentarios', headerName: 'Comentarios', width: 200 },
  { field: 'fechaDeRegistro', headerName: 'Fecha de Registro', width: 150 },
  { field: 'fechaDeCierre', headerName: 'Fecha de Cierre', width: 150 },
  { field: 'riesgo', headerName: 'Riesgo', width: 120 },
  { field: 'estatus', headerName: 'Estatus', width: 120 },
];

const columnsRH = [
  { field: 'id', headerName: 'ID', width: 90 },
  { field: 'nombre', headerName: 'Nombre del Ticket', width: 150 },
  { field: 'paciente', headerName: 'Paciente', width: 150 },
  { field: 'incidencia', headerName: 'Tipo de Incidencia', width: 150 },
  { field: 'sintomas', headerName: 'Síntomas', width: 200 },
  { field: 'comentarios', headerName: 'Comentarios', width: 200 },
  { field: 'fechaDeRegistro', headerName: 'Fecha de Registro', width: 150 },
  { field: 'fechaDeCierre', headerName: 'Fecha de Cierre', width: 150 },
  { field: 'riesgo', headerName: 'Riesgo', width: 120 },
  { field: 'estatus', headerName: 'Estatus', width: 120 },
  {
    field: 'actions',
    headerName: 'Acciones',
    width: 160,
    renderCell: (params) => (
      <NavigationButton
        variant={'contained'}
        Text="Editar"
        color={'info'}
        Route={`editTicket/${params.row.id}`}
        disabled={params.row.estatus !== 'Pendiente'}
      />
    ),
  },
];

const breadcrumbs = [
  { label: 'Inicio', href: '/' },
  { label: 'Tickets' },
];

const Tickets = () => {
  const { user } = useContext(UserContext);
  const [tickets, setTickets] = useState([]); // Datos originales
  const [collaborator, setcollaborator] = useState([]);
  const [incidentType, setIncidentType] = useState([]);
  const [filteredTickets, setFilteredTickets] = useState([]); // Datos filtrados
  const [filters, setFilters] = useState({
    ticket: '',
    patient: '',
    incidence: '',
    startDate: null,
    endDate: null,
  });
  const initialFilters = {
    ticket: '',
    patient: '',
    incidence: '',
    startDate: null,
    endDate: null,
  };

  useEffect(() => {
    getTickets();
    getCollaboratorsList();
    getIncidentTypeList();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [filters]);

  async function getTickets() {
    try {
      const { data } = await TicketsAPI.getTicketsTable();
      setTickets(data);
      setFilteredTickets(data); // Inicialmente, muestra todos los datos
      console.log(data);
    } catch (error) {
      console.error(error);
      setTickets([]);
      setFilteredTickets([]);
    }
  }

  async function getCollaboratorsList() {
    try {
      const { data } = await CollaboratorsAPI.getCollaboratorsList();
      setcollaborator(data);
      console.log(data);
    } catch (error) {
      console.error(error);
      setcollaborator([]);
    }
  }

  async function getIncidentTypeList() {
    try {
      const { data } = await IncidentAPI.getIncidentTypes();
      setIncidentType(data);
      console.log(data);
    } catch (error) {
      console.error(error);
      setIncidentType([]);
    }
  }


  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const handleDateChange = (name, value) => {
    setFilters({ ...filters, [name]: value });
  };

  const applyFilters = () => {
    let filtered = [...tickets];

    // Filtrar por Ticket
    if (filters.ticket) {
      filtered = filtered.filter((ticket) =>
        ticket.nombre?.toLowerCase().includes(filters.ticket.toLowerCase())
      );
    }

    if (filters.patient) {
      filtered = filtered.filter((ticket) =>
        ticket.paciente?.toLowerCase().includes(filters.patient.toLowerCase())
      );
    }

    if (filters.incidence) {
      filtered = filtered.filter((ticket) =>
        ticket.incidencia?.toLowerCase().includes(filters.incidence.toLowerCase())
      );
    }

    // Filtrar por Fecha Inicio
    if (filters.startDate) {
      filtered = filtered.filter(
        (ticket) => new Date(ticket.fechaDeRegistro) >= new Date(filters.startDate)
      );
    }

    // Filtrar por Fecha Fin
    if (filters.endDate) {
      filtered = filtered.filter(
        (ticket) => new Date(ticket.fechaDeRegistro) <= new Date(filters.endDate)
      );
    }

    setFilteredTickets(filtered);
  };

  const resetFilters = () => {
    setFilters(initialFilters); // Reinicia los filtros a sus valores iniciales
  };

  return (
    <>
      <Container>
        <Box sx={{ flexGrow: 1, mt: '2rem' }}>
          <CustomBreadcrumb breadcrumbs={breadcrumbs} />
          <Stack direction={{ xs: 'row', sm: 'row' }} spacing={3}>
            <TextField
              id="ticket"
              label="Ticket"
              variant="outlined"
              fullWidth
              name="ticket"
              value={filters.ticket}
              onChange={handleFilterChange}
            />
          </Stack>
          <Stack
            direction={{ xs: 'col', sm: 'row' }}
            spacing={3}
            sx={{ paddingTop: 3, borderRadius: '1rem' }}
          >
            <TextField
              id="patient"
              label="Paciente"
              select
              fullWidth
              name="patient"
              value={filters.patient}
              onChange={handleFilterChange}
            >
              {collaborator.map((option) => (
                <MenuItem key={option.value} value={option.label}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              id="tipoIncidencia"
              label="Tipo de Incidencia"
              select
              fullWidth
              name="incidence"
              value={filters.incidence}
              onChange={handleFilterChange}
            >
              {incidentType.map((option) => (
                <MenuItem key={option.value} value={option.label}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            <DatePicker
              label="Fecha Inicio"
              value={filters.startDate}
              onChange={(newValue) => handleDateChange('startDate', newValue)}
              sx={{ width: '100%' }}
            />
            <DatePicker
              label="Fecha Fin"
              value={filters.endDate}
              onChange={(newValue) => handleDateChange('endDate', newValue)}
              sx={{ width: '100%' }}
            />
          </Stack>
          <Button
            variant="outlined"
            color="primary"
            onClick={resetFilters}
            sx={{ marginTop: 2 }}
          >
            Reiniciar Filtros
          </Button>
        </Box>
        <DataTable
          rows={filteredTickets}
          columns={user.role === "Colaborador" ? columns : columnsRH}
        />
        <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: '2rem' }}>
          <NavigationButton variant={'outlined'} Text="Regresar" color={'info'} Route={'/'} />
          <NavigationButton
            variant={'outlined'}
            Text="Agregar Ticket"
            color={'info'}
            Route={'addTicket'}
          />
        </Box>
      </Container>
    </>
  );
};

export default Tickets;