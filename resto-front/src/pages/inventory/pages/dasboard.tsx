import  { useState } from 'react';
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
  TextField,
  InputAdornment,
  useTheme,
} from '@mui/material';
import {
  Inventory as InventoryIcon,
  Warning as WarningIcon,
  TrendingDown as TrendingDownIcon,
  Search as SearchIcon,
} from '@mui/icons-material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';

 const inventoryItems = [
  { id: 1, name: "Farine", category: "Ingrédients secs", quantity: 50, unit: "kg", lowStockThreshold: 20 },
  { id: 2, name: "Tomates", category: "Légumes", quantity: 30, unit: "kg", lowStockThreshold: 15 },
  { id: 3, name: "Poulet", category: "Viandes", quantity: 40, unit: "kg", lowStockThreshold: 20 },
  { id: 4, name: "Huile d'olive", category: "Huiles", quantity: 10, unit: "L", lowStockThreshold: 5 },
  { id: 5, name: "Fromage", category: "Produits laitiers", quantity: 25, unit: "kg", lowStockThreshold: 10 },
  { id: 6, name: "Riz", category: "Ingrédients secs", quantity: 60, unit: "kg", lowStockThreshold: 30 },
  { id: 7, name: "Lait", category: "Produits laitiers", quantity: 40, unit: "L", lowStockThreshold: 20 },
  { id: 8, name: "Oeufs", category: "Produits frais", quantity: 200, unit: "unités", lowStockThreshold: 100 },
];

// Données pour le graphique des catégories
const categoryData = [
  { name: 'Ingrédients secs', value: 2 },
  { name: 'Légumes', value: 1 },
  { name: 'Viandes', value: 1 },
  { name: 'Huiles', value: 1 },
  { name: 'Produits laitiers', value: 2 },
  { name: 'Produits frais', value: 1 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82ca9d'];

export default function InventoryDashboard() {
  const theme = useTheme();
  const [searchTerm, setSearchTerm] = useState('');

  const lowStockItems = inventoryItems.filter(item => item.quantity <= item.lowStockThreshold);
  const filteredItems = inventoryItems.filter(item => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Tableau de Bord de l'Inventaire
      </Typography>

      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 4 }}>
        <Card sx={{ flexGrow: 1, minWidth: 200 }}>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <InventoryIcon color="primary" sx={{ mr: 1 }} />
              <Typography variant="h6">Total des Articles</Typography>
            </Box>
            <Typography variant="h4">{inventoryItems.length}</Typography>
          </CardContent>
        </Card>
        <Card sx={{ flexGrow: 1, minWidth: 200 }}>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <WarningIcon color="warning" sx={{ mr: 1 }} />
              <Typography variant="h6">Articles en Stock Faible</Typography>
            </Box>
            <Typography variant="h4">{lowStockItems.length}</Typography>
          </CardContent>
        </Card>
        <Card sx={{ flexGrow: 1, minWidth: 200 }}>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <TrendingDownIcon color="error" sx={{ mr: 1 }} />
              <Typography variant="h6">Article le Plus Bas</Typography>
            </Box>
            <Typography variant="h6">
              {inventoryItems.reduce((prev, current) => 
                (prev.quantity / prev.lowStockThreshold < current.quantity / current.lowStockThreshold) ? prev : current
              ).name}
            </Typography>
          </CardContent>
        </Card>
      </Box>

      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
        <Paper sx={{ flexGrow: 1, minWidth: 300, p: 2 }}>
          <Typography variant="h6" gutterBottom>Liste d'Inventaire</Typography>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Rechercher un article..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{ mb: 2 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
          <List>
            {filteredItems.map((item) => (
              <ListItem key={item.id} divider>
                <ListItemText
                  primary={item.name}
                  secondary={`${item.category} - Quantité: ${item.quantity} ${item.unit}`}
                />
                {item.quantity <= item.lowStockThreshold && (
                  <Chip label="Stock Faible" color="warning" size="small" />
                )}
              </ListItem>
            ))}
          </List>
        </Paper>

        <Box sx={{ flexGrow: 1, minWidth: 300 }}>
          <Paper sx={{ p: 2, mb: 2 }}>
            <Typography variant="h6" gutterBottom>Répartition par Catégorie</Typography>
            <ResponsiveContainer width="100%" height={200}>
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

          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>Niveaux de Stock</Typography>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={inventoryItems}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" angle={-45} textAnchor="end" interval={0} height={100} />
                <YAxis />
                <Tooltip />
                <Bar dataKey="quantity" fill={theme.palette.primary.main} />
                <Bar dataKey="lowStockThreshold" fill={theme.palette.error.main} />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Box>
      </Box>
    </Box>
  );
}