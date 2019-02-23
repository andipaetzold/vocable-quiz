import React from "react";
import User from "types/User";

export interface Props {
  user: User;
}

export default class Home extends React.PureComponent<Props> {
  render() {
    return `Hello ${this.props.user.name}`;
  }
}
