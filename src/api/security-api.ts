import { instance } from "./api";

export const securityAPI = {
  async captchaAPI() {
    const {
      data: { url },
    } = await instance.get<{ url: string }>(`security/get-captcha-url`);
    return url;
  },
};
