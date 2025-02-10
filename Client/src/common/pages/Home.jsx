import React from 'react';
import { Container, Button } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { dataTableStyles } from '../styles/DataTableStyles';
import { motion } from 'framer-motion';

export default function Home() {
  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'nombre', headerName: 'Nombre', width: 150 },
    { field: 'edad', headerName: 'Edad', width: 110 },
    { field: 'ciudad', headerName: 'Ciudad', width: 180 },
  ];

  const rows = [
    { id: 1, nombre: 'Juan Pérez', edad: 28, ciudad: 'Ciudad de México' },
    { id: 2, nombre: 'María López', edad: 34, ciudad: 'Guadalajara' },
    { id: 3, nombre: 'Carlos Ramírez', edad: 25, ciudad: 'Monterrey' },
    { id: 4, nombre: 'Ana Gómez', edad: 30, ciudad: 'Tijuana' },
    { id: 5, nombre: 'Luis Hernández', edad: 40, ciudad: 'Cancún' },
  ];
  return (
    <>
        <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <Container maxWidth={false}> {/* maxWidth={false} overrides Bootstrap's Fluid Container */}
        <Button variant="contained" color="primary">
          ¡Hola, Material UI!
        </Button>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
          sx={dataTableStyles}
        />
      </Container>
      </motion.div>
    </>
  )
}
