import { authAPI } from "../api/api";

const SET_USER_DATA = "SET_USER_DATA";
const SET_LOGIN_IMG = "SET_LOGIN_IMG";

let initialState = {
  userId: null,
  userEmail: null,
  userLogin: null,
  isAuth: false,
  loginImg: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_DATA:
      return {
        ...state,
        ...action.data,
        isAuth: true,
      };
    case SET_LOGIN_IMG:
      return {
        ...state,
        loginImg: action.loginImg,
      };
    default:
      return state;
  }
};

export const setAuthUserData = (userId, userEmail, userLogin) => ({
  type: SET_USER_DATA,
  data: { userId, userEmail, userLogin },
});
export const setLoginImg = (loginImg) => ({
  type: SET_LOGIN_IMG,
  loginImg,
});

export const getAuthField = () => {
  return dispatch => {
    authAPI.meAPI().then((response) => {
      if (response.data.resultCode === 0) {
        let { id, login, email } = response.data.data;
        dispatch(setAuthUserData(id, email, login));
      }
    });
  authAPI.getLoginImgAPI().then((response) => {
      dispatch(setLoginImg(response.data.photos.small));
    });
  }
}

export default authReducer;
