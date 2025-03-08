import React from 'react'
import Box from '@mui/material/Box';
import ModuleCard from '../components/ModuleCard';
import Dashboard from '../components/Dashboard';
import { motion } from 'framer-motion';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

const Home = () => {
  return (
    <>
    <Box minHeight="100vh">
      <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}>
        <Dashboard />
        <Container sx={{ marginTop: '4rem' }}>
          <Typography variant="h6">Mis módulos</Typography>
        </Container>
        <Box width={{ xs: '100%' }} marginTop={1} sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
          <ModuleCard
            title="Tickets"
            text="Crea, asigna y da seguimiento a tareas e incidencias."
            route="/tickets" />
          <ModuleCard
            title="Reportes"
            text="Visualiza y genera informes detallados sobre el progreso y desempeño del proyecto."
            route="/reports" />
          <ModuleCard
            title="Colaboradores"
            text="Gestiona y coordina a los miembros de la organización "
            route="/collaborators" />
        </Box>
      </motion.div>
      </Box>
    </>
  )
}

export default Home