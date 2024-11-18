// import React, { useState, useMemo } from 'react';
// import {
//   Box, Typography, Paper, Select, MenuItem, FormControl, InputLabel,
//   Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
//   Grid, Button
// } from '@mui/material';
// import { 
//   LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
//   BarChart, Bar
// } from 'recharts';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import dayjs from 'dayjs';
// import 'dayjs/locale/fr';
// import { useQuery } from 'react-query';
// import analyticsService, { PeekDataHours } from '../services/analyticsService';

// dayjs.locale('fr');

// // Données statiques pour 30 jours
// const staticData = Array.from({ length: 30 }, (_, index) => {
//   const date = dayjs().subtract(29 - index, 'day');
//   return {
//     date: date.format('YYYY-MM-DD'),
//     totalCustomers: Math.floor(Math.random() * 500) + 100,
//     totalSales: Math.floor(Math.random() * 10000) + 1000,
//     peakHour: `${Math.floor(Math.random() * 12) + 11}:00`,
//     peakCustomers: Math.floor(Math.random() * 100) + 50,
//     peakSales: Math.floor(Math.random() * 2000) + 500,
//   };
// });

// const getPeekDataPipe=(data:PeekDataHours[]|undefined):PeekDataHours[]=>{
//   if(!data) return []
//   return data
// }
// export default function PeakHoursAnalysis() {
//   const [startDate, setStartDate] = useState(dayjs().subtract(7, 'day'));
//   const [endDate, setEndDate] = useState(dayjs());
//   const [dataType, setDataType] = useState('customers');
//   const [searchDate, setSearchDate] = useState(dayjs());
//   const {data} = useQuery(['peek-data',startDate,endDate],()=>analyticsService.getPeekAnalytics(startDate.format('YYYY-MM-DD'),endDate.format('YYYY-MM-DD')))
//   const staticData  =useMemo(()=>getPeekDataPipe(data),[data])
//   const filteredData = useMemo(() => {
//     return staticData.filter(day => {
//       const dayDate = dayjs(day.date);
//       return dayDate.isAfter(startDate) && dayDate.isBefore(endDate);
//     });
//   }, [startDate, endDate,data]);
  
//    const formattedData = useMemo(() => {
//     return filteredData.map(day => ({
//       date: dayjs(day.date).format('DD/MM/YYYY'),
//       customers: day.totalcustomers,
//       sales: day.totalsales,
//       peakHour: day.peakhour,
//       peakCustomers: day.peakcustomers,
//       peakSales: day.peaksales
//     }));
//   }, [filteredData]);

//   const searchedPeakHour = useMemo(() => {
//     const foundDay = staticData.find(day => dayjs(day.date).isSame(searchDate, 'day'));
//     return foundDay ? {
//       date: dayjs(foundDay.date).format('DD/MM/YYYY'),
//       peakHour: foundDay.peakhour,
//       peakCustomers: foundDay.peakcustomers,
//       peakSales: foundDay.peaksales
//     } : null;
//   }, [searchDate]);

 
//   const handleDataTypeChange = (event:any) => {
//     setDataType(event.target.value as string);
//   };
//   const handleQuickDateSelect = (days: number) => {
//     setStartDate(dayjs().subtract(days, 'day'));
//     setEndDate(dayjs());
//   };

//   return (
//     <LocalizationProvider dateAdapter={AdapterDayjs}>
//       <Box sx={{ flexGrow: 1, p: 3 }}>
//         <Typography variant="h4" component="h1" gutterBottom>
//           Analyse Avancée des Heures de Pointe
//         </Typography>

//         <Grid container spacing={2} sx={{ mb: 3 }}>
//           <Grid item xs={12} md={4}>
//             <DatePicker
//               label="Date de début"
//               value={startDate}
//               onChange={(newValue) => {if(newValue)setStartDate(newValue)}}
//             />
//           </Grid>
//           <Grid item xs={12} md={4}>
//             <DatePicker
//               label="Date de fin"
//               value={endDate}
//               onChange={(newValue) =>{ if(newValue)setEndDate(newValue)}}
//             />
//           </Grid>
//           <Grid item xs={12} md={4}>
//             <FormControl fullWidth>
//               <InputLabel id="data-type-select-label">Type de données</InputLabel>
//               <Select
//                 labelId="data-type-select-label"
//                 id="data-type-select"
//                 value={dataType}
//                 label="Type de données"
//                 onChange={handleDataTypeChange}
//                 // onChange={(e)=>{}}
//               >
//                 <MenuItem value="customers">Clients</MenuItem>
//                 <MenuItem value="sales">Ventes</MenuItem>
//               </Select>
//             </FormControl>
//           </Grid>
//         </Grid>

