import { NavLink } from "react-router-dom";
import s from "./FriendsItem.module.css";
import userPhoto from "../../../../assets/images/nophoto.jpg";
const FriendsItem = (props) => {
  let path = "/profile/" + props.id;

  return (
    <div className={s.friendsItem}>
      <span>
        <NavLink to={path} activeClassName={s.activeLink}>
          <img
            src={props.photos.small != null ? props.photos.small : userPhoto}
            alt=""
          />
        </NavLink>
      </span>
      <span>
        <div>{props.name}</div>
        <div>{props.status}</div>
      </span>
    </div>
  );
};

export default FriendsItem;
