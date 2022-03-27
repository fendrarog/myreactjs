import { authAPI, securityAPI } from "../api/api";

const SET_USER_DATA = "auth/SetUserData";
const SET_CAPTCHA_URL = "auth/SetCaptchaUrl";

let initialState = {
  userId: null,
  userEmail: null,
  userLogin: null,
  isAuth: false,
  captchaUrl: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_DATA:
    case SET_CAPTCHA_URL:
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

export const setCaptchaUrl = (captchaUrl) => ({
  type: SET_CAPTCHA_URL,
  payload: { captchaUrl },
});

export const getAuthUserData = () => (dispatch) => {
  return authAPI.meAPI().then((response) => {
    if (response.data.resultCode === 0) {
      const { id, login, email } = response.data.data;
      dispatch(setAuthUserData(id, login, email, true));
    }
  });
};

export const login =
  (email, password, rememberMe, captcha) => async (dispatch) => {
    const response = await authAPI.loginAPI(
      email,
      password,
      rememberMe,
      captcha
    );
    if (response.data.resultCode === 0) {
      debugger;
      dispatch(getAuthUserData());
    } else {
      if (response.data.resultCode === 10) {
        debugger;
        dispatch(getCaptchaUrl());
      }
      //Добавить обработку ошибок resultCode === 1
    }
  };

export const logout = () => {
  return (dispatch) => {
    authAPI.logoutAPI().then((response) => {
      if (response.data.resultCode === 0) {
        dispatch(setAuthUserData(null, null, null, false));
      }
    });
  };
};

export const getCaptchaUrl = () => async (dispatch) => {
  const response = await securityAPI.captchaAPI();
  debugger;
  dispatch(setCaptchaUrl(response.data.url));
};

export default authReducer;