//         <Grid container spacing={2} sx={{ mb: 3 }}>
//           <Grid item>
//             <Button variant="outlined" onClick={() => handleQuickDateSelect(7)}>7 derniers jours</Button>
//           </Grid>
//           <Grid item>
//             <Button variant="outlined" onClick={() => handleQuickDateSelect(14)}>14 derniers jours</Button>
//           </Grid>
//           <Grid item>
//             <Button variant="outlined" onClick={() => handleQuickDateSelect(30)}>30 derniers jours</Button>
//           </Grid>
//         </Grid>

//         <Paper elevation={3} sx={{ p: 2, mb: 3 }}>
//           <Typography variant="h6" gutterBottom>Évolution sur la période sélectionnée</Typography>
//           <ResponsiveContainer width="100%" height={400}>
//             <LineChart
//               data={formattedData}
//               margin={{
//                 top: 5,
//                 right: 30,
//                 left: 20,
//                 bottom: 5,
//               }}
//             >
//               <CartesianGrid strokeDasharray="3 3" />
//               <XAxis dataKey="date" />
//               <YAxis />
//               <Tooltip />
//               <Legend />
//               <Line type="monotone" dataKey={dataType} stroke="#8884d8" activeDot={{ r: 8 }} name={dataType === 'customers' ? 'Clients' : 'Ventes (€)'} />
//             </LineChart>
//           </ResponsiveContainer>
//         </Paper>

//         <Paper elevation={3} sx={{ p: 2, mb: 3 }}>
//           <Typography variant="h6" gutterBottom>Comparaison des heures de pointe</Typography>
//           <ResponsiveContainer width="100%" height={400}>
//             <BarChart
//               data={formattedData}
//               margin={{
//                 top: 5,
//                 right: 30,
//                 left: 20,
//                 bottom: 5,
//               }}
//             >
//               <CartesianGrid strokeDasharray="3 3" />
//               <XAxis dataKey="date" />
//               <YAxis />
//               <Tooltip />
//               <Legend />
//               <Bar dataKey={dataType === 'customers' ? 'peakCustomers' : 'peakSales'} fill="#8884d8" name={dataType === 'customers' ? 'Clients à l\'heure de pointe' : 'Ventes à l\'heure de pointe (€)'} />
//             </BarChart>
//           </ResponsiveContainer>
//         </Paper>

//         <Paper elevation={3} sx={{ p: 2, mb: 3 }}>
//           <Typography variant="h6" gutterBottom>Recherche d'heure de pointe par date</Typography>
//           <Grid container spacing={2} alignItems="center">
//             <Grid item xs={12} md={6}>
//               <DatePicker
//                 label="Sélectionner une date"
//                 value={searchDate}
//                 onChange={(newValue) => {if(newValue)setSearchDate(newValue)}}
//               />
//             </Grid>
//             <Grid item xs={12} md={6}>
//               {searchedPeakHour ? (
//                 <Box>
//                   <Typography variant="body1">Date: {searchedPeakHour.date}</Typography>
//                   <Typography variant="body1">Heure de pointe: {searchedPeakHour.peakHour}</Typography>
//                   <Typography variant="body1">Clients: {searchedPeakHour.peakCustomers}</Typography>
//                   <Typography variant="body1">Ventes: {searchedPeakHour.peakSales} €</Typography>
//                 </Box>
//               ) : (
//                 <Typography variant="body1">Aucune donnée trouvée pour cette date</Typography>
//               )}
//             </Grid>
//           </Grid>
//         </Paper>

