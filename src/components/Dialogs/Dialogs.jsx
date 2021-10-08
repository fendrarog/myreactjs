import s from "./Dialogs.module.css";
import Message from "./Message/Message";
import DialogItem from "./DialogItem/DialogItem";
import React from "react";

const Dialogs = (props) => {
  let dialogsElements = props.state.dialogsData.map((d) => (
    <DialogItem name={d.name} id={d.id} />
  ));
  let messagesElements = props.state.messagesData.map((m) => (
    <Message message={m.message} />
  ));

  let newMessageElement = React.createRef();

  let addMessage = () => {
    props.dispatch({ type: "ADD-MESSAGE" });
  };

  let onPostChange = () => {
    let text = newMessageElement.current.value;
    props.dispatch({ type: "UPDATE-NEW-MESSAGE-TEXT", newText: text });
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
              value={props.state.newMessageText}
            />
          </div>
          <div>
            <button onClick={addMessage}>Отправить</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dialogs;
