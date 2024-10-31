


import React, { useEffect, useState } from 'react';
import {
  Box, Typography, Button, Dialog, DialogTitle, DialogContent,
  DialogActions, TextField, Select, MenuItem, InputLabel, FormControl,
  Snackbar, IconButton, Chip, Paper, Avatar,
  useTheme,
 } from '@mui/material';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { useQuery } from 'react-query';
import roleService, { Role } from '../services/role.service';
import userService, { CreateUserDto, UpdateUserDto, User } from '../services/user.service';
import { errorHandler } from '../../../handlers/errorHandler';




 

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function StaffManagement() {
  const [employees, setEmployees] = useState<User[]|undefined>(undefined);
  const [openDialog, setOpenDialog] = useState(false);
  const [currentEmployee, setCurrentEmployee] = useState<User | null>(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' as 'success' | 'error' });
  const {palette} = useTheme()
  const {data:roles} = useQuery('roles',async()=>await roleService.getRoles());
  const {data:users,isLoading:isUsersLoading,refetch:refetchUsers} = useQuery('users',async()=>await userService.getUsers())
  useEffect(()=>{
    if(users)setEmployees(users)
  },[users])

  const handleOpenDialog = (employee: User | null = null) => {
    
    if(employee){
      setCurrentEmployee({
       ...employee,
       });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setCurrentEmployee(null);
  };

  const handleSaveEmployee = async(event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const newEmployee: CreateUserDto = {
      firstname: formData.get('firstname') as string,
      lastname: formData.get('lastname') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      roleId: formData.get('role') as string,
      startDate: formData.get('startDate') as string,
      status: formData.get('status') as 'Actif' | 'Inactif',
      password: formData.get('password') as string,
      username: formData.get('username') as string,
    };
    console.log({newEmployee})

    if (currentEmployee) {
      // setEmployees(employees?.map(emp => emp?.id === currentEmployee?.id ? newEmployee : emp));
      // setEmployees(employees.map((emp)))
      const id =currentEmployee.id
      
      const updateUserDto:UpdateUserDto={
        email:newEmployee.email,
        firstname:newEmployee.firstname,
        lastname:newEmployee.lastname,
        phone:newEmployee.phone,
        roleId:newEmployee.roleId,
        status:newEmployee.status,
        username:newEmployee.username

      }
      console.log({updateUserDto})
      userService.updateUser(id,updateUserDto)
      .then(()=>{
        setSnackbar({ open: true, message: 'Employé modifié avec succès', severity: 'success' });
      }).then(()=>refetchUsers())
    } else {
   
      await userService.createUser(newEmployee)
      .then((res)=>{
        console.log({res})
        setSnackbar({ open: true, message: 'Nouvel employé ajouté avec succès', severity: 'success' });
      }).then(()=>{
        refetchUsers()
      })
      .catch((error)=>{
        errorHandler(error)
      })
    }
    handleCloseDialog();
  };

  const handleDeleteEmployee =async (id: number) => {
    // setEmployees(employees?.filter(emp => emp.id !== id));
    await userService.deleteUser(id)
    .then(()=>{
      setSnackbar({ open: true, message: 'Employé supprimé avec succès', severity: 'success' });
    }).catch((error)=>errorHandler(error))
  };

  const columns: GridColDef[] = [
    { 
      field: 'fullName', 
      headerName: 'Nom complet', 
      width: 200,
      renderCell: (params: GridRenderCellParams) =>{

        return (
          <Box sx={{ display: 'flex', alignItems: 'center' ,color:palette.text.primary}}>
            <Avatar sx={{ mr: 2 }}>{params.row['firstname'][0]} {params.row['lastname'][0]}</Avatar>
            {params.value}
          </Box>
        )
      }
    },
    { field: 'email', headerName: 'Email', width: 200 },
    { field: 'username', headerName: 'UserName', width: 200 },
    { field: 'phone', headerName: 'Téléphone', width: 150 },
    { field: 'role', headerName: 'Poste', width: 150,
      valueGetter:(params:Role)=>params.name
    },
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
      
      <Box sx={{ display: 'flex', gap: 3, mb: 3 }}>
        <Paper elevation={3} sx={{ flex: 1, p: 2 }}>
          <Typography variant="h6" gutterBottom>Total des employés</Typography>
          <Typography variant="h4">{employees?.length}</Typography>
        </Paper>
        <Paper elevation={3} sx={{ flex: 1, p: 2 }}>
          <Typography variant="h6" gutterBottom>Employés actifs</Typography>
          {/* <Typography variant="h4">
            {employees?.filter(emp => emp.status === 'Actif').length} 
            </Typography> */}
        </Paper>
        <Paper elevation={3} sx={{ flex: 1, p: 2 }}>
          <Typography variant="h6" gutterBottom>Employés inactifs</Typography>
          {/* <Typography variant="h4">
            {employees?.filter(emp => emp.status === 'Inactif').length}
            
            </Typography> */}
        </Paper>
      </Box>

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
        loading={isUsersLoading}
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
              name="firstname"
              label="Prénom"
              type="text"
              fullWidth
              variant="outlined"
              defaultValue={currentEmployee?.firstname || ''}
              required
            />
            <TextField
              margin="dense"
              name="lastname"
              label="Nom"
              type="text"
              fullWidth
              variant="outlined"
              defaultValue={currentEmployee?.lastname || ''}
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
              name="username"
              label="Nom d'utilisateur"
              type="text"
              fullWidth
              variant="outlined"
              defaultValue={currentEmployee?.username|| ''}
              required
            />
           {
           (!currentEmployee||currentEmployee.password)&& (<TextField
            margin="dense"
            name="password"
            label="Password"
            type="password"
            
            fullWidth
            variant="outlined"
            defaultValue={currentEmployee?.password|| ''}
            required
          />)
           }
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
            <FormControl fullWidth margin="dense">
              <InputLabel>Poste</InputLabel>
              <Select
                name="role"
                defaultValue={currentEmployee?.role.id || ''}
                label="Poste"
                required
              >
                {
                  roles&&roles.map((role,index)=>(
                    <MenuItem key={index} value={role.id}>{role.name.toLowerCase()}</MenuItem>
                  ))
                }

              </Select>
            </FormControl>
            <TextField
              margin="dense"
              name="startDate"
              label="Date d'embauche"
              type="date"
              fullWidth
              variant="outlined"
              slotProps={{
                inputLabel:{
                  shrink:true
                }
              }}
              // defaultValue={currentEmployee?.startDate || ''}
              required
            />
            <FormControl fullWidth margin="dense">
              <InputLabel>Statut</InputLabel>
              <Select
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
