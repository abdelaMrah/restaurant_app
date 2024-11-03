// import React, { useContext, useEffect, useState } from 'react';
// import {
//   Box,
//   Drawer,
//   List,
//   ListItem,
//   ListItemButton,
//   ListItemIcon,
//   ListItemText,
//   Collapse,
//   TextField,
//   Typography,
//   Avatar,
//   IconButton,
//   useTheme,
//   useMediaQuery,
// } from '@mui/material';
// import {
//   ChevronLeft as ChevronLeftIcon,
//   ExpandLess,
//   ExpandMore,
//   Home as HomeIcon,
//   Inbox as InboxIcon,
//   Assessment as AssessmentIcon,
//   People as PeopleIcon,
//   Settings as SettingsIcon,
//   Search as SearchIcon,
//   Restaurant as RestaurantIcon,
   
// } from '@mui/icons-material';
// import { Outlet } from 'react-router-dom';
// import  { ButtomNavigation } from './MobileNav';
// import { AuthContext } from '../context/authContext';
// const menuItems = [
//   { text: 'Dashboard', icon: <HomeIcon />,path:'' },
//   { text: 'Commandes', icon: <InboxIcon /> ,path:'commandes'},
//   { text: 'Analyse', icon: <AssessmentIcon /> ,path:'analyse'},
//   { text: 'Ustilisateurs', icon: <PeopleIcon /> ,path:'users' }
// ];
// const DRAWRERWIDTH = 280;

// interface SidebarProps {
//   open: boolean;
//   onClose: () => void;
//   children:React.ReactElement;
//   isMobile:boolean;
// }

//  function Sidebar({ open, onClose,children,isMobile }: SidebarProps) {
//   const [drawerWidth,setDrawerWidth]=useState(isMobile? 0:DRAWRERWIDTH)
//   const authContext = useContext(AuthContext);
//   useEffect(()=>{
//     setDrawerWidth(isMobile?0:DRAWRERWIDTH)
//   },[isMobile])
//   const [channelsOpen, setChannelsOpen] = useState(true);
//   const [groupsOpen, setGroupsOpen] = useState(false);

//   const handleChannelsClick = () => {
//     setChannelsOpen(!channelsOpen);
//   };
//   const handleGroupsClick = () => {
//     setGroupsOpen(!groupsOpen);
//   };
//   const sidebarContent = (
//     <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
//       <Box sx={{ p: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
//         <Typography variant="h6" noWrap component="div" sx={{ fontWeight: 'bold' }}>
//         {import.meta.env.VITE_REACT_APP_NAME}
//         </Typography>
//         {isMobile && (
//           <IconButton onClick={onClose}>
//             <ChevronLeftIcon />
//           </IconButton>
//         )}
//       </Box>

//       <Box sx={{ p: 2 }}>
//         <TextField
//           fullWidth
//           variant="outlined"
//           size="small"
//           placeholder="Search"
//           InputProps={{
//             startAdornment: <SearchIcon sx={{ color: 'text.secondary', mr: 1 }} />,
//           }}
//         />
//       </Box>

//       <List sx={{ flexGrow: 1, overflow: 'auto' }}>
//         <ListItem disablePadding>
//           <ListItemButton>
//             <ListItemIcon>
//               <HomeIcon />
//             </ListItemIcon>
//             <ListItemText primary="Dashboard" />
//           </ListItemButton>
//         </ListItem>

//         <ListItem disablePadding>
//           <ListItemButton>
//             <ListItemIcon>
//               <RestaurantIcon />
//             </ListItemIcon>
//             <ListItemText primary="Menu" />
//           </ListItemButton>
//         </ListItem>
//         <ListItem disablePadding>
//           <ListItemButton>
//             <ListItemIcon>
//               <InboxIcon />
//             </ListItemIcon>
//             <ListItemText primary="Commandes" />
//           </ListItemButton>
//         </ListItem>

//         <ListItem disablePadding>
//           <ListItemButton onClick={handleChannelsClick}>
//             <ListItemIcon>
//               <AssessmentIcon />
//             </ListItemIcon>
//             <ListItemText primary="Rapports" />
//             {channelsOpen ? <ExpandLess /> : <ExpandMore />}
//           </ListItemButton>
//         </ListItem>
//         <Collapse in={channelsOpen} timeout="auto" unmountOnExit>
//           <List component="div" disablePadding>
//             <ListItemButton sx={{ pl: 4 }}>
//               <ListItemText primary="Ventes" />
//             </ListItemButton>
//             <ListItemButton sx={{ pl: 4 }}>
//               <ListItemText primary="Inventaire" />
//             </ListItemButton>
//           </List>
//         </Collapse>

