// import React, {  useState } from 'react';
// import {
//  Box, Typography, Button, Dialog, DialogTitle, DialogContent,
//   DialogActions, TextField, Checkbox, FormControlLabel, Snackbar, Paper,
//   List, ListItem, ListItemText, ListItemSecondaryAction, IconButton,
//   Table, TableBody, TableCell, TableContainer, TableHead, TableRow
// } from '@mui/material';
// import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
// import MuiAlert, { AlertProps } from '@mui/material/Alert';
// import { useQuery } from 'react-query';
// import roleService, { CreateRoleDto, RoleResponse, UpdateRoleDto } from '../services/role.service';
// import { errorHandler } from '../../../handlers/errorHandler';

  

// interface Role {
//   id: number;
//   name: string;
//   description?:string;
//   permissions: string[];
// }
// const rolePipe =(rolesResponse:RoleResponse[]|undefined):Role[]=>{
//     if(rolesResponse){
//       return rolesResponse?.map((role)=>{
//         return {
//          ...role,
//          permissions:role.rolePermissions.map((rolePermissions)=>{
//           return rolePermissions.permission.name 
//          })
//         } as Role
//       })
//     }
//     return []
     
// }

// const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
//   props,
//   ref,
// ) {
//   return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
// });

// export default function RolePermissionManagement() {
//   const [openDialog, setOpenDialog] = useState(false);
//   const [currentRole, setCurrentRole] = useState<Role | null>(null);
//   const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' as 'success' | 'error' });
//   const {data:roleResponse,refetch:refetchRoles} = useQuery('roles',async()=>await roleService.getRoles());
//   const {data:availablePermissions,} = useQuery('permissions',async()=>await roleService.getPermissions());
//   const roles =rolePipe(roleResponse)
//   console.log({roles})
//   const handleOpenDialog = (role: Role | null = null) => {
//      setCurrentRole(role);
//     setOpenDialog(true);
//   };

//   const handleCloseDialog = () => {
//     setOpenDialog(false);
//     setCurrentRole(null);
//   };

//   const handleSaveRole =async (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault();
//     const formData = new FormData(event.currentTarget);
  
   
//     if (currentRole) {
//       console.log({currentRole})
//       const updateRoleDto:UpdateRoleDto={
//         name:formData.get('name') as string,
//         description: formData.get('description') as string,
//         permissions: availablePermissions?.filter((permission)=>formData.get(permission.name)=='on')?.map((permission)=>permission.id)
//       }
//       // setRoles(roles.map(role => role.id === currentRole.id ? newRole : role));
//       await roleService.updateRole(currentRole.id,updateRoleDto)
//       .then(()=>{
//         setSnackbar({ open: true, message: 'Rôle modifié avec succès', severity: 'success' });
//       }).then(()=>refetchRoles())
//     } else {
//       const createRoleDto:CreateRoleDto={
//         name:formData.get('name') as string,
//         description: formData.get('description') as string,
//         permissions: availablePermissions?.filter((permission)=>formData.get(permission.name)=='on')?.map((permission)=>permission.id)
//       }
 
//       await roleService.createRole(createRoleDto)
//       .then(()=>{
//         setSnackbar({ open: true, message: 'Nouveau rôle ajouté avec succès', severity: 'success' })
//       }).then(()=>refetchRoles())
//       .catch((error)=>errorHandler(error))
//       console.log({createRoleDto})
//     }
//     handleCloseDialog();
//   };

//   const handleDeleteRole =async (id: number) => {
//     await roleService.deleteRole(id)
//     .then(()=>{
//       setSnackbar({ open: true, message: 'Rôle supprimé avec succès', severity: 'success' });
//     }).then(()=>refetchRoles())
//     .catch((error)=>errorHandler(error))
//   };

//   return (
   
//       <Box sx={{ flexGrow: 1, p: 3 }}>
//         <Typography variant="h4" component="h1" gutterBottom>
//           Gestion des Rôles et Permissions
//         </Typography>
        
