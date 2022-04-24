import s from "./Dialogs.module.css";
import Message from "./Message/Message";
import DialogItem from "./DialogItem/DialogItem";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "../../redux/messages-reducer";
import { withAuthRedirect } from "../../hoc/withAuthRedirect";
import { CombinedStateType } from "../../redux/redux-store";

const Dialogs: React.FC = () => {
  const { dialogsData, messagesData } = useSelector(
    (state: CombinedStateType) => state.messagesPage
  );

  let dialogsElements = dialogsData.map((d) => (
    <DialogItem key={d.id} name={d.name} id={d.id} />
  ));
  let messagesElements = messagesData.map((m) => (
    <Message key={m.id} message={m.message} />
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

const AddMessageForm: React.FC = () => {
  const dispatch = useDispatch();

  type LoginData = {
    messageField: string;
  };

  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    reset,
  } = useForm<LoginData>({ mode: "onChange" });

  const onSubmit: SubmitHandler<LoginData> = (data) => {
    dispatch(actions.addMessage(data.messageField));
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
        autoComplete="off"
        className={s.messageTextArea}
      />
      <div>
        {errors?.messageField && (
          <p>{errors?.messageField?.message || "Слишком много символов."}</p>
        )}
      </div>
      <input type="submit" disabled={!isValid} />
    </form>
  );
};

export default withAuthRedirect(Dialogs);
