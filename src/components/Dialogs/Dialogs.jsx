import { NavLink } from "react-router-dom";
import s from "./Dialogs.module.css";

const DialogItem = (props) => {
  let path = "/dialogs/" + props.id;
  return (
    <div className={`${s.dialog} ${s.active}`}>
      <NavLink to={path}>{props.name}</NavLink>
    </div>
  );
};

const Message = (props) => {
  return <div className={s.message}>{props.message}</div>;
};

const Dialogs = (props) => {
  return (
    <div className={s.dialogs}>
      <div className={s.dialogsItems}>
        <DialogItem name="Pashtet" id="1" />
        <DialogItem name="Iana" id="2" />
        <DialogItem name="Dasha" id="3" />
        <DialogItem name="Masha" id="4" />
        <DialogItem name="Durik" id="5" />
        <DialogItem name="Borovik" id="6" />
      </div>
      <div className={s.messages}>
        <Message message="Hi" />
        <Message message="How is your business?" />
        <Message message="Yo!" />
      </div>
    </div>
  );
};

export default Dialogs;
