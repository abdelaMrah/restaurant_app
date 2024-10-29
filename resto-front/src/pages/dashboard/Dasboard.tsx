import React from 'react';
import { Box, Typography, Card, CardContent, CardHeader, Tabs, Tab, Button, Divider } from '@mui/material';
import { AttachMoney, ShoppingBag, People, Fastfood, CalendarToday } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const [tabValue, setTabValue] = React.useState(0);
  const navigate = useNavigate();

  const handleTabChange = (_: any, newValue: number) => {
    setTabValue(newValue);
  };

  return (
    <Box p={4} >
      <Typography variant="h4" fontWeight="bold" gutterBottom color="primary">
        Tableau de bord du restaurant
      </Typography>
      
      <Box display="flex" flexWrap="wrap" gap={2} mb={4}>
        {[
          { title: 'Ventes du jour', value: '32,340 DA', icon: <AttachMoney color="action" />, color: '#e0f7fa' },
          { title: 'Commandes en cours', value: '12', icon: <ShoppingBag color="action" />, color: '#e8f5e9' },
          { title: 'Clients aujourd\'hui', value: '89', icon: <People color="action" />, color: '#fff9c4' },
          { title: 'Plat le plus vendu', value: 'Burger Deluxe', icon: <Fastfood color="action" />, color: '#ffe0b2' },
        ].map((item, index) => (
          <Box key={index} flexBasis={{ xs: '100%', sm: '48%', md: '23%' }}>
            <Card sx={{ backgroundColor: item.color, boxShadow: 3, borderRadius: 2 }}>
              <CardHeader
                title={item.title}
                titleTypographyProps={{ variant: 'subtitle2', fontWeight: 'medium' }}
                action={item.icon}
              />
              <CardContent>
                <Typography variant="h5" fontWeight="bold">
                  {item.value}
                </Typography>
              </CardContent>
            </Card>
          </Box>
        ))}
      </Box>

      <Tabs
        value={tabValue}
        onChange={handleTabChange}
        textColor="primary"
        indicatorColor="primary"
        sx={{
          mb: 2,
          '& .MuiTabs-flexContainer': { justifyContent: 'center' },
        }}
      >
        <Tab label="Commandes en cours" />
        <Tab label="Menu du jour" />
      </Tabs>

      {tabValue === 0 && (
        <Box mt={2}>
          <Card sx={{ boxShadow: 2, borderRadius: 2 }}>
            <CardHeader title="Commandes en attente" />
            <CardContent>
              {[
                { id: '1234', items: '2 x Burger, 1 x Frites' },
                { id: '1235', items: '1 x Salade, 1 x Soda' },
                { id: '1236', items: '3 x Pizza, 3 x Soda' },
              ].map((order, index) => (
                <React.Fragment key={order.id}>
                  <Box display="flex" justifyContent="space-between" py={1}>
                    <Typography variant="body1">Commande #{order.id}</Typography>
                    <Typography variant="body2" color="textSecondary">{order.items}</Typography>
                  </Box>
                  {index < 2 && <Divider />}
                </React.Fragment>
              ))}
            </CardContent>
          </Card>
        </Box>
      )}

      {tabValue === 1 && (
        <Box mt={2}>
          <Card sx={{ boxShadow: 2, borderRadius: 2 }}>
            <CardHeader title="Menu du jour" />
            <CardContent>
              {[
                { type: 'Entrée', item: 'Salade César' },
                { type: 'Plat principal', item: 'Steak frites' },
                { type: 'Dessert', item: 'Tarte aux pommes' },
              ].map((menuItem, index) => (
                <React.Fragment key={menuItem.type}>
                  <Box display="flex" justifyContent="space-between" py={1}>
                    <Typography variant="body1">{menuItem.type}</Typography>
                    <Typography variant="body2" color="textSecondary">{menuItem.item}</Typography>
                  </Box>
                  {index < 2 && <Divider />}
                </React.Fragment>
              ))}
            </CardContent>
          </Card>
        </Box>
      )}

      <Box mt={4} display="flex" gap={2} justifyContent="center">
        <Button
          variant="contained"
          startIcon={<ShoppingBag />}
          onClick={() => navigate('commandes/new')}
          sx={{ borderRadius: 3, px: 3, py: 1 }}
        >
          Nouvelle commande
        </Button>
        <Button variant="outlined" startIcon={<CalendarToday />} sx={{ borderRadius: 3, px: 3, py: 1 }}>
          Voir les réservations
        </Button>
      </Box>
    </Box>
  );
}
