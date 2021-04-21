import "./../src/scss/app.scss";
import Chat from "./components/Chat";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import { Provider } from "react-redux";
import store from "./store";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
function App() {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route path="/panel">
            <div className="app">
              <div className="app__sidebarleft">
                <Sidebar />
              </div>
              <div className="app__chatcontainer">
                <Header />
                <Chat />
              </div>
              <div className="app__sidebarright">
                <h1>sidebar right</h1>
              </div>
            </div>
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/">
            <Login />
          </Route>
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
