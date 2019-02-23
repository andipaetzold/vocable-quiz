import React from "react";
import Firebase from "../Firebase/firebase";

export interface Props {
  firebase: Firebase;
  user: firebase.User;
}

export default class LogoutButton extends React.PureComponent<Props> {
  render() {
    const { user, firebase } = this.props;

    if (!user) {
      return null;
    }

    return <button onClick={firebase.logout}>Logout</button>;
  }
}
