import React, { useState, useEffect } from 'react';


import {
  ThemeProvider, createTheme,
  CssBaseline, Box, Typography, Paper, Tabs, Tab, Button,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Chip, IconButton, Dialog, DialogTitle, DialogContent, DialogActions,
  List, ListItem, ListItemText, Divider, Badge, Snackbar
} from '@mui/material';
import {
  Visibility as VisibilityIcon,
  Check as CheckIcon,
  LocalShipping as LocalShippingIcon,
  Cancel as CancelIcon,
  Notifications as NotificationsIcon
} from '@mui/icons-material';
import MuiAlert, { AlertProps } from '@mui/material/Alert';

// Thème cohérent avec le reste de l'application
const theme = createTheme({
  palette: {
    primary: { main: '#FF6B6B' },
    secondary: { main: '#4ECDC4' },
    background: { default: '#F7F7F7' },
  },
  typography: {
    fontFamily: 'Roboto, "Helvetica Neue", Arial, sans-serif',
  },
});

interface OrderItem {
  id: number;
  name: string;
  quantity: number;
  price: number;
}

interface Order {
  id: number;
  customerName: string;
  items: OrderItem[];
  total: number;
  status: 'new' | 'preparing' | 'ready' | 'delivered' | 'cancelled';
  orderTime: string;
  deliveryAddress?: string;
}

