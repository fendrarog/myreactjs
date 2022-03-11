import { profileAPI, usersAPI } from "../api/api";

const ADD_POST = "ADD-POST";
const DELETE_POST = "DELETE_POST";
const SET_USER_PROFILE = "SET_USER_PROFILE";
const SET_USER_STATUS = "SET_USER_STATUS";
const SET_USER_PICTURE = "SET_USER_PICTURE";
const TOGGLE_IS_OWNER = "TOGGLE_IS_OWNER";

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
};

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST: {
      return {
        ...state,
        postsData: [
          ...state.postsData,
          { id: 5, message: action.newPost, likesCount: 0 },
        ],
      };
    }
    case DELETE_POST: {
      return {
        ...state,
        postsData: state.postsData.filter((p) => p.id !== action.postId),
      };
    }
    case SET_USER_PROFILE: {
      return { ...state, profile: action.profile };
    }
    case SET_USER_STATUS: {
      return { ...state, status: action.status };
    }
    case SET_USER_PICTURE: {
      return { ...state, profile: {...state.profile, photos: action.photo}};
    }
    case TOGGLE_IS_OWNER: {
      return { ...state, isOwner: action.isOwner };
    }
    default:
      return state;
  }
};

export const toggleIsOwner = (isOwner) => ({ type: TOGGLE_IS_OWNER, isOwner });

export const addPost = (newPost) => ({ type: ADD_POST, newPost });

export const deletePost = (postId) => ({ type: DELETE_POST, postId });

export const setUserProfile = (profile) => ({
  type: SET_USER_PROFILE,
  profile,
});

export const setUserPicture = (photo) => ({
  type: SET_USER_PICTURE,
  photo,
});

export const setUserStatus = (status) => ({ type: SET_USER_STATUS, status });

export const getUserProfile = (userId) => async (dispatch) => {
  let response = await usersAPI.getUsersProfileAPI(userId);
  dispatch(setUserProfile(response.data));
};

export const updateUserPicture = (userPicture) => async (dispatch) => {
  let response = await profileAPI.updateUserPictureAPI(userPicture);
  console.log(response);
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
  let response = await profileAPI.updateUsersStatusAPI(status);
  if (response.data.resultCode === 0) {
    dispatch(setUserStatus(status));
  }
};

export default profileReducer;
