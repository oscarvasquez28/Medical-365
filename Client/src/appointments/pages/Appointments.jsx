import { React, useState, useEffect } from 'react';
import AppointmentsAPI from '../../services/AppointmentsAPI';
import CollaboratorsAPI from '../../services/CollaboratorsAPI';
import NavigationButton from '../../common/components/NavigationButton';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import DataTable from '../../common/components/DataTable';
import TextField from '@mui/material/TextField';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Stack from '@mui/material/Stack';
import MenuItem from '@mui/material/MenuItem';
import CustomBreadcrumb from '../../common/components/CustomBreadcrumb';
import Button from '@mui/material/Button';

const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  { field: 'Ticket', headerName: 'Ticket', width: 150 },
  { field: 'Paciente', headerName: 'Paciente', width: 200 },
  { field: 'Doctor', headerName: 'Doctor', width: 150 },
  { field: 'Riesgo', headerName: 'Riesgo', width: 120 },
  { field: 'Recurso', headerName: 'Recurso', width: 200 },
  { field: 'UltimoUsuarioEnModificar', headerName: 'Usuario Modificó', width: 200 },
  { field: 'Diagnostico', headerName: 'Diagnóstico', width: 200 },
  { field: 'FechaCita', headerName: 'Fecha de Cita', width: 180 },
  { field: 'Estatus', headerName: 'Estatus', width: 120 },
  {
    field: 'actions',
    headerName: 'Acciones',
    width: 160,
    renderCell: (params) => (
      <NavigationButton
        variant={'contained'}
        Text="Editar"
        color={'info'}
        Route={`editAppointment/${params.id}`}
      />
    ),
  },
];

const breadcrumbs = [
  { label: 'Inicio', href: '/' },
  { label: 'Citas' },
];

const Appointments = () => {
  const [appointments, setAppointments] = useState([]); // Datos originales
  const [filteredAppointments, setFilteredAppointments] = useState([]); // Datos filtrados
  const [admin, setAdmin] = useState([]);
  const [risk, setRisk] = useState([]);
  const [filters, setFilters] = useState({
    ticket: '',
    doctor: '',
    risk: '',
    startDate: null,
    endDate: null,
  });

  const initialFilters = {
    ticket: '',
    doctor: '',
    risk: '',
    startDate: null,
    endDate: null,
  };

  useEffect(() => {
    getAppointments();
    getAdminCollaboratorsList();
    getRiskList();
  }, []);

  // Aplica los filtros automáticamente cuando cambian
  useEffect(() => {
    applyFilters();
  }, [filters]);

  async function getAppointments() {
    try {
      const { data } = await AppointmentsAPI.getAppointmentsTable();
      setAppointments(data);
      setFilteredAppointments(data);
      console.log(data);
    } catch (error) {
      console.error(error);
      setAppointments([]);
      setFilteredAppointments([]);
    }
  }

  async function getAdminCollaboratorsList() {
    try {
      const { data } = await CollaboratorsAPI.getAdminCollaboratorsList();
      setAdmin(data);
      console.log(data);
    } catch (error) {
      console.error(error);
      setAdmin([]);
    }
  }

  async function getRiskList() {
    try {
      const { data } = await AppointmentsAPI.getRisksList();
      setRisk(data);
      console.log(data);
    } catch (error) {
      console.error(error);
      setRisk([]);
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
    let filtered = [...appointments];

    // Filtrar por Ticket
    if (filters.ticket) {
      filtered = filtered.filter((appointment) =>
        appointment.Ticket.toLowerCase().includes(filters.ticket.toLowerCase())
      );
    }

    // Filtrar por Doctor
    if (filters.doctor) {
      filtered = filtered.filter((appointment) =>
        appointment.Doctor.toLowerCase().includes(filters.doctor.toLowerCase())
      );
    }

    // Filtrar por Riesgo
    if (filters.risk) {
      filtered = filtered.filter((appointment) => appointment.Riesgo === filters.risk);
    }

    // Filtrar por Fecha Inicio y Fecha Fin
    if (filters.startDate) {
      filtered = filtered.filter(
        (appointment) => new Date(appointment.FechaCita) >= new Date(filters.startDate)
      );
    }
    if (filters.endDate) {
      filtered = filtered.filter(
        (appointment) => new Date(appointment.FechaCita) <= new Date(filters.endDate)
      );
    }

    setFilteredAppointments(filtered);
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
              id="doctor"
              label="Doctor"
              select
              fullWidth
              name="doctor"
              value={filters.doctor}
              onChange={handleFilterChange}
            >
              {admin.map((option) => (
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
              name="risk"
              value={filters.risk}
              onChange={handleFilterChange}
            >
              {risk.map((option) => (
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
        <DataTable rows={filteredAppointments} columns={columns} />
        <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: '2rem' }}>
          <NavigationButton variant={'outlined'} Text="Regresar" color={'info'} Route={'/'} />
          <NavigationButton
            variant={'outlined'}
            Text="Agregar Cita"
            color={'info'}
            Route={'addAppointment'}
          />
        </Box>
      </Container>
    </>
  );
};

export default Appointments;