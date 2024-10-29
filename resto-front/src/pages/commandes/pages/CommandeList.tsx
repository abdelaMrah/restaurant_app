



// import { useState } from 'react';
// import { 
//   Box, Typography, Button, Card, CardContent,
//   Chip, Dialog, DialogTitle, DialogContent, DialogActions,
//   Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
//   useTheme,
// } from '@mui/material';
// import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
// import { 
//   Check as CheckIcon, 
//   Info as InfoIcon,
//   Add as AddIcon
// } from '@mui/icons-material';
// import { hexToRgba } from '../../../utils/utils';

// interface OrderItem {
//   id: number;
//   name: string;
//   quantity: number;
//   price: number;
// }

// interface Order {
//   id: number;
//   items: OrderItem[];
//   status: 'En préparation' | 'Prêt' | 'Servi';
//   tableNumber: number;
// }

// const initialOrders: Order[] = [
//   {
//     id: 1,
//     items: [
//       { id: 1, name: "Burger Classic", quantity: 2, price: 8.99 },
//       { id: 3, name: "Frites", quantity: 2, price: 3.99 },
//     ],
//     status: 'En préparation',
//     tableNumber: 3,
//   },
//   {
//     id: 2,
//     items: [
//       { id: 5, name: "Salade César", quantity: 1, price: 7.99 },
//       { id: 4, name: "Soda", quantity: 1, price: 2.99 },
//     ],
//     status: 'Prêt',
//     tableNumber: 5,
//   },
//   {
//     id: 3,
//     items: [
//       { id: 2, name: "Cheeseburger", quantity: 1, price: 9.99 },
//       { id: 6, name: "Nuggets (6 pcs)", quantity: 1, price: 5.99 },
//       { id: 7, name: "Milkshake", quantity: 2, price: 4.99 },
//     ],
//     status: 'En préparation',
//     tableNumber: 2,
//   },
// ];

// export default function CurrentOrders() {
//   const [orders, setOrders] = useState<Order[]>(initialOrders);
//   const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
//   const [openDialog, setOpenDialog] = useState(false);
//   const {palette} = useTheme();

//   const handleStatusChange = (orderId: number, newStatus: Order['status']) => {
//     setOrders(prevOrders =>
//       prevOrders.map(order =>
//         order.id === orderId ? { ...order, status: newStatus } : order
//       )
//     );
//   };

//   const handleOpenDialog = (order: Order) => {
//     setSelectedOrder(order);
//     setOpenDialog(true);
//   };

//   const handleCloseDialog = () => {
//     setOpenDialog(false);
//   };

//   const getStatusColor = (status: Order['status']) => {
//     switch (status) {
//       case 'En préparation':
//         return 'warning';
//       case 'Prêt':
//         return 'success';
//       case 'Servi':
//         return 'default';
//     }
//   };

//   const getTotalPrice = (items: OrderItem[]) => {
//     return items.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
//   };

//   const columns: GridColDef[] = [
//     { field: 'id', headerName: 'N° Commande', flex: 1 },
//     { field: 'tableNumber', headerName: 'Table', flex: 1 },
//     { 
//       field: 'items', 
//       headerName: 'Articles', 
//       flex: 2,
//       valueGetter: (params:OrderItem[]) => {
//         // return params.value?.map(item => item.name).join(', ');
//         return params.reduce((acc,cur)=>{
//             return `${acc} ${cur.name},`
//         },'')
//       },
//     },
//     { 
//       field: 'total', 
//       headerName: 'Total', 
//       flex: 1,
//       renderCell: (params: GridRenderCellParams) => `${getTotalPrice(params.row.items)} DA`

