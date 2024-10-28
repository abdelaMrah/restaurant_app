import React, { useState } from 'react';
import {
 Box, Typography, Button, Dialog, DialogTitle, DialogContent,
  DialogActions, TextField, Checkbox, FormControlLabel, Snackbar, Paper,
  List, ListItem, ListItemText, ListItemSecondaryAction, IconButton,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow
} from '@mui/material';
import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import MuiAlert, { AlertProps } from '@mui/material/Alert';

  

interface Role {
  id: number;
  name: string;
  permissions: string[];
}

interface Permission {
  id: string;
  name: string;
  description: string;
}

const initialRoles: Role[] = [
  { id: 1, name: "Administrateur", permissions: ["manage_staff", "manage_menu", "manage_inventory", "view_reports"] },
  { id: 2, name: "Manager", permissions: ["manage_staff", "manage_menu", "view_reports"] },
  { id: 3, name: "Serveur", permissions: ["view_menu", "take_orders"] },
  { id: 4, name: "Cuisinier", permissions: ["view_menu", "update_inventory"] },
];

const availablePermissions: Permission[] = [
  { id: "manage_staff", name: "Gérer le personnel", description: "Ajouter, modifier et supprimer des employés" },
  { id: "manage_menu", name: "Gérer le menu", description: "Ajouter, modifier et supprimer des articles du menu" },
  { id: "manage_inventory", name: "Gérer l'inventaire", description: "Gérer les stocks et les commandes" },
  { id: "view_reports", name: "Voir les rapports", description: "Accéder aux rapports financiers et d'activité" },
  { id: "view_menu", name: "Voir le menu", description: "Consulter le menu du restaurant" },
  { id: "take_orders", name: "Prendre les commandes", description: "Enregistrer les commandes des clients" },
  { id: "update_inventory", name: "Mettre à jour l'inventaire", description: "Mettre à jour les quantités en stock" },
];

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function RolePermissionManagement() {
  const [roles, setRoles] = useState<Role[]>(initialRoles);
  const [openDialog, setOpenDialog] = useState(false);
  const [currentRole, setCurrentRole] = useState<Role | null>(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' as 'success' | 'error' });

  const handleOpenDialog = (role: Role | null = null) => {
    setCurrentRole(role);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setCurrentRole(null);
  };

  const handleSaveRole = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const newRole: Role = {
      id: currentRole ? currentRole.id : Date.now(),
      name: formData.get('name') as string,
      permissions: availablePermissions
        .filter(permission => formData.get(permission.id) === 'on')
        .map(permission => permission.id),
    };

    if (currentRole) {
      setRoles(roles.map(role => role.id === currentRole.id ? newRole : role));
      setSnackbar({ open: true, message: 'Rôle modifié avec succès', severity: 'success' });
    } else {
      setRoles([...roles, newRole]);
      setSnackbar({ open: true, message: 'Nouveau rôle ajouté avec succès', severity: 'success' });
    }
    handleCloseDialog();
  };

  const handleDeleteRole = (id: number) => {
    setRoles(roles.filter(role => role.id !== id));
    setSnackbar({ open: true, message: 'Rôle supprimé avec succès', severity: 'success' });
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
                  {availablePermissions.map((permission) => (
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
              <Typography variant="subtitle1" sx={{ mt: 2, mb: 1 }}>Permissions :</Typography>
              {availablePermissions.map((permission) => (
                <FormControlLabel
                  key={permission.id}
                  control={
                    <Checkbox
                      name={permission.id}
                      defaultChecked={currentRole?.permissions.includes(permission.id)}
                    />
                  }
                  label={permission.name}
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