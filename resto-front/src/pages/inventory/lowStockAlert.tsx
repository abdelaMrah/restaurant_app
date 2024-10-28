import React, { useState, useEffect } from 'react';
import {
Box, Typography, Button, Dialog, DialogTitle, DialogContent,
  DialogActions, Snackbar, IconButton, Paper, List, ListItem,
  ListItemText, Chip
} from '@mui/material';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import {  Notifications as NotificationsIcon, Close as CloseIcon } from '@mui/icons-material';
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

interface LowStockAlert {
  id: number;
  itemId: number;
  itemName: string;
  currentQuantity: number;
  minThreshold: number;
  unit: string;
  dateCreated: string;
  status: 'Nouveau' | 'Vu' | 'Résolu';
}

const initialInventory: InventoryItem[] = [
  { id: 1, name: "Bœuf haché", category: "Viandes", quantity: 15, unit: "kg", minThreshold: 20, maxThreshold: 100, lastRestockDate: "2023-04-20" },
  { id: 2, name: "Pommes de terre", category: "Légumes", quantity: 40, unit: "kg", minThreshold: 50, maxThreshold: 300, lastRestockDate: "2023-04-18" },
  { id: 3, name: "Pain burger", category: "Boulangerie", quantity: 80, unit: "pièces", minThreshold: 100, maxThreshold: 1000, lastRestockDate: "2023-04-22" },
  { id: 4, name: "Sauce tomate", category: "Condiments", quantity: 8, unit: "L", minThreshold: 10, maxThreshold: 50, lastRestockDate: "2023-04-15" },
  { id: 5, name: "Fromage cheddar", category: "Produits laitiers", quantity: 5, unit: "kg", minThreshold: 10, maxThreshold: 40, lastRestockDate: "2023-04-19" },
];

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function LowStockAlerts() {
  const [inventory, setInventory] = useState<InventoryItem[]>(initialInventory);
  const [alerts, setAlerts] = useState<LowStockAlert[]>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [currentAlert, setCurrentAlert] = useState<LowStockAlert | null>(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' as 'success' | 'error' });

  useEffect(() => {
    checkLowStock();
  }, [inventory]);

  const checkLowStock = () => {
    const newAlerts = inventory
      .filter(item => item.quantity <= item.minThreshold)
      .map(item => ({
        id: Date.now() + item.id,
        itemId: item.id,
        itemName: item.name,
        currentQuantity: item.quantity,
        minThreshold: item.minThreshold,
        unit: item.unit,
        dateCreated: new Date().toISOString(),
        status: 'Nouveau' as const,
      }));

    setAlerts(prevAlerts => {
      const existingAlertIds = prevAlerts.map(alert => alert.itemId);
      return [
        ...prevAlerts,
        ...newAlerts.filter(alert => !existingAlertIds.includes(alert.itemId))
      ];
    });
  };

  const handleOpenDialog = (alert: LowStockAlert) => {
    setCurrentAlert(alert);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setCurrentAlert(null);
  };

  const handleUpdateAlertStatus = (alertId: number, newStatus: LowStockAlert['status']) => {
    setAlerts(prevAlerts =>
      prevAlerts.map(alert =>
        alert.id === alertId ? { ...alert, status: newStatus } : alert
      )
    );
    setSnackbar({ open: true, message: `Alerte marquée comme ${newStatus}`, severity: 'success' });
    handleCloseDialog();
  };

  const handleDismissAlert = (alertId: number) => {
    setAlerts(prevAlerts => prevAlerts.filter(alert => alert.id !== alertId));
    setSnackbar({ open: true, message: 'Alerte supprimée', severity: 'success' });
  };

  const columns: GridColDef[] = [
    { field: 'itemName', headerName: 'Article', width: 200 },
    { 
      field: 'currentQuantity', 
      headerName: 'Quantité actuelle', 
      width: 150,
      renderCell: (params: GridRenderCellParams) => (
        <Typography color="error">
          {params.value} {params.row.unit}
        </Typography>
      ),
    },
    { 
      field: 'minThreshold', 
      headerName: 'Seuil minimum', 
      width: 150,
      renderCell: (params: GridRenderCellParams) => (
        <Typography>
          {params.value} {params.row.unit}
        </Typography>
      ),
    },
    { field: 'dateCreated', headerName: 'Date de création', width: 200 },
    { 
      field: 'status', 
      headerName: 'Statut', 
      width: 120,
      renderCell: (params: GridRenderCellParams) => (
        <Chip 
          label={params.value} 
          color={params.value === 'Nouveau' ? 'error' : params.value === 'Vu' ? 'warning' : 'success'}
        />
      ),
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 200,
      renderCell: (params: GridRenderCellParams) => (
        <Box>
          <Button
            variant="outlined"
            size="small"
            onClick={() => handleOpenDialog(params.row)}
            startIcon={<NotificationsIcon />}
          >
            Détails
          </Button>
          <IconButton onClick={() => handleDismissAlert(params.row.id)} size="small">
            <CloseIcon />
          </IconButton>
        </Box>
      ),
    },
  ];

  return (
    
      <Box sx={{ flexGrow: 1, p: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Alertes de Stock Bas
        </Typography>
        
        <Paper elevation={3} sx={{ p: 2, mb: 3 }}>
          <Typography variant="h6" gutterBottom>Résumé des alertes</Typography>
          <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
            <Box>
              <Typography variant="subtitle1">Nouvelles alertes</Typography>
              <Typography variant="h4" color="error">
                {alerts.filter(alert => alert.status === 'Nouveau').length}
              </Typography>
            </Box>
            <Box>
              <Typography variant="subtitle1">Alertes vues</Typography>
              <Typography variant="h4" color="warning.main">
                {alerts.filter(alert => alert.status === 'Vu').length}
              </Typography>
            </Box>
            <Box>
              <Typography variant="subtitle1">Alertes résolues</Typography>
              <Typography variant="h4" color="success.main">
                {alerts.filter(alert => alert.status === 'Résolu').length}
              </Typography>
            </Box>
          </Box>
        </Paper>

        <DataGrid
          rows={alerts}
          columns={columns}
         
          sx={{
            '& .MuiDataGrid-cell:focus': {
              outline: 'none',
            },
          }}
        />

        <Dialog open={openDialog} onClose={handleCloseDialog}>
          <DialogTitle>Détails de l'alerte</DialogTitle>
          <DialogContent>
            {currentAlert && (
              <List>
                <ListItem>
                  <ListItemText primary="Article" secondary={currentAlert.itemName} />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Quantité actuelle" secondary={`${currentAlert.currentQuantity} ${currentAlert.unit}`} />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Seuil minimum" secondary={`${currentAlert.minThreshold} ${currentAlert.unit}`} />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Date de création" secondary={new Date(currentAlert.dateCreated).toLocaleString()} />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Statut" secondary={currentAlert.status} />
                </ListItem>
              </List>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Fermer</Button>
            {currentAlert && currentAlert.status !== 'Résolu' && (
              <Button 
                onClick={() => handleUpdateAlertStatus(currentAlert.id, currentAlert.status === 'Nouveau' ? 'Vu' : 'Résolu')} 
                color="primary"
              >
                Marquer comme {currentAlert.status === 'Nouveau' ? 'Vu' : 'Résolu'}
              </Button>
            )}
          </DialogActions>
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