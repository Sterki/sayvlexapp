import "./../src/scss/app.scss";
import Chat from "./components/Chat";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import { Provider } from "react-redux";
import store from "./store";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import { useDispatch } from "react-redux";
import { getUserLogedAction } from "./actions/usersAction";
import { useEffect } from "react";
import tokenAuth from "./config/tokenAuth";

function wrappApp() {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
}

// console.log(process.env.REACT_APP_SERVER_HEROKU);
function App() {
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");

  if (token) {
    tokenAuth(token);
  }
  useEffect(() => {
    dispatch(getUserLogedAction());
  }, [dispatch]);

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
                <h1>Groups</h1>
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

export default wrappApp;
