import { useContext, useMemo, useState } from 'react';
import { 
  Box, Typography, Card, CardContent, CardHeader, CardMedia,
  Tabs, Tab, Paper, IconButton, Badge, Divider, useTheme, Grid,
  useMediaQuery, Fab, Dialog, DialogTitle, DialogContent, DialogActions,
  Button, Slide, Select, FormControl, InputLabel, MenuItem, TextField
} from '@mui/material';
import { 
  Add as AddIcon, 
  Remove as RemoveIcon, 
  ShoppingCart, 
  Close as CloseIcon
} from '@mui/icons-material';
import { TransitionProps } from '@mui/material/transitions';
import React from 'react';
import { hexToRgba } from '../../../utils/utils';
import { useQuery } from 'react-query';
import menuService, { Menu } from '../../menu/services/menu.service';
import orderService, { CreateOrderDto, OrderItemDto, OrderType } from '../services/orser.service';
import { AuthContext } from '../../../context/authContext';
import Swal from 'sweetalert2';
import { errorHandler } from '../../../handlers/errorHandler';
import { useNavigate } from 'react-router-dom';

interface MenuItem {
  id: number;
  name: string;
  price: number;
  category: string;
  image?: string;
}

const menuPipe = (menu: Menu[] | undefined): MenuItem[] => {
  if (menu) {
    return menu?.reduce((acc: MenuItem[], item) => {
      const formattedItem: MenuItem = {
        id: item.id,
        name: `${item.category.name} ${item.name}`,
        price: item.price,
        category: item.category.name,
        image: `${import.meta.env.VITE_REACT_APP_IMAGES_URL}/${item.imageUrl as string}`
      }
      acc.push(formattedItem);
      return acc;
    }, []);
  }
  return []
}

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function NewOrder() {
  const [order, setOrder] = useState<OrderItemDto[]>([]);
  const [activeCategory, setActiveCategory] = useState("Tous");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [orderType, setOrderType] = useState<OrderType>(OrderType.takeout);
  const [selectedTable, setSelectedTable] = useState<number | null>(null);
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('lg'));
  const authContext = useContext(AuthContext);
  const { data: menu, refetch: refetchMenu } = useQuery(['menu', authContext.isAuth], async () => await menuService.getMenu())
  const navigate = useNavigate();

  const menuItems = useMemo(() => menuPipe(menu), [menu])

  const addToOrder = (itemId: number) => {
    setOrder(prevOrder => {
      const existingItem = prevOrder.find(item => item.dishId === itemId);
      if (existingItem) {
        return prevOrder.map(item => 
          item.dishId === itemId ? {...item, quantity: item.quantity + 1} : item
        );
      } else {
        return [...prevOrder, {dishId: itemId, quantity: 1}];
      }
    });
  };

  const removeFromOrder = async (itemId: number) => {
    setOrder(prevOrder => {
      const existingItem = prevOrder.find(item => item.dishId === itemId);
      if (existingItem && existingItem.quantity > 1) {
        return prevOrder.map(item => 
          item.dishId === itemId ? {...item, quantity: item.quantity - 1} : item
        );
      } else {
        return prevOrder.filter(item => item.dishId !== itemId);
      }
    });
  };

  const getOrderTotal = () => {
    return order.reduce((total, item) => {
      const menuItem = menuItems.find(mi => mi.id === item.dishId);
      return total + (menuItem ? menuItem.price * item.quantity : 0);
    }, 0).toFixed(2);
  };

  const categories = ["Tous", ...new Set(menuItems.map(item => item.category))];

  const filteredItems = activeCategory === "Tous" 
    ? menuItems 
    : menuItems.filter(item => item.category === activeCategory);

  const handleOpenDialog = () => {
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  const handleTableSelection = (tableNumber: number) => {
    setSelectedTable(tableNumber);
  };

  const handleValidateCommande = async () => {
    if (authContext.user?.userId) {
      const createOrderDto: CreateOrderDto = {
        userId: +authContext.user?.userId,
        type: orderType,
        orderItems: order,
        table: orderType === OrderType.dine_in ? (selectedTable?selectedTable:undefined) : undefined,
        phoneNumber: orderType === OrderType.online ? phoneNumber : undefined
      }
      console.log({createOrderDto})
      await orderService.createOrder(createOrderDto)
        .then(() => {
          handleCloseDialog();
          navigate('/commandes/en-cours')
        }).then(() => {
          Swal.fire({
            title: 'Commande validée',
            icon: 'success',
            toast: true
          })
          refetchMenu()
        }).catch((error) => errorHandler(error))
    }
  }

  const renderOrderContent = () => (
    order.length === 0 ? null : (
      <Box sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        gap: 1, 
        width: '100%',
        alignItems: 'stretch'
      }}>
        {order.map(item => {
          const menuItem = menuItems.find(mi => mi.id === item.dishId);
          return menuItem ? (
            <Paper key={item.dishId} sx={{ 
              p: 1, 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              borderRadius: 2,
              boxShadow: theme.shadows[1],
              flex: 1
            }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <img 
                  src={menuItem?.image}
                  alt={menuItem.name}
                  style={{ width: 40, height: 40, marginRight: 8, borderRadius: 4, inset: 1 }} 
                />
                <Box>
                  <Typography variant="body2" sx={{ fontWeight: 'bold', fontSize: { xs: '0.8rem', sm: '1rem' } }}>
                    {menuItem.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: '0.7rem', sm: '0.875rem' } }}>
                    {(menuItem.price * item.quantity).toFixed(2)} DA
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <IconButton size="small" onClick={() => removeFromOrder(item.dishId)}>
                  <RemoveIcon />
                </IconButton>
                <Typography sx={{ mx: 1, minWidth: '20px', textAlign: 'center', fontSize: { xs: '0.8rem', sm: '1rem' } }}>
                  {item.quantity}
                </Typography>
                <IconButton size="small" onClick={() => addToOrder(item.dishId)}>
                  <AddIcon />
                </IconButton>
              </Box>
            </Paper>
          ) : null;
        })}
      </Box>
    )
  );

  return (
    <Box sx={{ 
      flexGrow: 1, 
      p: { xs: 1, sm: 2, md: 3 },  
      overflow: 'hidden', 
      bgcolor: theme.palette.background.paper 
    }}>
      <Box sx={{ 
        display: 'flex', 
        flexDirection: { xs: 'column', md: 'row' }, 
        gap: 2, 
        height: isMobile ? 'calc(100vh - 60px)' : 'calc(100vh - 80px)',
        overflow: isMobile ? 'hidden' : 'auto'
      }}>
        <Card sx={{ 
          flex: 1, 
          borderRadius: 2,
          display: 'flex',
          flexDirection: 'column',
          mb: { xs: 2, md: 0 },
        }}>
          <CardHeader 
            title="Menu" 
            sx={{ 
              bgcolor: hexToRgba(theme.palette.primary.main, 0.4), 
              color: theme.palette.text.primary,
              py: 1
            }}
          />
          <CardContent sx={{ flexGrow: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column', p: 1 }}>
            <Tabs
              value={activeCategory}
              onChange={(_, newValue) => setActiveCategory(newValue)}
              variant="scrollable"
              scrollButtons="auto"
              sx={{ 
                mb: 1,
                borderBottom: 1,
                borderColor: 'divider',
                '& .MuiTab-root': {
                  minWidth: 'auto',
                  px: { xs: 1, sm: 2 },
                  py: 1,
                  fontSize: { xs: '0.75rem', sm: '0.875rem' }
                }
              }}
            >
              {categories.map(category => (
                <Tab 
                  key={category} 
                  label={category} 
                  value={category}
                  sx={{
                    fontWeight: 'medium',
                    '&.Mui-selected': {
                      color: theme.palette.primary.main,
                    }
                  }}
                />
              ))}
            </Tabs>
            <Box sx={{ 
              overflow: 'auto',
              flexGrow: 1,
              p: 1,
              maxHeight: 'calc(100vh - 200px)'
            }}>
              <Grid container spacing={1}>
                {filteredItems.map(item => (
                  <Grid item xs={6} sm={4} md={3} key={item.id}>
                    <Card 
                      sx={{ 
                        height: '100%', 
                        display: 'flex', 
                        flexDirection: 'column',
                        transition: 'all 0.3s',
                        cursor: 'pointer',
                        '&:hover': { 
                          transform: 'translateY(-3px)',
                          boxShadow: theme.shadows[2]
                        }
                      }}
                      onClick={() => addToOrder(item.id)}
                    >
                      <CardMedia
                        component="img"
                        height={isMobile ? "120" : "120"}
                        image={item.image}
                        alt={item.name}
                      />
                      <CardContent sx={{ flexGrow: 1, p: 1 }}>
                        <Typography variant="body1" component="div" sx={{ fontWeight: 'bold', fontSize: { xs: '0.8rem', sm: '1rem' } }}>
                          {item.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: '0.7rem', sm: '0.875rem' } }}>
                          {item.price.toFixed(2)} DA
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </CardContent>
        </Card>

        {!isMobile && (
          <Card sx={{ 
            flex: { xs: 1, md: 0.5 }, 
            boxShadow: theme.shadows[1], 
            borderRadius: 2,
            display: 'flex',
            flexDirection: 'column'
          }}>
            <CardHeader 
              title="Commande en cours" 
              sx={{ 
                bgcolor: hexToRgba(theme.palette.primary.main, 0.4), 
                color: theme.palette.text.primary,
                py: 1
              }}
            />
            <CardContent sx={{ 
              flexGrow: 1, 
              overflowY: 'auto', 
              display: 'flex', 
              flexDirection: 'column',
              alignItems: 'stretch',
              p: 1
            }}>
              {order.length === 0 ? (
                <Typography sx={{ textAlign: 'center', color: theme.palette.text.secondary, my: 4 }}>
                  Aucun article sélectionné
                </Typography>
              ) : renderOrderContent()}
            </CardContent>
            <Divider />
            <Box sx={{ p: 2 }}>
              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel id="order-type-label">Type de commande</InputLabel>
                <Select
                  labelId="order-type-label"
                  value={orderType}
                  label="Type de commande"
                  onChange={(e) => setOrderType(e.target.value as OrderType)}
                >
                  <MenuItem value={OrderType.dine_in}>Sur place</MenuItem>
                  <MenuItem value={OrderType.takeout}>À emporter</MenuItem>
                  <MenuItem value={OrderType.online}>En ligne</MenuItem>
                </Select>
              </FormControl>
              {orderType === OrderType.dine_in && (
                <FormControl fullWidth sx={{ mb: 2 }}>
                  <InputLabel id="table-select-label">Numéro de table</InputLabel>
                  <Select
                    labelId="table-select-label"
                    value={selectedTable || ''}
                    label="Numéro de table"
                    onChange={(e) => handleTableSelection(e.target.value as number)}
                  >
                    {[...Array(20)].map((_, index) => (
                      <MenuItem key={index + 1} value={index + 1}>
                        Table {index + 1}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}
              {orderType === OrderType.online && (
                <TextField
                  fullWidth
                  label="Numéro de téléphone"
                  variant="outlined"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  sx={{ mb: 2 }}
                />
              )}
              <Typography variant="h6" sx={{ mb: 2, fontSize: { xs: '1rem', sm: '1.25rem' } }}>
                Total: <strong>{getOrderTotal()} DA</strong>
              </Typography>
              <Button
                variant="outlined"
                color="primary"
                startIcon={<ShoppingCart />}
                fullWidth
                size="large"
                sx={{ 
                  fontSize: { xs: '0.875rem', sm: '1rem' }
                }}
                onClick={handleValidateCommande}
              >
                Valider la commande
              </Button>
            </Box>
          </Card>
        )}
      </Box>

      {isMobile && (
        <>
          <Fab 
            aria-label="commande" 
            sx={{ position: 'fixed', bottom: '50px', right: 16 }}
            onClick={handleOpenDialog}
          >
            <Badge badgeContent={order.length} color="error">
              <ShoppingCart />
            </Badge>
          </Fab>

          <Dialog
            fullScreen
            open={isDialogOpen}
            onClose={handleCloseDialog}
            TransitionComponent={Transition}
          >
            <DialogTitle sx={{ m: 0, p: 2 }}>
              Commande en cours
              <IconButton
                aria-label="close"
                onClick={handleCloseDialog}
                sx={{
                  position: 'absolute',
                  right: 8,
                  top: 8,
                  color: (theme) => theme.palette.grey[500],
                }}
              >
                <CloseIcon />
              </IconButton>
            </DialogTitle>
            <DialogContent dividers sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'stretch',
              p: 1
            }}>
              {order.length === 0 ? (
                <Typography sx={{ textAlign: 'center', color: theme.palette.text.secondary, my: 4 }}>
                  Aucun article sélectionné
                </Typography>
              ) : renderOrderContent()}
            </DialogContent>
            <DialogActions sx={{ flexDirection: 'column', alignItems: 'stretch', p: 2 }}>
              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel id="order-type-label-mobile">Type de commande</InputLabel>
                <Select
                  labelId="order-type-label-mobile"
                  value={orderType}
                  label="Type de commande"
                  onChange={(e) => setOrderType(e.target.value as OrderType)}
                >
                  <MenuItem value={OrderType.dine_in}>Sur place</MenuItem>
                  <MenuItem value={OrderType.takeout}>À emporter</MenuItem>
                  <MenuItem value={OrderType.online}>En ligne</MenuItem>
                </Select>
              </FormControl>
              {orderType === OrderType.dine_in && (
                <FormControl fullWidth sx={{ mb: 2 }}>
                  <InputLabel id="table-select-label-mobile">Numéro de table</InputLabel>
                  <Select
                    labelId="table-select-label-mobile"
                    value={selectedTable || ''}
                    label="Numéro de table"
                    onChange={(e) => handleTableSelection(e.target.value as number)}
                  >
                    {[...Array(20)].map((_, index) => (
                      <MenuItem key={index + 1} value={index + 1}>
                        Table {index + 1}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}
              {orderType === OrderType.online && (
                <TextField
                  fullWidth
                  label="Numéro de téléphone"
                  variant="outlined"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  sx={{ mb: 2 }}
                />
              )}
              <Typography variant="h6" sx={{ mb: 2, fontSize: { xs: '1rem', sm: '1.25rem' } }}>
                Total: <strong>{getOrderTotal()} DA</strong>
              </Typography>
              <Button
                variant="outlined"
                startIcon={<ShoppingCart />}
                size="large"
                fullWidth
                sx={{ 
                  py: 1.5,
                  transition: 'all 0.3s',
                  '&:hover': { 
                    transform: 'translateY(-2px)',
                    boxShadow: theme.shadows[1]
                  },
                  fontSize: { xs: '0.875rem', sm: '1rem' }
                }}
                onClick={handleValidateCommande}
              >
                Valider la commande
              </Button>
            </DialogActions>
          </Dialog>
        </>
      )}
    </Box>
  );
}