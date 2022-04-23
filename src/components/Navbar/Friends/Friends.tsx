import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { CombinedStateType } from "../../../redux/redux-store";
import { getFriends } from "../../../redux/sidebar-reducer";
import { actions } from "../../../redux/users-reducer";
import Preloader from "../../Common/Preloader/Preloader";
import s from "./Friends.module.css";
import FriendsItem from "./FriendsItem/FriendsItem";

const Friends = () => {
  const { friends: friendsData, isFetching } = useSelector(
    (state: CombinedStateType) => state.sidebar
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFriends());
  }, [dispatch]);

  let friendsElements = friendsData.map((f) => (
    <FriendsItem
      key={f.id}
      name={f.name}
      id={f.id}
      photos={f.photos}
      status={f.status}
    />
  ));

  if (isFetching) {
    return (
      <div className={s.friendsWrapper}>
        <div className={s.friendsMenuBtn}>
          <NavLink to="/users">Friends</NavLink>
        </div>
        <Preloader />
      </div>
    );
  }

  return (
    <div className={s.friendsWrapper}>
      <div className={s.friendsMenuBtn}>
        <NavLink
          onClick={() => {
            dispatch(actions.setIsFriendsFromNavLink(true));
          }}
          to={"/users"}
        >
          Friends
        </NavLink>
      </div>
      <div className={s.friends}>{friendsElements}</div>
    </div>
  );
};

export default Friends;
