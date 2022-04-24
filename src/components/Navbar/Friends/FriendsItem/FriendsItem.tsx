import React from "react";
import { NavLink } from "react-router-dom";
import s from "./FriendsItem.module.css";
import userPhoto from "../../../../assets/images/nophoto.jpg";
import { PhotosType } from "../../../../types/types";

type PropsType = {
  id: number;
  photos: PhotosType;
  name: string;
  status: string;
};

const FriendsItem: React.FC<PropsType> = ({ id, photos, name, status }) => {
  let path = "/profile/" + id;

  return (
    <div className={s.friendsItem}>
      <span>
        <NavLink to={path} activeClassName={s.activeLink}>
          <img src={photos.small != null ? photos.small : userPhoto} alt="" />
        </NavLink>
      </span>
      <span>
        <div>{name}</div>
        <div>{status}</div>
      </span>
    </div>
  );
};

export default FriendsItem;
