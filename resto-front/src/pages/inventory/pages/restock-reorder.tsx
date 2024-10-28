import React, { useState, useEffect } from 'react';
import {
  Box, Typography, Button, Dialog, DialogTitle, DialogContent,
  DialogActions, TextField, Select, MenuItem, InputLabel, FormControl,
  Snackbar, IconButton, Tooltip, Paper, Chip, Grid,
  useTheme
} from '@mui/material';
import { DataGrid, GridColDef, GridRenderCellParams, GridToolbar } from '@mui/x-data-grid';
import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon, ShoppingCart as ShoppingCartIcon } from '@mui/icons-material';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { hexToRgba } from '../../../utils/utils';

 
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

interface RestockOrder {
  id: number;
  itemId: number;
  itemName: string;
  quantity: number;
  unit: string;
  orderDate: string;
  status: 'En attente' | 'Commandé' | 'Reçu';
  expectedDeliveryDate: string;
}

const initialInventory: InventoryItem[] = [
  { id: 1, name: "Bœuf haché", category: "Viandes", quantity: 15, unit: "kg", minThreshold: 20, maxThreshold: 100, lastRestockDate: "2023-04-20" },
  { id: 2, name: "Pommes de terre", category: "Légumes", quantity: 40, unit: "kg", minThreshold: 50, maxThreshold: 300, lastRestockDate: "2023-04-18" },
  { id: 3, name: "Pain burger", category: "Boulangerie", quantity: 80, unit: "pièces", minThreshold: 100, maxThreshold: 1000, lastRestockDate: "2023-04-22" },
  { id: 4, name: "Sauce tomate", category: "Condiments", quantity: 8, unit: "L", minThreshold: 10, maxThreshold: 50, lastRestockDate: "2023-04-15" },
  { id: 5, name: "Fromage cheddar", category: "Produits laitiers", quantity: 5, unit: "kg", minThreshold: 10, maxThreshold: 40, lastRestockDate: "2023-04-19" },
];

