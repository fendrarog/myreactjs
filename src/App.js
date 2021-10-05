import { Route } from "react-router";
import "./App.css"; //ALT+SHIFT+strelka vniz
import Dialogs from "./components/Dialogs/Dialogs";
import Header from "./components/Header/Header";
import Music from "./components/Music/Music";
import Navbar from "./components/Navbar/Navbar";
import News from "./components/News/News";
import Profile from "./components/Profile/Profile";
import Settings from "./components/Settings/Settings";

function App(props) {
  return (
    <div className="app-wrapper">
      <Header />
      <Navbar state={props.state.sitebar} />
      <div className="app-wrapper-content">
        <Route
          path="/profile"
          render={() => (
            <Profile
              state={props.state.profilePage}
              addPost={props.addPost}
              updateNewPostText={props.updateNewPostText}
            />
          )}
        />
        <Route
          path="/dialogs"
          render={() => (
            <Dialogs
              state={props.state.messagesPage}
              addMessage={props.addMessage}
              updateNewMessageText={props.updateNewMessageText}
            />
          )}
        />
        <Route path="/news" render={() => <News />} />
        <Route path="/music" render={() => <Music />} />
        <Route path="/settings" render={() => <Settings />} />
      </div>
    </div>
  );
}

export default App;

// Ctrl+K+F --- tabulyatsiya
