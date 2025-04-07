import {React, useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import CollaboratorsAPI from '../../services/CollaboratorsAPI'
import DepartmentsAPI from '../../services/DepartmentsAPI'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import CustomBreadcrumb from '../../common/components/CustomBreadcrumb'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import MenuItem from '@mui/material/MenuItem'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import NavigationButton from '../../common/components/NavigationButton'
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { toast } from 'react-hot-toast';

const EditCollaborator = () => {
  const [gender, setGender] = useState([]);
  const [department, setDepartment] = useState([]);
  const [role, setRole] = useState([]);
  const [status, setStatus] = useState([]);
  const [collaborator, setCollaborator] = useState({
    name: '',
    lastName: '',
    birthDate: null,
    gender: '',
    email: '',
    password: '',
    department: '',
    role: '',
    status: '',
    active: '1'
  });
  const { id } = useParams()
  const navigate = useNavigate()
  const breadcrumbs = [
    { label: 'Inicio', href: '/' },
    { label: 'Colaboradores', href: '/collaborators' },
    { label: 'Editar Colaborador'}
  ]

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setCollaborator({ ...collaborator, [name]: value })
    console.log(collaborator)
  }

    useEffect(() => {
      getCollaborator(id);
      getGender();
      getDepartments();
      getRoles();
      getStatus();
    }, []);

    async function getCollaborator(id) {
      try {
        const {data} = await CollaboratorsAPI.getCollaboratorsId(id);
        setCollaborator({
          name: data.Nombre || '',
          lastName: data.Apellido || '',
          birthDate: data.FechaDeNacimiento ? dayjs(data.FechaDeNacimiento) : null, // Convierte a dayjs
          gender: data.Genero || '',
          email: data.Correo || '',
          password: data.Contraseña || '',
          department: data.Departamento || '',
          role: data.Rol || '',
          status: data.Estado,
          active: '1'
        });
        console.log(data);
      } catch (error) {
        console.error(error);
        setCollaborator([]);
      }
    }

  async function getGender() {
    try {
      const {data} = await CollaboratorsAPI.getGender();
      setGender(data);
      console.log(data);
    } catch (error) {
      console.error(error);
      setGender([]);
    }
  }

  async function getDepartments() {
    try {
      const {data} = await DepartmentsAPI.getDepartments();
      setDepartment(data);
      console.log(data);
    } catch (error) {
      console.error(error);
      setDepartment([]);
    }
  }

  async function getRoles() {
    try {
      const {data} = await CollaboratorsAPI.getRoles();
      setRole(data);
      console.log(data);
    } catch (error) {
      console.error(error);
      setRole([]);
    }
  }

  async function getStatus() {
    try {
      const {data} = await CollaboratorsAPI.getStatus();
      setStatus(data);
      console.log(data);
    } catch (error) {
      console.error(error);
      setStatus([]);
    }
  }

  async function putCollaborator() {
    try {
      console.log(collaborator);
      const response = await CollaboratorsAPI.putCollaborator(id, collaborator);
      console.log("Colaborador editado con éxito", response.data);
      toast.success("Colaborador editado con éxito")
      navigate('/collaborators')
    } catch (error) {
      console.error(error);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    putCollaborator()
  };

  return (
    <>
      <Container>
        <Box sx={{ flexGrow: 1, mt: '2rem' }}>
          <CustomBreadcrumb breadcrumbs={breadcrumbs} />
          <Typography variant="h4" component="h2" gutterBottom>
            Editar Colaborador
          </Typography>
          <Box sx={{ borderRadius: '1rem', backgroundColor: 'white', padding: '2rem'}}>
            <Stack direction={{ xs: 'column', md: 'row'}} spacing={3} sx={{ marginBottom: 3 }}>
              <TextField
                id="outlined-basic"
                label="Nombre"
                variant="outlined"
                fullWidth
                value={collaborator.name}
                onChange={handleInputChange}
                name="name"
              />
              <TextField
                id="outlined-basic"
                label="Apellido"
                variant="outlined"
                fullWidth
                value={collaborator.lastName}
                onChange={handleInputChange}
                name="lastName"
              />
            </Stack>
            <Stack direction={{ xs: 'column'}} spacing={3} >
              <DatePicker
                label="Fecha de Nacimiento"
                value={collaborator.birthDate || null}
                onChange={(newValue) => setCollaborator({ ...collaborator, FechaDeNacimiento: newValue })}
                sx={{ width: '100%' }}
              />
              <TextField
                id="gender"
                label="Género"
                select
                fullWidth
                value={collaborator.gender || ''}
                onChange={handleInputChange}
                name="gender"
              >
                {gender.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                id="outlined-basic"
                label="Correo"
                variant="outlined"
                fullWidth
                value={collaborator.email}
                onChange={handleInputChange}
                name="email"
              />
              <TextField
                id="outlined-basic"
                label="Contraseña"
                variant="outlined"
                fullWidth
                // type="password"
                value={collaborator.password}
                onChange={handleInputChange}
                name="password"
              />
              <TextField
                id="department"
                label="Departamento"
                select
                fullWidth
                value={collaborator.department || ''}
                onChange={handleInputChange}
                name="department"
              >
                {department.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                id="role"
                label="Rol"
                select
                fullWidth
                value={collaborator.role || ''}
                onChange={handleInputChange}
                name="role"
              >
                {role.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                id="status"
                label="Estado"
                select
                fullWidth
                value={collaborator.status || ''}
                onChange={handleInputChange}
                name="status"
              >
                {status.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Stack>
            <Stack direction="row" justifyContent="space-between" sx={{ marginTop: '2rem' }}>
              <NavigationButton variant="outlined" color="info" Route={'/collaborators'} Text={'Regresar'}/>
              <Button variant="contained" color="primary" onClick={handleSubmit}>Actualizar</Button>
            </Stack>
          </Box>
        </Box>
      </Container>
    </>
  )
}

export default EditCollaborator