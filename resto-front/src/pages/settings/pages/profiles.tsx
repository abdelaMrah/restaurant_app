




import React, { useContext, useState } from 'react';
import {
  Box, Typography, Button, TextField, Avatar,
  Grid, Paper, Switch, Snackbar,
  List, ListItem, ListItemIcon, ListItemText, ListItemSecondaryAction,
  IconButton,
  useTheme,
  hexToRgb
} from '@mui/material';
import {
  Person as PersonIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  Notifications as NotificationsIcon,
  Language as LanguageIcon,
  DarkMode as DarkModeIcon,
  Edit as EditIcon,
  Save as SaveIcon,
  Cancel as CancelIcon
} from '@mui/icons-material';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { appContext } from '../../../context/appContext';

import { hexToRgba } from '../../../utils/utils';
import { AuthContext } from '../../../context/authContext';

interface UserProfile {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: string;
  avatar: string;
}

interface UserSettings {
  language: string;
  darkMode: boolean;
  notifications: boolean;
}

const initialProfile: UserProfile = {
  firstName: "Jean",
  lastName: "Dupont",
  email: "jean.dupont@email.com",
  phone: "0123456789",
  role: "Manager",
  avatar: "/placeholder.svg?height=200&width=200",
};

const initialSettings: UserSettings = {
  language: "Français",
  darkMode: false,
  notifications: true,
};

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function UserProfileAndSettings() {
  const theme = useTheme();
  const [profile, setProfile] = useState<UserProfile>(initialProfile);
  const [settings, setSettings] = useState<UserSettings>(initialSettings);
  const [editMode, setEditMode] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' as 'success' | 'error' });
  const { mode, setMode } = useContext(appContext);
  const auth = useContext(AuthContext);
  const handleProfileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleSettingsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked, value } = event.target;
    setSettings({ ...settings, [name]: event.target.type === 'checkbox' ? checked : value });
  };

  const handleSaveProfile = () => {
    setEditMode(false);
    setSnackbar({ open: true, message: 'Profil mis à jour avec succès', severity: 'success' });
  };

  const handleSaveSettings = () => {
    setSnackbar({ open: true, message: 'Paramètres mis à jour avec succès', severity: 'success' });
  };

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Profil Utilisateur et Paramètres
      </Typography>
      
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h5" component="h2">
                Profil
              </Typography>
              <IconButton onClick={() => setEditMode(!editMode)}>
                {editMode ? <CancelIcon /> : <EditIcon />}
              </IconButton>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 3 }}>
              <Avatar
                alt={`${profile.firstName} ${profile.lastName}`}
                src={profile.avatar}
                sx={{ width: 100, height: 100, mb: 2 }}
              />
              <Typography variant="h6">{`${auth?.user?.firstName} ${auth?.user?.lastName}`}</Typography>
              <Typography variant="body2" color="text.secondary">{auth?.user?.role.name.toLowerCase()}</Typography>
            </Box>
            <List>
              <ListItem>
                <ListItemIcon sx={{ color: theme.palette.primary.main }}>
                  <PersonIcon />
                </ListItemIcon>
                <ListItemText 
                  primary={editMode ? (
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <TextField
                        name="firstName"
                        value={auth?.user?.firstName}
                        onChange={handleProfileChange}
                        variant="outlined"
                        size="small"
                      />
                      <TextField
                        name="lastName"
                        value={auth?.user?.lastName}
                        onChange={handleProfileChange}
                        variant="outlined"
                        size="small"
                      />
                    </Box>
                  ) : `${auth?.user?.firstName} ${auth?.user?.lastName}`}
                  secondary="Nom complet"
                />
              </ListItem>
              <ListItem>
                <ListItemIcon sx={{ color: theme.palette.primary.main }}>
                  <EmailIcon />
                </ListItemIcon>
                <ListItemText 
                  primary={editMode ? (
                    <TextField
                      name="email"
                      value={auth?.user?.email}
                      onChange={handleProfileChange}
                      variant="outlined"
                      size="small"
                      fullWidth
                    />
                  ) : auth?.user?.email}
                  secondary="Email"
                />
              </ListItem>
              <ListItem>
                <ListItemIcon sx={{ color: theme.palette.primary.main }}>
                  <PhoneIcon />
                </ListItemIcon>
                <ListItemText 
                  primary={editMode ? (
                    <TextField
                      name="phone"
                      value={auth?.user?.phone}
                      onChange={handleProfileChange}
                      variant="outlined"
                      size="small"
                      fullWidth
                    />
                  ) : auth?.user?.phone}
                  secondary="Téléphone"
                />
              </ListItem>
            </List>
            {editMode && (
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                <Button
                  variant="outlined"
                  startIcon={<SaveIcon />}
                  onClick={handleSaveProfile}
                  sx={{
                    backgroundColor:hexToRgba(theme.palette.primary.light,0.2),
                    borderColor:theme.palette.primary.light,
                    color:mode ==='dark'? '#ffffff':theme.palette.primary.main
                  }}
                  
                >
                  Sauvegarder
                </Button>
              </Box>
            )}
          </Paper>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h5" component="h2" gutterBottom>
              Paramètres
            </Typography>
            <List>
              <ListItem>
                <ListItemIcon sx={{ color: theme.palette.primary.main }}>
                  <LanguageIcon />
                </ListItemIcon>
                <ListItemText primary="Langue" secondary={settings.language} />
                <ListItemSecondaryAction>
                  <TextField
                    select
                    name="language"
                    value={settings.language}
                    onChange={handleSettingsChange}
                    variant="outlined"
                    size="small"
                  >
                    <option value="Français">Français</option>
                    <option value="English">English</option>
                    <option value="Español">Español</option>
                  </TextField>
                </ListItemSecondaryAction>
              </ListItem>
              <ListItem>
                <ListItemIcon sx={{ color: theme.palette.primary.main }}>
                  <DarkModeIcon />
                </ListItemIcon>
                <ListItemText primary="Mode sombre" secondary={`${mode==='dark' ? 'Desactiver':'Activer'} le thème sombre`} />
                <ListItemSecondaryAction>
                  <Switch
                    edge="end"
                    name="darkMode"
                    checked={mode === 'dark'}
                    onChange={() => setMode(mode === 'dark' ? 'light' : 'dark')}
                     
                  />
                  {/* <CustomSwitch 
                  edge="end"
                  name="darkMode"
                  checked={mode === 'dark'}
                  onChange={() => setMode(mode === 'dark' ? 'light' : 'dark')}
                   
                  /> */}
                </ListItemSecondaryAction>
              </ListItem>
              <ListItem>
                <ListItemIcon sx={{ color: theme.palette.primary.main }}>
                  <NotificationsIcon />
                </ListItemIcon>
                <ListItemText primary="Notifications" secondary="Activer les notifications push" />
                <ListItemSecondaryAction>
                  <Switch
                    edge="end"
                    name="notifications"
                    checked={settings.notifications}
                    onChange={handleSettingsChange}
                  />
                </ListItemSecondaryAction>
              </ListItem>
            </List>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
              <Button
                variant="outlined"
                startIcon={<SaveIcon />}
                onClick={handleSaveSettings}
                sx={{
                  backgroundColor:hexToRgba(theme.palette.primary.light,0.2),
                  borderColor:theme.palette.primary.light,
                  color:mode ==='dark'? '#ffffff':theme.palette.primary.main
                }}
              >
                Sauvegarder les paramètres
              </Button>
            </Box>
          </Paper>
        </Grid>
      </Grid>

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