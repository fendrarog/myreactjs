import { UsersType } from "./../types/types";
import { usersAPI } from "../api/users-api";
import { CommonThunkType, InferActionsTypes } from "./redux-store";

let initialState = {
  friends: [] as Array<UsersType>,
  totalFriendsCount: 0,
  isFetching: false,
};

const sidebarReducer = (
  state = initialState,
  action: ActionsTypes
): initialStateType => {
  switch (action.type) {
    case "SET_FRIENDS":
      return { ...state, friends: action.friends };

    case "TOGGLE_IS_FETCHING":
    case "SET_TOTAL_FRIENDS":
      return { ...state, ...action.payload };

    default:
      return state;
  }
};

export const actions = {
  setFriends: (friends: Array<UsersType>) =>
    ({
      type: "SET_FRIENDS",
      friends,
    } as const),
  toggleIsFetching: (isFetching: boolean) =>
    ({
      type: "TOGGLE_IS_FETCHING",
      payload: { isFetching },
    } as const),
  setTotalFriendsCount: (totalCount: number) =>
    ({
      type: "SET_TOTAL_FRIENDS",
      payload: { totalFriendsCount: totalCount },
    } as const),
};

export const getFriends = (): ThunkType => async (dispatch) => {
  dispatch(actions.toggleIsFetching(true));
  const friendsData = await usersAPI.getFriendsAPI();
  dispatch(actions.toggleIsFetching(false));
  dispatch(actions.setFriends(friendsData.items));
  dispatch(actions.setTotalFriendsCount(friendsData.totalCount));
};

export default sidebarReducer;

// -------- TYPES -------- TYPES -------- TYPES -------- TYPES -------- TYPES -------- TYPES -------- TYPES --------

type initialStateType = typeof initialState;
type ActionsTypes = InferActionsTypes<typeof actions>;
type ThunkType = CommonThunkType<ActionsTypes>;
