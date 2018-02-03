import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import registerServiceWorker from "./registerServiceWorker";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import { Redirect, Route, Router } from "react-router";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import createBrowserHistory from "history/createBrowserHistory";
import Login from "./features/login";
import Home from "./features/home";

const muiTheme = getMuiTheme({
  appBar: {
    color: "#37517E",
    height: 50
  }
});

const customHistory = createBrowserHistory();
const Root = () => (
  <MuiThemeProvider muiTheme={muiTheme}>
    <Router history={customHistory}>
      <div>
        <Route path="/login" component={Login} />
        <Route path="/app/home" component={Home} />
        <Redirect from="/" to="/login" />
      </div>
    </Router>
  </MuiThemeProvider>
);
ReactDOM.render(<Root />, document.getElementById("root"));
registerServiceWorker();