//     //      (
//     //     <Typography fontWeight="bold" color="primary">
//     //       {getTotalPrice(params.row.items)} DA
//     //     </Typography>
//     //   )
//     },
//     { 
//       field: 'status', 
//       headerName: 'Statut', 
//       flex: 1,
//       renderCell: (params: GridRenderCellParams) => (
//         <Chip 
//           label={params.value} 
//           color={getStatusColor(params.value as Order['status'])}
//           size="small"
//         />
//       )
//     },
//     {
//       field: 'actions',
//       headerName: 'Actions',
//       flex: 1,
//       renderCell: (params: GridRenderCellParams) => (
//         <Box>
//           <Button
//             startIcon={<InfoIcon />}
//             size="small"
//             onClick={() => handleOpenDialog(params.row)}
//             variant="outlined"
//             color="info"
//           >
//             Détails
//           </Button>
//           {params.row.status !== 'Servi' && (
//             <Button
//               startIcon={<CheckIcon />}
//               size="small"
//               color="primary"
//               onClick={() => handleStatusChange(params.row.id, params.row.status === 'En préparation' ? 'Prêt' : 'Servi')}
//             >
//               {params.row.status === 'En préparation' ? 'Prêt' : 'Servi'}
//             </Button>
//           )}
//         </Box>
//       )
//     },
//   ];

//   return (
//     <Box sx={{ flexGrow: 1, p: 3, }}>
//       <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
//         <Typography variant="h4" component="h1" color="primary" fontWeight="bold">
//           Commandes en cours
//         </Typography>
//         <Button
//           variant="contained"
//           color="secondary"
//           startIcon={<AddIcon />}
//           onClick={() => console.log("Naviguer vers la page de lancement de commandes")}
//           sx={{ borderRadius: '20px' }}
//         >
//           Nouvelle Commande
//         </Button>
//       </Box>
      
//       <Card sx={{  boxShadow: 3 }}>
//         <CardContent>
//           <DataGrid
//             rows={orders}
//             columns={columns}
            
//             sx={{
//                 '& .MuiDataGrid-toolbarContainer': {
//                   padding: '8px',
//                   backgroundColor:hexToRgba(palette.primary.light,0.3)
//                 },
//                 '& .MuiButton-root': {
//                   color: 'primary.main',
//                 },
//               }}
//           />
//         </CardContent>
//       </Card>

//       <Dialog open={openDialog} onClose={handleCloseDialog}>
//         <DialogTitle>
//           <Typography variant="h6" color="primary">
//             Détails de la commande #{selectedOrder?.id}
//           </Typography>
//         </DialogTitle>
//         <DialogContent dividers>
//           {selectedOrder && (
//             <Box>
//               <Typography variant="subtitle1" gutterBottom>
//                 <strong>Table :</strong> {selectedOrder.tableNumber}
//               </Typography>
//               <Typography variant="subtitle1" gutterBottom>
//                 <strong>Statut :</strong> {selectedOrder.status}
//               </Typography>
//               <TableContainer>
//                 <Table size="small">
//                   <TableHead>
//                     <TableRow>
//                       <TableCell><strong>Article</strong></TableCell>
//                       <TableCell align="right"><strong>Quantité</strong></TableCell>
//                       <TableCell align="right"><strong>Prix unitaire</strong></TableCell>
//                       <TableCell align="right"><strong>Total</strong></TableCell>
//                     </TableRow>
//                   </TableHead>
//                   <TableBody>
//                     {selectedOrder.items.map((item) => (
//                       <TableRow key={item.id}>
//                         <TableCell>{item.name}</TableCell>
//                         <TableCell align="right">{item.quantity}</TableCell>
//                         <TableCell align="right">{item.price.toFixed(2)} €</TableCell>
//                         <TableCell align="right">{(item.quantity * item.price).toFixed(2)} €</TableCell>
//                       </TableRow>
//                     ))}
//                     <TableRow>
//                       <TableCell colSpan={3} align="right"><strong>Total</strong></TableCell>
//                       <TableCell align="right"><strong>{getTotalPrice(selectedOrder.items)} €</strong></TableCell>
//                     </TableRow>
//                   </TableBody>
//                 </Table>
//               </TableContainer>
//             </Box>
//           )}
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleCloseDialog} color="primary">
//             Fermer
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </Box>
//   );
// }



