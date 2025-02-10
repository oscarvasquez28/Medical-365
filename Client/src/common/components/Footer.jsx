import React from 'react'
import { Link } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

export default function Footer() {
  return (
    <>
    <Container maxWidth={false} sx={{backgroundColor: "#fff", marginTop: "2rem"}}>
      <Stack direction={{ xs: "column", sm: "row" }} spacing={2} sx={{paddingTop: "2rem", paddingBottom: "2rem"}}>
        <Box width={{ xs: '100%', sm: '33%' }}>
          <Link to="/" style={{ textDecoration: 'none' }} draggable="false">
            <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: "#1868DB", fontWeight: "700", fontSize: "1.5rem" }}>
              Medical 365
            </Typography>
          </Link>
        </Box>
        <Box width={{ xs: '100%', sm: '33%' }}>
          <Stack direction="column" spacing={2} height={'100%'}>
            <Box height={'100%'}>
              <Typography variant="h7" component="div" sx={{ flexGrow: 1, color: "#353535", fontWeight: "700", fontSize: "1.5rem" }}>
                About Us
              </Typography>
            </Box>
            <Box height={'100%'}>
              <Typography variant="h7" component="div" sx={{ flexGrow: 1, color: "#353535"}}>
                81 2754 4872
              </Typography>
            </Box>
            <Box height={'100%'}>
              <Typography variant="h7" component="div" sx={{ flexGrow: 1, color: "#353535"}}>
              info@medical365.com.mx
              </Typography>
            </Box>
          </Stack>
        </Box>
        <Box width={{ xs: '100%', sm: '33%' }}>
        <Stack direction="column" spacing={2} height={'100%'}>
          <Box height={'100%'}>
            <Typography variant="h7" component="div" sx={{ flexGrow: 1, color: "#353535", fontWeight: "700", fontSize: "1.5rem" }}>
              Version & Copyright
            </Typography>
          </Box>
          <Box height={'100%'}>
            <Typography variant="h7" component="div" sx={{ flexGrow: 1, color: "#353535" }}>
            Version 1.0.0
            </Typography>
          </Box>
          <Box height={'100%'}>
            <Typography variant="h7" component="div" sx={{ flexGrow: 1, color: "#353535" }}>
            © 2025 Medical 365.
            Todos los derechos reservados.
            </Typography>
          </Box>
          </Stack>
        </Box>
      </Stack>
    </Container>
    </>
  )
}
