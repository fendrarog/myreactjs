//import MyPosts from "./MyPosts/MyPosts";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import MyPosts from "./MyPosts/MyPosts";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import { getUserProfile, getUserStatus } from "../../redux/profile-reducer";
import { withRouter } from "react-router-dom";
import { useCallback, useEffect } from "react";
import { RouteComponentProps } from "react-router";
import { CombinedStateType } from "../../redux/redux-store";
import Preloader from "../Common/Preloader/Preloader";
//import s from "./Profile.module.css";

type RouteParams = {
  userId?: string;
};

const Profile: React.FC<RouteComponentProps<RouteParams>> = (props) => {
  const authorizedUserId = useSelector(
    (state: CombinedStateType) => state.auth.userId
  );
  const isAuth = useSelector((state: CombinedStateType) => state.auth.isAuth);

  const dispatch = useDispatch();

  const refreshProfile = useCallback(() => {
    let userId = Number(props.match.params.userId);
    if (!userId) {
      userId = authorizedUserId;
      if (!userId) {
        props.history.push("/login");
      }
    }
    dispatch(getUserProfile(userId));
    dispatch(getUserStatus(userId));
  }, [authorizedUserId, dispatch, props.history, props.match.params.userId]);

  useEffect(() => {
    refreshProfile();
  }, [refreshProfile]);

  if (!isAuth) {
    return <Preloader />;
  }

  return (
    <div>
      <ProfileInfo />
      <MyPosts />
    </div>
  );
};

export default withRouter(Profile);
