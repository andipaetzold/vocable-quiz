import React from "react";

interface Props {
  code: string;
}

export default class AuthError extends React.PureComponent<Props> {
  render() {
    const { code } = this.props;

    let message = "Unknown Error";
    switch (code) {
      case "auth/invalid-email":
        message = "The email address is invalid";
        break;
      case "auth/user-disabled":
        message = "The account has been disabled";
        break;
      case "auth/user-not-found":
      case "auth/wrong-password":
        message = "The email address or the password is wrong";
        break;
    }

    return <div>{message}</div>;
  }
}
