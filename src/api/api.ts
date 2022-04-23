import axios from "axios";

export const instance = axios.create({
  withCredentials: true,
  baseURL: "https://social-network.samuraijs.com/api/1.0/",
  headers: {
    "API-KEY": "4998665c-dc57-4dbc-927a-73cacf6ed54b",
  },
});

export enum ResultCodes {
  Success = 0,
  Error = 1,
}
export enum ResultCodeCaptcha {
  CaptchaError = 10,
}
export type CommonResponseType<D = {}, RC = ResultCodes> = {
  data: D;
  resultCode: RC;
  messages: Array<string>;
};
