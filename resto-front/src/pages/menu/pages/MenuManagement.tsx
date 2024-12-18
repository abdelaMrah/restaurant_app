import image from "../../../../public/images/hamburger-du-fromage-tomates_1028566-62164-removebg-preview.png";
// import React, { useState } from 'react';
// import {
//  Box, Typography, Button, Dialog, DialogTitle, DialogContent,
//   DialogActions, TextField, Select, MenuItem, InputLabel, FormControl,
//   Snackbar, IconButton, Tabs, Tab, List, ListItem, ListItemText, ListItemSecondaryAction,
//   useTheme
// } from '@mui/material';
// import { DataGrid, GridColDef, GridRenderCellParams, GridToolbar } from '@mui/x-data-grid';
// import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
// import MuiAlert, { AlertProps } from '@mui/material/Alert';
// import { hexToRgba } from '../../../utils/utils';
// import { useQuery } from 'react-query';
// import categorieService, { Category, CreateCategoryDto, UpdateCategoryDto } from '../services/categorie.service';
// import menuService, { CreateMenuDto, Menu, UpdateMenuDto } from '../services/menu.service';
// import { errorHandler } from '../../../handlers/errorHandler';

// const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
//   props,
//   ref,
// ) {
//   return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
// });

// export default function MenuManagement() {

//   const [openDialog, setOpenDialog] = useState(false);
//   const [openCategoryDialog, setOpenCategoryDialog] = useState(false);
//   const [currentItem, setCurrentItem] = useState<Menu | null>(null);
//   const [currentCategory, setCurrentCategory] = useState<Category | null>(null);
//   const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' as 'success' | 'error' });
//   const {data:categories,refetch:refetchCategories} = useQuery('categories',async()=>await categorieService.getGategories());
//   const{data:menuItems,refetch:refetchMenu} = useQuery('menu',async()=>await menuService.getMenu());
//   const [tabValue, setTabValue] = useState(0);
//   const {palette}=useTheme()
//   const handleOpenDialog = (item: Menu | null = null) => {
//     setCurrentItem(item);
//     setOpenDialog(true);
//   };

//   const handleCloseDialog = () => {
//     setOpenDialog(false);
//     setCurrentItem(null);
//   };

//   const handleOpenCategoryDialog = (category: Category | null = null) => {
//     setCurrentCategory(category);
//     setOpenCategoryDialog(true);
//   };

//   const handleCloseCategoryDialog = () => {
//     setOpenCategoryDialog(false);
//     setCurrentCategory(null);
//   };

//   const handleSaveItem =async (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault();
//     const formData = new FormData(event.currentTarget);

//     if (currentItem) {
//       const id = currentItem.id;
//       const updateItem: UpdateMenuDto = {
//         name: formData.get('name') as string,
//         description: formData.get('description') as string,
//         price: parseFloat(formData.get('price') as string),
//         categoryId: parseInt(formData.get('categoryId')as string ),
//       };
//       await menuService.updateMenu(id,updateItem)
//       .then(()=>{
//         setSnackbar({ open: true, message: 'Article modifié avec succès', severity: 'success' });
//       }).then(()=>refetchMenu())
//       .catch((error)=>errorHandler(error))
//      } else {
//       console.log({categoryId:(formData.get('categoryId')as string )})
//       const createMenuDto: CreateMenuDto = {
//         name: formData.get('name') as string,
//         description: formData.get('description') as string,
//         price: parseFloat(formData.get('price') as string),
//         categoryId: +(formData.get('categoryId')as string ),
//       };
//       console.log({createMenuDto})
//       await menuService.createMenu(createMenuDto)
//       .then(()=>{
//         setSnackbar({ open: true, message: 'Nouvel article ajouté avec succès', severity: 'success' });
//       }).then(()=>refetchMenu())
//       .catch((error)=>errorHandler(error))
//     }
//     handleCloseDialog();
//   };

//   const handleSaveCategory =async (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault();
//     const formData = new FormData(event.currentTarget);

//     if (currentCategory) {
//       const id=currentCategory.id;
//       const updateCategoryDto:UpdateCategoryDto={
//         name: formData.get('name') as string,
//         description: formData.get('description') as string,
//       }
//       await categorieService.updateCategory(id,updateCategoryDto)
//       .then(()=>{
//         setSnackbar({ open: true, message: 'Catégorie modifiée avec succès', severity: 'success' });
//       }).then(()=>refetchCategories())
//       .catch((error)=>errorHandler(error))
//     } else {
//       const createCategoryDto:CreateCategoryDto={
//         name: formData.get('name') as string,
//         description: formData.get('description') as string,
//       }
//       await categorieService.createCategory(createCategoryDto)
//       .then(()=>{
//         setSnackbar({ open: true, message: 'Nouvelle catégorie ajoutée avec succès', severity: 'success' });
//       }).then(()=>refetchCategories())
//       .catch((error)=>errorHandler(error))
//     }
//     handleCloseCategoryDialog();
//   };

