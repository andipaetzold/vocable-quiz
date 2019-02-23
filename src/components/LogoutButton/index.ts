import withFirebase from "hoc/withFirebase";
import withUser from "hoc/withUser";
import { compose } from "recompose";
import { Omit } from "utility-types";
import LogoutButton, { Props } from "./presenter";

const enhance = compose<Props, Omit<Props, "firebase" | "user">>(
  withUser,
  withFirebase
);

export default enhance(LogoutButton);
