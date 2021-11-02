//import React from "react";
import { connect } from "react-redux";
import {
  addMessageActionCreator,
  updateNewMessageTextActionCreator,
} from "../../redux/messages-reducer";
import Dialogs from "./Dialogs";
//import StoreContext from "../../StoreContext";

// const DialogsContainer = (props) => {
//   //let state = props.store.getState();

//   // let addMessage = () => {
//   //   props.store.dispatch(addMessageActionCreator());
//   // };

//   // let onPostChange = (text) => {
//   //   props.store.dispatch(updateNewMessageTextActionCreator(text));
//   // };

//   return (
//     <StoreContext.Consumer>
//       {(store) => {
//         let state = store.getState();
//         let addMessage = () => {
//           store.dispatch(addMessageActionCreator());
//         };

//         let onPostChange = (text) => {
//           store.dispatch(updateNewMessageTextActionCreator(text));
//         };

//         return (
//           <Dialogs
//             addMessage={addMessage}
//             updateNewMessageText={onPostChange}
//             newMessageText={state.messagesPage.newMessageText}
//             dialogsData={state.messagesPage.dialogsData}
//             messagesData={state.messagesPage.messagesData}
//           />
//         );
//       }}
//     </StoreContext.Consumer>
//   );
// };

let mapStateToProps = (state) => {
  return {
    messagesPage: state.messagesPage,
  };
};
let mapDispatchToProps = (dispatch) => {
  return {
    addMessage: () => {
      dispatch(addMessageActionCreator());
    },
    updateNewMessageText: (text) => {
      dispatch(updateNewMessageTextActionCreator(text));
    },
  };
};

const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(Dialogs);

export default DialogsContainer;
