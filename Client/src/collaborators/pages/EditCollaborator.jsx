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
  const [errors, setErrors] = useState({});
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

  const validate = () => {
  const newErrors = {};
  if (!collaborator.name.trim()) newErrors.name = "El nombre es obligatorio";
  if (!collaborator.lastName.trim()) newErrors.lastName = "El apellido es obligatorio";
  if (!collaborator.birthDate) newErrors.birthDate = "La fecha de nacimiento es obligatoria";
  if (!collaborator.gender) newErrors.gender = "El género es obligatorio";
  if (!collaborator.email.trim()) newErrors.email = "El correo es obligatorio";
  if (!collaborator.password.trim()) {
    newErrors.password = "La contraseña es obligatoria";
  } else {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}$/;
    if (!passwordRegex.test(collaborator.password)) {
      newErrors.password = "La contraseña debe tener mínimo 8 caracteres, una mayúscula, una minúscula y un símbolo";
    }
  }
  if (!collaborator.department) newErrors.department = "El departamento es obligatorio";
  if (!collaborator.role) newErrors.role = "El rol es obligatorio";
  if (!collaborator.status) newErrors.status = "El estado es obligatorio";
  return newErrors;
};

const handleSubmit = async (e) => {
  e.preventDefault();
  const validationErrors = validate();
  setErrors(validationErrors);
  if (Object.keys(validationErrors).length === 0) {
    putCollaborator();
  }
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
                label="Nombre"
                variant="outlined"
                fullWidth
                value={collaborator.name}
                onChange={handleInputChange}
                name="name"
                error={!!errors.name}
                helperText={errors.name}
              />
              <TextField
                label="Apellido"
                variant="outlined"
                fullWidth
                value={collaborator.lastName}
                onChange={handleInputChange}
                name="lastName"
                error={!!errors.lastName}
                helperText={errors.lastName}
              />
            </Stack>
            <Stack direction={{ xs: 'column'}} spacing={3} >
              <DatePicker
                label="Fecha de Nacimiento"
                value={collaborator.birthDate || null}
                onChange={(newValue) => setCollaborator({ ...collaborator, birthDate: newValue })}
                sx={{ width: '100%' }}
                slotProps={{
                  textField: {
                    error: !!errors.birthDate,
                    helperText: errors.birthDate,
                  }
                }}
              />
              <TextField
                id="gender"
                label="Género"
                select
                fullWidth
                value={collaborator.gender || ''}
                onChange={handleInputChange}
                name="gender"
                error={!!errors.gender}
                helperText={errors.gender}
              >
                {gender.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                label="Correo"
                variant="outlined"
                fullWidth
                value={collaborator.email}
                onChange={handleInputChange}
                name="email"
                error={!!errors.email}
                helperText={errors.email}
              />
              <TextField
                label="Contraseña"
                variant="outlined"
                fullWidth
                type="password"
                value={collaborator.password}
                onChange={handleInputChange}
                name="password"
                error={!!errors.password}
                helperText={errors.password}
              />
              <TextField
                id="department"
                label="Departamento"
                select
                fullWidth
                value={collaborator.department || ''}
                onChange={handleInputChange}
                name="department"
                error={!!errors.department}
                helperText={errors.department}
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
                error={!!errors.role}
                helperText={errors.role}
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
                error={!!errors.status}
                helperText={errors.status}
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