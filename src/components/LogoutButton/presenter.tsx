import { Button, Icon } from "antd";
import AuthUserContext from "hoc/withAuthUser/context";
import useFirebase from "hooks/useFirebase";
import React, { useContext } from "react";

export default function LogoutBurtton() {
  const authUser = useContext(AuthUserContext);
  const firebase = useFirebase();

  if (!authUser) {
    return null;
  }

  return (
    <Button type="danger" shape="circle" onClick={firebase.logout}>
      <Icon type="logout" />
    </Button>
  );
}
