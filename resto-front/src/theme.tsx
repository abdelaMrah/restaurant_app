import {  PaletteMode, ThemeOptions } from "@mui/material";



// import type {} from '`@mui/x-data-grid`/themeAugmentation';

export const themeSettings =(mode:PaletteMode):ThemeOptions=>{
 
 
    return {
        palette:palettes(mode),
        
        typography:{
            fontFamily: 'Roboto,sans-serif',
            h1: {
                fontSize: '2rem',
                '@media (max-width:600px)': {
                    fontSize: '1.875rem',
                },
            },
            h2:{
                fontSize: '1.875rem',
                '@media (max-width:600px)': {
                    fontSize: '1.75rem',
                },
            },
            body1: {
                fontSize: '0.875rem',
                '@media (max-width:600px)': {
                    fontSize: '0.875rem',
                },
            },
            body2:{
                fontSize: '0.7rem',
                '@media (max-width:600px)': {
                    fontSize: '0.75rem',
                },

            },
            button:{
                fontSize:'1rem',
                '@media (max-width:600)':{
                    fontSize:'0.875rem'
                }
            }
        },
        breakpoints: {
            values: {
              xs: 0,  
              sm: 600,
              md: 900,
              lg: 1200,
              xl: 1536, 
            },
          },
     
        spacing:8,
        zIndex:{
            appBar: 1200,
            drawer: 1100,

        },
        mixins:{
            toolbar: {
                minHeight: 56,
                '@media (min-width:600px)': {
                    minHeight: 64, 
                },
            },
        },
        components:{
            // MuiDataGrid:{
            //     styleOverrides:{
            //         root:{
            //             backgroundColor:`#69698712`,
            //              width:'100%',
                        
            //             color: mode === 'light' ? '#000000' : '#ffffff', 
            //             '& .MuiDataGrid-cell': {
            //               padding: '10px', 
            //               borderBottom: '1px solid rgba(224, 224, 224, 0.5)',
                       
            //             },
            //             '& .MuiDataGrid-columnHeaders': {
            //               backgroundColor: mode === 'light' ? '#e0e0e0' : '#333333', 
            //               color: mode === 'light' ? '#000000' : '#ffffff', 
            //               borderBottom: '2px solid rgba(224, 224, 224, 1)',
            //               display:'flex',
            //               textAlign: 'center',
                         
            //             }, 
            //             '& .MuiDataGrid-columnHeaderTitle': {
            //                 display:'flex',
            //                 justifyContent: 'center', 
            //               },
                        
            //             '& .MuiDataGrid-row:hover': {
            //               backgroundColor: mode === 'light' ? '#f1f1f1' : '#444444', 
            //             },
            //             '& .MuiDataGrid-checkboxInput': {
            //             color: palettes(mode).primary.dark, 
            //                 '&.Mui-checked': {
            //                 color:  palettes(mode).primary.main,
            //                 },
            //             },
            //             '& .MuiDataGrid-row.Mui-selected': {
            //                 backgroundColor: `#67678F28 !important`,
            //                 color: palettes(mode).text.primary,

            //                 fontWeight:'bold',
            //             },
            //             '& .MuiDataGrid-row.Mui-selected:hover': {
            //                 backgroundColor: '#67678F4B !important', 
            //             },
            //             '& .MuiDataGrid-cell--image':{
            //                 height: 'auto', 
            //                 padding: '8px',
            //                 '& img': {
            //                     height: '100px',  
                                
            //                     objectFit: 'cover',
            //                     },
            //             }
                         
         
            //           },
                      
                     
            //     },
            
            // },
            MuiButton:{
                styleOverrides: {
                  root: {
                    borderRadius: '30px', // Bouton arrondi
                    padding: '10px 20px', // Padding personnalisé
                    fontWeight: 'bold', // Texte en gras
                    textTransform: 'none', // Empêche la mise en majuscule automatique du texte
                    transition: 'background-color 0.3s ease, transform 0.3s ease',
                    '&:hover': {
                      backgroundColor: '#FFD700', // Utilise la couleur secondaire lors du survol
                      transform: 'scale(1.01)', // Effet d'agrandissement au survol
                    },
                    '&:active': {
                      transform: 'scale(0.99)', // Réduction de l'échelle lors du clic
                    },
                    '&:disabled': {
                      backgroundColor: '#e0e0e0', // Couleur de fond pour un bouton désactivé
                      color: '#9e9e9e', // Couleur du texte pour un bouton désactivé
                    },
                  },
                  contained: {
                    boxShadow: 'none', // Supprime l'ombre par défaut
                    backgroundColor:palettes(mode).primary.light,
                    color:palettes(mode).secondary.main,
                    '&:hover': {
                    //   boxShadow: `0 1px 4px ${palettes(mode).secondary.light}`,
                      backgroundColor:palettes(mode).primary.main,
                      color:palettes(mode).secondary.light,
                    },
                  },
                  outlined: {
                    borderColor: palettes(mode).primary.main ,
                    color:palettes(mode).primary.main,
                    '&:hover': {
                      backgroundColor: `${palettes(mode).grey[200]}`,
                    },
                  },
                },
              },
        }
        
    }
    
}



 const palettes =(mode:PaletteMode)=>{
   if(mode=='light'){
    return {
        primary:{
            main:'#14145a',
            light:'#47478DFF',
            dark:'#0a0a2d',
            contrastText:'#14145a'
        },
        secondary:{
            main:'#FFD700',
            light:'#ffdf33',
            dark:'#ccac00',
            contrastText:'#FFD700'
        },
        background:{
            default:'#EDF1F1FF',
            paper:'#EFEFEFFF'
        },
        text:{
            primary:'#171616FF',
            secondary:'#555555FF',
            disabled:'#9C9A9AFF4'
        },
        grey:{
            50:'#8A5252FF',
            100: "#e7e7e7",
            200: "#cfcfcf",
            300: "#b8b8b8",
            400: "#a0a0a0",
            500: "#888888",
            600: "#6d6d6d",
            700: "#525252",
            800: "#363636",
            900: "#1b1b1b",
            A100:'#E6E5E5FF',
            A200:'#B8AFAFFF',
            A400:'#868282FF',
            A700:'#3B3939FF'
        }
     }
   }else{
    return {
        primary: {
            main: '##E69583FF', 
            light: '#ed6c02', 
            dark: '#8A4C3EFF',
            contrastText: '#DB6708FF',
        },
        secondary: {
            main: '#9FE802FF',
            light: '#A4E024FF',
            dark: '#8AC804FF', 
            contrastText: '#ffffff',
        },
        background: {
            default: '#141414', 
            paper: '#282828', 
        },
        text: {
            primary: '#ffffff',
            secondary: '#C8C4C4FF', 
            disabled: '#7f7f7f',
        }
        ,
        grey:{
            50: '#F0ECECFF',
            100: "#e6e6e6",
            200: "#cccccc",
            300: "#b3b3b3",
            400: "#999999",
            500: "#808080",
            600: "#666666",
            700: "#4d4d4d",
            800: "#333333",
            900: "#1a1a1a",
            A100:'#e6e6e6',
            A200:'#A9A3A3FF',
            A400:'#626060FF',
            A700:'#2B2A2AFF'
        }
   }
   
 }}

