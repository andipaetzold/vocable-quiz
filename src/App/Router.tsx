import * as React from "react";
import { BrowserRouter } from "react-router-dom";
import AuthRoute from "../components/AuthRoute";
import NoAuthRoute from "../components/NoAuthRoute";
import Login from "../pages/Login";
import Shell from "../pages/Shell";

export default class Router extends React.PureComponent {
  render() {
    return (
      <BrowserRouter>
        <>
          {this.props.children}
          <AuthRoute path="/" component={Shell} />
          <NoAuthRoute path="/login" component={Login} />
        </>
      </BrowserRouter>
    );
  }
}
