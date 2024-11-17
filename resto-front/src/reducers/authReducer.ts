

export type User = {
  firstName:string;
  userName:string,
  lastName:string;
  userId: string;
  email: string;
  phone?:string
  role:Role;
  photoUrl?:string|null;
};
type Auth = {
  isAuth: boolean;
  user?: User;
};
type Role={
  id:number;
  name:string;
}
type Type = "auth"|'loadSession';
type Payload = {
  auth?: Auth;
};
export type Action = {
  type: Type;
  payload?: Payload;
};
export const initialState: State = {
  isSessionLoaded: false,
  auth:undefined
};
export type State = {
  auth?: Auth;
  isSessionLoaded: boolean;
};

export const authReducer = (state: State, action: Action): State => {
  const { type, payload } = action;
  switch (type) {
    case "auth": {
      return {
        ...state,
        isSessionLoaded: true,
        auth: payload?.auth,
      };
    };
    case 'loadSession':{
      return {
        ...state,
        isSessionLoaded:true,
      }
    }

    default: {
      return state;
    }
  }
};
