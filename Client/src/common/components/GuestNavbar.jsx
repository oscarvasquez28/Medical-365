import * as React from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';

export default function GuestNavbar() {

  return (
    <Box>
      <AppBar position="static">
        <Toolbar className="Toolbar-container" sx = {{backgroundColor: "#fff"}}>
          <Link to="/" style={{ textDecoration: 'none' }} draggable="false">
            <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: "#1868DB", fontWeight: "700", fontSize: "1.5rem" }}>
              Medical 365
            </Typography>
          </Link>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
