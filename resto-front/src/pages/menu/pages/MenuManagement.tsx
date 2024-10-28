






import React, { useState } from 'react';
import {
 Box, Typography, Button, Dialog, DialogTitle, DialogContent,
  DialogActions, TextField, Select, MenuItem, InputLabel, FormControl,
  Snackbar, IconButton, Tabs, Tab, List, ListItem, ListItemText, ListItemSecondaryAction,
  useTheme
} from '@mui/material';
import { DataGrid, GridColDef, GridRenderCellParams, GridToolbar } from '@mui/x-data-grid';
import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { hexToRgba } from '../../../utils/utils';

 

interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
}

interface Category {
  id: number;
  name: string;
}

const initialMenuItems: MenuItem[] = [
  { id: 1, name: "Burger Classic", description: "Bœuf, salade, tomate, oignon", price: 8.99, category: "Burgers" },
  { id: 2, name: "Frites", description: "Portion de frites croustillantes", price: 3.99, category: "Accompagnements" },
  { id: 3, name: "Salade César", description: "Laitue, parmesan, croûtons, sauce césar", price: 7.99, category: "Salades" },
];

const initialCategories: Category[] = [
  { id: 1, name: "Burgers" },
  { id: 2, name: "Accompagnements" },
  { id: 3, name: "Salades" },
  { id: 4, name: "Boissons" },
  { id: 5, name: "Desserts" },
];

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function MenuManagement() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>(initialMenuItems);
  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const [openDialog, setOpenDialog] = useState(false);
  const [openCategoryDialog, setOpenCategoryDialog] = useState(false);
  const [currentItem, setCurrentItem] = useState<MenuItem | null>(null);
  const [currentCategory, setCurrentCategory] = useState<Category | null>(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' as 'success' | 'error' });
  const [tabValue, setTabValue] = useState(0);
  const {palette}=useTheme()
  const handleOpenDialog = (item: MenuItem | null = null) => {
    setCurrentItem(item);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setCurrentItem(null);
  };

  const handleOpenCategoryDialog = (category: Category | null = null) => {
    setCurrentCategory(category);
    setOpenCategoryDialog(true);
  };

  const handleCloseCategoryDialog = () => {
    setOpenCategoryDialog(false);
    setCurrentCategory(null);
  };

  const handleSaveItem = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const newItem: MenuItem = {
      id: currentItem ? currentItem.id : Date.now(),
      name: formData.get('name') as string,
      description: formData.get('description') as string,
      price: parseFloat(formData.get('price') as string),
      category: formData.get('category') as string,
    };

    if (currentItem) {
      setMenuItems(menuItems.map(item => item.id === currentItem.id ? newItem : item));
      setSnackbar({ open: true, message: 'Article modifié avec succès', severity: 'success' });
    } else {
      setMenuItems([...menuItems, newItem]);
      setSnackbar({ open: true, message: 'Nouvel article ajouté avec succès', severity: 'success' });
    }
    handleCloseDialog();
  };

  const handleSaveCategory = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const newCategory: Category = {
      id: currentCategory ? currentCategory.id : Date.now(),
      name: formData.get('name') as string,
    };

    if (currentCategory) {
      setCategories(categories.map(cat => cat.id === currentCategory.id ? newCategory : cat));
      setSnackbar({ open: true, message: 'Catégorie modifiée avec succès', severity: 'success' });
    } else {
      setCategories([...categories, newCategory]);
      setSnackbar({ open: true, message: 'Nouvelle catégorie ajoutée avec succès', severity: 'success' });
    }
    handleCloseCategoryDialog();
  };

  const handleDeleteItem = (id: number) => {
    setMenuItems(menuItems.filter(item => item.id !== id));
    setSnackbar({ open: true, message: 'Article supprimé avec succès', severity: 'success' });
  };

  const handleDeleteCategory = (id: number) => {
    setCategories(categories.filter(cat => cat.id !== id));
    setSnackbar({ open: true, message: 'Catégorie supprimée avec succès', severity: 'success' });
  };

  const columns: GridColDef[] = [
    { field: 'name', headerName: 'Nom', flex:2},
    { field: 'description', headerName: 'Description', flex:2 },
    { field: 'price', headerName: 'Prix', width: 100, valueFormatter: (params:number) => `${params.toFixed(2)} DA` },
    { field: 'category', headerName: 'Catégorie', flex:1, },
    {
      field: 'actions',
      headerName: 'Actions',
      flex:1,
      renderCell: (params: GridRenderCellParams) => (
        <Box>
          <IconButton onClick={() => handleOpenDialog(params.row)} size="small">
            <EditIcon />
          </IconButton>
          <IconButton onClick={() => handleDeleteItem(params.row.id)} size="small">
            <DeleteIcon />
          </IconButton>
        </Box>
      ),
    },
  ];

  return (
   
      <Box sx={{ flexGrow: 1, p: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Gestion du Menu
        </Typography>
        
        <Tabs value={tabValue} onChange={(_, newValue) => setTabValue(newValue)} sx={{ mb: 2 }}>
          <Tab label="Articles" />
          <Tab label="Catégories" />
        </Tabs>

        {tabValue === 0 && (
          <>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => handleOpenDialog()}
              sx={{ mb: 2 }}
            >
              Ajouter un article
            </Button>
            <DataGrid
              rows={menuItems}
              columns={columns}
           
              slots={{
                toolbar: GridToolbar,
              }}
              slotProps={{
                toolbar: {
                  showQuickFilter: true,
                  quickFilterProps: { debounceMs: 500 },
                },
              }}
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
          </>
        )}

        {tabValue === 1 && (
          <>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => handleOpenCategoryDialog()}
              sx={{ mb: 2 }}
            >
              Ajouter une catégorie
            </Button>
            <List>
              {categories.map((category) => (
                <ListItem key={category.id}>
                  <ListItemText primary={category.name} />
                  <ListItemSecondaryAction>
                    <IconButton edge="end" aria-label="edit" onClick={() => handleOpenCategoryDialog(category)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteCategory(category.id)}>
                      <DeleteIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>
          </>
        )}

        <Dialog open={openDialog} onClose={handleCloseDialog}>
          <form onSubmit={handleSaveItem}>
            <DialogTitle>{currentItem ? 'Modifier l\'article' : 'Ajouter un article'}</DialogTitle>
            <DialogContent>
              <TextField
                autoFocus
                margin="dense"
                name="name"
                label="Nom de l'article"
                type="text"
                fullWidth
                variant="outlined"
                defaultValue={currentItem?.name || ''}
                required
              />
              <TextField
                margin="dense"
                name="description"
                label="Description"
                type="text"
                fullWidth
                variant="outlined"
                multiline
                rows={3}
                defaultValue={currentItem?.description || ''}
              />
              <TextField
                margin="dense"
                name="price"
                label="Prix"
                type="number"
                fullWidth
                variant="outlined"
                defaultValue={currentItem?.price || ''}
                required
                inputProps={{ step: 0.01, min: 0 }}
              />
              <FormControl fullWidth margin="dense">
                <InputLabel id="category-label">Catégorie</InputLabel>
                <Select
                  labelId="category-label"
                  name="category"
                  defaultValue={currentItem?.category || ''}
                  label="Catégorie"
                  required
                >
                  {categories.map((category) => (
                    <MenuItem key={category.id} value={category.name}>{category.name}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDialog}>Annuler</Button>
              <Button type="submit" variant="contained">Sauvegarder</Button>
            </DialogActions>
          </form>
        </Dialog>

        <Dialog open={openCategoryDialog} onClose={handleCloseCategoryDialog}>
          <form onSubmit={handleSaveCategory}>
            <DialogTitle>{currentCategory ? 'Modifier la catégorie' : 'Ajouter une catégorie'}</DialogTitle>
            <DialogContent>
              <TextField
                autoFocus
                margin="dense"
                name="name"
                label="Nom de la catégorie"
                type="text"
                fullWidth
                variant="outlined"
                defaultValue={currentCategory?.name || ''}
                required
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseCategoryDialog}>Annuler</Button>
              <Button type="submit" variant="contained">Sauvegarder</Button>
            </DialogActions>
          </form>
        </Dialog>

        <Snackbar 
          open={snackbar.open} 
          autoHideDuration={6000} 
          onClose={() => setSnackbar({ ...snackbar, open: false })}
        >
          <Alert severity={snackbar.severity} sx={{ width: '100%' }}>
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Box>
    
  );
}