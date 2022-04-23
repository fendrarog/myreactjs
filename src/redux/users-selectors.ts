import { CombinedStateType } from "./redux-store";
import { createSelector } from "reselect";

const selectUsers = (state: CombinedStateType) => {
  return state.usersPage.users;
};

export const selectHandleUsers = createSelector(selectUsers, (users) => {
  return users.filter((u) => true);
});

export const selectPortionSize = (state: CombinedStateType) => {
  return state.usersPage.portionSize;
};

export const selectPageSize = (state: CombinedStateType) => {
  return state.usersPage.pageSize;
};

export const selectTotalUsersCount = (state: CombinedStateType) => {
  return state.usersPage.totalUsersCount;
};

export const selectPagesCount = createSelector(
  selectTotalUsersCount,
  selectPageSize,
  (totalUsersCount, pageSize) => {
    return Math.ceil(totalUsersCount / pageSize);
  }
);

export const selectCurrentPage = (state: CombinedStateType) => {
  return state.usersPage.currentPage;
};

export const selectIsFriends = (state: CombinedStateType) => {
  return state.usersPage.isFriends;
};

export const selectTerm = (state: CombinedStateType) => {
  return state.usersPage.term;
};

export const selectIsFetching = (state: CombinedStateType) => {
  return state.usersPage.isFetching;
};

export const selectFollowingProgress = (state: CombinedStateType) => {
  return state.usersPage.followingProgress;
};
