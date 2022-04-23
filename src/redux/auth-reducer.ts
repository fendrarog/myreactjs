import { CommonThunkType, InferActionsTypes } from "./redux-store";
import { authAPI } from "../api/auth-api";
import { securityAPI } from "../api/security-api";
import { ResultCodeCaptcha, ResultCodes } from "../api/api";

let initialState = {
  userId: null as number | null,
  userEmail: null as string | null,
  userLogin: null as string | null,
  isAuth: false,
  captchaUrl: null as string | null,
  rememberMe: false,
};

const authReducer = (
  state = initialState,
  action: ActionsTypes
): initialStateType => {
  switch (action.type) {
    case "SET_USER_DATA":
    case "SET_CAPTCHA_URL":
    case "SET_REMEMBER_ME":
      return {
        ...state,
        ...action.payload,
      };

    default:
      return state;
  }
};

export const actions = {
  setAuthUserData: (
    userId: number | null,
    userLogin: string | null,
    userEmail: string | null,
    isAuth: boolean,
    captcha: string | null
  ) =>
    ({
      type: "SET_USER_DATA",
      payload: { userId, userLogin, userEmail, isAuth, captchaUrl: captcha },
    } as const),
  setCaptchaUrl: (captchaUrl: string) =>
    ({
      type: "SET_CAPTCHA_URL",
      payload: { captchaUrl },
    } as const),
  setRememberMe: (rememberMe: boolean) =>
    ({
      type: "SET_REMEMBER_ME",
      payload: { rememberMe },
    } as const),
};

export const getAuthUserData = (): ThunkType => async (dispatch) => {
  const meData = await authAPI.meAPI();
  if (meData.resultCode === ResultCodes.Success) {
    const { id, login, email } = meData.data;
    dispatch(actions.setAuthUserData(id, login, email, true, null));
  }
};

export const login =
  (
    email: string,
    password: string,
    rememberMe: boolean,
    captcha: string
  ): ThunkType =>
  async (dispatch) => {
    const loginData = await authAPI.loginAPI(
      email,
      password,
      rememberMe,
      captcha
    );
    if (loginData.resultCode === ResultCodes.Success) {
      dispatch(actions.setRememberMe(rememberMe));
      dispatch(getAuthUserData());
    } else {
      if (loginData.resultCode === ResultCodeCaptcha.CaptchaError) {
        dispatch(getCaptchaUrl());
      }
      //Добавить обработку ошибок resultCode === 1
    }
  };

export const logout = (): ThunkType => async (dispatch, getState) => {
  const { rememberMe, userEmail: email } = getState().auth;
  const logoutData = await authAPI.logoutAPI();
  if (logoutData.resultCode === ResultCodes.Success) {
    if (rememberMe) {
      dispatch(actions.setAuthUserData(null, null, email, false, null));
    } else {
      dispatch(actions.setAuthUserData(null, null, null, false, null));
    }
  }
};

export const getCaptchaUrl = (): ThunkType => async (dispatch) => {
  const url = await securityAPI.captchaAPI();
  dispatch(actions.setCaptchaUrl(url));
};

export default authReducer;

// -------- TYPES -------- TYPES -------- TYPES -------- TYPES -------- TYPES -------- TYPES -------- TYPES --------

type initialStateType = typeof initialState;
type ActionsTypes = InferActionsTypes<typeof actions>;
type ThunkType = CommonThunkType<ActionsTypes>;
