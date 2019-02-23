import React from "react";
import User from "types/User";
import ChangePassword from "./ChangePassword";

export interface Props {
  user: User;
}

export default class Settings extends React.PureComponent<Props> {
  render() {
    return <ChangePassword />;
  }
}
