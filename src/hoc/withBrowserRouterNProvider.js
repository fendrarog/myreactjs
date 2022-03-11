import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import store from "../redux/redux-store";

export const withBrowserRouterNProvider = (Component) => {
  const WrapComponent = (props) => {
    return (
      <BrowserRouter>
        <Provider store={store}>
          <Component {...props} />
        </Provider>
      </BrowserRouter>
    );
  };

  return WrapComponent;
};
