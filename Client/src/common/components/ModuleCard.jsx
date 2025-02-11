import React from 'react'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';

const ModuleCard = ({ title, text, route }) => {
  return (
    <Link to={route} style={{ textDecoration: 'none' }} draggable="false">
      <Box sx={{
        width: '250px',
        height: '130px',
        borderRadius: '15px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        textAlign: 'left',
        margin: '1rem',
        backgroundColor: '#fff',
        boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
        padding: '1rem',
        transition: '0.3s ease-in-out',
        '&:hover': {
          transform: 'scale(102%)',  // Efecto de escala en hover
          background: 'linear-gradient(295deg,rgb(201, 239, 255),rgb(205, 193, 247))',  // Fondo gradiente en hover
          boxShadow: '0px 10px 15px rgba(29, 140, 187, 0.3)',
        }
      }}>
        <Typography variant="h5" sx={{ fontWeight: 'bold', marginBottom: '0.5rem', color: '#1868DB' }}>
          {title}
        </Typography>
        <Typography sx={{ color: 'rgb(93, 93, 93)' }}>
          {text}
        </Typography>
      </Box>
    </Link>
  )
}

export default ModuleCard