//         <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, mb: 3 }}>
//           <Paper elevation={3} sx={{ p: 2, flex: '1 1 300px' }}>
//             <Typography variant="h6" gutterBottom>Rôles existants</Typography>
//             <List>
//               {roles.map((role) => (
//                 <ListItem key={role.id}>
//                   <ListItemText 
//                     primary={role.name} 
//                     secondary={`${role.permissions.length} permission(s)`} 
//                   />
//                   <ListItemSecondaryAction>
//                     <IconButton edge="end" aria-label="edit" onClick={() => handleOpenDialog(role)}>
//                       <EditIcon />
//                     </IconButton>
//                     <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteRole(role.id)}>
//                       <DeleteIcon />
//                     </IconButton>
//                   </ListItemSecondaryAction>
//                 </ListItem>
//               ))}
//             </List>
//             <Button
//               variant="contained"
//               startIcon={<AddIcon />}
//               onClick={() => handleOpenDialog()}
//               sx={{ mt: 2 }}
//             >
//               Ajouter un rôle
//             </Button>
//           </Paper>
          
//           <Paper elevation={3} sx={{ p: 2, flex: '1 1 300px' }}>
//             <Typography variant="h6" gutterBottom>Permissions disponibles</Typography>
//             <TableContainer>
//               <Table size="small">
//                 <TableHead>
//                   <TableRow>
//                     <TableCell>Nom</TableCell>
//                     <TableCell>Description</TableCell>
//                   </TableRow>
//                 </TableHead>
//                 <TableBody>
//                   {availablePermissions?.map((permission) => (
//                     <TableRow key={permission.id}>
//                       <TableCell>{permission.name}</TableCell>
//                       <TableCell>{permission.description}</TableCell>
//                     </TableRow>
//                   ))}
//                 </TableBody>
//               </Table>
//             </TableContainer>
//           </Paper>
//         </Box>

//         <Dialog open={openDialog} onClose={handleCloseDialog}>
//           <form onSubmit={handleSaveRole}>
//             <DialogTitle>{currentRole ? 'Modifier le rôle' : 'Ajouter un rôle'}</DialogTitle>
//             <DialogContent>
//               <TextField
//                 autoFocus
//                 margin="dense"
//                 name="name"
//                 label="Nom du rôle"
//                 type="text"
//                 fullWidth
//                 variant="outlined"
//                 defaultValue={currentRole?.name || ''}
//                 required
//               />
//                 <TextField
//                 margin="dense"
//                 name="description"
//                 label="Description"
//                 type="text"
//                 fullWidth
//                 variant="outlined"
//                 defaultValue={currentRole?.description || ''}
//               />
//               <Typography variant="subtitle1" sx={{ mt: 2, mb: 1 }}>Permissions :</Typography>
//               {availablePermissions?.map((permission) => (
//                 <FormControlLabel
//                   key={permission.id}
//                   control={
//                     <Checkbox
//                       name={permission.name}
//                       defaultChecked={currentRole?.permissions.includes(permission.name)}
//                     />
//                   }
//                   label={permission.name.toLowerCase()}
//                 />
//               ))}
//             </DialogContent>
//             <DialogActions>
//               <Button onClick={handleCloseDialog}>Annuler</Button>
//               <Button type="submit" variant="contained">Sauvegarder</Button>
//             </DialogActions>
//           </form>
//         </Dialog>

//         <Snackbar 
//           open={snackbar.open} 
//           autoHideDuration={6000} 
//           onClose={() => setSnackbar({ ...snackbar, open: false })}
//         >
//           <Alert severity={snackbar.severity} sx={{ width: '100%' }}>
//             {snackbar.message}
//           </Alert>
//         </Snackbar>
//       </Box>
//    );
// }






/////////////////////////////







import React, { useMemo, useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Checkbox,
  FormControlLabel,
  Snackbar,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Grid,
  // Card,
  // CardContent,
  // CardActions,
  Tooltip,
  Divider,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  // Security as SecurityIcon,
} from '@mui/icons-material';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { useQuery } from 'react-query';
import roleService, { CreateRoleDto, RoleResponse, UpdateRoleDto } from '../services/role.service';
import { errorHandler } from '../../../handlers/errorHandler';

interface Role {
  id: number;
  name: string;
  description?: string;
  permissions: string[];
}

