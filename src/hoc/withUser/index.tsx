import React, { ComponentType } from "react";
import { Subtract } from "utility-types";
import AuthUserContext from "./context";

interface InjectedProps {
  user: firebase.User;
}

export default function withUser<T extends InjectedProps>(
  Component: ComponentType<T>
) {
  return class WithUser extends React.PureComponent<
    Subtract<T, InjectedProps>
  > {
    render() {
      return (
        <AuthUserContext.Consumer>
          {user => <Component {...this.props as any} user={user} />}
        </AuthUserContext.Consumer>
      );
    }
  };
}
