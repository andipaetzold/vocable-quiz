import withFirebase from "../../hoc/withFirebase";
import Login, { Props } from "./presenter";
import { compose } from "recompose";
import { Omit } from "utility-types";
const enhance = compose<Props, Omit<Props, "firebase">>(withFirebase);

export default enhance(Login);
