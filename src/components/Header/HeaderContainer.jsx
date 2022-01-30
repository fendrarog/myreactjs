import React from "react";
import { connect } from "react-redux";
import Header from "./Header";
import { setAuthUserData, setLoginImg } from "../../redux/auth-reducer";
import { authAPI } from "../../api/api";

class HeaderContainer extends React.Component {
  componentDidMount() {
    authAPI.meAPI().then((response) => {
        if (response.data.resultCode === 0) {
          let { id, login, email } = response.data.data;
          this.props.setAuthUserData(id, email, login);
        }
      });
    authAPI.getLoginImgAPI().then((response) => {
        this.props.setLoginImg(response.data.photos.small);
      });
  }
  render() {
    return <Header {...this.props} />;
  }
}
const mapStateToProps = (state) => ({
  isAuth: state.auth.isAuth,
  login: state.auth.userLogin,
  loginImg: state.auth.loginImg,
});
export default connect(mapStateToProps, { setAuthUserData, setLoginImg })(
  HeaderContainer
);