import { useState } from 'react';
import {
  Box,
  Typography,
  Chip,
  Button,
  Card,
  CardContent,
  CardActions,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  useTheme,
  Tabs,
  Tab,
  Badge,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import {
  AccessTime as TimeIcon,
  // RestaurantMenu as MenuIcon,
  CheckCircle as CompleteIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
  LocalDining as DineInIcon,
  TakeoutDining as TakeoutIcon,
  Computer as OnlineIcon,
} from '@mui/icons-material';

interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
}

interface Order {
  id: string;
  type: 'dine-in' | 'takeout' | 'online';
  tableNumber?: number;
  customerName?: string;
  items: OrderItem[];
  status: 'pending' | 'in-progress' | 'ready';
  timestamp: Date;
}


const initialOrders: Order[] = [
  {
    id: '1',
    type: 'dine-in',
    tableNumber: 5,
    items: [
      { id: 'a1', name: 'Pizza Margherita', quantity: 2, price: 12 },
      { id: 'a2', name: 'Salade César', quantity: 1, price: 8 },
    ],
    status: 'pending',
    timestamp: new Date(Date.now() - 1000 * 60 * 15),
  },
  {
    id: '2',
    type: 'takeout',
    customerName: 'Sophie Martin',
    items: [
      { id: 'b1', name: 'Burger Deluxe', quantity: 3, price: 15 },
      { id: 'b2', name: 'Frites', quantity: 2, price: 4 },
    ],
    status: 'in-progress',
    timestamp: new Date(Date.now() - 1000 * 60 * 5), 
  },
  {
    id: '3',
    type: 'online',
    customerName: 'Pierre Dubois',
    items: [
      { id: 'c1', name: 'Pâtes Carbonara', quantity: 1, price: 14 },
      { id: 'c2', name: 'Tiramisu', quantity: 1, price: 6 },
    ],
    status: 'ready',
    timestamp: new Date(Date.now() - 1000 * 60 * 25),
  },
  {
    id: '4',
    type: 'dine-in',
    tableNumber: 3,
    items: [
      { id: 'd1', name: 'Steak Frites', quantity: 2, price: 22 },
      { id: 'd2', name: 'Vin Rouge', quantity: 1, price: 18 },
    ],
    status: 'in-progress',
    timestamp: new Date(Date.now() - 1000 * 60 * 10), 
  },
];

