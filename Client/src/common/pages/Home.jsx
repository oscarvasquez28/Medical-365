import React from 'react';
import { Container, Button, Box, Typography, TextField, Stack } from '@mui/material';
import { motion } from 'framer-motion';

export default function Home() {
  const word1 = "Medical";
  const word2 = "365";

  // Dividir las palabras en arreglos de letras
  const letters1 = word1.split('');
  const letters2 = word2.split('');

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <Container maxWidth={false} sx={{ marginTop: '2rem' }}>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ marginTop: '1rem' }}>
            <Box width={{ xs: '100%', sm: '50%' }}>
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
                  {/* Animación para "Medical" */}
                  {letters1.map((letter, index) => (
                    <motion.span
                      key={index}
                      style={{ color: '#1868DB', display: 'inline-block' }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        delay: index * 0.1,
                        type: 'spring',
                        stiffness: 200,
                        damping: 20,
                      }}
                    >
                      {letter}
                    </motion.span>
                  ))}
                  {/* Espacio entre "Medical" y "365" */}
                  &nbsp;
                  {/* Animación para "365" */}
                  {letters2.map((letter, index) => (
                    <motion.span
                      key={index}
                      style={{ color: '#1868DB', display: 'inline-block' }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        delay: index * 0.1 + letters1.length * 0.1, // Ajustar para que empiece después de "Medical"
                        type: 'spring',
                        stiffness: 200,
                        damping: 20,
                      }}
                    >
                      {letter}
                    </motion.span>
                  ))}
                </Box>
              </Typography>
            </Box>
            <Box width={{ xs: '100%', sm: '50%' }}>
              <Box sx={{ display: 'flex', justifyContent: 'center', margin: '1rem' }}>
                <TextField
                  fullWidth
                  label="Email"
                  variant="outlined"
                  color="info"
                  id="fullWidth"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '15px',
                      backgroundColor: 'white',
                    },
                    width: {
                      xs: '100%',
                      sm: '70%',
                    },
                  }}
                />
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'center', margin: '1rem' }}>
                <TextField
                  fullWidth
                  label="Password"
                  variant="outlined"
                  color="info"
                  id="fullWidth"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '15px',
                      backgroundColor: 'white',
                    },
                    width: {
                      xs: '100%',
                      sm: '70%',
                    },
                  }}
                />
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'center', margin: '1rem' }}>
                <Button
                  variant="contained"
                  color="primary"
                  sx={{
                    borderRadius: '15px',
                    width: {
                      xs: '100%',
                      sm: '70%',
                    },
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
          <Box width={{ xs: '100%', sm: '50%' }} marginTop={2}>
            <Typography variant="h7" component="div" sx={{ flexGrow: 1, fontSize: '1.5rem' }}>
              La única herramienta de gestión que necesitas para planificar y monitorizar las incidencias de salud en todos los equipos.
            </Typography>
          </Box>
        </Container>
      </motion.div>
    </>
  );
}
