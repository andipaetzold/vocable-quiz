import withAuthUser from "hoc/withAuthUser";
import { compose, Omit } from "recompose";
import AuthRoute, { Props } from "./presenter";

const enhance = compose<Props, Omit<Props, "authUser">>(withAuthUser);

export default enhance(AuthRoute);
