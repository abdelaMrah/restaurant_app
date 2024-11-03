import {  colors, PaletteMode, ThemeOptions } from "@mui/material";



 
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
                color:palettes(mode).text.primary,
                '@media (max-width:600px)': {
                    fontSize: '1.75rem',
                },
            },
            h3:{
                fontSize: '1.75rem',
                color:palettes(mode).text.primary,
                '@media (max-width:600px)': {
                    fontSize: '1.5rem',
                },
            },
            h4:{
                fontSize: '1.65rem',
                color:palettes(mode).text.primary,
                '@media (max-width:600px)': {
                    fontSize: '1.4rem',
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
           MuiIcon:{
            defaultProps:{
                color:'primary'
                // root:{
                //     colors:palettes(mode).primary.light
                // }

            }
           },
           MuiListItemIcon:{
            defaultProps:{
                color:palettes(mode).primary.light
            }
           },
            MuiListItem:{
                defaultProps:{
                    color:palettes(mode).primary.light
                }
            },
            MuiButton:{
                styleOverrides: {
                  root: {
                    borderRadius: '30px',
                    padding: '10px 20px',
                    fontWeight: 'bold', 
                    textTransform: 'none',
                    transition: 'background-color 0.3s ease, transform 0.3s ease',
                    '&:hover': {
                    
                      transform: 'scale(1.01)',
                    },
                    '&:active': {
                      transform: 'scale(0.99)',
                    },
                    '&:disabled': {
                      backgroundColor: '#e0e0e0',
                      color: '#9e9e9e', 
                    },
                  },
                  contained: {
                    boxShadow: 'none', 
                    backgroundColor:palettes(mode).primary.light,
                    color:palettes(mode).grey[50],
                    '&:hover': {
                    
                      backgroundColor:palettes(mode).primary.main,
                      color:palettes(mode).grey[50],
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
            MuiIconButton:{
                defaultProps:{
                },
                styleOverrides:{
                    root:{
                    color:palettes(mode).text.primary,
                    },
                },
                
            }
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
            main: '##C327AB', 
            light: '#E147CAFF', 
            dark: '#9A1285FF',
            contrastText: '#C327AB',
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
            50:'#F5F4F4FF',
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
            main: '##C327AB', 
            light: '#E147CAFF', 
            dark: '#9A1285FF',
            contrastText: '#C327AB',
        },
        secondary: {
            main: '#E1E099',
            light: '#EAE9B7FF',
            dark: '#C6C578FF', 
            contrastText: '#E1E099',
        },
        background: {
            default: '#070739', 
            paper: '#030325FF', 
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

