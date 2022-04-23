import { CommonThunkType, InferActionsTypes } from "./redux-store";
import { UsersType } from "./../types/types";
import { Dispatch } from "redux";
import { usersAPI } from "../api/users-api";
import { CommonResponseType, ResultCodes } from "../api/api";

let initialState = {
  users: [] as Array<UsersType>,
  pageSize: 8,
  portionSize: 15,
  totalUsersCount: 0,
  currentPage: 1,
  isFriends: null as null | boolean,
  term: "",
  isFriendsFromNavLink: false,
  isFetching: false,
  followingProgress: [] as Array<number>, //array of users id
};

const usersReducer = (
  state = initialState,
  action: ActionsTypes
): initialStateType => {
  switch (action.type) {
    case "FOLLOW":
      return {
        ...state,
        users: state.users.map((user) => {
          if (user.id === action.userId) {
            return { ...user, followed: true };
          }
          return user;
        }),
      };
    case "UNFOLLOW":
      return {
        ...state,
        users: state.users.map((user) => {
          if (user.id === action.userId) {
            return { ...user, followed: false };
          }
          return user;
        }),
      };
    case "SET_USERS": {
      return { ...state, users: action.users };
    }
    case "SET_CURRENT_PAGE": {
      return { ...state, currentPage: action.currentPage };
    }
    case "SET_IS_FRIENDS": {
      return { ...state, ...action.payload };
    }
    case "SET_TERM": {
      if (action.payload.term === "&term=") {
        return { ...state, term: "" };
      }
      return { ...state, ...action.payload };
    }
    case "SET_TOTAL_USERS_COUNT": {
      return { ...state, totalUsersCount: action.totalUsers };
    }
    case "TOGGLE_IS_FETCHING": {
      return { ...state, isFetching: action.isFetching };
    }
    case "SET_IS_FRIENDS_FROM_NAV_LINK": {
      return { ...state, ...action.payload };
    }
    case "TOGGLE_FOLLOWING_PROGRESS": {
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

export const actions = {
  followSuccess: (userId: number) =>
    ({
      type: "FOLLOW",
      userId,
    } as const),
  unfollowSuccess: (userId: number) =>
    ({
      type: "UNFOLLOW",
      userId,
    } as const),
  setUsers: (users: Array<UsersType>) =>
    ({
      type: "SET_USERS",
      users,
    } as const),
  setCurrentPage: (currentPage: number) =>
    ({
      type: "SET_CURRENT_PAGE",
      currentPage,
    } as const),
  setTotalUsersCount: (totalUsers: number) =>
    ({
      type: "SET_TOTAL_USERS_COUNT",
      totalUsers,
    } as const),
  toggleIsFetching: (isFetching: boolean) =>
    ({
      type: "TOGGLE_IS_FETCHING",
      isFetching,
    } as const),
  toggleFollowingProgress: (isFetching: boolean, userId: number) =>
    ({
      type: "TOGGLE_FOLLOWING_PROGRESS",
      isFetching,
      userId,
    } as const),
  setIsFriends: (isFriends: null | boolean) =>
    ({
      type: "SET_IS_FRIENDS",
      payload: { isFriends },
    } as const),
  setTerm: (term: string) =>
    ({
      type: "SET_TERM",
      payload: { term },
    } as const),
  setIsFriendsFromNavLink: (isFriendsFromNavLink: boolean) =>
    ({
      type: "SET_IS_FRIENDS_FROM_NAV_LINK",
      payload: { isFriendsFromNavLink },
    } as const),
};

export const requestUsers = (
  currentPage: number,
  pageSize: number,
  isFriends: null | boolean,
  term = ""
): ThunkType => {
  return async (dispatch, getState) => {
    dispatch(actions.toggleIsFetching(true));
    dispatch(actions.setCurrentPage(currentPage));
    dispatch(actions.setIsFriends(isFriends));
    const data = await usersAPI.getUsersAPI(
      currentPage,
      pageSize,
      isFriends,
      term
    );
    dispatch(actions.toggleIsFetching(false));
    dispatch(actions.setUsers(data.items));
    dispatch(actions.setTotalUsersCount(data.totalCount));
    term !== "" && dispatch(actions.setTerm(term));
  };
};

//Убрать повторение кода follow и unfollow

const _followAndUnfollowFlow = async (
  dispatch: DispatchType,
  userId: number,
  apiMethod: (userId: number) => Promise<CommonResponseType>,
  actionCreator: (userId: number) => ActionsTypes
) => {
  dispatch(actions.toggleFollowingProgress(true, userId));
  const data = await apiMethod(userId);
  if (data.resultCode === ResultCodes.Success) {
    dispatch(actionCreator(userId));
  }
  dispatch(actions.toggleFollowingProgress(false, userId));
};

export const follow =
  (userId: number): ThunkType =>
  async (dispatch) => {
    _followAndUnfollowFlow(
      dispatch,
      userId,
      usersAPI.followAPI,
      actions.followSuccess
    );
  };

export const unfollow =
  (userId: number): ThunkType =>
  async (dispatch) => {
    _followAndUnfollowFlow(
      dispatch,
      userId,
      usersAPI.unfollowAPI,
      actions.unfollowSuccess
    );
  };

export default usersReducer;

// -------- TYPES -------- TYPES -------- TYPES -------- TYPES -------- TYPES -------- TYPES -------- TYPES --------

type initialStateType = typeof initialState;
type ActionsTypes = InferActionsTypes<typeof actions>;
type ThunkType = CommonThunkType<ActionsTypes>;
type DispatchType = Dispatch<ActionsTypes>;
//type GetStateType = () => CombinedStateType;
