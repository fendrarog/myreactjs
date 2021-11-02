const ADD_MESSAGE = "ADD-MESSAGE";
const UPDATE_NEW_MESSAGE_TEXT = "UPDATE-NEW-MESSAGE-TEXT";

let initialState = {
  messagesData: [
    { id: 1, message: "Hi" },
    { id: 2, message: "How is your business?" },
    { id: 3, message: "Yo!" },
    { id: 4, message: "Yo!" },
    { id: 5, message: "Yo!" },
    { id: 6, message: "Yo!" },
    { id: 7, message: "Yo!" },
    { id: 8, message: "Yo!" },
    { id: 9, message: "Yo!" },
  ],
  dialogsData: [
    { id: 1, name: "Pashtet" },
    { id: 2, name: "Iana" },
    { id: 3, name: "Dasha" },
    { id: 4, name: "Masha" },
    { id: 5, name: "Durik" },
    { id: 6, name: "Borovik" },
  ],
  newMessageText: "tolstozhopiy",
};

const messagesReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_MESSAGE: {
      let newMessage = {
        id: 10,
        message: state.newMessageText,
      };
      return {
        ...state,
        messagesData: [...state.messagesData, newMessage],
        newMessageText: "",
      };
      //stateCopy.messagesData.push(newMessage);
      //stateCopy.newMessageText = "";
      //return stateCopy;
    }
    case UPDATE_NEW_MESSAGE_TEXT: {
      return {
        ...state,
        newMessageText: action.newText,
      };
      //stateCopy.newMessageText = action.newText;
      //return stateCopy;
    }
    default:
      return state;
  }
};

export const addMessageActionCreator = () => ({ type: ADD_MESSAGE });
export const updateNewMessageTextActionCreator = (text) => ({
  type: UPDATE_NEW_MESSAGE_TEXT,
  newText: text,
});

export default messagesReducer;
