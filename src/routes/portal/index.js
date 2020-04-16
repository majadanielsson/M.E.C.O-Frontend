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
  Navbar,
  Container
} from "react-bootstrap";
import User from "components/User";
import Nav from "components/Nav";
export default function App() {
  return (
    <div>
      <Nav name="Kursvärderingsportalen" url="/portal"></Nav>

    <Router>
    <div>
      <Switch>
        <Route path="/topics">
          <Topics/>
        </Route>
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
    <h1>Portal</h1>
  </Container>;
}

function Topics() {
  let match = useRouteMatch();

  return (<div>
    <h2>Topics</h2>

    <ul>
      <li>
        <Link to={`${match.url}/components`}>Components</Link>
      </li>
      <li>
        <Link to={`${match.url}/props-v-state`}>
          Props v. State
        </Link>
      </li>
    </ul>

    {/* The Topics page has its own <Switch> with more routes
          that build on the /topics URL path. You can think of the
          2nd <Route> here as an "index" page for all topics, or
          the page that is shown when no topic is selected */
    }
    <Switch>
      <Route path={`${match.path}/:topicId`}>
        <Topic/>
      </Route>
      <Route path={match.path}>
        <h3>Please select a topic.</h3>
      </Route>
    </Switch>
  </div>);
}

function Topic() {
  let {
    topicId
  } = useParams();
  return <h3>Requested topic ID: {topicId}</h3>;
}