//   const handleDeleteItem = async(id: number) => {
//     await menuService.deleteMenu(id)
//     .then(()=>{
//       setSnackbar({ open: true, message: 'Article supprimé avec succès', severity: 'success' });
//     }).then(()=>refetchMenu())
//     .catch((error)=>errorHandler(error))
//   };

//   const handleDeleteCategory =async (id: number) => {
//     await categorieService.deleteCategory(id)
//     .then(()=>{
//       setSnackbar({ open: true, message: 'Catégorie supprimée avec succès', severity: 'success' });
//     }).then(()=>refetchCategories())
//     .catch((error)=>errorHandler(error))
//   };

//   const columns: GridColDef[] = [
//     { field: 'name', headerName: 'Nom', flex:2},
//     { field: 'description', headerName: 'Description', flex:2 },
//     { field: 'price', headerName: 'Prix', width: 100, valueFormatter: (params:number) => `${params.toFixed(2)} DA` },
//     { field: 'category', headerName: 'Catégorie', flex:1,
//       valueGetter:(params:Category)=>params.name
//     },
//     {
//       field: 'actions',
//       headerName: 'Actions',
//       flex:1,
//       renderCell: (params: GridRenderCellParams) => (
//         <Box>
//           <IconButton onClick={() => handleOpenDialog(params.row)} size="small">
//             <EditIcon />
//           </IconButton>
//           <IconButton onClick={() => handleDeleteItem(params.row.id)} size="small">
//             <DeleteIcon />
//           </IconButton>
//         </Box>
//       ),
//     },
//   ];

//   return (

//       <Box sx={{ flexGrow: 1, p: 3 }}>
//         <Typography variant="h4" component="h1" gutterBottom>
//           Gestion du Menu
//         </Typography>

//         <Tabs value={tabValue} onChange={(_, newValue) => setTabValue(newValue)} sx={{ mb: 2 }}>
//           <Tab label="Articles" />
//           <Tab label="Catégories" />
//         </Tabs>

//         {tabValue === 0 && (
//           <>
//             <Button
//               variant="contained"
//               startIcon={<AddIcon />}
//               onClick={() => handleOpenDialog()}
//               sx={{ mb: 2 }}
//             >
//               Ajouter un article
//             </Button>
//             <DataGrid
//               rows={menuItems}
//               columns={columns}

//               slots={{
//                 toolbar: GridToolbar,
//               }}
//               slotProps={{
//                 toolbar: {
//                   showQuickFilter: true,
//                   quickFilterProps: { debounceMs: 500 },
//                 },
//               }}
//               sx={{
//                 '& .MuiDataGrid-toolbarContainer': {
//                   padding: '8px',
//                   backgroundColor:hexToRgba(palette.primary.light,0.3)
//                 },
//                 '& .MuiButton-root': {
//                   color: 'primary.main',
//                 },
//               }}
//             />
//           </>
//         )}

//         {tabValue === 1 && (
//           <>
//             <Button
//               variant="contained"
//               startIcon={<AddIcon />}
//               onClick={() => handleOpenCategoryDialog()}
//               sx={{ mb: 2 }}
//             >
//               Ajouter une catégorie
//             </Button>
//             <List>
//               {categories?.map((category) => (
//                 <ListItem key={category.id}>
//                   <ListItemText primary={category.name} />
//                   <ListItemSecondaryAction>
//                     <IconButton edge="end" aria-label="edit" onClick={() => handleOpenCategoryDialog(category)}>
//                       <EditIcon />
//                     </IconButton>
//                     <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteCategory(category.id)}>
//                       <DeleteIcon />
//                     </IconButton>
//                   </ListItemSecondaryAction>
//                 </ListItem>
//               ))}
//             </List>
//           </>
//         )}

