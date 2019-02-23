import { Button } from "antd";
import Firebase from "components/Firebase/firebase";
import React from "react";

export interface Props {
  firebase: Firebase;
  authUser: firebase.User;
}

export default class LogoutButton extends React.PureComponent<Props> {
  render() {
    const { authUser, firebase } = this.props;

    if (!authUser) {
      return null;
    }

    return (
      <Button type="default" onClick={firebase.logout}>
        Logout
      </Button>
    );
  }
}
