import React, { Suspense, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route } from "react-router";
import "./App.css";
import Preloader from "./components/Common/Preloader/Preloader";
import Dialogs from "./components/Dialogs/Dialogs";
import Header from "./components/Header/Header";
//import Music from "./components/Music/Music";
import Navbar from "./components/Navbar/Navbar";
import News from "./components/News/News";
import Profile from "./components/Profile/Profile";
//import Settings from "./components/Settings/Settings";
//import Users from "./components/Users/Users";
import { initializeApp } from "./redux/app-reducer";
import Login from "./components/Login/Login";
import { withBrowserRouterNProvider } from "./hoc/withBrowserRouterNProvider";
import { Switch } from "react-router-dom";
import { Redirect } from "react-router-dom";
import { CombinedStateType } from "./redux/redux-store";

const Music = React.lazy(() => import("./components/Music/Music"));
const Settings = React.lazy(() => import("./components/Settings/Settings"));
const Users = React.lazy(() => import("./components/Users/Users"));

const App: React.FC<{}> = () => {
  const init = useSelector((state: CombinedStateType) => state.app.init);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeApp());
  }, [dispatch]);

  if (!init) {
    return <Preloader />;
  }

  return (
    <div className="app-wrapper">
      <Header />
      <Navbar />
      <div className="app-wrapper-content">
        <Switch>
          <Route exact path="/" render={() => <Redirect to="/profile" />} />
          <Route path="/login" render={() => <Login />} />
          <Route path="/profile/:userId?" render={() => <Profile />} />
          <Route path="/dialogs" render={() => <Dialogs />} />
          <Route path="/news/lol/kek" render={() => <div>news LOL KEK</div>} />
          <Route path="/news/lol" render={() => <div>news LOL</div>} />
          <Route path="/news" render={() => <News />} />
          <Suspense fallback={<div>This is suspense loading...</div>}>
            <Route path="/music" render={() => <Music />} />
            <Route path="/settings" render={() => <Settings />} />
            <Route path="/users" render={() => <Users />} />
          </Suspense>
          <Route path="*" render={() => <div>404 NOT FOUND</div>} />
        </Switch>
      </div>
    </div> // 404 PAGE NOT WORK WITH <SWITCH>
  ); // Redirect to="/profile" WITHOUT EXACT NOT WORK
}; // ProfilePage loading when logout and return status code 400

export default withBrowserRouterNProvider(App);

// Ctrl+K+F --- tabulyatsiya
