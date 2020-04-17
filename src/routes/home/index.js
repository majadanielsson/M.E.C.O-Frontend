import React from "react";
import {
  Link
} from "react-router-dom";
import {
  Container,
  Button,
  Navbar,
  Form,
  InputGroup,
  Row,
  Col,
  ButtonGroup,
  Accordion
} from "react-bootstrap";
import Nav from "components/Nav";
import UserContext from "context/UserContext";
import api from "modules/api"
export default class App extends React.Component {
  static contextType = UserContext;
  render() {
    const devLogin = async (event) => {
      event.preventDefault();
      var user = await api.cas.dev({
        username: document.querySelector("#username").value,
        name: document.querySelector("#name").value,
        role: document.querySelector("#role").value
      });
      this.context.changeUser(user);
    }
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
    <Accordion>
    <Row className="py-5">
      <Col lg="6">
        <Accordion.Toggle as={Button} variant="outline-danger" eventKey="1">
        Dev login
        </Accordion.Toggle>
        <Accordion.Collapse eventKey="1">
    <Form onSubmit={devLogin} className="py-4">
      <h3>Logga in</h3>
      <Form.Group controlId="name">
      <Form.Label>name</Form.Label>
        <Form.Control
          type="text"
          defaultValue="Maria Andersson"
          required
        />
    </Form.Group>
    <Form.Group controlId="username">
      <Form.Label>username</Form.Label>
        <Form.Control
          type="text"
          required
          defaultValue="maan1234"
        />
    </Form.Group>
    <Form.Group controlId="role">
      <Form.Label>role</Form.Label>
        <Form.Control
          type="text"
          required
          defaultValue="student"
        />
    </Form.Group>
      <Button type="submit">Logga in</Button>
    </Form>
    </Accordion.Collapse>
    </Col>
    </Row>
    </Accordion>
  </Container>
</div>);
  }
}