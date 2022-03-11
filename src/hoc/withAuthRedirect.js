import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

let mapStateToProps = (state) => ({
  isAuth: state.auth.isAuth,
});

export const withAuthRedirect = (Component) => {
  const RedirectComponent = (props) => {
    if (!props.isAuth) return <Redirect to="/login" />;
    return <Component {...props} />;
  };

  let ConnectedAuthRedirectComponent =
    connect(mapStateToProps)(RedirectComponent);

  return ConnectedAuthRedirectComponent;
};