//         <Paper elevation={3} sx={{ p: 2 }}>
//           <Typography variant="h6" gutterBottom>Résumé des Heures de Pointe</Typography>
//           <TableContainer>
//             <Table>
//               <TableHead>
//                 <TableRow>
//                   <TableCell>Date</TableCell>
//                   <TableCell>Heure de Pointe</TableCell>
//                   <TableCell align="right">Nombre de Clients</TableCell>
//                   <TableCell align="right">Ventes (€)</TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {formattedData.map((row) => (
//                   <TableRow key={row.date}>
//                     <TableCell component="th" scope="row">
//                       {row.date}
//                     </TableCell>
//                     <TableCell>{row.peakHour}</TableCell>
//                     <TableCell align="right">{row.peakCustomers}</TableCell>
//                     <TableCell align="right">{row.peakSales}</TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </TableContainer>
//         </Paper>
//       </Box>
//     </LocalizationProvider>
//   );
// }








//////////////







import React, { useState, useMemo } from 'react';
import {
  Box, Typography, Paper, Select, MenuItem, FormControl, InputLabel,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Grid, Button
} from '@mui/material';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  BarChart, Bar
} from 'recharts';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import 'dayjs/locale/fr';
import { useQuery } from 'react-query';
import analyticsService, { PeekDataHours } from '../services/analyticsService';

dayjs.locale('fr');

const getPeekDataPipe = (data: PeekDataHours[] | undefined): PeekDataHours[] => {
  if (!data) return []
  console.log({data})
  return data
}

// Simulated hourly sales data for a workday
const generateHourlySalesData = (date: string) => {
  return Array.from({ length: 24 }, (_, index) => ({
    hour: index,
    sales: Math.floor(Math.random() * 1000) + 100
  }));
};

