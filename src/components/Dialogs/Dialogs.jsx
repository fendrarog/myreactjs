import s from "./Dialogs.module.css";
import Message from "./Message/Message";
import DialogItem from "./DialogItem/DialogItem";
import React from "react";

const Dialogs = (props) => {
  let dialogsElements = props.dialogsData.map((d) => (
    <DialogItem name={d.name} id={d.id} />
  ));
  let messagesElements = props.messagesData.map((m) => (
    <Message message={m.message} />
  ));

  let newMessageElement = React.createRef();

  let onAddMessage = () => {
    props.addMessage();
  };

  let onPostChange = (event) => {
    let text = event.target.value;
    props.updateNewMessageText(text);
  };

  return (
    <div className={s.dialogs}>
      <div className={s.dialogsItems}>{dialogsElements}</div>
      <div>
        <div className={s.messages}>{messagesElements}</div>
        <div className={s.addMessageArea}>
          <div>
            <textarea
              onChange={onPostChange}
              ref={newMessageElement}
              value={props.newMessageText}
            />
          </div>
          <div>
            <button onClick={onAddMessage}>Отправить</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dialogs;
