import React, { useState } from 'react';
import {
  Box, Typography, Button, Dialog, DialogTitle, DialogContent,
  DialogActions, TextField,
  Snackbar, IconButton, Tooltip, Paper
} from '@mui/material';
import { DataGrid, GridColDef, GridRenderCellParams, GridToolbar } from '@mui/x-data-grid';
import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon, Warning as WarningIcon } from '@mui/icons-material';
import MuiAlert, { AlertProps } from '@mui/material/Alert';

 
interface InventoryItem {
  id: number;
  name: string;
  category: string;
  quantity: number;
  unit: string;
  minThreshold: number;
  maxThreshold: number;
  lastRestockDate: string;
}

const initialInventory: InventoryItem[] = [
  { id: 1, name: "Bœuf haché", category: "Viandes", quantity: 50, unit: "kg", minThreshold: 20, maxThreshold: 100, lastRestockDate: "2023-04-20" },
  { id: 2, name: "Pommes de terre", category: "Légumes", quantity: 200, unit: "kg", minThreshold: 50, maxThreshold: 300, lastRestockDate: "2023-04-18" },
  { id: 3, name: "Pain burger", category: "Boulangerie", quantity: 500, unit: "pièces", minThreshold: 100, maxThreshold: 1000, lastRestockDate: "2023-04-22" },
  { id: 4, name: "Sauce tomate", category: "Condiments", quantity: 30, unit: "L", minThreshold: 10, maxThreshold: 50, lastRestockDate: "2023-04-15" },
  { id: 5, name: "Fromage cheddar", category: "Produits laitiers", quantity: 25, unit: "kg", minThreshold: 10, maxThreshold: 40, lastRestockDate: "2023-04-19" },
];

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function InventoryManagement() {
  const [inventory, setInventory] = useState<InventoryItem[]>(initialInventory);
  const [openDialog, setOpenDialog] = useState(false);
  const [currentItem, setCurrentItem] = useState<InventoryItem | null>(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' as 'success' | 'error' });

  const handleOpenDialog = (item: InventoryItem | null = null) => {
    setCurrentItem(item);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setCurrentItem(null);
  };

  const handleSaveItem = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const newItem: InventoryItem = {
      id: currentItem ? currentItem.id : Date.now(),
      name: formData.get('name') as string,
      category: formData.get('category') as string,
      quantity: Number(formData.get('quantity')),
      unit: formData.get('unit') as string,
      minThreshold: Number(formData.get('minThreshold')),
      maxThreshold: Number(formData.get('maxThreshold')),
      lastRestockDate: formData.get('lastRestockDate') as string,
    };

    if (currentItem) {
      setInventory(inventory.map(item => item.id === currentItem.id ? newItem : item));
      setSnackbar({ open: true, message: 'Article modifié avec succès', severity: 'success' });
    } else {
      setInventory([...inventory, newItem]);
      setSnackbar({ open: true, message: 'Nouvel article ajouté avec succès', severity: 'success' });
    }
    handleCloseDialog();
  };

  const handleDeleteItem = (id: number) => {
    setInventory(inventory.filter(item => item.id !== id));
    setSnackbar({ open: true, message: 'Article supprimé avec succès', severity: 'success' });
  };

  const getStockStatus = (item: InventoryItem) => {
    if (item.quantity <= item.minThreshold) return 'low';
    if (item.quantity >= item.maxThreshold) return 'high';
    return 'normal';
  };

  const columns: GridColDef[] = [
    { field: 'name', headerName: 'Nom', flex:2},
    { field: 'category', headerName: 'Catégorie',flex:1 },
    { 
      field: 'quantity', 
      headerName: 'Quantité', 
      width: 120,
      renderCell: (params: GridRenderCellParams) => (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {params.value} {params.row.unit}
          {getStockStatus(params.row) === 'low' && (
            <Tooltip title="Stock bas">
              <WarningIcon color="error" sx={{ ml: 1 }} />
            </Tooltip>
          )}
          {getStockStatus(params.row) === 'high' && (
            <Tooltip title="Stock élevé">
              <WarningIcon color="warning" sx={{ ml: 1 }} />
            </Tooltip>
          )}
        </Box>
      ),
    },
    { field: 'minThreshold', headerName: 'Seuil Min',flex:1 },
    { field: 'maxThreshold', headerName: 'Seuil Max',flex:1 },
    { field: 'lastRestockDate', headerName: 'Dernier Réapprovisionnement',flex:1.5 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
      renderCell: (params: GridRenderCellParams) => (
        <Box>
          <IconButton onClick={() => handleOpenDialog(params.row)} size="small">
            <EditIcon />
          </IconButton>
          <IconButton onClick={() => handleDeleteItem(params.row.id)} size="small">
            <DeleteIcon />
          </IconButton>
        </Box>
      ),
    },
  ];

  return (
 
      <Box sx={{ flexGrow: 1, p: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Gestion de l'Inventaire
        </Typography>
        
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpenDialog()}
          sx={{ mb: 2 }}
        >
          Ajouter un article
        </Button>

        <Paper elevation={3} sx={{ mb: 3, p: 2 }}>
          <Typography variant="h6" gutterBottom>Résumé de l'inventaire</Typography>
          <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
            <Box>
              <Typography variant="subtitle1">Total des articles</Typography>
              <Typography variant="h4">{inventory.length}</Typography>
            </Box>
            <Box>
              <Typography variant="subtitle1">Articles en stock bas</Typography>
              <Typography variant="h4" color="error">
                {inventory.filter(item => getStockStatus(item) === 'low').length}
              </Typography>
            </Box>
            <Box>
              <Typography variant="subtitle1">Articles en surstock</Typography>
              <Typography variant="h4" color="warning.main">
                {inventory.filter(item => getStockStatus(item) === 'high').length}
              </Typography>
            </Box>
          </Box>
        </Paper>

        <DataGrid
          rows={inventory}
          columns={columns}
 
          
          slots={{
            toolbar: GridToolbar,
          }}
          slotProps={{
            toolbar: {
              showQuickFilter: true,
              quickFilterProps: { debounceMs: 500 },
            },
          }}
          sx={{
            '& .MuiDataGrid-toolbarContainer': {
              padding: '8px',
              backgroundColor: 'rgba(255, 107, 107, 0.08)',
            },
            '& .MuiButton-root': {
              color: 'primary.main',
            },
          }}
        />

        <Dialog open={openDialog} onClose={handleCloseDialog}>
          <form onSubmit={handleSaveItem}>
            <DialogTitle>{currentItem ? 'Modifier l\'article' : 'Ajouter un article'}</DialogTitle>
            <DialogContent>
              <TextField
                autoFocus
                margin="dense"
                name="name"
                label="Nom de l'article"
                type="text"
                fullWidth
                variant="outlined"
                defaultValue={currentItem?.name || ''}
                required
              />
              <TextField
                margin="dense"
                name="category"
                label="Catégorie"
                type="text"
                fullWidth
                variant="outlined"
                defaultValue={currentItem?.category || ''}
                required
              />
              <TextField
                margin="dense"
                name="quantity"
                label="Quantité"
                type="number"
                fullWidth
                variant="outlined"
                defaultValue={currentItem?.quantity || ''}
                required
              />
              <TextField
                margin="dense"
                name="unit"
                label="Unité"
                type="text"
                fullWidth
                variant="outlined"
                defaultValue={currentItem?.unit || ''}
                required
              />
              <TextField
                margin="dense"
                name="minThreshold"
                label="Seuil Minimum"
                type="number"
                fullWidth
                variant="outlined"
                defaultValue={currentItem?.minThreshold || ''}
                required
              />
              <TextField
                margin="dense"
                name="maxThreshold"
                label="Seuil Maximum"
                type="number"
                fullWidth
                variant="outlined"
                defaultValue={currentItem?.maxThreshold || ''}
                required
              />
              <TextField
                margin="dense"
                name="lastRestockDate"
                label="Date du dernier réapprovisionnement"
                type="date"
                fullWidth
                variant="outlined"
                defaultValue={currentItem?.lastRestockDate || new Date().toISOString().split('T')[0]}
                required
                InputLabelProps={{
                  shrink: true,
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
   );
}