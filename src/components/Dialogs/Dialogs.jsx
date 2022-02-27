import s from "./Dialogs.module.css";
import Message from "./Message/Message";
import DialogItem from "./DialogItem/DialogItem";
import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { addMessage } from "../../redux/messages-reducer";
import { withAuthRedirect } from "../../hoc/withAuthRedirect";

const Dialogs = () => {
  const { dialogsData, messagesData } = useSelector(
    (state) => state.messagesPage
  );

  let dialogsElements = dialogsData.map((d) => (
    <DialogItem name={d.name} id={d.id} />
  ));
  let messagesElements = messagesData.map((m) => (
    <Message message={m.message} />
  ));

  return (
    <div className={s.dialogs}>
      <div className={s.dialogsItems}>{dialogsElements}</div>
      <div>
        <div className={s.messages}>{messagesElements}</div>
      </div>
      <AddMessageForm />
    </div>
  );
};

const AddMessageForm = () => {
  const dispatch = useDispatch();
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    reset,
  } = useForm({ mode: "onChange" });

  const onSubmit = (data) => {
    dispatch(addMessage(data.messageField));
    reset();
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className={s.addMessageArea}>
      <input
        {...register("messageField", {
          required: "Пустое поле.",
          maxLength: 50,
        })}
        type="text"
        placeholder="Введите текст"
        autocomplete="off"
        className={s.messageTextArea}
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

export default withAuthRedirect(Dialogs);
