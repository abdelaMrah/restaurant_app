import React, { useState } from 'react';
import {
 Box, Typography, Button, Dialog, DialogTitle, DialogContent,
  DialogActions, TextField, Select, MenuItem, InputLabel, FormControl,
  Snackbar, IconButton, Chip, Grid, Paper, Avatar
} from '@mui/material';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
interface Employee {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: string;
  startDate: string;
  status: 'Actif' | 'Inactif';
}
const initialEmployees: Employee[] = [
  { id: 1, firstName: "Jean", lastName: "Dupont", email: "jean.dupont@email.com", phone: "0123456789", role: "Chef", startDate: "2022-01-15", status: "Actif" },
  { id: 2, firstName: "Marie", lastName: "Martin", email: "marie.martin@email.com", phone: "0987654321", role: "Serveur", startDate: "2022-03-01", status: "Actif" },
  { id: 3, firstName: "Pierre", lastName: "Durand", email: "pierre.durand@email.com", phone: "0654321987", role: "Cuisinier", startDate: "2022-02-10", status: "Actif" },
];

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function StaffManagement() {
  const [employees, setEmployees] = useState<Employee[]>(initialEmployees);
  const [openDialog, setOpenDialog] = useState(false);
  const [currentEmployee, setCurrentEmployee] = useState<Employee | null>(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' as 'success' | 'error' });

  const handleOpenDialog = (employee: Employee | null = null) => {
    setCurrentEmployee(employee);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setCurrentEmployee(null);
  };

  const handleSaveEmployee = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const newEmployee: Employee = {
      id: currentEmployee ? currentEmployee.id : Date.now(),
      firstName: formData.get('firstName') as string,
      lastName: formData.get('lastName') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      role: formData.get('role') as string,
      startDate: formData.get('startDate') as string,
      status: formData.get('status') as 'Actif' | 'Inactif',
    };

    if (currentEmployee) {
      setEmployees(employees.map(emp => emp.id === currentEmployee.id ? newEmployee : emp));
      setSnackbar({ open: true, message: 'Employé modifié avec succès', severity: 'success' });
    } else {
      setEmployees([...employees, newEmployee]);
      setSnackbar({ open: true, message: 'Nouvel employé ajouté avec succès', severity: 'success' });
    }
    handleCloseDialog();
  };

  const handleDeleteEmployee = (id: number) => {
    setEmployees(employees.filter(emp => emp.id !== id));
    setSnackbar({ open: true, message: 'Employé supprimé avec succès', severity: 'success' });
  };

  const columns: GridColDef[] = [
    { 
      field: 'fullName', 
      headerName: 'Nom complet', 
      width: 200,
    
      renderCell: (params: GridRenderCellParams) => (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Avatar sx={{ mr: 2 }}>{params.row.firstName[0]}{params.row.lastName[0]}</Avatar>
          {params.value}
        </Box>
      ),
    },
    { field: 'email', headerName: 'Email', width: 200 },
    { field: 'phone', headerName: 'Téléphone', width: 150 },
    { field: 'role', headerName: 'Poste', width: 150 },
    { field: 'startDate', headerName: 'Date d\'embauche', width: 150 },
    { 
      field: 'status', 
      headerName: 'Statut', 
      width: 120,
      renderCell: (params: GridRenderCellParams) => (
        <Chip 
          label={params.value} 
          color={params.value === 'Actif' ? 'success' : 'error'}
        />
      ),
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
      renderCell: (params: GridRenderCellParams) => (
        <Box>
          <IconButton onClick={() => handleOpenDialog(params.row)} size="small">
            <EditIcon />
          </IconButton>
          <IconButton onClick={() => handleDeleteEmployee(params.row.id)} size="small">
            <DeleteIcon />
          </IconButton>
        </Box>
      ),
    },
  ];

  return (
      <Box sx={{ flexGrow: 1, p: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Gestion du Personnel
        </Typography>
        
        <Grid container spacing={3} sx={{ mb: 3 }}>
          <Grid item xs={12} md={4}>
            <Paper elevation={3} sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>Total des employés</Typography>
              <Typography variant="h4">{employees.length}</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper elevation={3} sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>Employés actifs</Typography>
              <Typography variant="h4">{employees.filter(emp => emp.status === 'Actif').length}</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper elevation={3} sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>Employés inactifs</Typography>
              <Typography variant="h4">{employees.filter(emp => emp.status === 'Inactif').length}</Typography>
            </Paper>
          </Grid>
        </Grid>

        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpenDialog()}
          sx={{ mb: 2 }}
        >
          Ajouter un employé
        </Button>

        <DataGrid
          rows={employees}
          columns={columns}
          
          sx={{
            '& .MuiDataGrid-cell:focus': {
              outline: 'none',
            },
          }}
        />

        <Dialog open={openDialog} onClose={handleCloseDialog}>
          <form onSubmit={handleSaveEmployee}>
            <DialogTitle>{currentEmployee ? 'Modifier l\'employé' : 'Ajouter un employé'}</DialogTitle>
            <DialogContent>
              <TextField
                autoFocus
                margin="dense"
                name="firstName"
                label="Prénom"
                type="text"
                fullWidth
                variant="outlined"
                defaultValue={currentEmployee?.firstName || ''}
                required
              />
              <TextField
                margin="dense"
                name="lastName"
                label="Nom"
                type="text"
                fullWidth
                variant="outlined"
                defaultValue={currentEmployee?.lastName || ''}
                required
              />
              <TextField
                margin="dense"
                name="email"
                label="Email"
                type="email"
                fullWidth
                variant="outlined"
                defaultValue={currentEmployee?.email || ''}
                required
              />
              <TextField
                margin="dense"
                name="phone"
                label="Téléphone"
                type="tel"
                fullWidth
                variant="outlined"
                defaultValue={currentEmployee?.phone || ''}
                required
              />
              <TextField
                margin="dense"
                name="role"
                label="Poste"
                type="text"
                fullWidth
                variant="outlined"
                defaultValue={currentEmployee?.role || ''}
                required
              />
              <TextField
                margin="dense"
                name="startDate"
                label="Date d'embauche"
                type="date"
                fullWidth
                variant="outlined"
                defaultValue={currentEmployee?.startDate || new Date().toISOString().split('T')[0]}
                required
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <FormControl fullWidth margin="dense">
                <InputLabel id="status-select-label">Statut</InputLabel>
                <Select
                  labelId="status-select-label"
                  name="status"
                  defaultValue={currentEmployee?.status || 'Actif'}
                  label="Statut"
                  required
                >
                  <MenuItem value="Actif">Actif</MenuItem>
                  <MenuItem value="Inactif">Inactif</MenuItem>
                </Select>
              </FormControl>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDialog}>Annuler</Button>
              <Button type="submit" variant="contained">Sauvegarder</Button>
            </DialogActions>
          </form>
        </Dialog>

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
  );
}