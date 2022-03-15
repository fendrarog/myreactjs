//import MyPosts from "./MyPosts/MyPosts";
import { useDispatch, useSelector } from "react-redux";
import MyPosts from "./MyPosts/MyPosts";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import {
  getUserProfile,
  getUserStatus,
  toggleIsOwner,
} from "../../redux/profile-reducer";
import { withRouter } from "react-router-dom";
import { useEffect } from "react";
// import s from "./Profile.module.css";

const Profile = (props) => {
  const authorizedUserId = useSelector((state) => state.auth.userId);
  const dispatch = useDispatch();

  useEffect(() => {
    let userId = props.match.params.userId;
    !props.match.params.userId
      ? dispatch(toggleIsOwner(true))
      : dispatch(toggleIsOwner(false));
    if (!userId) {
      userId = authorizedUserId;
      if (!userId) {
        props.history.push("/login");
      }
    }
    dispatch(getUserProfile(userId));
    dispatch(getUserStatus(userId));
  }, [authorizedUserId, dispatch, props.history, props.match.params.userId]);
  return (
    <div>
      <ProfileInfo
        isOwnersUserPage={
          props.match.params.userId === String(authorizedUserId)
        }
      />
      <MyPosts />
    </div>
  );
};

export default withRouter(Profile);
