import React, { useState } from 'react';
import {
  Box, Typography, Paper, Grid, Select, MenuItem, FormControl, InputLabel,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow
} from '@mui/material';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell
} from 'recharts';

 

// Données simulées pour les graphiques
const salesData = [
  { name: 'Lun', ventes: 4000 },
  { name: 'Mar', ventes: 3000 },
  { name: 'Mer', ventes: 2000 },
  { name: 'Jeu', ventes: 2780 },
  { name: 'Ven', ventes: 1890 },
  { name: 'Sam', ventes: 2390 },
  { name: 'Dim', ventes: 3490 },
];

const categoryData = [
  { name: 'Plats principaux', value: 400 },
  { name: 'Entrées', value: 300 },
  { name: 'Desserts', value: 300 },
  { name: 'Boissons', value: 200 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const topSellingItems = [
  { name: 'Burger Classic', quantity: 150, revenue: 1350 },
  { name: 'Pizza Margherita', quantity: 120, revenue: 1440 },
  { name: 'Salade César', quantity: 100, revenue: 900 },
  { name: 'Pâtes Carbonara', quantity: 80, revenue: 960 },
  { name: 'Tiramisu', quantity: 75, revenue: 525 },
];

export default function AnalyticsDashboard() {
  const [timeRange, setTimeRange] = useState('week');

  const handleTimeRangeChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setTimeRange(event.target.value as string);
  };

  return (
 
      <Box sx={{ flexGrow: 1, p: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Tableau de Bord Analytique
        </Typography>

        <FormControl sx={{ mb: 3, minWidth: 120 }}>
          <InputLabel id="time-range-select-label">Période</InputLabel>
          <Select
            labelId="time-range-select-label"
            id="time-range-select"
            value={timeRange}
            label="Période"
            //@ts-ignore
            onChange={handleTimeRangeChange}
          >
            <MenuItem value="week">Cette semaine</MenuItem>
            <MenuItem value="month">Ce mois</MenuItem>
            <MenuItem value="year">Cette année</MenuItem>
          </Select>
        </FormControl>

        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, mb: 3 }}>
          <Paper elevation={3} sx={{ p: 2, flex: '1 1 200px' }}>
            <Typography variant="h6" gutterBottom>Ventes Totales</Typography>
            <Typography variant="h4">19,550 €</Typography>
          </Paper>
          <Paper elevation={3} sx={{ p: 2, flex: '1 1 200px' }}>
            <Typography variant="h6" gutterBottom>Nombre de Commandes</Typography>
            <Typography variant="h4">825</Typography>
          </Paper>
          <Paper elevation={3} sx={{ p: 2, flex: '1 1 200px' }}>
            <Typography variant="h6" gutterBottom>Panier Moyen</Typography>
            <Typography variant="h4">23.70 €</Typography>
          </Paper>
        </Box>

        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Paper elevation={3} sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>Ventes par Jour</Typography>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart
                  data={salesData}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="ventes" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper elevation={3} sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>Ventes par Catégorie</Typography>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {categoryData.map((_entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper elevation={3} sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>Articles les Plus Vendus</Typography>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Nom de l'Article</TableCell>
                      <TableCell align="right">Quantité Vendue</TableCell>
                      <TableCell align="right">Chiffre d'Affaires</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {topSellingItems.map((item) => (
                      <TableRow key={item.name}>
                        <TableCell component="th" scope="row">
                          {item.name}
                        </TableCell>
                        <TableCell align="right">{item.quantity}</TableCell>
                        <TableCell align="right">{item.revenue} €</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </Grid>
        </Grid>
      </Box>
   );
}