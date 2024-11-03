import React, { useContext, useState } from 'react';
import { Box, Typography, TextField, Button, Checkbox, FormControlLabel, Link, Paper, Avatar } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { AuthContext } from '../../context/authContext';
export default function Login() {
  const authContext = useContext(AuthContext)
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  // State to manage error messages
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  // Validation function to check email format
  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    // Reset errors before validation
    setEmailError('');
    setPasswordError('');

    let isValid = true;

    // Validate email
    if (!email) {
      setEmailError('Adresse e-mail est requise');
      isValid = false;
    } else if (!validateEmail(email)) {
      setEmailError("L'adresse e-mail n'est pas valide");
      isValid = false;
    }

    // Validate password
    if (!password) {
      setPasswordError('Mot de passe est requis');
      isValid = false;
    } else if (password.length < 6) {
      setPasswordError('Le mot de passe doit contenir au moins 6 caractères');
      isValid = false;
    }
  
     if (isValid) {
      console.log('Email:', email);
      console.log('Password:', password);
      console.log('Remember me:', rememberMe);
      // Perform login action here (e.g., API call)
      authContext.handleLogin(email,password)
    }
  };

  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'background.default',
      }}
    >
      <Paper elevation={3} sx={{ padding: 4, width: '100%', maxWidth: 400 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Connexion
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Adresse e-mail"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={!!emailError}
              helperText={emailError}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Mot de passe"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={!!passwordError}
              helperText={passwordError}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" onChange={(e) => setRememberMe(e.target.checked)} />}
              label="Se souvenir de moi"
              checked={rememberMe}
            />
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
              Se connecter
            </Button>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Link href="#" variant="body2">
                Mot de passe oublié ?
              </Link>
              <Link href="#" variant="body2">
                {"Pas de compte ? S'inscrire"}
              </Link>
            </Box>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}