const rolePipe = (rolesResponse: RoleResponse[] | undefined): Role[] => {
  if (rolesResponse) {
      const permissiosn= rolesResponse?.map((role) => ({
      ...role,
      permissions: role.rolePermissions?.map((rolePermission) => rolePermission.permission.name) as string[]
    }));
     return permissiosn
  }
  return [];
};

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function RolePermissionManagement() {
  const [openDialog, setOpenDialog] = useState(false);
  const [currentRole, setCurrentRole] = useState<Role | null>(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' as 'success' | 'error' });
  const { data: roleResponse, refetch: refetchRoles } = useQuery('roles', async () => await roleService.getRoles());
  const { data: availablePermissions } = useQuery('permissions', async () => await roleService.getPermissions());
  const roles = useMemo(()=>rolePipe(roleResponse),[roleResponse])
  // const availablePermissions =useMemo(()=>{},[permissions])
  console.log({roles})
  const handleOpenDialog = (role: Role | null = null) => {
    setCurrentRole(role);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setCurrentRole(null);
  };

  const handleSaveRole = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const roleData = {
      name: formData.get('name') as string,
      description: formData.get('description') as string,
      permissions: availablePermissions
        ?.filter((permission) => formData.get(permission.name) === 'on')
        ?.map((permission) => permission.id),
    };

    try {
      if (currentRole) {
        await roleService.updateRole(currentRole.id, roleData as UpdateRoleDto);
        setSnackbar({ open: true, message: 'Rôle modifié avec succès', severity: 'success' });
      } else {
        await roleService.createRole(roleData as CreateRoleDto);
        setSnackbar({ open: true, message: 'Nouveau rôle ajouté avec succès', severity: 'success' });
      }
      refetchRoles();
    } catch (error) {
      errorHandler(error);
      setSnackbar({ open: true, message: 'Une erreur est survenue', severity: 'error' });
    }

    handleCloseDialog();
  };

  const handleDeleteRole = async (id: number) => {
    try {
      await roleService.deleteRole(id);
      setSnackbar({ open: true, message: 'Rôle supprimé avec succès', severity: 'success' });
      refetchRoles();
    } catch (error) {
      errorHandler(error);
      setSnackbar({ open: true, message: 'Une erreur est survenue lors de la suppression', severity: 'error' });
    }
  };

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Gestion des Rôles et Permissions
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 2, height: '100%' }}>
            <Typography variant="h6" gutterBottom>
              Rôles existants
            </Typography>
            <List>
              {roles?.map((role) => (
                <ListItem key={role.id} divider>
                  <ListItemText
                    primary={role.name}
                    secondary={
                      <React.Fragment>
                        <Typography component="span" variant="body2" color="text.primary">
                          {role.description}
                        </Typography>
                        <br />
                        {role?.permissions.map((permission) => (
                          <Chip
                            key={permission}
                            label={permission}
                            size="small"
                            sx={{ mr: 0.5, mt: 0.5 }}
                          />
                        ))}
                      </React.Fragment>
                    }
                  />
                  <ListItemSecondaryAction>
                    <Tooltip title="Modifier">
                      <IconButton edge="end" aria-label="edit" onClick={() => handleOpenDialog(role)}>
                        <EditIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Supprimer">
                      <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteRole(role.id)}>
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
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
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 2, height: '100%' }}>
            <Typography variant="h6" gutterBottom>
              Permissions disponibles
            </Typography>
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
        </Grid>
      </Grid>

      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
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
              multiline
              rows={2}
            />
            <Typography variant="subtitle1" sx={{ mt: 2, mb: 1 }}>
              Permissions :
            </Typography>
            <Divider />
            <Grid container spacing={2} sx={{ mt: 1 }}>
              {availablePermissions?.map((permission) => (
                <Grid item xs={12} sm={6} md={4} key={permission.id}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        name={permission.name}
                        defaultChecked={currentRole?.permissions.includes(permission.name)}
                      />
                    }
                    label={
                      <Tooltip title={permission.description}>
                        <Typography variant="body2">{permission.name}</Typography>
                      </Tooltip>
                    }
                  />
                </Grid>
              ))}
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Annuler</Button>
            <Button type="submit" variant="contained">
              Sauvegarder
            </Button>
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