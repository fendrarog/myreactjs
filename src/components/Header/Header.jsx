import { NavLink } from "react-router-dom";
import s from "./Header.module.css";
import noPhoto from "../../assets/images/nophoto.jpg";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/auth-reducer";

const Header = () => {
  const { isAuth, userLogin } = useSelector((state) => state.auth);

  const profile = useSelector((state) => state.profilePage.profile);

  const dispatch = useDispatch();

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
          <img src={profile ? profile.photos.small : noPhoto} alt="#" />
        )}
      </div>
    </header>
  );
};

export default Header;
