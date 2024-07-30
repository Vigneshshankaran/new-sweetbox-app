import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, Drawer, List, ListItem, ListItemButton, ListItemText, Divider } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { NavLink } from 'react-router-dom';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  const navLinks = [
    { label: 'Production', to: '/production' },
    { label: 'Dashboard', to: '/dashboard' }, 
    { label: 'Add Form', to: '/' }, 
    { label: 'SweetBoxs', to: '/sweetbox' }, 
    { label: 'Customer Details', to: '/customerdetails' },
    { label: 'Manufacture Details', to: '/manufacturedetails' },
    { label: 'Login', to: '/login' },
  ];

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          SweetBox Admin Panel
        </Typography>

        <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleDrawer(true)}>
          <MenuIcon />
        </IconButton>

        <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
          <div
            role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
          >
            <List>
              <ListItemButton onClick={toggleDrawer(false)}>
                <IconButton>
                  <ChevronLeftIcon />
                </IconButton>
              </ListItemButton>
              <Divider />

              {navLinks.map((link) => (
                <ListItem key={link.to} disablePadding component={NavLink} to={link.to} exact={link.to === '/production' ? "true" : false}>
                  <ListItemButton>
                    <ListItemText primary={link.label} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </div>
        </Drawer>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
