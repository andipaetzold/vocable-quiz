import withFirebase from "hoc/withFirebase";
import { compose } from "recompose";
import { Omit } from "utility-types";
import Login, { Props } from "./presenter";
const enhance = compose<Props, Omit<Props, "firebase">>(withFirebase);

export default enhance(Login);
