// import React from 'react';
// import { Box, Typography, Card, CardContent, CardHeader, Tabs, Tab, Button, Divider } from '@mui/material';
// import { AttachMoney, ShoppingBag, People, Fastfood, CalendarToday } from '@mui/icons-material';
// import { useNavigate } from 'react-router-dom';

// export default function Dashboard() {
//   const [tabValue, setTabValue] = React.useState(0);
//   const navigate = useNavigate();

//   const handleTabChange = (_: any, newValue: number) => {
//     setTabValue(newValue);
//   };

//   return (
//     <Box p={4} width={'100%'} height={'100%'} marginTop={10} marginBottom={10}>
//       <Typography variant="h4" fontWeight="bold" gutterBottom color="primary">
//         Tableau de bord du restaurant
//       </Typography>
      
//       <Box display="flex" flexWrap="wrap" gap={2} mb={4}>
//         {[
//           { title: 'Ventes du jour', value: '32,340 DA', icon: <AttachMoney color="action" />, color: '#e0f7fa' },
//           { title: 'Commandes en cours', value: '12', icon: <ShoppingBag color="action" />, color: '#e8f5e9' },
//           { title: 'Clients aujourd\'hui', value: '89', icon: <People color="action" />, color: '#fff9c4' },
//           { title: 'Plat le plus vendu', value: 'Burger Deluxe', icon: <Fastfood color="action" />, color: '#ffe0b2' },
//         ].map((item, index) => (
//           <Box key={index} flexBasis={{ xs: '100%', sm: '48%', md: '23%' }}>
//             <Card sx={{ backgroundColor: item.color, boxShadow: 3, borderRadius: 2 }}>
//               <CardHeader
//                 title={item.title}
//                 titleTypographyProps={{ variant: 'subtitle2', fontWeight: 'medium' }}
//                 action={item.icon}
//               />
//               <CardContent>
//                 <Typography variant="h5" fontWeight="bold">
//                   {item.value}
//                 </Typography>
//               </CardContent>
//             </Card>
//           </Box>
//         ))}
//       </Box>

//       <Tabs
//         value={tabValue}
//         onChange={handleTabChange}
//         textColor="primary"
//         indicatorColor="primary"
//         sx={{
//           mb: 2,
//           '& .MuiTabs-flexContainer': { justifyContent: 'center' },
//         }}
//       >
//         <Tab label="Commandes en cours" />
//         <Tab label="Menu du jour" />
//       </Tabs>

//       {tabValue === 0 && (
//         <Box mt={2}>
//           <Card sx={{ boxShadow: 2, borderRadius: 2 }}>
//             <CardHeader title="Commandes en attente" />
//             <CardContent>
//               {[
//                 { id: '1234', items: '2 x Burger, 1 x Frites' },
//                 { id: '1235', items: '1 x Salade, 1 x Soda' },
//                 { id: '1236', items: '3 x Pizza, 3 x Soda' },
//               ].map((order, index) => (
//                 <React.Fragment key={order.id}>
//                   <Box display="flex" justifyContent="space-between" py={1}>
//                     <Typography variant="body1">Commande #{order.id}</Typography>
//                     <Typography variant="body2" color="textSecondary">{order.items}</Typography>
//                   </Box>
//                   {index < 2 && <Divider />}
//                 </React.Fragment>
//               ))}
//             </CardContent>
//           </Card>
//         </Box>
//       )}

//       {tabValue === 1 && (
//         <Box mt={2}>
//           <Card sx={{ boxShadow: 2, borderRadius: 2 }}>
//             <CardHeader title="Menu du jour" />
//             <CardContent>
//               {[
//                 { type: 'Entrée', item: 'Salade César' },
//                 { type: 'Plat principal', item: 'Steak frites' },
//                 { type: 'Dessert', item: 'Tarte aux pommes' },
//               ].map((menuItem, index) => (
//                 <React.Fragment key={menuItem.type}>
//                   <Box display="flex" justifyContent="space-between" py={1}>
//                     <Typography variant="body1">{menuItem.type}</Typography>
//                     <Typography variant="body2" color="textSecondary">{menuItem.item}</Typography>
//                   </Box>
//                   {index < 2 && <Divider />}
//                 </React.Fragment>
//               ))}
//             </CardContent>
//           </Card>
//         </Box>
//       )}

//       <Box mt={4} display="flex" gap={2} justifyContent="center">
//         <Button
//           variant="contained"
//           startIcon={<ShoppingBag />}
//           onClick={() => navigate('commandes/new')}
//           sx={{ borderRadius: 3, px: 3, py: 1 }}
//         >
//           Nouvelle commande
//         </Button>
//         <Button variant="outlined" startIcon={<CalendarToday />} sx={{ borderRadius: 3, px: 3, py: 1 }}>
//           Voir les réservations
//         </Button>
//       </Box>
//     </Box>
//   );
// }

// const DashboardCard = ({ title, value, icon, color }:{ title:any, value:any, icon:any, color :any}) => (



