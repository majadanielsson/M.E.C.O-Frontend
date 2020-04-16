import React from "react";
import {
  Link
} from "react-router-dom";
import {
  Navbar,
} from "react-bootstrap";
import User from "components/User"
export default class Nav extends React.Component {
  constructor(props) {
    super(props);
  };
  render() {
    return <Navbar bg="dark" variant="dark" expand="lg">
<Link to={this.props.url}><Navbar.Brand>{this.props.name}</Navbar.Brand></Link>
<Navbar.Toggle />
<Navbar.Collapse className="justify-content-end">
{this.props.children}
<User></User>
</Navbar.Collapse>
</Navbar>
  }
}