//         <Dialog open={openDialog} onClose={handleCloseDialog}>
//           <form onSubmit={handleSaveItem}>
//             <DialogTitle>{currentItem ? 'Modifier l\'article' : 'Ajouter un article'}</DialogTitle>
//             <DialogContent>
//               <TextField
//                 autoFocus
//                 margin="dense"
//                 name="name"
//                 label="Nom de l'article"
//                 type="text"
//                 fullWidth
//                 variant="outlined"
//                 defaultValue={currentItem?.name || ''}
//                 required
//               />
//               <TextField
//                 margin="dense"
//                 name="description"
//                 label="Description"
//                 type="text"
//                 fullWidth
//                 variant="outlined"
//                 multiline
//                 rows={3}
//                 defaultValue={currentItem?.description || ''}
//               />
//               <TextField
//                 margin="dense"
//                 name="price"
//                 label="Prix"
//                 type="number"
//                 fullWidth
//                 variant="outlined"
//                 defaultValue={currentItem?.price || ''}
//                 required
//                 inputProps={{ step: 0.01, min: 0 }}
//               />
//               <FormControl fullWidth margin="dense">
//                 <InputLabel id="category-label">Catégorie</InputLabel>
//                 <Select
//                   labelId="category-label"
//                   name="categoryId"
//                   defaultValue={currentItem?.category.id || ''}
//                   label="Catégorie"
//                   required
//                 >
//                   {categories?.map((category) => (
//                     <MenuItem key={category.id} value={category.id}>{category.name}</MenuItem>
//                   ))}
//                 </Select>
//               </FormControl>
//             </DialogContent>
//             <DialogActions>
//               <Button onClick={handleCloseDialog}>Annuler</Button>
//               <Button type="submit" variant="contained">Sauvegarder</Button>
//             </DialogActions>
//           </form>
//         </Dialog>

//         <Dialog open={openCategoryDialog} onClose={handleCloseCategoryDialog}>
//           <form onSubmit={handleSaveCategory}>
//             <DialogTitle>{currentCategory ? 'Modifier la catégorie' : 'Ajouter une catégorie'}</DialogTitle>
//             <DialogContent>
//               <TextField
//                 autoFocus
//                 margin="dense"
//                 name="name"
//                 label="Nom de la catégorie"
//                 type="text"
//                 fullWidth
//                 variant="outlined"
//                 defaultValue={currentCategory?.name || ''}
//                 required
//               />
//             </DialogContent>
//             <DialogActions>
//               <Button onClick={handleCloseCategoryDialog}>Annuler</Button>
//               <Button type="submit" variant="contained">Sauvegarder</Button>
//             </DialogActions>
//           </form>
//         </Dialog>

//         <Snackbar
//           open={snackbar.open}
//           autoHideDuration={6000}
//           onClose={() => setSnackbar({ ...snackbar, open: false })}
//         >
//           <Alert severity={snackbar.severity} sx={{ width: '100%' }}>
//             {snackbar.message}
//           </Alert>
//         </Snackbar>
//       </Box>

//   );
// }

//////////////////

const menuPipe = (menuRes: Menu[] | undefined): Menu[] => {
  if (menuRes) {
    return menuRes.map((menu) => {
      console.log({
        image: `${import.meta.env.VITE_REACT_APP_IMAGES_URL}/${menu.imageUrl}`,
      });
      return {
        ...menu,
        imageUrl: `${import.meta.env.VITE_REACT_APP_IMAGES_URL}/${
          menu.imageUrl
        }`,
      };
    });
  }
  return [];
};

