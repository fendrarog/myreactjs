import { UsersType } from "../types/types";
import { instance, CommonResponseType } from "./api";
import { profileAPI } from "./profile-api";

type GetUsersResponseType = {
  items: Array<UsersType>;
  totalCount: number;
  error: null | string;
};

export const usersAPI = {
  async getFriendsAPI() {
    const { data } = await instance.get<GetUsersResponseType>(
      `users?count=9&friend=true`
    );
    return data;
  },
  async getUsersAPI(
    currentPage = 1,
    pageSize = 10,
    isFriends: null | boolean = null,
    term = ""
  ) {
    const { data } = await instance.get<GetUsersResponseType>(
      `users?page=${currentPage}&count=${pageSize}&friend=${isFriends}${term}`
    );
    return data;
  },
  async followAPI(userId: number) {
    const { data } = await instance.post<CommonResponseType>(
      `follow/${userId}`
    );
    return data;
  },
  async unfollowAPI(userId: number) {
    const { data } = await instance.delete<CommonResponseType>(
      `follow/${userId}`
    );
    return data;
  },
  async checkFollowAPI(userId: number) {
    const { data } = await instance.get<boolean>(`follow/${userId}`);
    return data;
  },
  getUsersProfileAPI(userId: number) {
    console.warn("Obsolete method. Please use profileAPI object.");
    return profileAPI.getUsersProfileAPI(userId);
  },
};