export default function PeakHoursAnalysis() {
  const [startDate, setStartDate] = useState(dayjs().subtract(7, 'day'));
  const [endDate, setEndDate] = useState(dayjs());
  const [dataType, setDataType] = useState('customers');
  const [searchDate, setSearchDate] = useState(dayjs());
  const [workday, setWorkday] = useState(dayjs());

  const { data } = useQuery(['peek-data', startDate, endDate], () => 
    analyticsService.getPeekAnalytics(startDate.format('YYYY-MM-DD'), endDate.format('YYYY-MM-DD'))
  );
  const {data:dataPeek} = useQuery(['hour-sales',workday],()=>analyticsService.getTotalRevenuByHour(workday.toISOString()))
console.log({workday:workday.toISOString(),dataPeek})
  const staticData = useMemo(() => getPeekDataPipe(data), [data]);

  const filteredData = useMemo(() => {
    return staticData.filter(day => {
      const dayDate = dayjs(day.date);
      return dayDate.isAfter(startDate) && dayDate.isBefore(endDate);
    });
  }, [startDate, endDate, staticData]);
  
  const formattedData = useMemo(() => {
    return filteredData.map(day => ({
      date: dayjs(day.date).format('DD/MM/YYYY'),
      customers: day.totalcustomers,
      sales: day.totalsales,
      peakHour: day.peakhour,
      peakCustomers: day.peakcustomers,
      peakSales: day.peaksales
    }));
  }, [filteredData]);

  const searchedPeakHour = useMemo(() => {
    const foundDay = staticData.find(day => dayjs(day.date).isSame(searchDate, 'day'));
    console.log({foundDay})
    return foundDay ? {
      date: dayjs(foundDay.date).format('DD/MM/YYYY'),
      peakHour: foundDay.peakhour,
      peakCustomers: foundDay.peakcustomers,
      peakSales: foundDay.peaksales
    } : null;
  }, [searchDate, staticData]);

  const workdaySalesData:{   hour: number;sales: number;}[] = useMemo(() => {
    if(!dataPeek) return [];
    return dataPeek.map((item)=>{
      return {
        hour:item.hour,
        sales:item.total_revenue
      }
    })
      }
    ,
    [dataPeek]
  );

  const handleDataTypeChange = (event: any) => {
    setDataType(event.target.value as string);
  };

  const handleQuickDateSelect = (days: number) => {
    setStartDate(dayjs().subtract(days, 'day'));
    setEndDate(dayjs());
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box sx={{ flexGrow: 1, p: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Analyse Avancée des Heures de Pointe
        </Typography>

        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={12} md={3}>
            <DatePicker
              label="Date de début"
              value={startDate}
              onChange={(newValue) => {if(newValue)setStartDate(newValue)}}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <DatePicker
              label="Date de fin"
              value={endDate}
              onChange={(newValue) =>{ if(newValue)setEndDate(newValue)}}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <FormControl fullWidth>
              <InputLabel id="data-type-select-label">Type de données</InputLabel>
              <Select
                labelId="data-type-select-label"
                id="data-type-select"
                value={dataType}
                label="Type de données"
                onChange={handleDataTypeChange}
              >
                <MenuItem value="customers">Clients</MenuItem>
                <MenuItem value="sales">Ventes</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={3}>
            <DatePicker
              label="Jour de travail"
              value={workday}
              onChange={(newValue) => {if(newValue)setWorkday(newValue)}}
            />
          </Grid>
        </Grid>

        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item>
            <Button variant="outlined" onClick={() => handleQuickDateSelect(7)}>7 derniers jours</Button>
          </Grid>
          <Grid item>
            <Button variant="outlined" onClick={() => handleQuickDateSelect(14)}>14 derniers jours</Button>
          </Grid>
          <Grid item>
            <Button variant="outlined" onClick={() => handleQuickDateSelect(30)}>30 derniers jours</Button>
          </Grid>
        </Grid>

        <Paper elevation={3} sx={{ p: 2, mb: 3 }}>
          <Typography variant="h6" gutterBottom>Évolution sur la période sélectionnée</Typography>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart
              data={formattedData}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey={dataType} stroke="#8884d8" activeDot={{ r: 8 }} name={dataType === 'customers' ? 'Clients' : 'Ventes (€)'} />
            </LineChart>
          </ResponsiveContainer>
        </Paper>

        <Paper elevation={3} sx={{ p: 2, mb: 3 }}>
          <Typography variant="h6" gutterBottom>Comparaison des heures de pointe</Typography>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart
              data={formattedData}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey={dataType === 'customers' ? 'peakCustomers' : 'peakSales'} fill="#8884d8" name={dataType === 'customers' ? 'Clients à l\'heure de pointe' : 'Ventes à l\'heure de pointe (€)'} />
            </BarChart>
          </ResponsiveContainer>
        </Paper>

        <Paper elevation={3} sx={{ p: 2, mb: 3 }}>
          <Typography variant="h6" gutterBottom>Ventes par heure pour le jour de travail sélectionné</Typography>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart
              data={workdaySalesData}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="hour" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="sales" fill="#82ca9d" name="Ventes (€)" />
            </BarChart>
          </ResponsiveContainer>
        </Paper>

        <Paper elevation={3} sx={{ p: 2, mb: 3 }}>
          <Typography variant="h6" gutterBottom>Recherche d'heure de pointe par date</Typography>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={6}>
              <DatePicker
                label="Sélectionner une date"
                value={searchDate}
                onChange={(newValue) => {if(newValue)setSearchDate(newValue)}}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              {searchedPeakHour ? (
                <Box>
                  <Typography variant="body1">Date: {searchedPeakHour.date}</Typography>
                  <Typography variant="body1">Heure de pointe: {searchedPeakHour.peakHour}</Typography>
                  <Typography variant="body1">Clients: {searchedPeakHour.peakCustomers}</Typography>
                  <Typography variant="body1">Ventes: {searchedPeakHour.peakSales} €</Typography>
                </Box>
              ) : (
                <Typography variant="body1">Aucune donnée trouvée pour cette date</Typography>
              )}
            </Grid>
          </Grid>
        </Paper>

        <Paper elevation={3} sx={{ p: 2 }}>
          <Typography variant="h6" gutterBottom>Résumé des Heures de Pointe</Typography>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Date</TableCell>
                  <TableCell>Heure de Pointe</TableCell>
                  <TableCell align="right">Nombre de Clients</TableCell>
                  <TableCell align="right">Ventes (€)</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {formattedData.map((row) => (
                  <TableRow key={row.date}>
                    <TableCell component="th" scope="row">
                      {row.date}
                    </TableCell>
                    <TableCell>{row.peakHour}</TableCell>
                    <TableCell align="right">{row.peakCustomers}</TableCell>
                    <TableCell align="right">{row.peakSales}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Box>
    </LocalizationProvider>
  );
}