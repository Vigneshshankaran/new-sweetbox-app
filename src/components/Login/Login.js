import React, { useState } from 'react';
import {Avatar,Button,TextField,FormControlLabel,Checkbox,Box,Typography,Container,CircularProgress} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';


const defaultTheme = createTheme();

export default function SignIn() {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({ email: false, password: false });

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const email = data.get('email');
    const password = data.get('password');

    // Simple validation logic
    let valid = true;
    if (!email) {
      valid = false;
      setErrors((prev) => ({ ...prev, email: true }));
    }
    if (!password) {
      valid = false;
      setErrors((prev) => ({ ...prev, password: true }));
    }

    if (valid) {
      setLoading(true);
      // Simulate API call
      setTimeout(() => {
        setLoading(false);
        console.log({ email, password });
      }, 2000);
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
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              error={errors.email}
              helperText={errors.email ? 'Email is required' : ''}
              onChange={() => setErrors((prev) => ({ ...prev, email: false }))}
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
