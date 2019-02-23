import { Button } from "antd";
import FirebaseContext from "components/Firebase/context";
import AuthUserContext from "hoc/withAuthUser/context";
import React, { useContext } from "react";

export default function LogoutBurtton() {
  const authUser = useContext(AuthUserContext);
  const firebase = useContext(FirebaseContext);

  if (!authUser || firebase === null) {
    return null;
  }

  return (
    <Button type="default" onClick={firebase.logout}>
      Logout
    </Button>
  );
}
