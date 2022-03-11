import { createSelector } from "reselect";

const selectUsers = (state) => {
  return state.usersPage.users;
};

export const selectHandleUsers = createSelector(selectUsers, (users) => {
  return users.filter((u) => true);
});

export const selectPortionSize = (state) => {
  return state.usersPage.portionSize;
};

export const selectPageSize = (state) => {
  return state.usersPage.pageSize;
};

export const selectTotalUsersCount = (state) => {
  return state.usersPage.totalUsersCount;
};

export const selectPagesCount = createSelector(
  selectTotalUsersCount,
  selectPageSize,
  (totalUsersCount, pageSize) => {
    return Math.ceil(totalUsersCount / pageSize);
  }
);

export const selectCurrentPage = (state) => {
  return state.usersPage.currentPage;
};

export const selectIsFetching = (state) => {
  return state.usersPage.isFetching;
};

export const selectToggleIsFetching = (state) => {
  return state.usersPage.toggleIsFetching;
};

export const selectFollowingProgress = (state) => {
  return state.usersPage.followingProgress;
};