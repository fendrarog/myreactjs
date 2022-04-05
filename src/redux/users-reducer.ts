import { CombinedStateType } from "./redux-store";
import { UsersType } from "./../types/types";
import { usersAPI } from "../api/api";
import { ThunkAction } from "redux-thunk";
import { Dispatch } from "redux";

const FOLLOW = "usersPage/Follow";
const UNFOLLOW = "usersPage/Unfollow";
const SET_USERS = "usersPage/SetUsers";
const SET_CURRENT_PAGE = "usersPage/SetCurrentPage";
const SET_TOTAL_USERS_COUNT = "usersPage/SetTotalUsersCount";
const TOGGLE_IS_FETCHING = "usersPage/ToggleIsFetching";
const TOGGLE_FOLLOWING_PROGRESS = "usersPage/ToggleFollowingProgress";

let initialState = {
  users: [] as Array<UsersType>,
  pageSize: 8,
  portionSize: 15,
  totalUsersCount: 0,
  currentPage: 1,
  isFetching: false,
  followingProgress: [] as Array<number>, //array of users id
};
export type initialStateType = typeof initialState;

const usersReducer = (
  state = initialState,
  action: ActionsTypes
): initialStateType => {
  switch (action.type) {
    case FOLLOW:
      return {
        ...state,
        users: state.users.map((user) => {
          if (user.id === action.userId) {
            return { ...user, followed: true };
          }
          return user;
        }),
      };
    case UNFOLLOW:
      return {
        ...state,
        users: state.users.map((user) => {
          if (user.id === action.userId) {
            return { ...user, followed: false };
          }
          return user;
        }),
      };
    case SET_USERS: {
      return { ...state, users: action.users };
    }
    case SET_CURRENT_PAGE: {
      return { ...state, currentPage: action.currentPage };
    }
    case SET_TOTAL_USERS_COUNT: {
      return { ...state, totalUsersCount: action.totalUsers };
    }
    case TOGGLE_IS_FETCHING: {
      return { ...state, isFetching: action.isFetching };
    }
    case TOGGLE_FOLLOWING_PROGRESS: {
      return {
        ...state,
        followingProgress: action.isFetching
          ? [...state.followingProgress, action.userId]
          : [...state.followingProgress.filter((id) => id !== action.userId)],
      };
    }
    default:
      return state;
  }
};

type ActionsTypes =
  | FollowSuccessType
  | UnfollowSuccessType
  | SetUsersType
  | SetCurrentPageType
  | SetTotalUsersCountType
  | ToggleIsFetchingType
  | ToggleFollowingProgressType;

type FollowSuccessType = {
  type: typeof FOLLOW;
  userId: number;
};
export const followSuccess = (userId: number): FollowSuccessType => ({
  type: FOLLOW,
  userId,
});

type UnfollowSuccessType = {
  type: typeof UNFOLLOW;
  userId: number;
};
export const unfollowSuccess = (userId: number): UnfollowSuccessType => ({
  type: UNFOLLOW,
  userId,
});

type SetUsersType = {
  type: typeof SET_USERS;
  users: Array<UsersType>;
};
export const setUsers = (users: Array<UsersType>): SetUsersType => ({
  type: SET_USERS,
  users,
});

type SetCurrentPageType = {
  type: typeof SET_CURRENT_PAGE;
  currentPage: number;
};
export const setCurrentPage = (currentPage: number): SetCurrentPageType => ({
  type: SET_CURRENT_PAGE,
  currentPage,
});

type SetTotalUsersCountType = {
  type: typeof SET_TOTAL_USERS_COUNT;
  totalUsers: number;
};
export const setTotalUsersCount = (
  totalUsers: number
): SetTotalUsersCountType => ({
  type: SET_TOTAL_USERS_COUNT,
  totalUsers,
});

type ToggleIsFetchingType = {
  type: typeof TOGGLE_IS_FETCHING;
  isFetching: boolean;
};
export const toggleIsFetching = (
  isFetching: boolean
): ToggleIsFetchingType => ({
  type: TOGGLE_IS_FETCHING,
  isFetching,
});

type ToggleFollowingProgressType = {
  type: typeof TOGGLE_FOLLOWING_PROGRESS;
  isFetching: boolean;
  userId: number;
};
export const toggleFollowingProgress = (
  isFetching: boolean,
  userId: number
): ToggleFollowingProgressType => ({
  type: TOGGLE_FOLLOWING_PROGRESS,
  isFetching,
  userId,
});

//type GetStateType = () => CombinedStateType;
type DispatchType = Dispatch<ActionsTypes>;
type ThunkType = ThunkAction<
  Promise<void>,
  CombinedStateType,
  unknown,
  ActionsTypes
>;

export const requestUsers = (
  currentPage: number,
  pageSize: number
): ThunkType => {
  return async (dispatch, getState) => {
    dispatch(toggleIsFetching(true));
    dispatch(setCurrentPage(currentPage));
    const data = await usersAPI.getUsersAPI(currentPage, pageSize);
    dispatch(toggleIsFetching(false));
    dispatch(setUsers(data.items));
    dispatch(setTotalUsersCount(data.totalCount));
  };
};

//Убрать повторение кода follow и unfollow

const _followAndUnfollowFlow = async (
  dispatch: DispatchType,
  userId: number,
  apiMethod: any,
  actionCreator: (userId: number) => FollowSuccessType | UnfollowSuccessType
) => {
  dispatch(toggleFollowingProgress(true, userId));
  const response = await apiMethod(userId);
  if (response.data.resultCode === 0) {
    dispatch(actionCreator(userId));
  }
  dispatch(toggleFollowingProgress(false, userId));
};

export const follow =
  (userId: number): ThunkType =>
  async (dispatch) => {
    _followAndUnfollowFlow(dispatch, userId, usersAPI.followAPI, followSuccess);
  };

export const unfollow =
  (userId: number): ThunkType =>
  async (dispatch) => {
    _followAndUnfollowFlow(
      dispatch,
      userId,
      usersAPI.unfollowAPI,
      unfollowSuccess
    );
  };

export default usersReducer;
