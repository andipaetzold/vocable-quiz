import * as React from "react";
import { BrowserRouter } from "react-router-dom";
import NoAuthRoute from "../components/NoAuthRoute";
import AuthRoute from "../components/AuthRoute";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Settings from "../pages/Settings";

export default class Router extends React.PureComponent {
  render() {
    return (
      <BrowserRouter>
        <>
          {this.props.children}
          <AuthRoute exact path="/" component={Home} />
          <NoAuthRoute path="/login" component={Login} />
          <AuthRoute path="/settings" component={Settings} />
        </>
      </BrowserRouter>
    );
  }
}
