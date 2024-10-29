// import React, { useState } from 'react';
// import { 
//   Box, 
//   Grid, 
//   Paper, 
//   Typography, 
//   Button, 
//   Dialog, 
//   DialogTitle, 
//   DialogContent, 
//   DialogActions,
//   useTheme
// } from '@mui/material';
// import { TableRestaurant as Table, Chair } from '@mui/icons-material';

// interface TableData {
//   id: number;
//   number: number;
//   seats: number;
//   isOccupied: boolean;
// }

// const initialTables: TableData[] = [
//   { id: 1, number: 1, seats: 2, isOccupied: false },
//   { id: 2, number: 2, seats: 4, isOccupied: true },
//   { id: 3, number: 3, seats: 6, isOccupied: false },
//   { id: 4, number: 4, seats: 2, isOccupied: true },
//   { id: 5, number: 5, seats: 4, isOccupied: false },
//   { id: 6, number: 6, seats: 8, isOccupied: false },
//   { id: 7, number: 7, seats: 2, isOccupied: true },
//   { id: 8, number: 8, seats: 4, isOccupied: false },
// ];

// export default function RestaurantTables() {
//   const [tables, setTables] = useState<TableData[]>(initialTables);
//   const [selectedTable, setSelectedTable] = useState<TableData | null>(null);
//   const [isDialogOpen, setIsDialogOpen] = useState(false);
//   const theme = useTheme();

//   const handleTableClick = (table: TableData) => {
//     setSelectedTable(table);
//     setIsDialogOpen(true);
//   };

//   const handleCloseDialog = () => {
//     setIsDialogOpen(false);
//   };

//   const handleToggleOccupancy = () => {
//     if (selectedTable) {
//       const updatedTables = tables.map(table => 
//         table.id === selectedTable.id 
//           ? { ...table, isOccupied: !table.isOccupied } 
//           : table
//       );
//       setTables(updatedTables);
//       setSelectedTable({ ...selectedTable, isOccupied: !selectedTable.isOccupied });
//     }
//   };

//   return (
//     <Box sx={{ flexGrow: 1, p: 3 }}>
//       <Typography variant="h4" gutterBottom>
//         Plan de Salle
//       </Typography>
//       <Grid container spacing={3}>
//         {tables.map((table) => (
//           <Grid item xs={6} sm={4} md={3} key={table.id}>
//             <Paper
//               elevation={3}
//               sx={{
//                 p: 2,
//                 display: 'flex',
//                 flexDirection: 'column',
//                 alignItems: 'center',
//                 cursor: 'pointer',
//                 bgcolor: table.isOccupied ? theme.palette.error.light : theme.palette.success.light,
//                 '&:hover': {
//                   bgcolor: table.isOccupied ? theme.palette.error.main : theme.palette.success.main,
//                 },
//               }}
//               onClick={() => handleTableClick(table)}
//             >
//               <Table sx={{ fontSize: 40, color: table.isOccupied ? theme.palette.error.dark : theme.palette.success.dark }} />
//               <Typography variant="h6">Table {table.number}</Typography>
//               <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
//                 <Chair sx={{ mr: 1 }} />
//                 <Typography>{table.seats} places</Typography>
//               </Box>
//               <Typography variant="body2" sx={{ mt: 1 }}>
//                 {table.isOccupied ? 'Occupée' : 'Libre'}
//               </Typography>
//             </Paper>
//           </Grid>
//         ))}
//       </Grid>

//       <Dialog open={isDialogOpen} onClose={handleCloseDialog}>
//         <DialogTitle>Table {selectedTable?.number}</DialogTitle>
//         <DialogContent>
//           <Typography>Nombre de places : {selectedTable?.seats}</Typography>
//           <Typography>
//             Statut : {selectedTable?.isOccupied ? 'Occupée' : 'Libre'}
//           </Typography>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleCloseDialog}>Fermer</Button>
//           <Button onClick={handleToggleOccupancy} variant="contained" color={selectedTable?.isOccupied ? "success" : "error"}>
//             {selectedTable?.isOccupied ? 'Libérer la table' : 'Occuper la table'}
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </Box>
//   );
// }


//////////////



import React, { useState } from 'react';
import { 
  Box, 
  Grid, 
  Paper, 
  Typography, 
  Button, 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions,
  useTheme,
  Chip,
  Avatar,
  List,
  ListItem,
  ListItemText,
  Divider,
  TextField,
  IconButton,
} from '@mui/material';
import { 
  TableRestaurant as TableIcon, 
  Person as PersonIcon,
  Receipt as ReceiptIcon,
  Euro as EuroIcon,
  Close as CloseIcon,
} from '@mui/icons-material';

