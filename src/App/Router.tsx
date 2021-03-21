import AuthRoute from "../components/AuthRoute";
import NoAuthRoute from "../components/NoAuthRoute";
import Login from "../pages/Login";
import Shell from "../pages/Shell";
import * as React from "react";
import { BrowserRouter, Switch } from "react-router-dom";

export default class Router extends React.PureComponent {
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    {this.props.children}
                    <NoAuthRoute path="/login" component={Login} />
                    <AuthRoute path="/" component={Shell} />
                </Switch>
            </BrowserRouter>
        );
    }
}
