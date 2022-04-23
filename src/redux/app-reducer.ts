import { CombinedStateType, InferActionsTypes } from "./redux-store";
import { ThunkAction } from "redux-thunk";
import { getAuthUserData } from "./auth-reducer";

let initialState = {
  init: false,
};
export type initialStateType = typeof initialState;

const appReducer = (
  state = initialState,
  action: ActionsTypes
): initialStateType => {
  switch (action.type) {
    case "INIT_SUCCSESS":
      return {
        ...state,
        init: true,
      };

    default:
      return state;
  }
};

type ActionsTypes = InferActionsTypes<typeof actions>;

export const actions = {
  initSuccsess: () => ({ type: "INIT_SUCCSESS" } as const),
};

type ThunkType = ThunkAction<void, CombinedStateType, unknown, ActionsTypes>;

export const initializeApp = (): ThunkType => (dispatch) => {
  let promise = dispatch(getAuthUserData());
  //let promise = dispatch(somthing);
  //let promise = dispatch(somthing);
  //let promise = dispatch(somthing);
  Promise.all([promise]).then(() => {
    dispatch(actions.initSuccsess());
  });
};

export default appReducer;
