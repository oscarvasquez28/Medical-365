import { React, useState, useEffect } from 'react'
import ResourcesAPI from '../../services/ResourcesAPI'
import NavigationButton from '../../common/components/NavigationButton'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import DataTable from '../../common/components/DataTable'
import TextField from '@mui/material/TextField'
import MenuItem from '@mui/material/MenuItem'
import Stack from '@mui/material/Stack'
import CustomBreadcrumb from '../../common/components/CustomBreadcrumb'

const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'Nombre',
    headerName: 'Nombre',
    width: 150,
  },
  {
    field: 'Version',
    headerName: 'Versión',
    width: 150,
  },
  {
    field: 'Descripcion',
    headerName: 'Descripción',
    width: 200,
  },
  {
    field: 'FechaDeRegistro',
    headerName: 'Fecha de Registro',
    width: 180,
  },
  {
    field: 'Estado',
    headerName: 'Estado',
    width: 150,
  },
  {
    field: 'actions',
    headerName: 'Acciones',
    width: 160,
    renderCell: (params) => (
        <NavigationButton
          variant={'contained'}
          Text='Editar'
          color={'info'}
          Route={`editResource/${params.row.id}`}/>
    ),
  }
];

const breadcrumbs = [
  { label: 'Inicio', href: '/' },
  { label: 'Recursos'}
]

const Resources = () => {
  const [resource, setResource] = useState([]);

    useEffect(() => {
      getResources();
    }, []);

    async function getResources() {
      try {
        const {data} = await ResourcesAPI.getToolings();
        setResource(data);
        console.log(data);
      } catch (error) {
        console.error(error);
        setResource([]);
      }
    }

  return (
    <>
    <Container>
    <Box sx={{ flexGrow: 1, mt: '2rem' }}>
      <CustomBreadcrumb breadcrumbs={breadcrumbs}/>
      <Stack direction={{ xs: 'col', sm: 'row' }} spacing={3} sx={{ paddingTop: 3, borderRadius: '1rem'}}>
        <TextField
          id="nombre"
          label="Nombre"
          fullWidth
        />
        <TextField
          id="estatus"
          label="Estatus"
          select
          fullWidth
        >
          <MenuItem value="activo">Activo</MenuItem>
          <MenuItem value="inactivo">Inactivo</MenuItem>
        </TextField>
      </Stack>
    </Box>
    <DataTable
      rows={resource}
      columns={columns}
    />
    <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: '2rem' }}>
      <NavigationButton
        variant = {'outlined'}
        Text='Regresar'
        color={'info'}
        Route={'/'}/>
      <NavigationButton
        variant = {'outlined'}
        Text='Agregar Recurso'
        color={'info'}
        Route={'addResource'}/>
    </Box>
    </Container>
    </>
  )
}

export default Resources