//         <ListItem disablePadding>
//           <ListItemButton onClick={handleGroupsClick}>
//             <ListItemIcon>
//               <PeopleIcon />
//             </ListItemIcon>
//             <ListItemText primary="Staff" />
//             {groupsOpen ? <ExpandLess /> : <ExpandMore />}
//           </ListItemButton>
//         </ListItem>
//         <Collapse in={groupsOpen} timeout="auto" unmountOnExit>
//           <List component="div" disablePadding>
//             <ListItemButton sx={{ pl: 4 }}>
//               <ListItemText primary="Managers" />
//             </ListItemButton>
//             <ListItemButton sx={{ pl: 4 }}>
//               <ListItemText primary="Chefs" />
//             </ListItemButton>
//             <ListItemButton sx={{ pl: 4 }}>
//               <ListItemText primary="Serveurs" />
//             </ListItemButton>
//           </List>
//         </Collapse>

//         <ListItem disablePadding>
//           <ListItemButton>
//             <ListItemIcon>
//               <SettingsIcon />
//             </ListItemIcon>
//             <ListItemText primary="Paramettres" />
//           </ListItemButton>
//         </ListItem>
//       </List>

//       <Box sx={{ p: 2, borderTop: 1, borderColor: 'divider' }}>
//         {
//           authContext.user&&(<ListItem disablePadding>
//             <ListItemButton>
//               <ListItemIcon>
//                 <Avatar alt={authContext.user.email} src={authContext.user?.photoUrl?.toString()} />
//               </ListItemIcon>
//               <ListItemText primary={authContext?.user?.role.name.toLowerCase()} secondary={authContext.user?.email} />
//             </ListItemButton>
//           </ListItem>)
//         }
//       </Box>
//     </Box>
//   );
 
//   return (
//   <Box 
//     sx={{
//       display:'flex',
//       justifyContent:'start',
//       alignItems:'center',
//       width:'100%'
//     }}
//   >
//       <Box
//       component="nav"
//       sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
//       aria-label="mailbox folders"
//     >
//       {isMobile ? (
//         <Drawer
//           variant="temporary"
//           open={open}
//           onClose={onClose}
//           ModalProps={{
//             keepMounted: true,
//           }}
//           sx={{
//             display: { xs: 'block', sm: 'none' },
//             '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
//           }}
//         >
//           {sidebarContent}
//         </Drawer>
//       ) : (
//         <Drawer
//           variant="persistent"
//           ModalProps={{
//             keepMounted:true
//           }}
//           sx={{
//             display: { xs: 'none', sm: 'block' },
//             '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth-40 },
//           }}
//           open
//         >
//           {sidebarContent}
//         </Drawer>
//       )}
//     </Box>
//       {children}
//       {
//         isMobile&&(
//           <ButtomNavigation
//           menuItems={menuItems}
//           />
//         )
//       }
//   </Box>
//   );
// }
// function SideBar(){
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down('lg'));
//   const [open,setOpen]=useState(isMobile?false:true)
//   return(
//     <Sidebar
//       isMobile={isMobile}
//       open={open}
//       onClose={()=>setOpen(false)}
//       children={<Outlet/>}
//     />
//   )
// }
// export default SideBar;







///////////





import React, { useContext, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  TextField,
  Typography,
  Avatar,
  IconButton,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  ChevronLeft as ChevronLeftIcon,
  ExpandLess,
  ExpandMore,
  Home as HomeIcon,
  ShoppingCart as ShoppingCartIcon,
  Restaurant as RestaurantIcon,
  Inventory as InventoryIcon,
  People as PeopleIcon,
  Analytics as AnalyticsIcon,
  Settings as SettingsIcon,
  TableBar as TableBarIcon,
  Search as SearchIcon,
} from '@mui/icons-material';
import { Outlet } from 'react-router-dom';
import { AuthContext } from '../context/authContext';
import { hexToRgba } from '../utils/utils';

const DRAWER_WIDTH = 280;

