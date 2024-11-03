import {
  Box,
  Typography,
  Paper,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  useTheme,
} from '@mui/material';
import {
  Restaurant as RestaurantIcon,
  Category as CategoryIcon,
  TrendingUp as TrendingUpIcon,
  AttachMoney as AttachMoneyIcon,
} from '@mui/icons-material';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';

// Données du menu
const menuItems = [
  { id: 1, name: "Burger Classic", category: "Burgers", price: 8.99, popularity: 85 },
  { id: 2, name: "Pizza Margherita", category: "Pizzas", price: 10.99, popularity: 92 },
  { id: 3, name: "Salade César", category: "Salades", price: 7.99, popularity: 78 },
  { id: 4, name: "Pâtes Carbonara", category: "Pâtes", price: 9.99, popularity: 88 },
  { id: 5, name: "Tiramisu", category: "Desserts", price: 5.99, popularity: 95 },
  { id: 6, name: "Steak Frites", category: "Plats Principaux", price: 14.99, popularity: 89 },
  { id: 7, name: "Sushi Mix", category: "Sushis", price: 16.99, popularity: 91 },
  { id: 8, name: "Soupe à l'Oignon", category: "Entrées", price: 6.99, popularity: 82 },
];

// Données pour le graphique des catégories
const categoryData = [
  { name: 'Burgers', value: 30 },
  { name: 'Pizzas', value: 25 },
  { name: 'Salades', value: 15 },
  { name: 'Pâtes', value: 20 },
  { name: 'Desserts', value: 10 },
  { name: 'Plats Principaux', value: 35 },
  { name: 'Sushis', value: 22 },
  { name: 'Entrées', value: 18 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82ca9d', '#ffc658', '#8dd1e1'];

export default function MenuDashboard() {
  const theme = useTheme();

  const averagePrice = menuItems.reduce((sum, item) => sum + item.price, 0) / menuItems.length;
  const mostPopularItem = menuItems.reduce((prev, current) => (prev.popularity > current.popularity) ? prev : current);

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Tableau de Bord du Menu
      </Typography>

      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 4 }}>
        <Card sx={{ flexGrow: 1, minWidth: 200 }}>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <RestaurantIcon color="primary" sx={{ mr: 1 }} />
              <Typography variant="h6">Total des Plats</Typography>
            </Box>
            <Typography variant="h4">{menuItems.length}</Typography>
          </CardContent>
        </Card>
        <Card sx={{ flexGrow: 1, minWidth: 200 }}>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <CategoryIcon color="primary" sx={{ mr: 1 }} />
              <Typography variant="h6">Catégories</Typography>
            </Box>
            <Typography variant="h4">{new Set(menuItems.map(item => item.category)).size}</Typography>
          </CardContent>
        </Card>
        <Card sx={{ flexGrow: 1, minWidth: 200 }}>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <TrendingUpIcon color="primary" sx={{ mr: 1 }} />
              <Typography variant="h6">Plat le Plus Populaire</Typography>
            </Box>
            <Typography variant="h6">{mostPopularItem.name}</Typography>
          </CardContent>
        </Card>
        <Card sx={{ flexGrow: 1, minWidth: 200 }}>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <AttachMoneyIcon color="primary" sx={{ mr: 1 }} />
              <Typography variant="h6">Prix Moyen</Typography>
            </Box>
            <Typography variant="h4">{averagePrice.toFixed(2)} €</Typography>
          </CardContent>
        </Card>
      </Box>

      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
        <Paper sx={{ flexGrow: 1, minWidth: 300, p: 2 }}>
          <Typography variant="h6" gutterBottom>Top 5 des Plats les Plus Populaires</Typography>
          <List>
            {menuItems.sort((a, b) => b.popularity - a.popularity).slice(0, 5).map((item) => (
              <ListItem key={item.id} divider>
                <ListItemText
                  primary={item.name}
                  secondary={`${item.category} - ${item.price.toFixed(2)} € - Popularité: ${item.popularity}%`}
                />
              </ListItem>
            ))}
          </List>
        </Paper>

        <Paper sx={{ flexGrow: 1, minWidth: 300, p: 2 }}>
          <Typography variant="h6" gutterBottom>Répartition des Catégories</Typography>
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
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </Paper>
      </Box>

      <Box sx={{ mt: 4 }}>
        <Paper sx={{ p: 2 }}>
          <Typography variant="h6" gutterBottom>Popularité des Plats</Typography>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={menuItems}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" angle={-45} textAnchor="end" interval={0} height={100} />
              <YAxis label={{ value: 'Popularité (%)', angle: -90, position: 'insideLeft' }} />
              <Tooltip />
              <Bar dataKey="popularity" fill={theme.palette.primary.main} />
            </BarChart>
          </ResponsiveContainer>
        </Paper>
      </Box>
    </Box>
  );
}