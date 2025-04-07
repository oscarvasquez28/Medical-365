import {React, useState, useContext, useEffect} from 'react'
import {UserContext} from '../../Context/UserContext.jsx';
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import CustomBreadcrumb from '../../common/components/CustomBreadcrumb'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem'
import NavigationButton from '../../common/components/NavigationButton'
import ResourcesAPI from '../../services/ResourcesAPI.js';
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast';
import {useParams} from 'react-router-dom'

const EditResource = () => {
  const navigate = useNavigate()
  const { user } = useContext(UserContext);
  const { id } = useParams()
  const [status, setEstatus] = useState([]);
  const [resource, setResource] = useState({
    name: '',
    version: '',
    description: '',
    status: '',
    lastColaboratorWhoModified: user.id,
  })

  const breadcrumbs = [
    { label: 'Inicio', href: '/' },
    { label: 'Recursos', href: '/resources' },
    { label: 'Editar Recurso'}
  ]

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setResource({ ...resource, [name]: value })
    console.log(resource)
  }

  useEffect(() => {
    getResource(id);
    getToolingEstatusList();
  }, []);

  async function putResource(id) {
    try {
      console.log(resource);
      const response = await ResourcesAPI.putTooling(id, resource);
      console.log("Recurso agregado con éxito", response.data);
      toast.success("Recurso Actualizado con éxito")
      navigate('/resources');
    } catch (error) {
      console.error(error);
      toast.error("Error al Actualizar Recurso")
    }
  }

  async function getResource(id) {
    try {
      const {data} = await ResourcesAPI.getToolingsId(id);
      setResource({
        name: data.nombre || '',
        version: data.version || '',
        description: data.descripcion || '',
        status: data.estatus || '',
        lastColaboratorWhoModified: user.id,
      });
      console.log(data);
    } catch (error) {
      console.error(error);
      setResource([]);
    }
  }

  async function getToolingEstatusList() {
    try {
      const {data} = await ResourcesAPI.getToolingEstatusList();
      setEstatus(data);
      console.log(data);
    } catch (error) {
      console.error(error);
      setEstatus([]);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    putResource(id)
  };

  return (
    <>
      <Container>
        <Box sx={{ flexGrow: 1, mt: '2rem' }}>
          <CustomBreadcrumb breadcrumbs={breadcrumbs} />
          <Typography variant="h4" component="h2" gutterBottom>
            Editar Recurso
          </Typography>
          <Box sx={{ borderRadius: '1rem', backgroundColor: 'white', padding: '2rem'}}>
            <Stack direction={{ xs: 'column'}} spacing={3} >
              <TextField
                id="outlined-basic"
                label="Nombre del Recurso"
                variant="outlined"
                fullWidth
                value={resource.name || ''}
                onChange={handleInputChange}
                name="name"
              />
              <TextField
                id="version"
                label="Versión"
                fullWidth
                value={resource.version || ''}
                onChange={handleInputChange}
                name="version"
              />
              <TextField
                id="descripcion"
                label="Descripción"
                fullWidth
                value={resource.description || ''}
                onChange={handleInputChange}
                name="description"
              />
              <TextField
                id="status"
                label="Estado"
                select
                fullWidth
                value={resource.status || ''}
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
              <NavigationButton variant="outlined" color="info" Route={'/resources'} Text={'Regresar'}/>
              <Button variant="contained" color="primary" onClick={handleSubmit}>Editar</Button>
            </Stack>
          </Box>
        </Box>
      </Container>
    </>
  )
}

export default EditResource