const menuItems = [
  { text: 'Tableau de Bord', icon: <HomeIcon />, path: '' },
  { 
    text: 'Commandes', 
    icon: <ShoppingCartIcon />, 
    path: 'commandes',
    subItems: [
      { text: 'Commandes en Cours', path: 'en-cours' },
      { text: 'Commandes en Ligne', path: 'online' },
      { text: 'Nouvelle Commande', path: 'new' },
      { text: 'Historique des Commandes', path: 'history' },
    ]
  },
  { 
    text: 'Menu', 
    icon: <RestaurantIcon  />, 
    path: 'menu',
    subItems: [
      { text: 'Gestion du Menu', path: 'management' },
    ]
  },
  { 
    text: 'Inventaire', 
    icon: <InventoryIcon  />, 
    path: 'inventory',
    subItems: [
      { text: 'Gestion des Stocks', path: 'management' },
      { text: 'Commandes de Réapprovisionnement', path: 'reorder' },
      { text: 'Alertes de Stock Faible', path: 'alert' },
    ]
  },
  { 
    text: 'Utilisateurs', 
    icon: <PeopleIcon  />, 
    path: 'users',
    subItems: [
      { text: 'Gestion du Personnel', path: 'staff' },
      { text: 'Programme du Personnel', path: 'programme' },
      { text: 'Rôles et Permissions', path: 'permissions' },
      { text: 'Gestion des Salaires', path: 'salary' },
    ]
  },
  { 
    text: 'Analytique', 
    icon: <AnalyticsIcon />, 
    path: 'analyse',
    subItems: [
      { text: 'Tableau de Bord Analytique', path: '' },
      { text: 'Analyse des Heures de Pointe', path: 'pointe' },
    ]
  },
  { 
    text: 'Paramètres', 
    icon: <SettingsIcon />, 
    path: 'paramettres',
    subItems: [
      { text: 'Paramètres du Restaurant', path: '' },
      { text: 'Profil Utilisateur', path: 'profile' },
    ]
  },
  { 
    text: 'Tables', 
    icon: <TableBarIcon color='primary' />, 
    path: 'tables',
    subItems: [
      { text: 'Tables du Restaurant', path: '' },
    ]
  },
];

// const menuItems = [
//   { text: 'Dashboard', icon: <HomeIcon />, path: '' },
//   { 
//     text: 'Commandes', 
//     icon: <ShoppingCartIcon />, 
//     path: 'commandes',
//     subItems: [
//       { text: 'Orders', path: 'en-cours' },
//       { text: 'Online Orders', path: 'online' },
//       { text: 'New Order', path: 'new' },
//       { text: 'Order History', path: 'history' },
//     ]
//   },
//   { 
//     text: 'Menu', 
//     icon: <RestaurantIcon  />, 
//     path: 'menu',
//     subItems: [
//       // { text: 'Menu', path: '' },
//       { text: 'Menu Management', path: 'management' },
//     ]
//   },
//   { 
//     text: 'Inventory', 
//     icon: <InventoryIcon  />, 
//     path: 'inventory',
//     subItems: [
//       { text: 'Inventory Management', path: 'management' },
//       { text: 'Restock Orders', path: 'reorder' },
//       { text: 'Low Stock Alerts', path: 'alert' },
//     ]
//   },
//   { 
//     text: 'Users', 
//     icon: <PeopleIcon  />, 
//     path: 'users',
//     subItems: [
//       { text: 'Staff Management', path: 'staff' },
//       { text: 'Staff Scheduling', path: 'programme' },
//       { text: 'Role & Permissions', path: 'permissions' },
//       { text: 'Salary Management', path: 'salary' },
//     ]
//   },
//   { 
//     text: 'Analytics', 
//     icon: <AnalyticsIcon />, 
//     path: 'analyse',
//     subItems: [
//       { text: 'Analytics Dashboard', path: '' },
//       { text: 'Peak Hours Analysis', path: 'pointe' },
//     ]
//   },
//   { 
//     text: 'Settings', 
//     icon: <SettingsIcon />, 
//     path: 'paramettres',
//     subItems: [
//       { text: 'Restaurant Settings', path: '' },
//       { text: 'User Profile', path: 'profile' },
//     ]
//   },
//   { 
//     text: 'Tables', 
//     icon: <TableBarIcon color='primary'/>, 
//     path: 'tables',
//     subItems: [
//       { text: 'Restaurant Tables', path: '' },
//     ]
//   },
// ];

interface SidebarProps {
  open: boolean;
  onClose: () => void;
  isMobile: boolean;
}

