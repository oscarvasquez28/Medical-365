import { React, useState, useEffect } from 'react';
import CollaboratorsAPI from '../../services/CollaboratorsAPI';
import DepartmentsAPI from '../../services/DepartmentsAPI';
import NavigationButton from '../../common/components/NavigationButton';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import DataTable from '../../common/components/DataTable';
import TextField from '@mui/material/TextField';
import CustomBreadcrumb from '../../common/components/CustomBreadcrumb';
import Stack from '@mui/material/Stack';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';

const columns = [
  { field: 'id', headerName: 'ID', width: 80 },
  { field: 'Nombre', headerName: 'Nombre', width: 120 },
  { field: 'Apellido', headerName: 'Apellido', width: 120 },
  { field: 'Correo', headerName: 'Correo', width: 200 },
  { field: 'Departamento', headerName: 'Departamento', width: 200 },
  { field: 'Rol', headerName: 'Rol', width: 200 },
  { field: 'FechaDeNacimiento', headerName: 'Fecha de Nacimiento', width: 200 },
  { field: 'FechaDeRegistro', headerName: 'Fecha de Registro', width: 150 },
  { field: 'FechaDeBaja', headerName: 'Fecha de Baja', width: 150 },
  { field: 'Estado', headerName: 'Estado', width: 100 },
  {
    field: 'actions',
    headerName: 'Acciones',
    width: 110,
    renderCell: (params) => (
      <NavigationButton
        variant={'contained'}
        Text="Editar"
        color={'info'}
        Route={`editCollaborator/${params.id}`}
      />
    ),
  },
];

const breadcrumbs = [
  { label: 'Inicio', href: '/' },
  { label: 'Colaboradores' },
];

const Collaborators = () => {
  const [collaborators, setCollaborators] = useState([]); // Datos originales
  const [filteredCollaborators, setFilteredCollaborators] = useState([]); // Datos filtrados
  const [department, setDepartment] = useState([]);
  const [status, setStatus] = useState([]);
  const [filters, setFilters] = useState({
    name: '',
    department: '',
    status: '',
  });
  const initialFilters = {
    name: '',
    department: '',
    status: '',
  };

  useEffect(() => {
    getCollaborators();
    getDepartments();
    getStatus();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [filters]);

  async function getCollaborators() {
    try {
      const { data } = await CollaboratorsAPI.getCollaboratorsTable();
      setCollaborators(data);
      setFilteredCollaborators(data); // Inicialmente, muestra todos los datos
      console.log(data);
    } catch (error) {
      console.error(error);
      setCollaborators([]);
      setFilteredCollaborators([]);
    }
  }

    async function getDepartments() {
      try {
        const { data } = await DepartmentsAPI.getDepartments();
        setDepartment(data);
        console.log(data);
      } catch (error) {
        console.error(error);
        setDepartment([]);
      }
    }

    async function getStatus() {
      try {
        const { data } = await CollaboratorsAPI.getStatus();
        setStatus(data);
        console.log(data);
      } catch (error) {
        console.error(error);
        setStatus([]);
      }
    }


  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const applyFilters = () => {
    let filtered = [...collaborators];

    // Filtrar por Nombre
    if (filters.name) {
      filtered = filtered.filter((collaborator) =>
        collaborator.Nombre?.toLowerCase().includes(filters.name.toLowerCase())
      );
    }

    // Filtrar por Departamento
    if (filters.department) {
      filtered = filtered.filter((collaborator) =>
        collaborator.Departamento?.toLowerCase().includes(filters.department.toLowerCase())
      );
    }

    // Filtrar por Estado
    if (filters.status) {
      filtered = filtered.filter((collaborator) => collaborator.Estado === filters.status);
    }

    setFilteredCollaborators(filtered);
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
              id="nombre"
              label="Nombre"
              variant="outlined"
              fullWidth
              name="name"
              value={filters.name}
              onChange={handleFilterChange}
            />
          </Stack>
          <Stack
            direction={{ xs: 'col', sm: 'row' }}
            spacing={3}
            sx={{ paddingTop: 3, borderRadius: '1rem' }}
          >
            <TextField
              id="departamento"
              label="Departamento"
              select
              fullWidth
              name="department"
              value={filters.department}
              onChange={handleFilterChange}
            >
              {department.map((option) => (
                <MenuItem key={option.value} value={option.label}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              id="estatus"
              label="Estatus"
              select
              fullWidth
              name="status"
              value={filters.status}
              onChange={handleFilterChange}
            >
              {status.map((option) => (
                <MenuItem key={option.value} value={option.label}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
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
        <DataTable rows={filteredCollaborators} columns={columns} />
        <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: '2rem' }}>
          <NavigationButton variant={'outlined'} Text="Regresar" color={'info'} Route={'/'} />
          <NavigationButton
            variant={'outlined'}
            Text="Agregar Colaborador"
            color={'info'}
            Route={'addCollaborator'}
          />
        </Box>
      </Container>
    </>
  );
};

export default Collaborators;