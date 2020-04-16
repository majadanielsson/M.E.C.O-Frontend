import React from "react";
import api from "modules/api"
import UserContext from "context/UserContext"
import {
  FontAwesomeIcon
} from "@fortawesome/react-fontawesome"
import {
  faUser,
  faSignInAlt,
  faSignOutAlt
} from "@fortawesome/free-solid-svg-icons"
import {
  Button
} from "react-bootstrap"
export default class User extends React.Component {
  static contextType = UserContext;
  render() {
    if (this.context.user)
      return <div className="text-white"><FontAwesomeIcon icon={faUser} /> {this.context.user.username}
        <br/>
        <a className="text-white"
          href="#"
          onClick={() => api.cas.logout()}><FontAwesomeIcon icon={faSignOutAlt} /> Logga ut</a>
      </div>
    else return <div>
      <a className="text-white" href="#" onClick={() => api.cas.redirect()}><FontAwesomeIcon icon={faSignInAlt} /> Logga in</a>
  </div>;
  }
}