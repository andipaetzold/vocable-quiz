import { Button } from "antd";
import Firebase from "components/Firebase/firebase";
import React from "react";

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
