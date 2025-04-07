import React from 'react'
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar'
import Footer from '../components/Footer';

const MainLayout = () => {
  return (
    <>
      <Navbar />
      <Outlet /> {/* Aquí es donde se renderizarán las rutas hijas, como Home */}
      <Footer />
    </>
  )
}

export default MainLayout