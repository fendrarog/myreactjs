import * as axios from "axios";

const instance = axios.create({
  withCredentials: true,
  baseURL: "https://social-network.samuraijs.com/api/1.0/",
  headers: {
    "API-KEY": "4998665c-dc57-4dbc-927a-73cacf6ed54b",
  },
});

export const usersAPI = {
  getUsersAPI(currentPage = 1, pageSize = 10) {
    return instance
      .get(`users?page=${currentPage}&count=${pageSize}`)
      .then((response) => {
        return response.data;
      });
  },
  followAPI(userId) {
    return instance.post(`follow/${userId}`);
  },
  unfollowAPI(userId) {
    return instance.delete(`follow/${userId}`);
  },
  getUsersProfileAPI(userId) {
    return instance.get(`profile/` + userId);
  },
};

export const authAPI = {
  meAPI() {
    return instance.get(`auth/me`);
  },
    getLoginImgAPI(userId) {
    return instance.get(`profile/${userId}`);
  },
  
}
