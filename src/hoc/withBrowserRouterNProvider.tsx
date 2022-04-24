import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import store from "../redux/redux-store";

export const withBrowserRouterNProvider = <WCP,>(
  WrappedComponent: React.ComponentType<WCP>
) => {
  const WrapComponent = (props: WCP) => {
    return (
      <BrowserRouter>
        <Provider store={store}>
          <WrappedComponent {...props} />
        </Provider>
      </BrowserRouter>
    );
  };

  return WrapComponent;
};
