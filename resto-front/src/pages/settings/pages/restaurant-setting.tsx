import React, { useState } from 'react';
import {
  ThemeProvider, createTheme,
  CssBaseline, Box, Typography, Paper, TextField, Button, Switch,
  FormControlLabel, Divider, Grid, Snackbar
} from '@mui/material';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import MuiAlert, { AlertProps } from '@mui/material/Alert';

// Thème cohérent avec le reste de l'application
// const theme = createTheme({
//   palette: {
//     primary: { main: '#FF6B6B' },
//     secondary: { main: '#4ECDC4' },
//     background: { default: '#F7F7F7' },
//   },
//   typography: {
//     fontFamily: 'Roboto, "Helvetica Neue", Arial, sans-serif',
//   },
// });

interface OpeningHours {
  [key: string]: {
    open: Dayjs | null;
    close: Dayjs | null;
    closed: boolean;
  };
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function RestaurantSettings() {
  const [restaurantName, setRestaurantName] = useState('Le Bon Goût');
  const [address, setAddress] = useState('123 Rue de la Gastronomie, 75001 Paris');
  const [phone, setPhone] = useState('01 23 45 67 89');
  const [email, setEmail] = useState('contact@lebongout.com');
  const [taxRate, setTaxRate] = useState('20');
  const [currency, setCurrency] = useState('EUR');
  const [openingHours, setOpeningHours] = useState<OpeningHours>({
    monday: { open: dayjs().set('hour', 11).set('minute', 0), close: dayjs().set('hour', 22).set('minute', 0), closed: false },
    tuesday: { open: dayjs().set('hour', 11).set('minute', 0), close: dayjs().set('hour', 22).set('minute', 0), closed: false },
    wednesday: { open: dayjs().set('hour', 11).set('minute', 0), close: dayjs().set('hour', 22).set('minute', 0), closed: false },
    thursday: { open: dayjs().set('hour', 11).set('minute', 0), close: dayjs().set('hour', 22).set('minute', 0), closed: false },
    friday: { open: dayjs().set('hour', 11).set('minute', 0), close: dayjs().set('hour', 23).set('minute', 0), closed: false },
    saturday: { open: dayjs().set('hour', 11).set('minute', 0), close: dayjs().set('hour', 23).set('minute', 0), closed: false },
    sunday: { open: dayjs().set('hour', 12).set('minute', 0), close: dayjs().set('hour', 22).set('minute', 0), closed: false },
  });
  const [onlineOrdering, setOnlineOrdering] = useState(true);
  const [reservations, setReservations] = useState(true);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' as 'success' | 'error' });

  const handleOpeningHoursChange = (day: string, type: 'open' | 'close', newValue: Dayjs | null) => {
    setOpeningHours(prev => ({
      ...prev,
      [day]: { ...prev[day], [type]: newValue }
    }));
  };

  const handleClosedToggle = (day: string) => {
    setOpeningHours(prev => ({
      ...prev,
      [day]: { ...prev[day], closed: !prev[day].closed }
    }));
  };

  const handleSave = () => {
    // Ici, vous ajouteriez la logique pour sauvegarder les paramètres
    console.log('Paramètres sauvegardés:', {
      restaurantName,
      address,
      phone,
      email,
      taxRate,
      currency,
      openingHours,
      onlineOrdering,
      reservations
    });
    setSnackbar({ open: true, message: 'Paramètres sauvegardés avec succès', severity: 'success' });
  };

  return (
    
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <CssBaseline />
        <Box sx={{ flexGrow: 1, p: 3 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Paramètres du Restaurant
          </Typography>

          <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" gutterBottom>Informations Générales</Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Nom du Restaurant"
                  value={restaurantName}
                  onChange={(e) => setRestaurantName(e.target.value)}
                  margin="normal"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Adresse"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  margin="normal"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Téléphone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  margin="normal"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  margin="normal"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Taux de TVA (%)"
                  value={taxRate}
                  onChange={(e) => setTaxRate(e.target.value)}
                  margin="normal"
                  type="number"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Devise"
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                  margin="normal"
                />
              </Grid>
            </Grid>
          </Paper>

          <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" gutterBottom>Heures d'Ouverture</Typography>
            {Object.entries(openingHours).map(([day, hours]) => (
              <Box key={day} sx={{ mb: 2 }}>
                <Typography variant="subtitle1" sx={{ textTransform: 'capitalize' }}>{day}</Typography>
                <Grid container spacing={2} alignItems="center">
                  <Grid item>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={!hours.closed}
                          onChange={() => handleClosedToggle(day)}
                        />
                      }
                      label={hours.closed ? "Fermé" : "Ouvert"}
                    />
                  </Grid>
                  {!hours.closed && (
                    <>
                      <Grid item>
                        <TimePicker
                          label="Ouverture"
                          value={hours.open}
                          onChange={(newValue) => handleOpeningHoursChange(day, 'open', newValue)}
                          ampm={false}
                        />
                      </Grid>
                      <Grid item>
                        <TimePicker
                          label="Fermeture"
                          value={hours.close}
                          onChange={(newValue) => handleOpeningHoursChange(day, 'close', newValue)}
                        />
                      </Grid>
                    </>
                  )}
                </Grid>
                <Divider sx={{ mt: 2 }} />
              </Box>
            ))}
          </Paper>

          <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" gutterBottom>Options Supplémentaires</Typography>
            <FormControlLabel
              control={
                <Switch
                  checked={onlineOrdering}
                  onChange={(e) => setOnlineOrdering(e.target.checked)}
                />
              }
              label="Commandes en ligne"
            />
            <FormControlLabel
              control={
                <Switch
                  checked={reservations}
                  onChange={(e) => setReservations(e.target.checked)}
                />
              }
              label="Réservations"
            />
          </Paper>

          <Button variant="outlined" color="primary" onClick={handleSave}>
            Sauvegarder les Paramètres
          </Button>

          <Snackbar 
            open={snackbar.open} 
            autoHideDuration={6000} 
            onClose={() => setSnackbar({ ...snackbar, open: false })}
          >
            <Alert severity={snackbar.severity} sx={{ width: '100%' }}>
              {snackbar.message}
            </Alert>
          </Snackbar>
        </Box>
      </LocalizationProvider>
    
  );
}