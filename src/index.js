import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

let postsData = [
  { id: 1, message: "Hi, how are you?", likesCount: 12 },
  { id: 2, message: "It's my first post", likesCount: 9 },
  { id: 3, message: "GG WP", likesCount: 3 },
  { id: 4, message: "Ez katka", likesCount: 7 },
];

let dialogsData = [
  { id: 1, name: "Pashtet" },
  { id: 2, name: "Iana" },
  { id: 3, name: "Dasha" },
  { id: 4, name: "Masha" },
  { id: 5, name: "Durik" },
  { id: 6, name: "Borovik" },
];

let messagesData = [
  { id: 1, message: "Hi" },
  { id: 2, message: "How is your business?" },
  { id: 3, message: "Yo!" },
  { id: 4, message: "Yo!" },
  { id: 5, message: "Yo!" },
  { id: 6, message: "Yo!" },
];

ReactDOM.render(
  <React.StrictMode>
    <App
      postsData={postsData}
      dialogsData={dialogsData}
      messagesData={messagesData}
    />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
