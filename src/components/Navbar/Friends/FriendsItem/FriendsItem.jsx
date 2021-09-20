import { NavLink } from "react-router-dom";
import s from "./FriendsItem.module.css";

const FriendsItem = (props) => {
  let path = "/friends/" + props.id;
  return (
        <div className={s.friendsItem}>
          <img
            src="https://cs11.pikabu.ru/post_img/big/2020/04/12/9/1586704514168132921.png"
            alt=""
          />
          <NavLink to={path} activeClassName={s.activeLink}>
            {props.name}
          </NavLink>
        </div>
  );
};

export default FriendsItem;