function Sidebar({ open, onClose, isMobile }: SidebarProps) {
  const authContext = useContext(AuthContext);
  const location = useLocation();
  const [openSubMenus, setOpenSubMenus] = useState<{ [key: string]: boolean }>({});
  const {palette} = useTheme()
  const handleSubMenuClick = (path: string) => {
    setOpenSubMenus(prev => ({ ...prev, [path]: !prev[path] }));
  };

  const isActive = (path: string) => location.pathname.startsWith(`/${path}`);

  const drawerWidth = isMobile ? 0 : DRAWER_WIDTH;

  const sidebarContent = (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <Box sx={{ p: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography variant="h6" noWrap component="div" sx={{ fontWeight: 'bold' }}>
          {import.meta.env.VITE_REACT_APP_NAME}
        </Typography>
        {isMobile && (
          <IconButton onClick={onClose}>
            <ChevronLeftIcon />
          </IconButton>
        )}
      </Box>

      <Box sx={{ p: 2 }}>
        <TextField
          fullWidth
          variant="outlined"
          size="small"
          placeholder="Search"
          InputProps={{
            startAdornment: <SearchIcon sx={{ color: 'text.secondary', mr: 1 }} />,
          }}
        />
      </Box>

      <List sx={{ flexGrow: 1, overflow: 'auto' }}>
        {menuItems.map((item) => (
          <React.Fragment key={item.path}>
            <ListItem disablePadding>
              <ListItemButton
                component={Link}
                to={item.path}
                selected={isActive(item.path)}
                
                onClick={() => item.subItems && handleSubMenuClick(item.path)}
              >
                <ListItemIcon
                color={palette.primary.light}
                sx={{
                  color:palette.primary.light
                }}
                >{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
                {item.subItems && (openSubMenus[item.path] ? <ExpandLess /> : <ExpandMore />)}
              </ListItemButton>
            </ListItem>
            {item.subItems && (
              <Collapse in={openSubMenus[item.path]} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {item.subItems.map((subItem) => (
                    <ListItemButton
                      
                      key={subItem.path}
                      sx={{ pl: 4 }}
                      component={Link}
                      to={`${item.path}/${subItem.path}`}
                      selected={isActive(`${item.path}/${subItem.path}`)}
                      style={{
                        backgroundColor:hexToRgba(palette.grey[100],0.05)
                      }}
                    >
                      <ListItemText primary={subItem.text} />
                    </ListItemButton>
                  ))}
                </List>
              </Collapse>
            )}
          </React.Fragment>
        ))}
      </List>

      <Box sx={{ p: 2, borderTop: 1, borderColor: 'divider' }}>
        {authContext.user && (
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <Avatar alt={authContext.user.email} src={authContext.user?.photoUrl?.toString()} />
              </ListItemIcon>
              <ListItemText primary={authContext?.user?.role.name.toLowerCase()} secondary={authContext?.user?.email} />
            </ListItemButton>
          </ListItem>
        )}
      </Box>
    </Box>
  );

  return (
    <Box
      component="nav"
      sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      aria-label="mailbox folders"
    >
      {isMobile ? (
        <Drawer
          variant="temporary"
          open={open}
          onClose={onClose}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: DRAWER_WIDTH },
          }}
        >
          {sidebarContent}
        </Drawer>
      ) : (
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: DRAWER_WIDTH - 40 },
          }}
          open
        >
          {sidebarContent}
        </Drawer>
      )}
    </Box>
  );
}

