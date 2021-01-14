import { Spin } from "antd";
import useFirebase from "hooks/useFirebase";
import React, { ComponentType } from "react";
import { useAuthState } from "@lukaselmer/react-firebase-hooks/auth";
import AuthUserContext from "./context";

function withAuthUserProvider<T extends {}>(Component: ComponentType<T>) {
    return (props: T) => {
        const firebase = useFirebase();
        const [user, initialising] = useAuthState(firebase.auth);

        if (initialising) {
            return (
                <div style={{ top: "50%", textAlign: "center", width: "100%" }}>
                    <Spin size="large" />
                </div>
            );
        }

        return (
            <AuthUserContext.Provider value={user}>
                <Component {...props} />
            </AuthUserContext.Provider>
        );
    };
}

export default withAuthUserProvider;
