import { RouterProvider } from "react-router-dom"
import { routers } from "./routers"
import { Box, createTheme, ThemeProvider } from "@mui/material"
import {  useContext, useEffect, useMemo } from "react";
import {themeSettings} from './theme'
import { appContext } from "./context/appContext";
import {  stringToVividColor } from "./utils/utils";

 
 
function App() {
const {mode} = useContext(appContext)
 
 
 const theme = useMemo(()=>createTheme(themeSettings(mode)) ,[mode])

 useEffect(() => {
  document.body.style.backgroundColor = theme.palette.background.default;
}, [mode]);
  return (
    <Box width={'100%'} height={'100%'} >
        <ThemeProvider theme={theme} >
          <RouterProvider router={routers}/>
        </ThemeProvider>
      
    </Box>
  )
}

export default App
