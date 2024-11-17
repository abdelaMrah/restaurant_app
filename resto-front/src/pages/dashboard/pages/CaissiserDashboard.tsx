import React from 'react';
import {
  Box,
  Grid,
  Paper,
  Typography,
  IconButton,
  useTheme,
  Card,
  CardContent,
  CardActionArea,
  useMediaQuery,
} from '@mui/material';
import {
  Restaurant as RestaurantIcon,
  People as PeopleIcon,
  Inventory as InventoryIcon,
  Receipt as ReceiptIcon,
  MenuBook as MenuIcon,
  Settings as SettingsIcon,
  AttachMoney as MoneyIcon,
  Dashboard as DashboardIcon,
  Notifications as NotificationsIcon,
  ExitToApp as LogoutIcon,
} from '@mui/icons-material';

interface DashboardItemProps {
  title: string;
  icon: React.ReactElement;
  color: string;
}

const DashboardItem: React.FC<DashboardItemProps> = ({ title, icon, color }) => {
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.only('xs'));
  const isSm = useMediaQuery(theme.breakpoints.only('sm'));
  const isMd = useMediaQuery(theme.breakpoints.only('md'));
  
  const getIconSize = () => {
    if (isXs) return 60;
    if (isSm) return 70;
    if (isMd) return 80;
    return 90; // for lg and above
  };

  const getBoxSize = () => {
    if (isXs) return 80;
    if (isSm) return 100;
    if (isMd) return 120;
    return 140; // for lg and above
  };
  
  return (
    <Grid item xs={6} sm={4} md={3}>
      <Card 
        elevation={1}
        sx={{ 
          bgcolor: 'background.default',
          transition: 'all 0.3s',
          '&:hover': {
            transform: 'translateY(-5px)',
            boxShadow: theme.shadows[4],
          },
        }}
      >
        <CardActionArea >
          <CardContent sx={{ textAlign: 'center', p: 2 }}>
            <Box
            
              sx={{
                bgcolor: color,
                color: 'white',
                borderRadius: '50%',
                width: getBoxSize(),
                height: getBoxSize(),
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                margin: '0 auto 16px',
              }}
            >
              {React.cloneElement(icon, { sx: { fontSize: getIconSize() } })}
            </Box>
            <Typography variant={isXs ? "body1" : "h6"} component="h2">
              {title}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  );
};

export default function MainDashboard() {
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.only('xs'));

  const dashboardItems: DashboardItemProps[] = [
    { title: "Commandes", icon: <ReceiptIcon />, color: theme.palette.primary.main },
    { title: "Menu", icon: <MenuIcon />, color: theme.palette.secondary.main },
    { title: "Employés", icon: <PeopleIcon />, color: theme.palette.success.main },
    { title: "Inventaire", icon: <InventoryIcon />, color: theme.palette.warning.main },
    { title: "Finances", icon: <MoneyIcon />, color: theme.palette.info.main },
    { title: "Caisse", icon: <RestaurantIcon />, color: theme.palette.error.main },
    { title: "Rapports", icon: <DashboardIcon />, color: theme.palette.primary.dark },
    { title: "Paramètres", icon: <SettingsIcon />, color: theme.palette.grey[700] },
  ];

  return (
    <Box 
      sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'center', 
        alignItems: 'center',
        minHeight: '100vh',
        bgcolor: theme.palette.background.default,
      }}
    >
      <Paper 
        elevation={0}
        sx={{ 
          width: '100%', 
          maxWidth: 1200, 
          bgcolor: theme.palette.background.paper,
          borderRadius: 2,
          overflow: 'hidden',
        }}
      >
        {/* <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: `1px solid ${theme.palette.divider}` }}>
          <Typography variant={isXs ? "h5" : "h4"} component="h1" sx={{ fontWeight: 'bold', color: theme.palette.text.primary }}>
            Tableau de Bord
          </Typography>
          <Box>
            <IconButton size={isXs ? "medium" : "large"}>
              <NotificationsIcon />
            </IconButton>
            <IconButton size={isXs ? "medium" : "large"}>
              <LogoutIcon />
            </IconButton>
          </Box>
        </Box> */}
        <Box sx={{ p: 2 }}>
          <Grid container spacing={2}>
            {dashboardItems.map((item, index) => (
              <DashboardItem key={index} {...item} />
            ))}
          </Grid>
        </Box>
      </Paper>
    </Box>
  );
}