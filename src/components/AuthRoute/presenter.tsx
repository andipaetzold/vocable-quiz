import React, { useContext } from "react";
import { Redirect, Route, RouteProps } from "react-router-dom";
import AuthUserContext from "hoc/withAuthUser/context";

export type Props = {} & RouteProps;

export default function AuthRoute({ component: Component, ...other }: Props) {
    const authUser = useContext(AuthUserContext);

    return (
        <Route
            {...other}
            render={props =>
                authUser ? Component && <Component {...props} /> : <Redirect to={{ pathname: "/login", state: { from: props.location } }} />
            }
        />
    );
}
