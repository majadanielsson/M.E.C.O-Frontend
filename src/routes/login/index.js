import React from "react";
import {
  Redirect,
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams,
} from "react-router-dom";
import {
  Button,
  Container
} from "react-bootstrap";
import api from "modules/api";
import UserContext from "context/UserContext"
export default class Login extends React.Component {
  static contextType = UserContext;
  constructor(props) {
    super(props);
    this.state = {
      loggingIn: true,
      redirect: null
    };
  }
  componentDidMount() {
    const urlParams = new URLSearchParams(window.location.search);
    const ticket = urlParams.get('ticket');
    if (!ticket) {
      this.setState({
        loggingIn: false
      });
    } else {
      api.cas.login(ticket).then((data) => {
        console.log(data);
        this.context.changeUser(data);
        this.setState({
          redirect: window.sessionStorage.getItem("redirect")
        });
        window.sessionStorage.removeItem("redirect");
      })
    }
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />
    }
    return <Container className="py-4">
      <h1 className="h3">Loggar in...</h1>
    </Container>;
  }
}