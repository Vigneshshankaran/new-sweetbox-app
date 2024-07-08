import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, Menu, MenuItem, Box } from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';
import { NavLink } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';

const Navbar = () => {
  const theme = useTheme();
  const isMobile = theme.breakpoints.down('sm');
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          SweetBox Admin Panel
        </Typography>
        {isMobile ? (
          <>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenuOpen}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
              transformOrigin={{ vertical: 'top', horizontal: 'right' }}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              <MenuItem onClick={handleMenuClose} component={NavLink} to="/" exact="true">
                Dashboard
              </MenuItem>
              <MenuItem onClick={handleMenuClose} component={NavLink} to="/add">
                AddForm
              </MenuItem>
              <MenuItem onClick={handleMenuClose} component={NavLink} to="/customerdetails">
                Customer Details
              </MenuItem>
              <MenuItem onClick={handleMenuClose} component={NavLink} to="/manufacturedetails">
                Manufacture Details
              </MenuItem>
              <MenuItem onClick={handleMenuClose} component={NavLink} to="/login">
                Login
              </MenuItem>
            </Menu>
          </>
        ) : (
          <Box sx={{ display: 'flex', flexGrow: 1, justifyContent: 'space-evenly' }}>
            <NavLink
              to="/"
              style={({ isActive }) => ({
                color: 'white',
                textDecoration: 'none',
                fontWeight: isActive ? 'bold' : 'normal',
              })}
              isActive={(match, location) => {
                if (!match) {
                  return false;
                }
                return match.isExact;
              }}
              exact="true"
            >
              Dashboard
            </NavLink>
            <NavLink
              to="/add"
              style={({ isActive }) => ({
                color: 'white',
                textDecoration: 'none',
                fontWeight: isActive ? 'bold' : 'normal',
              })}
            >
              AddForm
            </NavLink>
            <NavLink
              to="/customerdetails"
              style={({ isActive }) => ({
                color: 'white',
                textDecoration: 'none',
                fontWeight: isActive ? 'bold' : 'normal',
              })}
            >
              Customer Details
            </NavLink>
            <NavLink
              to="/manufacturedetails"
              style={({ isActive }) => ({
                color: 'white',
                textDecoration: 'none',
                fontWeight: isActive ? 'bold' : 'normal',
              })}
            >
              Manufacture Details
            </NavLink>
            <NavLink
              to="/login"
              style={({ isActive }) => ({
                color: 'white',
                textDecoration: 'none',
                fontWeight: isActive ? 'bold' : 'normal',
              })}
            >
              Login
            </NavLink>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
