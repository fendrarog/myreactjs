import React from "react";
import reactDom from "react-dom";
import reportWebVitals from "./reportWebVitals";
import App from "./App";

//let rerenderEntireTree = () => {
reactDom.render(
      <App />,
  document.getElementById("root")
);
//};

// rerenderEntireTree();

// store.subscribe(() => {
//   let state = store.getState();
//   rerenderEntireTree(state);
// });

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
