import { NavLink } from "react-router-dom";
import s from "./Friends.module.css";
import FriendsItem from "./FriendsItem/FriendsItem";

const Friends = (props) => {
  let friendsElements = props.state.friendsData.map((f) => (
    <FriendsItem name={f.name} id={f.id} />
  ));
  return (
    <div className={s.friendsWrapper}>
      <div className={s.friendsMenuBtn}>
        <NavLink to="friends" activeClassName={s.activeLink}>
          Friends
        </NavLink>
      </div>
      <div className={s.friends}>
        {friendsElements}
      </div>
    </div>
  );
};

export default Friends;
