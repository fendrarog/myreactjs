//import MyPosts from "./MyPosts/MyPosts";
import { useDispatch, useSelector } from "react-redux";
import MyPosts from "./MyPosts/MyPosts";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import { getUserProfile, getUserStatus } from "../../redux/profile-reducer";
import { withRouter } from "react-router-dom";
import { useEffect } from "react";
// import s from "./Profile.module.css";

const Profile = (props) => {
  const authorizedUserId = useSelector((state) => state.auth.userId);
  const dispatch = useDispatch();

  useEffect(() => {
    let userId = props.match.params.userId;
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
      <ProfileInfo />
      <MyPosts />
    </div>
  );
};

export default withRouter(Profile);
