import {React, useState, useContext} from 'react'
import {UserContext} from '../../Context/UserContext.jsx';
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import CustomBreadcrumb from '../../common/components/CustomBreadcrumb'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import NavigationButton from '../../common/components/NavigationButton'
import ResourcesAPI from '../../services/ResourcesAPI.js';
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast';


const AddResource = () => {
  const navigate = useNavigate()
  const { user } = useContext(UserContext);
  const [resource, setResource] = useState({
    name: '',
    version: '',
    description: '',
    lastColaboratorWhoModified: user.id,
  })

  const breadcrumbs = [
    { label: 'Inicio', href: '/' },
    { label: 'Recursos', href: '/resources' },
    { label: 'Agregar Recurso'}
  ]

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setResource({ ...resource, [name]: value })
    console.log(resource)
  }

  async function postResource() {
    try {
      console.log(resource);
      const response = await ResourcesAPI.postTooling(resource);
      console.log("Recurso agregado con éxito", response.data);
      toast.success("Recurso agregado con éxito")
      navigate('/resources');
    } catch (error) {
      console.error(error);
      toast.error("Error al agregar Recurso")
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    postResource()
  };

  return (
    <>
      <Container>
        <Box sx={{ flexGrow: 1, mt: '2rem' }}>
          <CustomBreadcrumb breadcrumbs={breadcrumbs} />
          <Typography variant="h4" component="h2" gutterBottom>
            Agregar Recurso
          </Typography>
          <Box sx={{ borderRadius: '1rem', backgroundColor: 'white', padding: '2rem'}}>
            <Stack direction={{ xs: 'column'}} spacing={3} >
              <TextField
                id="outlined-basic"
                label="Nombre del Recurso"
                variant="outlined"
                fullWidth
                onChange={handleInputChange}
                name="name"
              />
              <TextField
                id="version"
                label="Versión"
                fullWidth
                onChange={handleInputChange}
                name="version"
              />
              <TextField
                id="descripcion"
                label="Descripción"
                fullWidth
                onChange={handleInputChange}
                name="description"
              />
            </Stack>
            <Stack direction="row" justifyContent="space-between" sx={{ marginTop: '2rem' }}>
              <NavigationButton variant="outlined" color="info" Route={'/resources'} Text={'Regresar'}/>
              <Button variant="contained" color="primary" onClick={handleSubmit}>Agregar</Button>
            </Stack>
          </Box>
        </Box>
      </Container>
    </>
  )
}

export default AddResource