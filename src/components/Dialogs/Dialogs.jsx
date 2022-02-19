import s from "./Dialogs.module.css";
import Message from "./Message/Message";
import DialogItem from "./DialogItem/DialogItem";
import React from "react";
import { useForm } from "react-hook-form";

const Dialogs = (props) => {
  let dialogsElements = props.messagesPage.dialogsData.map((d) => (
    <DialogItem name={d.name} id={d.id} />
  ));
  let messagesElements = props.messagesPage.messagesData.map((m) => (
    <Message message={m.message} />
  ));

  /*   let newMessageElement = React.createRef();
  let onAddMessage = () => {
    props.addMessage();
  };
  let onPostChange = (event) => {
    let text = event.target.value;
    props.updateNewMessageText(text);
  }; */

  return (
    <div className={s.dialogs}>
      <div className={s.dialogsItems}>{dialogsElements}</div>
      <div>
        <div className={s.messages}>{messagesElements}</div>
      </div>
      <AddMessageForm addMessage={props.addMessage} />
    </div>
  );
};

const AddMessageForm = (props) => {
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    reset,
  } = useForm({ mode: "onChange" });

  const onSubmit = (data) => {
    props.addMessage(data.messageField);
    reset();
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className={s.addMessageArea}>
        <input
          {...register("messageField", {
            required: "Пустое поле.",
            maxLength: 10,
          })}
          placeholder="Введите текст"
          autocomplete="off"
        />
      <div>
        {errors?.messageField && (
          <p>{errors.messageField?.message || "Слишком много символов."}</p>
        )}
      </div>
      <input type="submit" disabled={!isValid} />
    </form>
  );
};

/* <div>
        <textarea
          onChange={onPostChange}
          ref={newMessageElement}
          value={props.messagesPage.newMessageText}
        />
      </div> 
       <div>
        <button onClick={onAddMessage}>Отправить</button>
      </div> */

export default Dialogs;
