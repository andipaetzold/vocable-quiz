import AuthUserContext from "../../hoc/withAuthUser/context";
import { useContext } from "react";
import { Redirect, Route, RouteProps } from "react-router-dom";

export type Props = {} & RouteProps;

export default function NoAuthRoute({ component: Component, ...other }: Props) {
    const authUser = useContext(AuthUserContext);

    return (
        <Route
            {...other}
            render={props =>
                authUser ? <Redirect to={{ pathname: "/", state: { from: props.location } }} /> : Component && <Component {...props} />
            }
        />
    );
}