export default function SidebarWrapper() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('lg'));
  const [open, setOpen] = useState(!isMobile);

  return (
    <Box sx={{ display: 'flex' }}>
      <Sidebar
        isMobile={isMobile}
        open={open}
        onClose={() => setOpen(false)}
      />
      <Box component="main" sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${DRAWER_WIDTH}px)` } }}>
        <Outlet />
      </Box>
    </Box>
  );
}











/////////////////////////















// import React, { useContext, useState } from 'react';
// import { Link, useLocation, useNavigate } from 'react-router-dom';
// import {
//   Box,
//   Drawer,
//   List,
//   ListItem,
//   ListItemButton,
//   ListItemIcon,
//   ListItemText,
//   Collapse,
//   TextField,
//   Typography,
//   Avatar,
//   IconButton,
//   useTheme,
//   useMediaQuery,
 
// } from '@mui/material';
// import {
//   ChevronLeft as ChevronLeftIcon,
//   ExpandLess,
//   ExpandMore,
//   Home as HomeIcon,
//   ShoppingCart as ShoppingCartIcon,
//   Restaurant as RestaurantIcon,
//   Inventory as InventoryIcon,
//   People as PeopleIcon,
//   Analytics as AnalyticsIcon,
//   Settings as SettingsIcon,
//   TableBar as TableBarIcon,
//   Search as SearchIcon,
// } from '@mui/icons-material';
// import { Outlet } from 'react-router-dom';
// import { AuthContext } from '../context/authContext';
// import MobileNav,{MenuItem} from './MobileNav';

// const DRAWER_WIDTH = 280;
 
// const menuItems:MenuItem[] = [
//   { text: 'Dashboard', icon: <HomeIcon />, path: '' },
//   { 
//     text: 'Commandes', 
//     icon: <ShoppingCartIcon />, 
//     isForMobile:true,
//     path: 'commandes',
//     subItems: [
     
//       { text: 'Current Orders', path: '', },
//       { text: 'Online Orders', path: 'online' },
//       { text: 'New Order', path: 'new',isForMobile:true ,icon:<ShoppingCartIcon/> },
//       { text: 'Order History', path: 'history' },
//     ]
//   },
//   { 
//     text: 'Menu', 
//     icon: <RestaurantIcon />, 
//     path: 'menu',
//     isForMobile:true,
//     subItems: [
//       { text: 'Menu Management', path: '',icon:<RestaurantIcon/> },
//     ]
//   },
//   { 
//     text: 'Inventory', 
//     icon: <InventoryIcon />, 
//     path: 'inventory',
//     subItems: [
//       { text: 'Inventory Management', path: 'management' },
//       { text: 'Restock Orders', path: 'reorder' },
//       { text: 'Low Stock Alerts', path: 'alert' },
//     ]
//   },
//   { 
//     text: 'Users', 
//     icon: <PeopleIcon />, 
//     path: 'users',
//     subItems: [
//       { text: 'Staff Management', path: '' },
//       { text: 'Staff Scheduling', path: 'programme' },
//       { text: 'Role & Permissions', path: 'permissions' },
//       { text: 'Salary Management', path: 'salary' },
//     ]
//   },
//   { 
//     text: 'Analytics', 
//     icon: <AnalyticsIcon />, 
//     path: 'analyse',
//     subItems: [
//       { text: 'Analytics Dashboard', path: '' },
//       { text: 'Peak Hours Analysis', path: 'pointe' },
//     ]
//   },
//   { 
//     text: 'Settings', 
//     icon: <SettingsIcon />, 
//     path: 'paramettres',
//     subItems: [
//       { text: 'Restaurant Settings', path: '' },
//       { text: 'User Profile', path: 'profile' },
//     ]
//   },
//   { 
//     text: 'Tables', 
//     icon: <TableBarIcon />, 
//     path: 'tables',
//     subItems: [
//       { text: 'Restaurant Tables', path: '' },
//     ]
//   },
// ];

// interface SidebarProps {
//   open: boolean;
//   onClose: () => void;
//   isMobile: boolean;
//   children:React.ReactElement
// }

// function Sidebar({ open, onClose, isMobile ,children}: SidebarProps) {
//   const authContext = useContext(AuthContext);
//   const location = useLocation();
//   const navigate = useNavigate();
//   const [openSubMenus, setOpenSubMenus] = useState<{ [key: string]: boolean }>({});
//   const [bottomNavValue, setBottomNavValue] = useState('');

//   const handleSubMenuClick = (path: string) => {
//     setOpenSubMenus(prev => ({ ...prev, [path]: !prev[path] }));
//   };

//   const isActive = (path: string) => location.pathname.startsWith(`/${path}`);

//   const drawerWidth = isMobile ? 0 : DRAWER_WIDTH;

//   const handleBottomNavChange = (_event: React.SyntheticEvent, newValue: string) => {
//     setBottomNavValue(newValue);
//     navigate(newValue);
//   };

//   const sidebarContent = (
//     <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
//       <Box sx={{ p: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
//         <Typography variant="h6" noWrap component="div" sx={{ fontWeight: 'bold' }}>
//           {import.meta.env.VITE_REACT_APP_NAME}
//         </Typography>
//         {isMobile && (
//           <IconButton onClick={onClose}>
//             <ChevronLeftIcon />
//           </IconButton>
//         )}
//       </Box>

//       <Box sx={{ p: 2 }}>
//         <TextField
//           fullWidth
//           variant="outlined"
//           size="small"
//           placeholder="Search"
//           InputProps={{
//             startAdornment: <SearchIcon sx={{ color: 'text.secondary', mr: 1 }} />,
//           }}
//         />
//       </Box>

//       <List sx={{ flexGrow: 1, overflow: 'auto' }}>
//         {menuItems.map((item) => (
//           <React.Fragment key={item.path}>
//             <ListItem disablePadding>
//               <ListItemButton
//                 component={Link}
//                 to={item.path}
//                 selected={isActive(item.path)}
//                 onClick={() => item.subItems && handleSubMenuClick(item.path)}
//               >
//                 <ListItemIcon>{item.icon}</ListItemIcon>
//                 <ListItemText primary={item.text} />
//                 {item.subItems && (openSubMenus[item.path] ? <ExpandLess /> : <ExpandMore />)}
//               </ListItemButton>
//             </ListItem>
//             {item.subItems && (
//               <Collapse in={openSubMenus[item.path]} timeout="auto" unmountOnExit>
//                 <List component="div" disablePadding>
//                   {item.subItems.map((subItem) => (
//                     <ListItemButton
//                       key={subItem.path}
//                       sx={{ pl: 4 }}
//                       component={Link}
//                       to={`${item.path}/${subItem.path}`}
//                       selected={isActive(`${item.path}/${subItem.path}`)}
//                     >
//                       <ListItemText primary={subItem.text} />
//                     </ListItemButton>
//                   ))}
//                 </List>
//               </Collapse>
//             )}
//           </React.Fragment>
//         ))}
//       </List>

//       <Box sx={{ p: 2, borderTop: 1, borderColor: 'divider' }}>
//         {authContext.user && (
//           <ListItem disablePadding>
//             <ListItemButton>
//               <ListItemIcon>
//                 <Avatar alt={authContext.user.email} src={authContext.user?.photoUrl?.toString()} />
//               </ListItemIcon>
//               <ListItemText primary={authContext?.user?.role.name.toLowerCase()} secondary={authContext?.user?.email} />
//             </ListItemButton>
//           </ListItem>
//         )}
//       </Box>
//     </Box>
//   );

//   return (
//     <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
//       <Box
//         component="nav"
//         sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
//         aria-label="mailbox folders"
//       >
//         {isMobile ? (
//           <Drawer
//             variant="temporary"
//             open={open}
//             onClose={onClose}
//             ModalProps={{
//               keepMounted: true,
//             }}
//             sx={{
//               display: { xs: 'block', sm: 'none' },
//               '& .MuiDrawer-paper': { boxSizing: 'border-box', width: DRAWER_WIDTH },
//             }}
//           >
//             {sidebarContent}
//           </Drawer>
//         ) : (
//           <Drawer
//             variant="permanent"
//             sx={{
//               display: { xs: 'none', sm: 'block' },
//               '& .MuiDrawer-paper': { boxSizing: 'border-box', width: DRAWER_WIDTH - 40 },
//             }}
//             open
//           >
//             {sidebarContent}
//           </Drawer>
//         )}
//       </Box>
//       <Box component="main" sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` }, marginBottom: isMobile ? '56px' : 0 }}>
//         {children}
//       </Box>
//       {isMobile && (
//         <MobileNav
//         // menuItems={menuItems}
//         menuItems={menuItems}
//         key={12}
//         />
//         // <BottomNavigation
//         //   value={bottomNavValue}
//         //   onChange={handleBottomNavChange}
//         //   sx={{
//         //     width: '100%',
//         //     position: 'fixed',
//         //     bottom: 0,
//         //     left: 0,
//         //     zIndex: 1000,
//         //   }}
//         // >
//         //   {menuItems.slice(0, 5).map((item) => (
//         //     <BottomNavigationAction
//         //       key={item.path}
//         //       label={item.text}
//         //       value={item.path}
//         //       icon={item.icon}
//         //     />
//         //   ))}
//         // </BottomNavigation>
//       )}
//     </Box>
//   );
// }

// export default function SidebarWrapper() {
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down('lg'));
//   const [open, setOpen] = useState(!isMobile);

//   return (
//     <Sidebar
//       isMobile={isMobile}
//       open={open}
//       onClose={() => setOpen(false)}
//       children={<Outlet/>}
//     />
//   );
// }