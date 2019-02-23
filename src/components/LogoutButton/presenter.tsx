import React from "react";
import Firebase from "../Firebase/firebase";
import { Button } from "antd";

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

    return (
      <Button type="default" onClick={firebase.logout}>
        Logout
      </Button>
    );
  }
}
