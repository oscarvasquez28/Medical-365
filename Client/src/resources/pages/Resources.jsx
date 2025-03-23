import React from 'react'
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
    field: 'nombre',
    headerName: 'Nombre',
    width: 150,
  },
  {
    field: 'version',
    headerName: 'Versión',
    width: 150,
  },
  {
    field: 'descripcion',
    headerName: 'Descripción',
    width: 200,
  },
  {
    field: 'estatus',
    headerName: 'Estatus',
    width: 150,
  },
  {
    field: 'actions',
    headerName: 'Acciones',
    width: 160,
    renderCell: (params) => (
        <NavigationButton
          variant = {'contained'}
          Text='Editar'
          color={'info'}
          Route={`editResource/${params.id}`}/>
    ),
  }
];

const rows = [
  { id: 1, nombre: 'Recurso 1', version: '1.0', descripcion: 'Descripción del recurso 1', estatus: 'Activo' },
  { id: 2, nombre: 'Recurso 2', version: '1.1', descripcion: 'Descripción del recurso 2', estatus: 'Inactivo' },
  { id: 3, nombre: 'Recurso 3', version: '2.0', descripcion: 'Descripción del recurso 3', estatus: 'Activo' },
  { id: 4, nombre: 'Recurso 4', version: '2.1', descripcion: 'Descripción del recurso 4', estatus: 'Inactivo' },
  { id: 5, nombre: 'Recurso 5', version: '3.0', descripcion: 'Descripción del recurso 5', estatus: 'Activo' },
  { id: 6, nombre: 'Recurso 6', version: '3.1', descripcion: 'Descripción del recurso 6', estatus: 'Inactivo' },
  { id: 7, nombre: 'Recurso 7', version: '4.0', descripcion: 'Descripción del recurso 7', estatus: 'Inactivo' },
  { id: 8, nombre: 'Recurso 8', version: '4.1', descripcion: 'Descripción del recurso 8', estatus: 'Activo' },
  { id: 9, nombre: 'Recurso 9', version: '5.0', descripcion: 'Descripción del recurso 9', estatus: 'Inactivo' },
  { id: 10, nombre: 'Recurso 10', version: '5.1', descripcion: 'Descripción del recurso 10', estatus: 'Activo' },
];

const breadcrumbs = [
  { label: 'Inicio', href: '/' },
  { label: 'Recursos'}
]

const Resources = () => {
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
      rows={rows}
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