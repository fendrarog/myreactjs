import React from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { CombinedStateType } from "../redux/redux-store";

export const withAuthRedirect = <WCP,>(
  WrappedComponent: React.ComponentType<WCP>
) => {
  const RedirectComponent = (props: WCP) => {
    const isAuth = useSelector((state: CombinedStateType) => state.auth.isAuth);
    if (!isAuth) return <Redirect to="/login" />;
    return <WrappedComponent {...props} />;
  };
  return RedirectComponent;
};
