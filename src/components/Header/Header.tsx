import { NavLink } from "react-router-dom";
import s from "./Header.module.css";
import noPhoto from "../../assets/images/nophoto.jpg";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/auth-reducer";
import { useEffect } from "react";
import { getLoginPicture } from "../../redux/profile-reducer";
import { CombinedStateType } from "../../redux/redux-store";

const Header = () => {
  const { isAuth, userLogin } = useSelector(
    (state: CombinedStateType) => state.auth
  );
  const ownerPhoto = useSelector(
    (state: CombinedStateType) => state.profilePage.ownerPhoto
  );
  const authorizedUserId = useSelector(
    (state: CombinedStateType) => state.auth.userId
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (!ownerPhoto) {
      const userId = authorizedUserId;
      dispatch(getLoginPicture(userId));
    }
  }, [ownerPhoto, authorizedUserId, dispatch]);

  return (
    <header className={s.header}>
      <img
        src="https://seeklogo.com/images/L/letter-m-logo-8852E209CB-seeklogo.com.png"
        alt=""
      />
      <div className={s.loginBlock}>
        {userLogin}
        {isAuth ? (
          <button
            onClick={() => {
              dispatch(logout());
            }}
          >
            Logout
          </button>
        ) : (
          <NavLink to="/login">Login</NavLink>
        )}
        {isAuth && (
          <img src={ownerPhoto ? ownerPhoto.small : noPhoto} alt="#" />
        )}
      </div>
    </header>
  );
};

export default Header;
