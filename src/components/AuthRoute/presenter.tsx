import React from "react";
import { Redirect, Route, RouteProps } from "react-router-dom";

export type Props = {
  authUser: firebase.User;
} & RouteProps;

export default class AuthRoute extends React.Component<Props> {
  render() {
    const { authUser, component: Component, ...other } = this.props;

    return (
      <Route
        {...other}
        render={props =>
          authUser ? (
            Component && <Component {...props} />
          ) : (
            <Redirect
              to={{ pathname: "/login", state: { from: props.location } }}
            />
          )
        }
      />
    );
  }
}