interface TableData {
  id: number;
  number: number;
  seats: number;
  isOccupied: boolean;
  order?: OrderItem[];
}

interface OrderItem {
  name: string;
  price: number;
  quantity: number;
}

const initialTables: TableData[] = [
  { id: 1, number: 1, seats: 2, isOccupied: false },
  { id: 2, number: 2, seats: 4, isOccupied: true, order: [
    { name: "Pizza Margherita", price: 10, quantity: 2 },
    { name: "Salade César", price: 8, quantity: 1 },
    { name: "Tiramisu", price: 6, quantity: 2 }
  ]},
  { id: 3, number: 3, seats: 6, isOccupied: false },
  { id: 4, number: 4, seats: 2, isOccupied: true, order: [
    { name: "Burger", price: 12, quantity: 2 },
    { name: "Frites", price: 4, quantity: 2 },
    { name: "Soda", price: 3, quantity: 2 }
  ]},
  { id: 5, number: 5, seats: 4, isOccupied: false },
  { id: 6, number: 6, seats: 8, isOccupied: false },
  { id: 7, number: 7, seats: 2, isOccupied: true, order: [
    { name: "Pâtes Carbonara", price: 14, quantity: 1 },
    { name: "Vin Rouge", price: 20, quantity: 1 }
  ]},
  { id: 8, number: 8, seats: 4, isOccupied: false },
];

