import { PaletteMode } from "@mui/material";
import Cookie from 'js-cookie'
export type User=
{
    userId:string;
    email:string;
    photoUrl?:string;
}
type Auth = {
    isAuth:boolean;
    user:User;
};
type Type = 'mode'|'auth'|'dialog'|'resize'|'progress';
type Payload = {
    mode?:PaletteMode;
    auth?:Auth;
    dialogIsOpen?:boolean;
    dialogEmissionOpen?:boolean;
    progress?:number|null;
    size?:{
        width:number;
        height:number;
    }
};
export type Action = {
    type:Type;
    payload:Payload;
};
export const initialState :State= {
    mode:(Cookie.get('mode') as PaletteMode|undefined)??'light',
    DialogIsOpen:false,
    dialogEmissionOpen:false,
    progress:null,
    isSessionLoaded:false,
    size:{
        height:window.innerHeight,
        width:window.innerWidth
    }

}
export type State ={
    mode:PaletteMode;
    auth?:Auth,
    isSessionLoaded:boolean;
    progress:number|null
    DialogIsOpen?:boolean;
    dialogEmissionOpen?:boolean;
    size:{width:number,height:number};
}

export const appReducer =(state:State,action:Action):State=>{
    const {type,payload} = action;
    switch(type)
    {
        case 'mode':{
            if(payload?.mode) Cookie.set('mode',payload.mode)
            return {
                ...state,
                mode:payload.mode ?? state.mode
                }
        };
        case 'auth':{
            return {
                ...state,
                isSessionLoaded:true,
                auth:payload.auth
            }
        };
        case 'dialog':{
              return {
                ...state,
                DialogIsOpen:payload.dialogIsOpen??false,
                dialogEmissionOpen:payload.dialogEmissionOpen??false
             }
        };
        case 'resize':{
            return{
                ...state,
                size:payload.size??state.size
            }
        }
        

        default :{
            return state;
        }
    }

}
