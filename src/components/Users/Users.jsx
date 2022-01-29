import React from "react";
import s from "./Users.module.css";
import userPhoto from "../../assets/images/nophoto.jpg";
import { NavLink } from "react-router-dom";
import { usersAPI } from "../../api/api";

let Users = (props) => {
  let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);
  let pages = [];
  for (let i = 1; i <= pagesCount; i++) {
    pages.push(i);
  }
  return (
    <div>
      {pages.map((p) => {
        return (
          <span
            className={props.currentPage === p && s.selectedPage}
            onClick={() => {
              props.onPageChange(p);
            }}
          >
            {p}
          </span>
        );
      })}
      {props.users.map((user) => (
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
                  disabled={props.followingProgress.some(
                    (id) => id === user.id
                  )}
                  onClick={() => {
                    props.toggleIsFetching(true);
                    props.toggleFollowingProgress(true, user.id);
                    usersAPI.unfollowAPI(user.id).then((response) => {
                      if (response.data.resultCode === 0) {
                        props.toggleIsFetching(false);
                        props.unfollow(user.id);
                      }
                      props.toggleFollowingProgress(false, user.id);
                    });
                  }}
                >
                  Unfollow
                </button>
              ) : (
                <button
                  disabled={props.followingProgress.some(
                    (id) => id === user.id
                  )}
                  onClick={() => {
                    props.toggleIsFetching(true);
                    props.toggleFollowingProgress(true, user.id);
                    usersAPI.followAPI(user.id).then((response) => {
                      if (response.data.resultCode === 0) {
                        props.toggleIsFetching(false);
                        props.follow(user.id);
                      }
                      props.toggleFollowingProgress(false, user.id);
                    });
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
