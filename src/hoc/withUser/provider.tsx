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
  return ({ firebase, ...props }: T) => {
    const [user, setUser] = useState<firebase.User | null>(
      firebase.auth.currentUser
    );

    useEffect(() => firebase.auth.onAuthStateChanged(setUser));

    return (
      <AuthUserContext.Provider value={user}>
        <Component {...props as any} firebase={firebase} />
      </AuthUserContext.Provider>
    );
  };
}

export default compose(
  withFirebase,
  withUserProvider
);
