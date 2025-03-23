import React from 'react'
import NavigationButton from '../../common/components/NavigationButton'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import DataTable from '../../common/components/DataTable'
import TextField from '@mui/material/TextField'
import CustomBreadcrumb from '../../common/components/CustomBreadcrumb'
import Stack from '@mui/material/Stack'
import MenuItem from '@mui/material/MenuItem'

const columns = [
  { field: 'id', headerName: 'ID', width: 80 },
  {
    field: 'nombre',
    headerName: 'Nombre',
    width: 120,
  },
  {
    field: 'apellido',
    headerName: 'Apellido',
    width: 120,
  },
  {
    field: 'correo',
    headerName: 'Correo',
    width: 120,
  },
  {
    field: 'departamento',
    headerName: 'Departamento',
    width: 150,
  },
  {
    field: 'fechaRegistro',
    headerName: 'Fecha de Registro',
    width: 150,
  },
  {
    field: 'fechaBaja',
    headerName: 'Fecha de Baja',
    width: 150,
  },
  {
    field: 'estado',
    headerName: 'Estado',
    width: 100,
  },
  {
    field: 'actions',
    headerName: 'Acciones',
    width: 110,
    renderCell: (params) => (
        <NavigationButton
          variant = {'contained'}
          Text='Editar'
          color={'info'}
          Route={`editCollaborator/${params.id}`}/>
    ),
  }
];

const rows = [
  { id: 1, nombre: 'Jon', apellido: 'Snow', correo: 'jon.snow@techcorp.com', departamento: 'Desarrollo de Software', fechaRegistro: '2023-01-01', fechaBaja: '', estado: 'Activo' },
  { id: 2, nombre: 'Cersei', apellido: 'Lannister', correo: 'cersei.lannister@techcorp.com', departamento: 'Recursos Humanos', fechaRegistro: '2023-02-01', fechaBaja: '', estado: 'Activo' },
  { id: 3, nombre: 'Jaime', apellido: 'Lannister', correo: 'jaime.lannister@techcorp.com', departamento: 'Seguridad Informática', fechaRegistro: '2023-03-01', fechaBaja: '', estado: 'Activo' },
  { id: 4, nombre: 'Arya', apellido: 'Stark', correo: 'arya.stark@techcorp.com', departamento: 'Control de Calidad', fechaRegistro: '2023-04-01', fechaBaja: '', estado: 'Activo' },
  { id: 5, nombre: 'Daenerys', apellido: 'Targaryen', correo: 'daenerys.targaryen@techcorp.com', departamento: 'Innovación y Desarrollo', fechaRegistro: '2023-05-01', fechaBaja: '', estado: 'Activo' },
  { id: 6, nombre: 'Tyrion', apellido: 'Lannister', correo: 'tyrion.lannister@techcorp.com', departamento: 'Administración', fechaRegistro: '2023-06-01', fechaBaja: '', estado: 'Activo' },
  { id: 7, nombre: 'Brienne', apellido: 'Tarth', correo: 'brienne.tarth@techcorp.com', departamento: 'Soporte Técnico', fechaRegistro: '2023-07-01', fechaBaja: '', estado: 'Activo' },
  { id: 8, nombre: 'Sansa', apellido: 'Stark', correo: 'sansa.stark@techcorp.com', departamento: 'Marketing', fechaRegistro: '2023-08-01', fechaBaja: '', estado: 'Activo' },
  { id: 9, nombre: 'Theon', apellido: 'Greyjoy', correo: 'theon.greyjoy@techcorp.com', departamento: 'Infraestructura', fechaRegistro: '2023-09-01', fechaBaja: '', estado: 'Activo' },
  { id: 10, nombre: 'Samwell', apellido: 'Tarly', correo: 'samwell.tarly@techcorp.com', departamento: 'Investigación y Desarrollo', fechaRegistro: '2023-10-01', fechaBaja: '', estado: 'Activo' },
];

const breadcrumbs = [
  { label: 'Inicio', href: '/' },
  { label: 'Colaboradores'}
]

const Collaborators = () => {
  return (
    <>
    <Container>
    <Box sx={{ flexGrow: 1, mt: '2rem' }}>
      <CustomBreadcrumb breadcrumbs={breadcrumbs}/>
      <Stack direction={{ xs: 'row', sm: 'row' }} spacing={3} >
        <TextField
          id="outlined-basic"
          label="Colaborador"
          variant="outlined"
          fullWidth
        />
      </Stack>
      <Stack direction={{ xs: 'col', sm: 'row' }} spacing={3} sx={{ paddingTop: 3, borderRadius: '1rem'}}>
        <TextField
          id="departamento"
          label="Departamento"
          select
          fullWidth
        >
          <MenuItem value="operaciones">Operaciones</MenuItem>
          <MenuItem value="ingenieria">Ingeniería</MenuItem>
          <MenuItem value="desarrollo">Desarrollo</MenuItem>
        </TextField>
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
        Text='Agregar Colaborador'
        color={'info'}
        Route={'addCollaborator'}/>
    </Box>
    </Container>
    </>
  )
}

export default Collaborators