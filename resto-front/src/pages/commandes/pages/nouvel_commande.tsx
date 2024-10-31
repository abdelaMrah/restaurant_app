

// import  { useState } from 'react';
// import {  Box, Typography, Button, Card, CardContent, CardHeader, 
//   Tabs, Tab, Paper, IconButton
// } from '@mui/material';
// import { Add as AddIcon, Remove as RemoveIcon, ShoppingCart } from '@mui/icons-material';



// // Simulons une base de données de produits
// const menuItems = [
//   { id: 1, name: "Burger Classic", price: 8.99, category: "Burgers" },
//   { id: 2, name: "Cheeseburger", price: 9.99, category: "Burgers" },
//   { id: 3, name: "Frites", price: 3.99, category: "Accompagnements" },
//   { id: 4, name: "Soda", price: 2.99, category: "Boissons" },
//   { id: 5, name: "Salade César", price: 7.99, category: "Salades" },
//   { id: 6, name: "Nuggets (6 pcs)", price: 5.99, category: "Snacks" },
//   { id: 7, name: "Milkshake", price: 4.99, category: "Boissons" },
//   { id: 8, name: "Pizza Margherita", price: 10.99, category: "Pizzas" },
// ];

// export default function NewOrder() {
//   const [order, setOrder] = useState<{id: number, quantity: number}[]>([]);
//   const [activeCategory, setActiveCategory] = useState("Tous");

//   const addToOrder = (itemId: number) => {
//     setOrder(prevOrder => {
//       const existingItem = prevOrder.find(item => item.id === itemId);
//       if (existingItem) {
//         return prevOrder.map(item => 
//           item.id === itemId ? {...item, quantity: item.quantity + 1} : item
//         );
//       } else {
//         return [...prevOrder, {id: itemId, quantity: 1}];
//       }
//     });
//   };

//   const removeFromOrder = (itemId: number) => {
//     setOrder(prevOrder => {
//       const existingItem = prevOrder.find(item => item.id === itemId);
//       if (existingItem && existingItem.quantity > 1) {
//         return prevOrder.map(item => 
//           item.id === itemId ? {...item, quantity: item.quantity - 1} : item
//         );
//       } else {
//         return prevOrder.filter(item => item.id !== itemId);
//       }
//     });
//   };

//   const getOrderTotal = () => {
//     return order.reduce((total, item) => {
//       const menuItem = menuItems.find(mi => mi.id === item.id);
//       return total + (menuItem ? menuItem.price * item.quantity : 0);
//     }, 0).toFixed(2);
//   };

//   const categories = ["Tous", ...new Set(menuItems.map(item => item.category))];

//   const filteredItems = activeCategory === "Tous" 
//     ? menuItems 
//     : menuItems.filter(item => item.category === activeCategory);

//   return (
    
      
//       <Box sx={{ flexGrow: 1, p: 3 }}>
//         <Typography variant="h4" component="h1" gutterBottom>
//           Nouvelle Commande
//         </Typography>
        
//         <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 2 }}>
//           <Card sx={{ flex: 2 }}>
//             <CardHeader title="Menu" />
//             <CardContent>
//               <Tabs
//                 value={activeCategory}
//                 onChange={(_, newValue) => setActiveCategory(newValue)}
//                 variant="scrollable"
//                 scrollButtons="auto"
//                 sx={{ mb: 2 }}
//               >
//                 {categories.map(category => (
//                   <Tab key={category} label={category} value={category} />
//                 ))}
//               </Tabs>
//               <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: 2 }}>
//                 {filteredItems.map(item => (
//                   <Button
//                     key={item.id}
//                     variant="outlined"
//                     onClick={() => addToOrder(item.id)}
//                     sx={{ height: 'auto', p: 2, display: 'flex', flexDirection: 'column', alignItems: 'start' }}
//                   >
//                     <Typography variant="subtitle1">{item.name}</Typography>
//                     <Typography variant="body2">{item.price.toFixed(2)} €</Typography>
//                   </Button>
//                 ))}
//               </Box>
//             </CardContent>
//           </Card>

