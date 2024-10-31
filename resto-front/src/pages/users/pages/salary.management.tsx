import React, { useState } from 'react';
import {
  Box, Typography, Button, Dialog, DialogTitle, DialogContent,
  DialogActions, TextField, Snackbar, IconButton, Avatar, Select,
  MenuItem, InputAdornment
} from '@mui/material';
import { Add as AddIcon, Edit as EditIcon, Search as SearchIcon } from '@mui/icons-material';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

interface User {
  id: string;
  firstname: string;
  lastname: string;
}

interface Salary {
  id: string;
  userId: string;
  baseSalary: number;
  bonus: number;
  deductions: number;
  effectiveDate: string;
}

export default function SalaryManagement() {
  const [openDialog, setOpenDialog] = useState(false);
  const [currentSalary, setCurrentSalary] = useState<Salary | null>(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' as 'success' | 'error' });
  const [searchQuery, setSearchQuery] = useState('');

  const users: User[] = [
    { id: '1', firstname: 'Alice', lastname: 'Dupont' },
    { id: '2', firstname: 'Bob', lastname: 'Martin' },
    { id: '3', firstname: 'Charlie', lastname: 'Leclerc' },
  ];

  const [salaries, setSalaries] = useState<Salary[]>([
    { id: '1', userId: '1', baseSalary: 2500, bonus: 300, deductions: 100, effectiveDate: '2023-01-01' },
    { id: '2', userId: '2', baseSalary: 3000, bonus: 200, deductions: 150, effectiveDate: '2023-02-01' },
    { id: '3', userId: '3', baseSalary: 2800, bonus: 400, deductions: 200, effectiveDate: '2023-03-01' },
  ]);

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
    const salaryData: Salary = {
      id: currentSalary ? currentSalary.id : `${salaries.length + 1}`,
      userId: formData.get('userId') as string,
      baseSalary: Number(formData.get('baseSalary')),
      bonus: Number(formData.get('bonus')),
      deductions: Number(formData.get('deductions')),
      effectiveDate: formData.get('effectiveDate') as string,
    };

    if (currentSalary) {
      setSalaries(salaries.map((s) => (s.id === currentSalary.id ? salaryData : s)));
      setSnackbar({ open: true, message: 'Salaire mis à jour avec succès', severity: 'success' });
    } else {
      setSalaries([...salaries, salaryData]);
      setSnackbar({ open: true, message: 'Salaire ajouté avec succès', severity: 'success' });
    }
    handleCloseDialog();
  };

  const handleExport = () => {
    const csvData = salaries.map(salary => {
      const user = users.find(u => u.id === salary.userId);
      return [
        `${user?.firstname} ${user?.lastname}`,
        salary.baseSalary,
        salary.bonus,
        salary.deductions,
        calculateNetSalary(salary),
        salary.effectiveDate
      ].join(',');
    }).join('\n');

    const csvContent = `Employé,Salaire de base,Bonus,Déductions,Salaire net,Date d'effet\n${csvData}`;
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'salaries.csv';
    link.click();
    window.URL.revokeObjectURL(url);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const calculateNetSalary = (salary: Salary) => {
    return salary.baseSalary + salary.bonus - salary.deductions;
  };

  const columns: GridColDef[] = [
    {
      field: 'name',
      headerName: 'Employé',
      flex:1,
      renderCell: (params) => {
        const user = users.find(u => u.id === params.row.userId);
        return (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Avatar sx={{ mr: 2 }}>{user?.firstname[0]}{user?.lastname[0]}</Avatar>
            {user?.firstname} {user?.lastname}
          </Box>
        );
      }
    },
    { field: 'baseSalary', headerName: 'Salaire de base (€)',flex:1, type: 'number' },
    { field: 'bonus', headerName: 'Bonus (€)',flex:1, type: 'number' },
    { field: 'deductions', headerName: 'Déductions (€)', flex:1, type: 'number' },
    {
      field: 'netSalary',
      headerName: 'Salaire net (€)',
      width: 150,
      type: 'number',
      renderCell:(props)=>{
        return<>
        {
            calculateNetSalary(props.row)
        }
        </>
      }
    },
    { field: 'effectiveDate', headerName: 'Date d’effet', width: 150 },
    {
      field: 'actions',
      headerName: 'Actions',
      flex:1,
      renderCell: (params) => (
        <IconButton onClick={() => handleOpenDialog(params.row)} size="small">
          <EditIcon />
        </IconButton>
      )
    }
  ];

  const filteredSalaries = salaries.filter(salary => {
    const user = users.find(u => u.id === salary.userId);
    return user && `${user.firstname} ${user.lastname}`.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Gestion des Salaires
      </Typography>

      <Box display="flex" gap={2} mb={2}>
        <TextField
          placeholder="Rechercher un employé"
          value={searchQuery}
          onChange={handleSearchChange}
          InputProps={{
            startAdornment: <InputAdornment position="start"><SearchIcon /></InputAdornment>
          }}
        />

        <Button variant="contained" onClick={handleExport}>Exporter CSV</Button>
      </Box>

      <Box sx={{ height: 500, width: '100%' }}>
        <DataGrid
          rows={filteredSalaries}
          columns={columns}
          getRowId={(row) => row.id}
        />
      </Box>

      {/* Dialog and Snackbar components go here */}
    </Box>
  );
}
