const ADD_MESSAGE = "ADD-MESSAGE";

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
};

const messagesReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_MESSAGE: {
      return {
        ...state,
        messagesData: [
          ...state.messagesData,
          { id: 10, message: action.newMessage },
        ],
      };
    }
    default:
      return state;
  }
};

export const addMessage = (newMessage) => ({
  type: ADD_MESSAGE,
  newMessage,
});

export default messagesReducer;
