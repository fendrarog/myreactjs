import { CombinedStateType } from "./redux-store";
import { ThunkAction } from "redux-thunk";
import {
  PostsType,
  ProfileType,
  PhotosType,
  ContactsType,
} from "./../types/types";
import { profileAPI, usersAPI } from "../api/api";

const ADD_POST = "profilePage/AddPost";
const DELETE_POST = "profilePage/DeletePost";
const SET_USER_PROFILE = "profilePage/SetUserProfile";
const SET_USER_STATUS = "profilePage/SetUserStatus";
const SET_USER_PICTURE = "profilePage/SetUserPicture";
const SET_OWNERS_PROFILE = "profilePage/SetOwnersProfile";
const SET_LOGIN_PICTURE = "profilePage/SetLoginPicture";

let initialState = {
  postsData: [
    { id: 1, message: "Hi, how are you?", likesCount: 12 },
    { id: 2, message: "It's my first post", likesCount: 9 },
    { id: 3, message: "GG WP", likesCount: 3 },
    { id: 4, message: "Ez katka", likesCount: 7 },
  ] as Array<PostsType>,
  profile: null as ProfileType | null,
  status: "" as string,
  isOwner: false as boolean,
  ownerPhoto: null as PhotosType | null,
};
export type initialStateType = typeof initialState;

const profileReducer = (
  state = initialState,
  action: ActionsTypes
): initialStateType => {
  switch (action.type) {
    case ADD_POST:
      return {
        ...state,
        postsData: [
          ...state.postsData,
          { id: 5, message: action.newPost, likesCount: 0 },
        ],
      };

    case DELETE_POST:
      return {
        ...state,
        postsData: state.postsData.filter((p) => p.id !== action.postId),
      };

    case SET_USER_PROFILE:
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

    case SET_USER_PICTURE:
      debugger;
      return {
        ...state,
        ownerPhoto: action.photos,
        profile: { ...state.profile, photos: action.photos },
      };

    case SET_OWNERS_PROFILE:
      debugger;
      return { ...state, profile: { ...state.profile, ...action.payload } };

    case SET_LOGIN_PICTURE:
    case SET_USER_STATUS:
      return { ...state, ...action.payload };

    default:
      return state;
  }
};

type ActionsTypes =
  | SetLoginPictureType
  | AddPostType
  | DeletePostType
  | SetUserProfileType
  | SetUserPictureType
  | SetUserStatusType
  | SetOwnersProfileType;

type SetLoginPictureType = {
  type: typeof SET_LOGIN_PICTURE;
  payload: { ownerPhoto: PhotosType };
};
export const setLoginPicture = (photo: PhotosType): SetLoginPictureType => ({
  type: SET_LOGIN_PICTURE,
  payload: { ownerPhoto: photo },
});

type AddPostType = {
  type: typeof ADD_POST;
  newPost: string;
};
export const addPost = (newPost: string): AddPostType => ({
  type: ADD_POST,
  newPost,
});

type DeletePostType = {
  type: typeof DELETE_POST;
  postId: number;
};
export const deletePost = (postId: number): DeletePostType => ({
  type: DELETE_POST,
  postId,
});

type SetUserProfilePayloadType = {
  profile: ProfileType;
  isOwner: boolean;
};
type SetUserProfileType = {
  type: typeof SET_USER_PROFILE;
  payload: SetUserProfilePayloadType;
};
export const setUserProfile = (
  profile: ProfileType,
  isOwnerProfile: boolean
): SetUserProfileType => ({
  type: SET_USER_PROFILE,
  payload: { profile, isOwner: isOwnerProfile },
});

type SetUserPictureType = {
  type: typeof SET_USER_PICTURE;
  photos: PhotosType;
};
export const setUserPicture = (photos: PhotosType): SetUserPictureType => ({
  type: SET_USER_PICTURE,
  photos,
});

type SetUserStatusType = {
  type: typeof SET_USER_STATUS;
  payload: { status: string };
};
export const setUserStatus = (status: string): SetUserStatusType => ({
  type: SET_USER_STATUS,
  payload: { status },
});

type SetOwnersProfilePayloadType = {
  userId: number;
  lookingForAJob: boolean;
  lookingForAJobDescription: string;
  fullName: string;
  contacts: ContactsType;
};
type SetOwnersProfileType = {
  type: typeof SET_OWNERS_PROFILE;
  payload: SetOwnersProfilePayloadType;
};
export const setOwnersProfile = (
  payload: SetOwnersProfilePayloadType
): SetOwnersProfileType => ({
  type: SET_OWNERS_PROFILE,
  payload,
});

type ThunkType = ThunkAction<
  Promise<void>,
  CombinedStateType,
  unknown,
  ActionsTypes
>;

export const getUserProfile =
  (userId: number): ThunkType =>
  async (dispatch, getState) => {
    const authorizedUserId = getState().auth.userId;
    const response = await usersAPI.getUsersProfileAPI(userId);
    console.log(response);
    dispatch(setUserProfile(response.data, userId === authorizedUserId));
  };

export const getLoginPicture =
  (userId: number): ThunkType =>
  async (dispatch) => {
    const response = await usersAPI.getUsersProfileAPI(userId);
    dispatch(setLoginPicture(response.data.photos));
  };

//Типизация файла userPicture ----------------------------

export const updateUserPicture =
  (userPicture: any): ThunkType =>
  async (dispatch) => {
    const response = await profileAPI.updateUserPictureAPI(userPicture);
    if (response.data.resultCode === 0) {
      dispatch(setUserPicture(response.data.data.photos));
    }
  };

export const getUserStatus = (userId: number): ThunkType => {
  return async (dispatch) => {
    const response = await profileAPI.getUsersStatusAPI(userId);
    dispatch(setUserStatus(response.data));
  };
};

export const updateUserStatus =
  (status: string): ThunkType =>
  async (dispatch) => {
    try {
      const response = await profileAPI.updateUsersStatusAPI(status);
      if (response.data.resultCode === 0) {
        dispatch(setUserStatus(status));
      }
    } catch {
      alert("Couldn't update user status");
    }
  };

export const updateOwnersProfile =
  (dataDescription: SetOwnersProfilePayloadType): ThunkType =>
  async (dispatch) => {
    const response = await profileAPI.updateOwnersProfileAPI(dataDescription);
    console.log(dataDescription);
    if (response.data.resultCode === 0) {
      dispatch(setOwnersProfile(dataDescription));
    } else {
      return Promise.reject(response.data.messages[0]);
    }
  };

export default profileReducer;
