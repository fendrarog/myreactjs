import { authAPI } from "../api/api";

const SET_USER_DATA = "SET_USER_DATA";

let initialState = {
  userId: null,
  userEmail: null,
  userLogin: null,
  isAuth: false,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_DATA:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

export const setAuthUserData = (userId, userLogin, userEmail, isAuth) => ({
  type: SET_USER_DATA,
  payload: { userId, userLogin, userEmail, isAuth },
});

export const getAuthUserData = () => (dispatch) => {
  return authAPI.meAPI().then((response) => {
    console.log(response);
    if (response.data.resultCode === 0) {
      let { id, login, email } = response.data.data;
      dispatch(setAuthUserData(id, login, email, true));
    }
  });
};

export const login = (email, password, rememberMe) => {
  return (dispatch) => {
    authAPI.loginAPI(email, password, rememberMe).then((response) => {
      if (response.data.resultCode === 0) {
        console.log(response);
        dispatch(getAuthUserData());
      }
    });
  };
};

export const logout = () => {
  return (dispatch) => {
    authAPI.logoutAPI().then((response) => {
      console.log(response);
      if (response.data.resultCode === 0) {
        dispatch(setAuthUserData(null, null, null, false));
      }
    });
  };
};

export default authReducer;
