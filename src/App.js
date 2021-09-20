import { Route } from "react-router";
import { BrowserRouter } from "react-router-dom";
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
    <BrowserRouter>
      <div className="app-wrapper">
        <Header />
        <Navbar state={props.state.sitebar}/>
        <div className="app-wrapper-content">
          <Route path="/profile" render={() => <Profile state={props.state.profilePage} />} />
          <Route path="/dialogs" render={() => <Dialogs state={props.state.messagesPage} />} />
          <Route path="/news" render={() => <News />} />
          <Route path="/music" render={() => <Music />} />
          <Route path="/settings" render={() => <Settings />} />
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;

// Ctrl+K+F --- tabulyatsiya
