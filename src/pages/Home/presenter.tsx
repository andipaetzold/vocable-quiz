import AuthUserContext from "hoc/withAuthUser/context";
import { useContext } from "react";
import React from "react";

export default function Home() {
  const user = useContext(AuthUserContext);

  if (!user) {
    return null;
  }

  return <>Hello ${user.displayName}</>;
}
