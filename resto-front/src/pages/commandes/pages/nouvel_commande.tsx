

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
import { useState } from 'react';
import { Box, Typography, Button, Card, CardContent, CardHeader, 
  Tabs, Tab, Paper, IconButton
} from '@mui/material';
import { Add as AddIcon, Remove as RemoveIcon, ShoppingCart } from '@mui/icons-material';

const menuItems = [
  { id: 1, name: "Burger Classic", price: 8.99, category: "Burgers" },
  { id: 2, name: "Cheeseburger", price: 9.99, category: "Burgers" },
  { id: 3, name: "Frites", price: 3.99, category: "Accompagnements" },
  { id: 4, name: "Soda", price: 2.99, category: "Boissons" },
  { id: 5, name: "Salade César", price: 7.99, category: "Salades" },
  { id: 6, name: "Nuggets (6 pcs)", price: 5.99, category: "Snacks" },
  { id: 7, name: "Milkshake", price: 4.99, category: "Boissons" },
  { id: 8, name: "Pizza Margherita", price: 10.99, category: "Pizzas" },
];

export default function NewOrder() {
  const [order, setOrder] = useState<{id: number, quantity: number}[]>([]);
  const [activeCategory, setActiveCategory] = useState("Tous");

  const addToOrder = (itemId: number) => {
    setOrder(prevOrder => {
      const existingItem = prevOrder.find(item => item.id === itemId);
      if (existingItem) {
        return prevOrder.map(item => 
          item.id === itemId ? {...item, quantity: item.quantity + 1} : item
        );
      } else {
        return [...prevOrder, {id: itemId, quantity: 1}];
      }
    });
  };

  const removeFromOrder = (itemId: number) => {
    setOrder(prevOrder => {
      const existingItem = prevOrder.find(item => item.id === itemId);
      if (existingItem && existingItem.quantity > 1) {
        return prevOrder.map(item => 
          item.id === itemId ? {...item, quantity: item.quantity - 1} : item
        );
      } else {
        return prevOrder.filter(item => item.id !== itemId);
      }
    });
  };

  const getOrderTotal = () => {
    return order.reduce((total, item) => {
      const menuItem = menuItems.find(mi => mi.id === item.id);
      return total + (menuItem ? menuItem.price * item.quantity : 0);
    }, 0).toFixed(2);
  };

  const categories = ["Tous", ...new Set(menuItems.map(item => item.category))];

  const filteredItems = activeCategory === "Tous" 
    ? menuItems 
    : menuItems.filter(item => item.category === activeCategory);

  return (
    <Box sx={{ flexGrow: 1, p: 3, bgcolor: '#f5f5f5', height: '100vh' }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Nouvelle Commande
      </Typography>
      
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 2 }}>
        <Card sx={{ flex: 2, boxShadow: 3 }}>
          <CardHeader title="Menu" />
          <CardContent>
            <Tabs
              value={activeCategory}
              onChange={(_, newValue) => setActiveCategory(newValue)}
              variant="scrollable"
              scrollButtons="auto"
              sx={{ mb: 2 }}
            >
              {categories.map(category => (
                <Tab key={category} label={category} value={category} />
              ))}
            </Tabs>
            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: 2 }}>
              {filteredItems.map(item => (
                <Button
                  key={item.id}
                  variant="outlined"
                  onClick={() => addToOrder(item.id)}
                  sx={{ height: 'auto', p: 2, display: 'flex', flexDirection: 'column', alignItems: 'start', '&:hover': { bgcolor: '#eee' } }}
                >
                  <Typography variant="subtitle1">{item.name}</Typography>
                  <Typography variant="body2">{item.price.toFixed(2)} €</Typography>
                </Button>
              ))}
            </Box>
          </CardContent>
        </Card>

        <Card sx={{ flex: 1, boxShadow: 3, overflowY: 'auto', maxHeight: '70vh' }}>
          <CardHeader title="Commande en cours" />
          <CardContent>
            {order.length === 0 ? (
              <Typography>Aucun article sélectionné</Typography>
            ) : (
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {order.map(item => {
                  const menuItem = menuItems.find(mi => mi.id === item.id);
                  return menuItem ? (
                    <Paper key={item.id} sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Typography>{menuItem.name}</Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <IconButton size="small" onClick={() => removeFromOrder(item.id)}>
                          <RemoveIcon />
                        </IconButton>
                        <Typography sx={{ mx: 1 }}>{item.quantity}</Typography>
                        <IconButton size="small" onClick={() => addToOrder(item.id)}>
                          <AddIcon />
                        </IconButton>
                      </Box>
                    </Paper>
                  ) : null;
                })}
              </Box>
            )}
            <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="subtitle1">Total:</Typography>
              <Typography variant="subtitle1">{getOrderTotal()} €</Typography>
            </Box>
            <Button
              variant="contained"
              color="primary"
              startIcon={<ShoppingCart />}
              fullWidth
              sx={{ mt: 2, '&:hover': { bgcolor: '#333' } }}
            >
              Valider la commande
            </Button>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}