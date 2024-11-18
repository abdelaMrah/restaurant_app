import React, { useMemo, useState } from 'react';
import {
  Box, Typography, Paper, Grid, Select, MenuItem, FormControl, InputLabel,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow
} from '@mui/material';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell
} from 'recharts';
import { useQueries } from 'react-query';
import analyticsService, { CategoryMenuRespose, CategoryRevenu, RevenuItem, TotalRevenueResponse } from '../services/analyticsService';
import { stringToVividColor } from '../../../utils/utils';
import dayjs from 'dayjs';
 interface SalesData{
  name:string;
  ventes:number;
 }
interface CategpryData{
  name: string;
  value: number;
}
interface TopSalesItems{
  name: string;
  quantity: number;
  revenue: number;
}
 
 

 

const getCategoryDataPipe = (data:CategoryRevenu[] | undefined)=>{
  if(!data) return {}
  const res = data.map((item)=>{
    return {
      name:item.category_name,
      value:item.total_revenue
    } as CategpryData
  })
  const COLORS = data?.map((cat) => stringToVividColor(cat.category_name));
 return {
  categoryData:res,
  COLORS
 }
  
}

const getSalesDataPipe =(data:TotalRevenueResponse[] | undefined):SalesData[]=>{
  if(!data)return []
  const res  =data.map((item)=>{
    return {
      name:dayjs(item.sale_date).format('ddd'),
      ventes:item.total_revenue
    }as SalesData
  })
  return res;
}

const getItemsRevenu =(data:RevenuItem[] | undefined):TopSalesItems[]=>{
  if(!data) return [];
  const res = data.map((item)=>{
    return {
      name:item.item_name,
      quantity:item.total_sales_count,
      revenue:item.total_revenue
    }as TopSalesItems
  })
  return res;
}
type PriodeType='week' | 'month' | 'year'
export default function AnalyticsDashboard() {
  const [timeRange, setTimeRange] = useState<PriodeType>('week');
 const [
  {data},
  {data:revenu},
  {data:revenuItem},
  {data:totalRevenu}

] = useQueries([
  {
    queryKey:['menu-categories',timeRange],queryFn:()=>analyticsService.getDashboardData(timeRange)
  },
  {
    queryKey:['sale-by-day',timeRange],queryFn:()=>analyticsService.getTotalRevenuByDay(timeRange)
  },
  {
    queryKey:['revenu-by-item',timeRange],queryFn:()=>analyticsService.getRevenuItems(timeRange)
  },
  {
    queryKey:['revenu-total',timeRange],queryFn:()=>analyticsService.getTotalRevenu(timeRange)
  },
])
const {categoryData,COLORS} = useMemo(()=>getCategoryDataPipe(data),[data])
const salesData = useMemo(()=>getSalesDataPipe(revenu),[revenu])
const topSellingItems = useMemo(()=>getItemsRevenu(revenuItem),[revenuItem])
console.log({data})
  const handleTimeRangeChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setTimeRange(event.target.value as PriodeType );
  };

  return (
 
      <Box sx={{ flexGrow: 1, p: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Tableau de Bord Analytique
        </Typography>

        <FormControl sx={{ mb: 3, minWidth: 120 }}>
          <InputLabel id="time-range-select-label">Période</InputLabel>
          <Select
            labelId="time-range-select-label"
            id="time-range-select"
            value={timeRange}
            label="Période"
            //@ts-ignore
            onChange={handleTimeRangeChange}
          >
            <MenuItem value="week">Cette semaine</MenuItem>
            <MenuItem value="month">Ce mois</MenuItem>
            <MenuItem value="year">Cette année</MenuItem>
          </Select>
        </FormControl>

        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, mb: 3 }}>
          <Paper elevation={3} sx={{ p: 2, flex: '1 1 200px' }}>
            <Typography variant="h6" gutterBottom>Ventes Totales</Typography>
            <Typography variant="h4">{totalRevenu?.total_revenue} DA </Typography>
          </Paper>
          <Paper elevation={3} sx={{ p: 2, flex: '1 1 200px' }}>
            <Typography variant="h6" gutterBottom>Nombre de Commandes</Typography>
            <Typography variant="h4">{totalRevenu?.total_items_sold}</Typography>
          </Paper>
          <Paper elevation={3} sx={{ p: 2, flex: '1 1 200px' }}>
            <Typography variant="h6" gutterBottom>Panier Moyen</Typography>
            <Typography variant="h4">{totalRevenu?.total_items_sold? Number((totalRevenu?.total_revenue/totalRevenu?.total_items_sold).toFixed(2)):''} DA</Typography>
          </Paper>
        </Box>

        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Paper elevation={3} sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>Ventes par Jour</Typography>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart
                  data={salesData}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="ventes" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper elevation={3} sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>Ventes par Catégorie</Typography>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {categoryData?.map((_entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper elevation={3} sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>Articles les Plus Vendus</Typography>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Nom de l'Article</TableCell>
                      <TableCell align="right">Quantité Vendue</TableCell>
                      <TableCell align="right">Chiffre d'Affaires</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {topSellingItems.map((item) => (
                      <TableRow key={item.name}>
                        <TableCell component="th" scope="row">
                          {item.name}
                        </TableCell>
                        <TableCell align="right">{item.quantity}</TableCell>
                        <TableCell align="right">{item.revenue} DA</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </Grid>
        </Grid>
      </Box>
   );
}