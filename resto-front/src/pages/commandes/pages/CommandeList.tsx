// import  { useState } from 'react';
// import { 
//     Box, Typography, Button, Card, CardContent,
//   Chip, Dialog, DialogTitle, DialogContent, DialogActions,
//   Table, TableBody, TableCell, TableContainer, TableHead, TableRow
// } from '@mui/material';
// import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
// import { 
//   Check as CheckIcon, 
//   Info as InfoIcon,
//   Add as AddIcon
// } from '@mui/icons-material';

 


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

// // Données simulées pour les commandes en cours
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
//     { field: 'id', headerName: 'N° Commande', flex:1 },
//     { field: 'tableNumber', headerName: 'Table', flex:1 },
//     { 
//       field: 'items', 
//       headerName: 'Articles', 
//       flex:2,
//       valueGetter:(params:OrderItem[])=>{
//          const articles = params.reduce((acc:string,cur)=>{
//             return `${acc} ${cur.name},`
//         },'')
//         return articles
//       }
//      },
//     { 
//       field: 'total', 
//       headerName: 'Total', 
//       flex:1,
//       renderCell:(params)=>{
//            return `${getTotalPrice(params.row.items)} DA`
//       }
//     },
//     { 
//       field: 'status', 
//       headerName: 'Statut', 
//       flex:1,
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
//       flex:1,
//       renderCell: (params: GridRenderCellParams) => (
//         <Box>
//           <Button
//             startIcon={<InfoIcon />}
//             size="small"
//             onClick={() => handleOpenDialog(params.row)}
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
   
//       <Box sx={{ flexGrow: 1, p: 1 }}>
//         <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
//           <Typography variant="h4" component="h1">
//             Commandes en cours
//           </Typography>
//           <Button
//             variant="contained"
//             color="primary"
//             startIcon={<AddIcon />}
//             onClick={() => {
//               // Ici, vous pouvez ajouter la logique de navigation vers la page de lancement de commandes
//               console.log("Naviguer vers la page de lancement de commandes");
//             }}
//           >
//             Nouvelle Commande
//           </Button>
//         </Box>
        
//         <Card>
//           <CardContent>
//             <DataGrid
           
//               rows={orders}
//               columns={columns}
           
//             />
//           </CardContent>
//         </Card>

//         <Dialog open={openDialog} onClose={handleCloseDialog}>
//           <DialogTitle>Détails de la commande #{selectedOrder?.id}</DialogTitle>
//           <DialogContent>
//             {selectedOrder && (
//               <Box>
//                 <Typography variant="subtitle1">Table: {selectedOrder.tableNumber}</Typography>
//                 <Typography variant="subtitle1" gutterBottom>Statut: {selectedOrder.status}</Typography>
//                 <TableContainer>
//                   <Table size="small">
//                     <TableHead>
//                       <TableRow>
//                         <TableCell>Article</TableCell>
//                         <TableCell align="right">Quantité</TableCell>
//                         <TableCell align="right">Prix unitaire</TableCell>
//                         <TableCell align="right">Total</TableCell>
//                       </TableRow>
//                     </TableHead>
//                     <TableBody>
//                       {selectedOrder.items.map((item) => (
//                         <TableRow key={item.id}>
//                           <TableCell>{item.name}</TableCell>
//                           <TableCell align="right">{item.quantity}</TableCell>
//                           <TableCell align="right">{item.price.toFixed(2)} €</TableCell>
//                           <TableCell align="right">{(item.quantity * item.price).toFixed(2)} €</TableCell>
//                         </TableRow>
//                       ))}
//                       <TableRow>
//                         <TableCell colSpan={3} align="right"><strong>Total</strong></TableCell>
//                         <TableCell align="right"><strong>{getTotalPrice(selectedOrder.items)} €</strong></TableCell>
//                       </TableRow>
//                     </TableBody>
//                   </Table>
//                 </TableContainer>
//               </Box>
//             )}
//           </DialogContent>
//           <DialogActions>
//             <Button onClick={handleCloseDialog} color="primary">
//               Fermer
//             </Button>
//           </DialogActions>
//         </Dialog>
//       </Box>
//    );
// }



/////////////////////////




import { useState } from 'react';
import { 
  Box, Typography, Button, Card, CardContent,
  Chip, Dialog, DialogTitle, DialogContent, DialogActions,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  useTheme,
} from '@mui/material';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { 
  Check as CheckIcon, 
  Info as InfoIcon,
  Add as AddIcon
} from '@mui/icons-material';
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
  status: 'En préparation' | 'Prêt' | 'Servi';
  tableNumber: number;
}

