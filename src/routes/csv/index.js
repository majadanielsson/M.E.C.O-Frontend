import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";
import {Container} from "react-bootstrap";
export default function App() {
  return (<Router>
    <div>
      <Switch>
        <Route path="/">
          <Home/>
        </Route>
      </Switch>
    </div>
  </Router>);
}

function Home() {
  return <Container className="py-4">
    <h1>CSV</h1>
  </Container>;
}