const initialOrders: Order[] = [
  {
    id: 1,
    customerName: "Alice Dupont",
    items: [
      { id: 1, name: "Burger Classic", quantity: 2, price: 8.99 },
      { id: 2, name: "Frites", quantity: 2, price: 3.99 },
    ],
    total: 25.96,
    status: 'new',
    orderTime: "2023-05-01 18:30",
    deliveryAddress: "123 Rue de Paris, 75001 Paris"
  },
  {
    id: 2,
    customerName: "Bob Martin",
    items: [
      { id: 3, name: "Pizza Margherita", quantity: 1, price: 10.99 },
      { id: 4, name: "Salade César", quantity: 1, price: 7.99 },
    ],
    total: 18.98,
    status: 'preparing',
    orderTime: "2023-05-01 19:00"
  },
  {
    id: 3,
    customerName: "Charlie Leclerc",
    items: [
      { id: 5, name: "Pâtes Carbonara", quantity: 2, price: 12.99 },
      { id: 6, name: "Tiramisu", quantity: 2, price: 5.99 },
    ],
    total: 37.96,
    status: 'ready',
    orderTime: "2023-05-01 19:15",
    deliveryAddress: "456 Avenue des Champs-Élysées, 75008 Paris"
  },
];

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function OnlineOrders() {
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const [currentTab, setCurrentTab] = useState(0);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [notification, setNotification] = useState({ open: false, message: '' });
  const [newOrderCount, setNewOrderCount] = useState(0);

  useEffect(() => {
    // Simuler l'arrivée de nouvelles commandes
    const interval = setInterval(() => {
      const newOrder: Order = {
        id: orders.length + 1,
        customerName: `Client ${orders.length + 1}`,
        items: [{ id: 1, name: "Nouveau Plat", quantity: 1, price: 15.99 }],
        total: 15.99,
        status: 'new',
        orderTime: new Date().toLocaleString(),
      };
      setOrders(prevOrders => [...prevOrders, newOrder]);
      setNewOrderCount(prevCount => prevCount + 1);
      setNotification({ open: true, message: 'Nouvelle commande reçue !' });
      playNotificationSound();
    }, 4000); // Nouvelle commande toutes les 40 secondes

    return () => clearInterval(interval);
  }, [orders]);

  const handleChangeTab = (event: React.SyntheticEvent, newValue: number) => {
    setCurrentTab(newValue);
    if (newValue === 0) {
      setNewOrderCount(0);
    }
  };

  const handleViewOrder = (order: Order) => {
    setSelectedOrder(order);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleUpdateStatus = (orderId: number, newStatus: Order['status']) => {
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
  };

  const handleCloseNotification = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setNotification({ ...notification, open: false });
  };

  const playNotificationSound = () => {
    const audio = new Audio('/sounds/mixkit-correct-answer-tone-2870.mp3');
    audio.play();
  };

  const filteredOrders = orders.filter(order => {
    if (currentTab === 0) return order.status === 'new';
    if (currentTab === 1) return order.status === 'preparing';
    if (currentTab === 2) return order.status === 'ready';
    return order.status === 'delivered' || order.status === 'cancelled';
  });

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'new': return 'error';
      case 'preparing': return 'warning';
      case 'ready': return 'success';
      case 'delivered': return 'info';
      case 'cancelled': return 'default';
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ flexGrow: 1, p: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Commandes en Ligne
        </Typography>

        <Paper sx={{ mb: 2 }}>
          <Tabs value={currentTab} onChange={handleChangeTab} variant="fullWidth">
            <Tab label={
              <Badge badgeContent={newOrderCount} color="error">
                Nouvelles {newOrderCount > 0 && <NotificationsIcon color="error" />}
              </Badge>
            } />
            <Tab label={<Badge badgeContent={orders.filter(o => o.status === 'preparing').length} color="warning">En préparation</Badge>} />
            <Tab label={<Badge badgeContent={orders.filter(o => o.status === 'ready').length} color="success">Prêtes</Badge>} />
            <Tab label="Historique" />
          </Tabs>
        </Paper>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>N° Commande</TableCell>
                <TableCell>Client</TableCell>
                <TableCell>Total</TableCell>
                <TableCell>Heure</TableCell>
                <TableCell>Statut</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell>{order.id}</TableCell>
                  <TableCell>{order.customerName}</TableCell>
                  <TableCell>{order.total.toFixed(2)} €</TableCell>
                  <TableCell>{order.orderTime}</TableCell>
                  <TableCell>
                    <Chip label={order.status} color={getStatusColor(order.status)} />
                  </TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleViewOrder(order)}>
                      <VisibilityIcon />
                    </IconButton>
                    {order.status === 'new' && (
                      <IconButton onClick={() => handleUpdateStatus(order.id, 'preparing')} color="primary">
                        <CheckIcon />
                      </IconButton>
                    )}
                    {order.status === 'preparing' && (
                      <IconButton onClick={() => handleUpdateStatus(order.id, 'ready')} color="secondary">
                        <LocalShippingIcon />
                      </IconButton>
                    )}
                    {(order.status === 'new' || order.status === 'preparing') && (
                      <IconButton onClick={() => handleUpdateStatus(order.id, 'cancelled')} color="error">
                        <CancelIcon />
                      </IconButton>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
          {selectedOrder && (
            <>
              <DialogTitle>
                Détails de la Commande #{selectedOrder.id}
                <Chip 
                  label={selectedOrder.status} 
                  color={getStatusColor(selectedOrder.status)} 
                  sx={{ ml: 2 }}
                />
              </DialogTitle>
              <DialogContent>
                <Typography variant="subtitle1">Client: {selectedOrder.customerName}</Typography>
                <Typography variant="subtitle1">Heure de commande: {selectedOrder.orderTime}</Typography>
                {selectedOrder.deliveryAddress && (
                  <Typography variant="subtitle1">Adresse de livraison: {selectedOrder.deliveryAddress}</Typography>
                )}
                <Divider sx={{ my: 2 }} />
                <Typography variant="h6">Articles commandés:</Typography>
                <List>
                  {selectedOrder.items.map((item) => (
                    <ListItem key={item.id}>
                      <ListItemText 
                        primary={`${item.quantity}x ${item.name}`} 
                        secondary={`${(item.price * item.quantity).toFixed(2)} €`} 
                      />
                    </ListItem>
                  ))}
                </List>
                <Divider sx={{ my: 2 }} />
                <Typography variant="h6">Total: {selectedOrder.total.toFixed(2)} €</Typography>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCloseDialog}>Fermer</Button>
                {selectedOrder.status === 'new' && (
                  <Button onClick={() => handleUpdateStatus(selectedOrder.id, 'preparing')} color="primary" variant="contained">
                    Commencer la préparation
                  </Button>
                )}
                {selectedOrder.status === 'preparing' && (
                  <Button onClick={() => handleUpdateStatus(selectedOrder.id, 'ready')} color="secondary" variant="contained">
                    Marquer comme prête
                  </Button>
                )}
              </DialogActions>
            </>
          )}
        </Dialog>

        <Snackbar
          open={notification.open}
          autoHideDuration={6000}
          onClose={handleCloseNotification}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          <Alert onClose={handleCloseNotification} severity="info" sx={{ width: '100%' }}>
            {notification.message}
          </Alert>
        </Snackbar>
      </Box>
    </ThemeProvider>
  );
}