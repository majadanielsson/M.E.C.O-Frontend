import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";
import {
  Container,
  Navbar
} from "react-bootstrap";
import User from "components/User";
import Nav from "components/Nav";
export default function App() {
  return (<div>
    <Nav name="Rapport" url="/rapport"></Nav>

    <Router>
    <div>
      <Switch>
        <Route path="/">
          <Home/>
        </Route>
      </Switch>
    </div>
  </Router></div>);
}

function Home() {
  return <Container className="py-4">
    <h1>Rapport</h1>
  </Container>;
}