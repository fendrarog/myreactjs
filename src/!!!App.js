import React from "react";
import { connect } from "react-redux";
import { Route } from "react-router";
import "./App.css";
import Preloader from "./components/Common/Preloader/Preloader";
import Dialogs from "./components/Dialogs/Dialogs";
import { Header } from "./components/Header/Header";
import Music from "./components/Music/Music";
import Navbar from "./components/Navbar/Navbar";
import News from "./components/News/News";
import Profile from "./components/Profile/Profile";
import Settings from "./components/Settings/Settings";
import UsersContainer from "./components/Users/UsersContainer";
import { initializeApp } from "./redux/app-reducer";
import { Login } from "./components/Login/Login";

class App extends React.Component {
  componentDidMount() {
    this.props.initializeApp();
  }
  render() {
    if (!this.props.init) {
      return <Preloader />;
    }

    return (
      <div className="app-wrapper">
        <Header />
        <Navbar />
        <div className="app-wrapper-content">
          <Route path="/profile/:userId?" render={() => <Profile />} />
          <Route path="/dialogs" render={() => <Dialogs />} />
          <Route path="/news" render={() => <News />} />
          <Route path="/music" render={() => <Music />} />
          <Route path="/settings" render={() => <Settings />} />
          <Route path="/users" render={() => <UsersContainer />} />
          <Route path="/login" render={() => <Login />} />
        </div>
      </div>
    );
  }
}

let mapStateToProps = (state) => ({
  init: state.app.init,
});

export default connect(mapStateToProps, { initializeApp })(App);

// Ctrl+K+F --- tabulyatsiya
