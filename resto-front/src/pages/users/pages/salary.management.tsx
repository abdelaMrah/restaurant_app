import React, { useState } from 'react';
import {
  Box, Typography, Button, Dialog, DialogTitle, DialogContent,
  DialogActions, TextField, Snackbar, IconButton, Avatar,
  useTheme, Chip, InputAdornment
} from '@mui/material';
import { DataGrid, GridColDef, GridRenderCellParams, GridToolbar } from '@mui/x-data-grid';
import { Add as AddIcon, Edit as EditIcon, Search as SearchIcon } from '@mui/icons-material';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { hexToRgba } from '../../../utils/utils';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

interface User {
  id: number;
  firstname: string;
  lastname: string;
}

interface Salary {
  id: number;
  userId: number;
  baseSalary: number;
  bonus: number;
  deductions: number;
  effectiveDate: string;
}

const initialUsers: User[] = [
  { id: 1, firstname: "John", lastname: "Doe" },
  { id: 2, firstname: "Jane", lastname: "Smith" },
  { id: 3, firstname: "Mike", lastname: "Johnson" },
];

const initialSalaries: Salary[] = [
  { id: 1, userId: 1, baseSalary: 2000, bonus: 200, deductions: 100, effectiveDate: "2023-01-01" },
  { id: 2, userId: 2, baseSalary: 2200, bonus: 150, deductions: 120, effectiveDate: "2023-01-01" },
  { id: 3, userId: 3, baseSalary: 1900, bonus: 100, deductions: 90, effectiveDate: "2023-01-01" },
];

