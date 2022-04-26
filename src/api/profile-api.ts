import { PhotosType, ProfileType } from "./../types/types";
import { CommonResponseType, instance } from "./api";

export const profileAPI = {
  async getUsersProfileAPI(userId: number) {
    const { data } = await instance.get<ProfileType>(`profile/` + userId);
    return data;
  },
  async getUsersStatusAPI(userId: number) {
    const { data } = await instance.get<string>(`profile/status/` + userId);
    return data;
  },
  async updateUsersStatusAPI(status: string) {
    const { data } = await instance.put<CommonResponseType>(`profile/status`, {
      status: status,
    });
    return data;
  },
  async updateUserPictureAPI(userPicture: File) {
    const formData = new FormData();
    formData.append("image", userPicture);
    const { data } = await instance.put<
      CommonResponseType<{ photos: PhotosType }>
    >(`profile/photo`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return data;
  },
  async updateOwnersProfileAPI(dataDescription: ProfileType) {
    const { data } = await instance.put<CommonResponseType>(
      `profile`,
      dataDescription
    );
    return data;
  },
};
