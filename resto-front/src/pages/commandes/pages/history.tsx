import  { useState } from 'react';
import { 
  Box, Typography, Button, 
  Chip, Dialog, DialogTitle, DialogContent, DialogActions,
  Table, TableCell, TableContainer, TableHead, TableRow,
  useTheme,
  
} from '@mui/material';
import { GridColDef, GridRenderCellParams, } from '@mui/x-data-grid';
import { Info as InfoIcon } from '@mui/icons-material';
import {  hexToRgba } from '../../../utils/utils';
import { useQueries,  } from 'react-query';
import orderService, { OrderStatus } from '../services/orser.service'

import  { FetchDataOptions } from '../../../components/pagination-datagrid';
import ServerSideDataGrid from '../../../components/pagination-datagrid';

interface OrderItem {
  id: number;
  name: string;
  quantity: number;
  price: number;
}

export interface Order {
  id: number;
  items: OrderItem[];
  status: 'Terminée' | 'Annulée'|'PENDING';
  tableNumber: number;
  date: string;
  total: number;
}
 
 


export default function OrderHistory() {
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
  const getStatusColorHex = (status: Order['status']) => {
    switch (status) {
      case 'Terminée':
        return palette.success.light;
      case 'Annulée':
        return palette.error.light;
      case 'PENDING':
        return palette.primary.light;
      default:
        return palette.grey[300]
    }
  };

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'N° Commande', flex:1,type:'number' },
    { field: 'date', headerName: 'Date', flex:1,type:'date',valueGetter:(value)=>new Date(value)},
    { field: 'tableNumber', headerName: 'Table', flex:1,type:'number' },
    { 
      field: 'items', 
      headerName: 'Articles', 
      flex:2,
      filterable:false,
      valueGetter: (params:OrderItem[]) => params.map((item: OrderItem) => `${item.quantity}x ${item.name}`).join(', ')
    },
    { 
      field: 'total', 
      headerName: 'Total', 
      flex:1,
      type:'number',
      filterable:false,
      
      valueFormatter: (params:number) => `${params} DA`
    
    },
    { 
      field: 'status', 
      headerName: 'Statut', 
      flex:1,
      type:'singleSelect',
      valueOptions() {
        return [
          {
            label:'pending',
            value:OrderStatus.PENDING
          },
          {
            label:'terminnee',
            value:OrderStatus.COMPLETED
          },
          {
            label:'annulee',
            value:OrderStatus.CANCELLED
          }
        ]
      },
      renderCell: (params: GridRenderCellParams) => {
        console.log({params})
        return (
          <Chip 
            label={params.value} 
            variant='outlined'
            color={getStatusColor(params.value as Order['status'])}
            sx={{
              borderColor:getStatusColorHex(params.value as Order['status']),
              color:getStatusColorHex(params.value as Order['status']),
              bgcolor:hexToRgba(
                getStatusColorHex(params.value as Order['status'])
                ,
                0.1
              )
            }}
            size="small"
          />
        )
      }
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
  const [{data:fetched} ] = useQueries([
    {queryKey:['gridData', ],queryFn:async() =>await orderService.getFiltredOrders({page:0,pageSize:3}),}
  ])
  console.log({fetched})
 
 const fetchOrders =async(optios:FetchDataOptions)=>{
    return await orderService.getFiltredOrders(optios)
 }
  return (
      <Box sx={{ flexGrow: 1, p: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Historique des Commandes
        </Typography>
        
       <ServerSideDataGrid<any>
       columns={columns}
       fetchData={fetchOrders}
      //  initialPageSize={}
       key={'key'}
       />
  

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