export default function SalaryManagement() {
  const [users] = useState<User[]>(initialUsers);
  const [salaries, setSalaries] = useState<Salary[]>(initialSalaries);
  const [openDialog, setOpenDialog] = useState(false);
  const [currentSalary, setCurrentSalary] = useState<Salary | null>(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' as 'success' | 'error' });
  const theme = useTheme();
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({});

  const handleOpenDialog = (salary: Salary | null = null) => {
    setCurrentSalary(salary);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setCurrentSalary(null);
  };

  const handleSaveSalary = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const salaryData = {
      userId: Number(formData.get('userId')),
      baseSalary: Number(formData.get('baseSalary')),
      bonus: Number(formData.get('bonus')),
      deductions: Number(formData.get('deductions')),
      effectiveDate: formData.get('effectiveDate') as string,
    };

    if (currentSalary) {
      setSalaries(prevSalaries => prevSalaries.map(s =>
        s.id === currentSalary.id ? { ...s, ...salaryData } : s
      ));
      setSnackbar({ open: true, message: 'Salaire mis à jour avec succès', severity: 'success' });
    } else {
      const newSalary = {
        id: Math.max(...salaries.map(s => s.id)) + 1,
        ...salaryData
      };
      setSalaries(prevSalaries => [...prevSalaries, newSalary]);
      setSnackbar({ open: true, message: 'Salaire ajouté avec succès', severity: 'success' });
    }
    handleCloseDialog();
  };

  const calculateNetSalary = (salary: Salary) => {
    return salary.baseSalary + salary.bonus - salary.deductions;
  };

  const columns: GridColDef[] = [
    {
      field: 'fullName',
      headerName: 'Employé',
      flex:1.5,
      renderCell: (params: GridRenderCellParams) => {
        const user = users.find(u => u.id === params.row.userId);
        return (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Avatar sx={{ mr: 2 }}>{user?.firstname[0]}{user?.lastname[0]}</Avatar>
            {user?.firstname} {user?.lastname}
          </Box>
        );
      }
    },
    { field: 'baseSalary', headerName: 'Salaire de base', width: 150, valueFormatter: (value:number ) => `${value.toFixed(2)} DA` },
    { field: 'bonus', headerName: 'Bonus', width: 120, valueFormatter: (value:number ) => `${value.toFixed(2)} DA` },
    { field: 'deductions', headerName: 'Déductions', width: 120, valueFormatter: (value:number) => `${value.toFixed(2)} DA` },
    {
      field: 'netSalary',
      headerName: 'Salaire net',
      flex:1,
      // valueGetter: (params) => calculateNetSalary(params.row),
      // valueFormatter: ({ value }) => `${value.toFixed(2)} `,
      renderCell: (params: GridRenderCellParams) => {
        const salary =calculateNetSalary(params.row)
        return (
        <Chip 
        label={`${salary.toFixed(2)} DA`} 
        color="primary" 
        sx={{
          bgcolor:hexToRgba(theme.palette.primary.light,0.3)
        }}
        />
        )
      }
    },
    {
      field: 'effectiveDate',
      headerName: 'Date d\'effet',
      flex:1,
      valueFormatter: (value ) => new Date(value).toLocaleDateString('fr', {
        weekday: 'short',  // "Fri"
        day: '2-digit',    // "27"
        month: 'short',    // "Jan"
        year: 'numeric'    // "2023"
    })
      },
    {
      field: 'actions',
      headerName: 'Actions',
      flex:1,
      renderCell: (params: GridRenderCellParams) => (
        <IconButton onClick={() => handleOpenDialog(params.row)} size="small">
          <EditIcon />
        </IconButton>
      ),
    },
  ];

  const filteredSalaries = salaries.filter((salary) => {
    const user = users.find((u) => u.id === salary.userId);
    const searchString = `${user?.firstname} ${user?.lastname} ${salary.baseSalary} ${salary.bonus} ${salary.deductions} ${salary.effectiveDate}`.toLowerCase();
    return searchString.includes(searchTerm.toLowerCase());
  });

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Gestion des Salaires
      </Typography>

      <TextField
        variant="outlined"
        placeholder="Rechercher..."
        fullWidth
        margin="normal"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
        onChange={(e) => setSearchTerm(e.target.value)}
        sx={{ mb: 2 }}
      />

      <Button
        variant="outlined"
        startIcon={<AddIcon />}
        onClick={() => handleOpenDialog()}
        sx={{ mb: 2 }}
      >
        Ajouter un salaire
      </Button>

      <DataGrid
        rows={filteredSalaries}
        columns={columns}
        
        sx={{
          '& .MuiDataGrid-cell:focus': {
            outline: 'none',
          },
        }}
        filterModel={{
          items: Object.entries(filters).map(([field, value]) => ({
            field,
            operator: 'contains',
            value,
          })),
        }}
        onFilterModelChange={(model) => setFilters(model.items.reduce((acc, item) => ({ ...acc, [item.field]: item.value }), {}))}
        slots={{
          toolbar: GridToolbar,
        }}
        slotProps={{
          toolbar: { showQuickFilter: true },
        }}
      />

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <form onSubmit={handleSaveSalary}>
          <DialogTitle>{currentSalary ? 'Modifier le salaire' : 'Ajouter un salaire'}</DialogTitle>
          <DialogContent>
            <TextField
              select
              margin="dense"
              name="userId"
              label="Employé"
              fullWidth
              variant="outlined"
              defaultValue={currentSalary?.userId || ''}
              required
              SelectProps={{
                native: true,
              }}
            >
              <option value="">Sélectionnez un employé</option>
              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.firstname} {user.lastname}
                </option>
              ))}
            </TextField>
            <TextField
              margin="dense"
              name="baseSalary"
              label="Salaire de base"
              type="number"
              fullWidth
              variant="outlined"
              defaultValue={currentSalary?.baseSalary || ''}
              required
            />
            <TextField
              margin="dense"
              name="bonus"
              label="Bonus"
              type="number"
              fullWidth
              variant="outlined"
              defaultValue={currentSalary?.bonus || ''}
              required
            />
            <TextField
              margin="dense"
              name="deductions"
              label="Déductions"
              type="number"
              fullWidth
              variant="outlined"
              defaultValue={currentSalary?.deductions || ''}
              required
            />
            <TextField
              margin="dense"
              name="effectiveDate"
              label="Date d'effet"
              type="date"
              fullWidth
              variant="outlined"
              defaultValue={currentSalary?.effectiveDate || ''}
              required
              InputLabelProps={{
                shrink: true,
              }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Annuler</Button>
            <Button type="submit" variant="contained">Enregistrer</Button>
          </DialogActions>
        </form>
      </Dialog>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert onClose={() => setSnackbar({ ...snackbar, open: false })} severity={snackbar.severity}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}