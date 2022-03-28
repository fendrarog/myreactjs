import { authAPI, securityAPI } from "../api/api";

const SET_USER_DATA = "auth/SetUserData";
const SET_CAPTCHA_URL = "auth/SetCaptchaUrl";

/* type initialStateType = {
  userId: number | null;
  userEmail: string | null;
  userLogin: string | null;
  isAuth: boolean;
  captchaUrl: string | null;
}; */

let initialState = {
  userId: null as number | null,
  userEmail: null as string | null,
  userLogin: null as string | null,
  isAuth: false,
  captchaUrl: null as string | null,
};
export type initialStateType = typeof initialState;

const authReducer = (state = initialState, action: any): initialStateType => {
  switch (action.type) {
    case SET_USER_DATA:
    case SET_CAPTCHA_URL:
      return {
        dich: "fdadasgfff",
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

type SetAuthUserDataPayloadType = {
  userId: number | null;
  userLogin: string | null;
  userEmail: string | null;
  isAuth: boolean;
};

type SetAuthUserDataType = {
  type: typeof SET_USER_DATA;
  payload: SetAuthUserDataPayloadType;
};

export const setAuthUserData = (
  userId: number | null,
  userLogin: string | null,
  userEmail: string | null,
  isAuth: boolean
): SetAuthUserDataType => ({
  type: SET_USER_DATA,
  payload: { userId, userLogin, userEmail, isAuth },
});

type SetCaptchaUrlType = {
  type: typeof SET_CAPTCHA_URL;
  payload: { captchaUrl: string };
};

export const setCaptchaUrl = (captchaUrl: string): SetCaptchaUrlType => ({
  type: SET_CAPTCHA_URL,
  payload: { captchaUrl },
});

export const getAuthUserData = () => (dispatch: any) => {
  return authAPI.meAPI().then((response: any) => {
    if (response.data.resultCode === 0) {
      const { id, login, email } = response.data.data;
      dispatch(setAuthUserData(id, login, email, true));
    }
  });
};

export const login =
  (email: string, password: string, rememberMe: boolean, captcha: string) =>
  async (dispatch: any) => {
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

export const logout = () => async (dispatch: any) => {
  const response = await authAPI.logoutAPI();
  if (response.data.resultCode === 0) {
    dispatch(setAuthUserData(null, null, null, false));
  }
};

export const getCaptchaUrl = () => async (dispatch: any) => {
  const response = await securityAPI.captchaAPI();
  dispatch(setCaptchaUrl(response.data.url));
};

export default authReducer;
