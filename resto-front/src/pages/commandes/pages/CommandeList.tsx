import {  useContext, useEffect, useMemo, useState } from 'react';
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
  Snackbar,
  Tab,
  Badge,
  useMediaQuery,
  Grid,
  TextField,
  MenuItem,
  Paper,
 } from '@mui/material';
 import MuiAlert, { AlertProps } from '@mui/material/Alert';
import {
  AccessTime as TimeIcon,
  // RestaurantMenu as MenuIcon,
  CheckCircle as CompleteIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
  LocalDining as DineInIcon,
  TakeoutDining as TakeoutIcon,
  Computer as OnlineIcon,
  AllInclusive as AllCmmande,
  Add as AddIcon

} from '@mui/icons-material';
import { useQuery } from 'react-query';
import orderService, { OrderResponse, OrderStatus, OrderType } from '../services/orser.service'
import { hexToRgba } from '../../../utils/utils';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/fr';
import React from 'react';
import { AuthContext } from '../../../context/authContext';
interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
  category?:string
}

interface Order {
  id: string;
  type: 'dine-in' | 'takeout' | 'online';
  tableNumber?: number;
  customerName?: string;
  items: OrderItem[];
  status:OrderStatus
  timestamp: Date;
}


// const initialOrders: Order[] = [
//   {
//     id: '1',
//     type: 'dine-in',
//     tableNumber: 5,
//     items: [
//       { id: 'a1', name: 'Pizza Margherita', quantity: 2, price: 12 },
//       { id: 'a2', name: 'Salade César', quantity: 1, price: 8 },
//     ],
//     status: OrderStatus.PENDING,
//     timestamp: new Date(Date.now() - 1000 * 60 * 15),
//   },
//   {
//     id: '2',
//     type: 'takeout',
//     customerName: 'Sophie Martin',
//     items: [
//       { id: 'b1', name: 'Burger Deluxe', quantity: 3, price: 15 },
//       { id: 'b2', name: 'Frites', quantity: 2, price: 4 },
//     ],
//     status:OrderStatus.IN_PROGRESS,
//     timestamp: new Date(Date.now() - 1000 * 60 * 5), 
//   },
//   {
//     id: '3',
//     type: 'online',
//     customerName: 'Pierre Dubois',
//     items: [
//       { id: 'c1', name: 'Pâtes Carbonara', quantity: 1, price: 14 },
//       { id: 'c2', name: 'Tiramisu', quantity: 1, price: 6 },
//     ],
//     status: OrderStatus.COMPLETED,
//     timestamp: new Date(Date.now() - 1000 * 60 * 25),
//   },
//   {
//     id: '4',
//     type: 'dine-in',
//     tableNumber: 3,
//     items: [
//       { id: 'd1', name: 'Steak Frites', quantity: 2, price: 22 },
//       { id: 'd2', name: 'Vin Rouge', quantity: 1, price: 18 },
//     ],
//     status: OrderStatus.IN_PROGRESS,
//     timestamp: new Date(Date.now() - 1000 * 60 * 10), 
//   },
// ];

