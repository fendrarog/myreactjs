import { CommonThunkType, InferActionsTypes } from "./redux-store";
import { PostsType, ProfileType, PhotosType } from "./../types/types";
import { usersAPI } from "../api/users-api";
import { profileAPI } from "../api/profile-api";
import { ResultCodes } from "../api/api";

let initialState = {
  postsData: [
    { id: 1, message: "Hi, how are you?", likesCount: 12 },
    { id: 2, message: "It's my first post", likesCount: 9 },
    { id: 3, message: "GG WP", likesCount: 3 },
    { id: 4, message: "Ez katka", likesCount: 7 },
  ] as Array<PostsType>,
  profile: null as ProfileType | null,
  status: "",
  isOwner: false,
  ownerPhoto: null as PhotosType | null,
};

const profileReducer = (
  state = initialState,
  action: ActionsTypes
): initialStateType => {
  switch (action.type) {
    case "ADD_POST":
      return {
        ...state,
        postsData: [
          ...state.postsData,
          { id: 5, message: action.newPost, likesCount: 0 },
        ],
      };

    case "DELETE_POST":
      return {
        ...state,
        postsData: state.postsData.filter((p) => p.id !== action.postId),
      };

    case "SET_USER_PROFILE":
      if (action.payload.isOwner) {
        return {
          ...state,
          ...action.payload,
          ownerPhoto: action.payload.profile.photos,
        };
      } else {
        return {
          ...state,
          ...action.payload,
        };
      }

    case "SET_USER_PICTURE":
      debugger;
      return {
        ...state,
        ownerPhoto: action.photos,
      };

    case "SET_OWNERS_PROFILE":
      debugger;
      return { ...state, profile: { ...state.profile, ...action.payload } };

    case "SET_LOGIN_PICTURE":
    case "SET_USER_STATUS":
      return { ...state, ...action.payload };

    default:
      return state;
  }
};

export const actions = {
  setLoginPicture: (photo: PhotosType) =>
    ({
      type: "SET_LOGIN_PICTURE",
      payload: { ownerPhoto: photo },
    } as const),
  addPost: (newPost: string) =>
    ({
      type: "ADD_POST",
      newPost,
    } as const),
  deletePost: (postId: number) =>
    ({
      type: "DELETE_POST",
      postId,
    } as const),
  setUserProfile: (profile: ProfileType, isOwnerProfile: boolean) =>
    ({
      type: "SET_USER_PROFILE",
      payload: { profile, isOwner: isOwnerProfile },
    } as const),
  setUserPicture: (photos: PhotosType) =>
    ({
      type: "SET_USER_PICTURE",
      photos,
    } as const),
  setUserStatus: (status: string) =>
    ({
      type: "SET_USER_STATUS",
      payload: { status },
    } as const),
  setOwnersProfile: (payload: ProfileType) =>
    ({
      type: "SET_OWNERS_PROFILE",
      payload,
    } as const),
};

export const getUserProfile =
  (userId: number): ThunkType =>
  async (dispatch, getState) => {
    const authorizedUserId = getState().auth.userId;
    const userProfileData = await usersAPI.getUsersProfileAPI(userId);
    console.log(userProfileData);
    dispatch(
      actions.setUserProfile(userProfileData, userId === authorizedUserId)
    );
  };

export const getLoginPicture =
  (userId: number): ThunkType =>
  async (dispatch) => {
    const userProfileData = await usersAPI.getUsersProfileAPI(userId);
    dispatch(actions.setLoginPicture(userProfileData.photos));
  };

//Типизация файла userPicture ----------------------------

export const updateUserPicture =
  (userPicture: File): ThunkType =>
  async (dispatch) => {
    const dataPhotoSave = await profileAPI.updateUserPictureAPI(userPicture);
    if (dataPhotoSave.resultCode === 0) {
      dispatch(actions.setUserPicture(dataPhotoSave.data.photos));
    }
  };

export const getUserStatus = (userId: number): ThunkType => {
  return async (dispatch) => {
    const userStatusData = await profileAPI.getUsersStatusAPI(userId);
    dispatch(actions.setUserStatus(userStatusData));
  };
};

export const updateUserStatus =
  (status: string): ThunkType =>
  async (dispatch) => {
    try {
      const updateStatusData = await profileAPI.updateUsersStatusAPI(status);
      if (updateStatusData.resultCode === ResultCodes.Success) {
        dispatch(actions.setUserStatus(status));
      }
    } catch (errors) {
      alert("Couldn't update user status");
    }
  };

export const updateOwnersProfile =
  (dataDescription: ProfileType): ThunkType =>
  async (dispatch) => {
    const ownersProfileData = await profileAPI.updateOwnersProfileAPI(
      dataDescription
    );
    debugger;
    console.log(dataDescription);
    if (ownersProfileData.resultCode === ResultCodes.Success) {
      dispatch(actions.setOwnersProfile(dataDescription));
    } else {
      return Promise.reject(ownersProfileData.messages[0]);
    }
  };

export default profileReducer;

// -------- TYPES -------- TYPES -------- TYPES -------- TYPES -------- TYPES -------- TYPES -------- TYPES --------

type initialStateType = typeof initialState;
type ActionsTypes = InferActionsTypes<typeof actions>;
type ThunkType = CommonThunkType<ActionsTypes>;