//           <Card sx={{ flex: 1 }}>
//             <CardHeader title="Commande en cours" />
//             <CardContent>
//               {order.length === 0 ? (
//                 <Typography>Aucun article sélectionné</Typography>
//               ) : (
//                 <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
//                   {order.map(item => {
//                     const menuItem = menuItems.find(mi => mi.id === item.id);
//                     return menuItem ? (
//                       <Paper key={item.id} sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//                         <Typography>{menuItem.name}</Typography>
//                         <Box sx={{ display: 'flex', alignItems: 'center' }}>
//                           <IconButton size="small" onClick={() => removeFromOrder(item.id)}>
//                             <RemoveIcon />
//                           </IconButton>
//                           <Typography sx={{ mx: 1 }}>{item.quantity}</Typography>
//                           <IconButton size="small" onClick={() => addToOrder(item.id)}>
//                             <AddIcon />
//                           </IconButton>
//                         </Box>
//                       </Paper>
//                     ) : null;
//                   })}
//                 </Box>
//               )}
//               <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
//                 <Typography variant="subtitle1">Total:</Typography>
//                 <Typography variant="subtitle1">{getOrderTotal()} €</Typography>
//               </Box>
//             </CardContent>
//           </Card>
//         </Box>

//         <Button
//           variant="contained"
//           color="primary"
//           startIcon={<ShoppingCart />}
//           fullWidth
//           sx={{ mt: 2 }}
//         >
//           Valider la commande
//         </Button>
//       </Box>
    
//   );
// }


///////////////


// import { useState } from 'react';
// import { 
//   Box, Typography, Button, Card, CardContent, CardHeader, CardMedia,
//   Tabs, Tab, Paper, IconButton, Badge, Divider, useTheme, Grid,
//   useMediaQuery
// } from '@mui/material';
// import { 
//   Add as AddIcon, 
//   Remove as RemoveIcon, 
//   ShoppingCart, 
//   // FastFood as FastFoodIcon 
// } from '@mui/icons-material';

// interface MenuItem {
//   id: number;
//   name: string;
//   price: number;
//   category: string;
//   image: string;
// }

// const menuItems: MenuItem[] = [
//   { id: 1, name: "Burger Classic", price: 8.99, category: "Burgers", image: "/placeholder.svg?height=200&width=200" },
//   { id: 2, name: "Cheeseburger", price: 9.99, category: "Burgers", image: "/placeholder.svg?height=200&width=200" },
//   { id: 3, name: "Frites", price: 3.99, category: "Accompagnements", image: "/placeholder.svg?height=200&width=200" },
//   { id: 4, name: "Soda", price: 2.99, category: "Boissons", image: "/placeholder.svg?height=200&width=200" },
//   { id: 5, name: "Salade César", price: 7.99, category: "Salades", image: "/placeholder.svg?height=200&width=200" },
//   { id: 6, name: "Nuggets (6 pcs)", price: 5.99, category: "Snacks", image: "/placeholder.svg?height=200&width=200" },
//   { id: 7, name: "Milkshake", price: 4.99, category: "Boissons", image: "/placeholder.svg?height=200&width=200" },
//   { id: 8, name: "Pizza Margherita", price: 10.99, category: "Pizzas", image: "/placeholder.svg?height=200&width=200" },
// ];

// export default function NewOrder() {
//   const [order, setOrder] = useState<{id: number, quantity: number}[]>([]);
//   const [activeCategory, setActiveCategory] = useState("Tous");
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

//   const addToOrder = (itemId: number) => {
//     setOrder(prevOrder => {
//       const existingItem = prevOrder.find(item => item.id === itemId);
//       if (existingItem) {
//         return prevOrder.map(item => 
//           item.id === itemId ? {...item, quantity: item.quantity + 1} : item
//         );
//       } else {
//         return [...prevOrder, {id: itemId, quantity: 1}];
//       }
//     });
//   };

//   const removeFromOrder = (itemId: number) => {
//     setOrder(prevOrder => {
//       const existingItem = prevOrder.find(item => item.id === itemId);
//       if (existingItem && existingItem.quantity > 1) {
//         return prevOrder.map(item => 
//           item.id === itemId ? {...item, quantity: item.quantity - 1} : item
//         );
//       } else {
//         return prevOrder.filter(item => item.id !== itemId);
//       }
//     });
//   };

//   const getOrderTotal = () => {
//     return order.reduce((total, item) => {
//       const menuItem = menuItems.find(mi => mi.id === item.id);
//       return total + (menuItem ? menuItem.price * item.quantity : 0);
//     }, 0).toFixed(2);
//   };

//   const categories = ["Tous", ...new Set(menuItems.map(item => item.category))];

//   const filteredItems = activeCategory === "Tous" 
//     ? menuItems 
//     : menuItems.filter(item => item.category === activeCategory);

//   return (
//     <Box sx={{ 
//       flexGrow: 1, 
//       // p: { xs: 1, sm: 2, md: 3 },  
//       height: '100vh', 
//       // overflow: 'hidden', 
//       bgcolor: theme.palette.background.default 
//     }}>
//       {/* <Typography variant="h4" component="h1" gutterBottom sx={{ 
//         fontWeight: 'bold', 
//         color: theme.palette.primary.main,
//         mb: 2,
//         fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' }
//       }}>
//         Nouvelle Commande
//       </Typography> */}
      
