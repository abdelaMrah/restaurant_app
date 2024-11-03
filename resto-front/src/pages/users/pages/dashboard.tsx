import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Card,
  CardContent,
  Avatar,
  Chip,
  TextField,
  InputAdornment,
  useTheme,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  LinearProgress,
} from '@mui/material';
import {
  Search as SearchIcon,
  TrendingUp as TrendingUpIcon,
  Group as GroupIcon,
  Person as PersonIcon,
  Star as StarIcon,
} from '@mui/icons-material';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

// Données factices pour les employés
const employees = [
  { id: 1, name: "Alice Johnson", role: "Chef", department: "Cuisine", status: "Actif", performance: 95 },
  { id: 2, name: "Bob Smith", role: "Serveur", department: "Service", status: "Actif", performance: 88 },
  { id: 3, name: "Charlie Brown", role: "Barman", department: "Bar", status: "Actif", performance: 92 },
  { id: 4, name: "Diana Ross", role: "Hôtesse", department: "Accueil", status: "Actif", performance: 90 },
  { id: 5, name: "Ethan Hunt", role: "Cuisinier", department: "Cuisine", status: "Inactif", performance: 85 },
  { id: 6, name: "Fiona Apple", role: "Serveuse", department: "Service", status: "Actif", performance: 89 },
  { id: 7, name: "George Clooney", role: "Manager", department: "Administration", status: "Actif", performance: 97 },
  { id: 8, name: "Hannah Montana", role: "Plongeuse", department: "Cuisine", status: "Actif", performance: 86 },
];

// Données pour le graphique des départements
const departmentData = [
  { name: 'Cuisine', value: 3 },
  { name: 'Service', value: 2 },
  { name: 'Bar', value: 1 },
  { name: 'Accueil', value: 1 },
  { name: 'Administration', value: 1 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

export default function EmployeeDashboard() {
  const theme = useTheme();
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const filteredEmployees = employees.filter(employee => 
    employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const activeEmployees = employees.filter(employee => employee.status === "Actif");
  const averagePerformance = employees.reduce((sum, employee) => sum + employee.performance, 0) / employees.length;
  const topPerformer = employees.reduce((prev, current) => (prev.performance > current.performance) ? prev : current);

  //@ts-ignore
  const handleChangePage = (_, newPage:any) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event:any) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Typography variant="h4" component="h1" gutterBottom sx={{ mb: 4 }}>
        Tableau de Bord des Employés
      </Typography>

      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 4 }}>
        <Card sx={{ flexGrow: 1, minWidth: 200 }}>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <GroupIcon color="primary" sx={{ mr: 1 }} />
              <Typography variant="h6">Total des Employés</Typography>
            </Box>
            <Typography variant="h4">{employees.length}</Typography>
          </CardContent>
        </Card>
        <Card sx={{ flexGrow: 1, minWidth: 200 }}>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <PersonIcon color="success" sx={{ mr: 1 }} />
              <Typography variant="h6">Employés Actifs</Typography>
            </Box>
            <Typography variant="h4">{activeEmployees.length}</Typography>
          </CardContent>
        </Card>
        <Card sx={{ flexGrow: 1, minWidth: 200 }}>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <StarIcon color="warning" sx={{ mr: 1 }} />
              <Typography variant="h6">Performance Moyenne</Typography>
            </Box>
            <Typography variant="h4">{averagePerformance.toFixed(1)}%</Typography>
          </CardContent>
        </Card>
      </Box>

      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 4 }}>
        <Paper sx={{ flexGrow: 2, minWidth: 300, p: 2 }}>
          <Typography variant="h6" gutterBottom>Liste des Employés</Typography>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Rechercher un employé..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{ mb: 2 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Nom</TableCell>
                  <TableCell>Rôle</TableCell>
                  <TableCell>Département</TableCell>
                  <TableCell>Statut</TableCell>
                  <TableCell>Performance</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredEmployees
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((employee) => (
                    <TableRow key={employee.id}>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Avatar sx={{ mr: 2 }}>{employee.name[0]}</Avatar>
                          {employee.name}
                        </Box>
                      </TableCell>
                      <TableCell>{employee.role}</TableCell>
                      <TableCell>{employee.department}</TableCell>
                      <TableCell>
                        <Chip
                          label={employee.status}
                          color={employee.status === "Actif" ? "success" : "default"}
                          size="small"
                        />
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Box sx={{ width: '100%', mr: 1 }}>
                            <LinearProgress variant="determinate" value={employee.performance} />
                          </Box>
                          <Box sx={{ minWidth: 35 }}>
                            <Typography variant="body2" color="text.secondary">{`${employee.performance}%`}</Typography>
                          </Box>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={filteredEmployees.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>

        <Paper sx={{ flexGrow: 1, minWidth: 300, p: 2 }}>
          <Typography variant="h6" gutterBottom>Répartition par Département</Typography>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={departmentData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {departmentData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </Paper>
      </Box>

      <Paper sx={{ p: 2 }}>
        <Typography variant="h6" gutterBottom>Employé du Mois</Typography>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Avatar sx={{ width: 60, height: 60, mr: 2, bgcolor: theme.palette.secondary.main }}>{topPerformer.name[0]}</Avatar>
          <Box>
            <Typography variant="h5">{topPerformer.name}</Typography>
            <Typography variant="body1" color="text.secondary">{topPerformer.role} - {topPerformer.department}</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
              <TrendingUpIcon color="primary" sx={{ mr: 1 }} />
              <Typography variant="body2">Performance: {topPerformer.performance}%</Typography>
            </Box>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}