import React, { useEffect, useMemo, useState } from "react";
import {
  Box,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Snackbar,
  IconButton,
  Tabs,
  Tab,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  useTheme,
} from "@mui/material";
import {
  DataGrid,
  GridColDef,
  GridRenderCellParams,
  GridToolbar,
} from "@mui/x-data-grid";
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { hexToRgba } from "../../../utils/utils";
import { useQueries,  } from "react-query";
import categorieService, {
  Category,
  CreateCategoryDto,
  UpdateCategoryDto,
} from "../services/categorie.service";
import menuService, { Menu } from "../services/menu.service";
import { errorHandler } from "../../../handlers/errorHandler";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function MenuManagement() {
  const [openDialog, setOpenDialog] = useState(false);
  const [openCategoryDialog, setOpenCategoryDialog] = useState(false);
  const [currentItem, setCurrentItem] = useState<Menu | null>(null);
  const [currentCategory, setCurrentCategory] = useState<Category | null>(null);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success" as "success" | "error",
  });

  const [{ data, refetch: refetchMenu },{data: categories, refetch: refetchCategories}] = useQueries([
    { queryKey: ["menu"], queryFn: async () => await menuService.getMenu() },
    {queryKey:['categories'],queryFn:async () => await categorieService.getGategories()}
  ]);
  const [tabValue, setTabValue] = useState(0);
  const { palette } = useTheme();
  const [imagePreview, setImagePreview] = useState<File | null>(null);

  const menuItems = useMemo(() => menuPipe(data), [data]);
  useEffect(() => {
    console.log({ menuItems });
  }, [menuItems]);

  const handleOpenDialog = (item: Menu | null = null) => {
    setCurrentItem(item);
     setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setCurrentItem(null);
    setImagePreview(null);
  };

  const handleOpenCategoryDialog = (category: Category | null = null) => {
    setCurrentCategory(category);
    setOpenCategoryDialog(true);
  };

  const handleCloseCategoryDialog = () => {
    setOpenCategoryDialog(false);
    setCurrentCategory(null);
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImagePreview(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        // setImagePreview(file);
      };
      // reader.readAsDataURL(file);
    }
  };

  const handleSaveItem = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    if (currentItem) {
      const id = currentItem.id;
      // const updateItem: UpdateMenuDto = {
      //   name: formData.get('name') as string,
      //   description: formData.get('description') as string,
      //   price: parseFloat(formData.get('price') as string),
      //   categoryId: parseInt(formData.get('categoryId') as string),
      //   // imageUrl: imagePreview ??undefined
      // };
      if (imagePreview) formData.append("files", imagePreview);
      await menuService
        .updateMenu(id, formData)
        .then(() => {
          setSnackbar({
            open: true,
            message: "Article modifié avec succès",
            severity: "success",
          });
        })
        .then(() => refetchMenu())
        .catch((error) => errorHandler(error));
    } else {
      if (!imagePreview)
        setSnackbar({
          open: true,
          message: `l'image de menu est obligatoire`,
          severity: "error",
        });

      if (imagePreview) {
        await menuService
          .createMenu(formData)
          .then(() => {
            setSnackbar({
              open: true,
              message: "Nouvel article ajouté avec succès",
              severity: "success",
            });
          })
          .then(() => refetchMenu())
          .catch((error) => errorHandler(error));
      }
    }
    handleCloseDialog();
  };

  const handleSaveCategory = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    if (currentCategory) {
      const id = currentCategory.id;
      const updateCategoryDto: UpdateCategoryDto = {
        name: formData.get("name") as string,
        description: formData.get("description") as string,
      };
      await categorieService
        .updateCategory(id, updateCategoryDto)
        .then(() => {
          setSnackbar({
            open: true,
            message: "Catégorie modifiée avec succès",
            severity: "success",
          });
        })
        .then(() => refetchCategories())
        .catch((error) => errorHandler(error));
    } else {
      const createCategoryDto: CreateCategoryDto = {
        name: formData.get("name") as string,
        description: formData.get("description") as string,
      };
      await categorieService
        .createCategory(createCategoryDto)
        .then(() => {
          setSnackbar({
            open: true,
            message: "Nouvelle catégorie ajoutée avec succès",
            severity: "success",
          });
        })
        .then(() => refetchCategories())
        .catch((error) => {
          errorHandler(error);
          setSnackbar({ open: true, message: error, severity: "error" });
        });
    }
    handleCloseCategoryDialog();
  };

  const handleDeleteItem = async (id: number) => {
    await menuService
      .deleteMenu(id)
      .then(() => {
        setSnackbar({
          open: true,
          message: "Article supprimé avec succès",
          severity: "success",
        });
      })
      .then(() => refetchMenu())
      .catch((error) => errorHandler(error));
  };

  const handleDeleteCategory = async (id: number) => {
    await categorieService
      .deleteCategory(id)
      .then(() => {
        setSnackbar({
          open: true,
          message: "Catégorie supprimée avec succès",
          severity: "success",
        });
      })
      .then(() => refetchCategories())
      .catch((error) => errorHandler(error));
  };

  const columns: GridColDef[] = [
    { field: "name", headerName: "Nom", flex: 2 },
    { field: "description", headerName: "Description", flex: 2 },
    {
      field: "price",
      headerName: "Prix",
      width: 100,
      valueFormatter: (params: number) => `${params.toFixed(2)} DA`,
    },
    {
      field: "category",
      headerName: "Catégorie",
      flex: 1,
      valueGetter: (value: { name: string; id: number }) =>
        value.name.toString(),
    },
    {
      field: "imageUrl",
      headerName: "Image",
      flex: 1,
      renderCell: (params: GridRenderCellParams) => (
        <img
          src={`${params.row["imageUrl"]}`}
          alt={params.row.name}
          style={{ width: "50px", height: "50px", objectFit: "cover" }}
        />
      ),
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      renderCell: (params: GridRenderCellParams) => (
        <Box>
          <IconButton onClick={() => handleOpenDialog(params.row)} size="small">
            <EditIcon />
          </IconButton>
          <IconButton
            onClick={() => handleDeleteItem(params.row.id)}
            size="small"
          >
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

      <Tabs
        value={tabValue}
        onChange={(_, newValue) => setTabValue(newValue)}
        sx={{ mb: 2 }}
      >
        <Tab label="Articles" />
        <Tab label="Catégories" />
      </Tabs>

      {tabValue === 0 && (
        <>
          <Button
            variant="outlined"

            startIcon={<AddIcon />}
            onClick={() => handleOpenDialog()}
            sx={{ mb: 2 }}
          >
            Ajouter un article
          </Button>
          <DataGrid
            rows={menuItems}
            columns={columns}
            autoHeight
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
              "& .MuiDataGrid-toolbarContainer": {
                padding: "8px",
                backgroundColor: hexToRgba(palette.primary.light, 0.3),
              },
              "& .MuiButton-root": {
                color: "primary.main",
              },
            }}
          />
        </>
      )}

      {tabValue === 1 && (
        <>
          <Button
            variant="outlined"
            startIcon={<AddIcon />}
            onClick={() => handleOpenCategoryDialog()}
            sx={{ mb: 2 }}
          >
            Ajouter une catégorie
          </Button>
          <List>
            {categories?.map((category) => (
              <ListItem
                key={category.id}
                sx={{
                  ":hover": {
                    bgcolor: `${hexToRgba(palette.grey[400], 0.1)}`,
                  },
                }}
              >
                <ListItemText
                  primary={category.name}
                  sx={{ color: palette.text.primary }}
                />
                <ListItemSecondaryAction>
                  <IconButton
                    edge="end"
                    aria-label="edit"
                    onClick={() => handleOpenCategoryDialog(category)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={() => handleDeleteCategory(category.id)}
                  >
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
          <DialogTitle>
            {currentItem ? "Modifier l'article" : "Ajouter un article"}
          </DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              name="name"
              label="Nom de l'article"
              type="text"
              fullWidth
              variant="outlined"
              defaultValue={currentItem?.name || ""}
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
              defaultValue={currentItem?.description || ""}
            />
            <TextField
              margin="dense"
              name="price"
              label="Prix"
              type="number"
              fullWidth
              variant="outlined"
              defaultValue={currentItem?.price || ""}
              required
              inputProps={{ step: 0.01, min: 0 }}
            />
            <FormControl fullWidth margin="dense">
              <InputLabel id="category-label">Catégorie</InputLabel>
              <Select
                labelId="category-label"
                name="categoryId"
                defaultValue={currentItem?.category.id || ""}
                label="Catégorie"
                required
              >
                {categories?.map((category) => (
                  <MenuItem key={category.id} value={category.id}>
                    {category.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Box sx={{ mt: 2 }}>
              <input
                // accept="*"
                style={{ display: "none" }}
                id="raised-button-file"
                type="file"
                name="files"
                onChange={handleImageChange}
              />
              <label htmlFor="raised-button-file">
                <Button variant="contained" component="span"></Button>
              </label>
            </Box>
            {(imagePreview || currentItem || imagePreview || currentItem) && (
              <Box sx={{ mt: 2 }}>
                <img
                  src={imageDisplayPreview(
                    (imagePreview
                      ? URL.createObjectURL(imagePreview)
                      : currentItem?.imageUrl
                      ? currentItem.imageUrl
                      : "") ?? ""
                  )}
                  alt="Preview"
                  style={{ maxWidth: "100%", maxHeight: "200px" }}
                />
              </Box>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Annuler</Button>
            <Button type="submit" variant="contained">
              Sauvegarder
            </Button>
          </DialogActions>
        </form>
      </Dialog>

      <Dialog open={openCategoryDialog} onClose={handleCloseCategoryDialog}>
        <form onSubmit={handleSaveCategory}>
          <DialogTitle>
            {currentCategory
              ? "Modifier la catégorie"
              : "Ajouter une catégorie"}
          </DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              name="name"
              label="Nom de la catégorie"
              type="text"
              fullWidth
              variant="outlined"
              defaultValue={currentCategory?.name || ""}
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
              defaultValue={currentCategory?.description || ""}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseCategoryDialog}>Annuler</Button>
            <Button type="submit" variant="contained">
              Sauvegarder
            </Button>
          </DialogActions>
        </form>
      </Dialog>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert severity={snackbar.severity} sx={{ width: "100%" }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}

const imageDisplayPreview = (
  image: File | string | undefined
): string | undefined => {
  if (image instanceof File) return URL.createObjectURL(image);
  if (image) return `${image}`;
  if (!image) return undefined;
};
