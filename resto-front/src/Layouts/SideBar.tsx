import {
    AppBar,
    Box,
    CssBaseline,
    Divider,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Toolbar,
    Typography,
    useTheme,
    useMediaQuery,
    Avatar,
    styled,
    Tooltip,
  } from '@mui/material';
  import {
    Menu as MenuIcon,
    Dashboard as DashboardIcon,
    People as PeopleIcon,
    ConnectedTv,
    LiveTv,
    Logout
  } from '@mui/icons-material';
  import { Outlet, useLocation, useNavigate } from 'react-router-dom';
  import { 
      useContext,
      useEffect, useState } from 'react';
  import { AuthContext } from '../context/authContext';
  import MobileNav from './MobileNav';
  
  
  
  
  const drawerWidth = 200;
  const collapsedDrawerWidth = 50; 
  
  const Root = styled('div')({
    display: 'flex',
    height: '100vh',
  });
  
   
  
  const StyledDrawer = styled(Drawer)<{ open: boolean }>(({ theme, open }) => ({
    width: open ? drawerWidth : collapsedDrawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    '& .MuiDrawer-paper': {
      width: open ? drawerWidth : collapsedDrawerWidth,
      boxSizing: 'border-box',
      backgroundColor: theme.palette.background.paper,
      color: theme.palette.text.primary,
      transition: theme.transitions.create(['width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      overflowX: 'hidden',
    },
  }));
  
  const StyledListItemButton = styled(ListItemButton)(({ theme }) => ({
    borderRadius: theme.shape.borderRadius,
     '&.Mui-selected': {
      backgroundColor: theme.palette.grey[200],
      '&:hover': {
        backgroundColor:  theme.palette.grey[200],
      },
    },
    '&:hover': {
      backgroundColor:  theme.palette.grey[100],
  
    },
  }));
  
  const StyledListItemIcon = styled(ListItemIcon)(({ theme }) => ({
    color: theme.palette.primary.contrastText,
    minWidth: 40,
  }));
  
  const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
    open?: boolean;
  }>(({ theme }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
     display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    overflow: 'hidden',
  }));
   
  const ContentArea = styled(Box)({
  flexGrow: 1,
    overflow: 'auto',
   });
  
  export default function SideBar() {
    const theme = useTheme();
    const authContext = useContext(AuthContext);
    // const authContext = {
    //     handleLogout:()=>{},
    //     user:{
    //         email:'abdela@email.com',
    //         photoUrl:'',

    //     }
    // }
    const location = useLocation();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [drawerExpanded, setDrawerExpanded] = useState(false); 
    const navigate = useNavigate();
    const handleDrawerToggle = () => {
      setDrawerExpanded(!drawerExpanded); 
    };
    const menuItems = [
      { text: 'Dashboard', icon: <DashboardIcon />,path:'' },
      { text: 'Emissions', icon: <ConnectedTv /> ,path:'commandes'},
      { text: 'Live', icon: <LiveTv /> ,path:'analyse'},
      { text: 'Ustilisateurs', icon: <PeopleIcon /> ,path:'users' }
    ];
    const [selectedItem, setSelectedItem] = useState('');
    
     useEffect(()=>{
      const path = location.pathname.replace('/', '');
      setSelectedItem(menuItems.find((e)=>e.path==path)?.text??'Dashboard')
    },[location])
    
  
    const drawer = (
      <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column'}}>
         <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', py: 2 }}>
          <IconButton onClick={handleDrawerToggle} sx={{ color: 'white' }}>
            <MenuIcon />
          </IconButton>
        </Box>
        <Toolbar sx={{ justifyContent: 'center', py: 3 }}
        >
          <Avatar
            alt={authContext.user?.email.toUpperCase()}
            src={`${authContext.user?.photoUrl}`}
            sx={{ width: 40, height: 40 }}
          />
         
        </Toolbar>
           {
            drawerExpanded ?(
            <Typography variant="subtitle2" align="center" sx={{ mb: 2 }}>
              
              {
                authContext.user&&authContext.user.role.name.toLocaleLowerCase()
              } </Typography>
            ):null
           }
         
        <Typography variant="subtitle1" align="center" sx={{ mb: 2 }}>
          {drawerExpanded ? (
            <>
            {
              authContext.user&&`${authContext.user?.email}`
            }
            </>
          ) : null}
        </Typography>
         <List sx={{ flexGrow: 1, py: 2 }}>
          {menuItems.map((item) => (
            <ListItem key={item.text} disablePadding>
              <StyledListItemButton
                selected={selectedItem === item.text}
                onClick={() => {navigate(`${item.path}`);setSelectedItem(item.text)}}
              >
                  <Tooltip title={item.text.toLowerCase()} placement='right-start'>
                      <StyledListItemIcon>{item.icon}</StyledListItemIcon>
                  </Tooltip>
                <ListItemText primary={drawerExpanded ? item.text : ''} />
              </StyledListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider sx={{ bgcolor: 'rgba(255, 255, 255, 0.12)' }} />
        
      </Box>
    );
  
   
    if(isMobile){
      return(
        <MobileNav menuItems={menuItems}/>
      )
    }
    return (
      <Root>
        <CssBaseline />
        <AppBar
          position="fixed"
          sx={{
            zIndex: theme.zIndex.drawer + 1,
            bgcolor: 'background.paper',
            color: 'text.primary',
            boxShadow: 'none',
            borderBottom: '1px solid',
            borderColor: 'divider',
          }}
        >
          <Toolbar
          sx={{
            display:'flex',
            justifyContent:'space-between'
          }}
          >
            <Box
            sx={{
              display:'flex',
              alignItems:'center'
            }}
            >
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 0}}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap component="div">
               {import.meta.env.VITE_REACT_APP_NAME}
            </Typography>
            </Box>
            <IconButton
            onClick={authContext.handleLogout}
            >
              <Logout/>
            </IconButton>
          </Toolbar>
        </AppBar>
        <Box
          component="nav"
          aria-label="mailbox folders"
        >
   
          <StyledDrawer
           variant={isMobile ? "temporary" : "permanent"}
            open={drawerExpanded}
          >
            {drawer}
          </StyledDrawer>
        </Box>
        <Main open={drawerExpanded}>
          <Toolbar />
          <ContentArea
          >
   
            <Outlet/>
          </ContentArea>
        </Main>
      </Root>
    );
  }
  
  
  