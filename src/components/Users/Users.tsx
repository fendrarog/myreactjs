import React, { useEffect } from "react";
import s from "./Users.module.css";
import userPhoto from "../../assets/images/nophoto.jpg";
import { NavLink } from "react-router-dom";
import UsersPaginator from "./UsersPaginator";
import { useDispatch, useSelector } from "react-redux";
import { follow, requestUsers, unfollow } from "../../redux/users-reducer";
import {
  selectCurrentPage,
  selectFollowingProgress,
  selectHandleUsers,
  selectIsFetching,
  selectPageSize,
} from "../../redux/users-selectors";
import Preloader from "../Common/Preloader/Preloader";
import { UsersType } from "../../types/types";
import { CombinedStateType } from "../../redux/redux-store";

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
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(requestUsers(currentPage, pageSize));
  }, [dispatch, currentPage, pageSize]);

  if (isFetching) {
    return <Preloader />;
  }
  return (
    <div>
      <UsersPaginator currentPage={currentPage} pageSize={pageSize} />

      {users.map((user: UsersType) => (
        <div key={user.id}>
          <span>
            <div>
              <NavLink to={"/profile/" + user.id}>
                <img
                  src={
                    user.photos.small != null ? user.photos.small : userPhoto
                  }
                  alt="#"
                  className={s.userPhoto}
                />
              </NavLink>
            </div>
            <div>
              {user.followed ? (
                <button
                  disabled={followingProgress.some(
                    (id: number) => id === user.id
                  )}
                  onClick={() => {
                    dispatch(unfollow(user.id));
                  }}
                >
                  Unfollow
                </button>
              ) : (
                <button
                  disabled={followingProgress.some(
                    (id: number) => id === user.id
                  )}
                  onClick={() => {
                    dispatch(follow(user.id));
                  }}
                >
                  Follow
                </button>
              )}
            </div>
          </span>
          <span>
            <span>
              <div>{user.name}</div>
              <div>{user.status}</div>
            </span>
            <span>
              <div>{"user.location.cityName"}</div>
              <div>{"user.location.countryName"}</div>
            </span>
          </span>
        </div>
      ))}
    </div>
  );
};

export default Users;
