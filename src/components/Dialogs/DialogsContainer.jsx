import React from "react";
import {
  addMessageActionCreator,
  updateNewMessageTextActionCreator,
} from "../../redux/messages-reducer";
import Dialogs from "./Dialogs";

const DialogsContainer = (props) => {
  let state = props.store.getState();

  let addMessage = () => {
    props.store.dispatch(addMessageActionCreator());
  };

  let onPostChange = (text) => {
    props.store.dispatch(updateNewMessageTextActionCreator(text));
  };

  return (
    <Dialogs
      addMessage={addMessage}
      updateNewMessageText={onPostChange}
      newMessageText={state.messagesPage.newMessageText}
      dialogsData={state.messagesPage.dialogsData}
      messagesData={state.messagesPage.messagesData}
    />
  );
};

export default DialogsContainer;
