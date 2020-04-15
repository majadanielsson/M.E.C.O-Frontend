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
  Button,
  Container
} from "react-bootstrap";
import api from "modules/api";

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggingIn: true
    };
  }
  componentDidMount() {
    const urlParams = new URLSearchParams(window.location.search);
    const ticket = urlParams.get('ticket');
    if (!ticket) this.setState((state) => {
      return {
        loggingIn: false
      };
    });
    else {
      api.cas.login(ticket).then((data) => console.log(data))
    }
  }

  render() {
    return <Container className="py-4">
      <h1>Logging in...</h1>
      <Button onClick={() => api.cas.redirect()}> Log in
      </Button>
    </Container>;
  }
}