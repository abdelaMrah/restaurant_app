import { styled } from '@mui/material/styles';
import Switch from '@mui/material/Switch';

export const CustomSwitch = styled(Switch)(({ theme }) => ({
  width: 60,
  height: 34,
  padding: 7,
  '& .MuiSwitch-switchBase': {
    padding: 7,
    transitionDuration: '500ms',
    '&.Mui-checked': {
      transform: 'translateX(26px)',
      color: '#ffffff',
      '&  .MuiSwitch-track': {
        backgroundColor: theme.palette.mode === 'dark' ? '#007BFF' : '#4CAF50',
        opacity: 1,
      },
      '&:hover': {
        backgroundColor: 'rgba(76, 175, 80, 0.15)', // couleur de survol en état activé
      },
    },
    '&:hover': {
      backgroundColor: 'rgba(0, 0, 0, 0.08)', // couleur de survol en état désactivé
    },
  },
  '& .MuiSwitch-thumb': {
    backgroundColor: theme.palette.mode === 'dark' ? '#ffffff' : '#007BFF',
    width: 26,
    height: 26,
    boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.4)', // ombre pour le bouton
  },
  '& .MuiSwitch-track': {
    borderRadius: 34 / 2,
    backgroundColor: theme.palette.mode === 'dark' ? '#535353' : '#413DAEFF',
    // opacity: 1,
    transition: theme.transitions.create(['background-color'], {
      duration: 500,
    }),
  },
}));

 