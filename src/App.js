import "./../src/scss/app.scss";
import Chat from "./components/Chat";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import { Provider } from "react-redux";
import store from "./store";
function App() {
  return (
    <Provider store={store}>
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
    </Provider>
  );
}

export default App;
