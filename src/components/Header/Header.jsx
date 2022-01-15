import { NavLink } from "react-router-dom";
import s from "./Header.module.css";

const Header = (props) => {
  return (
    <header className={s.header}>
      <img
        src="https://seeklogo.com/images/L/letter-m-logo-8852E209CB-seeklogo.com.png"
        alt=""
      />
      <div className={s.loginBlock}>
        <img src={props.isAuth ? props.loginImg : null} alt="#" />
        {props.isAuth ? props.login : <NavLink to="/login">Login</NavLink>}
      </div>
    </header>
  );
};

export default Header;
