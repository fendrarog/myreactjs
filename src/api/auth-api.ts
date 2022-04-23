import { CommonResponseType } from "./api";
import { instance } from "./api";
import { ResultCodes, ResultCodeCaptcha } from "./api";

type MeResponseDataType = {
  id: number;
  email: string;
  login: string;
};

type LoginResponseDataType = {
  userId: number;
};

export const authAPI = {
  async meAPI() {
    const { data } = await instance.get<CommonResponseType<MeResponseDataType>>(
      `auth/me`
    );
    return data;
  },
  async loginAPI(
    email: string,
    password: string,
    rememberMe = false,
    captcha: null | string = null
  ) {
    const { data } = await instance.post<
      CommonResponseType<LoginResponseDataType, ResultCodes | ResultCodeCaptcha>
    >(`auth/login`, {
      email,
      password,
      rememberMe,
      captcha,
    });
    return data;
  },
  async logoutAPI() {
    const { data } = await instance.delete<CommonResponseType>(`auth/login`);
    return data;
  },
};
