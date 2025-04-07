import React from 'react';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import { Link } from 'react-router-dom';  // Importa el Link de react-router-dom
import PropTypes from 'prop-types';
import HomeIcon from '@mui/icons-material/Home';

const CustomBreadcrumb = ({ breadcrumbs }) => {
  return (
    <Breadcrumbs aria-label="breadcrumb" sx={{ marginBottom: '1rem' }}>
      {breadcrumbs.map((breadcrumb, index) =>
        breadcrumb.href ? (
          <Link
            key={index}
            to={breadcrumb.href}  // Cambia href por to para react-router-dom
            style={{ textDecoration: 'none', color: 'inherit' }} // Opcional: agregar estilos para mantener apariencia de enlace
          >
            <Typography
              component="span"
              sx={{ display: 'flex', alignItems: 'center' }}
            >
              {breadcrumb.label}
            </Typography>
          </Link>
        ) : (
          <Typography key={index} sx={{ color: 'text.primary' }}>
            {breadcrumb.label}
          </Typography>
        )
      )}
    </Breadcrumbs>
  );
};

CustomBreadcrumb.propTypes = {
  breadcrumbs: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      href: PropTypes.string,
    })
  ).isRequired,
};

export default CustomBreadcrumb;
