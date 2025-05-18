import {React, useState, useEffect} from 'react'
import { useContext } from 'react';
import { UserContext } from '../../Context/UserContext.jsx';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import AnimatedGauge from '../../common/components/AnimatedGauge';
import IndicatorsAPI from '../../services/IndicatorsAPI';
import { toast } from 'react-hot-toast';

const Dashboard = () => {
  const [tickets, setTickets] = useState([]);
  const { user } = useContext(UserContext);
  const id = user.id;

  useEffect(() => {
    getTicketsID(id);
  }, []);

  async function getTicketsID(id) {
    try {
      const { data } = await IndicatorsAPI.getTicketsID(id);
      setTickets(data);
      console.log(data);
    } catch (error) {
      console.error(error);
      setTickets([]);
    }
  }

  return (
    <Container maxWidth={false} sx={{ marginTop: '2rem' }}>
      <Stack
        direction={{ xs: 'column', md: 'row' }}
        spacing={2}
        sx={{
          marginTop: '1rem',
          justifyContent: { xs: 'center', md: 'space-around' },  // Centra en xs y distribuye en md
          alignItems: { xs: 'center', md: 'flex-start' },  // Alinea al centro en xs y al inicio en md
        }}
      >
        <Box
          width={{ xs: '80%', md: '30%' }}  // Cambié el tamaño en xs para que no sea tan grande
          sx={{
            backgroundColor: 'white',
            padding: 2,
            borderRadius: 2,
            boxShadow: 3,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <AnimatedGauge value={tickets.pendiente?.value ?? 0} valueMax={tickets.totalTickets ?? 0}/>
          <Typography variant="h6" sx={{ marginTop: 2 }}>
            Mis Tickets Pendientes
          </Typography>
        </Box>
        <Box
          width={{ xs: '80%', md: '30%' }}
          sx={{
            backgroundColor: 'white',
            padding: 2,
            borderRadius: 2,
            boxShadow: 3,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <AnimatedGauge value={tickets.cerrado?.value ?? 0} valueMax={tickets.totalTickets ?? 0}/>
          <Typography variant="h6" sx={{ marginTop: 2 }}>
            Mis Tickets Cerrados
          </Typography>
        </Box>
        <Box
          width={{ xs: '80%', md: '30%' }}
          sx={{
            backgroundColor: 'white',
            padding: 2,
            borderRadius: 2,
            boxShadow: 3,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <AnimatedGauge value={tickets.cancelados?.value ?? 0} valueMax={tickets.totalTickets ?? 0}/>
          <Typography variant="h6" sx={{ marginTop: 2 }}>
            Mis Tickets Cancelados
          </Typography>
        </Box>
      </Stack>
    </Container>
  );
};

export default Dashboard;
