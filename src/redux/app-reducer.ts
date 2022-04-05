import { CombinedStateType } from "./redux-store";
import { ThunkAction } from "redux-thunk";
import { getAuthUserData } from "./auth-reducer";

const INIT_SUCCSESS = "app/InitSuccsess";

let initialState: initialStateType = {
  init: false,
};
export type initialStateType = {
  init: boolean;
};

const appReducer = (
  state = initialState,
  action: ActionsTypes
): initialStateType => {
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

type ActionsTypes = InitSuccsessType;

type InitSuccsessType = {
  type: typeof INIT_SUCCSESS;
};

export const initSuccsess = (): InitSuccsessType => ({ type: INIT_SUCCSESS });

type ThunkType = ThunkAction<void, CombinedStateType, unknown, ActionsTypes>;

export const initializeApp = (): ThunkType => (dispatch) => {
  let promise = dispatch(getAuthUserData());
  //let promise = dispatch(somthing);
  //let promise = dispatch(somthing);
  //let promise = dispatch(somthing);
  Promise.all([promise]).then(() => {
    dispatch(initSuccsess());
  });
};

export default appReducer;
