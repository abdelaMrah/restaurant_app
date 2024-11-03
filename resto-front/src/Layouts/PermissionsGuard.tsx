
import React, { useState, useEffect, useContext, useMemo, useCallback} from 'react';
import { useNavigate } from 'react-router-dom';
import { CircularProgress, Box, } from '@mui/material';
import { appContext } from '../context/appContext';

import { AuthContext } from '../context/authContext';

  
// Simuler une fonction de vérification des permissions
const checkPermission =async  (userPermissions:string[]|undefined,requiredPermissions?:string[],isSessionLoaded?:boolean) :Promise<boolean|null>=> {
    
   if(!isSessionLoaded) return null

     if(!requiredPermissions) return true;
     console.log({
        userPermissions,
        requiredPermissions
     })
    const permited= requiredPermissions?.some(permissions=>
        userPermissions?.toString().toLowerCase().includes(permissions.toLowerCase())
        
    )
    
    return permited
 }   
  

interface PermissionGuardProps {
   children: React.ReactNode;
}

export default  function PermissionGuard({children }: PermissionGuardProps) {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const auth = useContext(AuthContext)

  const {requiredPermissions,}= useContext(appContext)
  const navigate =useNavigate();
//   const roleId = auth.user?.role.id as number
//   if(auth.isSessionLoaded)throw errorHandler(new Error('user not found'))
    const  userPermissions = auth?.userPermissions

const permitted = useMemo(()=>  checkPermission(userPermissions,requiredPermissions,auth.isSessionLoaded),[userPermissions,requiredPermissions,auth.isSessionLoaded])
useEffect(() => {
    const verifyPermission = async () => {
      setHasPermission(await permitted);
    //   const permitter
      console.log({permitted:await permitted})
      if (!permitted&&auth.isSessionLoaded) {
        navigate('/unauthorized');
      }
    };
    verifyPermission();
  }, [userPermissions, requiredPermissions,navigate]);

  if (hasPermission === null) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (hasPermission === false) {
    return null;
  }

  return <>{children}</>;
}




interface PermissionGuardComponentsProps{
    childrens:React.ReactElement
}
export function PermissionGuardComponents({childrens}:PermissionGuardComponentsProps){
    const [hasPermission, setHasPermission] = useState<boolean | null>(null);
    const auth = useContext(AuthContext)
  const {requiredPermissions,}= useContext(appContext)
  const navigate =useNavigate();
  const  userPermissions = auth?.userPermissions
const permitted = useMemo(()=>  checkPermission(userPermissions,requiredPermissions,auth.isSessionLoaded),[userPermissions,requiredPermissions,auth.isSessionLoaded])
useEffect(() => {
    const verifyPermission = async () => {
      setHasPermission(await permitted);
    //   const permitter
      console.log({permitted:await permitted})
      if (!permitted&&auth.isSessionLoaded) {
      }
    };
    verifyPermission();
  }, [userPermissions, requiredPermissions,navigate]);
  
  if(hasPermission){
    return(
        {childrens}
    )
  }

}