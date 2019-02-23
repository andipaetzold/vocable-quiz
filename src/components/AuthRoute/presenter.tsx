import React from "react";
import { Redirect, Route, RouteProps } from "react-router-dom";

export type Props = {
  user: firebase.User;
} & RouteProps;

export default class AuthRoute extends React.PureComponent<Props> {
  render() {
    const { user, component: Component, ...other } = this.props;
    return (
      <>
        <Route
          {...other}
          render={props =>
            user ? (
              Component && <Component {...props} />
            ) : (
              <Redirect
                to={{ pathname: "/login", state: { from: props.location } }}
              />
            )
          }
        />
      </>
    );
  }
}
