import React from "react";
const UserContext = React.createContext({
  user: "",
  changeUser: () => {}
});
export default UserContext