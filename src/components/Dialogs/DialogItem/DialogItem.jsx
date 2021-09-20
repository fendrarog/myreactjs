import { NavLink } from "react-router-dom";
import s from "./DialogItem.module.css";

const DialogItem = (props) => {
  let path = "/dialogs/" + props.id;
  return (
    <div className={s.dialog} >
      <img src="https://cs11.pikabu.ru/post_img/big/2020/04/12/9/1586704514168132921.png" alt="" />
      <NavLink to={path} activeClassName={s.activeLink}>{props.name}</NavLink>
    </div>
  );
};


export default DialogItem;
