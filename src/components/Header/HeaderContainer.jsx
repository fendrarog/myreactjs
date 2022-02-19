import React from "react";
import { connect } from "react-redux";
import Header from "./Header";
import { getAuthUserData, logout } from "../../redux/auth-reducer";

class HeaderContainer extends React.Component {
  render() {
    return <Header {...this.props} />;
  }
}
const mapStateToProps = (state) => ({
  isAuth: state.auth.isAuth,
  login: state.auth.userLogin,
  loginImg: state.auth.loginImg,
});
export default connect(mapStateToProps, { getAuthUserData, logout })(
  HeaderContainer
);