//       <Box sx={{ 
//         display: 'flex', 
//         flexDirection: { xs: 'column', md: 'row' }, 
//         gap: 2, 
//         height: 'calc(100vh - 150px)'
//       }}>
//         <Card sx={{ 
//           flex: { xs: 1, md: 2 }, 
//           boxShadow: theme.shadows[3], 
//           borderRadius: 2,
//           display: 'flex',
//           flexDirection: 'column',
//           mb: { xs: 2, md: 0 }
//         }}>
//           <CardHeader 
//             title="Menu" 
//             sx={{ 
//               bgcolor: theme.palette.primary.main, 
//               color: theme.palette.primary.contrastText,
//               py: 1
//             }}
//           />
//           <CardContent sx={{ flexGrow: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column', p: 1 }}>
//             <Tabs
//               value={activeCategory}
//               onChange={(_, newValue) => setActiveCategory(newValue)}
//               variant="scrollable"
//               scrollButtons="auto"
//               sx={{ 
//                 mb: 1,
//                 borderBottom: 1,
//                 borderColor: 'divider',
//                 '& .MuiTab-root': {
//                   minWidth: 'auto',
//                   px: { xs: 1, sm: 2 },
//                   py: 1,
//                   fontSize: { xs: '0.75rem', sm: '0.875rem' }
//                 }
//               }}
//             >
//               {categories.map(category => (
//                 <Tab 
//                   key={category} 
//                   label={category} 
//                   value={category}
//                   sx={{
//                     fontWeight: 'medium',
//                     '&.Mui-selected': {
//                       color: theme.palette.primary.main,
//                     }
//                   }}
//                 />
//               ))}
//             </Tabs>
//             <Box sx={{ 
//               overflow: 'auto',
//               flexGrow: 1,
//               p: 1
//             }}>
//               <Grid container spacing={1}>
//                 {filteredItems.map(item => (
//                   <Grid item xs={6} sm={4} md={3} key={item.id}>
//                     <Card sx={{ 
//                       height: '100%', 
//                       display: 'flex', 
//                       flexDirection: 'column',
//                       transition: 'all 0.3s',
//                       '&:hover': { 
//                         transform: 'translateY(-3px)',
//                         boxShadow: theme.shadows[4]
//                       }
//                     }}>
//                       <CardMedia
//                         component="img"
//                         height={isMobile ? "80" : "120"}
//                         image={item.image}
//                         alt={item.name}
//                       />
//                       <CardContent sx={{ flexGrow: 1, p: 1 }}>
//                         <Typography variant="body1" component="div" sx={{ fontWeight: 'bold', fontSize: { xs: '0.8rem', sm: '1rem' } }}>
//                           {item.name}
//                         </Typography>
//                         <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: '0.7rem', sm: '0.875rem' } }}>
//                           {item.price.toFixed(2)} €
//                         </Typography>
//                       </CardContent>
//                       <Button 
//                         onClick={() => addToOrder(item.id)}
//                         variant="contained" 
//                         startIcon={<AddIcon />}
//                         sx={{ m: 1, py: 0.5, px: 1, fontSize: { xs: '0.7rem', sm: '0.875rem' } }}
//                       >
//                         Ajouter
//                       </Button>
//                     </Card>
//                   </Grid>
//                 ))}
//               </Grid>
//             </Box>
//           </CardContent>
//         </Card>

