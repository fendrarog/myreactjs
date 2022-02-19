import { NavLink } from "react-router-dom";
import s from "./Header.module.css";
import noPhoto from "../../assets/images/nophoto.jpg";

const Header = (props) => {
  
  return (
    <header className={s.header}>
      <img
        src="https://seeklogo.com/images/L/letter-m-logo-8852E209CB-seeklogo.com.png"
        alt=""
      />
      <div className={s.loginBlock}>
        {props.login}
        {props.isAuth ? ( <button onClick={props.logout}>Logout</button>
        ) : (
          <NavLink to="/login">Login</NavLink>
        )}
        <img
          src={!props.loginImg || !props.isAuth ? noPhoto : props.loginImg}
          alt="#"
          />
      </div>
    </header>
  );
};

export default Header;
