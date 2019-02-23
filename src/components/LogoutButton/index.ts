import withFirebase from "hoc/withFirebase";
import withAuthUser from "hoc/withAuthUser";
import { compose } from "recompose";
import { Omit } from "utility-types";
import LogoutButton, { Props } from "./presenter";

const enhance = compose<Props, Omit<Props, "firebase" | "authUser">>(
  withAuthUser,
  withFirebase
);

export default enhance(LogoutButton);