export default function AllCurrentOrders() {
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentTab, setCurrentTab] = useState(0);
  const theme = useTheme();

  const handleStatusChange = (orderId: string, newStatus: Order['status']) => {
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
  };

  const handleDeleteOrder = (orderId: string) => {
    setOrders(orders.filter(order => order.id !== orderId));
  };

  const handleEditOrder = (order: Order) => {
    setSelectedOrder(order);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setSelectedOrder(null);
  };

  const calculateTotal = (items: OrderItem[]): number => {
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'pending':
        return theme.palette.warning.main;
      case 'in-progress':
        return theme.palette.info.main;
      case 'ready':
        return theme.palette.success.main;
      default:
        return theme.palette.grey[500];
    }
  };

  const formatTimestamp = (date: Date): string => {
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 60) {
      return `Il y a ${diffInMinutes} minute${diffInMinutes > 1 ? 's' : ''}`;
    } else {
      const hours = Math.floor(diffInMinutes / 60);
      const minutes = diffInMinutes % 60;
      return `Il y a ${hours}h${minutes.toString().padStart(2, '0')}`;
    }
  };

  const getOrderTypeIcon = (type: Order['type']) => {
    switch (type) {
      case 'dine-in':
        return <DineInIcon />;
      case 'takeout':
        return <TakeoutIcon />;
      case 'online':
        return <OnlineIcon />;
    }
  };

  const filteredOrders = currentTab === 0 
    ? orders 
    : orders.filter(order => {
        if (currentTab === 1) return order.type === 'dine-in';
        if (currentTab === 2) return order.type === 'takeout';
        if (currentTab === 3) return order.type === 'online';
        return true;
      });

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: theme.palette.primary.main, mb: 4 }}>
        Toutes les commandes en cours
      </Typography>
      
      <Tabs value={currentTab} onChange={(_, newValue) => setCurrentTab(newValue)} sx={{ mb: 3 }} variant='fullWidth'>
        <Tab label={
          <Badge badgeContent={orders.length} color="success" variant='standard'>
            Toutes
          </Badge>
        } />
        <Tab label={
          <Badge badgeContent={orders.filter(o => o.type === 'dine-in').length} color="success" >
            Sur place
          </Badge>
        } />
        <Tab label={
          <Badge badgeContent={orders.filter(o => o.type === 'takeout').length} color="success">
            À emporter
          </Badge>
        } />
        <Tab label={
          <Badge badgeContent={orders.filter(o => o.type === 'online').length} color="success">
            En ligne
          </Badge>
        } />
      </Tabs>

      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
        {filteredOrders.map((order) => (
          <Card key={order.id} elevation={3} sx={{ width: { xs: '100%', sm: 'calc(50% - 12px)', md: 'calc(33.333% - 16px)' }, display: 'flex', flexDirection: 'column' }}>
            <CardContent sx={{ flexGrow: 1 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6" component="div" sx={{ display: 'flex', alignItems: 'center' }}>
                  {getOrderTypeIcon(order.type)}
                  <Box sx={{ ml: 1 }}>
                    {order.type === 'dine-in' ? `Table ${order.tableNumber}` : order.customerName}
                  </Box>
                </Typography>
                <Chip 
                  label={order.status} 
                  color="primary"
                  sx={{ 
                    bgcolor: getStatusColor(order.status),
                    color: theme.palette.getContrastText(getStatusColor(order.status))
                  }}
                />
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                  Total: {calculateTotal(order.items).toFixed(2)} €
                </Typography>
                <Chip
                  icon={<TimeIcon />}
                  label={formatTimestamp(order.timestamp)}
                  variant="outlined"
                  size="small"
                />
              </Box>
            </CardContent>
            <CardActions sx={{ justifyContent: 'space-between', p: 2 }}>
              <Box>
                <IconButton onClick={() => handleEditOrder(order)} color="primary" aria-label="modifier la commande">
                  <EditIcon />
                </IconButton>
                <IconButton onClick={() => handleDeleteOrder(order.id)} color="error" aria-label="supprimer la commande">
                  <DeleteIcon />
                </IconButton>
              </Box>
              <Button
                variant="contained"
                color="primary"
                startIcon={<CompleteIcon />}
                onClick={() => handleStatusChange(order.id, 'ready')}
                disabled={order.status === 'ready'}
              >
                Marquer comme prêt
              </Button>
            </CardActions>
          </Card>
        ))}
      </Box>

      <Dialog open={isDialogOpen} onClose={handleCloseDialog} fullWidth maxWidth="sm">
        <DialogTitle>Modifier la commande</DialogTitle>
        <DialogContent>
          {selectedOrder && (
            <Box>
              <Typography variant="h6">
                {selectedOrder.type === 'dine-in' 
                  ? `Table ${selectedOrder.tableNumber}` 
                  : `${selectedOrder.type === 'takeout' ? 'À emporter' : 'En ligne'} - ${selectedOrder.customerName}`}
              </Typography>
              <List>
                {selectedOrder.items.map((item) => (
                  <ListItem key={item.id}>
                    <ListItemText
                      primary={item.name}
                      secondary={`${item.quantity} x ${item.price.toFixed(2)} €`}
                    />
                    <Typography variant="body2">
                      {(item.quantity * item.price).toFixed(2)} €
                    </Typography>
                  </ListItem>
                ))}
              </List>
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mt: 2 }}>
                Total: {calculateTotal(selectedOrder.items).toFixed(2)} €
              </Typography>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="inherit">Annuler</Button>
          <Button onClick={handleCloseDialog} color="primary" variant="contained">
            Sauvegarder les modifications
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}