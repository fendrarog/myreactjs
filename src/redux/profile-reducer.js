import { profileAPI, usersAPI } from "../api/api";

const ADD_POST = "ADD-POST";
const DELETE_POST = "DELETE_POST";
const SET_USER_PROFILE = "SET_USER_PROFILE";
const SET_USER_STATUS = "SET_USER_STATUS";
const SET_USER_PICTURE = "SET_USER_PICTURE";
const SET_OWNERS_PROFILE = "SET_OWNERS_PROFILE";
const SET_LOGIN_PICTURE = "SET_LOGIN_PICTURE";

let initialState = {
  postsData: [
    { id: 1, message: "Hi, how are you?", likesCount: 12 },
    { id: 2, message: "It's my first post", likesCount: 9 },
    { id: 3, message: "GG WP", likesCount: 3 },
    { id: 4, message: "Ez katka", likesCount: 7 },
  ],
  profile: null,
  status: "",
  isOwner: false,
  ownerPhoto: null,
};

const profileReducer = (state = initialState, action) => {
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
      debugger;
      if (action.isOwner) {
        return {
          ...state,
          ...action.payload,
          ownerPhoto: action.profile.photos,
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
        ownerPhoto: action.photo,
        profile: { ...state.profile, photos: action.photo },
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

export const setLoginPicture = (photo) => ({
  type: SET_LOGIN_PICTURE,
  payload: { ownerPhoto: photo },
});

export const addPost = (newPost) => ({ type: ADD_POST, newPost });

export const deletePost = (postId) => ({ type: DELETE_POST, postId });

export const setUserProfile = (profile, isOwnerProfile) => ({
  type: SET_USER_PROFILE,
  payload: { profile, isOwner: isOwnerProfile },
});

export const setUserPicture = (photo) => ({
  type: SET_USER_PICTURE,
  photo,
});

export const setUserStatus = (status) => ({
  type: SET_USER_STATUS,
  payload: { status },
});

export const setOwnersProfile = (payload) => ({
  type: SET_OWNERS_PROFILE,
  payload: payload,
});

export const getUserProfile = (userId) => async (dispatch, getState) => {
  const authorizedUserId = getState().auth.userId;
  const response = await usersAPI.getUsersProfileAPI(userId);
  debugger;
  console.log(response);
  dispatch(setUserProfile(response.data, Number(userId) === authorizedUserId));
  debugger;
};

export const getLoginPicture = (userId) => async (dispatch) => {
  const response = await usersAPI.getUsersProfileAPI(userId);
  dispatch(setLoginPicture(response.data.photos));
};

export const updateUserPicture = (userPicture) => async (dispatch) => {
  const response = await profileAPI.updateUserPictureAPI(userPicture);
  if (response.data.resultCode === 0) {
    dispatch(setUserPicture(response.data.data.photos));
  }
};

export const getUserStatus = (userId) => {
  return (dispatch) => {
    profileAPI.getUsersStatusAPI(userId).then((response) => {
      dispatch(setUserStatus(response.data));
    });
  };
};

export const updateUserStatus = (status) => async (dispatch) => {
  try {
    const response = await profileAPI.updateUsersStatusAPI(status);
    if (response.data.resultCode === 0) {
      dispatch(setUserStatus(status));
    }
  } catch {
    alert("Couldn't update user status");
  }
};

export const updateOwnersProfile = (dataDescription) => async (dispatch) => {
  const response = await profileAPI.updateOwnersProfileAPI(dataDescription);
  console.log(dataDescription);
  if (response.data.resultCode === 0) {
    dispatch(setOwnersProfile(dataDescription));
  } else {
    return Promise.reject(response.data.messages[0]);
  }
};

export default profileReducer;
