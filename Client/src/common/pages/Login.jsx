import React from 'react';
import { Container, Button, Box, Typography, TextField, Stack } from '@mui/material';
import { motion } from 'framer-motion';
import StaticCard from '../components/StaticCard';

export default function Home() {
  const word1 = "Medical";
  const word2 = "365";

  // Split the words into arrays of letters
  const letters1 = word1.split('');
  const letters2 = word2.split('');

  // Variants for the animation
  const letterAnimation = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <Container maxWidth={false} sx={{ marginTop: '2rem' }}>
          <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} sx={{ marginTop: '1rem' }}>
            <Box width={{ xs: '100%', md: '50%' }}>
              <Typography
                variant="h2"
                component="div"
                sx={{
                  flexGrow: 1,
                  fontWeight: '700',
                  fontSize: '4rem',
                }}
              >
                La excelencia en salud comienza con{' '}
                <Box component="span" sx={{ display: 'inline-block' }}>
                  {/* Animation for "Medicall" */}
                  {letters1.map((letter, index) => (
                    <motion.span
                      key={index}
                      style={{ color: '#1868DB', display: 'inline-block' }}
                      variants={letterAnimation}
                      initial="initial"
                      animate="animate"
                      transition={{
                        delay: index * 0.1,
                        type: 'spring',
                        stiffness: 200,
                        damping: 20,
                        repeat: Infinity,
                        repeatType: "reverse",
                        repeatDelay: 2, //  Pause time between repetitions
                      }}
                    >
                      {letter}
                    </motion.span>
                  ))}
                  {/* Space between "Medical" and "365" */}
                  &nbsp;
                  {/* Animation for "365" */}
                  {letters2.map((letter, index) => (
                    <motion.span
                      key={index}
                      style={{ color: '#1868DB', display: 'inline-block' }}
                      variants={letterAnimation}
                      initial="initial"
                      animate="animate"
                      transition={{
                        delay: index * 0.1 + letters1.length * 0.1,
                        type: 'spring',
                        stiffness: 200,
                        damping: 20,
                        repeat: Infinity,
                        repeatType: "reverse",
                        repeatDelay: 2,
                      }}
                    >
                      {letter}
                    </motion.span>
                  ))}
                </Box>
              </Typography>
            </Box>
            <Box width={{ xs: '100%', md: '50%' }}>
              <Box sx={{ display: 'flex', justifyContent: 'center', margin: '1rem' }}>
                <TextField
                  fullWidth
                  label="Email"
                  variant="outlined"
                  color="info"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '15px',
                      backgroundColor: 'white',
                    },
                    width: { xs: '100%', sm: '70%' },
                  }}
                />
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'center', margin: '1rem' }}>
                <TextField
                  fullWidth
                  label="Password"
                  variant="outlined"
                  color="info"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '15px',
                      backgroundColor: 'white',
                    },
                    width: { xs: '100%', sm: '70%' },
                  }}
                />
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'center', margin: '1rem' }}>
                <Button
                  variant="contained"
                  color="primary"
                  sx={{
                    borderRadius: '15px',
                    width: { xs: '100%', sm: '70%' },
                    backgroundColor: '#1868DB',
                    padding: '12px 24px',
                    fontSize: '1rem',
                  }}
                >
                  Iniciar Sesión
                </Button>
              </Box>
            </Box>
          </Stack>
          <Box width={{ xs: '100%', md: '50%' }} marginTop={2}>
            <Typography variant="h7" component="div" sx={{ flexGrow: 1, fontSize: '1.5rem' }}>
              La única herramienta de gestión que necesitas para planificar y monitorizar las incidencias de salud en todos los equipos.
            </Typography>
          </Box>
          <Box width={{ xs: '100%' }} marginTop={2} sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
            <StaticCard text="Monitoreo de incidencias de salud" />
            <StaticCard text="Gestión del estado de los colaboradores" />
            <StaticCard text="Optimización de procesos de atención médica" />
            <StaticCard text="Informes y análisis de datos de salud" />
          </Box>
        </Container>
      </motion.div>
    </>
  );
}