export default function RestaurantTables() {
  const [tables, setTables] = useState<TableData[]>(initialTables);
  const [selectedTable, setSelectedTable] = useState<TableData | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isBillingDialogOpen, setIsBillingDialogOpen] = useState(false);
  const [paymentAmount, setPaymentAmount] = useState<string>('');
  const theme = useTheme();

  const handleTableClick = (table: TableData) => {
    setSelectedTable(table);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  const handleToggleOccupancy = () => {
    if (selectedTable) {
      const updatedTables = tables.map(table => 
        table.id === selectedTable.id 
          ? { ...table, isOccupied: !table.isOccupied, order: table.isOccupied ? undefined : [] } 
          : table
      );
      setTables(updatedTables);
      setSelectedTable({ ...selectedTable, isOccupied: !selectedTable.isOccupied, order: selectedTable.isOccupied ? undefined : [] });
    }
  };

  const handleOpenBilling = () => {
    setIsBillingDialogOpen(true);
  };

  const handleCloseBilling = () => {
    setIsBillingDialogOpen(false);
    setPaymentAmount('');
  };

  const handlePayment = () => {
    if (selectedTable && selectedTable.order) {
      const totalBill = calculateTotalBill(selectedTable.order);
      if (parseFloat(paymentAmount) >= totalBill) {
        const updatedTables = tables.map(table => 
          table.id === selectedTable.id 
            ? { ...table, isOccupied: false, order: undefined } 
            : table
        );
        setTables(updatedTables);
        setSelectedTable({ ...selectedTable, isOccupied: false, order: undefined });
        handleCloseBilling();
        handleCloseDialog();
      } else {
        alert("Le montant payé est insuffisant.");
      }
    }
  };

  const calculateTotalBill = (order: OrderItem[]): number => {
    return order.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <Box sx={{ flexGrow: 1, p: 4, backgroundColor: theme.palette.background.default }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: theme.palette.primary.main, mb: 4 }}>
        Plan de Salle
      </Typography>
      <Grid container spacing={4}>
        {tables.map((table) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={table.id}>
            <Paper
              elevation={3}
              sx={{
                p: 3,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                cursor: 'pointer',
                bgcolor: table.isOccupied ? theme.palette.error.light : theme.palette.success.light,
                borderRadius: '12px',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: theme.shadows[6],
                },
              }}
              onClick={() => handleTableClick(table)}
            >
              <Avatar 
                sx={{ 
                  bgcolor: table.isOccupied ? theme.palette.error.dark : theme.palette.success.dark,
                  width: 70,
                  height: 70,
                  mb: 2
                }}
              >
                <TableIcon sx={{ fontSize: 40 }} />
              </Avatar>
              <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 1 }}>Table {table.number}</Typography>
              <Chip
                icon={<PersonIcon />}
                label={`${table.seats} places`}
                sx={{ mb: 1, bgcolor: 'rgba(255, 255, 255, 0.7)' }}
              />
              <Chip
                label={table.isOccupied ? 'Occupée' : 'Libre'}
                color={table.isOccupied ? 'error' : 'success'}
                sx={{ fontWeight: 'bold' }}
              />
              {table.isOccupied && (
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<ReceiptIcon />}
                  sx={{ mt: 2 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleTableClick(table);
                    handleOpenBilling();
                  }}
                >
                  Voir la facture
                </Button>
              )}
            </Paper>
          </Grid>
        ))}
      </Grid>

      <Dialog 
        open={isDialogOpen} 
        onClose={handleCloseDialog}
        fullWidth
        maxWidth="sm"
        PaperProps={{
          sx: {
            borderRadius: '12px',
            boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
          }
        }}
      >
        <DialogTitle sx={{ 
          bgcolor: selectedTable?.isOccupied ? theme.palette.error.light : theme.palette.success.light,
          color: theme.palette.getContrastText(selectedTable?.isOccupied ? theme.palette.error.light : theme.palette.success.light),
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Avatar sx={{ bgcolor: selectedTable?.isOccupied ? theme.palette.error.dark : theme.palette.success.dark, mr: 2 }}>
              <TableIcon />
            </Avatar>
            <Typography variant="h6">Table {selectedTable?.number}</Typography>
          </Box>
          <IconButton edge="end" color="inherit" onClick={handleCloseDialog} aria-label="close">
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ mt: 2 }}>
          <Typography variant="body1" gutterBottom>
            <strong>Nombre de places :</strong> {selectedTable?.seats}
          </Typography>
          <Typography variant="body1" gutterBottom>
            <strong>Statut :</strong> {selectedTable?.isOccupied ? 'Occupée' : 'Libre'}
          </Typography>
          {selectedTable?.isOccupied && selectedTable.order && (
            <>
              <Typography variant="h6" sx={{ mt: 3, mb: 2 }}>Commande en cours :</Typography>
              <List>
                {selectedTable.order.map((item, index) => (
                  <React.Fragment key={index}>
                    <ListItem>
                      <ListItemText 
                        primary={item.name} 
                        secondary={`${item.quantity} x ${item.price.toFixed(2)} €`} 
                      />
                      <Typography variant="body2">
                        {(item.quantity * item.price).toFixed(2)} €
                      </Typography>
                    </ListItem>
                    
                    {
                        //@ts-ignore
                    index < selectedTable.order.length - 1 && <Divider />}
                  </React.Fragment>
                ))}
              </List>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                <Typography variant="h6">
                  Total : {calculateTotalBill(selectedTable.order).toFixed(2)} €
                </Typography>
              </Box>
            </>
          )}
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          {selectedTable?.isOccupied ? (
            <Button 
              onClick={handleOpenBilling} 
              variant="contained" 
              color="primary"
              startIcon={<ReceiptIcon />}
              size="large"
            >
              Payer et Libérer
            </Button>
          ) : (
            <Button 
              onClick={handleToggleOccupancy} 
              variant="contained" 
              color="error"
              startIcon={<TableIcon />}
              size="large"
            >
              Occuper la table
            </Button>
          )}
        </DialogActions>
      </Dialog>

      <Dialog 
        open={isBillingDialogOpen} 
        onClose={handleCloseBilling}
        fullWidth
        maxWidth="xs"
        PaperProps={{
          sx: {
            borderRadius: '12px',
            boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
          }
        }}
      >
        <DialogTitle sx={{ bgcolor: theme.palette.primary.main, color: theme.palette.primary.contrastText }}>
          Paiement pour la Table {selectedTable?.number}
        </DialogTitle>
        <DialogContent sx={{ mt: 2 }}>
          <Typography variant="h6" gutterBottom>
            Total à payer : {selectedTable?.order ? calculateTotalBill(selectedTable.order).toFixed(2) : '0.00'} €
          </Typography>
          <TextField
            autoFocus
            margin="dense"
            id="payment"
            label="Montant payé"
            type="number"
            fullWidth
            variant="outlined"
            value={paymentAmount}
            onChange={(e) => setPaymentAmount(e.target.value)}
            InputProps={{
              startAdornment: <EuroIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />,
            }}
          />
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button onClick={handleCloseBilling} color="inherit">Annuler</Button>
          <Button onClick={handlePayment} variant="contained" color="primary" size="large">
            Confirmer le paiement
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}