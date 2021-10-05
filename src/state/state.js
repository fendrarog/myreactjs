let rerenderEntireTree = () => {
  console.log("state changed");
};

let state = {
  profilePage: {
    postsData: [
      { id: 1, message: "Hi, how are you?", likesCount: 12 },
      { id: 2, message: "It's my first post", likesCount: 9 },
      { id: 3, message: "GG WP", likesCount: 3 },
      { id: 4, message: "Ez katka", likesCount: 7 },
    ],
    newPostText: "shadowbolt",
  },
  messagesPage: {
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
  },
  sitebar: {
    friendsData: [
      { id: 1, name: "Iana" },
      { id: 2, name: "Pavlik" },
      { id: 3, name: "Duriman" },
    ],
  },
};

window.state = state;

export const addPost = () => {
  let newPost = {
    id: 5,
    message: state.profilePage.newPostText,
    likesCount: 0,
  };
  state.profilePage.postsData.push(newPost);
  state.profilePage.newPostText = "";
  rerenderEntireTree(state);
};

export const updateNewPostText = (newText) => {
  state.profilePage.newPostText = newText;
  rerenderEntireTree(state);
};

export const addMessage = () => {
  let newMessage = {
    id: 10,
    message: state.messagesPage.newMessageText,
  };
  state.messagesPage.messagesData.push(newMessage);
  state.messagesPage.newMessageText = "";
  rerenderEntireTree(state);
};

export const updateNewMessageText = (newText) => {
  state.messagesPage.newMessageText = newText;
  rerenderEntireTree(state);
};

export const subscribe = (observer) => {
  rerenderEntireTree = observer;
};

export default state;
