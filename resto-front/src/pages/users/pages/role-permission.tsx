import React, { useEffect, useState } from 'react';
import {
 Box, Typography, Button, Dialog, DialogTitle, DialogContent,
  DialogActions, TextField, Checkbox, FormControlLabel, Snackbar, Paper,
  List, ListItem, ListItemText, ListItemSecondaryAction, IconButton,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow
} from '@mui/material';
import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { useQuery } from 'react-query';
import roleService, { CreateRoleDto, RoleResponse } from '../services/role.service';
import { errorHandler } from '../../../handlers/errorHandler';

  

interface Role {
  id: number;
  name: string;
  description?:string;
  permissions: string[];
}

interface Permission {
  id: number;
  name: string;
  description: string;
}

const initialRoles: Role[] = [
  { id: 1, name: "Administrateur", permissions: ["manage_staff", "manage_menu", "manage_inventory", "view_reports"] },
  { id: 2, name: "Manager", permissions: ["manage_staff", "manage_menu", "view_reports"] },
  { id: 3, name: "Serveur", permissions: ["view_menu", "take_orders"] },
  { id: 4, name: "Cuisinier", permissions: ["view_menu", "update_inventory"] },
];

const rolePipe =(rolesResponse:RoleResponse[]|undefined):Role[]=>{
    if(rolesResponse){
      return rolesResponse?.map((role)=>{
        return {
         ...role,
         permissions:role.rolePermissions.map((rolePermissions)=>{
          return rolePermissions.permission.name 
         })
        } as Role
      })
    }
    return []
     
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function RolePermissionManagement() {
  // const [roles, setRoles] = useState<Role[]>(initialRoles);
  const [openDialog, setOpenDialog] = useState(false);
  const [currentRole, setCurrentRole] = useState<Role | null>(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' as 'success' | 'error' });
  const {data:roleResponse} = useQuery('roles',async()=>await roleService.getRoles());
  const {data:availablePermissions} = useQuery('permissions',async()=>await roleService.getPermissions());
  const roles =rolePipe(roleResponse)
  console.log({roles})
  const handleOpenDialog = (role: Role | null = null) => {
     setCurrentRole(role);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setCurrentRole(null);
  };

  const handleSaveRole =async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const newRole: Role = {
      id: currentRole ? currentRole.id : Date.now(),
      name: formData.get('name') as string,
      permissions: availablePermissions?.filter(permission => formData.get(permission.id.toString()) === 'on')?.map(permission => permission.id.toString()) as string[]
    };
   
    if (currentRole) {
      console.log({currentRole})
      // setRoles(roles.map(role => role.id === currentRole.id ? newRole : role));
      setSnackbar({ open: true, message: 'Rôle modifié avec succès', severity: 'success' });
    } else {
      const createRoleDto:CreateRoleDto={
        name:formData.get('name') as string,
        description: formData.get('description') as string,
        permissions: availablePermissions?.filter((permission)=>formData.get(permission.name)=='on')?.map((permission)=>permission.id)
      }
 
      await roleService.createRole(createRoleDto)
      .then(()=>{
        setSnackbar({ open: true, message: 'Nouveau rôle ajouté avec succès', severity: 'success' });
      })
      .catch((error)=>errorHandler(error))
      console.log({createRoleDto})
    }
    handleCloseDialog();
  };

  const handleDeleteRole =async (id: number) => {
    await roleService.deleteRole(id)
    .then(()=>{
      setSnackbar({ open: true, message: 'Rôle supprimé avec succès', severity: 'success' });
    }).catch((error)=>errorHandler(error))
  };

  return (
   
      <Box sx={{ flexGrow: 1, p: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Gestion des Rôles et Permissions
        </Typography>
        
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, mb: 3 }}>
          <Paper elevation={3} sx={{ p: 2, flex: '1 1 300px' }}>
            <Typography variant="h6" gutterBottom>Rôles existants</Typography>
            <List>
              {roles.map((role) => (
                <ListItem key={role.id}>
                  <ListItemText 
                    primary={role.name} 
                    secondary={`${role.permissions.length} permission(s)`} 
                  />
                  <ListItemSecondaryAction>
                    <IconButton edge="end" aria-label="edit" onClick={() => handleOpenDialog(role)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteRole(role.id)}>
                      <DeleteIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => handleOpenDialog()}
              sx={{ mt: 2 }}
            >
              Ajouter un rôle
            </Button>
          </Paper>
          
          <Paper elevation={3} sx={{ p: 2, flex: '1 1 300px' }}>
            <Typography variant="h6" gutterBottom>Permissions disponibles</Typography>
            <TableContainer>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Nom</TableCell>
                    <TableCell>Description</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {availablePermissions?.map((permission) => (
                    <TableRow key={permission.id}>
                      <TableCell>{permission.name}</TableCell>
                      <TableCell>{permission.description}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Box>

        <Dialog open={openDialog} onClose={handleCloseDialog}>
          <form onSubmit={handleSaveRole}>
            <DialogTitle>{currentRole ? 'Modifier le rôle' : 'Ajouter un rôle'}</DialogTitle>
            <DialogContent>
              <TextField
                autoFocus
                margin="dense"
                name="name"
                label="Nom du rôle"
                type="text"
                fullWidth
                variant="outlined"
                defaultValue={currentRole?.name || ''}
                required
              />
                <TextField
                margin="dense"
                name="description"
                label="Description"
                type="text"
                fullWidth
                variant="outlined"
                defaultValue={currentRole?.description || ''}
              />
              <Typography variant="subtitle1" sx={{ mt: 2, mb: 1 }}>Permissions :</Typography>
              {availablePermissions?.map((permission) => (
                <FormControlLabel
                  key={permission.id}
                  control={
                    <Checkbox
                      name={permission.name}
                      defaultChecked={currentRole?.permissions.includes(permission.name)}
                    />
                  }
                  label={permission.name.toLowerCase()}
                />
              ))}
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