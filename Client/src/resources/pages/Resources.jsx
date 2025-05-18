import { React, useState, useEffect } from 'react';
import ResourcesAPI from '../../services/ResourcesAPI';
import NavigationButton from '../../common/components/NavigationButton';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import DataTable from '../../common/components/DataTable';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';
import CustomBreadcrumb from '../../common/components/CustomBreadcrumb';
import Button from '@mui/material/Button';

const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  { field: 'Nombre', headerName: 'Nombre', width: 150 },
  { field: 'Version', headerName: 'Versión', width: 150 },
  { field: 'Descripcion', headerName: 'Descripción', width: 200 },
  { field: 'FechaDeRegistro', headerName: 'Fecha de Registro', width: 180 },
  { field: 'Estado', headerName: 'Estado', width: 150 },
  {
    field: 'actions',
    headerName: 'Acciones',
    width: 160,
    renderCell: (params) => (
      <NavigationButton
        variant={'contained'}
        Text="Editar"
        color={'info'}
        Route={`editResource/${params.row.id}`}
      />
    ),
  },
];

const breadcrumbs = [
  { label: 'Inicio', href: '/' },
  { label: 'Recursos' },
];

const Resources = () => {
  const [resources, setResources] = useState([]); // Datos originales
  const [filteredResources, setFilteredResources] = useState([]); // Datos filtrados
  const [status, setStatus] = useState([]);
  const [filters, setFilters] = useState({
    name: '',
    status: '',
  });

  const initialFilters = {
    name: '',
    status: '',
  };

  useEffect(() => {
    getResources();
    getToolingEstatusList();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [filters]);

  async function getResources() {
    try {
      const { data } = await ResourcesAPI.getToolings();
      setResources(data);
      setFilteredResources(data); // Inicialmente, muestra todos los datos
      console.log(data);
    } catch (error) {
      console.error(error);
      setResources([]);
      setFilteredResources([]);
    }
  }

  async function getToolingEstatusList() {
    try {
      const { data } = await ResourcesAPI.getToolingEstatusList();
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
    let filtered = [...resources];

    // Filtrar por Nombre
    if (filters.name) {
      filtered = filtered.filter((resource) =>
        resource.Nombre?.toLowerCase().includes(filters.name.toLowerCase())
      );
    }

    // Filtrar por Estado
    if (filters.status) {
      filtered = filtered.filter((resource) => resource.Estado === filters.status);
    }

    setFilteredResources(filtered);
  };

  const resetFilters = () => {
    setFilters(initialFilters); // Reinicia los filtros a sus valores iniciales
  };

  return (
    <>
      <Container>
        <Box sx={{ flexGrow: 1, mt: '2rem' }}>
          <CustomBreadcrumb breadcrumbs={breadcrumbs} />
          <Stack direction={{ xs: 'col', sm: 'row' }} spacing={3} sx={{ paddingTop: 3, borderRadius: '1rem' }}>
            <TextField
              id="nombre"
              label="Nombre"
              fullWidth
              name="name"
              value={filters.name}
              onChange={handleFilterChange}
            />
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
        <DataTable rows={filteredResources} columns={columns} />
        <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: '2rem' }}>
          <NavigationButton variant={'outlined'} Text="Regresar" color={'info'} Route={'/'} />
          <NavigationButton
            variant={'outlined'}
            Text="Agregar Recurso"
            color={'info'}
            Route={'addResource'}
          />
        </Box>
      </Container>
    </>
  );
};

export default Resources;