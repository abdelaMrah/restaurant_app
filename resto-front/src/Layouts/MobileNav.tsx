import * as React from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import FolderIcon from '@mui/icons-material/Folder';
import { Outlet, useNavigate } from 'react-router-dom';

export default function ({menuItems}:{menuItems:{text:string;icon:any;path:string}[]}) {
  const [value, setValue] = React.useState('recents');
const navigate = useNavigate();
  const handleChange = (_event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <>
    <Outlet/>
    <BottomNavigation sx={{ width: 500 ,position:'fixed',left:0,bottom:0}} value={value} onChange={handleChange}>
       
       
        {
            menuItems.map((item)=>(
                <BottomNavigationAction
                label={item.text}
                value="recents"
                onClick={()=>navigate(item.path)}
                icon={item.icon}
             />
            ))
        }
     
      <BottomNavigationAction label="Folder" value="folder" icon={<FolderIcon />} />
    </BottomNavigation></>
  );
}
