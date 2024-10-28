import { RouterProvider } from "react-router-dom"
import { routers } from "./routers"
import { Box, createTheme, ThemeProvider } from "@mui/material"
import { useEffect, useMemo, useState } from "react";
import {themeSettings} from './theme'
import axios from "axios";
 
 const getUsers =async ()=>{
    const res = await axios.get('/api/user')
    return res.data
 }
function App() {
  const [data, setData] = useState<any|undefined>(undefined)
  useEffect(()=>{
    getUsers().then((res)=>setData(res))
    
  },[getUsers])
  useEffect(()=>{
    console.log({data})
  },[data])
// const theme = createTheme();
const theme = useMemo(()=>createTheme(themeSettings('light')) ,[])
  return (
    <Box width={'100%'} height={'100%'}>
        <ThemeProvider theme={theme} >
          <RouterProvider router={routers}/>
        </ThemeProvider>
      
    </Box>
  )
}

export default App
