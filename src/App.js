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
export default function App() {
  return (<Router>
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

        <Route path="/">
          <Home/>
        </Route>

      </Switch>
    </div>
  </Router>);
}