import React from 'react';
import { 
  Box, 
  Typography, 
  Card, 
  CardContent, 
  CardHeader, 
  Tabs, 
  Tab, 
  Button, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { 
  AttachMoney, 
  ShoppingBag, 
  People, 
  Restaurant, 
  CalendarToday 
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import ImageUpload from '../../../components/upload.image';

const data = [
  { name: 'Lun', total: 32000 },
  { name: 'Mar', total: 28000 },
  { name: 'Mer', total: 35000 },
  { name: 'Jeu', total: 30000 },
  { name: 'Ven', total: 38000 },
  { name: 'Sam', total: 42000 },
  { name: 'Dim', total: 45000 },
];

// const DashboardCard = ({ title, value, icon, color }) => {
const DashboardCard = ({ title, value, icon, color }:{ title:any, value:any, icon:any, color :any}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Card sx={{ 
      height: '100%', 
      backgroundColor: color, 
      flex: 1, 
      minWidth: isMobile ? '100%' : '200px',
      mb: isMobile ? 2 : 0
    }}>
      <CardHeader
        avatar={icon}
        title={<Typography variant={isMobile ? "subtitle1" : "h6"}>{title}</Typography>}
        sx={{ pb: isMobile ? 1 : 2 }}
      />
      <CardContent sx={{ pt: isMobile ? 0 : 2 }}>
        <Typography variant={isMobile ? "h5" : "h4"} component="div">
          {value}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default function Dashboard() {
  const [tabValue, setTabValue] = React.useState(0);
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  return (
    <Box sx={{ flexGrow: 1, p: isMobile ? 2 : 3 }}>
      <Typography variant={isMobile ? "h5" : "h4"} gutterBottom fontWeight="bold" color="primary">
        Tableau de bord du restaurant
      </Typography>
      
      <Box sx={{ 
        display: 'flex', 
        flexDirection: isMobile ? 'column' : 'row',
        flexWrap: 'wrap', 
        gap: isMobile ? 2 : 3, 
        mb: 4,
        '& > *': {
          flexGrow: 1,
          flexBasis: isMobile ? '100%' : 'calc(25% - 16px)',
        }
      }}>
        <DashboardCard 
          title="Ventes du jour" 
          value="32,340 DA" 
          icon={<AttachMoney />} 
          color="#e3f2fd"
        />
        <DashboardCard 
          title="Commandes en cours" 
          value="12" 
          icon={<ShoppingBag />} 
          color="#e8f5e9"
        />
        <DashboardCard 
          title="Clients aujourd'hui" 
          value="89" 
          icon={<People />} 
          color="#fff3e0"
        />
        <DashboardCard 
          title="Plat le plus vendu" 
          value="Burger Deluxe" 
          icon={<Restaurant />} 
          color="#fce4ec"
        />
      </Box>

      {/* <Card sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Ventes de la semaine
          </Typography>
          <ResponsiveContainer width="100%" height={isMobile ? 200 : 300}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="total" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card> */}

      <Tabs
        value={tabValue}
        onChange={handleTabChange}
        textColor="primary"
        indicatorColor="primary"
        sx={{ mb: 2 }}
        variant={isMobile ? "fullWidth" : "standard"}
      >
        <Tab label="Commandes en cours" />
        <Tab label="Menu du jour" />
      </Tabs>

      {tabValue === 0 && (
        <TableContainer component={Paper}>
          <Table size={isMobile ? "small" : "medium"}>
            <TableHead>
              <TableRow>
                <TableCell>Commande #</TableCell>
                <TableCell>Articles</TableCell>
                <TableCell>Total</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {[
                { id: '1234', items: '2 x Burger, 1 x Frites', total: '1,200 DA' },
                { id: '1235', items: '1 x Salade, 1 x Soda', total: '800 DA' },
                { id: '1236', items: '3 x Pizza, 3 x Soda', total: '2,400 DA' },
              ].map((order) => (
                <TableRow key={order.id}>
                  <TableCell>{order.id}</TableCell>
                  <TableCell>{order.items}</TableCell>
                  <TableCell>{order.total}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {tabValue === 1 && (
        <TableContainer component={Paper}>
          <Table size={isMobile ? "small" : "medium"}>
            <TableHead>
              <TableRow>
                <TableCell>Type</TableCell>
                <TableCell>Plat</TableCell>
                <TableCell>Prix</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {[
                { type: 'Entrée', item: 'Salade César', price: '400 DA' },
                { type: 'Plat principal', item: 'Steak frites', price: '1200 DA' },
                { type: 'Dessert', item: 'Tarte aux pommes', price: '300 DA' },
              ].map((menuItem) => (
                <TableRow key={menuItem.type}>
                  <TableCell>{menuItem.type}</TableCell>
                  <TableCell>{menuItem.item}</TableCell>
                  <TableCell>{menuItem.price}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      <Box sx={{ 
        mt: 4, 
        display: 'flex', 
        flexDirection: isMobile ? 'column' : 'row',
        gap: 2, 
        justifyContent: 'center' 
      }}>
        <Button
          variant="contained"
          startIcon={<ShoppingBag />}
          onClick={() => navigate('commandes/new')}
          fullWidth={isMobile}
        >
          Nouvelle commande
        </Button>
        <Button 
          variant="outlined" 
          startIcon={<CalendarToday />}
          fullWidth={isMobile}
        >
          Voir les réservations
        </Button>
        {/* <ImageUpload/> */}
      </Box>
    </Box>
  );
}