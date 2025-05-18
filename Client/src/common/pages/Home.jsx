import { React, useContext } from 'react';
import { UserContext } from '../../Context/UserContext.jsx';
import Box from '@mui/material/Box';
import ModuleCard from '../components/ModuleCard';
import Dashboard from '../components/Dashboard';
import { motion } from 'framer-motion';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

const Home = () => {
  const { user } = useContext(UserContext);

  // Define los roles permitidos para cada módulo
  const modulePermissions = {
    tickets: ["Colaborador", "Administrador", "Gerente"],
    appointments: ["Administrador", "Gerente"],
    reports: ["Administrador", "Gerente"],
    calendar: ["Colaborador", "Administrador", "Gerente"],
    resources: ["Administrador", "Gerente"],
    collaborators: ["Administrador", "Gerente"],
  };

  // Función para verificar si el usuario tiene permiso para un módulo
  const hasPermission = (module) => modulePermissions[module]?.includes(user.role);

  return (
    <>
      <Box minHeight="100vh">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <Dashboard />
          <Container sx={{ marginTop: '4rem' }}>
            <Typography variant="h6">Mis módulos</Typography>
          </Container>
          <Box
            width={{ xs: '100%' }}
            marginTop={1}
            sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}
          >
            {hasPermission("tickets") && (
              <ModuleCard
                title="Tickets"
                text="Crea, asigna y da seguimiento a tareas e incidencias."
                route="/tickets"
              />
            )}
            {hasPermission("appointments") && (
              <ModuleCard
                title="Citas"
                text="Visualiza y genera informes detallados sobre el progreso y desempeño del proyecto."
                route="/appointments"
              />
            )}
            {hasPermission("reports") && (
              <ModuleCard
                title="Reportes"
                text="Gestiona y coordina a los miembros de la organización."
                route="/reports"
              />
            )}
            {hasPermission("calendar") && (
              <ModuleCard
                title="Calendario"
                text="Coordina y gestiona eventos y actividades importantes."
                route={`/calendar/${user.id}`}
              />
            )}
            {hasPermission("resources") && (
              <ModuleCard
                title="Recursos"
                text="Administra los recursos disponibles para tu equipo."
                route="/resources"
              />
            )}
            {hasPermission("collaborators") && (
              <ModuleCard
                title="Colaboradores"
                text="Gestiona y coordina a los miembros de la organización."
                route="/collaborators"
              />
            )}
          </Box>
        </motion.div>
      </Box>
    </>
  );
};

export default Home;