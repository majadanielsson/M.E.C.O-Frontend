import React from "react";
import {
  Link
} from "react-router-dom";
import {
  Container,
  Button,
  Navbar
} from "react-bootstrap";
import Nav from "components/Nav";
export default function App() {
  return (<div>
    <Nav name="Kursvärderingsportalen" url="/"></Nav>
    <Container className="py-4">
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
  </Container>
</div>);
}