const initialOrders: Order[] = [
  {
    id: 1,
    items: [
      { id: 1, name: "Burger Classic", quantity: 2, price: 8.99 },
      { id: 3, name: "Frites", quantity: 2, price: 3.99 },
    ],
    status: 'En préparation',
    tableNumber: 3,
  },
  {
    id: 2,
    items: [
      { id: 5, name: "Salade César", quantity: 1, price: 7.99 },
      { id: 4, name: "Soda", quantity: 1, price: 2.99 },
    ],
    status: 'Prêt',
    tableNumber: 5,
  },
  {
    id: 3,
    items: [
      { id: 2, name: "Cheeseburger", quantity: 1, price: 9.99 },
      { id: 6, name: "Nuggets (6 pcs)", quantity: 1, price: 5.99 },
      { id: 7, name: "Milkshake", quantity: 2, price: 4.99 },
    ],
    status: 'En préparation',
    tableNumber: 2,
  },
];

export default function CurrentOrders() {
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const {palette} = useTheme();

  const handleStatusChange = (orderId: number, newStatus: Order['status']) => {
    setOrders(prevOrders =>
      prevOrders.map(order =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );
  };

  const handleOpenDialog = (order: Order) => {
    setSelectedOrder(order);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'En préparation':
        return 'warning';
      case 'Prêt':
        return 'success';
      case 'Servi':
        return 'default';
    }
  };

  const getTotalPrice = (items: OrderItem[]) => {
    return items.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'N° Commande', flex: 1 },
    { field: 'tableNumber', headerName: 'Table', flex: 1 },
    { 
      field: 'items', 
      headerName: 'Articles', 
      flex: 2,
      valueGetter: (params:OrderItem[]) => {
        // return params.value?.map(item => item.name).join(', ');
        return params.reduce((acc,cur)=>{
            return `${acc} ${cur.name},`
        },'')
      },
    },
    { 
      field: 'total', 
      headerName: 'Total', 
      flex: 1,
      renderCell: (params: GridRenderCellParams) => `${getTotalPrice(params.row.items)} DA`

    //      (
    //     <Typography fontWeight="bold" color="primary">
    //       {getTotalPrice(params.row.items)} DA
    //     </Typography>
    //   )
    },
    { 
      field: 'status', 
      headerName: 'Statut', 
      flex: 1,
      renderCell: (params: GridRenderCellParams) => (
        <Chip 
          label={params.value} 
          color={getStatusColor(params.value as Order['status'])}
          size="small"
        />
      )
    },
    {
      field: 'actions',
      headerName: 'Actions',
      flex: 1,
      renderCell: (params: GridRenderCellParams) => (
        <Box>
          <Button
            startIcon={<InfoIcon />}
            size="small"
            onClick={() => handleOpenDialog(params.row)}
            variant="outlined"
            color="info"
          >
            Détails
          </Button>
          {params.row.status !== 'Servi' && (
            <Button
              startIcon={<CheckIcon />}
              size="small"
              color="primary"
              onClick={() => handleStatusChange(params.row.id, params.row.status === 'En préparation' ? 'Prêt' : 'Servi')}
            >
              {params.row.status === 'En préparation' ? 'Prêt' : 'Servi'}
            </Button>
          )}
        </Box>
      )
    },
  ];

  return (
    <Box sx={{ flexGrow: 1, p: 3, }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1" color="primary" fontWeight="bold">
          Commandes en cours
        </Typography>
        <Button
          variant="contained"
          color="secondary"
          startIcon={<AddIcon />}
          onClick={() => console.log("Naviguer vers la page de lancement de commandes")}
          sx={{ borderRadius: '20px' }}
        >
          Nouvelle Commande
        </Button>
      </Box>
      
      <Card sx={{  boxShadow: 3 }}>
        <CardContent>
          <DataGrid
            rows={orders}
            columns={columns}
            
            sx={{
                '& .MuiDataGrid-toolbarContainer': {
                  padding: '8px',
                  backgroundColor:hexToRgba(palette.primary.light,0.3)
                },
                '& .MuiButton-root': {
                  color: 'primary.main',
                },
              }}
          />
        </CardContent>
      </Card>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>
          <Typography variant="h6" color="primary">
            Détails de la commande #{selectedOrder?.id}
          </Typography>
        </DialogTitle>
        <DialogContent dividers>
          {selectedOrder && (
            <Box>
              <Typography variant="subtitle1" gutterBottom>
                <strong>Table :</strong> {selectedOrder.tableNumber}
              </Typography>
              <Typography variant="subtitle1" gutterBottom>
                <strong>Statut :</strong> {selectedOrder.status}
              </Typography>
              <TableContainer>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell><strong>Article</strong></TableCell>
                      <TableCell align="right"><strong>Quantité</strong></TableCell>
                      <TableCell align="right"><strong>Prix unitaire</strong></TableCell>
                      <TableCell align="right"><strong>Total</strong></TableCell>
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
                      <TableCell align="right"><strong>{getTotalPrice(selectedOrder.items)} €</strong></TableCell>
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
