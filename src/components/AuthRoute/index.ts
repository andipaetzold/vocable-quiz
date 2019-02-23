import { compose, Omit } from "recompose";
import AuthRoute, { Props } from "./presenter";
import withUser from "../../hoc/withUser";

const enhance = compose<Props, Omit<Props, "user">>(withUser);

export default enhance(AuthRoute);
