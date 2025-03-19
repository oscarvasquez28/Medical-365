import React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import { Gauge } from '@mui/x-charts/Gauge';
import Typography from '@mui/material/Typography';

const Dashboard = () => {
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
          <Gauge width={150} height={125} value={60} startAngle={-90} endAngle={90} />
          <Typography variant="h6" sx={{ marginTop: 2 }}>
            Título 1
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
          <Gauge width={150} height={125} value={60} startAngle={-90} endAngle={90} />
          <Typography variant="h6" sx={{ marginTop: 2 }}>
            Título 2
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
          <Gauge width={150} height={125} value={60} startAngle={-90} endAngle={90} />
          <Typography variant="h6" sx={{ marginTop: 2 }}>
            Título 3
          </Typography>
        </Box>
      </Stack>
    </Container>
  );
};

export default Dashboard;
