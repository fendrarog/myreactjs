import React from "react";
import reactDom from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import store from "./redux/redux-store";

let rerenderEntireTree = (state) => {
  reactDom.render(
    <React.StrictMode>
      <BrowserRouter>
        <App store={store} dispatch={store.dispatch.bind(store)} />
      </BrowserRouter>
    </React.StrictMode>,
    document.getElementById("root")
  );
};

rerenderEntireTree(store.getState());

store.subscribe(() => {
  let state = store.getState();
  rerenderEntireTree(state);
});

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
