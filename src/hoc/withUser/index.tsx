import React, { ComponentType } from "react";
import { Subtract } from "utility-types";
import UserContext from "./context";

interface InjectedProps {
  user: firebase.User | null;
}

export default function withUser<T extends InjectedProps>(
  Component: ComponentType<T>
) {
  return class withUser extends React.Component<Subtract<T, InjectedProps>> {
    render() {
      return (
        <UserContext.Consumer>
          {user => <Component {...this.props as any} user={user} />}
        </UserContext.Consumer>
      );
    }
  };
}
