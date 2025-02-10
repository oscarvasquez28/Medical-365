import React from 'react'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const StaticCard = ({texto}) => {
  return (
    <Box sx={{
      width:'250px',
      height: '130px',
      borderRadius: '15px',
      display: 'flex',
      justifyContent: 'center',
       alignItems: 'center',
       textAlign: 'center',
       margin: '1rem',
       backgroundColor: '#fff',
       boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',}}>
      <Typography sx={{ padding: '1rem' }}>
        {texto}
      </Typography>
    </Box>
  )
}

export default StaticCard