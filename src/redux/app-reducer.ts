import { getAuthUserData } from "./auth-reducer";

const INIT_SUCCSESS = "INIT_SUCCSESS";

type InitialStateType = {
  init: boolean;
};

let initialState: InitialStateType = {
  init: false,
};

const appReducer = (state = initialState, action: any) => {
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

export const initSuccsess = () => ({ type: INIT_SUCCSESS });

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
