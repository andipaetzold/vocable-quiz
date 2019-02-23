import { Alert, Spin } from "antd";
import Firebase from "components/Firebase/firebase";
import withAuthUser from "hoc/withAuthUser";
import withFirebase from "hoc/withFirebase";
import React, { ComponentType } from "react";
import { useDocument } from "react-firebase-hooks/firestore";
import { compose } from "recompose";
import User from "types/User";
import { Omit } from "utility-types";
import UserContext from "./context";
import styles from "./styles.m.less";

interface Props {
  authUser: firebase.User;
  firebase: Firebase;
}

function withUserProvider<T extends Props>(Component: ComponentType<T>) {
  return (props: T) => {
    const { loading, value } = useDocument(
      props.firebase.firestore.doc(`users/${props.authUser.uid}`)
    );

    if (loading) {
      return (
        <div className={styles.spinner}>
          <Spin size="large" />
        </div>
      );
    }

    if (!value || !value.exists) {
      return <Alert type="error" message="User does not exist in firestore" />;
    }

    const user: User = {
      ...(value.data() as Omit<User, "id">),
      id: value.id
    };

    return (
      <UserContext.Provider value={user}>
        <Component {...props} />
      </UserContext.Provider>
    );
  };
}

export default compose(
  withAuthUser,
  withFirebase,
  withUserProvider
);
