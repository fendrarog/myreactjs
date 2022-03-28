import { getAuthUserData } from "./auth-reducer";

const INIT_SUCCSESS = "app/InitSuccsess";

let initialState: initialStateType = {
  init: false,
};
export type initialStateType = {
  init: boolean;
};

const appReducer = (state = initialState, action: any): initialStateType => {
  switch (action.type) {
    case INIT_SUCCSESS:
      return {
        ...state,
        init: true,
      };
    default:
      return state;
  }
};

type InitSuccsessType = {
  type: typeof INIT_SUCCSESS;
};

export const initSuccsess = (): InitSuccsessType => ({ type: INIT_SUCCSESS });

export const initializeApp = () => (dispatch: any) => {
  let promise = dispatch(getAuthUserData());
  //let promise = dispatch(somthing);
  //let promise = dispatch(somthing);
  //let promise = dispatch(somthing);
  Promise.all([promise]).then(() => {
    dispatch(initSuccsess());
  });
};

export default appReducer;
