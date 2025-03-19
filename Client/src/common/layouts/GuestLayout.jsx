import React from 'react'
import { Outlet } from 'react-router-dom';
import GuestNavbar from '../components/GuestNavbar'
import Footer from '../components/Footer';

const GuestLayout = () => {
  return (
    <>
      <GuestNavbar />
      <Outlet /> {/* Aquí es donde se renderizarán las rutas hijas, como Home */}
      <Footer />
    </>
  )
}

export default GuestLayout