let store = {
  _state: {
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
  },
  _callSubscriber() {
    console.log("state changed");
  },

  getState() {
    return this._state;
  },
  subscribe(observer) {
    this._callSubscriber = observer;
  },

  dispatch(action) {
    if (action.type === "ADD-POST") {
      let newPost = {
        id: 5,
        message: this._state.profilePage.newPostText,
        likesCount: 0,
      };
      this._state.profilePage.postsData.push(newPost);
      this._state.profilePage.newPostText = "";
      this._callSubscriber(this._state);
    } else if (action.type === "UPDATE-NEW-POST-TEXT") {
      this._state.profilePage.newPostText = action.newText;
      this._callSubscriber(this._state);
    } else if (action.type === "ADD-MESSAGE") {
      let newMessage = {
        id: 10,
        message: this._state.messagesPage.newMessageText,
      };
      this._state.messagesPage.messagesData.push(newMessage);
      this._state.messagesPage.newMessageText = "";
      this._callSubscriber(this._state);
    } else if (action.type === "UPDATE-NEW-MESSAGE-TEXT") {
      this._state.messagesPage.newMessageText = action.newText;
      this._callSubscriber(this._state);
    }
  },
};






export default store;
window.store = store;
