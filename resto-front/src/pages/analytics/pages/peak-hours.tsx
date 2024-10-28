import React, { useState } from 'react';
import {
  ThemeProvider, createTheme,
  CssBaseline, Box, Typography, Paper, Select, MenuItem, FormControl, InputLabel,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow
} from '@mui/material';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  BarChart, Bar
} from 'recharts';

// Thème cohérent avec le reste de l'application
const theme = createTheme({
  palette: {
    primary: { main: '#FF6B6B' },
    secondary: { main: '#4ECDC4' },
    background: { default: '#F7F7F7' },
  },
  typography: {
    fontFamily: 'Roboto, "Helvetica Neue", Arial, sans-serif',
  },
});

// Données simulées pour les graphiques
const weekdayData = [
  { hour: '10:00', customers: 10, sales: 150 },
  { hour: '11:00', customers: 15, sales: 225 },
  { hour: '12:00', customers: 40, sales: 600 },
  { hour: '13:00', customers: 50, sales: 750 },
  { hour: '14:00', customers: 30, sales: 450 },
  { hour: '15:00', customers: 20, sales: 300 },
  { hour: '16:00', customers: 15, sales: 225 },
  { hour: '17:00', customers: 25, sales: 375 },
  { hour: '18:00', customers: 45, sales: 675 },
  { hour: '19:00', customers: 55, sales: 825 },
  { hour: '20:00', customers: 40, sales: 600 },
  { hour: '21:00', customers: 20, sales: 300 },
  { hour: '22:00', customers: 10, sales: 150 },
];

const weekendData = [
  { hour: '10:00', customers: 15, sales: 225 },
  { hour: '11:00', customers: 25, sales: 375 },
  { hour: '12:00', customers: 50, sales: 750 },
  { hour: '13:00', customers: 60, sales: 900 },
  { hour: '14:00', customers: 45, sales: 675 },
  { hour: '15:00', customers: 30, sales: 450 },
  { hour: '16:00', customers: 25, sales: 375 },
  { hour: '17:00', customers: 35, sales: 525 },
  { hour: '18:00', customers: 55, sales: 825 },
  { hour: '19:00', customers: 70, sales: 1050 },
  { hour: '20:00', customers: 60, sales: 900 },
  { hour: '21:00', customers: 40, sales: 600 },
  { hour: '22:00', customers: 20, sales: 300 },
];

const dailyPeakHours = [
  { day: 'Lundi', peakHour: '13:00', customers: 50, sales: 750 },
  { day: 'Mardi', peakHour: '13:00', customers: 48, sales: 720 },
  { day: 'Mercredi', peakHour: '19:00', customers: 52, sales: 780 },
  { day: 'Jeudi', peakHour: '19:00', customers: 54, sales: 810 },
  { day: 'Vendredi', peakHour: '20:00', customers: 58, sales: 870 },
  { day: 'Samedi', peakHour: '19:00', customers: 70, sales: 1050 },
  { day: 'Dimanche', peakHour: '13:00', customers: 65, sales: 975 },
];

export default function PeakHoursAnalysis() {
  const [dayType, setDayType] = useState('weekday');

  const handleDayTypeChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setDayType(event.target.value as string);
  };

  const currentData = dayType === 'weekday' ? weekdayData : weekendData;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ flexGrow: 1, p: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Analyse des Heures de Pointe
        </Typography>

        <FormControl sx={{ mb: 3, minWidth: 120 }}>
          <InputLabel id="day-type-select-label">Type de Jour</InputLabel>
          <Select
            labelId="day-type-select-label"
            id="day-type-select"
            value={dayType}
            label="Type de Jour"
            //@ts-ignore
            onChange={handleDayTypeChange}
          >
            <MenuItem value="weekday">Jour de semaine</MenuItem>
            <MenuItem value="weekend">Week-end</MenuItem>
          </Select>
        </FormControl>

        <Paper elevation={3} sx={{ p: 2, mb: 3 }}>
          <Typography variant="h6" gutterBottom>Affluence et Ventes par Heure</Typography>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart
              data={currentData}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="hour" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip />
              <Legend />
              <Line yAxisId="left" type="monotone" dataKey="customers" stroke="#8884d8" activeDot={{ r: 8 }} name="Clients" />
              <Line yAxisId="right" type="monotone" dataKey="sales" stroke="#82ca9d" name="Ventes (€)" />
            </LineChart>
          </ResponsiveContainer>
        </Paper>

        <Paper elevation={3} sx={{ p: 2, mb: 3 }}>
          <Typography variant="h6" gutterBottom>Heures de Pointe par Jour</Typography>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart
              data={dailyPeakHours}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="customers" fill="#8884d8" name="Clients" />
              <Bar dataKey="sales" fill="#82ca9d" name="Ventes (€)" />
            </BarChart>
          </ResponsiveContainer>
        </Paper>

        <Paper elevation={3} sx={{ p: 2 }}>
          <Typography variant="h6" gutterBottom>Résumé des Heures de Pointe</Typography>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Jour</TableCell>
                  <TableCell>Heure de Pointe</TableCell>
                  <TableCell align="right">Nombre de Clients</TableCell>
                  <TableCell align="right">Ventes (€)</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {dailyPeakHours.map((row) => (
                  <TableRow key={row.day}>
                    <TableCell component="th" scope="row">
                      {row.day}
                    </TableCell>
                    <TableCell>{row.peakHour}</TableCell>
                    <TableCell align="right">{row.customers}</TableCell>
                    <TableCell align="right">{row.sales}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Box>
    </ThemeProvider>
  );
}