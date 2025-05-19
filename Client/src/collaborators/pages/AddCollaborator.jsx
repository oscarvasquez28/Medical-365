import {React, useState, useEffect} from 'react'
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
import { toast } from 'react-hot-toast';

const AddCollaborator = () => {
  const [gender, setGender] = useState([]);
  const [department, setDepartment] = useState([]);
  const [role, setRole] = useState([]);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate()

  const validate = () => {
  const newErrors = {};
  if (!collaborator.name.trim()) newErrors.name = "El nombre es obligatorio";
  if (!collaborator.lastName.trim()) newErrors.lastName = "El apellido es obligatorio";
  if (!collaborator.birthDate) newErrors.birthDate = "La fecha de nacimiento es obligatoria";
  if (!collaborator.gender) newErrors.gender = "El género es obligatorio";
  if (!collaborator.email.trim()) newErrors.email = "El correo es obligatorio";
  // Puedes agregar una validación de email más estricta si lo deseas
  if (!collaborator.password.trim()) {
    newErrors.password = "La contraseña es obligatoria";
  } else {
    // Al menos 8 caracteres, 1 mayúscula, 1 minúscula y 1 símbolo
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}$/;
    if (!passwordRegex.test(collaborator.password)) {
      newErrors.password = "La contraseña debe tener mínimo 8 caracteres, una mayúscula, una minúscula y un símbolo";
    }
  }
  if (!collaborator.department) newErrors.department = "El departamento es obligatorio";
  if (!collaborator.role) newErrors.role = "El rol es obligatorio";
  return newErrors;
};

  const breadcrumbs = [
    { label: 'Inicio', href: '/' },
    { label: 'Colaboradores', href: '/collaborators' },
    { label: 'Agregar Colaborador'}
  ]

  const [collaborator, setCollaborator] = useState({
    name: '',
    lastName: '',
    birthDate: null,
    gender: '',
    email: '',
    password: '',
    department: '',
    role: '',
    status: 'Activo',
    active: '1'
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setCollaborator({ ...collaborator, [name]: value })
    console.log(collaborator)
  }

    useEffect(() => {
      getGender();
      getDepartments();
      getRoles();
    }, []);

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

  async function postCollaborator() {
    try {
      console.log(collaborator);
      const response = await CollaboratorsAPI.postCollaborator(collaborator);
      console.log("Colaborador agregado con éxito", response.data);
      toast.success("Colaborador agregado con éxito")
      navigate('/collaborators');
    } catch (error) {
      console.error(error);
      toast.error("Error al agregar colaborador")
    }
  }

const handleSubmit = async (e) => {
  e.preventDefault();
  const validationErrors = validate();
  setErrors(validationErrors);
  if (Object.keys(validationErrors).length === 0) {
    postCollaborator();
  }
};

  return (
    <>
      <Container>
        <Box sx={{ flexGrow: 1, mt: '2rem' }}>
          <CustomBreadcrumb breadcrumbs={breadcrumbs} />
          <Typography variant="h4" component="h2" gutterBottom>
            Agregar Colaborador
          </Typography>
          <Box sx={{ borderRadius: '1rem', backgroundColor: 'white', padding: '2rem'}}>
            <Stack direction={{ xs: 'column', md: 'row'}} spacing={3} sx={{ marginBottom: 3 }}>
              <TextField
                label="Nombre"
                variant="outlined"
                fullWidth
                onChange={handleInputChange}
                name="name"
                error={!!errors.name}
                helperText={errors.name}
              />
              <TextField
                label="Apellido"
                variant="outlined"
                fullWidth
                onChange={handleInputChange}
                name="lastName"
                error={!!errors.lastName}
                helperText={errors.lastName}
              />
            </Stack>
            <Stack direction={{ xs: 'column'}} spacing={3} >
              <DatePicker
                label="Fecha de Nacimiento"
                value={collaborator.birthDate}
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
                onChange={handleInputChange}
                name="email"
                error={!!errors.email}
                helperText={errors.email}
              />
              <TextField
                label="Contraseña"
                variant="outlined"
                fullWidth
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
                label="Role"
                select
                fullWidth
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
            </Stack>
            <Stack direction="row" justifyContent="space-between" sx={{ marginTop: '2rem' }}>
              <NavigationButton variant="outlined" color="info" Route={'/collaborators'} Text={'Regresar'}/>
              <Button variant="contained" color="primary" onClick={handleSubmit}>Agregar</Button>
            </Stack>
          </Box>
        </Box>
      </Container>
    </>
  )
}

export default AddCollaborator