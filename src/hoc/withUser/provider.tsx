import { Spin } from "antd";
import Firebase from "components/Firebase/firebase";
import withFirebase from "hoc/withFirebase";
import React, { ComponentType } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { compose } from "recompose";
import AuthUserContext from "./context";
import styles from "./styles.m.less";

interface Props {
  firebase: Firebase;
}

function withUserProvider<T extends Props>(Component: ComponentType<T>) {
  return (props: T) => {
    const { initialising, user } = useAuthState(props.firebase.auth);

    if (initialising) {
      return (
        <div className={styles.spinner}>
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

export default compose(
  withFirebase,
  withUserProvider
);
