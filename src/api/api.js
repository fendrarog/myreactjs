import * as axios from "axios";

const instance = axios.create({
  withCredentials: true,
  baseURL: "https://social-network.samuraijs.com/api/1.0/",
  headers: {
    "API-KEY": "c40363ed-83b1-48dc-8359-47c5b5c20638",
  },
});

export const usersAPI = {
  getUsers(currentPage = 1, pageSize = 10) {
    return instance
      .get(`users?page=${currentPage}&count=${pageSize}`)
      .then((response) => {
        return response.data;
      });
  },
  followAPI(u) {
    return instance.post(`follow/${u}`);
  },
  unfollowAPI(u) {
    return instance.delete(`follow/${u}`);
  },
  getAuthUserData() {
    return instance.get(`auth/me`);
  },
};
