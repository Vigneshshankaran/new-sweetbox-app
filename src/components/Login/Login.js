import React, { useState } from 'react';
import { Avatar, Button, TextField, FormControlLabel, Checkbox, Box, Typography, Container, CircularProgress } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext'; // Adjust the import path as needed

const defaultTheme = createTheme();

export default function Login() {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({ username: false, password: false });
  const navigate = useNavigate();
  const { login } = useAuth(); // Use the login function from AuthContext

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
  
    const username = data.get('username');
    const password = data.get('password');
  
    let valid = true;
    if (!username) {
      valid = false;
      setErrors((prev) => ({ ...prev, username: true }));
    }
    if (!password) {
      valid = false;
      setErrors((prev) => ({ ...prev, password: true }));
    }
  
    if (valid) {
      setLoading(true);
      try {
        await login(username, password);
        navigate('/'); // Navigate to home page after successful login
      } catch (error) {
        console.error('Login failed:', error); // Debug login failure
      } finally {
        setLoading(false); // Ensure loading state is reset
      }
    }
  };
  

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Email Address"
              name="username"
              autoComplete="username"
              autoFocus
              error={errors.username}
              helperText={errors.username ? 'Email is required' : ''}
              onChange={() => setErrors((prev) => ({ ...prev, username: false }))}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              error={errors.password}
              helperText={errors.password ? 'Password is required' : ''}
              onChange={() => setErrors((prev) => ({ ...prev, password: false }))}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} /> : 'Sign In'}
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
