const ADD_MESSAGE = "messagesPage/AddMessage";

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
  ] as Array<MessagesType>,
  dialogsData: [
    { id: 1, name: "Pidr" },
    { id: 2, name: "Loh" },
    { id: 3, name: "Suka" },
    { id: 4, name: "Kasha" },
    { id: 5, name: "Durik" },
    { id: 6, name: "Borovik" },
  ] as Array<DialogsType>,
};
export type initialStateType = typeof initialState;
type MessagesType = {
  id: number;
  message: string;
};
type DialogsType = {
  id: number;
  name: string;
};

const messagesReducer = (
  state = initialState,
  action: any
): initialStateType => {
  switch (action.type) {
    case ADD_MESSAGE: {
      return {
        ...state,
        messagesData: [...state.messagesData, { id: 10, ...action.payload }],
      };
    }
    default:
      return state;
  }
};

type AddMessageType = {
  type: typeof ADD_MESSAGE;
  payload: { message: string };
};

export const addMessage = (newMessage: string): AddMessageType => ({
  type: ADD_MESSAGE,
  payload: { message: newMessage },
});

export default messagesReducer;
