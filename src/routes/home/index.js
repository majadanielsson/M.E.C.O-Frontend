import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";
import {Container, Button} from "react-bootstrap";

export default function App() {
  return (<Container className="py-4">
    <h1>Kursvärderingsportalen</h1>
    <div className="py-2">
      <Link to="/portal">
        <Button className="mr-1">Portalen</Button>
      </Link>
      <Link to="/rapport">
        <Button variant="success" className="mr-1">Rapport</Button>
      </Link>
      <Link to="/csv">
        <Button variant="warning">CSV</Button>
      </Link>
    </div>
  </Container>);
}
