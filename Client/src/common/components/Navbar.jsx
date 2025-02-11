import * as React from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import AccountCircle from '@mui/icons-material/AccountCircle';

export default function Navbar() {

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar sx = {{backgroundColor: "#fff"}}>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: "#1868DB", fontWeight: "700", fontSize: "1.5rem" }}>
            Medical 365
          </Typography>
            <div>
            <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                color="black"
              >
                <Avatar alt="User Photo" src="https://media.licdn.com/dms/image/v2/D4E03AQHBqGyYyYjg2w/profile-displayphoto-shrink_800_800/B4EZQHLUnBGwAc-/0/1735287196571?e=1744243200&v=beta&t=M2OuNK8wr57EmxDymXpggU_5QvckX1DeI98obJinxa4" />
              </IconButton>
            </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
