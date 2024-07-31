import React, { useContext, useState } from 'react';
import { Avatar, Button, TextField, FormControlLabel, Checkbox, Box, Typography, Container, CircularProgress } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../AuthContext';


export default function Login() {
  const navigate = useNavigate();
  const { login, error, loading } = useContext(AuthContext);

  const [errors, setErrors] = useState({
    username: false,
    password: false,
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { username, password } = event.target.elements;
  
    let hasError = false;
    if (!username.value) {
      setErrors((prev) => ({ ...prev, username: true }));
      hasError = true;
    }
  
    if (!password.value) {
      setErrors((prev) => ({ ...prev, password: true }));
      hasError = true;
    }
  
    if (!hasError) {
      const success = await login(username.value, password.value);
      if (success) {
        navigate('/'); // Redirect on successful login
      }
    }
  };

  return (
    <>
      {loading && <CircularProgress />}
      {/* <ThemeProvider theme={defaultTheme}> */}
        <Container component="main" maxWidth="xs">
          <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
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
                label="UserName"
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
              <FormControlLabel control={<Checkbox value="remember" color="primary" />} label="Remember me" />
              <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} disabled={loading}>
                {loading ? <CircularProgress size={24} /> : 'Sign In'}
              </Button>
              {error && (
                <Typography color="error" variant="body2" align="center">
                  {error}
                </Typography>
              )}
            </Box>
          </Box>
        </Container>
      {/* </ThemeProvider> */}
    </>
  );
}