//         <Card sx={{ 
//           flex: { xs: 1, md: 1 }, 
//           boxShadow: theme.shadows[3], 
//           borderRadius: 2,
//           display: 'flex',
//           flexDirection: 'column'
//         }}>
//           <CardHeader 
//             title="Commande en cours" 
//             sx={{ 
//               bgcolor: theme.palette.secondary.main, 
//               color: theme.palette.secondary.contrastText,
//               py: 1
//             }}
//           />
//           <CardContent sx={{ 
//             flexGrow: 1, 
//             overflowY: 'auto', 
//             display: 'flex', 
//             flexDirection: 'column',
//             p: 1
//           }}>
//             {order.length === 0 ? (
//               <Typography sx={{ textAlign: 'center', color: theme.palette.text.secondary, my: 4 }}>
//                 Aucun article sélectionné
//               </Typography>
//             ) : (
//               <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
//                 {order.map(item => {
//                   const menuItem = menuItems.find(mi => mi.id === item.id);
//                   return menuItem ? (
//                     <Paper key={item.id} sx={{ 
//                       p: 1, 
//                       display: 'flex', 
//                       justifyContent: 'space-between', 
//                       alignItems: 'center',
//                       borderRadius: 2,
//                       boxShadow: theme.shadows[1]
//                     }}>
//                       <Box sx={{ display: 'flex', alignItems: 'center' }}>
//                         <img src={menuItem.image} alt={menuItem.name} style={{ width: 40, height: 40, marginRight: 8, borderRadius: 4 }} />
//                         <Box>
//                           <Typography variant="body2" sx={{ fontWeight: 'bold', fontSize: { xs: '0.8rem', sm: '1rem' } }}>
//                             {menuItem.name}
//                           </Typography>
//                           <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: '0.7rem', sm: '0.875rem' } }}>
//                             {(menuItem.price * item.quantity).toFixed(2)} €
//                           </Typography>
//                         </Box>
//                       </Box>
//                       <Box sx={{ display: 'flex', alignItems: 'center' }}>
//                         <IconButton size="small" onClick={() => removeFromOrder(item.id)}>
//                           <RemoveIcon />
//                         </IconButton>
//                         <Typography sx={{ mx: 1, minWidth: '20px', textAlign: 'center', fontSize: { xs: '0.8rem', sm: '1rem' } }}>
//                           {item.quantity}
//                         </Typography>
//                         <IconButton size="small" onClick={() => addToOrder(item.id)}>
//                           <AddIcon />
//                         </IconButton>
//                       </Box>
//                     </Paper>
//                   ) : null;
//                 })}
//               </Box>
//             )}
//           </CardContent>
//           <Divider />
//           <Box sx={{ p: 2, bgcolor: theme.palette.background.paper }}>
//             <Typography variant="h6" sx={{ mb: 2, fontSize: { xs: '1rem', sm: '1.25rem' } }}>
//               Total: <strong>{getOrderTotal()} €</strong>
//             </Typography>
//             <Button
//               variant="contained"
//               color="primary"
//               startIcon={<ShoppingCart />}
//               fullWidth
//               size="large"
//               sx={{ 
//                 py: 1.5,
//                 transition: 'all 0.3s',
//                 '&:hover': { 
//                   bgcolor: theme.palette.primary.dark,
//                   transform: 'translateY(-2px)',
//                   boxShadow: theme.shadows[4]
//                 },
//                 fontSize: { xs: '0.875rem', sm: '1rem' }
//               }}
//             >
//               Valider la commande
//             </Button>
//           </Box>
//         </Card>
//       </Box>
//     </Box>
//   );
// }








///////////////////////////
















