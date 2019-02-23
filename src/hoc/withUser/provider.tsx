import Firebase from "components/Firebase/firebase";
import withFirebase from "hoc/withFirebase";
import React, { ComponentType } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { compose } from "recompose";
import AuthUserContext from "./context";

interface Props {
  firebase: Firebase;
}

function withUserProvider<T extends Props>(Component: ComponentType<T>) {
  return (props: T) => {
    const { initialising, user } = useAuthState(props.firebase.auth);

    if (initialising) {
      return "Loading...";
    }

    return (
      <AuthUserContext.Provider value={user}>
        <Component {...props} />
      </AuthUserContext.Provider>
    );
  };
}

export default compose(
  withFirebase,
  withUserProvider
);
