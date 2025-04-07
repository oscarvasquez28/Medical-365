import {React,useState, useEffect} from 'react'
import CollaboratorsAPI from '../../services/CollaboratorsAPI'
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
    field: 'Nombre',
    headerName: 'Nombre',
    width: 120,
  },
  {
    field: 'Apellido',
    headerName: 'Apellido',
    width: 120,
  },
  {
    field: 'Correo',
    headerName: 'Correo',
    width: 200,
  },
  {
    field: 'FechaDeRegistro',
    headerName: 'Fecha de Registro',
    width: 150,
  },
  {
    field: 'FechaDeBaja',
    headerName: 'Fecha de Baja',
    width: 150,
  },
  {
    field: 'Estado',
    headerName: 'Estado',
    width: 100,
  },
  {
    field: 'actions',
    headerName: 'Acciones',
    width: 110,
    renderCell: (params) => (
      <NavigationButton
        variant={'contained'}
        Text='Editar'
        color={'info'}
        Route={`editCollaborator/${params.id}`}
      />
    ),
  },
];

const breadcrumbs = [
  { label: 'Inicio', href: '/' },
  { label: 'Colaboradores'}
]

const Collaborators = () => {
  const [collaborator, setCollaborator] = useState([]);
  const [gender, setGender] = useState([]);
  const [department, setDepartment] = useState([]);
  const [rol, setRol] = useState([]);

  useEffect(() => {
    getCollaborators();
  }, []);

  async function getCollaborators() {
    try {
      const {data} = await CollaboratorsAPI.getCollaborators();
      setCollaborator(data);
      console.log(data);
    } catch (error) {
      console.error(error);
      setCollaborator([]);
    }
  }

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
      rows={collaborator}
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