const orderPipe =(orders:OrderResponse[]|undefined):Order[]=>{
 if(orders){
  return orders.map((order, index) => {
    return {
        id: order.id.toString(),
        
        type:order.type.toString().replace('_','-'),
        tableNumber: index + 3,
        items: order.orderItems.map((item) => {
            return {
            
                id:item.menuItem.id.toString(),
                name: item.menuItem.name,
                quantity: item.menuItem.orderItem[0].quantity,
                price: item.menuItem.price 
            };
        }),
        status: order.status.toLowerCase(),
        // timestamp:`${new Date(order.createdAt).toISOString()}`
        timestamp: new Date(new Date(order.createdAt).getTime() - 1000 * 60 * (index + 1) * 5),  
        
    };
}) as Order[]
 }

  return []
}
const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function AllCurrentOrders() {
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' as 'success' | 'error'|'warning'|'info' });
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentTab, setCurrentTab] = useState(0);
  const [type,setType]=useState<OrderType>(OrderType.dine_in)
  const authContext =useContext(AuthContext);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('lg'));
  const {data,refetch:refetchOrder} = useQuery(['orders',type],async()=>await orderService.getOrders({}))
 
  const orders = useMemo(()=>orderPipe(data),[data]);
  const handleStatusChange =async (orderId: string, newStatus: Order['status']) => {
    if(authContext.user?.userId){
      await  orderService.updateOrder(+orderId,{status:newStatus,userId:+authContext.user.userId})
    .then(()=>refetchOrder())
    .catch((e)=>console.log({error:e}))
    }
   
  };

  const handleDeleteOrder = async(orderId: string) => {
    
    await orderService.deleteOrder(+orderId)
    .then(()=>{
      setSnackbar({ open: true, message: 'coammnde annuler ', severity: 'info' });
      
    }).then(()=>refetchOrder())
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

  const getStatusColor = (status: OrderStatus) => {
    // console.log(OrderStatus[])
    switch (status.toUpperCase() as OrderStatus) {
      case OrderStatus.PENDING:
        return theme.palette.warning.main;
      case OrderStatus.IN_PROGRESS:
        return theme.palette.info.main;
      case OrderStatus.COMPLETED:
        return theme.palette.success.main;
        case OrderStatus.CONFIRMED:
          return theme.palette.primary.main;
      case OrderStatus.CANCELLED:
        return theme.palette.error.main;
      default:
        return theme.palette.grey[500];
    }
  };

  
  // const formatTimestamp = (date: Date): string => {
  //   const now = new Date();
  //   const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
  //   if (diffInMinutes < 60) {
  //     return `Il y a ${diffInMinutes} minute${diffInMinutes > 1 ? 's' : ''}`;
  //   } else {
  //     const hours = Math.floor(diffInMinutes / 60);
  //     const minutes = diffInMinutes % 60;
  //     return `Il y a ${hours}h${minutes.toString().padStart(2, '0')}`;
  //   }
  // };
  dayjs.extend(relativeTime);
  dayjs.locale('fr');

   const formatTimestamp = (date: Date): string => {
    const now = dayjs();
    const orderDate = dayjs(date);
    const diffInSeconds = now.diff(orderDate, 'second');
    
    if (diffInSeconds < 60) {
      return `Il y a ${diffInSeconds} seconde${diffInSeconds > 1 ? 's' : ''}`;
    }
  
    return orderDate.fromNow();
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

  useEffect(()=>{
    if(currentTab===0) setType(OrderType.dine_in)
    if(currentTab===1) setType(OrderType.dine_in)
    if(currentTab===2) setType(OrderType.takeout)
    if(currentTab===3) setType(OrderType.online)
    
    
    
  },[currentTab])
  console.log({orders})
  const filteredOrders = currentTab === 0 
    ? orders
    : orders.filter(order => {
        if (currentTab === 1) return order.type === 'dine-in';
        if (currentTab === 2) return order.type === 'takeout';
        if (currentTab === 3) return order.type === 'online';
        return true;
      });

  return (
    <Box sx={{ flexGrow: 1, p: 3 }} paddingBottom={10}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: theme.palette.primary.main, mb: 4 }}>
        commandes en cours
      </Typography>
      
      <Tabs value={currentTab} onChange={(_, newValue) => setCurrentTab(newValue)} sx={{ mb: 3 }} variant='fullWidth' >
        <Tab label={
          <Badge badgeContent={orders.length} color="success"  variant='standard'
          
          >
            {isMobile ? (<>
            <AllCmmande/>
            </>):"Tous"}
          </Badge>
        } />
        <Tab label={
          <Badge badgeContent={orders.filter(o => o.type === 'dine-in').length} color="success" >
            {
              isMobile ?
              (<>
              <DineInIcon/>
              </>):
              "Sur place"
            }
          </Badge>
        } />
        <Tab label={
          <Badge badgeContent={orders.filter(o => o.type === 'takeout').length} color="success">
            {
              isMobile ? (
                <>
                <TakeoutIcon/>
                </>
              ):
              "À emporter"
            }
          </Badge>
        } />
        <Tab label={
          <Badge badgeContent={orders.filter(o => o.type === 'online').length} color="success">
            {
              isMobile? (
              <>
              <OnlineIcon/>
              </>):"En ligne"
            }
          </Badge>
        } />
      </Tabs>

      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }} paddingBottom={5}>
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
                  variant='outlined'
                  // color="primary"

                  sx={{ 
                    bgcolor:hexToRgba( getStatusColor(order.status),0.1),
                    borderColor:getStatusColor(order.status),
                    borderWidth:'1px',
                    color:(getStatusColor(order.status))
                  }}
                />
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                  Total: {calculateTotal(order.items).toFixed(2)} DA
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
                variant="outlined"
                color="primary"
                startIcon={<CompleteIcon />}
                onClick={() => handleStatusChange(order.id, OrderStatus.COMPLETED)}
                disabled={OrderStatus[order.status.toUpperCase() as OrderStatus] === OrderStatus.COMPLETED}
                sx={{
                  bgcolor:hexToRgba(theme.palette.primary.light,0.1),
                  borderColor:theme.palette.primary.light,
                  color:theme.palette.primary.dark

                }}
                
              >
                Marquer comme prêt
              </Button>
            </CardActions>
          </Card>
        ))}
      </Box>

 
       <Dialog open={isDialogOpen} onClose={handleCloseDialog} fullWidth maxWidth="md">
  <DialogTitle>
    <Typography variant="h5" component="div" sx={{ fontWeight: 'bold', color: theme.palette.text.primary }}>
      Modifier la commande
    </Typography>
  </DialogTitle>
  <DialogContent>
    {selectedOrder && (
      <Box component="form" noValidate autoComplete="off" sx={{ mt: 2 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              select
              fullWidth
              label="Type de commande"
              value={selectedOrder.type}
              onChange={(e) => {
                setSelectedOrder({
                  ...selectedOrder,
                  type: e.target.value as 'dine-in' | 'takeout' | 'online'
                });
              }}
              variant="outlined"
            >
              <MenuItem value="dine-in">Sur place</MenuItem>
              <MenuItem value="takeout">À emporter</MenuItem>
              <MenuItem value="online">En ligne</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6}>
            {selectedOrder.type === 'dine-in' ? (
              <TextField
                fullWidth
                label="Numéro de table"
                type="number"
                value={selectedOrder.tableNumber}
                onChange={(e) => {
                  setSelectedOrder({
                    ...selectedOrder,
                    tableNumber: parseInt(e.target.value)
                  });
                }}
                variant="outlined"
              />
            ) : (
              <TextField
                fullWidth
                label="Nom du client"
                value={selectedOrder.customerName}
                onChange={(e) => {
                  setSelectedOrder({
                    ...selectedOrder,
                    customerName: e.target.value
                  });
                }}
                variant="outlined"
              />
            )}
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Menu"
              multiline
              rows={4}
              // value={selectedOrder.menu || ''}
              onChange={() => {
                setSelectedOrder({
                  ...selectedOrder,
                  // menu: e.target.value
                });
              }}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', color: theme.palette.text.secondary, mt: 2 }}>
              Articles commandés
            </Typography>
            <Paper variant="outlined" sx={{ mt: 2, p: 2 }}>
              {selectedOrder.items.map((item, index) => (
                <Box key={item.id} sx={{ mb: 2, pb: 2, borderBottom: index < selectedOrder.items.length - 1 ? `1px solid ${theme.palette.divider}` : 'none' }}>
                  <Grid container spacing={2} alignItems="center">
                    <Grid item xs={12} sm={4}>
                      <TextField
                        select
                        fullWidth
                        value={item.name}
                        onChange={(e) => {
                          const newItems = [...selectedOrder.items];
                          newItems[index] = { ...newItems[index], name: e.target.value };
                          setSelectedOrder({ ...selectedOrder, items: newItems });
                        }}
                        variant="outlined"
                        size="small"
                        label="Article"
                      >
                        {/* {menuItems?.map((menuItem:{id:string,name:string}) => (
                          <MenuItem key={menuItem.id} value={menuItem.name}>
                            {menuItem.name}
                          </MenuItem>
                        ))} */}
                      </TextField>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                      <TextField
                        select
                        fullWidth
                        value={item.category || ''}
                        onChange={(e) => {
                          const newItems = [...selectedOrder.items];
                          newItems[index] = { ...newItems[index], category: e.target.value };
                          setSelectedOrder({ ...selectedOrder, items: newItems });
                        }}
                        variant="outlined"
                        size="small"
                        label="Catégorie"
                      >
                        {/* {categories?.map((category:string) => (
                          <MenuItem key={category} value={category}>
                            {category}
                          </MenuItem>
                        ))} */}
                      </TextField>
                    </Grid>
                    <Grid item xs={6} sm={2}>
                      <TextField
                        fullWidth
                        type="number"
                        value={item.quantity}
                        onChange={(e) => {
                          const newItems = [...selectedOrder.items];
                          newItems[index] = { ...newItems[index], quantity: parseInt(e.target.value) };
                          setSelectedOrder({ ...selectedOrder, items: newItems });
                        }}
                        variant="outlined"
                        size="small"
                        label="Quantité"
                        InputProps={{ inputProps: { min: 1 } }}
                      />
                    </Grid>
                    <Grid item xs={6} sm={2}>
                      <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                        Prix: {(item.price * item.quantity).toFixed(2)} DA
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={1}>
                      <IconButton 
                        onClick={() => {
                          const newItems = selectedOrder.items.filter((_, i) => i !== index);
                          setSelectedOrder({ ...selectedOrder, items: newItems });
                        }}
                        size="small"
                        sx={{ color: theme.palette.error.main }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Grid>
                  </Grid>
                </Box>
              ))}
              <Button
                startIcon={<AddIcon />}
                onClick={() => {
                  const newItem = { id: Date.now().toString(), name: '', quantity: 1, category: '', price: 0 };
                  setSelectedOrder({
                    ...selectedOrder,
                    items: [...selectedOrder.items, newItem]
                  });
                }}
                sx={{ mt: 2 }}
                variant="outlined"
              >
                Ajouter un article
              </Button>
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper elevation={0} sx={{ p: 2, mt: 2, bgcolor: theme.palette.background.default, border: `1px solid ${theme.palette.divider}` }}>
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                Total: {selectedOrder.items.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2)} DA
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    )}
  </DialogContent>
  <DialogActions sx={{ px: 3, py: 2 }}>
    <Button onClick={handleCloseDialog} color="inherit">
      Annuler
    </Button>
    <Button onClick={handleCloseDialog} color="primary" variant="contained">
      Sauvegarder les modifications
    </Button>
  </DialogActions>
</Dialog>
<Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert 
        severity={snackbar.severity}
         sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}