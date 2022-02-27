import { NavLink } from "react-router-dom";
import s from "./Header.module.css";
import noPhoto from "../../assets/images/nophoto.jpg";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/auth-reducer";

export const Header = () => {
  /*const isAuth = useSelector((state) => state.auth.isAuth);
  const login = useSelector((state) => state.auth.userLogin);
  const loginImg = useSelector((state) => state.auth.loginImg); */
  const {isAuth, userLogin, loginImg} = useSelector((state) => state.auth);
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
        <img src={!loginImg || !isAuth ? noPhoto : loginImg} alt="#" />
      </div>
    </header>
  );
};
