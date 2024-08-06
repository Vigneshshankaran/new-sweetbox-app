// Import necessary dependencies
import React, { useContext, useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Divider,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../AuthContext';

// Define the Navbar component
const Navbar = () => {
  // State to manage the drawer's open state
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Get the user and logout function from the AuthContext
  const { user, logout } = useContext(AuthContext);

  // Define the navigation links
  const navLinks = [
    { label: 'Production', to: '/production' },
    { label: 'Dashboard', to: '/dashboard' },
    { label: 'Add Sweets', to: '/' },
    { label: 'SweetBoxes', to: '/sweetbox' },
    { label: 'Customer Details', to: '/customerdetails' },
    { label: 'Manufacture Details', to: '/manufacturedetails' },
    // Conditionally render the logout or login link based on the user's authentication status
    user
      ? { label: 'Logout', to: '/login', action: logout }
      : { label: 'Login', to: '/login' },
  ];

  // Function to toggle the drawer's open state
  const toggleDrawer = (open) => (event) => {
    // Prevent the drawer from closing when the user presses the Tab or Shift keys
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

  // Function to handle navigation link clicks
  const handleNavClick = (action) => {
    // If an action is provided, execute it
    if (action) {
      action();
    }
    // Close the drawer
    setDrawerOpen(false);
  };

  return (
    // Render the AppBar component
    <AppBar position="static" color="primary">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          SweetBox Admin Panel
        </Typography>

        {/* Render the menu icon button */}
        <IconButton edge="end" color="inherit" aria-label="menu" onClick={toggleDrawer(true)}>
          <MenuIcon />
        </IconButton>

        {/* Render the drawer component */}
        <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
          <div role="presentation" onClick={toggleDrawer(false)} onKeyDown={toggleDrawer(false)} style={{ width: 250 }}>
            <List>
              {/* Render the close button */}
              <ListItem disablePadding>
                <ListItemButton onClick={toggleDrawer(false)}>
                  <IconButton>
                    <ChevronLeftIcon />
                  </IconButton>
                </ListItemButton>
              </ListItem>
              <Divider />

              {/* Render the navigation links */}
              {navLinks.map((link) => (
                <ListItem key={link.to} disablePadding>
                  <ListItemButton component={NavLink} to={link.to} exact="ture" onClick={() => handleNavClick(link.action)}>
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