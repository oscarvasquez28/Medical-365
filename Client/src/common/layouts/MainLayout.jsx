import React from 'react'
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar'

const MainLayout = () => {
  return (
    <>
      <Navbar />
      <Outlet /> {/* Aquí es donde se renderizarán las rutas hijas, como Home */}
    </>
  )
}

export default MainLayout