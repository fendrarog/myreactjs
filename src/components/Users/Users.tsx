import React, { useEffect, useState } from "react";
import s from "./Users.module.css";
import UsersPaginator from "./UsersPaginator";
import { useDispatch, useSelector } from "react-redux";
import { actions, requestUsers } from "../../redux/users-reducer";
import {
  selectCurrentPage,
  selectFollowingProgress,
  selectHandleUsers,
  selectIsFetching,
  selectIsFriends,
  selectPageSize,
  selectPortionSize,
  selectTerm,
} from "../../redux/users-selectors";
import Preloader from "../Common/Preloader/Preloader";
import { CombinedStateType } from "../../redux/redux-store";
import UsersFriendsToggle from "./UsersFriendsToggle";
import UsersDisplay from "./UsersDisplay";
import UsersTerm from "./UsersTerm";

const Users: React.FC<{}> = () => {
  const currentPage = useSelector((state: CombinedStateType) =>
    selectCurrentPage(state)
  );
  const pageSize = useSelector((state: CombinedStateType) =>
    selectPageSize(state)
  );
  const users = useSelector((state: CombinedStateType) =>
    selectHandleUsers(state)
  );
  const isFetching = useSelector((state: CombinedStateType) =>
    selectIsFetching(state)
  );
  const followingProgress = useSelector((state: CombinedStateType) =>
    selectFollowingProgress(state)
  );
  const isFriends = useSelector((state: CombinedStateType) =>
    selectIsFriends(state)
  );
  const portionSize = useSelector((state: CombinedStateType) =>
    selectPortionSize(state)
  );
  const term = useSelector((state: CombinedStateType) => selectTerm(state));
  const isFriendsFromNavLink = useSelector(
    (state: CombinedStateType) => state.usersPage.isFriendsFromNavLink
  );
  const isAuth = useSelector((state: CombinedStateType) => state.auth.isAuth);

  const dispatch = useDispatch();

  const [termState, setTermState] = useState(term);
  const [isFriendsState, setIsFriendsState] = useState(isFriends);
  const [currentPageState, setCurrentPageState] = useState(currentPage);
  const [portionNumber, setPortionNumber] = useState(
    Math.ceil(currentPage / portionSize)
  );

  const setFrdTgglInit = (isFrd: null | boolean) => {
    setIsFriendsState(isFrd);
    setCurrentPageState(1);
    setPortionNumber(1);
  };

  useEffect(() => {
    if (isFriendsFromNavLink && isAuth) {
      setFrdTgglInit(isFriendsFromNavLink);
      dispatch(actions.setIsFriendsFromNavLink(!isFriendsFromNavLink));
    } else {
      dispatch(
        requestUsers(currentPageState, pageSize, isFriendsState, termState)
      );
    }
    debugger;
  }, [
    dispatch,
    currentPageState,
    pageSize,
    isFriendsState,
    termState,
    isFriendsFromNavLink,
    isAuth,
  ]);

  return (
    <div className={s.usersBlock}>
      <UsersTerm
        setTermState={(t) => {
          setTermState(t);
          setPortionNumber(1);
        }}
      />
      <UsersPaginator
        isFriends={isFriends}
        currentPage={currentPage}
        pageSize={pageSize}
        term={term}
        portionSize={portionSize}
        portionNumber={portionNumber}
        setPortionNumber={(n) => {
          setPortionNumber(n);
        }}
      />
      <UsersFriendsToggle
        isAuth={isAuth}
        isFriends={isFriendsState}
        setFrdTgglInit={setFrdTgglInit}
      />
      {isFetching ? (
        <Preloader />
      ) : (
        <UsersDisplay followingProgress={followingProgress} users={users} />
      )}
    </div>
  );
};

export default Users;
