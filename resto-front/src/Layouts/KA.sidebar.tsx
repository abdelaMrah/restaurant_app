import { useState } from 'react';
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
  Inbox as InboxIcon,
  Assessment as AssessmentIcon,
  People as PeopleIcon,
  Settings as SettingsIcon,
  Search as SearchIcon,
  Restaurant as RestaurantIcon,
} from '@mui/icons-material';

const drawerWidth = 280;

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

export default function Sidebar({ open, onClose }: SidebarProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [channelsOpen, setChannelsOpen] = useState(true);
  const [groupsOpen, setGroupsOpen] = useState(false);

  const handleChannelsClick = () => {
    setChannelsOpen(!channelsOpen);
  };

  const handleGroupsClick = () => {
    setGroupsOpen(!groupsOpen);
  };

  const sidebarContent = (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <Box sx={{ p: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography variant="h6" noWrap component="div" sx={{ fontWeight: 'bold' }}>
          Restaurant App
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
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <RestaurantIcon />
            </ListItemIcon>
            <ListItemText primary="Menu" />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary="Commandes" />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton onClick={handleChannelsClick}>
            <ListItemIcon>
              <AssessmentIcon />
            </ListItemIcon>
            <ListItemText primary="Reports" />
            {channelsOpen ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
        </ListItem>
        <Collapse in={channelsOpen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemText primary="Sales Report" />
            </ListItemButton>
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemText primary="Inventory Report" />
            </ListItemButton>
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemText primary="Inventory Report 2" />
            </ListItemButton>
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemText primary="Inventory Report 3" />
            </ListItemButton>
          </List>
        </Collapse>

        <ListItem disablePadding>
          <ListItemButton onClick={handleGroupsClick}>
            <ListItemIcon>
              <PeopleIcon />
            </ListItemIcon>
            <ListItemText primary="Staff" />
            {groupsOpen ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
        </ListItem>
        <Collapse in={groupsOpen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemText primary="Waiters" />
            </ListItemButton>
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemText primary="Chefs" />
            </ListItemButton>
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemText primary="Managers" />
            </ListItemButton>
          </List>
        </Collapse>

        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <SettingsIcon />
            </ListItemIcon>
            <ListItemText primary="Settings" />
          </ListItemButton>
        </ListItem>
      </List>

      <Box sx={{ p: 2, borderTop: 1, borderColor: 'divider' }}>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <Avatar alt="User Name" src="/placeholder.svg?height=40&width=40" />
            </ListItemIcon>
            <ListItemText primary="John Doe" secondary="john@example.com" />
          </ListItemButton>
        </ListItem>
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
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {sidebarContent}
        </Drawer>
      ) : (
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {sidebarContent}
        </Drawer>
      )}
    </Box>
  );
}