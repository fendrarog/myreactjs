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

let Users = () => {
  const currentPage = useSelector((state) => selectCurrentPage(state));
  const pageSize = useSelector((state) => selectPageSize(state));
  const users = useSelector((state) => selectHandleUsers(state));
  const isFetching = useSelector((state) => selectIsFetching(state));
  const followingProgress = useSelector((state) =>
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

      {users.map((user) => (
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
                  disabled={followingProgress.some((id) => id === user.id)}
                  onClick={() => {
                    dispatch(unfollow(user.id));
                  }}
                >
                  Unfollow
                </button>
              ) : (
                <button
                  disabled={followingProgress.some((id) => id === user.id)}
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
