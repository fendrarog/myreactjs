import React from "react";
import { NavLink } from "react-router-dom";
import s from "./DialogItem.module.css";

type TypeProps = {
  id: number;
  name: string;
};

const DialogItem: React.FC<TypeProps> = ({ id, name }) => {
  let path = "/dialogs/" + id;
  return (
    <div className={s.dialog}>
      <img
        src="https://cs11.pikabu.ru/post_img/big/2020/04/12/9/1586704514168132921.png"
        alt=""
      />
      <NavLink to={path} activeClassName={s.activeLink}>
        {name}
      </NavLink>
    </div>
  );
};

export default DialogItem;
