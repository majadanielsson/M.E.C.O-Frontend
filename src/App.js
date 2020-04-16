import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";
import Portal from "./routes/portal/";
import Rapport from "./routes/rapport/";
import Csv from "./routes/csv/";
import Home from "./routes/home/";
import Login from "./routes/login/";
import UserContext from "context/UserContext"
export default class App extends React.Component {
  constructor() {
    super();
    var user = window.sessionStorage.getItem("user");
    this.state = {
      user: (!user) ? "" : JSON.parse(user),
      changeUser: (user) => {
        this.setState({
          user: user
        });
        window.sessionStorage.setItem("user", JSON.stringify(user));
      }
    }
  };
  render() {
    return <UserContext.Provider value={this.state}>
    <Router>
    <div>
      <Switch>

        <Route path="/rapport">
          <Rapport/>
        </Route>

        <Route path="/portal">
          <Portal/>
        </Route>

        <Route path="/csv">
          <Csv/>
        </Route>

        <Route path="/login">
          <Login/>
        </Route>

        <Route path="/">
          <Home/>
        </Route>

      </Switch>
    </div>
  </Router>
</UserContext.Provider>
  };
}