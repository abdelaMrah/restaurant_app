import React, { useState } from 'react';
import {
   Box, Typography, Button, Dialog, DialogTitle, DialogContent,
  DialogActions, TextField, Select, MenuItem, FormControl, InputLabel,
  Snackbar, Paper, Avatar, Chip
} from '@mui/material';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import 'dayjs/locale/fr';

 
interface Employee {
  id: number;
  firstName: string;
  lastName: string;
  role: string;
}

interface Shift {
  id: number;
  employeeId: number;
  date: string;
  startTime: string;
  endTime: string;
}

const initialEmployees: Employee[] = [
  { id: 1, firstName: "Jean", lastName: "Dupont", role: "Chef" },
  { id: 2, firstName: "Marie", lastName: "Martin", role: "Serveur" },
  { id: 3, firstName: "Pierre", lastName: "Durand", role: "Cuisinier" },
];

const initialShifts: Shift[] = [
  { id: 1, employeeId: 1, date: "2023-05-01", startTime: "08:00", endTime: "16:00" },
  { id: 2, employeeId: 2, date: "2023-05-01", startTime: "12:00", endTime: "20:00" },
  { id: 3, employeeId: 3, date: "2023-05-01", startTime: "10:00", endTime: "18:00" },
];

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function StaffScheduling() {
  const [employees] = useState<Employee[]>(initialEmployees);
  const [shifts, setShifts] = useState<Shift[]>(initialShifts);
  const [openDialog, setOpenDialog] = useState(false);
  const [currentShift, setCurrentShift] = useState<Shift | null>(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' as 'success' | 'error' });
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(dayjs());

  const handleOpenDialog = (shift: Shift | null = null) => {
    setCurrentShift(shift);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setCurrentShift(null);
  };

  const handleSaveShift = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const newShift: Shift = {
      id: currentShift ? currentShift.id : Date.now(),
      employeeId: Number(formData.get('employeeId')),
      date: formData.get('date') as string,
      startTime: formData.get('startTime') as string,
      endTime: formData.get('endTime') as string,
    };

    if (currentShift) {
      setShifts(shifts.map(shift => shift.id === currentShift.id ? newShift : shift));
      setSnackbar({ open: true, message: 'Horaire modifié avec succès', severity: 'success' });
    } else {
      setShifts([...shifts, newShift]);
      setSnackbar({ open: true, message: 'Nouvel horaire ajouté avec succès', severity: 'success' });
    }
    handleCloseDialog();
  };

  const handleDeleteShift = (id: number) => {
    setShifts(shifts.filter(shift => shift.id !== id));
    setSnackbar({ open: true, message: 'Horaire supprimé avec succès', severity: 'success' });
  };

  const columns: GridColDef[] = [
    { 
      field: 'employee', 
      headerName: 'Employé', 
      flex:2,
      renderCell: (params: GridRenderCellParams) => {
        const employee = employees.find(e => e.id === params.row.employeeId);
        return (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Avatar sx={{ mr: 2 }}>{employee?.firstName[0]}{employee?.lastName[0]}</Avatar>
            {`${employee?.firstName} ${employee?.lastName}`}
          </Box>
        );
      },
    },
    { field: 'date', headerName: 'Date', flex:1, },
    { field: 'startTime', headerName: 'Début', flex:1 },
    { field: 'endTime', headerName: 'Fin',flex:1 },
    { 
      field: 'role', 
      headerName: 'Poste', 
      flex:1,
      renderCell: (params: GridRenderCellParams) => {
        const employee = employees.find(e => e.id === params.row.employeeId);
        return <Chip label={employee?.role} color="primary" variant="outlined" />;
      },
    },
    {
      field: 'actions',
      headerName: 'Actions',
      flex:2,
      renderCell: (params: GridRenderCellParams) => (
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button
            startIcon={<EditIcon />}
            size="small"
            onClick={() => handleOpenDialog(params.row)}
          >
            Modifier
          </Button>
          <Button
            startIcon={<DeleteIcon />}
            size="small"
            onClick={() => handleDeleteShift(params.row.id)}
            color="error"
          >
            Supprimer
          </Button>
        </Box>
      ),
    },
  ];

  return (
       <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="fr">
         <Box sx={{ flexGrow: 1, p: 3 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Planification du Personnel
          </Typography>
          
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, mb: 3 }}>
            <Paper elevation={3} sx={{ p: 2, flex: '1 1 300px' }}>
              <Typography variant="h6" gutterBottom>Sélectionner une date</Typography>
              <DatePicker
                label="Date"
                value={selectedDate}
                onChange={(newValue) => setSelectedDate(newValue)}
              />
            </Paper>
            <Paper elevation={3} sx={{ p: 2, flex: '1 1 300px' }}>
              <Typography variant="h6" gutterBottom>Résumé des horaires</Typography>
              <Typography>Nombre total de shifts : {shifts.length}</Typography>
              <Typography>Employés programmés : {new Set(shifts.map(s => s.employeeId)).size}</Typography>
            </Paper>
          </Box>

          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => handleOpenDialog()}
            sx={{ mb: 2 }}
          >
            Ajouter un horaire
          </Button>

          <DataGrid
            rows={shifts}
            columns={columns}
            sx={{
              '& .MuiDataGrid-cell:focus': {
                outline: 'none',
              },
            }}
          />

          <Dialog open={openDialog} onClose={handleCloseDialog}>
            <form onSubmit={handleSaveShift}>
              <DialogTitle>{currentShift ? 'Modifier l\'horaire' : 'Ajouter un horaire'}</DialogTitle>
              <DialogContent>
                <FormControl fullWidth margin="normal">
                  <InputLabel id="employee-select-label">Employé</InputLabel>
                  <Select
                    labelId="employee-select-label"
                    name="employeeId"
                    defaultValue={currentShift?.employeeId || ''}
                    label="Employé"
                    required
                  >
                    {employees.map((employee) => (
                      <MenuItem key={employee.id} value={employee.id}>
                        {`${employee.firstName} ${employee.lastName} (${employee.role})`}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <DatePicker
                  label="Date"
                  value={currentShift ? dayjs(currentShift.date) : dayjs()}
                  onChange={(newValue) => {
                    // Mise à jour de la date dans le formulaire
                    console.log({date:newValue})
                  }}
                  //@ts-ignore
                  renderInput={(params:any) => <TextField {...params} fullWidth margin="normal" name="date" required />}
                />
                <TextField
                  margin="normal"
                  name="startTime"
                  label="Heure de début"
                  type="time"
                  defaultValue={currentShift?.startTime || "09:00"}
                  fullWidth
                  required
                  slotProps={{
                    inputLabel:{
                        shrink:true,
                    }
                  }}
                 
                />
                <TextField
                  margin="normal"
                  name="endTime"
                  label="Heure de fin"
                  type="time"
                  defaultValue={currentShift?.endTime || "17:00"}
                  fullWidth
                  required
                  slotProps={{
                    inputLabel:{
                        shrink: true,
                    }
                  }}
                   
                />
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
      </LocalizationProvider>
   );
}