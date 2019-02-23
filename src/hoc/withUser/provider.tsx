import { compose } from "recompose";
import withFirebase from "../withFirebase";
import { ComponentType, useState, useEffect } from "react";
import React from "react";
import Firebase from "../../components/Firebase/firebase";
import AuthUserContext from "./context";

interface Props {
  firebase: Firebase;
}

function withUserProvider<T extends Props>(Component: ComponentType<T>) {
  return (props: T) => {
    const [user, setUser] = useState<firebase.User | null>(null);
    const [initialized, setInitialized] = useState(false);

    useEffect(() =>
      props.firebase.auth.onAuthStateChanged(user => {
        setUser(user);
        setInitialized(true);
      })
    );

    if (!initialized) {
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