import { useContext, useEffect, useState } from 'react';
import { 
  Box, Typography, Card, CardContent, CardHeader, CardMedia,
  Tabs, Tab, Paper, IconButton, Badge, Divider, useTheme, Grid,
  useMediaQuery, Fab, Dialog, DialogTitle, DialogContent, DialogActions,
  Button, Slide,
  MenuItem,
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
import orderService, { CreateOrderDto, OrderItemDto,OrderType } from '../services/orser.service';
import { AuthContext } from '../../../context/authContext';
import Swal from 'sweetalert2';
import { errorHandler } from '../../../handlers/errorHandler';

interface MenuItem {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
}

const menuPipe =(menu:Menu[]|undefined):MenuItem[]=>{
  if(menu){
    return menu?.reduce((acc:MenuItem[], item) => {
      const formattedItem:MenuItem = {
          id: item.id,
          name: `${item.category.name} ${item.name}`,
          price: item.price ,
          category: item.category.name,
          image: "/placeholder.svg?height=200&width=200"
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
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('lg'));
  const [menuItems, setMenuItems] = useState<MenuItem[]>([])
  const {data:menu,refetch:refetchMenu} = useQuery('menu',async()=>await menuService.getMenu())
  const authContext = useContext(AuthContext);

  useEffect(()=>{
    setMenuItems(menuPipe(menu))
  },[menu])
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

  const removeFromOrder = (itemId: number) => {
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
  const handleCalidateCommande =async()=>{
    if(authContext.user?.userId){
      const createOrderDto:CreateOrderDto={
        userId:+authContext.user?.userId,
        type:OrderType.takeout,
        orderItems:order
      }
      await orderService.createOrder(createOrderDto)
      .then(()=>{
        Swal.fire({
          title:'commande validee',
          icon:'success',
          toast:true
        })
      }).then(()=>{
        refetchMenu()
      }).catch((error)=>errorHandler(error))
    }
  }
  const renderOrderContent = () => (
    order.length === 0 ? null : (
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        {order.map(item => {
          const menuItem = menuItems.find(mi => mi.id === item.dishId);
          return menuItem ? (
            <Paper key={item.dishId} sx={{ 
              p: 1, 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              borderRadius: 2,
              boxShadow: theme.shadows[1]
            }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <img src={menuItem.image} alt={menuItem.name} style={{ width: 40, height: 40, marginRight: 8, borderRadius: 4 }} />
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
      height: '100vh', 
      overflow: 'hidden', 
      bgcolor: theme.palette.background.default 
    }}>
      {/* <Typography variant="h4" component="h1" gutterBottom sx={{ 
        fontWeight: 'bold', 
        color: theme.palette.primary.main,
        mb: 2,
        fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' }
      }}>
        Nouvelle Commande
      </Typography> */}
      
      <Box sx={{ 
        display: 'flex', 
        flexDirection: { xs: 'column', md: 'row' }, 
        gap: 2, 
        height: isMobile?'calc(100vh - 60px)':'calc(100vh - 120px)',
        overflow:isMobile?'hidden':'auto'
      }}>
        <Card sx={{ 
          flex: 1, 
          // boxShadow: theme.shadows[1], 
          borderRadius: 2,
          display: 'flex',
          flexDirection: 'column',
          mb: { xs: 2, md: 0 },
          // overflow:isMobile?'hidden':'auto'

        }}>
          <CardHeader 
            title="Menu" 
            sx={{ 
              bgcolor: hexToRgba(theme.palette.primary.main,0.4), 
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
              overflow: 'hidden',
              flexGrow: 1,
              p: 1
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
                          boxShadow: theme.shadows[4]
                        }
                      }}
                      onClick={() => addToOrder(item.id)}
                    >
                      <CardMedia
                        component="img"
                        height={isMobile ? "80" : "120"}
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
            boxShadow: theme.shadows[3], 
            borderRadius: 2,
            display: 'flex',
            flexDirection: 'column'
          }}>
            <CardHeader 
              title="Commande en cours" 
              sx={{ 
                bgcolor: hexToRgba(theme.palette.primary.main,0.4), 
                color: theme.palette.text.primary,
                py: 1
              }}
            />
            <CardContent sx={{ 
              flexGrow: 1, 
              overflowY: 'auto', 
              display: 'flex', 
              flexDirection: 'column',
              p: 1
            }}>
              {order.length === 0 ? (
                <Typography sx={{ textAlign: 'center', color: theme.palette.text.secondary, my: 4 }}>
                  Aucun article sélectionné
                </Typography>
              ) : renderOrderContent()}
            </CardContent>
            <Divider />
            <Box sx={{ p: 2, bgcolor: theme.palette.background.paper }}>
              <Typography variant="h6" sx={{ mb: 2, fontSize: { xs: '1rem', sm: '1.25rem' } }}>
                Total: <strong>{getOrderTotal()} DA</strong>
              </Typography>
              <Button
                variant="contained"
                color="primary"
                startIcon={<ShoppingCart />}
                fullWidth
                size="large"
                sx={{ 
                  py: 1.5,
                  transition: 'all 0.3s',
                  '&:hover': { 
                    bgcolor: theme.palette.primary.dark,
                    transform: 'translateY(-2px)',
                    boxShadow: theme.shadows[4]
                  },
                  fontSize: { xs: '0.875rem', sm: '1rem' }
                }}
                onClick={handleCalidateCommande}
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
            // color="secondary" 
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
            <DialogContent dividers>
              {order.length === 0 ? (
                <Typography sx={{ textAlign: 'center', color: theme.palette.text.secondary, my: 4 }}>
                  Aucun article sélectionné
                </Typography>
              ) : renderOrderContent()}
            </DialogContent>
            <DialogActions sx={{ flexDirection: 'column', alignItems: 'stretch', p: 2 }}>
              <Typography variant="h6" sx={{ mb: 2, fontSize: { xs: '1rem', sm: '1.25rem' } }}>
                Total: <strong>{getOrderTotal()} DA</strong>
              </Typography>
              <Button
                variant="contained"
                color="primary"
                startIcon={<ShoppingCart />}
                size="large"
                fullWidth
                sx={{ 
                  py: 1.5,
                
                  transition: 'all 0.3s',
                  '&:hover': { 
                    bgcolor: theme.palette.primary.dark,
                    transform: 'translateY(-2px)',
                    boxShadow: theme.shadows[4]
                  },
                  fontSize: { xs: '0.875rem', sm: '1rem' }
                }}
                onClick={handleCalidateCommande}
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