import React, { ComponentType } from "react";
import { Subtract } from "utility-types";
import AuthUserContext from "./context";
import firebase from 'firebase/app';

interface InjectedProps {
    authUser: firebase.User | null;
}

export default function withAuthUser<T extends InjectedProps>(Component: ComponentType<T>) {
    return class withAuthUser extends React.Component<Subtract<T, InjectedProps>> {
        render() {
            return (
                <AuthUserContext.Consumer>{authUser => <Component {...this.props as any} authUser={authUser} />}</AuthUserContext.Consumer>
            );
        }
    };
}
