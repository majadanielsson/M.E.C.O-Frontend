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
  Container
} from "react-bootstrap";
import Nav from "components/Nav";
export default function App() {
  return (<div>
    <Nav name="CSV" url="/csv"></Nav>
    <Router>
    <div>
      <Switch>
        <Route path="/">
          <Home/>
        </Route>
      </Switch>
    </div>
  </Router>
</div>);
}

function Home() {
  return <Container className="py-4">
    <h1>CSV</h1>
  </Container>;
}