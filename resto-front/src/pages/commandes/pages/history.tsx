import  { useState } from 'react';
import { 
  Box, Typography, Button, Card, CardContent,
  Chip, Dialog, DialogTitle, DialogContent, DialogActions,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  useTheme,
  Palette
} from '@mui/material';
import { DataGrid, GridColDef, GridRenderCellParams, GridToolbar } from '@mui/x-data-grid';
import { Info as InfoIcon } from '@mui/icons-material';
import { hexToRgba } from '../../../utils/utils';


interface OrderItem {
  id: number;
  name: string;
  quantity: number;
  price: number;
}

interface Order {
  id: number;
  items: OrderItem[];
  status: 'Terminée' | 'Annulée';
  tableNumber: number;
  date: string;
  total: number;
}
const initialOrderHistory: Order[] = [
  {
    id: 1001,
    items: [
      { id: 1, name: "Burger Classic", quantity: 2, price: 8.99 },
      { id: 3, name: "Frites", quantity: 2, price: 3.99 },
    ],
    status: 'Terminée',
    tableNumber: 3,
    date: '2023-04-15 12:30',
    total: 25.96
  },
  {
    id: 1002,
    items: [
      { id: 5, name: "Salade César", quantity: 1, price: 7.99 },
      { id: 4, name: "Soda", quantity: 1, price: 2.99 },
    ],
    status: 'Terminée',
    tableNumber: 5,
    date: '2023-04-15 13:45',
    total: 10.98
  },
  {
    id: 1003,
    items: [
      { id: 2, name: "Cheeseburger", quantity: 1, price: 9.99 },
      { id: 6, name: "Nuggets (6 pcs)", quantity: 1, price: 5.99 },
      { id: 7, name: "Milkshake", quantity: 2, price: 4.99 },
    ],
    status: 'Annulée',
    tableNumber: 2,
    date: '2023-04-15 14:20',
    total: 25.96
  },
];
const getColor=(palette:Palette,status:Order['status']):string=>{
  switch(status){
    case 'Terminée':{
      return palette.primary.light
    }
    case 'Annulée':{
      return palette.error.main
    }
    default : {
      return palette.grey[300]
    }
    
  }
}
export default function OrderHistory() {
  const [orderHistory, _setOrderHistory] = useState<Order[]>(initialOrderHistory);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const {palette} = useTheme();
  const handleOpenDialog = (order: Order) => {
    setSelectedOrder(order);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'Terminée':
        return 'success';
      case 'Annulée':
        return 'error';
      default:
        return 'default';
    }
  };

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'N° Commande', flex:1 },
    { field: 'date', headerName: 'Date', flex:1},
    { field: 'tableNumber', headerName: 'Table', flex:1 },
    { 
      field: 'items', 
      headerName: 'Articles', 
      flex:2,
      valueGetter: (params:OrderItem[]) => params.map((item: OrderItem) => `${item.quantity}x ${item.name}`).join(', ')
    },
    { 
      field: 'total', 
      headerName: 'Total', 
      flex:1,
      type:'string',
      valueFormatter: (params:number) => `${params.toFixed(2)} DA`
    
    },
    { 
      field: 'status', 
      headerName: 'Statut', 
      flex:1,
      renderCell: (params: GridRenderCellParams) => (
        <Chip 
          label={params.value} 
          variant='outlined'
          color={getStatusColor(params.value as Order['status'])}
          sx={{
            bgcolor:hexToRgba(
              getColor(palette,params.value)
              ,
              0.1
            )
          }}
          size="small"
        />
      )
    },
    {
      field: 'actions',
      headerName: 'Actions',
      flex:1,
      renderCell: (params: GridRenderCellParams) => (
        <Button
          startIcon={<InfoIcon />}
          size="small"
          variant='text'
          sx={{bgcolor:hexToRgba(palette.primary.main,0.1)}}
          onClick={() => handleOpenDialog(params.row)}
        >
          Détails
        </Button>
      )
    },
  ];

  return (
      <Box sx={{ flexGrow: 1, p: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Historique des Commandes
        </Typography>
        
        <Card>
          <CardContent>
            <DataGrid
              rows={orderHistory}
              columns={columns}
              slots={{
                toolbar:GridToolbar
              }}
              slotProps={{
                toolbar:{
                    showQuickFilter: true,
                    quickFilterProps:{debounceMs:500}
                }
              }}
              sx={{
                '& .MuiDataGrid-toolbarContainer': {
                  padding: '8px',
                  backgroundColor: hexToRgba(palette.primary.light,0.3),
                },
                '& .MuiButton-root': {
                  color: 'primary.main',
                },
              }}
              
            />
          </CardContent>
        </Card>

        <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
          <DialogTitle>Détails de la commande #{selectedOrder?.id}</DialogTitle>
          <DialogContent>
            {selectedOrder && (
              <Box>
                <Typography variant="subtitle1">Date: {selectedOrder.date}</Typography>
                <Typography variant="subtitle1">Table: {selectedOrder.tableNumber}</Typography>
                <Typography variant="subtitle1" gutterBottom>Statut: {selectedOrder.status}</Typography>
                <TableContainer>
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell>Article</TableCell>
                        <TableCell align="right">Quantité</TableCell>
                        <TableCell align="right">Prix unitaire</TableCell>
                        <TableCell align="right">Total</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {selectedOrder.items.map((item) => (
                        <TableRow key={item.id}>
                          <TableCell>{item.name}</TableCell>
                          <TableCell align="right">{item.quantity}</TableCell>
                          <TableCell align="right">{item.price.toFixed(2)} €</TableCell>
                          <TableCell align="right">{(item.quantity * item.price).toFixed(2)} €</TableCell>
                        </TableRow>
                      ))}
                      <TableRow>
                        <TableCell colSpan={3} align="right"><strong>Total</strong></TableCell>
                        <TableCell align="right"><strong>{selectedOrder.total.toFixed(2)} €</strong></TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog} color="primary">
              Fermer
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
  );
}