const initialRestockOrders: RestockOrder[] = [
  { id: 1, itemId: 1, itemName: "Bœuf haché", quantity: 30, unit: "kg", orderDate: "2023-04-25", status: "Commandé", expectedDeliveryDate: "2023-04-28" },
  { id: 2, itemId: 4, itemName: "Sauce tomate", quantity: 20, unit: "L", orderDate: "2023-04-26", status: "En attente", expectedDeliveryDate: "2023-04-30" },
];

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function RestockOrderManagement() {
  const [inventory, setInventory] = useState<InventoryItem[]>(initialInventory);
  const [restockOrders, setRestockOrders] = useState<RestockOrder[]>(initialRestockOrders);
  const [openDialog, setOpenDialog] = useState(false);
  const [currentOrder, setCurrentOrder] = useState<RestockOrder | null>(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' as 'success' | 'error' });
  const {palette}=useTheme()
  useEffect(() => {
    const lowStockItems = inventory.filter(item => item.quantity <= item.minThreshold);
    const newRestockOrders = lowStockItems
      .filter(item => !restockOrders.some(order => order.itemId === item.id && order.status !== 'Reçu'))
      .map(item => ({
        id: Date.now() + item.id,
        itemId: item.id,
        itemName: item.name,
        quantity: item.maxThreshold - item.quantity,
        unit: item.unit,
        orderDate: new Date().toISOString().split('T')[0],
        status: 'En attente' as const,
        expectedDeliveryDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      }));
    setRestockOrders(prevOrders => [...prevOrders, ...newRestockOrders]);
  }, [inventory]);

  const handleOpenDialog = (order: RestockOrder | null = null) => {
    setCurrentOrder(order);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setCurrentOrder(null);
  };

  const handleSaveOrder = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const newOrder: RestockOrder = {
      id: currentOrder ? currentOrder.id : Date.now(),
      itemId: Number(formData.get('itemId')),
      itemName: inventory.find(item => item.id === Number(formData.get('itemId')))?.name || '',
      quantity: Number(formData.get('quantity')),
      unit: inventory.find(item => item.id === Number(formData.get('itemId')))?.unit || '',
      orderDate: formData.get('orderDate') as string,
      status: formData.get('status') as RestockOrder['status'],
      expectedDeliveryDate: formData.get('expectedDeliveryDate') as string,
    };

    if (currentOrder) {
      setRestockOrders(restockOrders.map(order => order.id === currentOrder.id ? newOrder : order));
      setSnackbar({ open: true, message: 'Commande modifiée avec succès', severity: 'success' });
    } else {
      setRestockOrders([...restockOrders, newOrder]);
      setSnackbar({ open: true, message: 'Nouvelle commande ajoutée avec succès', severity: 'success' });
    }
    handleCloseDialog();
  };

  const handleDeleteOrder = (id: number) => {
    setRestockOrders(restockOrders.filter(order => order.id !== id));
    setSnackbar({ open: true, message: 'Commande supprimée avec succès', severity: 'success' });
  };

  const handleReceiveOrder = (order: RestockOrder) => {
    const updatedInventory = inventory.map(item => {
      if (item.id === order.itemId) {
        return { ...item, quantity: item.quantity + order.quantity, lastRestockDate: new Date().toISOString().split('T')[0] };
      }
      return item;
    });
    setInventory(updatedInventory);
    
    const updatedOrders = restockOrders.map(o => {
      if (o.id === order.id) {
        return { ...o, status: 'Reçu' };
      }
      return o;
    });
    //@ts-ignore
    setRestockOrders(updatedOrders);
    
    setSnackbar({ open: true, message: 'Commande reçue et inventaire mis à jour', severity: 'success' });
  };

  const columns: GridColDef[] = [
    { field: 'itemName', headerName: 'Article', flex:2 },
    // { field: 'quantity', headerName: 'Quantité', width: 120, valueFormatter: (params) => `${params.value} ${params.row.unit}` },
    { field: 'orderDate', headerName: 'Date de commande',flex:1},
    { field: 'expectedDeliveryDate', headerName: 'Livraison prévue', flex:1},
    { 
      field: 'status', 
      headerName: 'Statut', 
      flex:1,
      renderCell: (params: GridRenderCellParams) => (
        <Chip 
          label={params.value} 
          color={params.value === 'En attente' ? 'warning' : params.value === 'Commandé' ? 'info' : 'success'}
        />
      ),
    },
    {
      field: 'actions',
      headerName: 'Actions',
      flex:1,
      renderCell: (params: GridRenderCellParams) => (
        <Box>
          <IconButton onClick={() => handleOpenDialog(params.row)} size="small">
            <EditIcon />
          </IconButton>
          <IconButton onClick={() => handleDeleteOrder(params.row.id)} size="small">
            <DeleteIcon />
          </IconButton>
          {params.row.status !== 'Reçu' && (
            <Tooltip title="Marquer comme reçu">
              <IconButton onClick={() => handleReceiveOrder(params.row)} size="small" color="primary">
                <ShoppingCartIcon />
              </IconButton>
            </Tooltip>
          )}
        </Box>
      ),
    },
  ];

  return (
     
      <Box sx={{ flexGrow: 1, p: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Gestion des Commandes de Réapprovisionnement
        </Typography>
        
        <Grid container spacing={3} sx={{ mb: 3 }}>
          <Grid item xs={12} md={4}>
            <Paper elevation={3} sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>Commandes en attente</Typography>
              <Typography variant="h4">{restockOrders.filter(order => order.status === 'En attente').length}</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper elevation={3} sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>Commandes en cours</Typography>
              <Typography variant="h4">{restockOrders.filter(order => order.status === 'Commandé').length}</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper elevation={3} sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>Commandes reçues</Typography>
              <Typography variant="h4">{restockOrders.filter(order => order.status === 'Reçu').length}</Typography>
            </Paper>
          </Grid>
        </Grid>

        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpenDialog()}
          sx={{ mb: 2 }}
        >
          Nouvelle commande
        </Button>

        <DataGrid
          rows={restockOrders}
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
              backgroundColor:hexToRgba(palette.primary.light,0.3),
            },
            '& .MuiButton-root': {
              color: 'primary.main',
            },
          }}
        />

        <Dialog open={openDialog} onClose={handleCloseDialog}>
          <form onSubmit={handleSaveOrder}>
            <DialogTitle>{currentOrder ? 'Modifier la commande' : 'Nouvelle commande'}</DialogTitle>
            <DialogContent>
              <FormControl fullWidth margin="dense">
                <InputLabel id="item-select-label">Article</InputLabel>
                <Select
                  labelId="item-select-label"
                  name="itemId"
                  value={currentOrder?.itemId || ''}
                  label="Article"
                  required
                >
                  {inventory.map((item) => (
                    <MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>
                  ))}
                </Select>
              </FormControl>
              <TextField
                margin="dense"
                name="quantity"
                label="Quantité"
                type="number"
                fullWidth
                variant="outlined"
                defaultValue={currentOrder?.quantity || ''}
                required
              />
              <TextField
                margin="dense"
                name="orderDate"
                label="Date de commande"
                type="date"
                fullWidth
                variant="outlined"
                defaultValue={currentOrder?.orderDate || new Date().toISOString().split('T')[0]}
                required
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <TextField
                margin="dense"
                name="expectedDeliveryDate"
                label="Date de livraison prévue"
                type="date"
                fullWidth
                variant="outlined"
                defaultValue={currentOrder?.expectedDeliveryDate || new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]}
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
                  value={currentOrder?.status || 'En attente'}
                  label="Statut"
                  required
                >
                  <MenuItem value="En attente">En attente</MenuItem>
                  <MenuItem value="Commandé">Commandé</MenuItem>
                  <MenuItem value="Reçu">Reçu</MenuItem>
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