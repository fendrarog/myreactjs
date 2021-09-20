import s from "./Message.module.css";

const Message = (props) => {
  return (
    <div className={s.item}>
      <div className={s.message}>{props.message}</div>
    </div>
  );
};


export default Message;
