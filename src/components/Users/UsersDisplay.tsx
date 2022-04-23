import React from "react";
import s from "./Users.module.css";
import userPhoto from "../../assets/images/nophoto.jpg";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { follow, unfollow } from "../../redux/users-reducer";
import { UsersType } from "../../types/types";

type PropsType = {
  followingProgress: number[];
  users: UsersType[];
};

const UsersDisplay: React.FC<PropsType> = ({
  followingProgress,
  users,
}) => {
  const dispatch = useDispatch();

  return (
    <div>
      {users.map((user) => (
        <div key={user.id} className={s.usersItem}>
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
            <div className={s.usersItemName}>{user.name}</div>
            <div className={s.usersItemStatus}>{user.status}</div>
          </span>
        </div>
      ))}
    </div>
  );
};

export default UsersDisplay;
