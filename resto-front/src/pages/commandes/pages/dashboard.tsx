 import {
  Box,
  Typography,
  Paper,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  Chip,
  Button,
  useTheme,
} from '@mui/material';
import {
  ShoppingCart as ShoppingCartIcon,
  AttachMoney as AttachMoneyIcon,
  TrendingUp as TrendingUpIcon,
  Schedule as ScheduleIcon,
} from '@mui/icons-material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { hexToRgba } from '../../../utils/utils';

// Données factices pour le graphique
const chartData = [
  { name: 'Lun', commandes: 12 },
  { name: 'Mar', commandes: 19 },
  { name: 'Mer', commandes: 15 },
  { name: 'Jeu', commandes: 22 },
  { name: 'Ven', commandes: 30 },
  { name: 'Sam', commandes: 40 },
  { name: 'Dim', commandes: 35 },
];

// Données factices pour les commandes récentes
const recentOrders = [
  { id: 1, customer: 'Jean Dupont', total: 45.99, status: 'En cours' },
  { id: 2, customer: 'Marie Martin', total: 32.50, status: 'Livré' },
  { id: 3, customer: 'Pierre Durand', total: 28.75, status: 'En préparation' },
  { id: 4, customer: 'Sophie Lefebvre', total: 55.20, status: 'En cours' },
];

export default function OrderDashboard() {
  const theme = useTheme();

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Typography variant="h3" component="h1" gutterBottom>
        Tableau de Bord des Commandes
      </Typography>

      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 4 }}>
        <Card sx={{ flexGrow: 1, minWidth: 200 }}>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <ShoppingCartIcon color="primary" sx={{ mr: 1 }} />
              <Typography variant="h6">Commandes Totales</Typography>
            </Box>
            <Typography variant="h4">1,234</Typography>
          </CardContent>
        </Card>
        <Card sx={{ flexGrow: 1, minWidth: 200 }}>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <AttachMoneyIcon color="primary" sx={{ mr: 1 }} />
              <Typography variant="h6">Revenu Total</Typography>
            </Box>
            <Typography variant="h4">15,678 €</Typography>
          </CardContent>
        </Card>
        <Card sx={{ flexGrow: 1, minWidth: 200 }}>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <TrendingUpIcon color="primary" sx={{ mr: 1 }} />
              <Typography variant="h6">Panier Moyen</Typography>
            </Box>
            <Typography variant="h4">32.50 €</Typography>
          </CardContent>
        </Card>
        <Card sx={{ flexGrow: 1, minWidth: 200 }}>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <ScheduleIcon color="primary" sx={{ mr: 1 }} />
              <Typography variant="h6">Temps Moyen de Préparation</Typography>
            </Box>
            <Typography variant="h4">18 min</Typography>
          </CardContent>
        </Card>
      </Box>

      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
        <Paper sx={{ flexGrow: 1, minWidth: 300, p: 2 }}>
          <Typography variant="h6" gutterBottom>Commandes Récentes</Typography>
          <List>
            {recentOrders.map((order) => (
              <ListItem key={order.id} divider>
                <ListItemText
                  primary={order.customer}
                  secondary={`Total: ${order.total.toFixed(2)} €`}
                />
                <Chip
                  label={order.status}
                  // color={order.status === 'Livré' ? 'success' : 'primary'}
                  variant='outlined'
                  sx={{
                    borderColor:order.status === 'Livré' ? theme.palette.success.light:theme.palette.primary.light,
                    bgcolor:order.status === 'Livré' ? hexToRgba(theme.palette.success.light,0.1):hexToRgba(theme.palette.primary.light,0.1)
                  }}
                  size="small"
                />
              </ListItem>
            ))}
          </List>
          <Box sx={{ mt: 2, textAlign: 'center' }}>
            <Button variant="outlined">Voir toutes les commandes</Button>
          </Box>
        </Paper>

        <Paper sx={{ flexGrow: 2, minWidth: 300, p: 2 }}>
          <Typography variant="h6" gutterBottom>Tendance des Commandes</Typography>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="commandes" fill={theme.palette.primary.main} />
            </BarChart>
          </ResponsiveContainer>
        </Paper>
      </Box>
    </Box>
  );
}