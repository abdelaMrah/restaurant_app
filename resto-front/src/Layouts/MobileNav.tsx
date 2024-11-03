import * as React from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import FolderIcon from '@mui/icons-material/Folder';
import { Outlet, useNavigate } from 'react-router-dom';
import { Box } from '@mui/material';
import { useEffect } from 'react';
export interface MenuItem{
  text:string;
  icon?:any;
  path:string;
  isForMobile?:boolean;
  subItems?:MenuItem[]
}
export interface ButtomNavigationProps{
  width?:string|number;
  menuItems:MenuItem[];
}
function getMenuItems(menuItems:MenuItem[]):MenuItem[]{
    const items = menuItems.reduce((acc:MenuItem[],cur:MenuItem)=>{
       if(cur.isForMobile &&cur?.subItems){
          cur.subItems.forEach((item)=>{
            acc.push(item)
          });
          delete cur.subItems;
          acc.push(cur)
       }
      return acc;
    }
    
    ,[])
     
    return items
    
}
export default function ({menuItems}:{menuItems:MenuItem[]}) {
  console.log({menuItems})
const [value, setValue] = React.useState('recents');
const navigate = useNavigate();
  const handleChange = (_event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  const menu = getMenuItems(menuItems);
  console.log({menu})
   return (
    <Box
    sx={{
      width:'100vw'
    }}
    >
    <Outlet/>
    <BottomNavigation sx={{ width:' 400px' ,position:'fixed',left:0,bottom:0}} value={value} onChange={handleChange}>
        {
            menu.map((item:MenuItem)=>{
              console.log({item})
              if(item?.isForMobile&& item.icon){
                 return (
                  <BottomNavigationAction
                  key={item?.text}
                  label={item.text}
                  value="recents"
                  onClick={()=>navigate(item.path)}
                  icon={item?.icon}
                  />
                )
              }
             
            }
          )
        }
     
          
    </BottomNavigation>
    </Box>
  );
}

// export const ButtomNavigation =({menuItems,width='100%'}:ButtomNavigationProps)=>{
//   const [value, setValue] = React.useState('recents');
//   const navigate = useNavigate();
//   const handleChange = (_event: React.SyntheticEvent, newValue: string) => {
//     setValue(newValue);
//   };
 
//    return(
//     <BottomNavigation sx={{ width ,position:'fixed',left:0,bottom:0,marginTop:5}} value={value} onChange={handleChange} >
//     {
//         menuItems.map((item)=>(
//             <BottomNavigationAction
//             label={item.text}
//             value="recents"
//             onClick={()=>navigate(item.path)}
//             icon={item.icon}
//          />
//         ))
//     }
 
//  </BottomNavigation>
//   )
// }